import React from "react";
import { LanguageContext } from "../Language/LanguageContext";
import StripeButton3 from "../StripeButton3/StripeButton3";
import { Link } from "../../utils/router";

export default class BePremiumModal extends React.Component {
    render() {
        return (
            <div>
                <div onClick={this.props.close} className="backgroundBlock" />

                <div className="deleteModal">
                    <h1 className="heading-1 deleteModalTitle">
                        {this.context.bepremiumModal.title}
                    </h1>
                    <h1 className="heading-1 deleteModalTitle">
                        {this.context.bepremiumModal.title2}
                    </h1>
                    <div>
                        <button className="buttonBasic buttonPremium">
                            <Link to={"/premiumBuy"}>
                                {this.context.premiumModal.buyPremium}
                                <br />
                            </Link>
                        </button>
                    </div>
                    <div>
                        <button
                            onClick={this.props.close}
                            className="buttonOpaque premiumDeny"
                        >
                            {this.context.premiumModal.deny}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

BePremiumModal.contextType = LanguageContext;
