import { useState, useEffect, SetStateAction } from "react";
import PurchasesList from "./operationsList/Purchases";
import MonthSells from "./operationsList/MonthSells";
import { PurchaseType, PurchaseSold, SellType, SellTypeMonth } from "../../types";

type Props = {
    purchases: PurchaseType[],
    sells: SellType[] | SellTypeMonth[],
    showSellMode: string,
}

function OperationsSec(props: Props) {
    const { purchases, sells, showSellMode } = props;
    const [highlightedOps, setHighlightedOps] = useState<string[]>([])
    
    useEffect(() => {
        setHighlightedOps([]);
    }, [showSellMode, purchases, sells]);

    const setHighlightedOpsHelper = (idsList: string[]) => {
        setHighlightedOps(idsList);
    }

    const RenderedSells = showSellMode === 'month' ? 
        <MonthSells 
            sells={sells as SellTypeMonth[]}
            highlightedOps={highlightedOps}
            setHighlightedOpsHelper={setHighlightedOpsHelper}
        /> 
        :
        0 //temp

    return <section id="operationsSec">
        <PurchasesList 
            purchases={purchases}
            highlightedOps={highlightedOps} 
        />
        {RenderedSells}
    </section>
}

export default OperationsSec;