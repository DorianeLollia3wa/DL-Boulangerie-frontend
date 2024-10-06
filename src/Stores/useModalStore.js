import { create } from "zustand";

const createSetter = (set) => (key) => (value) => set({ [key]: value });

const useModalStore = create((set, get) => {
  const setter = createSetter(set);

  return {
    openConnections: false, // État de la modal Connections.modals.js login/register

    setOpenConnections: setter("openConnections"),

    closeAllModals: () => {
      console.log("closeAllModals exécuté");

      const state = get();
      const newState = {};
      const exceptions = ["exeption"];
      Object.keys(state).forEach((key) => {
        if (
          !exceptions.includes(key) &&
          typeof state[key] === "boolean" &&
          state[key] === true
        ) {
          newState[key] = false;
        }
      });
      set(newState);
    },
  };
});

export default useModalStore;
