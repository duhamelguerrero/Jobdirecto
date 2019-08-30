import React, { Component } from "react";
import style from './BodyComponent.scss';


export function BodyComponent(props){
    let {children, ...attrs} = props;
    return (<div className={style.Body} {...attrs}>
        {children}
    </div>)
}