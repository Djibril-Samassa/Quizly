/*eslint-disable*/
import React, { useState, useEffect } from "react";
import axios from "axios";
import Style from "./Quiz.module.css"
import QuizList from "../composants/QuizList";
import CreateQuiz from "../composants/CreateQuiz";

export default function Quiz() {
    const [action, setAction] = useState("play")
    const [clearStorage, setClearStorage] = useState(false)
    const [quizList, setQuizList] = useState([])
    useEffect(() => {
        console.log(localStorage.fromProfile)
        localStorage.fromProfile ? setAction("create") : null
        window.addEventListener('beforeunload', localStorage.removeItem("fromProfile"))
        window.removeEventListener('beforeunload', localStorage.removeItem("fromProfile"));
        axios
            .get("http://localhost:8000/quiz")
            .then((res) => {
                setQuizList(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const create = () => {
        localStorage.removeItem('selectedQuiz')
        setClearStorage(true)
        setAction("create")
    }

    return (<div className={Style.container}>
        <div className={Style.option}>
            <h2 className={`button ${action === "play" ? Style.selected : null}`} onClick={() => { setAction("play") }}>Jouer</h2>
            <h2 className={`button ${action === "create" ? Style.selected : null}`} onClick={() => { create() }}>Créer votre Quiz</h2>
        </div>
        {action === "create" ?
            <CreateQuiz clear={clearStorage} action={action} setAction={setAction} /> : action === "play" ? <QuizList clear={setClearStorage} setAction={setAction} list={quizList} /> : null}
    </div>)
}