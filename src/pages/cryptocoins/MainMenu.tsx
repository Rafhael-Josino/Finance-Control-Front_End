import React, { useState, useEffect } from "react";
import Modal from 'react-overlays/Modal';
import { ModalProps } from "react-overlays/cjs/Modal";
import { cryptocoinSheets, deleteCryptoSheet, sendCryptoSheet } from "../../actions";
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
 * selectedSheet can have two "types" of values:
 * 
 * '*': the default value, when no sheet was selected. It keeps the modal window closed
 * 
 * '<SHEET NAME>: when a sheet name from the list is selected, the modal window pops up
 * with the options of this sheet: be loaded or be deleted
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
    const [awaitResponse, setAwaitResponse] = useState<0|1|2|3>(1);
    const [file, setFile] = useState<File>();


    // Use Effect
    /**
     * Depending on to which value awaitResponse was changed, a certain request to server
     * (or even none at all) is made
     * 1 - request list of sheets
     * 2 - delete selectedSheet
     * 3 - upload new sheet
     * 0 - makes no request
     * 
     * These values are also used to decide wether the modal window is displayed or not
     */
    useEffect(() => {
        if (awaitResponse === 1) {
            const cryptocoinSheetsAction = async () => {
                // Get the list of the XLSX sheets saved
                const res = await cryptocoinSheets(token);
                
                verifyAuth(res, setSheetList);
            }
        
            cryptocoinSheetsAction();
        } else if (awaitResponse === 2) {
            const cryptocoinSheetsAction = async () => {
                // Delete sheet table with selectedSheet name
                const res = await deleteCryptoSheet(selectedSheet, token);

                //verifyAuth(res, res => setSelectedSheetHandler('*'));
                verifyAuth(res, res => setAwaitResponse(1));
            }
            
            cryptocoinSheetsAction();
        } else if (awaitResponse === 3) {
            if (file) {
                const formData = new FormData();
                formData.append("sheet", file as File);
                
                const cryptocoinSheetsAction = async () => {
                    // put a overwrite select option
                    const res = await sendCryptoSheet(formData, 'yes' ,token);
                    
                    //verifyAuth(res, (res) => setSelectedSheetHandler('*'));
                    verifyAuth(res, res => setAwaitResponse(1));
                }
                
                cryptocoinSheetsAction();
            } else {
                console.log('no file was selected')
                setAwaitResponse(0);
            }
        }
    }, [awaitResponse, file, selectedSheet, setSelectedSheetHandler, token, verifyAuth])

    /**
     * The sheetList's update is the last step when is the page, a delete requisition
     * or an upload requisition is done, then when this ocourrs, the selectedSheet value
     * goes to zero, necessary when a delete was done and the previous value does not exists
     * more, and as there are no more responses pending, awaitResponse gets the value 0, that
     * causes no further requests to be made
     * setAwaitResponse is passed in the return because it should not be called the first time
     * that the page is rendered, only in the next times when sheetList is updated
     */
    useEffect(() => {
        setSelectedSheetHandler('*');
        return () => setAwaitResponse(0)
    }, [sheetList, setSelectedSheetHandler])


    // Handlers
    const setFileHandler = (file: File) => {
        setFile(file);
    }

    const setAwaitResponseHandler = (responseState: 0|1|2|3) => {
        setAwaitResponse(responseState);
    }

    // Modal
    const closeModalHandler = () => setSelectedSheetHandler('*');

    const renderBackdrop = (props: ModalProps) => <div className="backdrop" {...props} />
    

    let message: string;
    switch (awaitResponse) {
        case 1:
            message = 'Loading list of sheets';
            break;
        case 2:
            message = `Deleting sheet: ${selectedSheet}`;
            break;
        case 3:
            message = `Uploading sheets from file: ${file?.name}`;
            break;
        default:
            message = '';
    }

    // TO DO: Add the option to overwrite sheets of same name
    return <main className="mainMenu">
        {awaitResponse ?
            <Spinner message={message}/>
        :
            <React.Fragment>

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
                        setAwaitResponseHandler={setAwaitResponseHandler}
                        setFileHandler={setFileHandler}
                        />
                </div>

                <Modal
                    className="modal"
                    show={(!awaitResponse) && (selectedSheet !== '*') && (selectedSheet !== '')}
                    onHide={closeModalHandler}
                    renderBackdrop={renderBackdrop}
                    >
                    <ModalBody 
                        selectedSheet={selectedSheet}
                        setAwaitResponseHandler={setAwaitResponseHandler}
                        setLoadedSheetHandler={setLoadedSheetHandler}
                    />
                </Modal>
            </React.Fragment>
        }
    </main>
}

export default MainMenu;