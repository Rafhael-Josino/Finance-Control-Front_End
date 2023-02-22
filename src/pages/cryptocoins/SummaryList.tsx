import { useState, useEffect } from "react";
import { SlArrowLeft, SlArrowDown } from 'react-icons/sl';
import { CryptoSummaryType, PurchaseType, res1, res2, SellType, SellTypeMonth } from "../../types";
import { cryptocoinSummary, cryptoAssetOperations } from "../../actions";
import OperationsSec from "../../components/cryptocoin/OperationsSec";
import CurrencyFormating from "../../utils/CurrencyFormating";
import Spinner from "../../components/Spinner";

type Props = {
    token: string,
    verifyAuth: (res: any, next: (res: any) => void) => void
    loadedSheet: string,
    setLoadedSheetHandler: (sheetName: string) => void,
}

const CryptoSummaryList = (props: Props) => {
    const { token, verifyAuth, loadedSheet, setLoadedSheetHandler } = props;
    const [showSellMode, setShowSellMode] = useState('individual');
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
    const [cryptoSummary, setCryptoSumm] = useState([]);
    
    const [showOrder, setShowOrder] = useState('asset');
    
    // The arrows that indicate by which parameter the cryptcoins list is ordered
    let assetArrowDown = null;
    let quantityArrowDown = null;
    let totalValueArrowDown = null;

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
        return () => setAssetOperations({
            asset: '', 
            purchases: [], 
            individualSells: [],
            monthlySells: [],
        });
    }, [showSellMode, cryptoSummary]);

    /**
     * Sets the order by which the rows of each cryptocoin summary are displayed
     */

    let cryptoSummOrdered: CryptoSummaryType[];

    // Alphabetical
    if (showOrder === 'asset') {
        cryptoSummOrdered = cryptoSummary.sort((a: any, b: any) => (a.asset < b.asset) ? -1 : 1);
        assetArrowDown = <SlArrowDown />;
    // Decreasingly quantity of each cryptocoin
    } else if (showOrder === 'quantity') {
        cryptoSummOrdered = cryptoSummary.sort((a: any, b: any) => b.total_quant - a.total_quant);
        quantityArrowDown = <SlArrowDown />;
    // Deacresingly total value of each cryptocoin
    } else if (showOrder === 'totalValue') {
        cryptoSummOrdered = cryptoSummary.sort((a: any, b: any) => b.total_value - a.total_value);
        totalValueArrowDown = <SlArrowDown />;
    // No order, the list is displayed as it was received
    } else {
        cryptoSummOrdered = cryptoSummary;
        assetArrowDown = <SlArrowDown />;
    }

    const setShowOrderHandler = (newShowOrder: 'asset' | 'quantity' | 'totalValue') => {
        setShowOrder(newShowOrder);
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
            'back-green selectable' : 
            (index % 2 ? 'back-gray selectable' : 'selectable');

        //Request of the respective asset's operations
        const cryptoAssetOperationsAction = async (token: string, sheetName: string, asset: string) => {
            if (backgroundColor !== 'back-green selectable') {
                const res = await cryptoAssetOperations(token, sheetName, asset, showSellMode);

                if (showSellMode === 'individual') {
                    verifyAuth(res, setAssetOperationsHandler1);
                } else if(showSellMode === 'month') {
                    verifyAuth(res, setAssetOperationsHandler2);
                }
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
            <div className="director" onClick={() => setLoadedSheetHandler('')}>
                <SlArrowLeft />
            </div>

            <div>
                XLSX Sheet: {loadedSheet}
            </div>

            <div>
                <span>Sell's type: </span>
                <select onChange={(e) => setShowSellMode(e.target.value)}>
                    <option value="individual">Per sell</option>
                    <option value="month">Monthly</option>
                </select>
            </div>
        </nav>

        <section>
            {cryptoSummary.length ? 
                <table className='cryptoSummaryTable'>
                    <thead>
                        <tr className="selectable">
                            <th className="leftColumn" onClick={() => setShowOrderHandler('asset')}>
                                <span>Asset {assetArrowDown}</span>
                            </th>
                            <th className="middleColumn" onClick={() => setShowOrderHandler('quantity')}>
                                <span>Quantity {quantityArrowDown}</span>
                            </th>
                            <th className="rightColumn" onClick={() => setShowOrderHandler('totalValue')}>
                                <span>Total Value {totalValueArrowDown}</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>{renderedSummaryList}</tbody>
                </table>
            :
                <Spinner message=''/>
            }
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