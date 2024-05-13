"use strict";

require("dotenv").config();

var createError = require('http-errors');

var express = require('express');

var path = require('path');

var cookieParser = require('cookie-parser');

var logger = require('morgan');

var session = require('express-session');

var http = require('http');

var studentController = require('./controllers/student.controller');

var indexRouter = require('./routes/index');

var usersRouter = require('./routes/users');

var quizRouter = require('./routes/quiz');

var loginRouter = require('./routes/login');

var studentRouter = require('./routes/student');

var questionRouter = require('./routes/question');

var app = express();
var server = http.createServer(app);

var WebSocket = require('ws').Server;

var ws = new WebSocket({
  port: 8081
}); // view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(session({
  resave: false,
  // don't save session if unmodified
  saveUninitialized: false,
  // don't create session until something stored
  secret: 'shhhh, very secret'
}));
app.use(function (req, res, next) {
  var err = req.session.error;
  var msg = req.session.success;
  delete req.session.error;
  delete req.session.success;
  res.locals.message = '';
  if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
  if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
  next();
});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express["static"](path.join(__dirname, 'public')));
app.use('/dist', express["static"](__dirname + '/node_modules/bootstrap/dist'));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/quiz', quizRouter);
app.use('/login', loginRouter);
app.use('/student', studentRouter);
app.use('/questions', questionRouter); // catch 404 and forward to error handler

app.use(function (req, res, next) {
  next(createError(404));
}); // error handler

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // render the error page

  res.status(err.status || 500);
  res.render('error');
});
ws.on('connection', function _callee2(socket) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          socket.isAlive = true;
          socket.on('pong', function () {
            socket.isAlive = true;
          });
          socket.on('message', function _callee(message) {
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    studentController(ws, socket, message);

                  case 1:
                  case "end":
                    return _context.stop();
                }
              }
            });
          });
          socket.on('close', function () {
            console.log("I lost a client");
          });
          console.log("One more client connected");

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
});
/*
setInterval(() => {
  ws.clients.forEach((ws) => {
    if (!ws.isAlive) return ws.terminate();
    ws.isAlive = false;
    ws.ping(null, false, true);
  });
}, 10000);
*/

server.listen(Number(2500), function () {
  console.log("Server started on port ".concat(JSON.stringify({
    server: server
  })));
});
module.exports = app;