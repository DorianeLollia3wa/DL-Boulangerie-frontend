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

export const authTokenUser = async (navigate) => {
  try {
    const response = await axiosInstance.get(`utilisateurs/auth`);

    const user = response.data;

    return user;
  } catch (error) {
    const logout = useUserStore.getState().logout;
    logout();

    navigate("/");
  }
};
