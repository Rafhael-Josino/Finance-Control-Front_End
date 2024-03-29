import { SellType, PurchaseSold } from "../../../types";
import CurrencyFormating from "../../../utils/CurrencyFormating";
import Spinner from "../../Spinner";

type Props = {
    sells:  SellType[],
    awaitAsset: string,
    highlightedOps: string[],
    setHighlightedOpsHelper: (idsList: string[]) => void,
}

function IndividualSells(props: Props) {
    const { sells, awaitAsset, highlightedOps, setHighlightedOpsHelper } = props;

    // saves which operations (the clicked sell and respective purchases) will be highlighted
    const activateHighlight = (purchases_sold: PurchaseSold[], thisSellId: string) => {
        // If this sell was already selected, undo the current hightlight
        // The first element is always the selected sell
        if (highlightedOps[0] === thisSellId) {
            setHighlightedOpsHelper([]);
        } 
        else {
            // List of purchases_id that shall be hightlighted
            const highlightedIds = purchases_sold.map(p => p.purchase_id);

            // Adds the selected sell_id (as the first element) so it will also be highlighted
            highlightedIds.unshift(thisSellId);

            setHighlightedOpsHelper(highlightedIds);
        }
    }

    const renderedSells = sells.map((sell, index) => {
        let className: string = 'cryptoOpList sell';
        let purchases_sold_rendered: JSX.Element[] | null = null;
        
        if (highlightedOps[0] === String(index)) {
            className='cryptoSellSelected';

            purchases_sold_rendered = sell.purchases_sold.map((purchase_sold, index) => {
                return <table className={'purchaseSold'} key={index}>
                    <tbody>
                        <tr style={{backgroundColor:"azure"}}>
                            <td className="leftColumn">Purchase Date:</td>
                            <td className="rightColumn">{purchase_sold.purchase_date.slice(0, 10)}</td>
                        </tr>
                        <tr>
                            <td className="leftColumn">Purchase Price:</td>
                            <td className="rightColumn">{CurrencyFormating(purchase_sold.purchase_medium_price)}</td>
                        </tr>
                        <tr style={{backgroundColor:"azure"}}>
                            <td className="leftColumn">Quantity Sold:</td>
                            <td className="rightColumn">{purchase_sold.quant_sold}</td>
                        </tr>
                    </tbody>
                </table>
            });
        }

        return <div className="individualSellTable">
            <table className={className} key={sell.sell_id} onClick={()=>activateHighlight(sell.purchases_sold, String(index))}>
                <tbody>
                    <tr>
                        <td className="leftColumn">Date:</td>
                        <td className="rightColumn">{sell.sell_date.slice(0, 10)}</td>
                    </tr>
                    <tr style={{backgroundColor:"azure"}}>
                        <td className="leftColumn">Medium Price::</td>
                        <td className="rightColumn">{CurrencyFormating(sell.received / sell.quant_sold)}</td>
                    </tr>
                    <tr>
                        <td className="leftColumn">Aquisition Value:</td>
                        <td className="rightColumn">{CurrencyFormating(sell.aquisitionValue)}</td>
                    </tr>
                    <tr style={{backgroundColor:"azure"}}>
                        <td className="leftColumn">Quantity Sold:</td>
                        <td className="rightColumn">{sell.quant_sold}</td>
                    </tr>
                    <tr>
                        <td className="leftColumn">Value Received:</td>
                        <td className="rightColumn">{CurrencyFormating(sell.received)}</td>
                    </tr>
                </tbody>
            </table>
            {purchases_sold_rendered}
        </div> 
    });

    return <div id="sellsDiv">
        <h2 className="cryptoOpsHeader">Sells / Taxes</h2>
        {
            awaitAsset !== '' ?
                <Spinner message='' />
            :
                renderedSells.length > 1 ?
                    <div className="opsContainer">
                        {renderedSells}
                    </div>
                :
                    renderedSells
        }
    </div>
}

export default IndividualSells;