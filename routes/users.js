require("dotenv").config();
var express = require('express');
var router = express.Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET = "secret" } = process.env;
const { restrict } = require("./middleware");


router.post("/create", async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const user = await User.create(req.body);
    res.redirect('/');
  } catch (error) {
    res.redirect('back');
  }
});

router.put("/:id", restrict, async (req, res) => {
  const { username } = req.session.user.username;
  req.body.username = username;
  const _id = req.params.id;
  res.json(
    await user.updateOne({ username, _id }, req.body, { new: true }).catch(
      (error) => res.status(400).json({ error })
    )
  );
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const result = await bcrypt.compare(req.body.password, user.password);
      if (result) {
        const token = await jwt.sign({ email: user.email }, SECRET);
        req.session.regenerate(function () {
          req.session.user = user;
          req.session.error = '';
          res.redirect('/');
        });

      } else {
        //res.status(400).json({ error: "password doesn't match" });
        req.session.error = "password doesn't match";
        res.redirect('/login');
      }
    } else {
      //res.status(400).json({ error: "User doesn't exist" });
      req.session.error = "User doesn't exist";
      res.redirect('/login');
    }
  } catch (error) {
    //res.status(400).json({ error });
    req.session.error = error;
    res.redirect('/login');
  }
});


router.get('/', function (req, res, next) {
  User.find({}).then(function (users) {
    res.render('user/index', { title: 'Users', users: users });
  });

});

router.get('/create', function (req, res, next) {
  res.render('user/create', { title: 'Users' });
});

router.get('/:id', function (req, res, next) {
  User.findOne({ _id: req.params.id }).then(function (user) {
    res.render('user/update', { title: 'Users', user: user });
  });
});


module.exports = router;
