import { useEffect, useState } from 'react'
import { sendCryptoSheet } from '../../actions';

type Props = {
    token: string,
    verifyAuth: (res: any, next: (res: any) => void) => void,
    setSelectedSheetHandler: (sheetName: string) => void,
}

function UploadSheet(props: Props) {
    const { token, verifyAuth, setSelectedSheetHandler } = props;
    const [file, setFile] = useState<File>();

    useEffect(() => {
        if (file) {
            setSelectedSheetHandler('');
        }
    }, [file, setSelectedSheetHandler]);

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) setFile(event.target.files[0]);
    }

    const onSubmitHandler = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();

        if (file) {
            const formData = new FormData();
            formData.append("sheet", file as File);
    
            console.log(file);
    
            const res = await sendCryptoSheet(formData, 'yes' ,token);
    
            verifyAuth(res, (res) => setSelectedSheetHandler('*'));
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
            onChange={event => onChangeHandler(event)}    
        />
        <button
            className='upload-crypto-button'
            onClick={event => onSubmitHandler(event)}
        >Upload sheet
        </button>
    </form>
}

export default UploadSheet;