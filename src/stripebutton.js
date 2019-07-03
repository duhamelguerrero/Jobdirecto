import React, { useState } from "react";
import axios from "axios";
import { LanguageContext } from "./languageContext";
import { useContext } from "react";

function StripeButton() {
  // const { useContext } = React;
  const context = useContext(LanguageContext);
  const stripe = Stripe("pk_live_5PjwBk9dSdW7htTKHQ3HKrTd");

  const [error, setError] = useState();

  const handleClick = () => {
    stripe
      .redirectToCheckout({
        items: [{ sku: "sku_FAe7tbPK29byHW", quantity: 1 }],
        successUrl:
          window.location.protocol + "//www.jobdirecto.com/jobConfirm",
        cancelUrl:
          window.location.protocol + "//www.jobdirecto.com/StripeButton"
      })
      .then(result => {
        if (result.error) {
          setError(result.error.message);
        }
      });

    console.log("someone wants to pay");
    event.preventDefault();
    axios.post("/wantsToPay").then(resp => {
      console.log("yes pay");
    });
  };

  return (
    <div>
      <button
        id="UrgentCheckedButtonYES"
        className="btn-primary"
        onClick={handleClick}
      >
        {this.context.main.name}
        <br />
      </button>
      <div>{error}</div>
    </div>
  );
}

export default StripeButton;
// StripeButton.contextType = LanguageContext;
