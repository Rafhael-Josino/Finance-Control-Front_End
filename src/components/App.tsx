import React, { useState } from "react";

import Navigator from "./Navigator";
import LoginMenu from "./LoginMenu";
import AppRoutes from "../routes";

const App = (): JSX.Element => {
    const [userAuth, setUserAuth] = useState({
        userName: '',
        token: '',
    });

    return (
        <React.Fragment>
            <Navigator token={userAuth} />
            {userAuth.token === '' ? 
                <LoginMenu setUserAuth={setUserAuth} /> : 
                <AppRoutes setUserAuth={setUserAuth} userAuth={userAuth} />
            }
        </React.Fragment>
    );
}

export default App;