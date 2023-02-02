import { useState } from 'react'
import { sendCryptoSheet } from '../../actions';

type Props = {
    token: string,
    verifyAuth: (res: any, next: (res: any) => void) => void
}

function UploadSheet(props: Props) {
    const { token, verifyAuth } = props;
    const [file, setFile] = useState<File>();

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) setFile(event.target.files[0]);
    }

    const handleOnSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();

        if (file) {
            const formData = new FormData();
            formData.append("sheet", file as File);
    
            console.log(file);
    
            const res = await sendCryptoSheet(formData, token);
    
            verifyAuth(res, (res) => console.log('File uploaded:\n', res))
        } else {
            console.log('no file was selected')
        }
    }

    return <form encType='multipart/form-data'>
        <input 
            type='file'
            accept='.xlsx'
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