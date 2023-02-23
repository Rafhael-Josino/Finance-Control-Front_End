import { useState, useEffect, useCallback } from "react";
import { cryptocoinSheets, deleteCryptoSheet, sendCryptoSheet } from "../../actions";
import SheetListAccordion from "../../components/cryptocoin/SheetsAccordion";
import UploadSheet from "../../components/cryptocoin/UploadSheet";
import Spinner from "../../components/Spinner";
import CryptoSummaryList from "./SummaryList";
import Modal from 'react-overlays/Modal';
import { ModalProps } from "react-overlays/cjs/Modal";
import ModalBody from '../../components/cryptocoin/ModalBody';


type Props = {
    token: string,
    verifyAuth: (res: any, next: (res: any) => void) => void,
}

/**
 * selectedSheet can have two "types" of values:
 * 
 * '*': the default value, when no sheet was selected. It keeps the modal window closed
 * 
 * '<SHEET NAME>: when a sheet name from the list is selected, the modal window pops up
 * with the options of this sheet: be loaded or be deleted
 */

const Cryptocoins = (props: Props) => {
    const { token, verifyAuth } = props;
    const [sheetList, setSheetList] = useState([]);
    const [pageDisplayed, setPageDisplayed] = useState<0|1|2|3|4>(1);
    const [selectedSheet, setSelectedSheet] = useState<string>('*');
    const [restartPage, setRestartPage] = useState(false);
    const [file, setFile] = useState<File>();


    // Use Effect
    /**
     * Depending on to which value pageDisplayed was changed, a certain page is displayed
     * and a request to server is made (or even none at all)
     * 0 - no request / cryptocoin service's main menu
     * 1 - request list of sheets / spinner 
     * 2 - delete selectedSheet / spinner 
     * 3 - upload new sheet / spinner
     * 4 - no request / page with info from selected sheet saved
     * 
     * These values are also used to decide wether the modal window is displayed or not
     */
    useEffect(() => {
        if (pageDisplayed === 1) {
            const cryptocoinSheetsAction = async () => {
                // Get the list of the XLSX sheets saved
                const res = await cryptocoinSheets(token);
                
                verifyAuth(res, setSheetList);
            }
        
            cryptocoinSheetsAction();
        } else if (pageDisplayed === 2) {
            const cryptocoinSheetsAction = async () => {
                // Delete sheet table with selectedSheet name
                const res = await deleteCryptoSheet(selectedSheet, token);

                verifyAuth(res, res => setPageDisplayed(1));
            }
            
            cryptocoinSheetsAction();
        } else if (pageDisplayed === 3) {
            if (file) {
                const formData = new FormData();
                formData.append("sheet", file as File);
                
                const cryptocoinSheetsAction = async () => {
                    // put a overwrite select option
                    const res = await sendCryptoSheet(formData, 'yes' ,token);
                    
                    verifyAuth(res, res => setPageDisplayed(1));
                }
                
                cryptocoinSheetsAction();
            } else {
                console.log('no file was selected')
                setPageDisplayed(0);
            }
        }
    }, [pageDisplayed, file, selectedSheet, token, verifyAuth])

    /**
     * The sheetList's update is the last step when is the page, a delete requisition
     * or an upload requisition is done, then when this ocourrs, the selectedSheet value
     * goes to zero, necessary when a delete was done and the previous value does not exists
     * more, and as there are no more responses pending, pageDisplayed gets the value 0, that
     * causes no further requests to be made
     * setPageDisplayed is passed in the return because it should not be called the first time
     * that the page is rendered, only in the next times when sheetList is updated
     */
    useEffect(() => {
        setSelectedSheet('*');
        return () => setPageDisplayed(0)
    }, [sheetList, restartPage])


    // Handlers
    const setFileHandler = (file: File) => {
        setFile(file);
    }

    const setSelectedSheetHandler = useCallback((sheetName: string) => {
        setSelectedSheet(sheetName);
    }, []);

    const setPageDisplayedHandler = (responseState: 0|1|2|3|4) => {
        setPageDisplayed(responseState);
    }

    const setRestartPageHandler = () => setRestartPage(!restartPage);

    // Modal
    const closeModalHandler = () => setSelectedSheetHandler('*');

    const renderBackdrop = (props: ModalProps) => <div className="backdrop" {...props} />   


    switch (pageDisplayed) {
        case 1:
            return <Spinner message="Loading list of sheets" />
        case 2:
            return <Spinner message={`Deleting sheet: ${selectedSheet}`} />
        case 3:
            return <Spinner message={`Uploading sheets from file: ${file?.name}`} />
        case 4:
            return <CryptoSummaryList 
                token={token}
                verifyAuth={verifyAuth}
                loadedSheet={selectedSheet}
                setPageDisplayedHandler={setPageDisplayedHandler}
                setRestartPageHandler={setRestartPageHandler}
            />
        default:
            return <main className="mainMenu">
            <div className="navCryptos navSheetsList director">
                <span>Select a saved log sheet</span>
            </div>
    
            <SheetListAccordion 
                sheetList={sheetList} 
                setSelectedSheetHandler={setSelectedSheetHandler}
            />
    
            <div className="navCryptos">
                <div>Or load a new XLSX file:</div> 
                
                <UploadSheet 
                    setPageDisplayedHandler={setPageDisplayedHandler}
                    setFileHandler={setFileHandler}
                />
            </div>
    
            <Modal
                className="modal"
                show={(!pageDisplayed) && (selectedSheet !== '*') && (selectedSheet !== '')}
                onHide={closeModalHandler}
                renderBackdrop={renderBackdrop}
            >
                <ModalBody 
                    selectedSheet={selectedSheet}
                    setPageDisplayedHandler={setPageDisplayedHandler}
                />
            </Modal>
        </main>
    }

  
}

export default Cryptocoins;