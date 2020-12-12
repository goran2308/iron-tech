const express = require('express');
const router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');
const passport = require('passport');
const message = require('../models/message');

router.use(passport.initialize());
router.use(passport.session());

router.get('/private',
  connectEnsureLogin.ensureLoggedIn(),
  (req, res) => {
    message.find({}, (err, messages) => {
      if (err) {
        res.send(err);
      } else {
        res.render('../views/pages/private.ejs', {
          messages: messages
        });
      }
    });
  });

router.get('/user',
  connectEnsureLogin.ensureLoggedIn(),
  (req, res) => res.send({
    user: req.user
  })
);

router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/');
});

module.exports = router