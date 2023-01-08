import { SellTypeMonth, PurchaseSold } from "../../../types";

type Props = {
    sells:  SellTypeMonth[],
    highlightedOps: string[],
    setHighlightedOpsHelper: (idsList: string[]) => void,
}

function MonthSells(props: Props) {
    const { sells, highlightedOps, setHighlightedOpsHelper } = props;

    const activateHighlight = (purchasesSold: PurchaseSold[], thisSellId: string) => {
        // If this sell was already selected, undo the current hightlight
        if (highlightedOps[0] === thisSellId) {
            setHighlightedOpsHelper([]);
        } else {
            const highlightedIds = purchasesSold.map(p => p.purchase_id);
            highlightedIds.unshift(thisSellId);
            setHighlightedOpsHelper(highlightedIds);
        }
    }

    const renderedSells = sells.map((sell, index) => {
        const purchaseDate = sell.purchasesSold[0].purchase_date.slice(0,7);

        let className: string;
        if (highlightedOps[0] === String(index)) {
            className='cryptoOpList sell highlighted';
        } else {
            className='cryptoOpList sell';
        }

        return <table className={className} key={index} onClick={()=>activateHighlight(sell.purchasesSold, String(index))}>
            <tbody>
                <tr>
                    <td className="leftColumn">Month of S.:</td>
                    <td className="rightColumn">{sell.sellDate}</td>
                </tr>
                <tr style={{backgroundColor:"azure"}}>
                    <td className="leftColumn">Month of P.:</td>
                    <td className="rightColumn">{purchaseDate}</td>
                </tr>
                <tr>
                    <td className="leftColumn">Aquisition Value:</td>
                    <td className="rightColumn">{sell.aquisitionValue}</td>
                </tr>
                <tr style={{backgroundColor:"azure"}}>
                    <td className="leftColumn">Quantity Sold:</td>
                    <td className="rightColumn">{sell.quantSold}</td>
                </tr>
                <tr>
                    <td className="leftColumn">Value Received:</td>
                    <td className="rightColumn">R$ {sell.receivedValue}</td>
                </tr>
            </tbody>
        </table>
    });

    return <div id="sellsDiv">
        <h2 id="h2sells">Sells</h2>
        {renderedSells}
    </div>
}

export default MonthSells;