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

  updateBasket: (id_Produits, newQuantity) =>
    set((state) => ({
      basket: state.basket.map((item) =>
        item.id_Produits === id_Produits
          ? { ...item, quantity: newQuantity }
          : item
      ),
    })),

  // Vider complètement le panier
  clearBasket: () =>
    set(() => ({
      basket: [],
    })),

  // Supprimer un produit du panier
  removeBasket: (productId) =>
    set((state) => ({
      basket: state.basket.filter((item) => item.id_Produits !== productId),
    })),

  // Vérifier et mettre à jour les produits du panier
  verifyAndUpdateBasket: async (productsFromAPI) =>
    set((state) => {
      const updatedBasket = state.basket.map((item) => {
        const productFromAPI = productsFromAPI.find(
          (prod) => prod.id_Produits === item.id_Produits
        );

        if (productFromAPI) {
          const updatedItem = { ...item };
          let modified = false;

          // Vérifier et mettre à jour le prix
          if (productFromAPI.prix !== item.prix) {
            updatedItem.prix = productFromAPI.prix;
            modified = true;
          }

          // Vérifier et ajuster la quantité si nécessaire
          if (item.quantity > productFromAPI.stock_disponible) {
            updatedItem.quantity = productFromAPI.stock_disponible;
            modified = true;
          }

          // Mettre à jour le stock disponible
          if (productFromAPI.stock_disponible !== item.stock_disponible) {
            updatedItem.stock_disponible = productFromAPI.stock_disponible;
            modified = true;
          }

          // Ne pas garder les produits avec quantité 0
          if (productFromAPI.stock_disponible <= 0) {
            return null;
          }

          return modified ? updatedItem : item;
        }

        // Si le produit n'existe plus dans l'API, l'enlever du panier
        return null;
      });

      // Filtrer les produits qui n'existent plus
      return { basket: updatedBasket.filter((item) => item !== null) };
    }),
}));

export default useProduitStore;
