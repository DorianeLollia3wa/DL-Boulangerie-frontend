import axios from "axios";
import { toast } from "react-toastify";

const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:3001";

export async function getAllProduct(searchName = "", categoryId = null) {
  try {
    const params = {};
    if (searchName) params.nom = searchName;
    if (categoryId) params.categorie = categoryId;

    const response = await axios.get(`${API_URL}produits`, { params });

    return response.data.produits;
  } catch (error) {
    toast.error("Erreur lors de la récupération des produits", {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
}
