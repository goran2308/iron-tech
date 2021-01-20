const express = require('express');
const router = express.Router();
const message = require('../models/message');
const alert = require('alert');

/* POST AND SAVE THE MESSAGE */
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
  alert('Message sent!');
  res.redirect('/');
});

/* DELETE THE MESSAGE */
router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  message.findByIdAndRemove(id, (err, message) => {
    if (err) return res.status(500).json({
      'message': 'Error deleting the message!'
    });
  });
  res.redirect('/auth/private');
});

module.exports = router