const { Router } = require("express");
const Quiz = require("../model/Quiz");
const QRCode = require('qrcode');
const { restrict } = require("./middleware");

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

router.get('/qrcode', async (req, res, next) => {
  try {
    const url = req.query.url || 'https://example.com';
    const qrCodeImage = await QRCode.toDataURL(url);
    res.render('quiz/qrcode', { title: 'Quiz QRCODE', qrcode: qrCodeImage });
  } catch (err) {
    console.error('Error generating QR code:', err);
    res.status(500).send('Internal Server Error');
  } s
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