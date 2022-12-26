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
    const { token, setUserAuth } = props;
    const navigate = useNavigate();
    const [sheetNames, setSheetNames] = useState([]);
    const [cryptoInfo, setCryptoInfo] = useState([]);

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

    return (
        <main id="cryptosMenu">
            <nav id="navCryptos">
                <div>Cryptos Operations Log</div>
                <div className="subHeader">
                    <span>Sheet parsed:</span>
                    <select name="loadSheet" id="loadSheet">
                        {renderedSheets}
                    </select>
                    <select name="sellsTimeSpan" id="sellsTimeSpan">
                        <option value="month">Monthly</option>
                        <option value="sell">Per sell</option>
                    </select>
                    <span>Save sheet (not ready)</span>
                </div>
            </nav>

            <CryptoSummaryList 
                selectedSheet={sheetNames[0]}
                setUserAuth={setUserAuth} 
                token={token}
            />
        </main>
    );
}

export default Cryptos;