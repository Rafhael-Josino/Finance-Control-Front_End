import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cryptocoinSheets } from "../actions";
import ifLoginDoThing from "../hooks/useIfLoginDoThing";
import CryptoSummaryList from "../components/cryptocoin/CryptoSummaryList";

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
    const [sheetNames, setSheetNames] = useState([]);
    const [showSellMode, setShowSellMode] = useState('month');
    const [showOrder, setShowOrder] = useState('');

    useEffect(() => {
        const cryptocoinSheetsAction = async (token: string) => {
            const res = await cryptocoinSheets(token);

            if (!ifLoginDoThing(res, setUserAuth, setSheetNames)) navigate('/main-menu')
        }

        cryptocoinSheetsAction(token);
    }, []);

    const renderedSheets = sheetNames.map((sheet: string) => {
        return <option key={sheet} value={sheet}>{sheet}</option>
    });

    const setShowSellHelper = (event: React.ChangeEvent<HTMLSelectElement>) => {
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
                    <span>Sheet parsed:</span>
                    <select name="loadSheet" id="loadSheet">
                        {renderedSheets}
                    </select>
                    <span>Parse sheet (not ready)</span>
                    <select name="sellsTimeSpan" onChange={(e) => setShowSellHelper(e)}>
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
                selectedSheet={sheetNames[0]}
                setUserAuth={setUserAuth} 
                token={token}
                showSellMode={showSellMode}
                showOrder={showOrder}
            />
        </main>
    );
}

export default Cryptos;