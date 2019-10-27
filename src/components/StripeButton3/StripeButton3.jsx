import React, { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { fail } from "assert";
import { LanguageContext } from "../Language/LanguageContext";

function StripeButton3() {
    let stripeKey, itemArray, successUrl, failUrl;

    if (window.location.hostname == "localhost") {
        stripeKey = "pk_test_EchftZwNDBbLUUNsRhb9S8QM00fF3sfDub";
        itemArray = "prod_G2XR9dSeyYHrpl";
        successUrl = `//${window.location.host}/#/premiumSet`;
        failUrl = `//${window.location.host}/#/StripeButton`;
    } else {
        stripeKey = "pk_live_nnLZ2Hh8llbujwMwz4kstl9700kF3t8LKz";
        itemArray = "prod_G2XR9dSeyYHrpl";
        successUrl = `//${window.location.host}/#/premiumSet`;
        failUrl = `//${window.location.host}/#/StripeButton`;
    }

    const context = useContext(LanguageContext);

    const stripe = Stripe(stripeKey);

    const [error, setError] = useState();

    const handleClick = () => {
        stripe
            .redirectToCheckout({
                items: [{ plan: itemArray, quantity: 1 }],
                successUrl: window.location.protocol + successUrl,
                cancelUrl: window.location.protocol + failUrl
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
            <button className="buttonBasic buttonPremium" onClick={handleClick}>
                {context.premiumModal.buyPremium}
                <br />
            </button>
            <div>{error}</div>
        </div>
    );
}

export default StripeButton3;
StripeButton3.contextType = LanguageContext;
