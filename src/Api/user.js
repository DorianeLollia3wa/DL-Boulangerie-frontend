// api/user.js
import axios from "axios";
import useModalStore from "../Stores/useModalStore";
import useUserStore from "../Stores/useUserStore";

const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:3001";

// Fonction pour gérer le login
export const userLogin = async (data) => {
  const { email, password } = data;
  try {
    const response = await axios.post(`${API_URL}user/login`, {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem("authToken", JSON.stringify(token));

    const setUserData = useUserStore.getState().setUserData;
    const setOpenConnections = useModalStore.getState().setOpenConnections;
    const login = useUserStore.getState().login;

    setUserData(user);
    login();
    setOpenConnections(false);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    throw new Error(
      error.response?.data?.message || "Erreur lors de la connexion"
    );
  }
};
