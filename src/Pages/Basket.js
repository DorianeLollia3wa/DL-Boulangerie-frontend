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
          {basket.length > 0 &&
            basket.map((elm, i) => {
              return (
                <React.Fragment key={elm.id_Produits}>
                  <Product product={elm} />
                  {basket.length - 1 !== i && <hr />}
                </React.Fragment>
              );
            })}
        </div>

        <LivraisonForm />
      </section>
    </div>
  );
}
function Product({ product }) {
  const {
    id_Produits,
    nom,
    description,
    id_Categories,
    categorie,
    image_product,
    prix,
    stock_disponible,
    quantity,
  } = product;
  const removeBasket = useProduitStore((s) => s.removeBasket);
  let prixFixe = prix.toFixed(2) * quantity;

  return (
    <article>
      <ImgBox nameBox="product-image" urlSrc={`${image_product}`} />

      <div className="Box1">
        <h5>{nom}</h5>
        <p className="price">Prix unité : {prix.toFixed(2)} €</p>
        <p className="quantity">Quantité : {quantity}</p>
      </div>

      <div className="Box2">
        <h6>
          Total : <br /> {prixFixe.toFixed(2)} €
        </h6>
      </div>

      <button onClick={() => removeBasket(id_Produits)}>Supprimer</button>
    </article>
  );
}
