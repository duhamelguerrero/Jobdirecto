import React from "react";
import axios from "axios";
import { LanguageContext } from "../Language/LanguageContext";
import { Link } from "../../utils/router";
import BePremiumModal from "../BePremiumModal/BePremiumModal";

export default class ModalJob extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pleaseLogin: false,
            reportedAlready: false,
            thanksForReporting: false,
            whoHasReported: "",
            showBePremiumModal:false,
        };
        this.reportPost = this.reportPost.bind(this);
        this.getJobDetails = this.getJobDetails.bind(this);
        this.whoHasReported = this.whoHasReported.bind(this);
    }

    componentDidMount() {
        this.whoHasReported();
        this.getJobDetails();
    }

    whoHasReported() {
        axios.get("/whoHasReported/" + this.props.id).then(results => {
            this.setState({
                whoHasReported: "blah"
            });
        });
    }
    hideBePremiumModal=()=> {
        document.body.classList.remove('lockBackground')
        this.setState({ showBePremiumModal: false })
    }

    getJobDetails() {
        axios.get("/getJobDetails/" + this.props.id).then(result => {
            this.setState({
                jobData: result.data
            });
        });
    }

    reportPost() {
        if (!this.props.clickerid) {
            this.setState({
                pleaseLogin: true
            });
            return;
        }
        if (
            this.state.jobData.data.whoreported &&
            this.state.jobData.data.whoreported.includes(this.props.clickerid)
        ) {
            this.setState({
                reportedAlready: true,
                thanksForReporting: false
            });
        } else {
            axios.post("/reportPost/" + this.props.id).then(result => {
                this.setState({
                    thanksForReporting: true
                });
                this.getJobDetails();
            });
        }
    }

    render() {
        if (!this.state.jobData) {
            return null;
        }
        return (
            <div>
                <div
                    onClick={this.props.close}
                    className="backgroundBlock"
                ></div>
                <button onClick={this.props.close} className="modalButton">
                    <i className="fa fa-close" />
                </button>

                <main
                    className={
                        this.state.jobData.data.urgent === "true"
                            ? "urgentModal"
                            : "modal"
                    }
                >
                    <h1 id="title" className="heading-1">
                        JobDirecto
                        <br />
                        <span className="heading-1">
                            {this.context.main.title.replace("%namearea%",this.props.countryname)}
                        </span>
                        <br />
                        <span className="heading-1 website">
                            ({location.host})
                        </span>
                    </h1>
                    <table id="jobDetails">
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
                        \
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
                                {this.context.jobConfirm.area}
                            </td>
                            <td className="jobDetailsText">
                                {(this.props.country.find(e=>e.id==this.state.jobData.data.id_area) || this.props.country.find(e=>e.id==this.state.jobData.data.area) || {}).name}
                            </td>
                        </tr>
                        
                        <tr>
                            <td className="jobDetailsText">
                                {this.context.jobConfirm.phone}
                            </td>
                            <td className="jobDetailsText">
                            {this.state.jobData.data.phone!==false ? (this.state.jobData.data.phone) : (<div style={{cursor:"pointer"}} onClick={_=>this.setState({showBePremiumModal:true})}>{this.context.jobConfirm.viewDetails}</div>)}
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
                            <br />
                            <br />
                        </tr>
                    </table>

                    {this.props.whoReported &&
                        this.props.whoReported.data &&
                        this.props.whoReported.data.find(
                            x => x.id === this.props.id
                        ).whoreported &&
                        this.props.whoReported.data.find(
                            x => x.id === this.props.id
                        ).whoreported.length > 10 && (
                            <div className="modalFlagDiv">
                                {" "}
                                <img className="flag" src="flag.png" />
                                <p className="text">
                                    {this.context.main.tooltip2}
                                </p>
                            </div>
                        )}
                    <div className="redFlagDiv">
                        <p className="text">
                            Si cree que este anuncio es indebido, porfavor
                            reportelo
                        </p>
                    </div>
                    <div className="reportContainer">
                        <button
                            className="reportButton"
                            onClick={this.reportPost}
                        >
                            <div className="reportDiv">
                                <p className="text reportText">Reportar</p>
                                <img src="flag.png" className="redFlag" />
                            </div>
                        </button>
                        {this.state.thanksForReporting == true && (
                            <p className="redReportText">
                                {this.context.modalJob.thanksForReporting}
                            </p>
                        )}
                        {this.state.pleaseLogin == true && (
                            <div>
                                <p className="redReportText">
                                    {this.context.modalJob.pleaseLogin}{" "}
                                </p>
                                <Link className="callToLogin" to="/login">
                                    {this.context.modalJob.pleaseLogin2}
                                    &nbsp;
                                    <img
                                        className="star starJobForm"
                                        src="star.png"
                                    />
                                </Link>
                            </div>
                        )}

                        {this.state.reportedAlready == true && (
                            <p className="redReportText">
                                {this.context.modalJob.reportedAlready}
                            </p>
                        )}
                    </div>
                    <br />
                    <br />
                </main>

                {this.state.showBePremiumModal && (
                    <BePremiumModal close={this.hideBePremiumModal} />
                )}
            </div>
        );
    }
}

ModalJob.contextType = LanguageContext;
