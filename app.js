require("dotenv").config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
const { createServer } = require('node:http');
var cors = require('cors');
const app = express();
var cors = require('cors');
const server = createServer(app);
const { Server } = require('socket.io');
//const webSocket = require('ws').Server;
//const ws = new webSocket({httpServer: server, port: 8081})
const { studentController } = require('./controllers/student.controller');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var quizRouter = require('./routes/quiz');
var loginRouter = require('./routes/login');
var studentRouter = require('./routes/student');
var questionRouter = require('./routes/question');




const io = new Server(server, {
  cors: {
    origin: '*',
  }
});
io.on('connection', (socket) => {

  socket.isAlive = true;
  socket.on('pong', () => {
    socket.isAlive = true;
  })
  socket.on('message', (data) => {
    studentController(io, socket, data)
  })

  socket.on('start_quiz', (data) => {
    // pass to all users
    console.log(data);
    io.emit('start_quiz', data);
  })

  socket.on('login', (data) => {
    loginController(io, socket, data)
  })
  socket.on('close', () => {
    console.log("I lost a client");

  });


  console.log("One more client connected");
});




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'shhhh, very secret'
}));


app.use(cors());
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
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/dist', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/quiz', quizRouter);
app.use('/login', loginRouter);
app.use('/student', studentRouter);
app.use('/questions', questionRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

server.listen(3000, () => {
  console.log('web socket server running at http://localhost:3000');
});

module.exports = app;