import { useState, useEffect } from "react";
import PurchasesList from "./operationsList/Purchases";
import MonthSells from "./operationsList/MonthSells";
import IndividualSells from "./operationsList/IndividualSells";
import { PurchaseType, SellType, SellTypeMonth } from "../../types";

type Props = {
    purchases: PurchaseType[],
    individualSells: SellType[],
    monthlySells: SellTypeMonth[],
    awaitAsset: string,
    showSellMode: string,
}

function OperationsSec(props: Props) {
    const { purchases, individualSells, monthlySells, awaitAsset, showSellMode } = props;
    const [highlightedOps, setHighlightedOps] = useState<string[]>([])
    
    
    useEffect(() => {
            return () => setHighlightedOps([])
    }, [showSellMode, purchases]);

    const setHighlightedOpsHelper = (idsList: string[]) => {
        setHighlightedOps(idsList);
    }

    const RenderedSells = showSellMode === 'individual' ?   
    <IndividualSells 
        sells={individualSells}
        awaitAsset={awaitAsset}
        highlightedOps={highlightedOps}
        setHighlightedOpsHelper={setHighlightedOpsHelper}
    /> :
    <MonthSells 
        sells={monthlySells}
        awaitAsset={awaitAsset}
        highlightedOps={highlightedOps}
        setHighlightedOpsHelper={setHighlightedOpsHelper}
    /> 
        
    return <section className="operationsSec">
        <PurchasesList 
            purchases={purchases}
            awaitAsset={awaitAsset}
            highlightedOps={highlightedOps}
        />
        {RenderedSells}
    </section>
}

export default OperationsSec;