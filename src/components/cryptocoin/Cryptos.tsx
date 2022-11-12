type Props = {
    token: string;
}

const Cryptos = (props: Props) => {
    const { token } = props;

    return (
        <main id="cryptosMenu">
            <nav id="navCryptos">
                <div>Cryptos Operations Log</div>
                <div className="subHeader">
                    <select name="loadSheet" id="loadSheet"></select>
                    <select name="sellsTimeSpan" id="sellsTimeSpan">
                        <option value="month">Monthly</option>
                        <option value="sell">Per sell</option>
                    </select>
                    <a href="#" id="saveSheet">Save Sheet</a>
                </div>
            </nav>

        <section id="currentSituationSec">
                <table id="currentSituationTab"></table>
            </section>

        <section id="operationsSec">
                <div id="purchasesDiv">
                    <h2 id="h2purchases">Purchases</h2>
                    <div id="tablesP"></div>
                </div>

                <div id="sellsDiv">
                    <h2 id="h2sells">Sells</h2>
                    <div id="tablesS"></div>
                </div>
            </section>
        </main>
    );
}

export default Cryptos;