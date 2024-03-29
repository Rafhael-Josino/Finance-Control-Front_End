import { useState } from "react";
import { requestLogin } from "../actions";

type Props = {
    authenticateUser: (userName: string, token: string) => void,
}

const LoginMenu = (props: Props): JSX.Element => {
    const { authenticateUser } = props;

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [invalidLogin, setInvalidLogin] = useState('sr-only');

    const buttonSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        
        const res = await requestLogin({ userName, password });
 
        if (res === 'Username or password incorrect') {
            setInvalidLogin('sign-error');
        } else {
            authenticateUser(userName, res);
        }
    }

    return (
        <main id="mainMenu">
            <div className="divLogin">
                <div className="divForm">
                    <form action="./newTransaction" method="post" id="newForm">
                        <div className="input-group">
                            <div>Username:</div>
                            <label>
                                <input 
                                    type='text' 
                                    className="userLogin" 
                                    placeholder="User or e-mail"
                                    required 
                                    value={userName}
                                    onChange={(event) => setUserName(event.target.value)}
                                    />
                            </label>
                        </div>
                        <div className="input-group">
                            <div>Password:</div>
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
                            >Login</button>
                        </div>
                        <div className={invalidLogin}>
                            <span>User or password incorrect</span>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}

export default LoginMenu;