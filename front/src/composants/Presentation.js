import React from "react";
import Style from "../pages/Authentification.module.css"

export default function Presentation() {
    return (
        <div className={Style.presC}>
            <p className={Style.presP}>
                Rejoignez la communaté Quizly et jouer à des Quiz, <br /><br />
                Créez aussi les vôtres et atteignez le meilleur rang au classement
            </p>
            <img className={`image ${Style.img}`} src="grouper.png" />
        </div>
    )
}