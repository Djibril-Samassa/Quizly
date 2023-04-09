import React from "react";
import QuizList from "../composants/QuizList";
import jwt_decode from "jwt-decode"
import axios from "axios";
import { useEffect, useState } from "react";

export default function Profil() {

    const [user, setUser] = useState({})
    const [quizList, setQuizList] = useState()

    useEffect(() => {
        const decoded = jwt_decode(localStorage.token)
        setUser(decoded)
        async function getQuizzes() {
            try {
                const rep = await axios.get(`http://localhost:8000/quiz/${decoded.userId}`)
                setQuizList(rep.data)
            } catch (err) {
                console.log(err)
            }
        }
        getQuizzes()
    }, [])

    return (< div style={{margin: "0em 5em "}}>
        <h1>
            Bienvenue sur votre profil {user.username} !
        </h1>
        <br />
        <div>
            <h3>Votre profil</h3>
            <p>Prénom: {user.firstname}</p>
            <p>Nom: {user.lastname}</p>
            <p>Adresse e-mail: {user.email}</p>
            <p>Nom d'utilisateur: {user.username}</p>
        </div>
        <br />
        <div>
            <h3>Vos Quiz</h3>
            {quizList?.length >= 1 ? <QuizList list={quizList} fromProfile={true} /> : <h3>Vous n'avez pas encore crée de quiz <a href="/quiz">Créez en un maintenant</a> </h3>}

        </div>
    </div>)
}