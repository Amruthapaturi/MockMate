const mongoose = require('mongoose');

const interviewHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  topic: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    required: true
  },
  questionsAttempted: {
    type: Number,
    required: true
  },
  correctAnswers: {
    type: Number,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  timeSpent: {
    type: Number,
    required: true
  },
  strengths: [{
    type: String
  }],
  improvements: [{
    type: String
  }]
});

module.exports = mongoose.model('InterviewHistory', interviewHistorySchema);
