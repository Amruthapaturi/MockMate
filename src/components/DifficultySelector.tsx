import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const DIFFICULTIES = [
  { id: 'easy', name: 'Easy', description: 'Basic concepts and definitions' },
  { id: 'medium', name: 'Medium', description: 'Applied knowledge and problem solving' },
  { id: 'hard', name: 'Hard', description: 'Advanced concepts and complex scenarios' },
];

interface DifficultySelectorProps {
  selectedDifficulty: string;
  onSelect: (difficulty: string) => void;
}

export function DifficultySelector({ selectedDifficulty, onSelect }: DifficultySelectorProps) {
  return (
    <Card className="border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Select Difficulty</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {DIFFICULTIES.map((diff) => {
            const isSelected = selectedDifficulty === diff.id;
            const colorClass = {
              easy: 'border-success text-success hover:bg-success/10',
              medium: 'border-warning text-warning hover:bg-warning/10',
              hard: 'border-destructive text-destructive hover:bg-destructive/10',
            }[diff.id];

            return (
              <Button
                key={diff.id}
                variant="outline"
                className={`h-auto py-4 flex flex-col gap-1 ${
                  isSelected
                    ? diff.id === 'easy'
                      ? 'bg-success text-success-foreground hover:bg-success/90'
                      : diff.id === 'medium'
                      ? 'bg-warning text-warning-foreground hover:bg-warning/90'
                      : 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
                    : colorClass
                }`}
                onClick={() => onSelect(diff.id)}
              >
                <span className="font-semibold">{diff.name}</span>
                <span className={`text-xs ${isSelected ? 'opacity-80' : 'text-muted-foreground'}`}>
                  {diff.description}
                </span>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export { DIFFICULTIES };
