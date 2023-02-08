import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigator from "../pages/Navigator";
import AppRoutes from "../routes";

const App = (): JSX.Element => {
    // Verifying wether there is an user's credential saved in the browser
    
    let userName: string, token: string;
    if (localStorage.getItem('userName') && localStorage.getItem('token')) {
        userName = localStorage.getItem('userName') as string;
        token = localStorage.getItem('token') as string;
    } else {
        userName = '';
        token = '';
    }

    const [userAuth, setUserAuth] = useState({ userName, token });
    const navigate = useNavigate()

    const authenticateUser = (userName: string, token: string) => {
        localStorage.setItem('userName', userName);
        localStorage.setItem('token', token);
        setUserAuth({ userName, token });
    }

    /**
     * Used when this application makes a request to the server 
     * as a middleware, verifying first if the authentication user is
     * still valid.
     * Also following callback function can be passed, in the case of the 
     * user be still authenticated
     */
    const verifyAuth = (res: any, next = (res: any) => {}) => {
        if (res === 'Invalid token') {
            setUserAuth({ userName: '', token: ''});

            // Test if when an user is no longer authenticated, the application will
            // redirect to the login page, that is, if the command bellow will even be called

            // This test will be made by waiting loggout time
            // To be faster, decrease the timeout value in the backend while testing
            navigate('/main-menu');

            // In the negative case, refactor the AppRoutes element to always return
            // the login page when the token attribute be ''
        } else {
            next(res);
        }
    }

    return (
        <React.Fragment>
            <Navigator userAuth={userAuth} verifyAuth={verifyAuth} />
            <AppRoutes userAuth={userAuth} authenticateUser={authenticateUser} verifyAuth={verifyAuth} />
        </React.Fragment>
    );
}

export default App;