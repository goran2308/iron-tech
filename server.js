const express = require('express');
const app = express();

const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const expressSession = require('express-session')({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
});

const port = process.env.PORT || 1337;

/* MIDDLEWARES */
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(expressSession);
app.use(express.static(path.join(__dirname, '/public')));

app.set('view engine', 'ejs');

/* PASSPORT */
const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

/* ROUTES */
const connectEnsureLogin = require('connect-ensure-login');

app.get('/', (req, res, next) => {
  connectEnsureLogin.ensureLoggedIn(),
    res.render('pages/index.ejs');
});

app.post('/login', (req, res, next) => {
  passport.authenticate('local',
    (err, user, info) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.redirect('/login?info=' + info);
      }

      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }

        return res.redirect('/private');
      });

    })(req, res, next);
});

app.get('/login', (req, res) => {
  res.render('pages/login', {
    company: 'Iron-Tech',
    title: 'Login'
  });
});

app.get('/private',
  connectEnsureLogin.ensureLoggedIn(), (req, res) => {
    res.render('pages/private.ejs');
  });

app.get('/user',
  connectEnsureLogin.ensureLoggedIn(),
  (req, res) => res.send({
    user: req.user
  })
);

app.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/');
});

/* MONGOOSE SETUP */
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

mongoose.connect('mongodb://localhost/MyDatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Schema = mongoose.Schema;
const UserDetail = new Schema({
  username: String,
  password: String
});

UserDetail.plugin(passportLocalMongoose);
const UserDetails = mongoose.model('userInfo', UserDetail, 'userInfo');

/* PASSPORT LOCAL AUTHENTICATION */
passport.use(UserDetails.createStrategy());

passport.serializeUser(UserDetails.serializeUser());
passport.deserializeUser(UserDetails.deserializeUser());

/* REGISTER SOME USERS */

/* SERVER STARTING */
app.listen(port, () => {
  console.log(`Server started on ${port}`);
});