import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { storage, InterviewResult } from '@/services/storage';
import { TOPICS } from '@/components/TopicSelector';

export function InterviewHistory() {
  const history = storage.getHistory();

  if (history.length === 0) {
    return (
      <Card className="border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Interview History</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            No previous interviews. Start your first interview!
          </p>
        </CardContent>
      </Card>
    );
  }

  const getTopicName = (topicId: string) => {
    return TOPICS.find((t) => t.id === topicId)?.name || topicId;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    return `${mins} min`;
  };

  return (
    <Card className="border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Interview History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-[400px] overflow-y-auto">
          {history.map((result: InterviewResult) => (
            <div
              key={result.id}
              className="p-4 rounded-lg border border-border bg-secondary/30"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{getTopicName(result.topic)}</span>
                <span
                  className={`text-lg font-bold ${
                    result.score >= 70
                      ? 'text-success'
                      : result.score >= 40
                      ? 'text-warning'
                      : 'text-destructive'
                  }`}
                >
                  {result.score}%
                </span>
              </div>
              <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                <span>{formatDate(result.date)}</span>
                <span>•</span>
                <span>{result.questionsAttempted} questions</span>
                <span>•</span>
                <span>{formatTime(result.timeSpent)}</span>
                <Badge variant="outline" className="capitalize">
                  {result.difficulty}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
