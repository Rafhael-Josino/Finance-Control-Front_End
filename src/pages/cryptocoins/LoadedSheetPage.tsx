import { useState, useEffect } from "react";
import { SlArrowLeft, SlArrowDown, SlCursor } from 'react-icons/sl';
import { CryptoSummaryType, PurchaseType, res1, res2, SellType, SellTypeMonth } from "../../types";
import { cryptocoinSummary, cryptoAssetOperations } from "../../actions";
import OperationsSec from "../../components/cryptocoin/OperationsSec";
import CurrencyFormating from "../../utils/CurrencyFormating";
import Spinner from "../../components/Spinner";

type Props = {
    token: string,
    verifyAuth: (res: any, next: (res: any) => void) => void
    loadedSheet: string,
    setPageDisplayedHandler: (responseState: 0|1|2|3|4) => void,
    setRestartPageHandler: () => void,
}

const LoadedSheetPage = (props: Props) => {
    const { token, verifyAuth, loadedSheet, setRestartPageHandler } = props;
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
    const [assetsList, setAssetsList] = useState([]);
    const [showOrder, setShowOrder] = useState('asset');
    const [awaitAsset, setAwaitAsset] = useState('');
    
    // The arrows that indicate by which parameter the cryptcoins list is ordered
    let assetArrowDown = <SlCursor />;
    let quantityArrowDown = <SlCursor />;
    let totalValueArrowDown = <SlCursor />;

    /**
     * Use effect
     */

    // Get the summary list of crytocoins in this account
    useEffect(() => {
        const cryptocoinSummaryAction = async (token: string, sheetName: string) => {
            const res = await cryptocoinSummary(token, sheetName);

            verifyAuth(res, setAssetsList);
        }

        cryptocoinSummaryAction(token, loadedSheet);
    }, [loadedSheet, token, verifyAuth]);

    // Resets the lists of operations displayed when showSellMode changes
    // As it is passed in the callback's return, it does nothing in the first render
    useEffect(() => {
        return () => setAssetOperations({
            asset: '', 
            purchases: [],
            individualSells: [],
            monthlySells: [],
        });
    }, [showSellMode]);

    // While the spinners of asset operations sections is displayed, makes the request
    useEffect(() => {
        if (awaitAsset !== '') {
            const cryptoAssetOperationsAction = async () => {
                const res = await cryptoAssetOperations(token, loadedSheet, awaitAsset, showSellMode);
                
                if (showSellMode === 'individual') {
                    verifyAuth(res, (res: res1) => {
                        setAssetOperations({
                            asset: res.asset,
                            purchases: res.purchases,
                            individualSells: res.sells,
                            monthlySells: []
                        });
                    });
                } else if(showSellMode === 'month') {
                    verifyAuth(res, (res: res2) => {
                        setAssetOperations({
                            asset: res.asset,
                            purchases: res.purchases,
                            individualSells: [],
                            monthlySells: res.sells
                        });
                    });
                }
            }

            cryptoAssetOperationsAction();
        }
    }, [awaitAsset, token, verifyAuth, showSellMode, loadedSheet]);

    // When assetOperations updates, resets the value of awaitAsset
    useEffect(() => {
        setAwaitAsset('');
    }, [assetOperations]);

    /**
     * Sets the order by which the rows of each cryptocoin summary are displayed
     */

    let cryptoSummOrdered: CryptoSummaryType[];

    // Alphabetical
    if (showOrder === 'asset') {
        cryptoSummOrdered = assetsList.sort((a: any, b: any) => (a.asset < b.asset) ? -1 : 1);
        assetArrowDown = <SlArrowDown />;
    // Decreasingly quantity of each cryptocoin
    } else if (showOrder === 'quantity') {
        cryptoSummOrdered = assetsList.sort((a: any, b: any) => b.total_quant - a.total_quant);
        quantityArrowDown = <SlArrowDown />;
    // Deacresingly total value of each cryptocoin
    } else if (showOrder === 'totalValue') {
        cryptoSummOrdered = assetsList.sort((a: any, b: any) => b.total_value - a.total_value);
        totalValueArrowDown = <SlArrowDown />;
    // No order, the list is displayed as it was received
    } else {
        cryptoSummOrdered = assetsList;
        assetArrowDown = <SlArrowDown />;
    }

    const setShowOrderHandler = (newShowOrder: 'asset' | 'quantity' | 'totalValue') => {
        setShowOrder(newShowOrder);
    }

    /**
     * The renderenring of the (ordered) summary list
     */

    const renderedSummaryList = cryptoSummOrdered.map((assetsList: CryptoSummaryType, index) => {
        // Determines element class that shows which asset was selected
        const backgroundColor = assetsList.asset === assetOperations.asset ?
            'back-green selectable' : 
            (index % 2 ? 'back-gray selectable' : 'selectable');

        const renderedSummatyClickHandler = (asset: string) => {
            if (asset !== assetOperations.asset) setAwaitAsset(asset);
        }

        return <tr 
            key={index} 
            className={backgroundColor} 
            onClick={() => renderedSummatyClickHandler(assetsList.asset)} //fix 
        >
            <td className="leftColumn">{assetsList.asset}</td>
            <td className="middleColumn">{assetsList.total_quant}</td>
            <td className="rightColumn">{CurrencyFormating(assetsList.total_value)}</td>
        </tr>
    });

    /**
     * Other handler functions
     */
    const returnButtonHandler = () => {
        if (assetOperations.asset === '') {
            setRestartPageHandler()
        } else {
            setAssetOperations({
                asset: '', 
                purchases: [],
                individualSells: [],
                monthlySells: [],
            });
        }
    }

    return <main className="mainMenu">
        <section className="cryptopageMainMenu">
            <nav className="navCryptos navSheetLoaded">
                <div className="director" onClick={returnButtonHandler}>
                    <SlArrowLeft />
                </div>

                <div>
                    XLSX Sheet: {loadedSheet} - {assetOperations.asset}
                </div>

                <div>
                    <span>Sell's type: </span>
                    <select onChange={(e) => setShowSellMode(e.target.value)}>
                        <option value="individual">Per sell</option>
                        <option value="month">Monthly</option>
                    </select>
                </div>
            </nav>

            {
                assetOperations.asset === '' ?
                    <section>
                        {assetsList.length ? 
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
                :
                    <OperationsSec 
                    purchases={assetOperations.purchases}
                    individualSells={assetOperations.individualSells}
                    monthlySells={assetOperations.monthlySells}
                    awaitAsset={awaitAsset}
                    showSellMode={showSellMode}
                    />
        }
        </section>
    </main>
}

export default LoadedSheetPage;