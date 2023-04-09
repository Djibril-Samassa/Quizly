/*eslint-disable*/
import react, { useEffect, useState } from "react";
import Style from "./CreateQuiz.module.css";
import jwt_decode from "jwt-decode"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateQuiz(props) {
    const [counter, setCounter] = useState(0)
    const [question, setQuestion] = useState({});
    const [isEditing, setIsEditing] = useState(false)
    const [didUpdated, setDidUpdated] = useState(false)
    const [state, setState] = useState({
        user_id: null,
        questions: []
    });
    const [choosen, setChoosen] = useState();
    const [decoded, setDecoded] = useState({})
    const [finish, setFinish] = useState(false);
    const [isNotEmpty, setIsNotEmpty] = useState(false)
    const redirect = useNavigate();

    useEffect(() => {
        const decoded = jwt_decode(localStorage.token)
        setDecoded(decoded)
        const checkStorage = () => {
            const localQuiz = JSON.parse(localStorage.getItem('selectedQuiz'))
            localStorage.selectedQuiz ? (setQuestion(localQuiz.questions[counter]), setIsEditing(true), setDidUpdated(true), setState(localQuiz)) : null
        }
        checkStorage()
    }, [])

    useEffect(() => {
        localStorage.selectedQuiz ? null : setState({ ...state, user_id: decoded.userId })
    }, [decoded])


    useEffect(() => {
        props.clear ? (setState({ ...state, title: '', about: '', description: '' }), setQuestion({}), setCounter(0), setIsEditing(false)) : null
    }, [props])


    useEffect(() => {
        question?.question &&
            question?.reponseA &&
            question?.reponseB &&
            question?.reponseC &&
            question?.reponseD ? setIsNotEmpty(true) : setIsNotEmpty(false)
    }, [question, state, counter, finish, choosen])

    useEffect(() => {
        isEditing ? setQuestion(state?.questions[counter]) : null
        counter >= 4 ? setFinish(true) : null
    }, [counter])

    const handleCheckResponses = (reponse) => {
        setQuestion({
            ...question,
            bonneReponse: reponse,
        });
        setChoosen(reponse);
        state?.questions?.length >= 3 ? setFinish(true) : null;
    };

    const handleNext = async () => {
        const lastQ = await question;
        isEditing ?
            counter + 1 >= state.questions.length ? (state.questions.push(lastQ),
                setQuestion({}), setIsEditing(false)) : state.questions.splice(counter, 1, lastQ)
            : (state.questions.push(lastQ), setIsEditing(false),
                setQuestion({}))
        setChoosen(null);
        setFinish(null);
        setCounter(counter + 1)
    };


    const handleValidateQuiz = () => {
        question?.bonneReponse ? state?.questions?.push(question) : null;
        setQuestion({})
        state.title &&
            state.description &&
            state.about &&
            state.questions.length >= 4 &&
            state.user_id !== ""
            ?
            didUpdated ?
                axios
                    .put("http://localhost:8000/quiz/update", state)
                    .then((res) => {
                        alert("Votre quiz a bien été modifié ✅");
                        localStorage.removeItem("fromProfile")
                        localStorage.removeItem("selectedQuiz")
                        props.setAction('play')
                        window.location.reload()
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                :
                axios
                    .post("http://localhost:8000/quiz/create", state)
                    .then((res) => {
                        alert("Votre quiz a bien été créé ✅");
                        window.location.reload()
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            :
            alert(
                "Veuillez remplir tous les champs à propos du formulaire(à gauche)"
            );
    };
    return (
        <div className="pageContainer">
            <form className={Style.formulaire}>
                <h1 className={Style.formTitle}>{isEditing ? 'Modifiez' : 'Créer'} votre Quiz ✏️</h1>
                {isEditing ? <p>Re-cliquez sur "Créer votre quiz" pour en créer un nouveau</p> : null}
                <div className={Style.blocsContainer}>
                    <div className={Style.spanContainer}>
                        <span>
                            <label for="title">Titre du Quiz</label>
                            <input
                                value={state?.title}
                                className={Style.input}
                                onChange={(e) => setState({ ...state, title: e.target.value })}
                                type="text"
                                required
                            />
                        </span>

                        <span>
                            <label for="title">Sujet du Quiz</label>
                            <input
                                value={state?.about}
                                className={Style.input}
                                onChange={(e) => setState({ ...state, about: e.target.value })}
                                type="text"
                                required
                            />
                        </span>

                        <span>
                            <label for="title">Description</label>
                            <textarea
                                value={state?.description}
                                className={Style.descriptionInput}
                                onChange={(e) =>
                                    setState({ ...state, description: e.target.value })
                                }
                                type="textarea"
                                required
                            />
                        </span>
                    </div>
                    <span className={Style.line}></span>
                    <div className={Style.secondContainer}>
                        <p className={Style.formTitle}>
                            {counter + 1} questions renseignées sur un minimum
                            de 4
                        </p>
                        <span className={Style.question}>
                            <label for="title">Question</label>
                            <input
                                className={Style.input}
                                value={question?.question ? question?.question : ""}
                                onChange={(e) =>
                                    setQuestion({ ...question, question: e.target.value })
                                }
                                type="text"
                            />
                        </span>
                        <div className={Style.questionContainer}>
                            <span>
                                <label for="title">Réponse A</label>
                                <input
                                    value={question?.reponseA ? question.reponseA : ""}
                                    className={Style.input}
                                    onChange={(e) =>
                                        setQuestion({ ...question, reponseA: e.target.value })
                                    }
                                    type="text"
                                />
                            </span>
                            <span>
                                <label for="title">Réponse B</label>
                                <input
                                    value={question?.reponseB ? question.reponseB : ""}
                                    className={Style.input}
                                    onChange={(e) =>
                                        setQuestion({ ...question, reponseB: e.target.value })
                                    }
                                    type="text"
                                />
                            </span>
                            <span>
                                <label for="title">Réponse C</label>
                                <input
                                    value={question?.reponseC ? question.reponseC : ""}
                                    className={Style.input}
                                    onChange={(e) =>
                                        setQuestion({ ...question, reponseC: e.target.value })
                                    }
                                    type="text"
                                />
                            </span>
                            <span>
                                <label for="title">Réponse D</label>
                                <input
                                    value={question?.reponseD ? question.reponseD : ""}
                                    className={Style.input}
                                    onChange={(e) =>
                                        setQuestion({ ...question, reponseD: e.target.value })
                                    }
                                    type="text"
                                />
                            </span>
                        </div>
                        {isNotEmpty ? (
                            <span className={Style.reponseSelector}>
                                <h3>Quelle est la bonne réponse ?</h3>
                                {choosen === question.reponseA ? (
                                    <span className={Style.selected}>Réponse A</span>
                                ) : (
                                    <span
                                        className={Style.notSelected}
                                        onClick={() => {
                                            setChoosen(question.reponseA);
                                            handleCheckResponses(question.reponseA);
                                        }}
                                    >
                                        Réponse A
                                    </span>
                                )}
                                {choosen === question.reponseB ? (
                                    <span className={Style.selected}>Réponse B</span>
                                ) : (
                                    <span
                                        className={Style.notSelected}
                                        onClick={() => {
                                            handleCheckResponses(question.reponseB);
                                        }}
                                    >
                                        Réponse B
                                    </span>
                                )}
                                {choosen === question.reponseC ? (
                                    <span className={Style.selected}>Réponse C</span>
                                ) : (
                                    <span
                                        className={Style.notSelected}
                                        onClick={() => {
                                            handleCheckResponses(question.reponseC);
                                        }}
                                    >
                                        Réponse C
                                    </span>
                                )}

                                {choosen === question.reponseD ? (
                                    <span className={Style.selected}>Réponse D</span>
                                ) : (
                                    <span
                                        className={Style.notSelected}
                                        onClick={() => {
                                            handleCheckResponses(question.reponseD);
                                        }}
                                    >
                                        Réponse D
                                    </span>
                                )}
                            </span>
                        ) : null}
                        <div>
                            <div className={Style.validateButtonsContainer}>
                                {choosen ? (
                                    <span
                                        className={`onHover ${Style.next}`}
                                        onClick={() => {
                                            handleNext();
                                        }}
                                    >
                                        Ajouter la question au quiz
                                    </span>
                                ) : null}
                                {finish ? (
                                    <span
                                        onClick={() => {
                                            handleValidateQuiz();
                                        }}
                                        className={`onHover ${Style.next}`}
                                    >
                                        {isNotEmpty ? "Ajouter la question et" : null} {didUpdated ? "sauvegarder les modifications" : "creér le quiz"}
                                    </span>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
