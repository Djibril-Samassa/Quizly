const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const app = express();
const User = require("./models/inscriptionModel");
const Quiz = require("./models/QuizModel");
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.static("public"));
const secret = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'

mongoose
    .connect(

        "mongodb+srv://dsamassa2023:04mZI7LyrhbA9PgP@cluster0.grh8rj8.mongodb.net/test",
        {
            useNewUrlParser: true,
        }
    )
    .then(() => console.log("connexion à la base de données => OK"));


/* S'INSCRIRE*/
app.post("/inscription", async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    try {
        await User.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            username: req.body.username,
            password: hashedPassword,
        });
    } catch (err) {
        return res.status(400).json({
            message: "An error happened. Bad data received.",
        });
    }
    res.status(201).json({
        message: "User crée",
    });
});

/*SE CONNECTER*/
app.post("/connexion", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(401).json({
                message: "adresse email ou mot de passe invalide",
            });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "adresse email ou mot de passe invalide",
            });
        }

        const token = jwt.sign({
            userId: user._id,
            username: user.username,
            email: user.email,
            roles: user.roles,
            permissions: user.permissions
        }, secret, { expiresIn: '5h' });
        res.cookie("jwt", token, { httpOnly: true, secure: false });
        res.send(token);
    } catch (err) {
        return res.status(400).json({
            message: "An error happened. Bad data received.",
        });
    }
});

app.get('/api/checkToken', (req, res) => {
    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, secret, (err, decodedToken) => {
        if (err) {
            res.sendStatus(401);
        } else {
            res.sendStatus(200);
        }
    });
});



/*SE DECONNECTER*/
app.get("/logout", async (req, res) => {
    res.clearCookie("jwt");
    res.json({
        success: true,
        message: "You are Logout",
    });
});

/*CREER UN QUIZ*/
app.post("/quiz/create", (req, res) => {
    try {
        Quiz.create({
            title: req.body.title,
            about: req.body.about,
            description: req.body.description,
            questions: req.body.questions,
            creator_id: req.body.user_id
        });
    } catch (err) {
        return res.status(400).json({
            message: "Erreur, le quiz n'a pas été enregistré",
        });
    }
    res.status(201).json({
        message: "Quiz crée",
    });
});

/*MODIFIER UN QUIZ*/
app.post("/quiz/edit", (req, res) => {
    Quiz.findOneAndUpdate(
        { _id: req.body.quizId }, // Critères de recherche (dans cet exemple, l'ID du quiz)
        {
            title: req.body.title,
            about: req.body.about,
            description: req.body.description,
            questions: req.body.questions,
        }, // Nouvelles données à mettre à jour
        { new: true } // Options de la requête (dans cet exemple, retourner le document mis à jour)
    ).then((updatedQuiz) => {
    }).catch((error) => {
        console.log("Une erreur s'est produite :", error);
    });
});


/*RECUPERER LISTE DE QUIZ*/
app.get("/quiz", (req, res) => {
    try {
        Quiz.find().then((list) => {
            res.send(list);
        });
    } catch (err) {
        return res.status(400).json({
            message: "Didnt get list",
        });
    }
});

/* SUPPRIMER UN QUIZ */
app.get('/quiz/delete/:quizId', async (req, res) => {
    try {
        await Quiz.deleteOne({ _id: req.params.quizId });
        res.status(201).json({ message: 'Quiz supprimé' });
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
})

/*RECUPERER LISTE DE QUIZ CREE PAR L'UTILISATEUR*/
app.get('/quiz/:userId', async (req, res) => {
    try {
        const quizzes = await Quiz.find({ creator_id: req.params.userId });
        res.send(quizzes)
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});


app.listen(8000, () => {
    console.log("connexion au serveur => OK");
});
