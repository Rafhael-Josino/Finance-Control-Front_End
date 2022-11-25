import React, { useState } from "react";

import Navigator from "./Navigator";
import AppRoutes from "../routes";



const App = (): JSX.Element => {
    let userName: string, token: string;

    if (localStorage.getItem('userName') && localStorage.getItem('token')) {
        userName = localStorage.getItem('userName') as string;
        token = localStorage.getItem('token') as string;
    } else {
        userName = '';
        token = '';
    }

    const [userAuth, setUserAuth] = useState({ userName, token });

    return (
        <React.Fragment>
            <Navigator userAuth={userAuth} />
            {
                //userAuth.token === '' ? 
                //<LoginMenu setUserAuth={setUserAuth} /> : 
                <AppRoutes setUserAuth={setUserAuth} userAuth={userAuth} />
            }
        </React.Fragment>
    );
}

export default App;