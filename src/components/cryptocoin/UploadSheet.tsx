type Props = {
    setAwaitResponseHandler: (responseState: 0|1|2|3) => void,
    setFileHandler: (file: File) => void, 
}

function UploadSheet(props: Props) {
    const { setFileHandler, setAwaitResponseHandler } = props;

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) setFileHandler(event.target.files[0]);
    }

    const onSubmitHandler = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();

        setAwaitResponseHandler(3);
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