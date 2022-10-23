import React, { useState } from "react";

import Navigator from "./Navigator";
import MainMenu from "./MainMenu";
import Transactions from "./Transactions";

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