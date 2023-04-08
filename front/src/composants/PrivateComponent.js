/*eslint-disable*/
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PrivateComponent(props) {
    const Redirect = useNavigate()
    const Component = props.component
    useEffect(()=>{
        props.isLoggedIn ? null : Redirect("/auth")
    },[props])

    return (<>
        {props.isLoggedIn ? <Component /> : null}
    </>)
}