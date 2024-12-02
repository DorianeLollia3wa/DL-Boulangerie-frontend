import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { getAllProduct } from "../Api/product";
import ImgBox from "../Components/ImgBox";
import LivraisonForm from "../Contents/Basket/LivraisonForm";
import useProduitStore from "../Stores/useProduitStore";
import "../Styles/Pages/Basket.scss";

export default function Basket() {
  const { basket, verifyAndUpdateBasket } = useProduitStore();
  const [showPayment, setShowPayment] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let intervalId;

    if (basket.length > 0 && !showPayment) {
      intervalId = setInterval(async () => {
        try {
          const products = await getAllProduct();
          verifyAndUpdateBasket(products);
        } catch (error) {
          console.error(
            "Erreur lors de la vérification des produits : ",
            error
          );
          setErrorMessage("Erreur lors de la synchronisation du panier.");
        }
      }, 5000);
    }

    // Fonction de nettoyage
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [basket, verifyAndUpdateBasket, showPayment]);

  return (
    <div className="Basket">
      {!showPayment ? <h1>Récapitulatif</h1> : <h1>Paiement de la commande</h1>}
      {errorMessage && <p className="error">{errorMessage}</p>}

      <section>
        {!showPayment && (
          <div className="detailProduct">
            {basket.length > 0 ? (
              basket.map((elm, i) => (
                <React.Fragment key={elm.id_Produits}>
                  <Product product={elm} />
                  {basket.length - 1 !== i && <hr />}
                </React.Fragment>
              ))
            ) : (
              <p>Le panier est vide</p>
            )}
          </div>
        )}
        {basket.length > 0 && (
          <LivraisonForm
            showPayment={showPayment}
            setShowPayment={setShowPayment}
          />
        )}
      </section>
    </div>
  );
}

function Product({ product }) {
  const { id_Produits, nom, image_product, prix, stock_disponible, quantity } =
    product;

  const updateBasket = useProduitStore((s) => s.updateBasket);
  const removeBasket = useProduitStore((s) => s.removeBasket);
  const prixFixe = prix.toFixed(2) * quantity;

  const increaseQuantity = () => {
    if (quantity < stock_disponible) {
      updateBasket(id_Produits, quantity + 1);
    }
  };

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
              <FontAwesomeIcon className="icon" icon="fa-solid fa-trash-can" />
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
