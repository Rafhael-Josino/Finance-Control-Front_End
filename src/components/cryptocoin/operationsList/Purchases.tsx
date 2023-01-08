import { PurchaseType } from "../../../types";
import CurrencyFormating from "../../../utils/CurrencyFormating";

type Props = {
    purchases: PurchaseType[],
    highlightedOps: string[],
}

function PurchasesList (props: Props) {
    const { purchases, highlightedOps } = props;
    
    let tableClass: string;

    const renderedPurchases = purchases.map((purchase) => {
        if (highlightedOps.includes(purchase.purchase_id)) {
            tableClass = 'cryptoOpList highlighted';
        } else {
            tableClass = 'cryptoOpList';
        }

        return <table className={tableClass} key={purchase.purchase_id}>
            <tbody>
                <tr>
                    <td className="leftColumn">Purchase Date:</td>
                    <td className="rightColumn">{purchase.purchase_date.slice(0,10)}</td>
                </tr>
                <tr style={{backgroundColor:"azure"}}>
                    <td className="leftColumn">Purchase Local:</td>
                    <td className="rightColumn">{purchase.purchase_local}</td>
                </tr>
                <tr>
                    <td className="leftColumn">Purchase Medium Price:</td>
                    <td className="rightColumn">{CurrencyFormating(purchase.purchase_medium_price)}</td>
                </tr>
                <tr style={{backgroundColor:"azure"}}>
                    <td className="leftColumn">Total Bought:</td>
                    <td className="rightColumn">{purchase.total_bought}</td>
                </tr>
                <tr>
                    <td className="leftColumn">Purchase Tax:</td>
                    <td className="rightColumn">{purchase.tax}</td>
                </tr>
                <tr style={{backgroundColor:"azure"}}>
                    <td className="leftColumn">Remain Quantity:</td>
                    <td className="rightColumn">{purchase.remain_quant}</td>
                </tr>
            </tbody>
        </table>
    });

    return <div id="purchasesDiv">
        <h2 id="h2purchases">Purchases</h2>
        {renderedPurchases}
    </div>
}

export default PurchasesList;