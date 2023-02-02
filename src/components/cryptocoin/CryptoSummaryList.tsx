import { useState, useEffect } from "react";
import { cryptocoinSummary, cryptoAssetOperations } from "../../actions";
import OperationsSec from "./OperationsSec";
import CurrencyFormating from "../../utils/CurrencyFormating";
import { CryptoSummaryType, PurchaseType, res1, res2, SellType, SellTypeMonth } from "../../types";

type Props = {
    token: string,
    verifyAuth: (res: any, next: (res: any) => void) => void
    selectedSheet: string,
    showSellMode: string,
    showOrder: string,
}

const CryptoSummaryList = (props: Props) => {
    const { selectedSheet, token, showSellMode, showOrder, verifyAuth } = props;
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

    /**
     * Use effect
     */

    // Get the summary list of crytocoins in this account
    useEffect(() => {
        const cryptocoinSummaryAction = async (token: string, sheetName: string) => {
            const res = await cryptocoinSummary(token, sheetName);

            verifyAuth(res, setCryptoSumm);
        }

        cryptocoinSummaryAction(token, selectedSheet);
    }, [selectedSheet, token, verifyAuth]);

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
                onClick={() => cryptoAssetOperationsAction(token, selectedSheet, cryptoSummary.asset)}
            >
                <td className="leftColumn">{cryptoSummary.asset}</td>
                <td className="middleColumn">{cryptoSummary.total_quant}</td>
                <td className="rightColumn">{CurrencyFormating(cryptoSummary.total_value)}</td>
            </tr>
        );
    });

    return <section>
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
    </section>
}

export default CryptoSummaryList;