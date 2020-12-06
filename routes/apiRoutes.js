const express = require('express');
const router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');
const message = require('../models/message');
//const passport = require('passport');

//router.use(passport.initialize());
//router.use(passport.session());

router.post('/', (req, res, next) => {
  const myMessage = new message({
    customer: req.body.customer,
    service: req.body.service,
    message: req.body.message
  });

  myMessage.save().then((data) => {
    res.send(data);
  }).catch((err) => {
    res.status(500).send({
      message: err.message
    });
  });

});

router.get('/', connectEnsureLogin.ensureLoggedIn(),
  (req, res, next) => {
    res.render('pages/api.ejs');
    /* Need to fetch the messages */
  });

module.exports = router