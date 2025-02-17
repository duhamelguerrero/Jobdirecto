import React from "react";
import axios from "axios";
import StripeButton2 from "../../components/StripeButton2/StripeButton2";
import { LanguageContext } from "../../components/Language/LanguageContext";
import { BodyComponent } from "../../components/Body/BodyComponent";

export default class PrePayPerson extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transactionId:null
        };
        this.cancelPay = this.cancelPay.bind(this);
        // this.wantsToPay = this.wantsToPay.bind(this);
    }

    componentDidMount(){
        axios.post("/publishPerson", {personData:{data:{...this.props.navigation.state,active:false,urgent:true}}}).then(resp => {
            if (resp.data.success) {
                axios.post("/createPersonTransaction",{id:resp.data.response}).then(r=>{
                    this.setState({
                        transactionId:r.data.r
                    })
                });
            }
        });
    }


    cancelPay(event) {
        event.preventDefault();
        axios.post("/cancelPay").then(resp => {
            this.props.navigation.navigate("/");
        });
    }

    render() {
        return (
            <BodyComponent toggleLanguage={this.props.navigation.toggleLanguage}>
            <div className="container">
                <br />
                <br />

                <img className="prePayPics" alt="" src="personPost.png" />

                <p className="text">
                    {this.context.PrePayPerson.text1}
                    <br />
                    <br />
                    <span className="textHighlight">
                        {this.context.PrePayPerson.text2}
                    </span>{" "}
                    {this.context.PrePayPerson.text3}
                    <br />
                    <br />
                    <br />
                </p>
                <div className="PrePayPersonButtons">
                    <StripeButton2 transactionId={this.state.transactionId} />
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

PrePayPerson.contextType = LanguageContext;
