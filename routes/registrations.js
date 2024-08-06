const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');

router.post('/', async (req, res) => {
    if (!req.body.name || !req.body.email) {
      return res.status(400).send({ message: 'Name and email are required' });
    }
  
    const registration = new Registration({
      name: req.body.name,
      email: req.body.email
    });
  
    try {
      await registration.save();
      res.status(201).send({ message: 'Registration successful!' });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'Error registering. Please try again.' });
    }
  });

module.exports = router;