import React, { useEffect, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import { updateStatutCommandes } from "../../../Api/commande";
import useGestionStore from "../../../Stores/useGestionStore";
import useUserStore from "../../../Stores/useUserStore";

export default function Commande() {
  const { userData } = useUserStore();
  const {
    filterCommande,
    setFilterCommande,
    allCommandeGestion,
    fetchAllCommandesGestion,
    setIdCommande,
    setNameSee,
    setTypeLiv,
    setStatuCommmande,
    setStatuAppCommande,
  } = useGestionStore();

  // Filtre sélectionné par l'utilisateur
  const [filters, setFilters] = useState([]); // Options disponibles pour le filtre

  useEffect(() => {
    // Définir les options de filtre en fonction du rôle de l'utilisateur
    if (userData?.role?.nom_role === "Préparateur") {
      const options = [
        { value: "En liste d'attente", label: "En liste d'attente" },
        { value: "En cours", label: "En cours" },
        { value: "Préparation (En cours)", label: "Préparation (En cours)" },
        { value: "Préparation (Terminer)", label: "Préparation (Terminer)" },
      ];
      setFilters(options);
      setFilterCommande(options[0].value); // Par défaut : "En liste d'attente"
    } else if (userData?.role?.nom_role === "Livreur") {
      const options = [
        { value: "Préparation (Terminer)", label: "Préparation (Terminer)" },
        { value: "Livraison (En cours)", label: "Livraison (En cours)" },
        { value: "Livrer", label: "Livrer" },
      ];
      setFilters(options);
      setFilterCommande(options[0].value); // Par défaut : "Préparation (Terminer)"
    } else if (userData?.role?.nom_role === "Administrateur") {
      const options = [
        {
          value: "En attente de récupération du client",
          label: "En attente de récupération du client",
        },
        { value: "En liste d'attente", label: "En liste d'attente" },
        { value: "En cours", label: "En cours" },
        { value: "Préparation (En cours)", label: "Préparation (En cours)" },
        { value: "Préparation (Terminer)", label: "Préparation (Terminer)" },

        { value: "Livraison (En cours)", label: "Livraison (En cours)" },
        { value: "Livrer", label: "Livrer" },
        { value: "Récupéré", label: "Récupéré" },
        { value: "Annulé", label: "Annulé" },
      ];
      setFilters(options);
      setFilterCommande(options[0].value); // Par défaut :  "En attente de récupération du client"
    }
  }, [userData]);

  useEffect(() => {
    const loadCommandes = async () => {
      if (filterCommande) {
        await fetchAllCommandesGestion({ statut_commande: filterCommande });
      }
    };

    loadCommandes();
    const intervalId = setInterval(loadCommandes, 2000);

    return () => clearInterval(intervalId);
  }, [filterCommande, fetchAllCommandesGestion]);

  const handleRowClick = async (commande) => {
    let preparateurStatus = [
      "Préparation (En cours)",
      "Préparation (Terminer)",
    ];
    let livreurStatus = ["Livraison (En cours)", "Livrer"];

    {
      try {
        if (
          !preparateurStatus.includes(commande.status.statut_commande) &&
          userData?.role?.nom_role === "Préparateur"
        ) {
          await updateStatutCommandes({
            id_Commandes: commande.id_Commandes,
            statut_commande: "Préparation (En cours)",
          });
          setStatuAppCommande("Préparation (En cours)");
          toast.success(
            `Commande : ${commande.id_Commandes} mise à jour avec succès à "Préparation (En cours)"`,
            {
              position: "top-left",
              autoClose: 3000,
            }
          );
        }

        if (
          !livreurStatus.includes(commande.status.statut_commande) &&
          userData?.role?.nom_role === "Livreur"
        ) {
          await updateStatutCommandes({
            id_Commandes: commande.id_Commandes,
            statut_commande: "Livraison (En cours)",
          });
          setStatuAppCommande("Livraison (En cours)");
          toast.success(
            `Commande : ${commande.id_Commandes} mise à jour avec succès à "Livraison (En cours)")`,
            {
              position: "top-left",
              autoClose: 3000,
            }
          );
        }
      } catch (error) {
        console.error("Erreur lors de la mise à jour du statut :", error);
        toast.error(
          "Une erreur est survenue lors de la mise à jour du statut.",
          {
            position: "top-left",
            autoClose: 3000,
            hideProgressBar: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
        return;
      }
    }
    setStatuCommmande(commande.status.statut_commande);
    setIdCommande(commande.id_Commandes);
    setTypeLiv(commande.typeLivraison.type_livraison);

    if (userData?.role?.nom_role === "Préparateur") {
      setNameSee("DetailCommande");
    } else if (userData?.role?.nom_role === "Livreur") {
      setNameSee("DetailLivraison");
    } else if (userData?.role?.nom_role === "Administrateur") {
      setNameSee("DetailCommande");
    }
  };

  return (
    <div className="Commande">
      <div className="filter-container">
        <label htmlFor="filter">
          <Select
            id="filter"
            options={filters}
            value={filters.find((option) => option.value === filterCommande)}
            onChange={(selectedOption) =>
              setFilterCommande(selectedOption.value)
            }
            placeholder="-- Sélectionnez un filtre --"
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                boxShadow: "none",
                cursor: "pointer",
                width: "319px",
              }),
              menu: (baseStyles) => ({
                ...baseStyles,
                width: "319px",
              }),
            }}
          />
        </label>
      </div>
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
          {allCommandeGestion && allCommandeGestion.length > 0 ? (
            allCommandeGestion.map((commande) => (
              <tr
                key={commande.id_Commandes}
                onClick={() => handleRowClick(commande)}
              >
                <td>{commande.id_Commandes.toString().padStart(2, "0")}</td>
                <td>{new Date(commande.date_commande).toLocaleDateString()}</td>
                <td>{commande.total.toFixed(2)} €</td>
                <td>{commande.status.statut_commande}</td>
                <td>{commande.typeLivraison.type_livraison}</td>
                <td>
                  {commande.adresseCommande === "undefined, null"
                    ? "Retrait sur place"
                    : commande.adresseCommande}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">Aucune commande disponible pour ce filtre.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
