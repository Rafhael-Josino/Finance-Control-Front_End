import { useState, useEffect } from 'react'
import { sendCryptoSheet } from '../../actions';
import ifLoginDoThing from "../../hooks/useIfLoginDoThing";

type Props = {
    token: string,
    setUserAuth: React.Dispatch<React.SetStateAction<{
        userName: string;
        token: string;
    }>>,
}

function UploadSheet(props: Props) {
    const { token, setUserAuth } = props;
    const [file, setFile] = useState<File>();

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) setFile(event.target.files[0]);
    }

    const handleOnSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("sheet", file as File);

        console.log(file);

        const res = await sendCryptoSheet(formData, token);

        console.log(res);
    }

    return <form encType='multipart/form-data'>
        <input 
            type='file'
            name='sheet'
            className="sr-onl"
            onChange={event => handleOnChange(event)}    
        />
        <button
            className='upload-crypto-button'
            onClick={event => handleOnSubmit(event)}
        >Upload sheet
        </button>
    </form>
}

export default UploadSheet;

/**
 * 
 *              type='file' 
                accept='.csv' 
                className="sr-only"
                onChange={event => handleOnChange(event)}    
 */