// src/Stores/userStore.js
import { jwtDecode } from "jwt-decode";
import { create } from "zustand";

import { authTokenUser } from "../Api/auth";

const useUserStore = create((set) => ({
  userData: null,
  isAuthenticated: false,

  setUserData: (user) => set({ userData: user }),

  login: () => set({ isAuthenticated: true }),

  logout: () => {
    localStorage.removeItem("authToken");
    set({ isAuthenticated: false, userData: null });
  },

  // Vérifie si un token existe et récupère les données utilisateur
  checkAuthToken: async () => {
    const token = JSON.parse(localStorage.getItem("authToken"));
    if (token) {
      try {
        // Décoder le token pour obtenir l'ID de l'utilisateur
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;

        const user = await authTokenUser(userId);
        set({ isAuthenticated: true });
        set({ userData: user });
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données utilisateur",
          error
        );
        set({ isAuthenticated: false });
      }
    }
  },
}));

export default useUserStore;
