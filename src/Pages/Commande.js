import React, { useEffect } from "react";
import useUserStore from "../Stores/useUserStore";
import "../Styles/Pages/Commande.scss";

export default function Commande() {
  const { allCommande, fetchAllCommandes } = useUserStore();

  useEffect(() => {
    const loadCommandes = async () => {
      await fetchAllCommandes();
    };

    loadCommandes();
  }, [fetchAllCommandes]);

  return <div className="Commande">Commande </div>;
}
