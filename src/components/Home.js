import React from "react";

import MainMenu from "./MainMenu";

const Home = ({ setPage }) => {
    return (
        <React.Fragment>
            <MainMenu />
            <footer>Finances Control Project</footer>
        </React.Fragment>
    );
}

export default Home;