// src/Stores/useGestionStore.js
import { create } from "zustand";

import { listeStatutCommandes } from "../Api/commande";

// Génère un setter généralisé pour mettre à jour les états
const createSetter = (set) => (key) => (value) =>
  set((state) => ({ ...state, [key]: value }));

const useGestionStore = create((set) => {
  const setter = createSetter(set);

  return {
    dataCommande: [],

    filterCommande: "",

    allCommandeGestion: [],
    nameSee: "Commande",
    idCommande: null,
    typeLiv: null,
    statuCommmande: null,
    statuAppCommande: null,

    // Setter généralisé pour `nameSee`
    setDataCommande: setter("dataCommande"),
    setNameSee: setter("nameSee"),
    setIdCommande: setter("idCommande"),
    setTypeLiv: setter("typeLiv"),
    setStatuCommmande: setter("statuCommmande"),
    setStatuAppCommande: setter("statuAppCommande"),
    setFilterCommande: setter("filterCommande"),

    // Fonction pour récupérer les commandes
    fetchAllCommandesGestion: async (data) => {
      try {
        const commande = await listeStatutCommandes(data);
        set({
          allCommandeGestion: Array.isArray(commande) ? commande : [],
        });
      } catch (error) {
        console.error("Erreur lors de la récupération des commande :", error);
        set({ allCommandeGestion: [] }); // En cas d'erreur, définir une valeur par défaut
      }
    },
  };
});

export default useGestionStore;
