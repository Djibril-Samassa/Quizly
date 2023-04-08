/*eslint-disable*/
import react, { useEffect, useState } from "react";
import Style from "./CreateQuiz.module.css";
import jwt_decode from "jwt-decode"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateQuiz() {
    const [decodedToken, setDecodedToken] = useState()
    const [test, setTest] = useState({})

    const [question, setQuestion] = useState({});
    const [state, setState] = useState({
        questions: [],
        user_id: null
    });
    const [choosen, setChoosen] = useState();
    const [finish, setFinish] = useState(false);
    const redirect = useNavigate();

    useEffect(() => {
        const decoded = jwt_decode(localStorage.token)
        setDecodedToken(decoded)
        const checkStorage = () => {
            const localQuiz = JSON.parse(localStorage.getItem('selectedQuiz'))
            setTest(localQuiz)
        }
        checkStorage()
    }, [])

    useEffect(() => {
        console.log(test)
    }, [test])

    useEffect(() => {
        setState({ ...state, user_id: decodedToken?.userId })
    }, [decodedToken])

    const handleCheckResponses = (reponse) => {
        setQuestion({
            ...question,
            bonneReponse: reponse,
        });
        setChoosen(reponse);
        state.questions.length >= 3 ? setFinish(true) : null;
    };

    const handleNext = async () => {
        const lastQ = await question;
        state.questions.push(lastQ);
        setQuestion({});
        setChoosen(null);
        setFinish(null);
    };

    const handleValidateQuiz = () => {
        state.questions.push(question);
        state.title &&
            state.description &&
            state.about &&
            state.questions.length >= 4 &&
            state.user_id !== null
            ? axios
                .post("http://localhost:8000/quiz/create", state)
                .then((res) => {
                    alert("Votre quiz a bien été créé ✅");
                    window.location.reload()
                })
                .catch((err) => {
                    console.log(err);
                })
            : alert(
                "Veuillez remplir tous les champs à propos du formulaire(à gauche)"
            );
    };
    return (
        <div className="pageContainer">
            <form className={Style.formulaire}>
                <h1 className={Style.formTitle}>Créer votre Quiz ✏️</h1>
                <div className={Style.blocsContainer}>
                    <div className={Style.spanContainer}>
                        <span>
                            <label for="title">Titre du Quiz</label>
                            <input
                                className={Style.input}
                                onChange={(e) => setState({ ...state, title: e.target.value })}
                                type="text"
                                required
                            />
                        </span>

                        <span>
                            <label for="title">Sujet du Quiz</label>
                            <input
                                className={Style.input}
                                onChange={(e) => setState({ ...state, about: e.target.value })}
                                type="text"
                                required
                            />
                        </span>

                        <span>
                            <label for="title">Description</label>
                            <textarea
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
                            {state?.questions?.length} questions renseignées sur un minimum
                            de 4
                        </p>
                        <span className={Style.question}>
                            <label for="title">Question</label>
                            <input
                                className={Style.input}
                                value={question.question ? question.question : ""}
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
                                    value={question.reponseA ? question.reponseA : ""}
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
                                    value={question.reponseB ? question.reponseB : ""}
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
                                    value={question.reponseC ? question.reponseC : ""}
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
                                    value={question.reponseD ? question.reponseD : ""}
                                    className={Style.input}
                                    onChange={(e) =>
                                        setQuestion({ ...question, reponseD: e.target.value })
                                    }
                                    type="text"
                                />
                            </span>
                        </div>
                        {question.question &&
                            question.reponseA &&
                            question.reponseB &&
                            question.reponseC &&
                            question.reponseD ? (
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
                                        Ajouter la question et terminer
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
