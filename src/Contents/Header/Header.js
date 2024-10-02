import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import logo from "../../Assets/logo/logo.png";
import ImgBox from "../../Components/ImgBox";

import useUserStore from "../../Stores/useUserStore ";
import "../../Styles/Contents/Header.scss";

export default function Header() {
  const { isAuthenticated, login, logout } = useUserStore();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="Header">
      <ImgBox nameBox="logo" urlSrc={logo} desc="logo de la boulangerire" />
      <nav className="nav-links">
        <FontAwesomeIcon
          className="bars"
          icon="fa-solid fa-bars"
          onClick={() => setMenuOpen(!menuOpen)}
        />
        <ul className={menuOpen ? "open" : "close"}>
          <li>Nos produits</li>
          <li>Mon panier</li>
          <li>Mes commandes</li>
          {isAuthenticated ? (
            <>
              <li>Mes Commandes</li>
              <li onClick={logout} className="button">
                Se Déconnecter
              </li>
            </>
          ) : (
            <li onClick={login} className="button">
              Se Connecter
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
