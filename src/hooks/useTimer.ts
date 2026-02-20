import { useState, useEffect, useCallback } from 'react';

const MAX_TIME = 60 * 60; // 1 hour in seconds

export function useTimer() {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && elapsedTime < MAX_TIME) {
      interval = setInterval(() => {
        setElapsedTime((prev) => {
          if (prev >= MAX_TIME) {
            setIsRunning(false);
            return MAX_TIME;
          }
          return prev + 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, elapsedTime]);

  const start = useCallback(() => {
    setIsRunning(true);
  }, []);

  const stop = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    setElapsedTime(0);
    setIsRunning(false);
  }, []);

  const remainingTime = MAX_TIME - elapsedTime;
  const isTimeUp = elapsedTime >= MAX_TIME;

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return {
    elapsedTime,
    remainingTime,
    isRunning,
    isTimeUp,
    formattedElapsed: formatTime(elapsedTime),
    formattedRemaining: formatTime(remainingTime),
    start,
    stop,
    reset,
  };
}
