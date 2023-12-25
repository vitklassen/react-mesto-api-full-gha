import logoPath from "../image/logo/header-logo.svg";
import { Link, useNavigate } from "react-router-dom";
function Header(props) {
  const navigate = useNavigate();
  function onSign() {
    if(props.text === "Выйти") {
      localStorage.removeItem('jwt');
    }
    navigate(`/${props.path}`, {replace: true});
  }
  return (
    <header className="header">
      <img className="logo" src={logoPath} alt="Логотип" />
      <div className="header__info">
        <p className="header__userEmail">{props.email}</p>
        <Link className="header__link" onClick={onSign} to={`/${props.path}`}>
          {props.text}
        </Link>
      </div>
    </header>
  );
}
export default Header;
