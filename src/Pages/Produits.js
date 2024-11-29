import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Select from "react-select";

import { toast } from "react-toastify";
import { getAllCategory } from "../Api/category";
import { getAllProduct } from "../Api/product";
import ImgBox from "../Components/ImgBox";
import useProduitStore from "../Stores/useProduitStore";
import useUserStore from "../Stores/useUserStore";
import "../Styles/Pages/Produits.scss";

export default function Produits() {
  const [dataProduct, setDataProduct] = useState([]);
  const [dataCategory, setDataCategory] = useState([]);
  const [searchName, setSearchName] = useState(""); // État pour le champ de recherche
  const [selectedCategory, setSelectedCategory] = useState(null); // État pour la catégorie sélectionnée
  const [errorMessage, setErrorMessage] = useState(""); // État pour afficher les erreurs

  useEffect(() => {
    async function fetchData() {
      try {
        const products = await getAllProduct();
        setDataProduct(products);

        const categories = await getAllCategory();
        const formattedCategories = categories.map((category) => ({
          value: category.id_Categories,
          label: category.nom_categorie,
        }));
        setDataCategory(formattedCategories);
      } catch (error) {
        setErrorMessage(error.message);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const categoryName = selectedCategory ? selectedCategory.label : null;
        const products = await getAllProduct(searchName, categoryName);
        setDataProduct(products);
      } catch (error) {
        setErrorMessage(error.message);
      }
    }

    fetchProducts();
  }, [searchName, selectedCategory]);

  return (
    <div className="Produits">
      <h1>Nos Produits</h1>

      {/* Barre de recherche et sélecteur */}
      <div className="search-filters">
        <input
          type="text"
          placeholder="Rechercher"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <Select
          options={dataCategory}
          placeholder="Sélectionner une catégorie"
          value={selectedCategory}
          onChange={(category) => setSelectedCategory(category)}
          isClearable
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              border: "none",
              boxShadow: "none",
              cursor: "pointer",
            }),
          }}
        />
      </div>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <div className="AllProduct">
        {dataProduct.length > 0 ? (
          dataProduct.map((product) => (
            <BoxProduit key={product.id_Produits} product={product} />
          ))
        ) : (
          <p>Aucun produit ne correspond à votre recherche.</p>
        )}
      </div>
    </div>
  );
}

function BoxProduit({ product }) {
  const {
    id_Produits,
    nom,
    description,
    id_Categories,
    categorie,
    image_product,
    prix,
    stock_disponible,
  } = product;
  const { isAuthenticated } = useUserStore();
  const addBasket = useProduitStore((state) => state.addBasket);
  const { basket } = useProduitStore();

  function handleAddToBasket() {
    const existingItem = basket.find(
      (item) => item.id_Produits === id_Produits
    );
    const currentQuantity = existingItem ? existingItem.quantity : 0;
    if (currentQuantity >= stock_disponible) {
      toast.error(
        `Quantité trop élevée. Stock disponible : ${stock_disponible}`,
        {
          position: "top-left",
          autoClose: 3000,
          hideProgressBar: false,
          pauseOnHover: true,
          draggable: true,
        }
      );
      return;
    }

    addBasket(product);
    toast.success(`${nom} a été ajouté au panier !`, {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  return (
    <article className="box-produit">
      <ImgBox nameBox="product-image" urlSrc={`${image_product}`} />
      <div className="boxText">
        <h5>{nom}</h5>
        <p className="description">{description}</p>
        <div className="bottomBox">
          <p className="category">
            <i>{categorie.nom_categorie}</i>
          </p>
          <p className="prix">{prix.toFixed(2)} €</p>
          {isAuthenticated && stock_disponible > 0 && (
            <button onClick={handleAddToBasket}>
              <FontAwesomeIcon icon="fa-solid fa-cart-shopping" />
            </button>
          )}
          {stock_disponible <= 0 && (
            <p className="stock-out">Rupture de stock</p>
          )}
        </div>
      </div>
    </article>
  );
}
