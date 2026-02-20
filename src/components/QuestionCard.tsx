import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface QuestionCardProps {
  questionNumber: number;
  topic: string;
  difficulty: string;
  questionText: string;
}

export function QuestionCard({ questionNumber, topic, difficulty, questionText }: QuestionCardProps) {
  const difficultyColor = {
    easy: 'bg-success/10 text-success border-success/20',
    medium: 'bg-warning/10 text-warning border-warning/20',
    hard: 'bg-destructive/10 text-destructive border-destructive/20',
  }[difficulty.toLowerCase()] || 'bg-secondary text-secondary-foreground';

  return (
    <Card className="border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Question {questionNumber}</CardTitle>
          <div className="flex gap-2">
            <Badge variant="outline">{topic}</Badge>
            <Badge className={difficultyColor}>{difficulty}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-foreground leading-relaxed">{questionText}</p>
      </CardContent>
    </Card>
  );
}
