import { useState, useEffect } from "react";
import PurchasesList from "./operationsList/Purchases";
import MonthSells from "./operationsList/MonthSells";
import IndividualSells from "./operationsList/IndividualSells";
import { PurchaseType, SellType, SellTypeMonth } from "../../types";

type Props = {
    purchases: PurchaseType[],
    individualSells: SellType[],
    monthlySells: SellTypeMonth[],
    showSellMode: string,
}

function OperationsSec(props: Props) {
    const { purchases, individualSells, monthlySells, showSellMode } = props;
    const [highlightedOps, setHighlightedOps] = useState<string[]>([])
    
    useEffect(() => {
        setHighlightedOps([]);
    }, [showSellMode, purchases]);

    const setHighlightedOpsHelper = (idsList: string[]) => {
        setHighlightedOps(idsList);
    }

    const RenderedSells = showSellMode === 'individual' ?   
    <IndividualSells 
        sells={individualSells}
        highlightedOps={highlightedOps}
        setHighlightedOpsHelper={setHighlightedOpsHelper}
    /> :
    <MonthSells 
        sells={monthlySells}
        highlightedOps={highlightedOps}
        setHighlightedOpsHelper={setHighlightedOpsHelper}
    /> 
        
    return <section id="operationsSec">
        <PurchasesList 
            purchases={purchases}
            highlightedOps={highlightedOps} 
        />
        {RenderedSells}
    </section>
}

export default OperationsSec;