import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cryptocoinSheets } from "../actions";
import ifLoginDoThing from "../hooks/useIfLoginDoThing";
import CryptoSummaryList from "../components/cryptocoin/CryptoSummaryList";
import UploadSheet from "../components/cryptocoin/UploadSheet";

type Props = {
    token: string,
    setUserAuth: React.Dispatch<React.SetStateAction<{
        userName: string;
        token: string;
    }>>,
}

const Cryptos = (props: Props) => {
    const navigate = useNavigate();
    const { token, setUserAuth } = props;
    const [sheetNames, setSheetNames] = useState<string[]>([]);
    const [sheetIndex, setSheetIndex] = useState<number>(-1);
    const [showSellMode, setShowSellMode] = useState<string>('month');
    const [showOrder, setShowOrder] = useState<string>('');

    useEffect(() => {
        const cryptocoinSheetsAction = async (token: string) => {
            // Get the names of the sheets parsed
            const res = await cryptocoinSheets(token);

            if (!ifLoginDoThing(res, setUserAuth, setSheetNames)) navigate('/main-menu')
        }

        cryptocoinSheetsAction(token);
    }, []);

    const renderedSheets = sheetNames.map((sheet: string, index: number) => {
        return <option key={index} value={index}>{sheet}</option>
    });

    const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (event.target.value !== '-1') setSheetIndex(Number(event.target.value));
    }

    const setShowSellModeHelper = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setShowSellMode(event.target.value);
    }

    const setShowOrderHelper = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setShowOrder(event.target.value);
    }

    return (
        <main id="cryptosMenu">
            <nav id="navCryptos">
                <div>Cryptos Operations Log</div>
                <div className="subHeader">
                    <select 
                        name="loadSheet" 
                        id="loadSheet"
                        onChange={event=>handleOnChange(event)}
                    >
                        <option value={-1}>Select a sheet</option>
                        {renderedSheets}
                    </select>

                    <span>or</span>
                    <UploadSheet setUserAuth={setUserAuth} token={token} />
                    
                    <span>/</span>
                    <select name="sellsTimeSpan" onChange={(e) => setShowSellModeHelper(e)}>
                        <option value="month">Monthly</option>
                        <option value="individual">Per sell</option>
                    </select>
                    
                    <select onChange={(e) => setShowOrderHelper(e)}>
                        <option value='asset'>Asset name</option>
                        <option value='quantity'>Quantity</option>
                        <option value='totalValue'>Total value</option>
                    </select>
                </div>
            </nav>

            <CryptoSummaryList 
                selectedSheet={sheetNames[sheetIndex]}
                setUserAuth={setUserAuth} 
                token={token}
                showSellMode={showSellMode}
                showOrder={showOrder}
            />
        </main>
    );
}

export default Cryptos;