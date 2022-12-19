import { Link } from 'react-router-dom'

type Props = {
    userAuth: {
        userName: string;
        token: string;
    }
}

const Navigator = (props: Props): JSX.Element => {
    const { userAuth } = props;

    return (
            <header>
            <nav>
                <div id="logo">Finances Control Project</div>
                <div className="subHeader">
                    <div className="director" id="home">
                        <Link to={'/main-menu'}>HOME</Link>
                    </div>
                    <div id="about">ABOUT</div>
                    <div id="services">SERVICES</div>
                    <div id="testimonials">TESTIMONIALS</div>
                    <div id="navUserName">{userAuth.token === '' ? 'LOGIN' : userAuth.userName}</div>
                    <div id="contact">CONTACT</div>
                </div>
            </nav>
        </header>
    )
}

export default Navigator;