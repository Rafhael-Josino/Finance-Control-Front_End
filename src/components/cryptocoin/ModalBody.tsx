import { useState } from 'react';
import { Link } from 'react-router-dom';

type Props = {
    closeModalHandler: () => void,
    selectedSheet: string,
}

function ModalBody(props: Props) {
    const { closeModalHandler, selectedSheet } = props;
    const [confirmDelete, setConfirmDelete] = useState(false);

    return <div className='modalBox'>
        <div>
            Selected sheet: {selectedSheet}
        </div>
        <br/>
        <div className='modalButtonsDiv'>
            <Link to='summary'>
                <button>Load</button>
            </Link>
            <button className='deleteButton' onClick={() => console.log('delete')}>Delete</button>
        </div>
    </div>
}

export default ModalBody;