import { useEffect, useState } from 'react';
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
    const [description, setDescription] = useState<number>(0)

    const descriptionsArray: string[] = [
        'Pass the mouse above a service to see its description.',
        'Transactions:\nPermits the user to save transactions made by him/her, storing its value, wether it was an income or outcome, the date and a brief description.',
        'Cryptocoins:\nPermits the user to upload a XLSX file of a predetermined format that contains the logs of his/her cryptocoins transaction.\nThis aplication will separate each cryptocoin, make a summary and show each transactions in purchases or sells.',
    ];

    useEffect(() => {
        const actionRequestUser = async (userAuth: Props['userAuth']) => {
            const res = await requestUser(userAuth.token, userAuth.userName);

           ifLoginDoThing(res, setUserAuth, () => console.log('logged'))
        }

        actionRequestUser(userAuth);
    }, []);

    const setDescriptionHandler =(newIndex: number) => {
        setDescription(newIndex);
    }

    return (
        <main className="mainMenu">
            <div className="mainMenu">Choose one of our services:</div>
            <div className='mainMenuBody'>
                <div className='mainMenuList'>
                    <Link to='/transactions' 
                        onMouseEnter={() => setDescriptionHandler(1)}
                        onMouseLeave={() => setDescriptionHandler(0)}
                        >Transactions</Link>
                    <Link to='/cryptocoins' 
                        onMouseEnter={() => setDescriptionHandler(2)}
                        onMouseLeave={() => setDescriptionHandler(0)}
                    >Cryptocoins</Link>
                </div>
                <div className='mainMenuDescription'>
                    <span className='description'>{descriptionsArray[description]}</span>
                </div>
            </div>
        </main>
    );
}

export default MainMenu;