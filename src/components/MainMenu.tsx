import { Link } from "react-router-dom";

const MainMenu = (): JSX.Element => {
    return (
        <section id="mainMenu">
            <div className="mainMenu">Finances Main Menu</div>
            <ul>
                <li><Link to='/cryptocoins'>CryptoCoins</Link></li>
                <li><Link to='/transactions'>Transactions</Link></li>
            </ul>
        </section>
    );
}

export default MainMenu;