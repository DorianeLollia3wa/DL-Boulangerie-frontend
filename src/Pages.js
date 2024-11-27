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
      </Routes>
    </div>
  );
}
