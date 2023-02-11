import { useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteCryptoSheet } from '../../actions';

type Props = {
    closeModalHandler: () => void,
    selectedSheet: string,
    token: string,
    verifyAuth: (res: any, next: (res: any) => void) => void,
}

function ModalBody(props: Props) {
    const { closeModalHandler, selectedSheet, token } = props;
    const [showDeleteBox, setShowDeleteBox] = useState(false);

    const deleteButton = () => {
        setShowDeleteBox(true);
    }

    const cancelDelete = () => {
        setShowDeleteBox(false);
    }

    const confirmDelete = () => {

    }

    const deleteBox = <div className='modalBox'>
        <div>
            Please confirm if you wish delete {selectedSheet}
        </div>
        <br/>
        <div className='modalButtonsDiv'>
            <button className='deleteButton'>Yes, Delete!</button>
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

    return showDeleteBox ? deleteBox : optionsBox;
}

export default ModalBody;