import { useState, useEffect } from "react";
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';
import Modal from 'react-overlays/Modal';
import { ModalProps } from "react-overlays/cjs/Modal";
import { cryptocoinSheets } from "../../actions";
import SheetListAccordion from "../../components/cryptocoin/SheetsAccordion";
import UploadSheet from "../../components/cryptocoin/UploadSheet";
import ModalBody from "../../components/cryptocoin/ModalBody";

type Props = {
    token: string,
    verifyAuth: (res: any, next: (res: any) => void) => void,
    setLoadedSheetHandler: (sheetName: string) => void,
}

const MainMenu = (props: Props) => {
    const { token, verifyAuth, setLoadedSheetHandler } = props;
    const [selectedSheet, setSelectedSheet] = useState('');
    const [sheetList, setSheetList] = useState([]);
    const [visible, setVisible] = useState<boolean>(false);
    const [restart, setRestart] = useState<boolean>();


    // Use Effect
    useEffect(() => {
        const cryptocoinSheetsAction = async (token: string) => {
            // Get the names of the XLSX sheets saved
            const res = await cryptocoinSheets(token);

            verifyAuth(res, setSheetList);
        }

        cryptocoinSheetsAction(token);
    }, [token, verifyAuth, restart]);

    useEffect(() => {
        setSelectedSheet('');
    }, [restart])
    
    useEffect(() => {
        if (selectedSheet !== '') setLoadedSheetHandler(selectedSheet)
    }, [selectedSheet, setLoadedSheetHandler]);
    
    
    // Handler functions
    const setSelectedSheetHandler = (selectedSheetName: string) => {
        setSelectedSheet(selectedSheetName);
    }
    
    const setRestartHandler = () => setRestart(!restart)
    
    
    // Modal
    const closeModalHandler = () => setSelectedSheetHandler('');

    const renderBackdrop = (props: ModalProps) => <div className="backdrop" {...props} />
    



    const buttonImage = visible? <SlArrowUp /> : <SlArrowDown />

    // TO DO: Add the option to overwrite sheets of same name
    return <main className="mainMenu">
        <div className="navCryptos navSheetsList director" onClick={() => setVisible(!visible)}>
            <span>Select a saved log sheet</span>
            {buttonImage}
        </div>

        <SheetListAccordion 
            sheetList={sheetList} 
            visible={visible} 
            setSelectedSheetHandler={setSelectedSheetHandler}
        />

        <div className="navCryptos">
            <div>Or load a new XLSX file:</div> 
            <UploadSheet 
                token={token} 
                verifyAuth={verifyAuth} 
                setRestartHandler={setRestartHandler}
            />
        </div>

        <Modal
            className="modal"
            show={selectedSheet !== ''}
            onHide={closeModalHandler}
            renderBackdrop={renderBackdrop}
        >
            <ModalBody 
                selectedSheet={selectedSheet}
                token={token}
                verifyAuth={verifyAuth}
                setRestartHandler={setRestartHandler}
            />
        </Modal>
    </main>
}

export default MainMenu;