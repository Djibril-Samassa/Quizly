import React, { useState, useEffect } from "react";
import axios from "axios";
import Style from "./Quiz.module.css"
import QuizList from "../composants/QuizList";
import CreateQuiz from "../composants/CreateQuiz";

export default function Quiz() {
    const [action, setAction] = useState("play")
    const [quizList, setQuizList] = useState([])
    useEffect(() => {
        axios
            .get("http://localhost:8000/quiz")
            .then((res) => {
                setQuizList(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return (<div className={Style.container}>
        <div className={Style.option}>
            <h2 className={`button ${action === "play" ? Style.selected : null}`} onClick={() => { setAction("play") }}>Jouer</h2>
            <h2 className={`button ${action === "create" ? Style.selected : null}`} onClick={() => { setAction("create") }}>Créer votre Quiz</h2>
        </div>
        {action === "create" ?
            <CreateQuiz /> : action === "play" ? <QuizList setAction={setAction} list={quizList} /> : null}
    </div>)
}