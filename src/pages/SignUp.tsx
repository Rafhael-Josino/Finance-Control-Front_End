import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser, requestLogin } from "../actions";

type Props = {
    setUserAuth: React.Dispatch<React.SetStateAction<{
        userName: string;
        token: string;
    }>>;
}

function SignUp(props: Props) {
    const { setUserAuth } = props;
    const navigate = useNavigate();

    const [newUserName, setNewUserName] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassord, setConfirmPassword] = useState('');
    const [signUpError, setSignUpError] = useState('sr-only');

    const confirmPassordClass = (confirmPassord !== '') && (newPassword !== confirmPassord) ? 
        'passwordLogin diffPassword' : 'passwordLogin';

    const buttonSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();

        if (newPassword === '' || newUserName === '') {
            setSignUpError('sign-error-missing-fields');
        } else if (newPassword !== confirmPassord) {
            setSignUpError('sign-error-password-mismatch');
        } else {
            const resCreateUser = await createUser({
                userName: newUserName,
                password: newPassword,
            });

            if (resCreateUser !== `Account ${newUserName} already exists`){
                const resLogin = await requestLogin({
                    userName: newUserName,
                    password: newPassword,
                });

                console.log(resLogin)
                localStorage.setItem('token', resLogin);
                localStorage.setItem('userName', newUserName);
                setUserAuth({ userName: newUserName, token: resLogin });
                navigate('/main-menu');
            } else {
                setSignUpError('sign-error-existing-account');
            }
        }
    }

    let signUpErrorMessage: string;
    switch(signUpError) {
        case('sign-error-password-mismatch'):
            signUpErrorMessage = 'Passwords do not match';
            break;
        case('sign-error-existing-account'):
            signUpErrorMessage =  `Account ${newUserName} already exists`;
            break;
        case('sign-error-missing-fields'):
            signUpErrorMessage = 'There are missing fields';
            break;
        default:
            signUpErrorMessage = 'none';
    }

    return <main id='mainMenu'>
        <div className="divLogin">
            <div className="divForm">
                <form action="./newTransaction" method="post" id="newForm">
                    <div className="input-group">
                        <div>Username:</div>
                        <label>
                            <input 
                                type='text' 
                                className="userLogin" 
                                placeholder="required"
                                required 
                                value={newUserName}
                                onChange={(event) => setNewUserName(event.target.value)}
                                />
                        </label>
                    </div>
                    <div className="input-group">
                        <div>Password:</div>
                        <label>
                            <input 
                                type="password"
                                className="passwordLogin"
                                placeholder="required" 
                                value={newPassword}
                                onChange={(event) => setNewPassword(event.target.value)}
                                required />
                        </label>
                    </div>

                    <div className="input-group">
                        <div>Confirm password:</div>
                        <label>
                            <input 
                                type="password"
                                className={confirmPassordClass}
                                placeholder="required" 
                                value={confirmPassord}
                                onChange={(event) => setConfirmPassword(event.target.value)}
                                required />
                        </label>
                    </div>

                    <div className="formButtons input-group">
                        <button 
                            className="formConfirm"
                            type="submit"
                            id="newConfirm"
                            onClick={(event) => buttonSubmit(event)}
                        >Sign Up</button>
                    </div>

                    <div className={signUpError.slice(0,10)} >
                        <span>{signUpErrorMessage}</span>
                    </div>
                </form>
            </div>
        </div>
    </main>


}

export default SignUp;