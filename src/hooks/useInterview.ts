import { useState } from 'react';
import { storage, InterviewResult } from '@/services/storage';
import { api } from '@/services/api';
import { generateQuestion, evaluateAnswer, clearSession, GeneratedQuestion } from '@/lib/questionGenerator';

interface Question {
  id: string;
  text: string;
  topic: string;
  difficulty: string;
}

interface AnswerResult {
  score: number;
  feedback: string;
  keywordsMatched: string[];
  keywordsMissed: string[];
  nextDifficulty: string;
}

export function useInterview() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [currentQuestionData, setCurrentQuestionData] = useState<GeneratedQuestion | null>(null);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [lastResult, setLastResult] = useState<AnswerResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [scores, setScores] = useState<number[]>([]);

  const startInterview = async (userId: string, selectedTopic: string, selectedDifficulty: string) => {
    setIsLoading(true);
    try {
      const newSessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
      const firstQuestion = generateQuestion(newSessionId, selectedTopic, selectedDifficulty);
      
      if (!firstQuestion) {
        return { success: false, error: 'Failed to generate question for this topic' };
      }
      
      setSessionId(newSessionId);
      setCurrentQuestion({
        id: firstQuestion.id,
        text: firstQuestion.text,
        topic: selectedTopic,
        difficulty: firstQuestion.difficulty
      });
      setCurrentQuestionData(firstQuestion);
      setTopic(selectedTopic);
      setDifficulty(selectedDifficulty);
      setQuestionsAnswered(0);
      setTotalScore(0);
      setScores([]);
      setLastResult(null);
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to start interview' };
    } finally {
      setIsLoading(false);
    }
  };

  const submitAnswer = async (answer: string) => {
    if (!sessionId || !currentQuestionData) return { success: false };
    
    setIsLoading(true);
    try {
      const result = evaluateAnswer(answer, currentQuestionData);
      const newScores = [...scores, result.score];
      setScores(newScores);
      
      // Adaptive difficulty adjustment
      let nextDifficulty = difficulty;
      if (result.score >= 70 && difficulty !== 'hard') {
        nextDifficulty = difficulty === 'easy' ? 'medium' : 'hard';
      } else if (result.score < 40 && difficulty !== 'easy') {
        nextDifficulty = difficulty === 'hard' ? 'medium' : 'easy';
      }
      
      const answerResult: AnswerResult = {
        ...result,
        nextDifficulty
      };
      
      setLastResult(answerResult);
      setQuestionsAnswered((prev) => prev + 1);
      setTotalScore((prev) => prev + result.score);
      setDifficulty(nextDifficulty);
      return { success: true, result: answerResult };
    } catch (error) {
      return { success: false, error: 'Failed to evaluate answer' };
    } finally {
      setIsLoading(false);
    }
  };

  const getNextQuestion = async () => {
    if (!sessionId) return { success: false };
    
    setIsLoading(true);
    try {
      const question = generateQuestion(sessionId, topic, difficulty);
      
      if (!question) {
        return { success: false, error: 'No more unique questions available' };
      }
      
      setCurrentQuestion({
        id: question.id,
        text: question.text,
        topic,
        difficulty: question.difficulty
      });
      setCurrentQuestionData(question);
      setLastResult(null);
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to get next question' };
    } finally {
      setIsLoading(false);
    }
  };

  const endInterview = async (timeSpent: number) => {
    if (!sessionId) return null;
    
    setIsLoading(true);
    try {
      const avgScore = scores.length > 0 
        ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
        : 0;
      
      const correctAnswers = scores.filter(s => s >= 70).length;
      
      const strengths: string[] = [];
      const improvements: string[] = [];
      
      if (avgScore >= 70) strengths.push('Strong conceptual understanding');
      if (avgScore >= 80) strengths.push('Excellent command of technical terminology');
      if (correctAnswers >= scores.length * 0.6) strengths.push('Consistent accuracy across questions');
      if (scores.length >= 10) strengths.push('Good interview stamina');
      
      if (avgScore < 50) improvements.push('Review core concepts and fundamentals');
      if (avgScore < 70 && avgScore >= 50) improvements.push('Deepen understanding of key concepts');
      if (scores.filter(s => s < 40).length > 2) improvements.push('Practice explaining concepts clearly');
      if (correctAnswers < scores.length * 0.4) improvements.push('Work on technical vocabulary and key terms');
      
      const result: InterviewResult = {
        id: sessionId,
        date: new Date().toISOString(),
        topic,
        difficulty,
        questionsAttempted: questionsAnswered,
        correctAnswers,
        score: avgScore,
        timeSpent,
        strengths: strengths.length > 0 ? strengths : ['Keep practicing to identify your strengths'],
        improvements: improvements.length > 0 ? improvements : ['Continue practicing to maintain your skills'],
      };
      
      // Save to localStorage as backup
      storage.addToHistory(result);
      
      // Save to MongoDB
      const user = storage.getUser();
      if (user) {
        try {
          await api.addHistory({
            userId: user.id,
            topic,
            difficulty,
            questionsAttempted: questionsAnswered,
            correctAnswers,
            score: avgScore,
            timeSpent,
            strengths: result.strengths,
            improvements: result.improvements,
          });
        } catch (err) {
          console.error('Failed to save history to MongoDB:', err);
        }
      }
      
      clearSession(sessionId);
      return result;
    } catch (error) {
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    sessionId,
    currentQuestion,
    questionsAnswered,
    totalScore,
    lastResult,
    isLoading,
    topic,
    difficulty,
    startInterview,
    submitAnswer,
    getNextQuestion,
    endInterview,
  };
}
