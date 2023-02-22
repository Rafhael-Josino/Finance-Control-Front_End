import { useState } from 'react';

type Props = {
    selectedSheet: string,
    setAwaitResponseHandler: (responseState: 0|1|2|3) => void,
    setLoadedSheetHandler: (sheetName: string) => void,
}

function ModalBody(props: Props) {
    const { selectedSheet, setAwaitResponseHandler, setLoadedSheetHandler, } = props;
    const [showDeleteBox, setShowDeleteBox] = useState(false);

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
        setAwaitResponseHandler(2);
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

    return showDeleteBox ? deleteBox : optionsBox;
}

export default ModalBody;