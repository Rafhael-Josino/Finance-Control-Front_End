import { useState, useEffect } from "react";
import { cryptocoinSheets } from "../actions";
import CryptoSummaryList from "../components/cryptocoin/CryptoSummaryList";
import UploadSheet from "../components/cryptocoin/UploadSheet";

type Props = {
    token: string,
    verifyAuth: (res: any, next: (res: any) => void) => void
}

const Cryptos = (props: Props) => {
    const { token, verifyAuth } = props;
    const [sheetNames, setSheetNames] = useState<string[]>([]);
    const [sheetIndex, setSheetIndex] = useState<number>(-1);
    const [showSellMode, setShowSellMode] = useState<string>('month');
    const [showOrder, setShowOrder] = useState<string>('');

    useEffect(() => {
        const cryptocoinSheetsAction = async (token: string) => {
            // Get the names of the sheets parsed
            const res = await cryptocoinSheets(token);

            //if (!ifLoginDoThing(res, setUserAuth, setSheetNames)) navigate('/main-menu')
            verifyAuth(res, setSheetNames);
        }

        cryptocoinSheetsAction(token);
    }, [token, verifyAuth]);

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
                <div className="subHeader">
                    <div>
                        <div>Sheet: {sheetNames[sheetIndex]}</div>
                        <select 
                            name="loadSheet" 
                            id="loadSheet"
                            onChange={event=>handleOnChange(event)}
                        >
                            <option value={-1}>Select a sheet</option>
                            {renderedSheets}
                        </select>
                    </div>

                    <span>or</span>
                    <UploadSheet token={token} verifyAuth={verifyAuth} />
                    
                    <div>
                        <div>Sell's type:</div>
                        <select name="sellsTimeSpan" onChange={(e) => setShowSellModeHelper(e)}>
                            <option value="month">Monthly</option>
                            <option value="individual">Per sell</option>
                        </select>
                    </div>
                    
                    <div>
                        <div>Order by:</div>
                        <select onChange={(e) => setShowOrderHelper(e)}>
                            <option value='asset'>Asset name</option>
                            <option value='quantity'>Quantity</option>
                            <option value='totalValue'>Total value</option>
                        </select>
                    </div>
                </div>
            </nav>

            <CryptoSummaryList 
                token={token}
                verifyAuth={verifyAuth}
                selectedSheet={sheetNames[sheetIndex]}
                showSellMode={showSellMode}
                showOrder={showOrder}
            />
        </main>
    );
}

export default Cryptos;