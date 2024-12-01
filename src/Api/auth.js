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

    const setUserData = useUserStore.getState().setUserData;

    setUserData(user);

    return user;
  } catch (error) {
    const logout = useUserStore.getState().logout;
    logout();

    // toast.error("Atuh Erreur lors de la récupération des données utilisateur", {
    //   position: "top-left",
    //   autoClose: 3000,
    //   hideProgressBar: false,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    // });

    navigate("/");
  }
};
