const express = require('express');
const router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');
const passport = require('passport');

router.use(passport.initialize());
router.use(passport.session());

router.get('/login', (req, res) => {
  res.render('pages/login.ejs', {
    company: 'Iron-Tech',
    title: 'Login'
  });
});

router.post('/login', (req, res, next) => {
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

        return res.redirect('/auth/private');
      });

    })(req, res, next);
});

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