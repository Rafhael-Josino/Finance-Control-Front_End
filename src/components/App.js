import React, { useEffect, useState } from "react";

import Navigator from "./Navigator";
import LoginMenu from "./LoginMenu";
import MainMenu from "./MainMenu";
import Transactions from "./transaction/Transactions";
import Cryptos from "./cryptocoin/Cryptos";

const App = () => {
    const [page, setPage ] = useState('');
    const [token, setToken] = useState({
        userName: '',
        token: '',
    });

  

    useEffect(() => {
        if (token.token === '') setPage('login')
        else setPage('mainMenu')
    }, [token]);

    switch(page) {
        case('transactions'):
            return (
                <div>
                    <Navigator setPage={setPage} token={token} />
                    <Transactions setToken={setToken} token={token.token} />
                    <footer>Finances Control Project</footer>
                </div>
            );
        case('cryptos'):
            return (
                <div>
                    <Navigator setPage={setPage} token={token} />
                    <Cryptos token={token.token} />
                    <footer>Finances Control Project</footer>
                </div>
            );
        case('mainMenu'):
            return (
                <div>
                    <Navigator setPage={setPage} token={token} />
                    <MainMenu setPage={setPage}/>
                    <footer>Finances Control Project</footer>
                </div>
            )
        default:
            return (
                <div>
                <Navigator setPage={setPage} token={token}/>
                <LoginMenu setPage={setPage} setToken={setToken} />
                <footer>Finances Control Project</footer>
            </div>
        );
    }
}

export default App;