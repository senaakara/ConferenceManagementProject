const mongoose = require('mongoose');

const reviewerSchema = new mongoose.Schema({
  name: String,
  expertise: [String],
  assignedPapers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Paper' }]
});

module.exports = mongoose.model('Reviewer', reviewerSchema);