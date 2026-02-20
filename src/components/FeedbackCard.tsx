import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle } from 'lucide-react';

interface FeedbackCardProps {
  score: number;
  feedback: string;
  keywordsMatched: string[];
  keywordsMissed: string[];
  onNextQuestion: () => void;
  isLoading: boolean;
}

export function FeedbackCard({
  score,
  feedback,
  keywordsMatched,
  keywordsMissed,
  onNextQuestion,
  isLoading,
}: FeedbackCardProps) {
  const scoreColor = score >= 70 ? 'text-success' : score >= 40 ? 'text-warning' : 'text-destructive';

  return (
    <Card className="border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Feedback</CardTitle>
          <span className={`text-2xl font-bold ${scoreColor}`}>{score}%</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">{feedback}</p>

        {keywordsMatched.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-success">
              <CheckCircle className="w-4 h-4" />
              <span className="font-medium">Keywords Matched:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {keywordsMatched.map((keyword) => (
                <Badge key={keyword} className="bg-success/10 text-success border-success/20">
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {keywordsMissed.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-destructive">
              <XCircle className="w-4 h-4" />
              <span className="font-medium">Keywords Missed:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {keywordsMissed.map((keyword) => (
                <Badge key={keyword} variant="outline" className="text-muted-foreground">
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <Button onClick={onNextQuestion} disabled={isLoading} className="w-full">
          {isLoading ? 'Loading...' : 'Next Question'}
        </Button>
      </CardContent>
    </Card>
  );
}
