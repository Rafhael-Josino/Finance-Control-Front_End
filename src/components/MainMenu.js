import React from "react";

const MainMenu = ({ setPage }) => {
    return (
        <section id="mainMenu">
            <div className="mainMenu">Finances Main Menu</div>
            <ul>
                <li className="director" onClick={() => setPage("cryptos")}>Cryptos</li>
                <li className="director" onClick={() => setPage("transactions")}>Finances</li>
            </ul>
        </section>
    );
}

export default MainMenu;