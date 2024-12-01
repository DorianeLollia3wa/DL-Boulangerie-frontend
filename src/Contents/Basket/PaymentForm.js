import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createCommande } from "../../Api/commande";
import useProduitStore from "../../Stores/useProduitStore";
import "../../Styles/Contents/Basket/PaymentForm.scss";

export default function PaymentForm({ total, commandeData, onPaymentSuccess }) {
  let navigate = useNavigate();
  const clearBasket = useProduitStore((state) => state.clearBasket);
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      toast.error("Stripe n'est pas encore prêt");
      return;
    }

    setIsProcessing(true);

    try {
      // Simulez un processus de validation avec Stripe sans backend
      const cardNumberElement = elements.getElement(CardNumberElement);

      // Créez un PaymentMethod
      const result = await stripe.createPaymentMethod({
        type: "card",
        card: cardNumberElement,
        billing_details: {
          name: "Nom Utilisateur",
        },
      });

      if (result.error) {
        toast.error("Erreur lors du paiement : " + result.error.message);
      } else {
        toast.success("Paiement validé !");
        const updatedCommande = {
          ...commandeData,
          libelle_paiement: result.paymentMethod.id,
        };

        await createCommande(updatedCommande);
        clearBasket();
        toast.success("Commande créer avec succès !");
        navigate("/");
      }
    } catch (error) {
      toast.error("Une erreur est survenue : " + error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <form onSubmit={handlePayment} className="PaymentForm">
      <h6>Informations de paiement</h6>
      <div className="stripe-input">
        <label>Numéro de carte</label>
        <CardNumberElement options={cardStyle} />
      </div>
      <br />
      <div className="stripe-input">
        <label>Date d'expiration</label>
        <CardExpiryElement options={cardStyle} />
      </div>
      <br />
      <div className="stripe-input">
        <label>CVC</label>
        <CardCvcElement options={cardStyle} />
      </div>
      <button
        type="submit"
        disabled={isProcessing}
        className={`pay-button ${isProcessing ? "disabled" : ""}`}
      >
        {isProcessing ? "Traitement en cours..." : `Payer ${total} €`}
      </button>
    </form>
  );
}
