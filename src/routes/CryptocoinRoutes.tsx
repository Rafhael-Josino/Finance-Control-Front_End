import { Routes, Route  } from "react-router-dom";
import MainMenu from "../pages/cryptocoins/MainMenu";
import CryptoSummaryList from "../pages/cryptocoins/SummaryList";
import ErrorBoundary from "../error-page";

type Props = {
    token: string,
    verifyAuth: (res: any, next: (res: any) => void) => void,
    selectedSheet: string,
    setSelectedSheetHandler: (sheetName: string) => void,
}


function CryptocoinRoutes(props: Props) {
    const { token, verifyAuth, selectedSheet, setSelectedSheetHandler } = props;
    
    return <Routes>
        <Route path='/*' errorElement={<ErrorBoundary />} element={
            <MainMenu 
                token={token}
                verifyAuth={verifyAuth}
                selectedSheet={selectedSheet}
                setSelectedSheetHandler={setSelectedSheetHandler}
        />} />
        <Route path='/summary' errorElement={<ErrorBoundary />} element={
            <CryptoSummaryList 
                token={token}
                verifyAuth={verifyAuth}
                selectedSheet={selectedSheet}
        />} />
    </Routes>
    

}

export default CryptocoinRoutes;