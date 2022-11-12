import React from "react";
import { Routes, Route } from "react-router-dom";

import MainMenu from "../components/MainMenu";
import Transactions from "../components/transaction/Transactions";
import Cryptos from "../components/cryptocoin/Cryptos";

type Props = {
    userAuth: {
        userName: string;
        token: string;
    }
    setUserAuth: React.Dispatch<React.SetStateAction<{
        userName: string;
        token: string;
    }>>;
}

const AppRoutes = (props: Props) => {
    const { userAuth, setUserAuth } = props;

    return (
        <Routes>
        <Route path='/login' element={<MainMenu />} />
        <Route path='/main-menu' element={<MainMenu />} />
        <Route path='/transactions' element={<Transactions setUserAuth={setUserAuth} token={userAuth.token} />} />
        <Route path='/cryptocoins' element={<Cryptos token={userAuth.token} />} />
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