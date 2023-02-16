import { useState, useEffect } from "react";
import Modal from 'react-overlays/Modal';
import { ModalProps } from "react-overlays/cjs/Modal";
import { cryptocoinSheets } from "../../actions";
import SheetListAccordion from "../../components/cryptocoin/SheetsAccordion";
import UploadSheet from "../../components/cryptocoin/UploadSheet";
import ModalBody from "../../components/cryptocoin/ModalBody";
import Spinner from "../../components/Spinner";

type Props = {
    token: string,
    verifyAuth: (res: any, next: (res: any) => void) => void,
    selectedSheet: string,
    setSelectedSheetHandler: (sheetName: string) => void,
    setLoadedSheetHandler: (sheetName: string) => void,
}


/**
 * selectedSheet can have three "types" of values:
 * 
 * '*': the initial, is used when the page is rerendered and the component bellow
 * must get again the list of saved sheets from the server.
 * The components that load this value are delete sheet and upload sheet, that is,
 * the features that change the list of parsed sheet. The modal window should be closed
 * 
 * '<SHEET NAME>: when a sheet name from the list is selected, the modal window pops up
 * with the options of this sheet: be loaded or be deleted
 * 
 * '': this value is loaded to the state when a modal windows is closed. The page is
 * rerendered with the modal closed, but the component bellow will not get again the lists
 * of sheets from the server, once the list was not modified
 */



const MainMenu = (props: Props) => {
    const { 
        token, 
        verifyAuth, 
        selectedSheet, 
        setSelectedSheetHandler,
        setLoadedSheetHandler,    
    } = props;
    const [sheetList, setSheetList] = useState([]);
    const [awaitCryptocoins, setAwaitCryptocoins] = useState(true);

    // Use Effect
    
    useEffect(() => {
        if (selectedSheet === '*') setAwaitCryptocoins(true);
    }, [selectedSheet]);
    
    useEffect(() => {
        if (awaitCryptocoins) {
            const cryptocoinSheetsAction = async (token: string) => {
                // Get the names of the XLSX sheets saved
                const res = await cryptocoinSheets(token);
                
                verifyAuth(res, setSheetList);
            }
        
            cryptocoinSheetsAction(token);
        }
    }, [token, verifyAuth, awaitCryptocoins]);

    useEffect(() => {
        setAwaitCryptocoins(false)
    }, [sheetList])



    console.log('main menu body\n', selectedSheet, sheetList)
        
    // Modal
    const closeModalHandler = () => setSelectedSheetHandler('');

    const renderBackdrop = (props: ModalProps) => <div className="backdrop" {...props} />
    

    // TO DO: Add the option to overwrite sheets of same name
    return <main className="mainMenu">
        <div className="navCryptos navSheetsList director">
            <span>Select a saved log sheet</span>
        </div>

        {awaitCryptocoins ? 
            <Spinner /> 
        : 
            <SheetListAccordion 
                sheetList={sheetList} 
                setSelectedSheetHandler={setSelectedSheetHandler}
            />
        }

        <div className="navCryptos">
            <div>Or load a new XLSX file:</div> 
            <UploadSheet 
                token={token} 
                verifyAuth={verifyAuth} 
                setSelectedSheetHandler={setSelectedSheetHandler}
            />
        </div>

        <Modal
            className="modal"
            show={(selectedSheet !== '*') && (selectedSheet !== '')}
            onHide={closeModalHandler}
            renderBackdrop={renderBackdrop}
        >
            <ModalBody 
                selectedSheet={selectedSheet}
                token={token}
                verifyAuth={verifyAuth}
                setSelectedSheetHandler={setSelectedSheetHandler}
                setLoadedSheetHandler={setLoadedSheetHandler}
            />
        </Modal>
    </main>
}

export default MainMenu;