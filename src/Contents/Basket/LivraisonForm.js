import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { getAllAdresses } from "../../Api/adresse";
import { getAllFraisLiv } from "../../Api/fraisLiv";
import useProduitStore from "../../Stores/useProduitStore";
import "../../Styles/Contents/Basket/LivraisonForm.scss";
export default function LivraisonForm() {
  const { basket } = useProduitStore();
  const { register, handleSubmit, watch, setValue } = useForm();
  const livraisonOption = watch("livraison", "retrait");
  const selectedAdresse = watch("adresse", null);
  const [fraisLiv, setFraisLiv] = useState([]);
  const [allAdresse, setAllAdresse] = useState([]);
  const [newAddress, setNewAddress] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const reqFraisLiv = await getAllFraisLiv();
        setFraisLiv(reqFraisLiv);

        const reqAdresse = await getAllAdresses();
        setAllAdresse(reqAdresse);
      } catch (error) {
        setErrorMessage(error.message);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {}, [basket]);

  const prixProduits = basket.reduce(
    (total, product) => total + product.prix * product.quantity,
    0
  );

  const fraisLivraison =
    livraisonOption === "livraison" && selectedAdresse
      ? fraisLiv.find((frais) => frais.ville_liv === selectedAdresse)
          ?.montant_liv || 0
      : 0;

  const total = (prixProduits + fraisLivraison).toFixed(2);

  const onSubmit = (data) => {
    const panier = basket.map((item) => ({
      id_Produits: item.id_Produits,
      quantite: item.quantity,
    }));

    // Construire les données de la commande
    const commande = {
      adresseCommande: newAddress
        ? `${data.adresseNouvelle} ${data.codePostalNouvelle} ${data.villeNouvelle} ${data.paysNouvelle}`
        : `${
            allAdresse.find((adresse) => adresse.ville === selectedAdresse)
              .adresse
          }, ${selectedAdresse}`,
      ville_liv: newAddress ? data.villeNouvelle : selectedAdresse,
      type_livraison:
        livraisonOption === "retrait"
          ? "Retrait sur place"
          : "Livraison à domicile",
      libelle_paiement: "test vide",
      panier,
    };

    console.log("Commande soumise : ", commande);

    // Ajouter ici votre requête API pour soumettre la commande
    toast.success("Commande validée !", {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <form className="LivraisonForm" onSubmit={handleSubmit(onSubmit)}>
      {/* Section Livraison */}
      <div className="delivery">
        <h6>Livraison</h6>
        <div>
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
                    <label>Ville</label>
                    <select {...register("villeNouvelle", { required: true })}>
                      {fraisLiv.map((frais) => (
                        <option key={frais.id_FraisLiv} value={frais.ville_liv}>
                          {frais.ville_liv}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="BoxInput">
                    <label>Pays</label>
                    <input
                      type="text"
                      {...register("paysNouvelle", { required: "Pays requis" })}
                      defaultValue="France"
                    />
                  </div>
                  <button type="button" onClick={() => setNewAddress(false)}>
                    Utiliser une adresse existante
                  </button>
                </div>
              ) : (
                <>
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
                  </div>
                  <button type="button" onClick={() => setNewAddress(true)}>
                    Ecrire l'adresse
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>

      {/* Section Total */}
      <div className="Total">
        <p>
          <span>Produits :</span>
          <span>{prixProduits.toFixed(2)} €</span>
        </p>
        <p>
          <span>Livraison :</span>
          <span>{fraisLivraison.toFixed(2)} €</span>
        </p>
        <hr />
        <p>
          <strong>
            <span>Total :</span>
            <span>{total} €</span>
          </strong>
        </p>
        <button type="submit" className="submitButton">
          Passer ma commande
        </button>
      </div>
    </form>
  );
}
