import { useState, useCallback } from "react";
import CryptocoinRoutes from "../../routes/CryptocoinRoutes";

type Props = {
    token: string,
    verifyAuth: (res: any, next: (res: any) => void) => void
}

const Cryptocoins = (props: Props) => {
    const { token, verifyAuth } = props;
    const [selectedSheet, setSelectedSheet] = useState<string>('*');

    const setSelectedSheetHandler = useCallback((sheetName: string) => {
        setSelectedSheet(sheetName);
    }, []);

    console.log('index body')

    return <CryptocoinRoutes 
        token={token} 
        verifyAuth={verifyAuth} 
        selectedSheet={selectedSheet} 
        setSelectedSheetHandler={setSelectedSheetHandler}
    />
}

export default Cryptocoins;