import React, { useEffect, useState } from "react";

import Navigator from "../pages/Navigator";
import AppRoutes from "../routes";
import { requestUser } from "../actions";

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

    useEffect(() => {
        const requestUserAction = async () => {
            const res = await requestUser(token, userName);
        
            if (res === "Restric to administrator") {
                
            }
        }
        

    })

    return (
        <React.Fragment>
            <Navigator userAuth={userAuth} />
            <AppRoutes setUserAuth={setUserAuth} userAuth={userAuth} />
        </React.Fragment>
    );
}

export default App;