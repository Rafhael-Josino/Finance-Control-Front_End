import React, { useState } from "react";

import Navigator from "./Navigator";
import MainMenu from "./MainMenu";
import Transactions from "./Transactions";
import Cryptos from "./Cryptos";

const App = () => {
    const [page, setPage ] = useState('home');

    switch(page) {
        case('transactions'):
            return (
                <div>
                    <Navigator setPage={setPage}/>
                    <Transactions />
                    <footer>Finances Control Project</footer>
                </div>
            );
        case('cryptos'):
            return (
                <div>
                    <Navigator setPage={setPage}/>
                    <Cryptos />
                    <footer>Finances Control Project</footer>
                </div>
            )
        default:
            return (
                <div>
                    <Navigator setPage={setPage}/>
                    <MainMenu setPage={setPage}/>
                    <footer>Finances Control Project</footer>
                </div>
            );
    }
}

export default App;