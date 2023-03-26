import mestoSvg from "../images/mesto.svg";
import {useLocation, useNavigate} from "react-router-dom";
import {useContext, useEffect} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

const Header = ({ loggedIn, onSignOut }) => {
    const { me, email } = useContext(CurrentUserContext)
    const location = useLocation()
    const navigate = useNavigate()

    const handleLogin = () => {
        navigate('/signin', {replace: true});
    }

    const handleRegister = () => {
        navigate('/signup', {replace: true});
    }

    const handleLogout = () => {
        navigate('/signin', {replace: true});
        onSignOut()
    }

    return <header className="header">
        <img alt="Место"
             className="header__logo"
             src={mestoSvg}/>
        { loggedIn && <div className='header__container'>
            <p className='header__email'>{email}</p>
            <a href={'#'} className={'header__enter'} onClick={handleLogout}>Выйти</a>
        </div>}
            { location.pathname === '/signup'
                && <a href="#" className="header__link" onClick={handleLogin}>Войти</a> }
            { location.pathname === '/signin'
                && <a href="#" className="header__link" onClick={handleRegister}>Регистрация</a> }


    </header>
}

export default Header;