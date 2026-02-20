import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { BookOpen, Target, TrendingUp, Users } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Interview Practice
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Prepare for your technical interviews with our adaptive question system. 
            Practice DSA, OS, DBMS, Networks, OOPS, Python, and Web Development.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/register">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline">Login</Button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-12">Why Practice With Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={BookOpen}
              title="7 Topics"
              description="Cover all major CS subjects from DSA to Web Development"
            />
            <FeatureCard
              icon={Target}
              title="Adaptive Difficulty"
              description="Questions adjust based on your performance"
            />
            <FeatureCard
              icon={TrendingUp}
              title="Track Progress"
              description="View your history and identify improvement areas"
            />
            <FeatureCard
              icon={Users}
              title="Real Interview Feel"
              description="Experience a realistic interview environment"
            />
          </div>
        </section>

        {/* Topics Section */}
        <section className="container mx-auto px-4 py-16 bg-secondary/30 rounded-lg">
          <h2 className="text-2xl font-bold text-center mb-8">Topics Covered</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Data Structures & Algorithms',
              'Operating Systems',
              'Database Management',
              'Computer Networks',
              'Object-Oriented Programming',
              'Python Programming',
              'Web Development',
            ].map((topic) => (
              <span
                key={topic}
                className="px-4 py-2 bg-card rounded-full text-sm font-medium border border-border"
              >
                {topic}
              </span>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>AI Interview Practice - College Mini Project</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 bg-card rounded-lg border border-border text-center">
      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
