import React, { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { LanguageContext } from "../Language/LanguageContext";

function StripeButton(props) {
    let stripeKey, itemArray, successUrl, failUrl;

    if (window.location.hostname == "localhost") {
        stripeKey = "pk_test_EchftZwNDBbLUUNsRhb9S8QM00fF3sfDub";
        itemArray = "sku_G4PzLi8dz2bcF7";
        successUrl = `//localhost:6543/#/JobConfirm/${props.transactionId}`;
        failUrl = "//localhost:6543/#/StripeButton";
    } else {
        stripeKey = "pk_live_5PjwBk9dSdW7htTKHQ3HKrTd";
        itemArray = "sku_G2XPSJmR6bzZYk";
        successUrl = `//www.jobdirecto.com/#/JobConfirm/${props.transactionId}`;
        failUrl = "//www.jobdirecto.com/StripeButton";
    }
    const context = useContext(LanguageContext);

    const stripe = Stripe(stripeKey);

    const [error, setError] = useState();

    const handleClick = () => {
        stripe
            .redirectToCheckout({
                items: [{ sku: itemArray, quantity: 1 }],

                successUrl: window.location.protocol + successUrl,

                cancelUrl: window.location.protocol + failUrl,
                clientReferenceId: props.transactionId
            })
            .then(result => {
                if (result.error) {
                    setError(result.error.message);
                }
            });

        event.preventDefault();
        axios.post("/wantsToPay").then(resp => {});
    };

    return (
        <div>
            <button className="buttonBasic" onClick={handleClick}>
                {context.jobPayPage.buttonYES}
                <br />
            </button>
            <div>{error}</div>
        </div>
    );
}

export default StripeButton;
StripeButton.contextType = LanguageContext;
