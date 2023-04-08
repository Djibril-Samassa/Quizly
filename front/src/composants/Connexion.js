import { React, useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Style from "../pages/Authentification.module.css"
import { AuthContext } from "../App";

export default function Connexion() {
    const LogState = useContext(AuthContext)

    const redirect = useNavigate()
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    const data = {
        email: email,
        password: password,
    };
    const handleLogin = (data) => {
        axios
            .post("http://localhost:8000/connexion", data)
            .then(async (res) => {
                await localStorage.setItem('token', res.data);
                LogState.logIn()
                redirect('/')
            })
            .catch((err) => {
                setError(true);
                console.log(err);
            });
    };
    return (
        <div>
            <form className={Style.formulaire}>
                <h3 className={Style.formTitle}>Connectez-vous</h3>
                <span className={Style.inputContainer}>
                    <label for="email">Adresse e-mail</label>
                    <input
                    value={localStorage.email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        required
                        type="email"
                    />
                </span>
                <span className={Style.inputContainer}>
                    <label for="password">Mot de passe</label>
                    <input
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        required
                        type="password"
                    />
                </span>
                <p className="error">
                    {error ? "Adresse e-mail ou mot de passe invalide" : null}
                </p>
                <div
                    onClick={() => {
                        handleLogin(data);
                    }}
                    className={`${Style.inscription} button`}
                >
                    Se connecter
                </div>
            </form>
        </div>
    );

    // <div>
    //     <h1>Connexion</h1>
    // </div>

}