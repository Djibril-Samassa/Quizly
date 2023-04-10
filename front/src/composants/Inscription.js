/*eslint-disable*/

import { React, useEffect, useState } from "react";
import axios from "axios";
import Style from "../pages/Authentification.module.css"
import { useNavigate } from "react-router-dom";

export default function Inscription(props) {
    const redirect = useNavigate();
    const [userData, setUserData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        username: '',
        password: ''
    });
    const [userDoesExist, setUserDoesExist] = useState("")
    const [confirmpw, setConfirmpw] = useState("");
    const [passwordMatch, setPasswordMatch] = useState();
    const [formError, setFormError] = useState();
    const errorMessage = {
        doesNoMatch: "Mots de passe non identiques",
    };

    const handleCheckPassword = (value) => {
        setConfirmpw(value);
        value === userData.password ? setPasswordMatch(true) : setPasswordMatch(false);
    };

    const handleSubmit = (data) => {
        event.preventDefault()
        userData.firstname && userData.lastname && userData.email && userData.username && userData.password.length >= 8 && passwordMatch
            ? axios
                .post("https://nameless-spire-39708.herokuapp.com/inscription", data)
                .then((res) => {
                    props.setDidCreateAccount(true)
                    props.setAction("connexion")
                    localStorage.setItem("email", email)
                    alert("Votre compte a bien été créé ✅");
                })
                .catch((err) => {
                    setUserDoesExist(err?.response?.data?.message)
                })
            : setFormError(true);
    };

    return (
        <div>
            <form className={Style.formulaire} onSubmit={() => { handleSubmit(userData) }}>
                <h3>Rejoignez la communauté</h3>
                <span className={Style.inputContainer}>
                    <label for="prenom">Prenom <span style={{ color: "red" }}>*</span></label>
                    <input
                        value={userData.firstname}
                        onChange={(e) => {
                            setUserData({ ...userData, firstname: e.target.value });
                        }}
                        type="text"
                        required
                    />
                </span>
                <span className={Style.inputContainer}>
                    <label for="nom">Nom <span style={{ color: "red" }}>*</span></label>
                    <input
                        value={userData.lastname}
                        onChange={(e) => {
                            setUserData({ ...userData, lastname: e.target.value });
                        }}
                        type="text"
                        required
                    />
                </span>
                <span className={Style.inputContainer}>
                    <label for="email">Adresse e-mail <span style={{ color: "red" }}>*</span></label>
                    <input
                        value={userData.email}
                        onChange={(e) => {
                            setUserData({ ...userData, email: e.target.value });
                        }}
                        type="email"
                        required
                    />
                </span>
                <span className={Style.inputContainer}>
                    <label for="username">Nom d'utilisateur <span style={{ color: "red" }}>*</span></label>
                    <input
                        value={userData.username}
                        onChange={(e) => {
                            setUserData({ ...userData, username: e.target.value });
                        }}
                        type="text"
                        required
                    />
                </span>
                <span className={Style.inputContainer}>
                    <label for="password">Mot de passe <span style={{ color: "red" }}>*</span></label>
                    <input
                        value={userData.password}
                        onChange={(e) => {
                            setUserData({ ...userData, password: e.target.value });
                        }}
                        type="password"
                        required
                    />
                </span>
                <span className={Style.inputContainer}>
                    <label for="confirmpassword">Confirmez votre mot de passe <span style={{ color: "red" }}>*</span></label>
                    <input
                        value={confirmpw}
                        onChange={(e) => {
                            handleCheckPassword(e.target.value);
                        }}
                        type="password"
                        required
                    />
                </span>
                {formError ? (
                    <div>
                        {formError && !passwordMatch && userData.password.length > 0 && confirmpw.length > 0 ? <p style={{ color: "red" }} className="error">{errorMessage.doesNoMatch}</p> : (
                            null
                        )}
                    </div>
                ) : null}
                <p>Les champs marqués d'une <span style={{ color: 'red' }}>*</span> sont obligatoires</p>
                {formError && userData.password.length < 8 ? <p style={{ color: 'red' }}>Votre mot de passe doit comporter au moins 8 caractères</p> : null}
                <p>{userDoesExist}</p>
                <button
                    className={`${Style.inscription} button`}
                    type="submit"
                    disabled={userData.firstname && userData.lastname && userData.username && userData.email && userData.password && !passwordMatch && formError && confirmpw}
                >
                    S'inscrire
                </button>
            </form>
        </div>
    )


}