// src/Stores/useProduitStore.js
import { create } from "zustand";

const useProduitStore = create((set) => ({
  basket: [],

  // Ajouter un produit au panier
  addBasket: (product) =>
    set((state) => {
      const existingProduct = state.basket.find(
        (item) => item.id_Produits === product.id_Produits
      );
      if (existingProduct) {
        // Si le produit existe déjà, augmentez la quantité
        return {
          basket: state.basket.map((item) =>
            item.id_Produits === product.id_Produits
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        // Sinon, ajoutez le produit avec une quantité initiale de 1
        return { basket: [...state.basket, { ...product, quantity: 1 }] };
      }
    }),

  // Supprimer un produit du panier
  removeBasket: (productId) =>
    set((state) => ({
      basket: state.basket.filter((item) => item.id_Produits !== productId),
    })),
}));

export default useProduitStore;
