import React from "react";
import { Routes, Route } from "react-router-dom";

import MainMenu from "../components/MainMenu";
import Transactions from "../components/transaction/Transactions";
import Cryptos from "../components/cryptocoin/Cryptos";

const AppRoutes = ({ token, setToken }) => {
    return (
        <Routes>
        <Route path='/login' element={<MainMenu />} />
        <Route path='/main-menu' element={<MainMenu />} />
        <Route path='/transactions' element={<Transactions setToken={setToken} token={token.token} />} />
        <Route path='/cryptocoins' element={<Cryptos token={token.token} />} />
        <Route path='/*' element={
                <div>
                    <h1>Oops!</h1>
                    <p>Sorry, the present URL has no correspondent page.</p>
                </div>
            } />
        </Routes>
    );
}

export default AppRoutes;