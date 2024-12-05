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
  const { userData, isAuthenticated, logout } = useUserStore();

  const setOpenConnections = useModalStore((s) => s.setOpenConnections);

  const [menuOpen, setMenuOpen] = useState(false);

  const roles = ["Administrateur", "Livreur", "Préparateur"];
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
              {roles.includes(userData?.role?.nom_role) && (
                <li onClick={() => navigate("/gestion")}>Gestion</li>
              )}
              <FontAwesomeIcon
                onClick={logout}
                className="disconect"
                color="red"
                icon="fa-solid fa-arrow-right-from-bracket"
              />
            </>
          ) : (
            <FontAwesomeIcon
              onClick={() => setOpenConnections(true)}
              className="login"
              icon="fa-solid fa-right-to-bracket"
            />
          )}
        </ul>
      </nav>
    </header>
  );
}
