import React from "react";
import axios from "axios";
import { LanguageContext } from "../../components/Language/LanguageContext";
import { BodyComponent } from "../../components/Body/BodyComponent";

export default class PremiumSet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.setPremium = this.setPremium.bind(this);
        this.getUserStatus = this.getUserStatus.bind(this);
    }
    //haz que el id aparezca aqui, el fb id

    componentDidMount() {
        this.getUserStatus();
        axios.get("/user").then(result => {
            this.setState({ userId: result.data.id }, () => {
                console.log("id in state?", this.state.userId);
            });
        });
    }

    getUserStatus() {
        axios.get("/getUserStatus").then(result => {
            this.setState({ userStatus: result.data }, () => {});
        });
    }

    setPremium() {
        if (this.state.userStatus !== true) {
            axios.post("/setPremium").then(result => {
                this.props.navigation.navigate("/");
            });
        }
    }

    render() {
        return (
            <BodyComponent
                toggleLanguage={this.props.navigation.toggleLanguage}
            >
                <div className="container">
                    <p className="text">
                        {" "}
                        {this.context.premiumSet.title}
                        <br />
                        {this.context.premiumSet.text}
                    </p>
                    <div className="PrePayPersonButtons">
                        <button
                            onClick={this.setPremium}
                            className="buttonBasic buttonPremium"
                        >
                            {this.context.premiumSet.activate}
                        </button>
                        <div className="contactInfo">
                            <p className="contactInfo">
                                {this.context.contactInfo.contactInfo}
                            </p>
                        </div>
                    </div>
                </div>
            </BodyComponent>
        );
    }
}

PremiumSet.contextType = LanguageContext;
