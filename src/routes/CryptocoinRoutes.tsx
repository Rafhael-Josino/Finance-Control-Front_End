import { Routes, Route  } from "react-router-dom";
import MainMenu from "../pages/cryptocoins/MainMenu";
import CryptoSummaryList from "../pages/cryptocoins/SummaryList";
import ErrorBoundary from "../error-page";

type Props = {
    token: string,
    verifyAuth: (res: any, next: (res: any) => void) => void,
    loadedSheet: string,
    setLoadedSheetHandler: (sheetName: string) => void,
}


function CryptocoinRoutes(props: Props) {
    const { token, verifyAuth, loadedSheet, setLoadedSheetHandler } = props;
    
    return <Routes>
        <Route path='/*' errorElement={<ErrorBoundary />} element={
            <MainMenu 
                token={token}
                verifyAuth={verifyAuth}
                setLoadedSheetHandler={setLoadedSheetHandler}
        />} />
        <Route path='/summary' errorElement={<ErrorBoundary />} element={
            <CryptoSummaryList 
                token={token}
                verifyAuth={verifyAuth}
                loadedSheet={loadedSheet}
        />} />
    </Routes>
    

}

export default CryptocoinRoutes;