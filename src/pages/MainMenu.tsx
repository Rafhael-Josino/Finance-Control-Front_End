import { useEffect } from 'react';
import { Link } from "react-router-dom";
import { requestUser } from '../actions';
import ifLoginDoThing from '../hooks/useIfLoginDoThing';

type Props = {
    userAuth: {
        userName: string;
        token: string;
    },
    setUserAuth: React.Dispatch<React.SetStateAction<{
        userName: string;
        token: string;
    }>>,
}

const MainMenu = (props: Props): JSX.Element => {
    const { userAuth, setUserAuth } = props;

    useEffect(() => {
        const actionRequestUser = async (userAuth: Props['userAuth']) => {
            const res = await requestUser(userAuth.token, userAuth.userName);

           ifLoginDoThing(res, setUserAuth, () => console.log('at main-menu', res))
        }

        actionRequestUser(userAuth);
    }, [])

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