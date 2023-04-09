/*eslint-disable*/
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
import Style from "./PlayQuiz.module.css";

export default function PlayQuiz() {
  // récuperer l'id du quiz qui a été sélectionné
  // condition qui verifie si le quiz en props est = a celui enregistrer en local
  const redirect = useNavigate();
  const [quiz, setQuiz] = useState()
  const quizLimit = quiz?.questions?.length - 1;
  const [counter, setCounter] = useState(0);
  const [niveau, setNiveau] = useState(quiz?.questions[counter]);
  const [finished, setFinished] = useState(false);
  const [selectedResponse, setSelectedResponse] = useState();
  const [isRunning, setIsRunning] = useState(false);
  const [goodResponse, setGoodResponse] = useState();
  const [score, setScore] = useState(0);

  useEffect(() => {
    const localQuiz = JSON.parse(localStorage.getItem('selectedQuiz'))
    setQuiz(localQuiz)
  }, [])

  useEffect(() => {
    setNiveau(quiz?.questions[counter]);
  }, [quiz, counter]);

  const checkResponse = async () => {
    selectedResponse === niveau?.bonneReponse
      ? setGoodResponse(true)
      : setGoodResponse(false);
    selectedResponse === niveau?.bonneReponse ? setScore(score + 1) : null;
    setTimeout(() => {
      incrementLevel();
    }, 1500);
  }

  const incrementLevel = () => {
    setSelectedResponse(null);
    setGoodResponse(undefined);
    counter < quizLimit ? setCounter(counter + 1) : setFinished(true);
  };

  return (
    <div className={Style.container}>
      {!isRunning ? (
        <div className={Style.infoContainer}>
          <h1>{quiz?.title}</h1>
          <p>{quiz?.about}</p>
          <h3>{quiz?.description}</h3>
          <div className={Style.buttonContainer}>
            <span
              className="onHover button"
              onClick={() => {
                setIsRunning(true);
              }}
            >
              Jouer au quiz
            </span>
            <span
              className="onHover button"
              onClick={() => {
                redirect("/quiz");
              }}
            >
              Revenir à la liste des quiz
            </span>
          </div>
        </div>
      ) : (
        <div>
          {!finished ? (
            <>
              <span>
                <h1>{quiz?.title}</h1>{" "}
                <p>
                  {counter + 1} / {quiz?.questions.length}
                </p>
              </span>
              <h3>{niveau?.question}</h3>
              <form>
                <nav>
                  <li>A : {niveau?.reponseA}</li>
                  <li>B : {niveau?.reponseB}</li>
                  <li>C : {niveau?.reponseC}</li>
                  <li>D : {niveau?.reponseD}</li>
                </nav>
                <span className={Style.reponseContainer}>
                  {/* REPONSE A */}
                  {selectedResponse === niveau?.reponseA ? (
                    <span
                      className={
                        selectedResponse === niveau?.reponseA && goodResponse
                          ? Style.good
                          : selectedResponse === niveau?.reponseA &&
                            goodResponse === false
                            ? Style.wrong
                            : Style.selected
                      }
                    >
                      Reponse A
                    </span>
                  ) : (
                    <span
                      onClick={() => {
                        setSelectedResponse(niveau?.reponseA);
                      }}
                      className={
                        niveau?.bonneReponse === niveau?.reponseA &&
                          goodResponse !== undefined
                          ? Style.good
                          : null
                      }
                    >
                      Reponse A
                    </span>
                  )}
                  {/* REPONSE B */}
                  {selectedResponse === niveau?.reponseB ? (
                    <span
                      className={
                        selectedResponse === niveau?.reponseB && goodResponse
                          ? Style.good
                          : selectedResponse === niveau?.reponseB &&
                            goodResponse === false
                            ? Style.wrong
                            : Style.selected
                      }
                    >
                      Reponse B
                    </span>
                  ) : (
                    <span
                      onClick={() => {
                        setSelectedResponse(niveau?.reponseB);
                      }}
                      className={
                        niveau?.bonneReponse === niveau?.reponseB &&
                          goodResponse !== undefined
                          ? Style.good
                          : null
                      }
                    >
                      Reponse B
                    </span>
                  )}
                  {/* REPONSE C */}
                  {selectedResponse === niveau?.reponseC ? (
                    <span
                      className={
                        selectedResponse === niveau?.reponseC && goodResponse
                          ? Style.good
                          : selectedResponse === niveau?.reponseC &&
                            goodResponse === false
                            ? Style.wrong
                            : Style.selected
                      }
                    >
                      Reponse C
                    </span>
                  ) : (
                    <span
                      onClick={() => {
                        setSelectedResponse(niveau?.reponseC);
                      }}
                      className={
                        niveau?.bonneReponse === niveau?.reponseC &&
                          goodResponse !== undefined
                          ? Style.good
                          : null
                      }
                    >
                      Reponse C
                    </span>
                  )}
                  {/* REPONSE D */}
                  {selectedResponse === niveau?.reponseD ? (
                    <span
                      className={
                        selectedResponse === niveau?.reponseD && goodResponse
                          ? Style.good
                          : selectedResponse === niveau?.reponseD &&
                            goodResponse === false
                            ? Style.wrong
                            : Style.selected
                      }
                    >
                      Reponse D
                    </span>
                  ) : (
                    <span
                      onClick={() => {
                        setSelectedResponse(niveau?.reponseD);
                      }}
                      className={
                        niveau?.bonneReponse === niveau?.reponseD &&
                          goodResponse !== undefined
                          ? Style.good
                          : null
                      }
                    >
                      Reponse D
                    </span>
                  )}
                </span>
                <span
                  className={`${Style.validate} button`}
                  type="button"
                  value="Valider"
                  onClick={() => checkResponse()}
                >
                  Valider la réponse
                </span>
              </form>
            </>
          ) : (
            <>
              <h1>Vous avez terminé le quiz "{quiz?.title}" ✅</h1>
              <p>
                Vous avez obtenu un score de {score}/{quiz?.questions.length}
              </p>
              <div className={Style.finishChoice}>
                <span className="button"><a href="/">Revenir à la page d'accueil</a></span>
                <span className="button"><a href="/quiz">Revenir aux quiz</a></span>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
