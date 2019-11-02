import React from "react";
import axios from "axios";
import Moment from "react-moment";
import "moment/locale/es";
import { BodyComponent } from "../../components/Body/BodyComponent";
import { LanguageContext } from "../../components/Language/LanguageContext";
import { Link } from "../../utils/router";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import PremiumModal from "../../components/PremiumModal/PremiumModal";
import ModalPeople from "../../components/ModalPeople/ModalPeople";
import ModalJob from "../../components/ModalJob/ModalJob";
import { logOut } from "../../utils/sessions";
import BePremiumModal from "../../components/BePremiumModal/BePremiumModal";



var ReactGA = require("react-ga");

export default class JobsController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addClass: false,
            showModalJob: false,
            showPremiumModal: false,
            showBePremiumModal: false,
            showModalPeople: false,
            user: "true",
            showDeleteModal: false,
            country:false,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.showModalPeople = this.showModalPeople.bind(this);
        this.hideModalJob = this.hideModalJob.bind(this);
        this.hideModalPeople = this.hideModalPeople.bind(this);
        this.urgentJobInterval = this.urgentJobInterval.bind(this);
        this.trackCreatecloseJob = this.trackCreateJob.bind(this);
        this.showDeleteModal = this.showDeleteModal.bind(this);
        this.hideDeleteModal = this.hideDeleteModal.bind(this);
        this.hidePremiumModal = this.hidePremiumModal.bind(this);
        this.getJobs = this.getJobs.bind(this);
        this.getUserStatus = this.getUserStatus.bind(this);
        this.getPeople = this.getPeople.bind(this);
        this.logOut = this.logOut.bind(this);
        this.showPremium = this.showPremium.bind(this);
    }

    componentDidMount() {
        
        this.getCountry();
        this.getJobs();
        this.getPeople();
        this.getUserStatus();
        return axios({
            method: 'get',
            url: '/user',
            params: {},
            withCredentials: true
        }).then(result => {
            this.setState({ user: result.data }, () => {
                
            });
            
        });
    }

    getCountry(){
        let hostname = location.hostname;
        let sub = hostname.split(".")[0];
        axios({
            method: 'get',
            url: '/getCountry',
            params: {
                code:sub
            },
            withCredentials: true
        }).then(result => {
            
            this.setState({
                country:result.data.data[0],
            });
            
        });
    }

    handleChangeArea(event) {
        this.setState({
            [event.target.name]: event.target.value,
            userSelectionArea: event.target.value
        });
    }


    getJobs() {
        axios.get("/getJobs").then(result => {
            this.setState({ jobData: result.data }, () => {
                
            });
        });
    }

    getUserStatus() {
        
        axios.get("/getUserStatus").then(result => {
            
            if(result.data){
                this.setState({ userStatus: result.data }, () => {
                    
                });
            }
        });
    }

    getPeople() {
        axios.get("/getPeople").then(result => {
            this.setState({ peopleData: result.data }, () => {
            });
        });
    }


    logOut() {
        logOut()
        location.reload();
    }

    lockScroll() {
        this.setState({ addClass: !this.state.addClass });
    }

    handleSubmit(event) {
        this.props.navigation.navigate("/postType")
    }

    payPremium(){
        this.setState({ showBePremiumModal: true });
    }

    showModalJob(event, id_user) {
        document.body.classList.add('lockBackground')

        this.setState({
            showModalJob: true,
            selectedJobId: event,
            id_user: id_user

        });
    }

    showPremium() {
        document.body.classList.add('lockBackground')

        
        this.setState({
            showPremiumModal: true,
        });
    }


    showDeleteModal(event, id, posttype, userstatus) {
        event.preventDefault();
        
        document.body.classList.add('lockBackground')
        event.stopPropagation();
        this.setState({
            showDeleteModal: true,
            selectedJobId: id,
            posttype: posttype,
        });
    }

    showModalPeople(event) {
        document.body.classList.add('lockBackground')
        this.setState({
            showModalPeople: true,
            selectedPersonId: event
        });
    }

    hideModalJob() {
        document.body.classList.remove('lockBackground')
        this.setState({ showModalJob: false });
    }

    hideDeleteModal() {
        document.body.classList.remove('lockBackground')
        this.setState({ showDeleteModal: false }, () => {
        });
    }

    hidePremiumModal() {
        document.body.classList.remove('lockBackground')
        this.setState({ showPremiumModal: false }, () => {
        });
    }

    hideBePremiumModal=()=> {
        document.body.classList.remove('lockBackground')
        this.setState({ showBePremiumModal: false })
    }

    hideModalPeople() {
        document.body.classList.remove('lockBackground')
        this.setState({ showModalPeople: false });
    }

    trackCreateJob(event) {
        ga("send", "event", {
            eventCategory: "button",
            eventAction: "createJob",
            eventLabel: event.target.href
        });
    }

    urgentJobInterval(created_at) {
        // job timestamp in miliseconds
        let timeStampMili = new Date(created_at);
        // now in miliseconds
        let nowMili = Date.now();
        // urgent job interval in hours
        let jobIntervalHours = 48;
        // job interval in miliseconds
        let jobIntervalMili = jobIntervalHours * 60 * 60 * 1000;
        //condition
        let intervalOp = nowMili - timeStampMili < jobIntervalMili;
        return intervalOp;
    }

    render() {
        let bodyClass = ["bodyClass"];
        let date = new Date();
        // si no pongo esto y estoy logeado, nada funciona, porque?
        if (!this.state.jobData || !this.state.peopleData || !this.state.country) {
            return null;
        }
        return (
            <BodyComponent toggleLanguage={this.props.navigation.toggleLanguage}>
            <div className="itAll">
                
		        <p className="ambassadorText">{this.context.main.ambassador}</p>
                {!this.state.user && <Link to="/login"><div className="buttonsAuth" ><img className="star starMini" src="star.png" /><p className="authText">{this.context.main.login}</p></div></Link>}
                {this.state.user && <p className="buttonsAuth" onClick={this.logOut}>{this.context.main.logout}</p>}

                <div>
                    <h1 />
                </div>
                {this.state.showModalJob && (
                    <ModalJob countryname={this.state.country.name} country={this.state.country.areas} id={this.state.selectedJobId} close={this.hideModalJob} id_user={this.state.id_user} clickerid={this.state.user.id} whoReported={this.state.jobData} />
                )}
                {this.state.showDeleteModal && this.state.userStatus && (
                    <DeleteModal id={this.state.selectedJobId} userstatus={this.state.userStatus.data} close={this.hideDeleteModal} showPremium={this.showPremium} delete={this.deletePost} postType={this.state.posttype} getJobs={this.getJobs} getPeople={this.getPeople} />
                )}
                {this.state.showPremiumModal && this.state.userStatus && (
                    <PremiumModal close={this.hidePremiumModal} />
                )}

                {this.state.showBePremiumModal && (
                    <BePremiumModal close={this.hideBePremiumModal} />
                )}

                {this.state.showModalPeople && (
                    <ModalPeople
                        country={this.state.country.areas}
                        id={this.state.selectedPersonId}
                        close={this.hideModalPeople}
                    />
                )}

                <div className="buttonsAndFilters">
                    <div className="buttonAndWelcome">
                        <input
                            id="buttonCreatePost"
                            className="buttonBasic"
                            type="submit"
                            value={this.context.main.createPost}
                            onClick={this.handleSubmit}
                        />
                        {this.state.user && this.state.userStatus && this.state.userStatus.data && this.state.userStatus.data !== "true" && <h3 id="welcomeText" className="text">{this.context.main.welcome}<br /> {this.state.user.name} </h3>}
                        {this.state.user && this.state.userStatus && this.state.userStatus.data && this.state.userStatus.data == "true" && <h3 id="welcomeText" className="text">{this.context.main.welcome}<br /> {this.state.user.name} <br />{this.context.main.premium}</h3>}

                        {/**/}


                    </div>
                    <form
                        onSubmit={() => {
                            this.handleSubmit();
                            this.trackCreateJob();
                        }}
                    >
                        <select
                            className="filter"
                            type="text"
                            name="area"
                            onChange={this.handleChangeArea}
                        >
                            
                            {this.state.country && this.state.country.areas.map(e=>{
                                return <option value={e.id}>&#160;&#160;{e.name}</option>
                            })}
                            {/* <option value="">
                                &#160;&#160;{this.context.main.filterDefault}
                            </option>
                            <option value="Manhattan">&#160;&#160;Manhattan</option>
                            <option value="Brooklyn">&#160;&#160;Brooklyn</option>
                            <option value="Queens">&#160;&#160;Queens</option>
                            <option value="Bronx">&#160;&#160;Bronx</option>
                            <option value="Staten Island">&#160;&#160;Staten Island</option>
                            <option value="Otra area en NY">
                                &#160;&#160;{this.context.main.filterOtherArea}
                            </option> */}
                        </select>
                    </form>
                </div>
                

                <div className="allPosts">
                    {/*urgent job posts here*/}
                    
                    {!this.state.userSelectionArea &&
                        this.state.jobData.data.map(data => {
                            if (
                                data.urgent === "true" &&
                                this.urgentJobInterval(data.created_at) === true

                            ) {
                                return (
                                    <div
                                        onClick={e => this.showModalJob(data.id, data.id_user)}
                                        className={`postData paidPostData ${data.needPremium?"blureffect":""}`}
                                        key={data.id}
                                    >
                                        <div className="flexContainer">
                                            <div className="postIcons">
                                                {data.id_user === this.state.user.id &&
                                                    <button onClick={event => this.showDeleteModal(event, data.id, data.posttype, this.state.userStatus.data)} className="deletePostButton deletePaidButton">
                                                        <i className="fa fa-close" />
                                                    </button>
                                                    
                                                }
                                                <button  className="showMoreButton">
                                                        <i className="fa fa-plus" />
                                                    </button>
                                            </div>
                                            <p>
                                                <span className="posterName">
                                                    {data.restname}{" "}
                                                </span>
                                                <span className="postConnector paidPostConnector">
                                                    {this.context.main.seeking}{" "}
                                                </span>
                                                <span className="posterGoal paidPosterGoal">
                                                    {data.jobtype}
                                                </span>
                                            </p>
                                        </div>

                                        <p className="postArea">{(this.state.country.areas.find(e=>e.id==data.area) || {}).name}</p>
                                        <div className="postMoment">
                                            <Moment
                                                className="postMomentChild"
                                                fromNow
                                            >
                                                {data.created_at}
                                            </Moment>
                                        </div>
                                    </div>
                                );
                            }
                        })}

                    {this.state.userSelectionArea &&
                        this.state.jobData.data.map(data => {
                            if (
                                this.state.userSelectionArea === data.area &&
                                data.urgent === "true" &&
                                this.urgentJobInterval(data.created_at) === true
                            ) {
                                return (
                                    <div
                                        onClick={e => this.showModalJob(data.id, data.id_user)}
                                        className={`postData paidPostData ${data.needPremium?"blureffect":""}`}
                                        key={data.id}
                                    >
                                        <div className="flexContainer">
                                            <div className="postIcons">
                                                {data.id_user === this.state.user.id &&
                                                    <button onClick={event => this.showDeleteModal(event, data.id)} className="deletePostButton deletePaidButton">
                                                        <i className="fa fa-close" />
                                                    </button>}
                                            </div>
                                        </div>
                                        <p>
                                            <span className="posterName">
                                                {data.restname}{" "}
                                            </span>
                                            <span className="postConnector paidPostConnector">
                                                {this.context.main.seeking}{" "}
                                            </span>
                                            <span className="posterGoal paidPosterGoal">
                                                {data.jobtype}
                                            </span>
                                        </p>

                                        <p className="postArea">{(this.state.country.areas.find(e=>e.id==data.area) || {}).name}</p>
                                        <div className="postMoment">
                                            <Moment fromNow>
                                                {data.created_at}
                                            </Moment>
                                        </div>
                                    </div>
                                );
                            }
                        })}
                    {this.state.userSelectionArea &&
                        this.state.jobData.data.map(data => {
                            if (
                                this.state.userSelectionArea !== this.context.main.filterOtherArea &&
                                data.urgent === "true" && data.area !== "Queens" && data.area !== "Bronx" && data.area !== "Brooklyn" && data.area !== "Manhattan" && data.area !== "Staten Island"
                            ) {
                                return (
                                    <div
                                        onClick={e => this.showModalJob(data.id, data.id_user)}
                                        className={`postData paidPostData ${data.needPremium?"blureffect":""}`}
                                        key={data.id}
                                    >
                                        <div className="flexContainer">
                                            <div className="postIcons">
                                                {data.id_user === this.state.user.id &&
                                                    <button onClick={event => this.showDeleteModal(event, data.id, data.posttype, this.state.userStatus.data)} className="deletePostButton deletePaidButton">
                                                        <i className="fa fa-close" />
                                                    </button>}
                                                    <button  className="showMoreButton">
                                                        <i className="fa fa-plus" />
                                                    </button>
                                            </div>
                                        </div>
                                        <p>
                                            <span className="postConnector">
                                                {data.restname}
                                            </span>{" "}
                                            <span className="postConnector paidPostConnector">
                                                {this.context.main.seeking3}{" "}
                                            </span>
                                            <span className="posterGoal">
                                                {data.jobtype}
                                            </span>
                                        </p>

                                        <p className="postArea">{(this.state.country.areas.find(e=>e.id==data.area) || {}).name}</p>
                                        <div className="postMoment">
                                            <Moment fromNow>
                                                {data.created_at}
                                            </Moment>
                                        </div>
                                    </div>
                                );
                            }
                        })}


                    {/*people seeking jobs*/}

                    {!this.state.userSelectionArea &&
                        this.state.peopleData.data.map(data => {
                            if (

                                this.urgentJobInterval(data.created_at) === true
                            ) {
                                return (
                                    <div
                                        onClick={e =>
                                            this.showModalPeople(data.id)
                                        }
                                        className="postData paidPostData"
                                        key={data.id}
                                    >
                                        <div className="flexContainer">
                                            <div className="postIcons">
                                                {data.id_user === this.state.user.id &&
                                                    <button onClick={event => this.showDeleteModal(event, data.id, data.posttype, this.state.userStatus.data)} className="deletePostButton deletePaidButton">
                                                        <i className="fa fa-close" />
                                                    </button>}
                                                    <button  className="showMoreButton">
                                                        <i className="fa fa-plus" />
                                                    </button>
                                            </div>
                                            <p>
                                                <span className="posterName">
                                                    {data.personname}
                                                </span>
                                                <span className="postConnector paidPostConnector">
                                                    {" "}
                                                    {
                                                        this.context.main
                                                            .seeking2
                                                    }{" "}
                                                </span>
                                                <span className="posterGoal paidPosterGoal">
                                                    {" "}
                                                    {data.personskill}{" "}
                                                </span>
                                            </p>
                                        </div>

                                        <div className="postMoment">
                                            <Moment fromNow>
                                                {data.created_at}
                                            </Moment>
                                        </div>
                                    </div>
                                );
                            }
                        })}



                    {/*normal posts here*/}
                    {this.state.userSelectionArea &&
                        this.state.jobData.data.map(data => {
                            if (
                                this.state.userSelectionArea === data.area &&
                                data.urgent !== "true"
                            ) {
                                return (
                                    <div
                                        onClick={e => data.needPremium?this.payPremium():this.showModalJob(data.id, data.id_user)}
                                        className={`postData ${data.needPremium?"blureffect":""}`}
                                        key={data.id}
                                    >
                                        <div className="flexContainer">
                                            <div className="postIcons">
                                                {data.id_user === this.state.user.id &&
                                                    <button onClick={event => this.showDeleteModal(event, data.id, data.posttype, this.state.userStatus.data)} className="deletePostButton">
                                                        <i className="fa fa-close" />
                                                    </button>}
                                                    <button  className="showMoreButton">
                                                        <i className="fa fa-plus" />
                                                    </button>
                                            </div>
                                            <p>
                                                <span className="postConnector">
                                                    {data.restname}
                                                </span>{" "}
                                                <span className="postConnector">
                                                    {this.context.main.seeking3}{" "}
                                                </span>
                                                <span className="posterGoal">{data.jobtype}</span>
                                            </p>
                                        </div>

                                        <p className="postArea">{(this.state.country.areas.find(e=>e.id==data.area) || {}).name}</p>
                                        <div className="postMoment">
                                            <Moment fromNow>{data.created_at}</Moment>
                                        </div>
                                    </div>
                                );
                            }
                        })}
                    {this.state.userSelectionArea &&
                        this.state.jobData.data.map(data => {
                            if (
                                this.state.userSelectionArea !== this.context.main.filterOtherArea &&
                                data.urgent !== "true" && data.area !== "Queens" && data.area !== "Bronx" && data.area !== "Brooklyn" && data.area !== "Manhattan" && data.area !== "Staten Island"
                            ) {
                                return (
                                    <div
                                        onClick={e => data.needPremium?this.payPremium():this.showModalJob(data.id, data.id_user)}
                                        className={`postData ${data.needPremium?"blureffect":""}`}
                                        key={data.id}
                                    >
                                        <div className="flexContainer">
                                            <div className="postIcons">
                                                {data.id_user === this.state.user.id &&
                                                    <button onClick={event => this.showDeleteModal(event, data.id, data.posttype, this.state.userStatus.data)} className="deletePostButton">
                                                        <i className="fa fa-close" />
                                                    </button>}
                                                    <button  className="showMoreButton">
                                                        <i className="fa fa-plus" />
                                                    </button>
                                            </div>
                                            <p>
                                                <span className="postConnector">
                                                    {data.restname}
                                                </span>{" "}
                                                <span className="postConnector">
                                                    {this.context.main.seeking3}{" "}
                                                </span>
                                                <span className="posterGoal">{data.jobtype}</span>
                                            </p>

                                        </div>

                                        <p className="postArea">{(this.state.country.areas.find(e=>e.id==data.area) || {}).name}</p>
                                        <div className="postMoment">
                                            <Moment fromNow>{data.created_at}</Moment>
                                        </div>
                                    </div>
                                );
                            }
                        })}

                    {!this.state.userSelectionArea &&
                        this.state.jobData.data.map(data => {
                            if (data.urgent !== "true") {
                                return (

                                    <div
                                        onClick={e => data.needPremium?this.payPremium():this.showModalJob(data.id, data.id_user)}
                                        className={`postData ${data.needPremium?"blureffect":""}`}
                                        key={data.id}
                                    >
                                        <div className="flexContainer">
                                            <div className="postIcons">
                                                {data.id_user === this.state.user.id &&
                                                    <button onClick={event => this.showDeleteModal(event, data.id, data.posttype, this.state.userStatus.data)} className="deletePostButton">
                                                        <i className="fa fa-close" />
                                                    </button>}
                                                    <button  className="showMoreButton">
                                                        <i className="fa fa-plus" />
                                                    </button>
                                                {data.whoreported && data.whoreported.length && data.whoreported.length > 10 && <div data-tooltip={this.context.main.tooltip2}> <img className="flag" src="flag.png" /></div>}

                                            </div>
                                            <p>
                                                <span className="postConnector">
                                                    {data.restname}
                                                </span>{" "}
                                                <span className="postConnector">
                                                    {" "}
                                                    {
                                                        this.context.main
                                                            .seeking3
                                                    }{" "}
                                                </span>
                                                <span className="posterGoal">
                                                    {data.jobtype}
                                                </span>
                                            </p>
                                        </div>
                                        <p className="postArea">{(this.state.country.areas.find(e=>e.id==data.area) || {}).name}</p>
                                        <div className="postMoment">
                                            <Moment
                                                className="postMomentChild"
                                                fromNow
                                            >
                                                {data.created_at}
                                            </Moment>
                                        </div>
                                    </div>

                                );
                            }
                        })}
                </div>
            </div>
            </BodyComponent>
        );
    }
}

JobsController.contextType = LanguageContext;
