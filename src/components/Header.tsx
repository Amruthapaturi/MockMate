import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

export function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" sclassName="text-xl font-bold text-primary">
          MockMate
        </Link>
        
        <nav className="flex items-center gap-4">
          {user ? (
            <>
              <Link to="/profile" className="text-muted-foreground hover:text-foreground transition-colors">
                Welcome, <span className="font-medium text-foreground">{user.username}</span>
              </Link>
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">Dashboard</Button>
              </Link>
              <Link to="/profile">
                <Button variant="ghost" size="sm">Profile</Button>
              </Link>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Register</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
