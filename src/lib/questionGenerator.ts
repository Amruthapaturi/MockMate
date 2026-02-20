import { templates } from './questionTemplates';

export interface GeneratedQuestion {
  id: string;
  text: string;
  topic: string;
  difficulty: string;
  mustHave: string[];
  bonus: string[];
}

const sessionUsedQuestions = new Map<string, Set<string>>();

function generateQuestionId(): string {
  return `q_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

function selectRandom<T>(options: T[]): T {
  return options[Math.floor(Math.random() * options.length)];
}

function getQuestionSignature(text: string, topic: string, difficulty: string): string {
  return `${topic}-${difficulty}-${text}`;
}

export function generateQuestion(sessionId: string, topic: string, difficulty: string): GeneratedQuestion | null {
  if (!sessionUsedQuestions.has(sessionId)) {
    sessionUsedQuestions.set(sessionId, new Set());
  }
  
  const usedQuestions = sessionUsedQuestions.get(sessionId)!;
  const topicTemplates = templates[topic];
  
  if (!topicTemplates) {
    console.error(`Unknown topic: ${topic}`);
    return null;
  }
  
  let difficultyTemplates = topicTemplates[difficulty as keyof typeof topicTemplates];
  let usedDifficulty = difficulty;
  
  if (!difficultyTemplates || difficultyTemplates.length === 0) {
    const fallbackOrder = difficulty === 'easy' ? ['medium', 'hard'] : 
                          difficulty === 'hard' ? ['medium', 'easy'] : ['easy', 'hard'];
    for (const fallbackDiff of fallbackOrder) {
      const fallback = topicTemplates[fallbackDiff as keyof typeof topicTemplates];
      if (fallback && fallback.length > 0) {
        difficultyTemplates = fallback;
        usedDifficulty = fallbackDiff;
        break;
      }
    }
  }
  
  if (!difficultyTemplates || difficultyTemplates.length === 0) {
    return null;
  }
  
  let attempts = 0;
  const maxAttempts = 100;
  
  while (attempts < maxAttempts) {
    const template = selectRandom(difficultyTemplates);
    let questionText = template.template;
    const selectedVariables: Record<string, string> = {};
    
    if (template.variables) {
      for (const [varName, options] of Object.entries(template.variables)) {
        const selected = selectRandom(options);
        selectedVariables[varName] = selected;
        questionText = questionText.replace(`{${varName}}`, selected);
      }
    }
    
    const signature = getQuestionSignature(questionText, topic, usedDifficulty);
    
    if (!usedQuestions.has(signature)) {
      usedQuestions.add(signature);
      
      const mustHave = template.mustHaveGen ? template.mustHaveGen(selectedVariables) : [];
      const bonus = template.bonusGen ? template.bonusGen() : [];
      
      return {
        id: generateQuestionId(),
        text: questionText,
        topic,
        difficulty: usedDifficulty,
        mustHave,
        bonus
      };
    }
    
    attempts++;
  }
  
  // Fallback: generate anyway
  const template = selectRandom(difficultyTemplates);
  let questionText = template.template;
  const selectedVariables: Record<string, string> = {};
  
  for (const [varName, options] of Object.entries(template.variables)) {
    const selected = selectRandom(options);
    selectedVariables[varName] = selected;
    questionText = questionText.replace(`{${varName}}`, selected);
  }
  
  return {
    id: generateQuestionId(),
    text: questionText,
    topic,
    difficulty: usedDifficulty,
    mustHave: template.mustHaveGen ? template.mustHaveGen(selectedVariables) : [],
    bonus: template.bonusGen ? template.bonusGen() : []
  };
}

export function clearSession(sessionId: string): void {
  sessionUsedQuestions.delete(sessionId);
}

export function evaluateAnswer(answer: string, question: GeneratedQuestion): {
  score: number;
  feedback: string;
  keywordsMatched: string[];
  keywordsMissed: string[];
} {
  const normalizedAnswer = answer.toLowerCase();
  
  const mustHaveMatched = question.mustHave.filter(keyword => 
    normalizedAnswer.includes(keyword.toLowerCase())
  );
  
  const bonusMatched = question.bonus.filter(keyword => 
    normalizedAnswer.includes(keyword.toLowerCase())
  );
  
  const mustHaveScore = question.mustHave.length > 0 
    ? (mustHaveMatched.length / question.mustHave.length) * 70 
    : 35;
  
  const bonusScore = question.bonus.length > 0 
    ? (bonusMatched.length / question.bonus.length) * 30 
    : 15;
  
  const totalScore = Math.round(mustHaveScore + bonusScore);
  
  let feedback = '';
  if (totalScore >= 80) {
    feedback = 'Excellent answer! You covered the key concepts thoroughly.';
  } else if (totalScore >= 60) {
    feedback = 'Good answer! You understood the main concepts well.';
  } else if (totalScore >= 40) {
    feedback = 'Decent attempt. Try to include more specific technical terms.';
  } else {
    feedback = 'This topic needs more review. Focus on the core concepts.';
  }
  
  const keywordsMissed = [
    ...question.mustHave.filter(k => !mustHaveMatched.includes(k)),
    ...question.bonus.filter(k => !bonusMatched.includes(k)).slice(0, 3),
  ];
  
  return {
    score: totalScore,
    feedback,
    keywordsMatched: [...mustHaveMatched, ...bonusMatched],
    keywordsMissed,
  };
}
