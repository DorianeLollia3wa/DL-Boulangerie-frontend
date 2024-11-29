import React from "react";

import Header from "./Contents/Header/Header";
import "./Styles/Pages.scss";

import { Route, Routes } from "react-router-dom";
import { FontAwesomeIcons } from "./Assets/awesomeIcon";

// Pages
import HomePage from "./Pages/HomePage";
// Modals
// Icon fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import AllModalsContainer from "./Modals/AllModalContainter";
import Basket from "./Pages/Basket";
import Produits from "./Pages/Produits";
library.add(FontAwesomeIcons);

export default function Pages() {
  return (
    <div className="Pages">
      <Header />
      <AllModalsContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/nos-produits" element={<Produits />} />
        <Route path="/mon-panier" element={<Basket />} />
      </Routes>
    </div>
  );
}
// {
//   "id_Produits": 1,
//   "nom": "Baguette Tradition",
//   "description": "Une baguette traditionnelle croustillante à l'extérieur et moelleuse à l'intérieur.",
//   "prix": 1.2,
//   "stock_disponible": 30,
//   "image_product": "http://localhost:3000/images/baguette_tradition.jpg",
//   "id_Categories": 1,
//   "categorie": {
//       "nom_categorie": "Pain"
//   },
//   "quantity": 2
// }
