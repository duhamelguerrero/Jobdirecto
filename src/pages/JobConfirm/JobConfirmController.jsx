import React from "react";
import axios from "axios";
import { LanguageContext } from "../../components/Language/LanguageContext";
import { Link } from "../../utils/router";
import { BodyComponent } from "../../components/Body/BodyComponent";

export default class JobConfirm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            country:{}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getCountry(){
        return axios({
            method: 'get',
            url: '/getCountry',
            params: {},
            withCredentials: true
        }).then(result => {
            
            this.setState({
                country:result.data.data[0],
            });
            
        });
    }
    async componentDidMount() {
        this.getCountry();
        if(this.props.navigation.params.id){
            return this.props.navigation.navigate("/JobConfirm",{
                replace:true,
                state:{
                    transactionId:this.props.navigation.params.id
                }
            })
        }
        if (!this.props.navigation.state) {
            this.props.navigation.navigate("/jobForm");
            return null;
        } else if(!this.props.navigation.state.transactionId) {
            this.setState({
                jobData: {
                    data: {
                        ...this.props.navigation.state,
                        active: true
                    }
                }
            });
        }else{
            let resp = await axios.get(`/getJobTrans/${this.props.navigation.state.transactionId}`);
            if(resp.data){
                this.setState({
                    jobData: {
                        data: {
                            ...resp.data.jobdata,
                            active: true
                        }
                    }
                }); 
            }
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        axios.post("/publishJob", { ...this.state }).then(resp => {
            if (resp.data.success) {
                this.setState({
                    jobData: ""
                });
                this.props.navigation.navigate("/");
            }
        });

        axios.post("/minusCounter").then(resp => {
        });
    }

    render() {
        if (!this.state.jobData) {
            return null;
        }

        return (
            <BodyComponent toggleLanguage={this.props.navigation.toggleLanguage}>
            <div className="jobConfirmPage">
                <form onSubmit={this.handleSubmit}>
                    <h1 className="confirmTitle" className="heading-1">
                        {this.context.jobConfirm.title}
                    </h1>

                    <table>
                        <tr>
                            <td className="jobDetailsText">
                                {this.context.jobConfirm.name}
                            </td>
                            <td className="jobDetailsText">
                                {this.state.jobData.data.restname}
                            </td>
                        </tr>
                        <tr>
                            <td className="jobDetailsText">
                                {this.context.jobConfirm.position}
                            </td>
                            <td className="jobDetailsText">
                                {this.state.jobData.data.jobtype}
                            </td>
                        </tr>

                        <tr>
                            <td className="jobDetailsText">
                                {this.context.jobConfirm.payment}
                            </td>
                            <td className="jobDetailsText">
                                {this.state.jobData.data.hourpay}
                            </td>
                        </tr>
                        <tr>
                            <td className="jobDetailsText">
                                {this.context.jobConfirm.payType}
                            </td>
                            <td className="jobDetailsText">
                                {this.state.jobData.data.typepay}
                            </td>
                        </tr>
                        <tr>
                            <td className="jobDetailsText">
                                {this.context.jobConfirm.schedule}
                            </td>
                            <td className="jobDetailsText">
                                {this.state.jobData.data.schedule}
                            </td>
                        </tr>
                        <tr>
                            <td className="jobDetailsText">
                                {this.context.jobConfirm.address}
                            </td>
                            <td className="jobDetailsText">
                                {this.state.jobData.data.address}
                            </td>
                        </tr>
                        <tr>
                            <td className="jobDetailsText">
                                {this.context.jobConfirm.phone}
                            </td>
                            <td className="jobDetailsText">
                                {this.state.jobData.data.phone}
                            </td>
                        </tr>
                        <tr>
                            <td className="jobDetailsText">
                                {this.context.jobConfirm.contact}
                            </td>
                            <td className="jobDetailsText">
                                {this.state.jobData.data.contact}
                            </td>
                        </tr>
                        <tr>
                            <td className="jobDetailsText">
                                {this.context.jobConfirm.extraInfo}
                            </td>
                            <td className="jobDetailsText">
                                {this.state.jobData.data.extrainfo}
                            </td>
                        </tr>
                    </table>

                    <div className="confirmButtons">
                        {/*  <Link to="/jobForm">
              <input className="btn-secondary" type="submit" value="Corregir" />
            </Link>*/}

                        <Link to="/">
                            <input
                                onClick={this.handleSubmit}
                                className="buttonBasic"
                                type="submit"
                                value={this.context.jobConfirm.button}
                            />
                        </Link>
                    </div>
                    <div className="contactInfo">
                        <p>{this.context.contactInfo.contactInfo}</p>
                    </div>
                </form>
            </div>
            </BodyComponent>
        );
    }
}

JobConfirm.contextType = LanguageContext;
