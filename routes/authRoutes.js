const express = require('express');
const router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');
const passport = require('passport');

router.use(passport.initialize());
router.use(passport.session());

router.get('/private',
  connectEnsureLogin.ensureLoggedIn(), (req, res) => {
    res.render('pages/private.ejs');
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