import axios from "axios";
import { toast } from "react-toastify";

const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:3001";

export async function getAllCategory() {
  try {
    const response = await axios.get(`${API_URL}categories`);

    return response.data.categorie;
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
