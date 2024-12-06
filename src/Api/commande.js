import { toast } from "react-toastify";
import axiosInstance from "./axiosConfig";

const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:3001";

export async function reqdetailCommande(data) {
  try {
    const response = await axiosInstance.post(
      `${API_URL}commandes/details`,
      data
    );

    return response.data.detailcommandes;
  } catch (error) {
    console.log("error.message : ", error.message);
    toast.error("Erreur lors de la récupération du détail de la commande", {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return [];
  }
}

export async function listeStatutCommandes(data) {
  try {
    const response = await axiosInstance.post(
      `${API_URL}commandes/listes-statut`,
      data
    );

    return response.data.commande;
  } catch (error) {
    console.log("error.message : ", error.message);
    toast.error("Erreur lors de la récupération de la commande par statut", {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return [];
  }
}

export async function updateStatutCommandes(data) {
  try {
    const response = await axiosInstance.put(
      `${API_URL}commandes/modifier-status-nom`,
      data
    );

    return response.data.commandes;
  } catch (error) {
    console.log("error.message : ", error.message);
    toast.error("Erreur lors de la création de la commande", {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return [];
  }
}

export async function getAllCommandes() {
  try {
    const response = await axiosInstance.get(`${API_URL}commandes/listes`);

    return response.data.commandes;
  } catch (error) {
    console.log("error.message : ", error.message);
    toast.error("Erreur lors de la création de la commande", {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return [];
  }
}

export async function calculBasket(data) {
  try {
    const response = await axiosInstance.post(
      `${API_URL}commandes/calcul-panier`,
      data
    );

    return response.data.total;
  } catch (error) {
    toast.error("Erreur lors du calcul de la commande", {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
}

export async function createCommande(data) {
  try {
    const response = await axiosInstance.post(
      `${API_URL}commandes/creer`,
      data
    );

    return response.data.total;
  } catch (error) {
    // console.log("error.message : ", error.message);
    toast.error("Erreur lors de la création de la commande", {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
}
