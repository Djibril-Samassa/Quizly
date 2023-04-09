/*eslint-disable*/
import React, { useEffect, useTransition } from "react";
import Style from "./QuizList.module.css";
import { useState } from "react";
import QuizCard from "./QuizCard";
import axios from "axios";

export default function QuizList(props) {

  const [isFromProfil, setIsFromProfil] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    props.clear ? props.clear(false) : null
    props?.fromProfile ? setIsFromProfil(true) : setIsFromProfil(false)
  }, [])

  useEffect(() => {
    setLoading(false)
  }, [isFromProfil])


  return (
    <div className={Style.container}>
      <div className={Style.list}>
        {!loading ? props.list?.map((quiz) => {
          return <QuizCard isFromProfile={isFromProfil} setAction={props.setAction} quiz={quiz} />;
        }) : null}
      </div>
    </div>
  );
}
