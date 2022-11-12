import { Link } from 'react-router-dom'

type Props = {
    token: {
        userName: string;
        token: string;
    }
}

const Navigator = (props: Props): JSX.Element => {
    const { token } = props;

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
                    <div id="navUserName">{token.userName === '' ? 'LOGIN' : token.userName}</div>
                    <div id="contact">CONTACT</div>
                </div>
            </nav>
        </header>
    )
}

export default Navigator;