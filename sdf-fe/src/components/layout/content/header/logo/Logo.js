import logoImage from './slashdot-films-wickerman.png'; // or .webp
import './Logo.css'

function Logo() {
  return (
    <div className="logo">
      <img src={logoImage} alt="Slashdot Films logo" className="logo-img" />
    </div>
  );
}
export default Logo