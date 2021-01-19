const express = require('express');
const router = express.Router();
const passport = require('passport');

router.use(passport.initialize());
router.use(passport.session());

router.get('/', (req, res, next) => {
  res.render('pages/index.ejs');
});

router.get('/login', (req, res) => {
  res.render('pages/login.ejs', {
    company: 'Iron-Tech',
    title: 'Login'
  });
});

/* USER AUTHENTICATION TO THE DASHBOARD */
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

module.exports = router