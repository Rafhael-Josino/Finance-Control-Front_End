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
    },
    authenticateUser: (userName: string, token: string) => void,
    verifyAuth: (res: any) => void
}

const AppRoutes = (props: Props) => {
    const { userAuth, authenticateUser, verifyAuth } = props;

    return (
        <Routes>
            <Route path='/*' element={
                userAuth.token === '' ? 
                <LoginMenu authenticateUser={authenticateUser} /> :
                <MainMenu verifyAuth={verifyAuth} userAuth={userAuth}/>
            } />
            <Route path='/sign-up' element={<SignUp authenticateUser={authenticateUser} />} />
            <Route path='/transactions' element={<Transactions token={userAuth.token} verifyAuth={verifyAuth} />} />
            <Route path='/cryptocoins' element={<Cryptos token={userAuth.token} verifyAuth={verifyAuth} />} />
        </Routes>
    );
}

export default AppRoutes;