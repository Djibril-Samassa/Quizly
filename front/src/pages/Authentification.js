/*eslint-disable*/
import React, { useEffect, useState } from "react";
import Connexion from "../composants/Connexion";
import Inscription from "../composants/Inscription";
import Style from "./Authentification.module.css"
import Presentation from "../composants/Presentation";
import { useNavigate } from "react-router-dom";

export default function Authentification(props) {
    const Redirect = useNavigate()
    const [action, setAction] = useState("connexion")
    const [didCreateAccount, setDidCreateAccount] = useState(false)
    useEffect(() => {
        props.isLoggedIn ?
            Redirect("/") : null
    }, [props])
    return (

        <div className={Style.pageContainer} >
            <div>
                {action === "inscription" ? <Inscription setDidCreateAccount={setDidCreateAccount} setAction={setAction} /> : action === "connexion" ? <Connexion didCreateAccount={didCreateAccount} /> : null}
                {action === "inscription" ?
                    <p>Vous avez déjà un compte ? <span className={Style.link} onClick={() => { setAction('connexion') }}>Connectez vous</span></p>
                    : action === "connexion" ?
                        <p>Vous n'avez pas de compte ? <span className={Style.link} onClick={() => { setAction('inscription') }}>Inscrivez vous</span></p>
                        : null}
            </div>
            <Presentation />
        </div>
    )
}