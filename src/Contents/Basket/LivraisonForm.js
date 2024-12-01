import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { toast } from "react-toastify";
import { getAllAdresses } from "../../Api/adresse";
import { calculBasket } from "../../Api/commande";
import { getAllFraisLiv } from "../../Api/fraisLiv";
import useProduitStore from "../../Stores/useProduitStore";
import "../../Styles/Contents/Basket/LivraisonForm.scss";
import PaymentForm from "./PaymentForm";

export default function LivraisonForm({ showPayment, setShowPayment }) {
  const { basket } = useProduitStore();
  const { register, handleSubmit, watch, control } = useForm();
  const livraisonOption = watch("livraison", "retrait");
  const villeNouvelle = watch("villeNouvelle", null);
  const adresseExistante = watch("adresse", null); // Pour surveiller l'adresse existante
  const [fraisLiv, setFraisLiv] = useState([]);
  const [allAdresse, setAllAdresse] = useState([]);
  const [newAddress, setNewAddress] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [total, setTotal] = useState(0);

  const [commandeData, setCommandeData] = useState(null);

  // Prix des produits
  const prixProduits = basket.reduce(
    (total, product) => total + product.prix * product.quantity,
    0
  );

  // Frais de livraison dynamique
  const fraisLivraison =
    livraisonOption === "livraison"
      ? newAddress
        ? villeNouvelle?.montant_liv || 0 // Si une nouvelle ville est sélectionnée
        : fraisLiv.find((frais) => frais.value === adresseExistante)
            ?.montant_liv || 0 // Si une adresse existante est sélectionnée
      : 0;

  useEffect(() => {
    async function fetchData() {
      try {
        const reqFraisLiv = await getAllFraisLiv();
        const formattedFraisLiv = reqFraisLiv.map((frais) => ({
          value: frais.ville_liv,
          label: `${frais.ville_liv} (${frais.montant_liv} €)`,
          montant_liv: frais.montant_liv,
        }));
        setFraisLiv(formattedFraisLiv);

        const reqAdresse = await getAllAdresses();
        setAllAdresse(reqAdresse);
      } catch (error) {
        setErrorMessage(error.message);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    setErrorMessage("");
    async function calculateTotal() {
      try {
        const panier = basket.map((item) => ({
          id_Produits: item.id_Produits,
          quantite: item.quantity,
        }));

        const data = {
          ville_liv:
            livraisonOption === "livraison"
              ? newAddress
                ? villeNouvelle?.value
                : adresseExistante
              : "gratuite",
          type_livraison:
            livraisonOption === "retrait"
              ? "Retrait sur place"
              : "Livraison à domicile",
          panier,
        };

        if (data.ville_liv === null || data.ville_liv === undefined) {
          return setErrorMessage("Choisissez une adresse de livraison");
        }

        const response = await calculBasket(data);
        setTotal(response?.toFixed(2) || 0);
      } catch (error) {
        setErrorMessage("Erreur lors du calcul du total");
      }
    }

    if (basket.length > 0) {
      calculateTotal();
    }
    if (basket.length <= 0) {
      setTotal(0);
      return setErrorMessage("Le panier ne peut être vide");
    }
  }, [basket, livraisonOption, villeNouvelle, adresseExistante]);

  async function onSubmit(data) {
    const panier = basket.map((item) => ({
      id_Produits: item.id_Produits,
      quantite: item.quantity,
    }));

    const commande = {
      adresseCommande: newAddress
        ? `${data.adresseNouvelle} ${data.codePostalNouvelle} ${data.villeNouvelle.value} ${data.paysNouvelle}`
        : `${
            allAdresse.find((adresse) => adresse.ville === adresseExistante)
              ?.adresse
          }, ${adresseExistante}`,
      ville_liv:
        livraisonOption === "retrait" // Si retrait, ville_liv est "boulangerieLorrez"
          ? "boulangerieLorrez"
          : newAddress
          ? data.villeNouvelle.value
          : adresseExistante,
      type_livraison:
        livraisonOption === "retrait"
          ? "Retrait sur place"
          : "Livraison à domicile",
      libelle_paiement: "test vide",
      panier,
    };

    try {
      setCommandeData(commande);
      setShowPayment(true);
    } catch (error) {
      console.error("Erreur lors de la soumission de la commande : ", error);
      toast.error("Une erreur est survenue lors du traitement.");
      setShowPayment(false);
    }
  }
  if (showPayment && commandeData !== null) {
    return (
      <div className="PaymentBox">
        <PaymentForm
          total={total}
          commandeData={commandeData}
          onPaymentSuccess={() => setShowPayment(false)}
        />
      </div>
    );
  }
  return (
    <form className="LivraisonForm" onSubmit={handleSubmit(onSubmit)}>
      <div className="delivery">
        <h6>Choix de livraison</h6>
        <div className="choix-delivery">
          <label>
            <input
              type="radio"
              value="retrait"
              {...register("livraison", { required: true })}
              defaultChecked
            />
            Retrait sur place
          </label>
        </div>
        <hr />
        <div>
          <label>
            <input
              type="radio"
              value="livraison"
              {...register("livraison", { required: true })}
            />
            Livraison
          </label>
          {livraisonOption === "livraison" && (
            <>
              {newAddress ? (
                <div className="new-address">
                  <h6>Nouvelle adresse</h6>
                  <div className="BoxInput">
                    <label>Adresse</label>
                    <input
                      type="text"
                      {...register("adresseNouvelle", {
                        required: "Adresse requise",
                      })}
                      placeholder="Ex: 24 rue de Paris"
                    />
                  </div>
                  <div className="BoxInput">
                    <label>Code postal</label>
                    <input
                      type="text"
                      {...register("codePostalNouvelle", {
                        required: "Code postal requis",
                      })}
                      placeholder="Ex: 75000"
                    />
                  </div>

                  <div className="BoxInput">
                    <label>Pays</label>
                    <input
                      type="text"
                      {...register("paysNouvelle", { required: "Pays requis" })}
                      defaultValue="France"
                    />
                  </div>

                  <div className="BoxInput">
                    <label>Ville</label>
                    <Controller
                      name="villeNouvelle"
                      control={control}
                      rules={{ required: "Ville requise" }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={fraisLiv}
                          placeholder="Sélectionnez une ville"
                          isClearable
                        />
                      )}
                    />
                  </div>
                  <button type="button" onClick={() => setNewAddress(false)}>
                    Utiliser une adresse existante
                  </button>
                </div>
              ) : (
                <div className="adresses-existantes">
                  {allAdresse.map((adresse) => (
                    <div key={adresse.id_Adresses} className="adresse-item">
                      <label>
                        <input
                          type="radio"
                          value={adresse.ville}
                          {...register("adresse", { required: true })}
                        />
                        {adresse.adresse}, {adresse.ville} (
                        {adresse.code_postal})
                      </label>
                    </div>
                  ))}
                  <button type="button" onClick={() => setNewAddress(true)}>
                    Ecrire l'adresse
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <div className="Total">
        <p>
          <span>Produits : </span>
          <span> {prixProduits.toFixed(2)} €</span>
        </p>
        <p>
          <span>Livraison : </span>
          <span> {fraisLivraison.toFixed(2)} €</span>
        </p>
        <hr />
        <p>
          <strong>
            <span>Total : </span>
            <span> {total} €</span>
          </strong>
        </p>
        <button type="submit" className="submitButton">
          Passer ma commande
        </button>
      </div>
      {errorMessage && <p className="error">{errorMessage}</p>}
    </form>
  );
}
