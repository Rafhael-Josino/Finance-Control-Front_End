import React, { useState } from "react";

import Navigator from "./Navigator";
import LoginMenu from "./LoginMenu";
import AppRoutes from "../routes";

const App = () => {
    const [token, setToken] = useState({
        userName: '',
        token: '',
    });

    return (
        <React.Fragment>
            <Navigator token={token} />
            {token.token === '' ? <LoginMenu setToken={setToken} /> : <AppRoutes setToken={setToken} token={token} />}
        </React.Fragment>
    );
}

export default App;