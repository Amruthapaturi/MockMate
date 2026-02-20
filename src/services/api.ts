const API_BASE_URL = 'http://localhost:5000/api';

export interface InterviewHistoryItem {
  _id: string;
  userId: string;
  date: string;
  topic: string;
  difficulty: string;
  questionsAttempted: number;
  correctAnswers: number;
  score: number;
  timeSpent: number;
  strengths: string[];
  improvements: string[];
}

export interface UserStats {
  totalInterviews: number;
  totalQuestions: number;
  totalCorrect: number;
  avgScore: number;
  totalTime: number;
  topicStats: Record<string, { count: number; totalScore: number }>;
}

export interface UserProfile {
  _id: string;
  username: string;
  createdAt: string;
  lastLogin: string;
}

export const api = {
  // Auth endpoints
  async register(username: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    return response.json();
  },

  async login(username: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    return response.json();
  },

  // Interview endpoints
  async startInterview(userId: string, topic: string, difficulty: string) {
    const response = await fetch(`${API_BASE_URL}/interview/start`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, topic, difficulty }),
    });
    return response.json();
  },

  async getNextQuestion(sessionId: string) {
    const response = await fetch(`${API_BASE_URL}/interview/question/${sessionId}`);
    return response.json();
  },

  async submitAnswer(sessionId: string, questionId: string, answer: string) {
    const response = await fetch(`${API_BASE_URL}/interview/answer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, questionId, answer }),
    });
    return response.json();
  },

  async endInterview(sessionId: string) {
    const response = await fetch(`${API_BASE_URL}/interview/end/${sessionId}`, {
      method: 'POST',
    });
    return response.json();
  },

  // History endpoints
  async getHistory(userId: string): Promise<{ success: boolean; history: InterviewHistoryItem[] }> {
    const response = await fetch(`${API_BASE_URL}/history/${userId}`);
    return response.json();
  },

  async addHistory(data: {
    userId: string;
    topic: string;
    difficulty: string;
    questionsAttempted: number;
    correctAnswers: number;
    score: number;
    timeSpent: number;
    strengths: string[];
    improvements: string[];
  }) {
    const response = await fetch(`${API_BASE_URL}/history`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async getUserStats(userId: string): Promise<{ success: boolean; stats: UserStats }> {
    const response = await fetch(`${API_BASE_URL}/history/stats/${userId}`);
    return response.json();
  },

  // User endpoints
  async getUserProfile(userId: string): Promise<{ success: boolean; user: UserProfile }> {
    const response = await fetch(`${API_BASE_URL}/user/${userId}`);
    return response.json();
  },

  async updateUserProfile(userId: string, username: string) {
    const response = await fetch(`${API_BASE_URL}/user/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username }),
    });
    return response.json();
  },
};
