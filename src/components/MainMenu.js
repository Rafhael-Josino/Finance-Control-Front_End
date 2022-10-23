import React from "react";

const MainMenu = ({ setPage }) => {
    return (
        <section id="mainMenu">
            <div>Finances Main Menu</div>
            <ul>
                <li>Cryptos</li>
                <li className="director" onClick={() => setPage("transactions")}>Finances</li>
            </ul>
        </section>
    );
}

export default MainMenu;