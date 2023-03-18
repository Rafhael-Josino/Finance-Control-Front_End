type Props = {
    setPageDisplayedHandler: (responseState: 0|1|2|3) => void,
    setFileHandler: (file: File) => void,
    setOverwriteHandler: (option: 'no'|'yes') => void;
}

function UploadSheet(props: Props) {
    const { 
        setFileHandler, 
        setPageDisplayedHandler,
        setOverwriteHandler
    } = props;

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) setFileHandler(event.target.files[0]);
    }

    const onSubmitHandler = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();

        setPageDisplayedHandler(3);
    }

    // TO DO: Add the option to overwrite sheets of same name

    return <section className='navCryptos'>
        <div className='upload-container'>
            <span>Load a new XLSX file</span>
            <div>
                <span>Overwrite repeated sheets:</span>
                <select onChange={(e) => setOverwriteHandler(e.target.value as 'no'|'yes')}>
                    <option value='no'>No</option>
                    <option value='yes'>Yes</option>
                </select>
            </div>
        </div> 

        <form encType='multipart/form-data' className='upload-container'>
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
            >
                Upload sheet
            </button>
        </form>
    </section> 
}

export default UploadSheet;