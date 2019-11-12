import React from "react";
import StripeButton3 from "../../components/StripeButton3/StripeButton3";
import { LanguageContext } from "../../components/Language/LanguageContext";
import { BodyComponent } from "../../components/Body/BodyComponent";
import { Link } from "react-router-dom";

export default class PremiumBuy extends React.Component {

    cancelPay=(event)=> {
        event.preventDefault();
        this.props.navigation.navigate("/");
    }

    render() {
        return (
            <BodyComponent
                toggleLanguage={this.props.navigation.toggleLanguage}
            >
                <div className="container">
                    <p className="text">
                        {" "}
                        4 de cada 5 usuarios que compraron una cuenta premium, consiguieron trabajo en menos de 2 semanas.
                        <br />
                        Las cuentas premium cuestan tan solo 2 dolares por
                        semana y le permiten ver todos los anuncios de trabajo. 
                        <br />
                        
                        <br />
                        Puede cancelar su cuenta premium cuando quiera.
                        <br />
                        <br />
                    </p>
                    <div className="PrePayPersonButtons">
                        <StripeButton3 />

                        <button
                            onClick={this.cancelPay}
                            className="buttonBasic buttonOpaque prePay"
                        >
                            {this.context.PrePayPerson.button}
                        </button>
                        <div className="contactInfo">
                            <p>{this.context.contactInfo.contactInfo}</p>
                        </div>
                    </div>
                </div>
            </BodyComponent>
        );
    }
}

PremiumBuy.contextType = LanguageContext;
