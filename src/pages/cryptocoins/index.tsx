import { useState } from "react";
import CryptocoinRoutes from "../../routes/CryptocoinRoutes";

type Props = {
    token: string,
    verifyAuth: (res: any, next: (res: any) => void) => void
}

const Cryptocoins = (props: Props) => {
    const { token, verifyAuth } = props;
    const [loadedSheet, setLoadedSheet] = useState<string>('');

    console.log('index', loadedSheet)

    const setLoadedSheetHandler = (sheetName: string) => {
        setLoadedSheet(sheetName);
    }

    return <CryptocoinRoutes 
        token={token} 
        verifyAuth={verifyAuth} 
        loadedSheet={loadedSheet} 
        setLoadedSheetHandler={setLoadedSheetHandler}
    />
}

export default Cryptocoins;