// src/store/userStore.js
import create from "zustand";

const useUserStore = create((set) => ({
  isAuthenticated: false, // Etat initial non connecté
  login: () => set({ isAuthenticated: true }),
  logout: () => set({ isAuthenticated: false }),
}));

export default useUserStore;
