/*eslint-disable*/

import { React, useEffect, useState } from "react";
import axios from "axios";
import Style from "../pages/Authentification.module.css"
import { useNavigate } from "react-router-dom";

export default function Inscription() {
    const redirect = useNavigate();
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpw, setConfirmpw] = useState("");
    const [passwordMatch, setPasswordMatch] = useState();
    const [formError, setFormError] = useState();
    const errorMessage = {
        doesNoMatch: "Mots de passe non identiques",
        emptyField: "Veuillez remplir tous les champ",
    };


    const data = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        username: username,
        password: password,
    };

    const handleCheckPassword = (value) => {
        setConfirmpw(value);
        value === password ? setPasswordMatch(true) : setPasswordMatch(false);
    };

    const handleSubmit = (data) => {
        firstname && lastname && email && username && password && passwordMatch
            ? axios
                .post("http://localhost:8000/inscription", data)
                .then((res) => {
                    alert("Votre compte a bien été créé ✅");
                    localStorage.setItem("email", email)
                    redirect("/connexion");
                })
                .catch((err) => {
                    console.log(err);
                })
            : setFormError(true);
    };

    return (
        <div>
            <form className={Style.formulaire}>
                <h3>Rejoignez la communauté</h3>
                <span className={Style.inputContainer}>
                    <label for="prenom">Prenom</label>
                    <input
                        value={firstname}
                        onChange={(e) => {
                            setFirstname(e.target.value);
                        }}
                        type="text"
                        required
                    />
                </span>
                <span className={Style.inputContainer}>
                    <label for="nom">Nom</label>
                    <input
                        value={lastname}
                        onChange={(e) => {
                            setLastname(e.target.value);
                        }}
                        type="text"
                        required
                    />
                </span>
                <span className={Style.inputContainer}>
                    <label for="email">Adresse e-mail</label>
                    <input
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        type="email"
                        required
                    />
                </span>
                <span className={Style.inputContainer}>
                    <label for="username">Nom d'utilisateur</label>
                    <input
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                        type="text"
                        required
                    />
                </span>
                <span className={Style.inputContainer}>
                    <label for="password">Mot de passe</label>
                    <input
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        type="password"
                        required
                    />
                </span>
                <span className={Style.inputContainer}>
                    <label for="confirmpassword">Confirmez votre mot de passe</label>
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
                        {passwordMatch ? null : (
                            <p className="error">{errorMessage.doesNoMatch}</p>
                        )}

                        {!firstname ||
                            !lastname ||
                            !email ||
                            !username ||
                            !password ||
                            !confirmpw ? (
                            <p className="error"> {errorMessage.emptyField}</p>
                        ) : null}
                    </div>
                ) : null}
                <div
                    onClick={() => {
                        handleSubmit(data);
                    }}
                    className={`${Style.inscription} button`}
                >
                    S'inscrire
                </div>
            </form>
        </div>
    )


}