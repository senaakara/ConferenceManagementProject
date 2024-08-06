

const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));



const paperSchema = new mongoose.Schema({
  title: String,
  abstract: String,
  keywords: [String],
  fileUrl: String,
  reviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'Reviewer' }
});

module.exports = mongoose.model('Paper', paperSchema);      