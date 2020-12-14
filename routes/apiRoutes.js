const express = require('express');
const router = express.Router();
const message = require('../models/message');

router.post('/', (req, res, next) => {
  const myMessage = new message({
    customer: req.body.customer,
    contact: req.body.contact,
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
  res.redirect('/'); /* Build success page form submitted */
});

module.exports = router