import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cryptocoinSummary, cryptoAssetOperations } from "../../actions";
import ifLoginDoThing from "../../hooks/useIfLoginDoThing";
import CryptoOperations from "./CryptoOperations";

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
}

const CryptoSummaryList = (props: Props) => {
    const { selectedSheet, token, setUserAuth } = props;
    const navigate = useNavigate();
    const [selectedAsset, setSelectedAsset] = useState('');
    const [cryptoSumm, setCryptoSumm] = useState([]);

    useEffect(() => {
        const cryptocoinSummaryAction = async (token: string, sheetName: string) => {
            const res = await cryptocoinSummary(token, sheetName);

            if (!ifLoginDoThing(res, setUserAuth, setCryptoSumm)) navigate('/main-menu');
        }

        cryptocoinSummaryAction(token, selectedSheet);
    }, [selectedSheet]);

    const renderedSummaryList = cryptoSumm.map((cryptoSummary: CryptoSummaryType, index) => {
        // implement callback of onClick event listener
        const backgroundColor = index % 2 ? 'gray' : 'noColor';

        const cryptoAssetOperationsAction = async (token: string, sheetName: string, asset: string) => {
            const res = await cryptoAssetOperations(token, sheetName, asset);

            if (!ifLoginDoThing(res, setUserAuth, setSelectedAsset)) navigate('/main-menu');
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
        {selectedAsset === '' ? null : <CryptoOperations />}
    </section>
}

export default CryptoSummaryList;