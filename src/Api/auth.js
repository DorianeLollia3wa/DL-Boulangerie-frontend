import useUserStore from "../Stores/useUserStore";
import axiosInstance from "./axiosConfig";

// Fonction pour récupérer le token de manière sécurisée
export const getToken = () => {
  const token = localStorage.getItem("authToken");
  return token ? JSON.parse(token) : null;
};

// Fonction pour déconnecter l'utilisateur
export const userLogout = () => {
  localStorage.removeItem("authToken");
  const logout = useUserStore.getState().logout;
  logout();
};

export const authTokenUser = async (userId) => {
  try {
    const response = await axiosInstance.get(`utilisateurs/auth`);

    const user = response.data;

    const setUserData = useUserStore.getState().setUserData;

    setUserData(user);

    return user;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des données utilisateur :",
      error
    );
    throw new Error(
      error.response?.data?.message ||
        "Erreur lors de la récupération des données utilisateur"
    );
  }
};
