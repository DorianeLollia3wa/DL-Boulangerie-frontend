// api/user.js
import axios from "axios";
import { toast } from "react-toastify";
import useModalStore from "../Stores/useModalStore";
import useUserStore from "../Stores/useUserStore";

const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:3001";

// Fonction pour gérer le login
export async function userLogin({ email, mot_de_passe }) {
  try {
    const response = await axios.post(`${API_URL}utilisateurs/connexion`, {
      email,
      mot_de_passe,
    });

    const { token, utilisateur } = response.data;

    localStorage.setItem("authToken", JSON.stringify(token));

    const setUserData = useUserStore.getState().setUserData;
    const setOpenConnections = useModalStore.getState().setOpenConnections;
    const login = useUserStore.getState().login;

    setUserData(utilisateur);
    login();
    setOpenConnections(false);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);

    toast.error("Erreur lors de la connexion", {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
}

// Fonction pour gérer l'inscription
export async function userRegister({ nom, email, mot_de_passe, telephone }) {
  try {
    const response = await axios.post(`${API_URL}utilisateurs/inscription`, {
      nom,
      email,
      mot_de_passe,
      telephone,
    });
    const { token, utilisateur } = response.data;

    localStorage.setItem("authToken", JSON.stringify(token));

    const setUserData = useUserStore.getState().setUserData;
    const setOpenConnections = useModalStore.getState().setOpenConnections;
    const login = useUserStore.getState().login;

    setUserData(utilisateur);
    login();
    setOpenConnections(false);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    throw new Error(
      error.response?.data?.message || "Erreur lors de la connexion"
    );
  }
}
