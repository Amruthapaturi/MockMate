import { Clock } from 'lucide-react';

interface TimerProps {
  formattedRemaining: string;
  remainingTime: number;
}

export function Timer({ formattedRemaining, remainingTime }: TimerProps) {
  const isWarning = remainingTime <= 15 * 60; // 15 minutes
  const isCritical = remainingTime <= 5 * 60; // 5 minutes

  return (
    <div
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-lg ${
        isCritical
          ? 'bg-destructive/10 text-destructive'
          : isWarning
          ? 'bg-warning/10 text-warning'
          : 'bg-secondary text-foreground'
      }`}
    >
      <Clock className="w-5 h-5" />
      <span>{formattedRemaining}</span>
    </div>
  );
}
