import React,{Component} from "react";
import {Route,Routes,Navigate,Outlet} from "react-router-dom";

let authenticate = ()=> {
    //获取token
    const token = sessionStorage.getItem('token')
    //token是否存在
    return token?true:false
}

const PrivateRoute = ()=> {
    return authenticate()?<Outlet/>:<Navigate to={'/login'}/>
}

export default PrivateRoute