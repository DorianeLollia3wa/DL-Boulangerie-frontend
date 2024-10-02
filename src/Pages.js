import React from "react";

import Header from "./Contents/Header/Header";
import "./Styles/Pages.scss";

// Icon fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcons } from "./Assets/awesomeIcon";

library.add(FontAwesomeIcons);
export default function Pages() {
  return (
    <div className="Pages">
      <Header />
    </div>
  );
}
