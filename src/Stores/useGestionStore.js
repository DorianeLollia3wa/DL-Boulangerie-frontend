// src/Stores/useGestionStore.js
import { create } from "zustand";

import { listeStatutCommandes } from "../Api/commande";

const useGestionStore = create((set) => ({
  allCommandeGestion: [],

  fetchAllCommandesGestion: async (data) => {
    try {
      const commande = await listeStatutCommandes(data);
      set({
        allCommandeGestion: commande,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des commande :", error);
    }
  },
}));

export default useGestionStore;
