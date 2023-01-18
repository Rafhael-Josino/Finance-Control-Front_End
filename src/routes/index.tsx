import { Routes, Route  } from "react-router-dom";

import MainMenu from "../pages/MainMenu";
import Transactions from "../pages/Transactions";
import Cryptos from "../pages/Cryptos";
import LoginMenu from "../pages/LoginMenu";
import SignUp from "../pages/SignUp";

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

    //<Route path='/login' element={<MainMenu />} />
    return (
        <Routes>
            <Route path='/*' element={
                userAuth.token === '' ? 
                <LoginMenu setUserAuth={setUserAuth} /> :
                <MainMenu setUserAuth={setUserAuth} userAuth={userAuth}/>
            } />
            <Route path='/sign-up' element={<SignUp setUserAuth={setUserAuth} />} />
            <Route path='/transactions' element={<Transactions setUserAuth={setUserAuth} token={userAuth.token} />} />
            <Route path='/cryptocoins' element={<Cryptos setUserAuth={setUserAuth} token={userAuth.token} />} />
        </Routes>
    );
}

export default AppRoutes;