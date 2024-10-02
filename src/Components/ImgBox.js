import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Components/ImgBox.scss";

export default function ImgBox({ nameBox, urlSrc, desc, navlogo, navParam }) {
  let navigate = useNavigate();
  return (
    <div
      className={`${nameBox} ImgBox`}
      onClick={() => {
        if (navlogo) navigate(navlogo);
        else if (navParam) navigate(navParam);
      }}
    >
      <img src={urlSrc} alt={desc} />
    </div>
  );
}
