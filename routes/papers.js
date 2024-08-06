const express = require('express');
const router = express.Router();
const Paper = require('../models/paper');
const Reviewer = require('../models/Reviewer');


router.post('/', async (req, res) => {
    if (!req.file) {
      return res.status(400).send({ message: 'No file uploaded' });
    }
  
    const paper = new Paper({
      title: req.body.title,
      abstract: req.body.abstract,
      keywords: req.body.keywords,
      fileUrl: `/uploads/${req.file.filename}`
    });
  
    try {
      await paper.save();
      res.status(201).send({ message: 'Paper submitted successfully!' });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'Error submitting paper. Please try again.' });
    }
  });
  
  router.get('/', async (req, res) => {
    try {
      const papers = await Paper.find().populate('reviewer');
      res.setHeader('Content-Type', 'application/json');
      res.json(papers);
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'Error retrieving papers. Please try again.' });
    }
  });

module.exports = router;