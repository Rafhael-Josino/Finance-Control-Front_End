import { useState } from "react";

import { requestLogin } from "../actions";

type Props = {
    setToken: React.Dispatch<React.SetStateAction<{
        userName: string;
        token: string;
    }>>;
}

const LoginMenu = (props: Props): JSX.Element => {
    const { setToken } = props;

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [invalidLogin, setInvalidLogin] = useState('sr-only');

    const buttonSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        
        const res = await requestLogin(user, password);
 
        if (res === 'Username or password incorrect') setInvalidLogin('invalidLogin');
 
        else {
            console.log(res)
            setToken({
                userName: user,
                token: res,
            });
        }
    }

    return (
        <main id="mainMenu">
            <div className="mainMenu">Finances Main Menu</div>
            <div className="divLogin">
                <div className="divForm">
                    <h2>Login</h2>
                    <form action="./newTransaction" method="post" id="newForm">
                        <div className="input-group">
                            <label>
                                <input 
                                    type='text' 
                                    className="userLogin" 
                                    placeholder="User or e-mail"
                                    required 
                                    value={user}
                                    onChange={(event) => setUser(event.target.value)}
                                    />
                            </label>
                        </div>
                        <div className="input-group">
                            <label>
                                <input 
                                    type="password"
                                    className="passwordLogin"
                                    placeholder="password" 
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    required />
                            </label>
                        </div>
                        <div className="formButtons input-group">
                            <button 
                                className="formConfirm"
                                type="submit"
                                id="newConfirm"
                                onClick={(event) => buttonSubmit(event)}
                            >
                                Login
                            </button>
                        </div>
                        <div className={invalidLogin}>
                            <span>User or password uncorrect</span>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}

export default LoginMenu;