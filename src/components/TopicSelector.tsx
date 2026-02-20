import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Code, 
  Database, 
  Globe, 
  Layers, 
  Monitor, 
  Network, 
  Terminal 
} from 'lucide-react';

const TOPICS = [
  { id: 'dsa', name: 'Data Structures & Algorithms', icon: Code },
  { id: 'os', name: 'Operating Systems', icon: Monitor },
  { id: 'dbms', name: 'Database Management', icon: Database },
  { id: 'cn', name: 'Computer Networks', icon: Network },
  { id: 'oops', name: 'Object-Oriented Programming', icon: Layers },
  { id: 'python', name: 'Python Programming', icon: Terminal },
  { id: 'webdev', name: 'Web Development', icon: Globe },
];

interface TopicSelectorProps {
  selectedTopic: string;
  onSelect: (topic: string) => void;
}

export function TopicSelector({ selectedTopic, onSelect }: TopicSelectorProps) {
  return (
    <Card className="border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Select Topic</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {TOPICS.map((topic) => {
            const Icon = topic.icon;
            const isSelected = selectedTopic === topic.id;
            return (
              <Button
                key={topic.id}
                variant={isSelected ? 'default' : 'outline'}
                className={`h-auto py-4 flex flex-col gap-2 ${
                  isSelected ? '' : 'hover:border-primary'
                }`}
                onClick={() => onSelect(topic.id)}
              >
                <Icon className="w-6 h-6" />
                <span className="text-sm text-center">{topic.name}</span>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export { TOPICS };
