const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema( {
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true, 
    index: true // Adds an index to userId
  },
  content: {
    type: String,
    required: true
  },
  images: [{
    type: String
  }]
}, {
  timestamps: true
});

const Journal = mongoose.model("Journal", journalSchema);

module.exports = Journal;