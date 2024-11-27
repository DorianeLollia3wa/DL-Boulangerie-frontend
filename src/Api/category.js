import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:3001";

export async function getAllCategory() {
  try {
    const response = await axios.get(`${API_URL}categories`);

    return response.data.categorie;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Erreur lors de la récupération des catégorie"
    );
  }
}
