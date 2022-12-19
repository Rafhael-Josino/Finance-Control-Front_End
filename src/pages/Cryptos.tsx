import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cryptocoinSheets, cryptocoinSummary } from "../actions";
import ifLoginDoThing from "../hooks/useIfLoginDoThing";

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
    const [cryptoSumm, setCryptoSumm] = useState([]);
    const [cryptoInfo, setCryptoInfo] = useState([]);

    useEffect(() => {
        const cryptocoinSheetsAction = async (token: string) => {
            const res = await cryptocoinSheets(token);

            if (!ifLoginDoThing(res, setUserAuth, setSheetNames)) navigate('/main-menu')

        }

        cryptocoinSheetsAction(token);
    }, []);

    useEffect(() => {

    }, [cryptoSumm])

    const renderedSheets = sheetNames.map((sheet: string) => {
        return <option key={sheet} value={sheet}>{sheet}</option>
    })

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
                    <a href="#" id="saveSheet">Save Sheet</a>
                </div>
            </nav>

        <section id="currentSituationSec">
                <table id="currentSituationTab"></table>
            </section>

        <section id="operationsSec">
                <div id="purchasesDiv">
                    <h2 id="h2purchases">Purchases</h2>
                    <div id="tablesP"></div>
                </div>

                <div id="sellsDiv">
                    <h2 id="h2sells">Sells</h2>
                    <div id="tablesS"></div>
                </div>
            </section>
        </main>
    );
}

export default Cryptos;