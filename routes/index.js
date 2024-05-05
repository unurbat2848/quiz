var express = require('express');
const { restrict } = require("./middleware"); 
var router = express.Router();

/* GET home page. */
router.get('/', restrict, function(req, res, next) {
  res.render('dashboard', { title: 'Express' });
});

module.exports = router;
