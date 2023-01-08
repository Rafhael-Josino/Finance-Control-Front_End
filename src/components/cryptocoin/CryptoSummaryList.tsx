import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cryptocoinSummary, cryptoAssetOperations } from "../../actions";
import ifLoginDoThing from "../../hooks/useIfLoginDoThing";
import OperationsSec from "./OperationsSec";

type CryptoSummaryType = {
    asset: string,
    total_quant: number,
    total_value: number,
}

type Props = {
    selectedSheet: string,
    token: string,
    setUserAuth: React.Dispatch<React.SetStateAction<{
        userName: string;
        token: string;
    }>>,
    showSellMode: string,
}

const CryptoSummaryList = (props: Props) => {
    const { selectedSheet, token, setUserAuth, showSellMode } = props;
    const navigate = useNavigate();
    const [assetOperations, setAssetOperations] = useState({
        asset: '',
        purchases: [],
        sells: [],
    });
    const [cryptoSumm, setCryptoSumm] = useState([]);

    useEffect(() => {
        const cryptocoinSummaryAction = async (token: string, sheetName: string) => {
            const res = await cryptocoinSummary(token, sheetName);

            if (!ifLoginDoThing(res, setUserAuth, setCryptoSumm)) navigate('/main-menu');
        }

        cryptocoinSummaryAction(token, selectedSheet);
    }, [selectedSheet]);

    useEffect(() => {
        setAssetOperations({asset: '', purchases: [], sells: [] });
    }, [showSellMode])

    const renderedSummaryList = cryptoSumm.map((cryptoSummary: CryptoSummaryType, index) => {
        // Determines element class that shows which asset was selected
        const backgroundColor = cryptoSummary.asset === assetOperations.asset ?
            'green' : 
            (index % 2 ? 'gray' : 'noColor');

        //Request of the respective asset's operations
        const cryptoAssetOperationsAction = async (token: string, sheetName: string, asset: string) => {
            if (backgroundColor !== 'green') {
                const res = await cryptoAssetOperations(token, sheetName, asset, showSellMode);

                if (!ifLoginDoThing(res, setUserAuth, setAssetOperations)) navigate('/main-menu');
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
                <td className="rightColumn">{`R$ ${cryptoSummary.total_value}`}</td>
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
            sells={assetOperations.sells}
            showSellMode={showSellMode}
        />
    </section>
}

export default CryptoSummaryList;