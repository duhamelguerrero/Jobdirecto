import React, { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { LanguageContext } from "../Language/LanguageContext";

function StripeButton2(props) {
    let stripeKey, itemArray, successUrl, failUrl;

    if (window.location.hostname == "localhost"||
    window.location.hostname == "staging-jobdirecto.herokuapp.com") {
        stripeKey = "pk_test_EchftZwNDBbLUUNsRhb9S8QM00fF3sfDub";
        itemArray = "sku_G4Q0xWhDWhpI8s";
        successUrl = `//${location.host}/#/personConfirm/${props.transactionId}`;
        failUrl = `//${location.host}/#/StripeButton`;
    } else {
        stripeKey = "pk_live_5PjwBk9dSdW7htTKHQ3HKrTd";

        itemArray = "sku_FKbzx0lbo7bZZR";

        successUrl = `//${location.host}/#/personConfirm/${props.transactionId}`;
        failUrl = `//${location.host}/#/StripeButton`;
    }

    const context = useContext(LanguageContext);

    const stripe = Stripe(stripeKey); // eslint-disable-line no-undef

    const [error, setError] = useState();

    const handleClick = event => {
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
        axios.post("/wantsToPay").then(resp => {
            console.log("yes pay");
        });
    };

    return (
        <div>
            <button className="buttonBasic" onClick={handleClick}>
                {context.PrePayPerson.buttonPay}

                <br />
            </button>
            <div>{error}</div>
        </div>
    );
}

export default StripeButton2;
StripeButton2.contextType = LanguageContext;
