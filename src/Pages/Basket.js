import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import ImgBox from "../Components/ImgBox";
import LivraisonForm from "../Contents/Basket/LivraisonForm";
import useProduitStore from "../Stores/useProduitStore";
import "../Styles/Pages/Basket.scss";

export default function Basket() {
  const { basket } = useProduitStore();

  return (
    <div className="Basket">
      <h1>Récapitulatif de mon panier</h1>
      <section>
        <div className="detailProduct">
          {basket.length > 0 ? (
            basket.map((elm, i) => {
              return (
                <React.Fragment key={elm.id_Produits}>
                  <Product product={elm} />
                  {basket.length - 1 !== i && <hr />}
                </React.Fragment>
              );
            })
          ) : (
            <p>Le panier est vide</p>
          )}
        </div>

        <LivraisonForm />
      </section>
    </div>
  );
}
function Product({ product }) {
  const { id_Produits, nom, image_product, prix, stock_disponible, quantity } =
    product;

  const updateBasket = useProduitStore((s) => s.updateBasket); // Fonction pour mettre à jour la quantité
  const removeBasket = useProduitStore((s) => s.removeBasket); // Fonction pour supprimer un produit
  let prixFixe = prix.toFixed(2) * quantity;

  // Augmenter la quantité
  const increaseQuantity = () => {
    if (quantity < stock_disponible) {
      updateBasket(id_Produits, quantity + 1);
    }
  };

  // Diminuer la quantité
  const decreaseQuantity = () => {
    if (quantity > 1) {
      updateBasket(id_Produits, quantity - 1);
    }
  };

  return (
    <article>
      <ImgBox nameBox="product-image" urlSrc={`${image_product}`} />

      <div className="Box1">
        <h5>{nom}</h5>
        <p className="price">Prix unité : {prix.toFixed(2)} €</p>
        <div className="quantity-controls">
          {quantity <= 1 ? (
            <button onClick={() => removeBasket(id_Produits)}>
              <FontAwesomeIcon icon="fa-solid fa-trash-can" />
            </button>
          ) : (
            <button onClick={decreaseQuantity} disabled={quantity <= 1}>
              -
            </button>
          )}
          <p>Quantité : {quantity}</p>
          <button
            onClick={increaseQuantity}
            disabled={quantity >= stock_disponible}
          >
            +
          </button>
        </div>
      </div>

      <div className="Box2">
        <h6>
          Total <br /> <br /> {prixFixe.toFixed(2)} €
        </h6>
      </div>
    </article>
  );
}
