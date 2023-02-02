import { Link } from 'react-router-dom'

type Props = {
    userAuth: {
        userName: string;
        token: string;
    }, 
   verifyAuth: (res: any) => void
}

function Navigator(props: Props): JSX.Element {
    const { userAuth, verifyAuth } = props;

    const unauthenticate = () => {
        localStorage.removeItem('userName');
        localStorage.removeItem('token');
        verifyAuth('Invalid token')
    }

    const sign = userAuth.token === '' ?
        <div className='director'>
            <Link to={'/sign-up'}>SIGN UP</Link>
        </div> :
        <div className='director sign-out' onClick={unauthenticate}>
            SIGN OUT
        </div> 
    

    return (
            <header>
            <nav>
                <div id="logo">Finances Control Project</div>
                <div className="subHeader">
                    <div className="director">
                        <Link to={'/main-menu'}>HOME</Link>
                    </div>
                    <div id="about">ABOUT</div>
                    <div id="services">SERVICES</div>
                    <div id="testimonials">TESTIMONIALS</div>
                    {sign}
                    <div id="contact">CONTACT</div>
                </div>
            </nav>
        </header>
    )
}

export default Navigator;