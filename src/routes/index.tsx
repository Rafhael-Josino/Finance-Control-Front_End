import { Routes, Route  } from "react-router-dom";
import MainMenu from "../pages/MainMenu";
import Transactions from "../pages/Transactions";
import Cryptos from "../pages/cryptocoins";
import LoginMenu from "../pages/LoginMenu";
import SignUp from "../pages/SignUp";
import ErrorBoundary from "../error-page";

type Props = {
    userAuth: {
        userName: string;
        token: string;
    },
    authenticateUser: (userName: string, token: string) => void,
    verifyAuth: (res: any) => void,
}

const AppRoutes = (props: Props) => {
    const { userAuth, authenticateUser, verifyAuth } = props;

    return <Routes>
            <Route path='/*' errorElement={<ErrorBoundary />} element={
                userAuth.token === '' ? 
                <LoginMenu authenticateUser={authenticateUser} /> :
                <MainMenu verifyAuth={verifyAuth} userAuth={userAuth}/>
            } />

            <Route path='/sign-up' errorElement={<ErrorBoundary />} element={
                <SignUp authenticateUser={authenticateUser} />
            } />

            <Route path='/transactions' errorElement={<ErrorBoundary />} element={
                <Transactions token={userAuth.token} verifyAuth={verifyAuth} />
            } />

            <Route path='/cryptocoins/*' errorElement={<ErrorBoundary />} element={
                <Cryptos token={userAuth.token} verifyAuth={verifyAuth} />
            } />
        </Routes>
}

export default AppRoutes;