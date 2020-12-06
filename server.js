const express = require('express');
const app = express();

const cors = require('cors');
require('dotenv').config();
const morgan = require('morgan');
const path = require('path');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const expressSession = require('express-session')({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
});

const port = process.env.PORT;


/* MIDDLEWARES */
app.use(cors());
app.use(morgan('dev'));
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(expressSession);
app.use(express.static(path.join(__dirname, '/public')));

app.set('view engine', 'ejs');


/* ROUTES */
const appRoutes = require('./routes/appRoutes');
const authRoutes = require('./routes/authRoutes');
const apiRoutes = require('./routes/apiRoutes');
app.use('/', appRoutes);
app.use('/auth', authRoutes);
app.use('/auth/api', apiRoutes);


/* PASSPORT */
const passport = require('passport');


/* MONGOOSE SETUP */
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});


/* MODELS */
const admin = require('./models/user.js');


/* PASSPORT LOCAL AUTHENTICATION */
passport.use(admin.createStrategy());
passport.serializeUser(admin.serializeUser());
passport.deserializeUser(admin.deserializeUser());


/* REGISTER SOME USERS */
// admin.register({
//   username: 'goran',
//   active: false
// }, 'goran');


/* SERVER STARTING */
app.listen(port, () => {
  console.log(`Server started on ${port}`);
});