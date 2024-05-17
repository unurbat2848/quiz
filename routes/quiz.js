const { Router } = require("express");
const Quiz = require("../model/Quiz");
const Result = require("../model/Result");
const QRCode = require('qrcode');
const { restrict } = require("./middleware");
require("dotenv").config()
const router = Router();

router.get("/", restrict, async (req, res) => {
  const { username } = req.session.user.username;
  Quiz.find({}).then(function (quizList) {
    res.render('quiz/index', { title: 'Quiz', quizList: quizList });
  });
});

router.get('/create', function (req, res, next) {
  res.render('quiz/create', { title: 'Quiz' });
});


router.get('/leaderboard/:id', async function (req, res, next) {
  const _id = req.params.id;
  const quiz_result = await Result.aggregate([
    {
      $match: { quizId: _id }
    },
   {
      $group: { _id: '$student.id', username:{$first: "$student.username"},  total_correct: { $sum: 1 } }
    },
    { $sort : { total_correct : -1 } }
  ]);
  console.log(quiz_result);
  res.render('quiz/leaderBoard', { title: 'Quiz', quiz_result: quiz_result });
});


router.get('/qrcode/:id', async (req, res, next) => {

  const _id = req.params.id;

  await Quiz.findOne({ _id }).select(['-createdAt', '-updatedAt']).then(data => {
    const url = process.env.FRONTEND_URL + '?code=' + data.code;
    QRCode.toDataURL(url).then(image => {
      res.render('quiz/qrcode', { title: 'Quiz QRCODE', qrcode: image, quiz: JSON.stringify(data, null, '\t') });
    });


  }).catch((error) =>
    res.status(400).json({ error })
  )

});

router.get("/:id", restrict, async (req, res) => {
  const { username } = req.session.user.username;
  const _id = req.params.id;
  await Quiz.findOne({ _id }).then(data => {
    res.render('quiz/update', { title: 'Quiz', quiz: data });
  }).catch((error) =>
    res.status(400).json({ error })
  )

});

router.post("/create", restrict, async (req, res) => {
  req.body.userId = req.session.user._id;
  // generate random quiz code 
  req.body.code = (Math.random() + 1).toString(36).substring(7);

  await Quiz.create(req.body).then(data => {
    if (!data) {
      message = 'An error while creating quiz';
    } else {
      message = 'Quiz successfully created.';
    }
  }).catch(
    error => {
      message = error;
    })
  res.locals.message = message;
  res.redirect('/quiz');
});

router.post("/update/:id", restrict, async (req, res) => {
  const _id = req.params.id;
  await Quiz.findByIdAndUpdate(_id, req.body, { useFindAndModify: false }).then(data => {
    if (!data) {
      message = 'Quiz not found';
    } else {
      message = 'Quiz updated successfully.';
    }
  }).catch(
    error => {
      message = error;
    })
  res.locals.message = message;
  res.redirect('/quiz');
});

router.delete("/:id", restrict, async (req, res) => {
  const { username } = req.session.user.username;
  const _id = req.params.id;
  var message = '';
  await Quiz.remove({ _id }).catch((error) => {
    message = error;
  });
  res.locals.message = message;
  res.redirect('/quiz');
});

module.exports = router