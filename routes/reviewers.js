const express = require('express');
const router = express.Router();
const Reviewer = require('../models/Reviewer');

router.get('/', async (req, res) => {
    try {
      const reviewers = await Reviewer.find();
      res.json(reviewers);
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'Error retrieving reviewers. Please try again.' });
    }
  });

module.exports = router;