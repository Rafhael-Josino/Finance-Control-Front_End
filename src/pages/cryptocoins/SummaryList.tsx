import { useState, useEffect } from "react";
import { SlArrowLeft } from 'react-icons/sl';
import { cryptocoinSummary, cryptoAssetOperations } from "../../actions";
import OperationsSec from "../../components/cryptocoin/OperationsSec";
import CurrencyFormating from "../../utils/CurrencyFormating";
import { CryptoSummaryType, PurchaseType, res1, res2, SellType, SellTypeMonth } from "../../types";
import { Link } from "react-router-dom";

type Props = {
    token: string,
    verifyAuth: (res: any, next: (res: any) => void) => void
    loadedSheet: string,
}

const CryptoSummaryList = (props: Props) => {
    const { loadedSheet, token, verifyAuth } = props;
    const [showSellMode, setShowSellMode] = useState('individual');
    const [showOrder, setShowOrder] = useState('');
    const [assetOperations, setAssetOperations] = useState<{
        asset: string,
        purchases: PurchaseType[],
        individualSells: SellType[],
        monthlySells: SellTypeMonth[],
    }>({
        asset: '',
        purchases: [],
        individualSells: [],
        monthlySells: [],
    });
    const [cryptoSumm, setCryptoSumm] = useState([]);

    console.log(loadedSheet)

    /**
     * Use effect
     */

    // Get the summary list of crytocoins in this account
    useEffect(() => {
        const cryptocoinSummaryAction = async (token: string, sheetName: string) => {
            const res = await cryptocoinSummary(token, sheetName);

            verifyAuth(res, setCryptoSumm);
        }

        cryptocoinSummaryAction(token, loadedSheet);
    }, [loadedSheet, token, verifyAuth]);

    // Resets the lists of operations displayed
    useEffect(() => {
        setAssetOperations({
            asset: '', 
            purchases: [], 
            individualSells: [],
            monthlySells: [],
        });
    }, [showSellMode, cryptoSumm]);

    /**
     * Sets the order by which the rows of each cryptocoin summary are displayed
     */

    let cryptoSummOrdered: CryptoSummaryType[];

    // Alphabetical
    if (showOrder === 'asset') {
        cryptoSummOrdered = cryptoSumm.sort((a: any, b: any) => (a.asset < b.asset) ? -1 : 1);
    // Decreasingly quantity of each cryptocoin
    } else if (showOrder === 'quantity') {
        cryptoSummOrdered = cryptoSumm.sort((a: any, b: any) => b.total_quant - a.total_quant);
    // Deacresingly total value of each cryptocoin
    } else if (showOrder === 'totalValue') {
        cryptoSummOrdered = cryptoSumm.sort((a: any, b: any) => b.total_value - a.total_value);
    // No order, the list is displayed as it was received
    } else {
        cryptoSummOrdered = cryptoSumm;
    }

    /**
     * The renderenring of the (ordered) summary list
     */

    const setAssetOperationsHandler1 = (res: res1) => {
        setAssetOperations({
            asset: res.asset,
            purchases: res.purchases,
            individualSells: res.sells,
            monthlySells: assetOperations.monthlySells
        });
    }

    const setAssetOperationsHandler2 = (res: res2) => {
        setAssetOperations({
            asset: res.asset,
            purchases: res.purchases,
            individualSells: assetOperations.individualSells,
            monthlySells: res.sells
        });
    }

    const renderedSummaryList = cryptoSummOrdered.map((cryptoSummary: CryptoSummaryType, index) => {
        // Determines element class that shows which asset was selected
        const backgroundColor = cryptoSummary.asset === assetOperations.asset ?
            'green' : 
            (index % 2 ? 'gray' : 'noColor');

        //Request of the respective asset's operations
        const cryptoAssetOperationsAction = async (token: string, sheetName: string, asset: string) => {
            if (backgroundColor !== 'green') {
                const res = await cryptoAssetOperations(token, sheetName, asset, showSellMode);

                if (showSellMode === 'individual') {
                    //if (!ifLoginDoThing(res, setUserAuth, setAssetOperationsHandler1)) navigate('/main-menu');
                    verifyAuth(res, setAssetOperationsHandler1);
                } else if(showSellMode === 'month') {
                    //if (!ifLoginDoThing(res, setUserAuth, setAssetOperationsHandler2)) navigate('/main-menu');
                    verifyAuth(res, setAssetOperationsHandler2);
                }
                //if (!ifLoginDoThing(res, setUserAuth, setAssetOperations)) navigate('/main-menu');
            }
        }

        return (
            <tr 
                key={index} 
                className={backgroundColor} 
                onClick={() => cryptoAssetOperationsAction(token, loadedSheet, cryptoSummary.asset)}
            >
                <td className="leftColumn">{cryptoSummary.asset}</td>
                <td className="middleColumn">{cryptoSummary.total_quant}</td>
                <td className="rightColumn">{CurrencyFormating(cryptoSummary.total_value)}</td>
            </tr>
        );
    });

    return <main className="mainMenu">
        <nav className="navCryptos">
            <div>
                <Link to='/cryptocoins'><SlArrowLeft /></Link>
            </div>

            <div>
                <div>Sell's type:</div>
                <select onChange={(e) => setShowSellMode(e.target.value)}>
                    <option value="individual">Per sell</option>
                    <option value="month">Monthly</option>
                </select>
            </div>
            
            <div>
                <div>Order by:</div>
                <select onChange={(e) => setShowOrder(e.target.value)}>
                    <option value='asset'>Asset name</option>
                    <option value='quantity'>Quantity</option>
                    <option value='totalValue'>Total value</option>
                </select>
            </div>
        </nav>

        <section>
            <table className='cryptoSummaryTable'>
                <thead>
                    <tr>
                        <th className="leftColumn">Asset</th>
                        <th className="middleColumn">Quantity</th>
                        <th className="rightColumn">Total Value</th>
                    </tr>
                </thead>
                <tbody>
                    {renderedSummaryList}    
                </tbody>
            </table>
        </section>
        <OperationsSec 
            purchases={assetOperations.purchases}
            individualSells={assetOperations.individualSells}
            monthlySells={assetOperations.monthlySells}
            showSellMode={showSellMode}
        />
    </main>
}

export default CryptoSummaryList;