import { useEffect, useState, useRef } from "react";

type PurchaseType = {
    purchase_id: string,
    purchase_date: string,
    purchase_local: string,
    total_bought: number,
    purchase_medium_price: number,
    tax: number,
    remain_quant: number,
}

type SellType = {
    sell_id: string,
    sell_date: string,
    sell_local: string,
    quant_sold: number,
    received: number,
    purchases_sold: {
        purchase_id: string,
        quant_sold: string,
    }[],
}

type Props = {
    purchases: PurchaseType[],
    sells: SellType[],
}

function CryptoOperations(props: Props) {
    const { purchases, sells} = props;
    const [opsSelected, setOpsSelected] = useState({
        sellSelected: '',
        purchasesSold: [] as SellType['purchases_sold']
    });
 
    
    const renderedPurchases = purchases.map((purchase, index) => {
        let quantitySoldTableRoll = null;
        
        for (let i=0; i<opsSelected.purchasesSold.length; i++) {
            if (purchase.purchase_id === opsSelected.purchasesSold[i].purchase_id) {
                quantitySoldTableRoll = <tr style={{color: 'red'}}>
                    <td className="leftColumn">Quantity sold:</td>
                    <td className="rightColumn">{opsSelected.purchasesSold[i].quant_sold}</td>
                </tr>
                break;
            }
        }

        return <table className='cryptoOpList' key={purchase.purchase_id}>
            <tbody>
                <tr>
                    <td className="leftColumn">Purchase Date:</td>
                    <td className="rightColumn">{purchase.purchase_date.slice(0,10)}</td>
                </tr>
                <tr>
                    <td className="leftColumn">Purchase Local:</td>
                    <td className="rightColumn">{purchase.purchase_local}</td>
                </tr>
                <tr>
                    <td className="leftColumn">Total Bought:</td>
                    <td className="rightColumn">{purchase.total_bought}</td>
                </tr>
                <tr>
                    <td className="leftColumn">Purchase Tax:</td>
                    <td className="rightColumn">{purchase.tax}</td>
                </tr>
                <tr>
                    <td className="leftColumn">Remain Quantity:</td>
                    <td className="rightColumn">{purchase.remain_quant}</td>
                </tr>
                {quantitySoldTableRoll}
            </tbody>
        </table>
    });

    const renderedSells = sells.map((sell, index) => {
        const tableSellClass = sell.sell_id === opsSelected.sellSelected ? 
        'cryptoOpList sellTableSelected' : 'cryptoOpList';

        const showIndividualSells = () => {
            setOpsSelected({
                sellSelected: sell.sell_id,
                purchasesSold: sell.purchases_sold,
            });
        }

        return <table className={tableSellClass} key={sell.sell_id}>
            <tbody>
                <tr>
                    <td className="leftColumn">Sell Date:</td>
                    <td className="rightColumn">{sell.sell_date.slice(0,10)}</td>
                </tr>
                <tr>
                    <td className="leftColumn">Sell Local:</td>
                    <td className="rightColumn">{sell.sell_local}</td>
                </tr>
                <tr>
                    <td className="leftColumn">Quantity Sold:</td>
                    <td className="rightColumn">{sell.quant_sold}</td>
                </tr>
                <tr>
                    <td className="leftColumn">Value Received:</td>
                    <td className="rightColumn">R$ {sell.received}</td>
                </tr>
                <tr>
                    <td className='leftColumn showSells' onClick={showIndividualSells}>Show indiviudal sells</td>
                </tr>
            </tbody>
        </table>
    })

    return <section id="operationsSec">
        <div id="purchasesDiv">
            <h2 id="h2purchases">Purchases</h2>
            {renderedPurchases}
        </div>

        <div id="sellsDiv">
            <h2 id="h2sells">Sells</h2>
            {renderedSells}
        </div>
    </section>

}

export default CryptoOperations;