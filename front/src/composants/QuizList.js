/*eslint-disable*/
import React, { useEffect } from "react";
import Style from "./QuizList.module.css";
import { useState } from "react";
import QuizCard from "./QuizCard";
import axios from "axios";

export default function QuizList(props) {

  useEffect(()=>{
    props.clear(false)
  },[])

  return (
    <div className={Style.container}>
      <div className={Style.list}>
        {props.list?.map((quiz) => {
          return <QuizCard setAction={props.setAction} quiz={quiz} onClick={() => { alert("lancer Quiz") }} />;
        })}
      </div>
    </div>
  );
}
