import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import logo from "../../Assets/logo/logo.png";
import ImgBox from "../../Components/ImgBox";

import { useNavigate } from "react-router-dom";
import useModalStore from "../../Stores/useModalStore";
import useUserStore from "../../Stores/useUserStore";
import "../../Styles/Contents/Header.scss";

export default function Header() {
  let navigate = useNavigate();
  const { isAuthenticated, logout } = useUserStore();
  const setOpenConnections = useModalStore((s) => s.setOpenConnections);

  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="Header">
      <ImgBox
        nameBox="logo"
        urlSrc={logo}
        desc="logo de la boulangerire"
        navlogo="/"
      />
      <nav className="nav-links">
        <FontAwesomeIcon
          className="bars"
          icon="fa-solid fa-bars"
          onClick={() => setMenuOpen(!menuOpen)}
        />
        <ul className={menuOpen ? "open" : "close"}>
          <li onClick={() => navigate("/nos-produits")}>Nos produits</li>

          {isAuthenticated ? (
            <>
              <li onClick={() => navigate("/mon-panier")}>Mon panier</li>
              <li onClick={() => navigate("/mes-commandes")}>Mes Commandes</li>
              <button onClick={logout} className="button">
                Se Déconnecter
              </button>
            </>
          ) : (
            <button onClick={() => setOpenConnections(true)} className="button">
              Se Connecter
            </button>
          )}
        </ul>
      </nav>
    </header>
  );
}
