import React from "react";

import Header from "./Contents/Header/Header";
import "./Styles/Pages.scss";

import { Navigate, Route, Routes } from "react-router-dom";
import { FontAwesomeIcons } from "./Assets/awesomeIcon";

// Modals
import AllModalsContainer from "./Modals/AllModalContainter";

// Stores
import useUserStore from "./Stores/useUserStore";
// Pages
import Basket from "./Pages/Basket";
import HomePage from "./Pages/HomePage";
import Produits from "./Pages/Produits";

// Icon fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(FontAwesomeIcons);

function PrivateRoute({ children }) {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  // Si l'utilisateur n'est pas connecté, redirige vers la page d'accueil
  return isAuthenticated ? children : <Navigate to="/" />;
}

export default function Pages() {
  return (
    <div className="Pages">
      <Header />
      <AllModalsContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/nos-produits" element={<Produits />} />

        <Route
          path="/mon-panier"
          element={
            <PrivateRoute>
              <Basket />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}
