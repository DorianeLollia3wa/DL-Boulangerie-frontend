import devantureIMG from "../Assets/img/devanture-2.jpg";
import ImgBox from "../Components/ImgBox";
import "../Styles/Pages/HomePage.scss";

export default function HomePage() {
  return (
    <div className="HomePage">
      <ImgBox nameBox="devanture" urlSrc={devantureIMG} />

      <div className="BoxText">
        {/* Présentation de l'entreprise */}
        <section className="presentation">
          <h1>Bienvenue</h1>
          <p>
            Depuis plusieurs années, notre boulangerie est un lieu
            incontournable où qualité et tradition se rencontrent. Nous vous
            proposons une sélection de pains artisanaux, viennoiseries fraîches,
            et pâtisseries délicieuses, fabriquées avec passion chaque jour.
          </p>
        </section>
        <div className="boxbottom">
          {/* Promotions et Wi-Fi */}
          <section className="promotions">
            <h2>Promotions et avantages</h2>
            <h3>
              <i>
                <strong>Salon de Thé </strong>
              </i>
            </h3>
            <p>
              Profitez de nos formules gourmandes avec boissons chaudes et
              pâtisseries à prix réduit !
            </p>
            <h3>
              <i>
                <strong>Wi-Fi Gratuit :</strong>
              </i>
            </h3>
            <p>Passez un moment agréable tout en restant connecté.</p>
          </section>
          {/* Horaires d'ouverture */}
          <section className="horaires">
            <h2>Horaires </h2>
            <p>
              <strong>Lundi :</strong> 7h00 - 19h00
              <br />
              <strong>Mardi :</strong> 7h00 - 19h00
              <br />
              <strong>Mercredi :</strong> 7h00 - 19h00
              <br />
              <strong>Jeudi:</strong> Fermé
              <br />
              <strong>Vendredi :</strong> 7h00 - 19h00
              <br />
              <strong>Samedi :</strong> 8h00 - 18h00
              <br />
              <strong>Dimanche :</strong> Fermé
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
