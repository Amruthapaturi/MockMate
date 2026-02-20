import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Timer } from '@/components/Timer';
import { QuestionCard } from '@/components/QuestionCard';
import { AnswerInput } from '@/components/AnswerInput';
import { FeedbackCard } from '@/components/FeedbackCard';
import { useAuth } from '@/hooks/useAuth';
import { useTimer } from '@/hooks/useTimer';
import { useInterview } from '@/hooks/useInterview';
import { useToast } from '@/hooks/use-toast';
import { TOPICS } from '@/components/TopicSelector';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function Interview() {
  const [showEndDialog, setShowEndDialog] = useState(false);
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const timer = useTimer();
  const interview = useInterview();

  const { topic, difficulty } = (location.state as { topic: string; difficulty: string }) || {};

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
      return;
    }

    if (!topic || !difficulty) {
      navigate('/dashboard');
      return;
    }

    // Start the interview
    const initInterview = async () => {
      if (user) {
        const result = await interview.startInterview(user.id, topic, difficulty);
        if (result.success) {
          timer.start();
        } else {
          toast({
            title: 'Error',
            description: result.error || 'Failed to start interview',
            variant: 'destructive',
          });
          navigate('/dashboard');
        }
      }
    };

    initInterview();
  }, [user, loading, topic, difficulty]);

  useEffect(() => {
    if (timer.isTimeUp) {
      handleEndInterview();
    }
  }, [timer.isTimeUp]);

  const handleSubmitAnswer = async (answer: string) => {
    const result = await interview.submitAnswer(answer);
    if (!result.success) {
      toast({
        title: 'Error',
        description: 'Failed to submit answer',
        variant: 'destructive',
      });
    }
  };

  const handleNextQuestion = async () => {
    const result = await interview.getNextQuestion();
    if (!result.success) {
      toast({
        title: 'Error',
        description: 'Failed to get next question',
        variant: 'destructive',
      });
    }
  };

  const handleEndInterview = async () => {
    timer.stop();
    const result = await interview.endInterview(timer.elapsedTime);
    if (result) {
      navigate('/summary', { state: { result } });
    } else {
      toast({
        title: 'Error',
        description: 'Failed to end interview',
        variant: 'destructive',
      });
      navigate('/dashboard');
    }
  };

  const getTopicName = (topicId: string) => {
    return TOPICS.find((t) => t.id === topicId)?.name || topicId;
  };

  if (loading || !interview.currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading interview...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Interview Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">{getTopicName(interview.topic)}</h1>
              <p className="text-sm text-muted-foreground">
                Questions answered: {interview.questionsAnswered}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Timer
                formattedRemaining={timer.formattedRemaining}
                remainingTime={timer.remainingTime}
              />
              <Button variant="destructive" onClick={() => setShowEndDialog(true)}>
                End Interview
              </Button>
            </div>
          </div>

          {/* Question */}
          <QuestionCard
            questionNumber={interview.questionsAnswered + 1}
            topic={getTopicName(interview.topic)}
            difficulty={interview.difficulty}
            questionText={interview.currentQuestion.text}
          />

          {/* Answer or Feedback */}
          {interview.lastResult ? (
            <FeedbackCard
              score={interview.lastResult.score}
              feedback={interview.lastResult.feedback}
              keywordsMatched={interview.lastResult.keywordsMatched}
              keywordsMissed={interview.lastResult.keywordsMissed}
              onNextQuestion={handleNextQuestion}
              isLoading={interview.isLoading}
            />
          ) : (
            <AnswerInput
              onSubmit={handleSubmitAnswer}
              isLoading={interview.isLoading}
            />
          )}
        </div>
      </main>

      {/* End Interview Dialog */}
      <AlertDialog open={showEndDialog} onOpenChange={setShowEndDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>End Interview?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to end the interview? You have answered{' '}
              {interview.questionsAnswered} questions so far.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Continue Interview</AlertDialogCancel>
            <AlertDialogAction onClick={handleEndInterview}>
              End Interview
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
