const { Router } = require("express");
const { restrict } = require("./middleware");
const Quiz = require("../model/Quiz");
const router = Router();

router.get("/create/:id", restrict, async (req, res) => {
    const _id = req.params.id;
    Quiz.findOne({ _id }).then(function (quiz) {
        res.render('questions/create', { title: 'Quiz', quiz: quiz });
    });
});

router.get("/:id", restrict, async (req, res) => {
    const _id = req.params.id;
    Quiz.findOne({ _id }).then(function (quiz) {
        res.render('questions/index', { title: 'Quiz', quiz: quiz });
    });
});

router.post("/create/:id", restrict, async (req, res) => {
    req.body.userId = req.session.user._id;
    const _id = req.params.id;
    var message = '';
    await Quiz.findOne({ _id }).then(function (quiz) {
        const optionList = [];
        req.body.option.forEach((element, index) => {
            const isCorrect = req.body.correctAnswer == index ? true : false;
            const option = {
                index: index,
                title: element,
                isCorrect: isCorrect
            }
            optionList.push(option);
        });

        var questionList = [];
        // assigning previous questions
        questionList = quiz.questions;

        questionList.push({
            title: req.body.title,
            description: req.body.description,
            correctAnswer: req.body.correctAnswer,
            options: optionList
        });
        quiz.questions = questionList;

        Quiz.findByIdAndUpdate(_id, quiz, { useFindAndModify: false }).then(data => {
            if (!data) {
                message = 'An error while creating quiz question';
            } else {
                message = 'Quiz question successfully created.';
            }
        }).catch(
            error => {
                message = error;
            })
        res.locals.message = message;
        res.redirect('/quiz');
    });
});

module.exports = router