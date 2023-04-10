import React from "react";
import Style from "./Accueil.module.css"

export default function Accueil() {
    return (<div className={Style.container}>
        <h1>Bienvenue sur Quizly</h1>
        <br />
        <div className={Style.content}>
            <div>
                <div className={Style.annonce}>
                    <h2>Sur Quizly</h2>
                    <h3>1 - Créez des quiz </h3>
                    <h3>2 - Jouez à ceux crées par la communauté </h3>
                    <h3>3 - Essayez d'obtenir les meilleurs rangs au classement</h3>
                </div>
                <img className={`image ${Style.img}`} src="/choisir.png" />
            </div>
            <br />
            <br />
            <br />
            <div>
                <div>
                    <h1>Projet réalisé par Djibril SAMASSA</h1>
                    <h3>Un projet rassemblant React Js en Frontend et NodeJS en backend avec l'utilisation de plusieurs librairies comme
                        Mongoose, Axios, React-Router-Dom, Express, JsonWebToken et d'autres technologies
                    </h3>
                    <h3><a target="/blank" href="https://djibrilsamassa.netlify.app/">Faites un tour sur mon portfolio</a> pour découvrir d'autres projets ou <a href="/quiz">Commencez à jouer dès maintenant</a></h3>
                </div>
            </div>
        </div>
    </div>)
}