import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { deleteCryptoSheet } from '../../actions';
import Spinner from '../Spinner';

type Props = {
    selectedSheet: string,
    token: string,
    verifyAuth: (res: any, next: (res: any) => void) => void,
    setRestartHandler: () => void,
}

function ModalBody(props: Props) {
    const { selectedSheet, token, verifyAuth, setRestartHandler } = props;
    const [showDeleteBox, setShowDeleteBox] = useState(false);
    const [awaitDeleteSheet, setAwaitDeleteSheet] = useState(false);

    useEffect(() => {
        const deleteCryptoSheetHandler = async () => {
            const res = await deleteCryptoSheet(selectedSheet, token);

            // it's not updating the sheet list
            // we have to test this handler function in this argument
            verifyAuth(res, res => setRestartHandler());
        }

        if (awaitDeleteSheet) deleteCryptoSheetHandler();
    }, [awaitDeleteSheet, selectedSheet, token, verifyAuth, setRestartHandler]);

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
            <Link to='summary'>
                <button>Load</button>
            </Link>
            <button className='deleteButton' onClick={deleteButton}>Delete</button>
        </div>
    </div>

    return awaitDeleteSheet ? 
        <Spinner /> 
    :
        showDeleteBox ? deleteBox : optionsBox;
}

export default ModalBody;