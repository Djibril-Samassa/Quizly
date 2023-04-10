/*eslint-disable*/
import {React, useContext} from "react";
import Style from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import Logo from "../Logo.png";
import axios from "axios";
import { AuthContext } from "../App";

export default function Header() {
    const LogState = useContext(AuthContext)
    const redirect = useNavigate()
    const handleLogout = async () => {
        await axios.get("https://quizlybydjibril.herokuapp.com/logout")
            .then(() => { LogState.logOut(), localStorage.clear() })
            .then(() => { redirect("/") })
    }

    return (
        <div className={Style.container}>
            <img className={Style.logo} src={Logo} />
            <nav className={Style.nav}>
                <li><a href="/">Accueil</a></li>
                <li><a href="/quiz">Quiz</a></li>
                <li><a href="/profile">Profil</a></li>
            </nav>
            <span onClick={() => { handleLogout() }} className={`${Style.logout} button`}>Se déconnecter</span>
        </div>
    );
}
