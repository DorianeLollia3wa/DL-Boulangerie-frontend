import { useState } from "react";
import { useForm } from "react-hook-form";
import { userLogin } from "../Api/user";
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
        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          id="password"
          {...register("password", { required: "Mot de passe est requis" })}
        />
        {errors.password && <p>{errors.password.message}</p>}
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

  const onSubmit = (data) => {
    console.log("Register Data:", data);
  };

  return (
    <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
      <h1>Créer un compte</h1>

      <div className="BoxInput">
        <label htmlFor="name">Nom</label>
        <input
          type="text"
          id="name"
          {...register("name", { required: "Nom est requis" })}
        />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div className="BoxInput">
        <label htmlFor="surname">Prénom</label>
        <input
          type="text"
          id="surname"
          {...register("surname", { required: "Prénom est requis" })}
        />
        {errors.surname && <p>{errors.surname.message}</p>}
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
        <label htmlFor="phone">Téléphone</label>
        <input
          type="tel"
          id="phone"
          {...register("phone", { required: "Téléphone est requis" })}
        />
        {errors.phone && <p>{errors.phone.message}</p>}
      </div>

      <div className="BoxInput">
        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          id="password"
          {...register("password", { required: "Mot de passe est requis" })}
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

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
