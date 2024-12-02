import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { toast } from "react-toastify";
import { addAdresses } from "../Api/adresse";
import { getAllFraisLiv } from "../Api/fraisLiv";
import useModalStore from "../Stores/useModalStore";
import useUserStore from "../Stores/useUserStore";
import "../Styles/Modals/AdresseForm.scss";

export default function AdresseForm() {
  const { openAdresseForm, setOpenAdresseForm } = useModalStore();
  const { fetchAllAdresses } = useUserStore();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const [fraisLiv, setFraisLiv] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const selectedVille = watch("ville");

  useEffect(() => {
    async function fetchData() {
      try {
        const reqFraisLiv = await getAllFraisLiv();
        const formattedFraisLiv = reqFraisLiv.map((item) => ({
          value: item.ville_liv,
          label: `${item.ville_liv} (${item.montant_liv} €)`,
        }));
        setFraisLiv(formattedFraisLiv);
      } catch (error) {
        setErrorMessage(error.message);
      }
    }

    fetchData();
  }, []);

  if (!openAdresseForm) return null;

  async function onSubmit(data) {
    const req = await addAdresses(data);

    if (req) {
      toast.success("Adresse créée avec succès !", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    await fetchAllAdresses();
    setOpenAdresseForm(false);
  }

  return (
    <form className="AdresseForm Modals" onSubmit={handleSubmit(onSubmit)}>
      <h2>Créer une adresse</h2>

      {/* Champ pour l'adresse */}
      <div className="form-group">
        <label htmlFor="adresse">Adresse</label>
        <input
          type="text"
          id="adresse"
          {...register("adresse", { required: "L'adresse est requise" })}
          placeholder="Ex : 50 evergreen terrasse"
        />
        {errors.adresse && <p className="error">{errors.adresse.message}</p>}
      </div>

      {/* Champ pour le code postal */}
      <div className="form-group">
        <label htmlFor="code_postal">Code postal</label>
        <input
          type="number"
          id="code_postal"
          {...register("code_postal", {
            required: "Le code postal est requis",
            minLength: {
              value: 5,
              message: "Le code postal doit comporter 5 chiffres",
            },
            maxLength: {
              value: 5,
              message: "Le code postal doit comporter 5 chiffres",
            },
          })}
          placeholder="Ex : 77540"
        />
        {errors.code_postal && (
          <p className="error">{errors.code_postal.message}</p>
        )}
      </div>

      {/* Sélection de la ville */}
      <div className="form-group">
        <label htmlFor="ville">Ville</label>
        <Select
          id="ville"
          options={fraisLiv}
          placeholder="Sélectionnez une ville"
          onChange={(option) => setValue("ville", option.value)}
          isClearable
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              boxShadow: "none",
              cursor: "pointer",
              width: "319px",
            }),
          }}
        />
        {errors.ville && <p className="error">{errors.ville.message}</p>}
      </div>

      {/* Champ pour le pays */}
      <div className="form-group">
        <label htmlFor="pays">Pays</label>
        <input
          type="text"
          id="pays"
          {...register("pays", { required: "Le pays est requis" })}
          placeholder="Ex : France"
          defaultValue="France"
        />
        {errors.pays && <p className="error">{errors.pays.message}</p>}
      </div>

      {/* Bouton de soumission */}
      <button type="submit" className="submit-button">
        Enregistrer l'adresse
      </button>

      {/* Affichage des erreurs générales */}
      {errorMessage && <p className="error general-error">{errorMessage}</p>}
    </form>
  );
}
