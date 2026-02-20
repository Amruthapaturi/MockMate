const express = require('express');
const router = express.Router();
const InterviewHistory = require('../models/InterviewHistory');

// Get user's interview history
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const history = await InterviewHistory.find({ userId })
      .sort({ date: -1 })
      .limit(20);
    res.json({ success: true, history });
  } catch (error) {
    console.error('Get history error:', error);
    res.json({ success: false, error: 'Failed to fetch history' });
  }
});

// Add interview result to history
router.post('/', async (req, res) => {
  try {
    const { userId, topic, difficulty, questionsAttempted, correctAnswers, score, timeSpent, strengths, improvements } = req.body;
    
    const historyEntry = new InterviewHistory({
      userId,
      topic,
      difficulty,
      questionsAttempted,
      correctAnswers,
      score,
      timeSpent,
      strengths,
      improvements
    });
    
    await historyEntry.save();
    res.json({ success: true, id: historyEntry._id });
  } catch (error) {
    console.error('Add history error:', error);
    res.json({ success: false, error: 'Failed to save history' });
  }
});

// Get user statistics
router.get('/stats/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const history = await InterviewHistory.find({ userId });
    
    const totalInterviews = history.length;
    const totalQuestions = history.reduce((sum, h) => sum + h.questionsAttempted, 0);
    const totalCorrect = history.reduce((sum, h) => sum + h.correctAnswers, 0);
    const avgScore = totalInterviews > 0 ? history.reduce((sum, h) => sum + h.score, 0) / totalInterviews : 0;
    const totalTime = history.reduce((sum, h) => sum + h.timeSpent, 0);
    
    // Topic breakdown
    const topicStats = {};
    history.forEach(h => {
      if (!topicStats[h.topic]) {
        topicStats[h.topic] = { count: 0, totalScore: 0 };
      }
      topicStats[h.topic].count++;
      topicStats[h.topic].totalScore += h.score;
    });
    
    res.json({
      success: true,
      stats: {
        totalInterviews,
        totalQuestions,
        totalCorrect,
        avgScore: Math.round(avgScore),
        totalTime,
        topicStats
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.json({ success: false, error: 'Failed to fetch stats' });
  }
});

module.exports = router;
