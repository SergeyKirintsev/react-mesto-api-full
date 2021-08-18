import { Link, useLocation } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header({ userEmail, loggedIn, onSignOut }) {
  const { pathname } = useLocation();

  const to =
    pathname === '/sign-up'
      ? '/sign-in'
      : pathname === '/sign-in'
      ? '/sign-up'
      : '';
  const text =
    pathname === '/sign-up'
      ? 'Войти'
      : pathname === '/sign-in'
      ? 'Регистрация'
      : '';

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип" />

      <div className="header__user-status">
        <p className="header__email">{userEmail}</p>
        {loggedIn ? (
          <Link to="/" className="header__link" onClick={onSignOut}>
            Выйти
          </Link>
        ) : (
          <Link to={to} className="header__link">
            {text}
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
