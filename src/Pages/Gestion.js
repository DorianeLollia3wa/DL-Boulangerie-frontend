import React from "react";
import Commande from "../Contents/Gestion/Commande/Commande";
import DetailCommande from "../Contents/Gestion/Commande/DetailCommande";
import useGestionStore from "../Stores/useGestionStore";
import useUserStore from "../Stores/useUserStore";
import "../Styles/Pages/Gestion.scss";

export default function Gestion() {
  const { userData } = useUserStore();

  const { nameSee } = useGestionStore();
  return (
    <div className="Gestion">
      <h1>
        Gestion {userData.nom}
        {userData?.role?.nom_role !== "Client"}
        <i>({userData?.role?.nom_role})</i>
      </h1>

      <div className="gestion-container">
        {/* Menu de navigation */}
        <nav className="menu-nav">
          <button>Commandes</button>
          {/* <button>Utilisateurs</button>
          <button>Produits</button> */}
        </nav>

        {/* Section principale */}
        <div className="main-content">
          {nameSee === "Commande" && <Commande />}
          {nameSee === "DetailCommande" && <DetailCommande />}

          {/* Ici, vous pouvez afficher les détails des commandes */}
        </div>
      </div>
    </div>
  );
}
