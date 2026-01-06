import { Link } from "react-router-dom";
import logoImage from './slashdot-films-wickerman.png';
import './Logo.css';

function Logo() {
  return (
    <div className="logo">
      <Link to="/">
        <img
          src={logoImage}
          alt="Slashdot Films logo"
          className="logo-img"
        />
      </Link>
    </div>
  );
}

export default Logo;
