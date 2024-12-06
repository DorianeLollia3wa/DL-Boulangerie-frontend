import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  reqdetailCommande,
  updateStatutCommandes,
} from "../../../Api/commande";
import ImgBox from "../../../Components/ImgBox";
import useGestionStore from "../../../Stores/useGestionStore";
import useUserStore from "../../../Stores/useUserStore";
import "../../../Styles/Contents/Gestion/Commande/DetailCommande.scss";

export default function DetailCommande() {
  const { userData } = useUserStore();
  const { idCommande, setNameSee, typeLiv, statuCommmande } = useGestionStore();
  const { control, setValue } = useForm();
  const [detailCommande, setDetailCommande] = useState([]);
  const [statut, setStatut] = useState([]);

  useEffect(() => {
    // Charger les détails de la commande
    const loadCommandes = async () => {
      const res = await reqdetailCommande({ id_Commandes: idCommande });
      setDetailCommande(res);

      // Initialiser les valeurs pour les cases à cocher
      res.forEach((item) => {
        setValue(`prepared_${item.id_Ligne_panier}`, false);
      });
    };

    // Définir les statuts en fonction du rôle et du type de livraison
    const determineStatut = () => {
      let statuses = [];
      if (userData?.role?.nom_role === "Administrateur") {
        statuses = [
          "En liste d'attente",
          "En cours",
          "Préparation (En cours)",
          "Préparation (Terminer)",
          "En attente de récupération du client",
          "Livraison (En cours)",
          "Livré",
          "Récupéré",
          "Annulé",
        ];
      } else if (userData?.role?.nom_role === "Préparateur") {
        if (typeLiv === "Retrait sur place") {
          statuses = [
            "Préparation (En cours)",
            "En attente de récupération du client",
            "En liste d'attente",
          ];
        } else if (typeLiv === "Livraison à domicile") {
          statuses = [
            "Préparation (En cours)",
            "Préparation (Terminer)",
            "En liste d'attente",
          ];
        }
      }
      const filteredStatuses = statuses.filter(
        (status) => status !== statuCommmande
      );

      setStatut(filteredStatuses);
    };

    loadCommandes();
    determineStatut();
  }, [idCommande, setValue, userData, typeLiv]);

  async function handleStatusClick(status) {
    try {
      await updateStatutCommandes({
        id_Commandes: idCommande,
        statut_commande: status,
      });

      toast.success(
        `La commande : ${idCommande} a été modifier a "${status}" avec succès`,
        {
          position: "top-left",
          autoClose: 3000,
          hideProgressBar: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );

      setNameSee("Commande");
    } catch (error) {
      toast.error("Une erreur est survenue lors changement de statut.");
    }
  }

  return (
    <div className="DetailCommande">
      <h3>
        <FontAwesomeIcon
          className="icon arrowLeft"
          icon="fa-solid fa-arrow-left"
          onClick={() => setNameSee("Commande")}
        />
        Récapitulatif de la commande
      </h3>
      <h6>Numéro de Commande : {idCommande}</h6>
      <br />

      <div className="BoxDetail">
        {detailCommande.length > 0 &&
          detailCommande.map((detail) => (
            <article key={detail.id_Ligne_panier} className="articleDetail">
              <ImgBox nameBox="imgBox" urlSrc={detail.produit.image_product} />
              <div className="boxTexts">
                <p>
                  <strong>Réf :</strong> {detail.id_Produits}
                </p>
                <p>
                  <strong>Nom :</strong> {detail.produit.nom}
                </p>
                <p>
                  <strong>Quantité :</strong> {detail.quantite}
                </p>
                <i>{detail.produit.description}</i>
              </div>
              <div className="checkboxWrapper">
                <Controller
                  name={`prepared_${detail.id_Ligne_panier}`}
                  control={control}
                  render={({ field }) => (
                    <input
                      type="checkbox"
                      id={`checkbox-${detail.id_Ligne_panier}`}
                      {...field}
                    />
                  )}
                />
                <label htmlFor={`checkbox-${detail.id_Ligne_panier}`}>
                  Article préparé
                </label>
              </div>
            </article>
          ))}
      </div>
      <div className="statusButtons">
        <h6>Statuts disponibles :</h6>
        <div className="boxStatus">
          {statut.map((status, index) => (
            <button
              key={index}
              className="statusButton"
              onClick={() => handleStatusClick(status)}
            >
              {status}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
