const express = require('express');
const router = express.Router();
const { generateQuestion, clearSession, getSessionQuestionCount } = require('../data/questionGenerator');
const { evaluateAnswer } = require('../utils/evaluator');

const sessions = {};

router.post('/start', (req, res) => {
  const { userId, topic, difficulty } = req.body;
  const sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
  
  // Generate first question dynamically
  const firstQuestion = generateQuestion(sessionId, topic, difficulty);
  
  if (!firstQuestion) {
    return res.json({ success: false, error: 'Failed to generate question for this topic' });
  }
  
  sessions[sessionId] = {
    userId,
    topic,
    currentDifficulty: difficulty,
    currentQuestion: firstQuestion,
    answers: [],
    scores: [],
    questionHistory: [firstQuestion],
    startTime: Date.now(),
  };
  
  res.json({
    success: true,
    sessionId,
    question: { 
      id: firstQuestion.id, 
      text: firstQuestion.text, 
      topic, 
      difficulty: firstQuestion.difficulty 
    },
  });
});

router.get('/question/:sessionId', (req, res) => {
  const session = sessions[req.params.sessionId];
  if (!session) {
    return res.json({ success: false, error: 'Session not found' });
  }
  
  // Generate a new unique question dynamically
  const question = generateQuestion(req.params.sessionId, session.topic, session.currentDifficulty);
  
  if (!question) {
    return res.json({ success: false, error: 'No more unique questions available for this topic' });
  }
  
  session.currentQuestion = question;
  session.questionHistory.push(question);
  
  res.json({ 
    success: true, 
    question: { 
      id: question.id, 
      text: question.text, 
      topic: session.topic, 
      difficulty: question.difficulty 
    } 
  });
});

router.post('/answer', (req, res) => {
  const { sessionId, questionId, answer } = req.body;
  const session = sessions[sessionId];
  
  if (!session) {
    return res.json({ success: false, error: 'Session not found' });
  }
  
  // Find the question from history
  const question = session.questionHistory.find(q => q.id === questionId);
  if (!question) {
    return res.json({ success: false, error: 'Question not found' });
  }
  
  const result = evaluateAnswer(answer, question);
  session.answers.push({ 
    questionId, 
    questionText: question.text,
    answer, 
    score: result.score,
    difficulty: question.difficulty 
  });
  session.scores.push(result.score);
  
  // Adaptive difficulty adjustment
  if (result.score >= 70 && session.currentDifficulty !== 'hard') {
    session.currentDifficulty = session.currentDifficulty === 'easy' ? 'medium' : 'hard';
  } else if (result.score < 40 && session.currentDifficulty !== 'easy') {
    session.currentDifficulty = session.currentDifficulty === 'hard' ? 'medium' : 'easy';
  }
  
  res.json({ 
    success: true, 
    result: { 
      ...result, 
      nextDifficulty: session.currentDifficulty,
      questionsAnswered: session.scores.length
    } 
  });
});

router.post('/end/:sessionId', (req, res) => {
  const session = sessions[req.params.sessionId];
  if (!session) {
    return res.json({ success: false, error: 'Session not found' });
  }
  
  const totalScore = session.scores.length > 0 
    ? Math.round(session.scores.reduce((a, b) => a + b, 0) / session.scores.length)
    : 0;
  
  const correctAnswers = session.scores.filter(s => s >= 70).length;
  const totalQuestions = session.scores.length;
  const timeTaken = Math.round((Date.now() - session.startTime) / 1000); // in seconds
  
  // Analyze performance by difficulty
  const performanceByDifficulty = {
    easy: { count: 0, totalScore: 0 },
    medium: { count: 0, totalScore: 0 },
    hard: { count: 0, totalScore: 0 }
  };
  
  session.answers.forEach(a => {
    if (performanceByDifficulty[a.difficulty]) {
      performanceByDifficulty[a.difficulty].count++;
      performanceByDifficulty[a.difficulty].totalScore += a.score;
    }
  });
  
  const strengths = [];
  const improvements = [];
  
  // Generate meaningful feedback
  if (totalScore >= 70) strengths.push('Strong conceptual understanding');
  if (totalScore >= 80) strengths.push('Excellent command of technical terminology');
  if (performanceByDifficulty.hard.count > 0 && 
      performanceByDifficulty.hard.totalScore / performanceByDifficulty.hard.count >= 60) {
    strengths.push('Good performance on challenging questions');
  }
  if (correctAnswers >= totalQuestions * 0.6) strengths.push('Consistent accuracy across questions');
  if (session.answers.length >= 10) strengths.push('Good interview stamina');
  
  if (totalScore < 50) improvements.push('Review core concepts and fundamentals');
  if (totalScore < 70 && totalScore >= 50) improvements.push('Deepen understanding of key concepts');
  if (performanceByDifficulty.easy.count > 0 && 
      performanceByDifficulty.easy.totalScore / performanceByDifficulty.easy.count < 60) {
    improvements.push('Focus on building foundation with basic concepts');
  }
  if (session.scores.filter(s => s < 40).length > 2) improvements.push('Practice explaining concepts clearly');
  if (correctAnswers < totalQuestions * 0.4) improvements.push('Work on technical vocabulary and key terms');
  
  // Clean up session data
  clearSession(req.params.sessionId);
  delete sessions[req.params.sessionId];
  
  res.json({
    success: true,
    summary: { 
      overallScore: totalScore, 
      correctAnswers,
      totalQuestions,
      timeTaken,
      topic: session.topic,
      strengths: strengths.length > 0 ? strengths : ['Keep practicing to identify your strengths'],
      improvements: improvements.length > 0 ? improvements : ['Continue practicing to maintain your skills'],
      performanceByDifficulty
    },
  });
});

module.exports = router;
