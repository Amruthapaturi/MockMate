function evaluateAnswer(answer, question) {
  const normalizedAnswer = answer.toLowerCase();
  
  const mustHaveMatched = question.mustHave.filter(keyword => 
    normalizedAnswer.includes(keyword.toLowerCase())
  );
  
  const bonusMatched = question.bonus.filter(keyword => 
    normalizedAnswer.includes(keyword.toLowerCase())
  );
  
  // Must-have keywords are worth 70% of the score
  const mustHaveScore = (mustHaveMatched.length / question.mustHave.length) * 70;
  
  // Bonus keywords are worth 30% of the score
  const bonusScore = (bonusMatched.length / question.bonus.length) * 30;
  
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

module.exports = { evaluateAnswer };
