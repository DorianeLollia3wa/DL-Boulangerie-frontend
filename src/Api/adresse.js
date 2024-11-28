import { toast } from "react-toastify";
import axiosInstance from "./axiosConfig";

const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:3001";

export async function getAllAdresses() {
  try {
    const response = await axiosInstance.get(`${API_URL}Adresses/listes`);

    return response.data.adresses;
  } catch (error) {
    toast.error("Erreur lors de la récupération des catégorie", {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
}

export async function addAdresses(data) {
  try {
    const response = await axiosInstance.post(
      `${API_URL}Adresses/ajouter`,
      data
    );

    return response.data.adresse;
  } catch (error) {
    toast.error(
      "Erreur lors de la création de  l'adresse , veuiller réessayer plus tard",
      {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
  }
}
