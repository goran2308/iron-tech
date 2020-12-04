const express = require('express');
const router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');

router.get('/', (req, res, next) => {
  connectEnsureLogin.ensureLoggedIn(),
    res.render('pages/index.ejs');
});

module.exports = router