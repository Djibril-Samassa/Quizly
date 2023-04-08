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

    return (<>
        <h1>Profil</h1>
        <h3>
            Bienvenue {user.username} !
        </h3>
        <QuizList list={quizList} />
    </>)
}