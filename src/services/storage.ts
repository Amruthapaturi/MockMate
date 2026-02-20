export interface User {
  id: string;
  username: string;
}

export interface InterviewResult {
  id: string;
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

const STORAGE_KEYS = {
  USER: 'interview_user',
  HISTORY: 'interview_history',
};

export const storage = {
  // User management
  getUser(): User | null {
    const data = localStorage.getItem(STORAGE_KEYS.USER);
    return data ? JSON.parse(data) : null;
  },

  setUser(user: User): void {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },

  clearUser(): void {
    localStorage.removeItem(STORAGE_KEYS.USER);
  },

  // Interview history
  getHistory(): InterviewResult[] {
    const data = localStorage.getItem(STORAGE_KEYS.HISTORY);
    return data ? JSON.parse(data) : [];
  },

  addToHistory(result: InterviewResult): void {
    const history = this.getHistory();
    history.unshift(result);
    // Keep only last 20 results
    const trimmedHistory = history.slice(0, 20);
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(trimmedHistory));
  },

  clearHistory(): void {
    localStorage.removeItem(STORAGE_KEYS.HISTORY);
  },
};
