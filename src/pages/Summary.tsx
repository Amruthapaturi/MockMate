import { useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/Header';
import { InterviewResult } from '@/services/storage';
import { TOPICS } from '@/components/TopicSelector';
import { CheckCircle, XCircle, Clock, Target, TrendingUp } from 'lucide-react';

export default function Summary() {
  const navigate = useNavigate();
  const location = useLocation();
  const result = location.state?.result as InterviewResult | undefined;

  useEffect(() => {
    if (!result) {
      navigate('/dashboard');
    }
  }, [result, navigate]);

  if (!result) {
    return null;
  }

  const getTopicName = (topicId: string) => {
    return TOPICS.find((t) => t.id === topicId)?.name || topicId;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return { text: 'Excellent', color: 'text-success' };
    if (score >= 60) return { text: 'Good', color: 'text-primary' };
    if (score >= 40) return { text: 'Average', color: 'text-warning' };
    return { text: 'Needs Improvement', color: 'text-destructive' };
  };

  const scoreInfo = getScoreLabel(result.score);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">Interview Complete!</h1>
            <p className="text-muted-foreground">{getTopicName(result.topic)}</p>
          </div>

          {/* Score Card */}
          <Card className="border-border">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className={`text-6xl font-bold mb-2 ${scoreInfo.color}`}>
                  {result.score}%
                </div>
                <p className={`text-xl ${scoreInfo.color}`}>{scoreInfo.text}</p>
              </div>
            </CardContent>
          </Card>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              icon={Target}
              label="Questions"
              value={result.questionsAttempted.toString()}
            />
            <StatCard
              icon={CheckCircle}
              label="Correct"
              value={result.correctAnswers.toString()}
            />
            <StatCard
              icon={Clock}
              label="Time"
              value={formatTime(result.timeSpent)}
            />
            <StatCard
              icon={TrendingUp}
              label="Difficulty"
              value={result.difficulty}
            />
          </div>

          {/* Strengths */}
          {result.strengths.length > 0 && (
            <Card className="border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-success" />
                  Strengths
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {result.strengths.map((strength) => (
                    <Badge key={strength} className="bg-success/10 text-success border-success/20">
                      {strength}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Areas for Improvement */}
          {result.improvements.length > 0 && (
            <Card className="border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-warning" />
                  Areas to Improve
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {result.improvements.map((improvement) => (
                    <Badge key={improvement} variant="outline" className="text-muted-foreground">
                      {improvement}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="flex gap-4">
            <Link to="/dashboard" className="flex-1">
              <Button variant="outline" className="w-full">
                Back to Dashboard
              </Button>
            </Link>
            <Link to="/dashboard" className="flex-1">
              <Button className="w-full">Start New Interview</Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <Card className="border-border">
      <CardContent className="pt-4 pb-4 text-center">
        <Icon className="w-5 h-5 mx-auto mb-2 text-muted-foreground" />
        <p className="text-lg font-bold capitalize">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </CardContent>
    </Card>
  );
}
