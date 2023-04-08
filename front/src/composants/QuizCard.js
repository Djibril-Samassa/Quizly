/*eslint-disable*/
import React, { useEffect, useState } from "react";
import axios from "axios"
import jwt_decode from "jwt-decode"
import { useNavigate } from "react-router-dom";
import Style from "./QuizCard.module.css";

export default function QuizCard(props) {
  // niveau back faire un post de l'id du quiz selectionné => PlayQuiz
  const [isCreator, setIsCreator] = useState({})
  const [currentQuiz, setCurrentQuiz] = useState({})
  const [confirm, setConfirm] = useState(false)

  useEffect(() => {
    const decoded = jwt_decode(localStorage.token)
    setCurrentQuiz(props.quiz)
  }, [])

  const redirect = useNavigate();

  const deleteQuiz = () => {
    const id = currentQuiz._id
    axios.get(`http://localhost:8000/quiz/delete/${id}`)
      .then((res) => { console.log(res) })
      .catch((err) => { console.log(err) })
    setCurrentQuiz({}),
      window.location.reload()
  }

  const editQuiz = async () => {
    const quizToSave = JSON.stringify(currentQuiz)
    localStorage.setItem("selectedQuiz", quizToSave)
    props.setAction("create")
  }

  const redirectToQuiz = () => {
    appStorage.setItem("selectedQuiz", quiz);
    redirect(`/quiz/play/id:${quiz._id}`);
  };
  const id = currentQuiz?.id;
  return (
    <div
      className={Style.container}
      onClick={() => {
        // redirectToQuiz();
      }}
    >
      <div className={Style.title}>
        <h4>{currentQuiz.title}</h4>
      </div>
      <p>{currentQuiz.about}</p>
      <span className={Style.isCreator}>
        {isCreator ? <p onClick={() => { editQuiz() }} className="button">Modifier</p> : null}
        {isCreator ? <p onClick={() => { setConfirm(true) }} className="button">Supprimer</p> : null}
      </span>
      {confirm ?
        <div>
          <p>Voulez vous vraiment supprimer le quiz ?</p>
          <div className={Style.confirm}>
            <p className="button" onClick={() => { deleteQuiz() }}>Supprimer</p>
            <p className="button" onClick={() => { setConfirm(false) }}>Annuler</p>
          </div>
        </div>
        : null}
    </div>
  );
}
