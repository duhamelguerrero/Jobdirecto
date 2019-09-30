import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Router } from "./utils/router";


const JobsController = React.lazy(_=>import("./pages/Jobs/JobsController"));
const LoginController = React.lazy(_=>import("./pages/Login/LoginController"));
const PrePayJobController = React.lazy(_=>import("./pages/PrePayJob/PrePayJobController"));
const PremiumBuyController = React.lazy(_=>import("./pages/PremiumBuy/PremiumBuyController"));
const PremiumSetController = React.lazy(_=>import("./pages/PremiumSet/PremiumSetController"));
const JobConfirmController = React.lazy(_=>import("./pages/JobConfirm/JobConfirmController"));
const PersonFormController = React.lazy(_=>import("./pages/PersonForm/PersonFormController"));
const JobFormController = React.lazy(_=>import("./pages/JobForm/JobFormController"));
const PrePayPersonController = React.lazy(_=>import("./pages/PrePayPerson/PrePayPersonController"));
const PostTypeController = React.lazy(_=>import("./pages/PostType/PostTypeController"));
const PersonConfirmController = React.lazy(_=>import("./pages/PersonConfirm/PersonConfirmController"));

let routes = [
    {path:"", component:JobsController},
    {path:"login", component:LoginController},
    {path:"prePayJob",component:PrePayJobController},
    {path:"premiumBuy",component:PremiumBuyController},
    {path:"premiumSet",component:PremiumSetController},
    {path:"JobConfirm",component:JobConfirmController},
    {path:"JobConfirm/:id",component:JobConfirmController},
    {path:"personForm",component:PersonFormController},
    {path:"jobForm",component:JobFormController},
    {path:"PrePayPerson",component:PrePayPersonController},
    {path:"postType",component:PostTypeController},
    {path:"personConfirm",component:PersonConfirmController},
    {path:"personConfirm/:id",component:PersonConfirmController},
];

ReactDOM.render(<Router routes={routes}  />, document.querySelector("#app"));
