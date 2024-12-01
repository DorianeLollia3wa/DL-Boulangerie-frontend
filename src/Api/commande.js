import { toast } from "react-toastify";
import axiosInstance from "./axiosConfig";

const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:3001";

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
    console.log("response : ", response);
    return response.data.total;
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
  }
}
