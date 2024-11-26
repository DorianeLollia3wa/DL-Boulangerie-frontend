import { useState } from "react";
import { useForm } from "react-hook-form";
import { userLogin, userRegister } from "../Api/user";
import useModalStore from "../Stores/useModalStore";
import "../Styles/Modals/Connections.scss";

export default function Connections() {
  const { openConnections } = useModalStore();
  const [seeLogin, setSeeLogin] = useState(true);

  if (!openConnections) return null;
  return (
    <div className="Modals Connections">
      {seeLogin ? (
        <Login setSeeLogin={setSeeLogin} />
      ) : (
        <Register setSeeLogin={setSeeLogin} />
      )}
    </div>
  );
}

function Login({ setSeeLogin }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [message, setMessage] = useState("");

  async function onSubmit(data) {
    try {
      await userLogin(data);
    } catch (error) {
      console.log("error : ", error);
      setMessage(error.message);
    }
  }

  return (
    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
      <h1>Se connecter</h1>

      <div className="BoxInput">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          {...register("email", { required: "Email est requis" })}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div className="BoxInput">
        <label htmlFor="mot_de_passe">Mot de passe</label>
        <input
          type="password"
          id="mot_de_passe"
          {...register("mot_de_passe", { required: "Mot de passe est requis" })}
        />
        {errors.mot_de_passe && <p>{errors.mot_de_passe.message}</p>}
      </div>

      {message !== "" && <p className="error">{message}</p>}

      <button type="submit">Se connecter</button>

      <button
        className="changeForm"
        type="button"
        onClick={() => setSeeLogin(false)} // Basculer vers le formulaire de création de compte
      >
        Pas de compte ? Créer un compte
      </button>
    </form>
  );
}

function Register({ setSeeLogin }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [message, setMessage] = useState("");

  async function onSubmit(data) {
    try {
      if (data.confirmer_mot_de_passe !== data.mot_de_passe) {
        setMessage("Les mots de passe ne sont pas identique");
      } else {
        await userRegister(data);
      }
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
      <h1>Créer un compte</h1>

      <div className="BoxInput">
        <label htmlFor="nom">Nom</label>
        <input
          type="text"
          id="nom"
          {...register("nom", { required: "Nom est requis" })}
        />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div className="BoxInput">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          {...register("email", { required: "Email est requis" })}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div className="BoxInput">
        <label htmlFor="telephone">Téléphone</label>
        <input
          type="tel"
          id="telephone"
          {...register("telephone", { required: "Téléphone est requis" })}
        />
        {errors.phone && <p>{errors.phone.message}</p>}
      </div>

      <div className="BoxInput">
        <label htmlFor="mot_de_passe">Mot de passe</label>
        <input
          type="password"
          id="mot_de_passe"
          {...register("mot_de_passe", { required: "Mot de passe est requis" })}
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <div className="BoxInput">
        <label htmlFor="confirmer_mot_de_passe">Confirmer mot de passe</label>
        <input
          type="password"
          id="confirmer_mot_de_passe"
          {...register("confirmer_mot_de_passe", {
            required: "Mot de passe est requis",
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      {message !== "" && <p className="error">{message}</p>}

      <button type="submit">Créer</button>

      <button
        className="changeForm"
        type="button"
        onClick={() => setSeeLogin(true)} // Basculer vers le formulaire de connexion
      >
        Déjà un compte ? Se connecter !
      </button>
    </form>
  );
}
