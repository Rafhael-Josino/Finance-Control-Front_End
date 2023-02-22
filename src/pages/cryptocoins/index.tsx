import { useState, useCallback, useEffect } from "react";
import MainMenu from "./MainMenu";
import CryptoSummaryList from "./SummaryList";

type Props = {
    token: string,
    verifyAuth: (res: any, next: (res: any) => void) => void
}

const Cryptocoins = (props: Props) => {
    const { token, verifyAuth } = props;
    const [selectedSheet, setSelectedSheet] = useState<string>('*');
    const [loadedSheet, setLoadedSheet] = useState('');

    /**
     * selectedSheet and loadedSheet regards the sheets from XLSX files
     * uploaded with the user's cryptocoins operations.
     * 
     * While selectedSheet is used to handle the sheets selected from the list
     * in the cryptocoins service initial page, loadedSheet refers to the sheet
     * whose informations are indeed loaded.
     */

    useEffect(() => {
        if (loadedSheet === '') setSelectedSheet('*')
    }, [loadedSheet])

    const setSelectedSheetHandler = useCallback((sheetName: string) => {
        setSelectedSheet(sheetName);
    }, []);

    const setLoadedSheetHandler = (sheetName: string) => {
        setLoadedSheet(sheetName);
    }

    return (selectedSheet === '*' || loadedSheet === '') ? 
        <MainMenu 
            token={token} 
            verifyAuth={verifyAuth} 
            selectedSheet={selectedSheet} 
            setSelectedSheetHandler={setSelectedSheetHandler}
            setLoadedSheetHandler={setLoadedSheetHandler}
        />
    :
        <CryptoSummaryList 
            token={token}
            verifyAuth={verifyAuth}
            loadedSheet={loadedSheet}
            setLoadedSheetHandler={setLoadedSheetHandler}
        />
}

export default Cryptocoins;