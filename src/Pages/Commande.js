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

  return (
    <div className="Commande">
      <h1>Récapitulatif des commandes</h1>
      <table className="commande-table">
        <thead>
          <tr>
            <th>N° Commande</th>
            <th>Date</th>
            <th>Montant</th>
            <th>Statut</th>
            <th>Livraison</th>
            <th>Adresse</th>
          </tr>
        </thead>
        <tbody>
          {allCommande && allCommande.length > 0 ? (
            allCommande.map((commande) => {
              return (
                <tr key={commande.id_Commandes}>
                  <td>{commande.id_Commandes.toString().padStart(2, "0")}</td>
                  <td>
                    {new Date(commande.date_commande).toLocaleDateString()}
                  </td>
                  <td>{commande.total.toFixed(2)} €</td>
                  <td>{commande.status.statut_commande}</td>
                  <td>{commande.typeLivraison.type_livraison}</td>
                  <td>
                    {commande.adresseCommande === "undefined, null"
                      ? "Retrait sur place"
                      : commande.adresseCommande}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="6">Vous n'avez pas passer de commande.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
