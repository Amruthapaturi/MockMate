import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mic, MicOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Web Speech API type declarations
interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

interface AnswerInputProps {
  onSubmit: (answer: string) => void;
  isLoading: boolean;
}

export function AnswerInput({ onSubmit, isLoading }: AnswerInputProps) {
  const [answer, setAnswer] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check for browser support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript = transcript;
          }
        }

        if (finalTranscript) {
          setAnswer((prev) => prev + ' ' + finalTranscript);
        }
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        toast({
          title: "Microphone Error",
          description: `Error: ${event.error}. Please try again.`,
          variant: "destructive",
        });
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [toast]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      toast({
        title: "Not Supported",
        description: "Speech recognition is not supported in your browser. Try Chrome or Edge.",
        variant: "destructive",
      });
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
      toast({
        title: "Listening...",
        description: "Speak now. Click the mic button again to stop.",
      });
    }
  };

  const handleSubmit = () => {
    if (answer.trim()) {
      if (isListening && recognitionRef.current) {
        recognitionRef.current.stop();
        setIsListening(false);
      }
      onSubmit(answer.trim());
      setAnswer('');
    }
  };

  return (
    <Card className="border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Your Answer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Textarea
            placeholder="Type your answer or click the mic to speak..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            rows={6}
            className="resize-none pr-12"
            disabled={isLoading}
          />
          <Button
            type="button"
            variant={isListening ? "destructive" : "outline"}
            size="icon"
            className="absolute right-2 top-2"
            onClick={toggleListening}
            disabled={isLoading}
          >
            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
        </div>
        {isListening && (
          <p className="text-sm text-muted-foreground animate-pulse">
            🎤 Listening... Speak now
          </p>
        )}
        <Button 
          onClick={handleSubmit} 
          disabled={!answer.trim() || isLoading}
          className="w-full"
        >
          {isLoading ? 'Submitting...' : 'Submit Answer'}
        </Button>
      </CardContent>
    </Card>
  );
}
