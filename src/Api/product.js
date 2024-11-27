import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:3001";

export async function getAllProduct(searchName = "", categoryId = null) {
  try {
    const params = {};
    if (searchName) params.nom = searchName;
    if (categoryId) params.categorie = categoryId;

    const response = await axios.get(`${API_URL}produits`, { params });

    return response.data.produits;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Erreur lors de la récupération des produits"
    );
  }
}
