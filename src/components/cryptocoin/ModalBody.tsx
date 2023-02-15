import { useState, useEffect } from 'react';
import { deleteCryptoSheet } from '../../actions';
import Spinner from '../Spinner';

type Props = {
    selectedSheet: string,
    token: string,
    verifyAuth: (res: any, next: (res: any) => void) => void,
    setSelectedSheetHandler: (sheetName: string) => void,
    setLoadedSheetHandler: (sheetName: string) => void,
}

function ModalBody(props: Props) {
    const { 
        token, 
        verifyAuth, 
        selectedSheet, 
        setSelectedSheetHandler, 
        setLoadedSheetHandler 
    } = props;
    const [showDeleteBox, setShowDeleteBox] = useState(false);
    const [awaitDeleteSheet, setAwaitDeleteSheet] = useState(false);

    useEffect(() => {
        const deleteCryptoSheetHandler = async () => {
            const res = await deleteCryptoSheet(selectedSheet, token);

            // it's not updating the sheet list
            // we have to test this handler function in this argument
            console.log('modalBody use effect\n', selectedSheet)
            
            verifyAuth(res, res => setSelectedSheetHandler('*'));
            //verifyAuth(res, res => setRestartHandler());
        }

        if (awaitDeleteSheet) deleteCryptoSheetHandler();
    }, [awaitDeleteSheet, selectedSheet, token, verifyAuth, setSelectedSheetHandler]);

    console.log('modalBody\n', selectedSheet)

    const loadButton = () => {
        setLoadedSheetHandler(selectedSheet)    
    }

    const deleteButton = () => {
        setShowDeleteBox(true);
    }

    const cancelDelete = () => {
        setShowDeleteBox(false);
    }

    const confirmDelete = () => {
        setAwaitDeleteSheet(true);
    }

    const deleteBox = <div className='modalBox'>
        <div>
            Please confirm if you wish delete {selectedSheet}
        </div>
        <br/>
        <div className='modalButtonsDiv'>
            <button className='deleteButton' onClick={confirmDelete}>Yes, Delete!</button>
            <button onClick={cancelDelete}>Cancel</button>
        </div>
    </div>

    const optionsBox = <div className='modalBox'>
        <div>
            Selected sheet: {selectedSheet}
        </div>
        <br/>
        <div className='modalButtonsDiv'>
            <button onClick={loadButton}>Load</button>
            <button className='deleteButton' onClick={deleteButton}>Delete</button>
        </div>
    </div>

    return awaitDeleteSheet ? 
        <Spinner /> 
    :
        showDeleteBox ? deleteBox : optionsBox;
}

export default ModalBody;