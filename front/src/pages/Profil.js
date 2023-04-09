/*eslint-disable*/
import React from "react";
import QuizList from "../composants/QuizList";
import jwt_decode from "jwt-decode"
import Inscription from "../composants/Inscription";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Profil() {

    const [user, setUser] = useState({})
    const [quizList, setQuizList] = useState()
    const [allFileds, setAllFields] = useState(false)
    const [passwordDoesNotMatch, setPasswordDoesNotMatch] = useState(false)
    const [edit, setEdit] = useState(false)
    const [confirmPw, setConfirmPw] = useState('')
    const [userData, setUserData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        username: '',
        password: ''
    });

    useEffect(() => {
        setUserData({
            ...userData,
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
            email: user.email
        })
    }, [])

    useEffect(() => {
        userData.firstname && userData.lastname && userData.username && userData.email && userData.password && confirmPw ?
            setAllFields(true) : null
        userData.firstname && userData.lastname && userData.username && userData.email && userData.password && confirmPw ?
            userData.password !== confirmPw ? setPasswordDoesNotMatch(true) : setPasswordDoesNotMatch(false) : null
    }, [userData, confirmPw])

    useEffect(() => {
        const decoded = jwt_decode(localStorage.token)
        setUser(decoded)
        setUserData({
            ...userData,
            firstname: decoded.firstname,
            lastname: decoded.lastname,
            username: decoded.username,
            email: decoded.email,
            password: decoded.password
        })
        setConfirmPw(decoded.password)
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

    const validateEdit = () => {
        event.preventDefault()
        alert('validate')
    }

    const CancelEdit = () => {
        setEdit(false)
        const decoded = jwt_decode(localStorage.token)
        setUser(decoded)
        setUserData({
            ...userData,
            firstname: decoded.firstname,
            lastname: decoded.lastname,
            username: decoded.username,
            email: decoded.email,
            password: decoded.password
        })
        setAllFields(false)
        setPasswordDoesNotMatch(false)
    }

    return (< div style={{ margin: "0em 5em", minHeight: '100vh' }}>
        <h1>
            Bienvenue sur votre profil {user.username} !
        </h1>
        <br />
        <h3>Votre profil</h3>
        <div>
            {!edit ?
                <>
                    <p>Prénom: {user.firstname}</p>
                    <p>Nom: {user.lastname}</p>
                    <p>Adresse e-mail: {user.email}</p>
                    <p>Nom d'utilisateur: {user.username}</p>
                </> : <>
                    <form onSubmit={() => { validateEdit() }}>
                        <label for="firstname">Prénom</label>
                        <input value={userData.firstname} type="text" onChange={(e) => { setUserData({ ...userData, firstname: e.target.value }) }} />
                        <label for="firstname">Nom</label>
                        <input value={userData.lastname} type="text" onChange={(e) => { setUserData({ ...userData, lastname: e.target.value }) }} />
                        <label for="firstname">Nom d'utilisateur</label>
                        <input value={userData.username} type="text" onChange={(e) => { setUserData({ ...userData, username: e.target.value }) }} />
                        <label for="firstname">Email</label>
                        <input value={userData.email} type="email" onChange={(e) => { setUserData({ ...userData, email: e.target.value }) }} />
                        <label for="firstname">Mot de passe</label>
                        <input value={userData.password} type="password" onChange={(e) => { setUserData({ ...userData, password: e.target.value }) }} />
                        <label for="firstname">Confirmer le mot de passe</label>
                        <input value={confirmPw} type="password" onChange={(e) => { setConfirmPw(e.target.value) }} />
                        <br />
                        {allFileds ? <button type="submit" disabled={passwordDoesNotMatch} >Valider les modification</button> : null}
                    </form>
                    {passwordDoesNotMatch ? <p>Les Mots de passe ne correspondent pas</p> : null}</>
            }
            <br />
            {edit ? <span onClick={() => { CancelEdit() }} className="edit">Annuler les modifications</span> : <span onClick={() => { setEdit(true) }} className="edit">Modifier votre profil</span>}
        </div>
        <br />
        <br />
        <div>
            <h3>Vos Quiz</h3>
            {quizList?.length >= 1 ? <QuizList list={quizList} fromProfile={true} /> : <h3>Vous n'avez pas encore crée de quiz <a href="/quiz">Créez en un maintenant</a> </h3>}

        </div>
    </div>)
}