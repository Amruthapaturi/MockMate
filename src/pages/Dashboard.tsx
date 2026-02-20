import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { TopicSelector } from '@/components/TopicSelector';
import { DifficultySelector } from '@/components/DifficultySelector';
import { InterviewHistory } from '@/components/InterviewHistory';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export default function Dashboard() {
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  const handleStartInterview = () => {
    if (!selectedTopic) {
      toast({
        title: 'Select Topic',
        description: 'Please select a topic to continue',
        variant: 'destructive',
      });
      return;
    }

    if (!selectedDifficulty) {
      toast({
        title: 'Select Difficulty',
        description: 'Please select a difficulty level',
        variant: 'destructive',
      });
      return;
    }

    navigate('/interview', {
      state: { topic: selectedTopic, difficulty: selectedDifficulty },
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Start Interview</h1>
            <p className="text-muted-foreground">
              Select a topic and difficulty level to begin your practice session
            </p>
          </div>

          <TopicSelector
            selectedTopic={selectedTopic}
            onSelect={setSelectedTopic}
          />

          <DifficultySelector
            selectedDifficulty={selectedDifficulty}
            onSelect={setSelectedDifficulty}
          />

          <Button
            size="lg"
            className="w-full"
            onClick={handleStartInterview}
            disabled={!selectedTopic || !selectedDifficulty}
          >
            Start Interview
          </Button>

          <InterviewHistory />
        </div>
      </main>
    </div>
  );
}
