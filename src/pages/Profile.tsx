import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/Header";
import { storage } from "@/services/storage";
import { api, InterviewHistoryItem, UserStats, UserProfile } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { User, Calendar, Clock, Target, TrendingUp, Award, Edit2, Save, X, ArrowLeft } from "lucide-react";
import { format } from "date-fns";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState(storage.getUser());
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [history, setHistory] = useState<InterviewHistoryItem[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    loadProfileData();
  }, [user, navigate]);

  const loadProfileData = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const [profileRes, statsRes, historyRes] = await Promise.all([
        api.getUserProfile(user.id),
        api.getUserStats(user.id),
        api.getHistory(user.id),
      ]);

      if (profileRes.success) {
        setProfile(profileRes.user);
        setNewUsername(profileRes.user.username);
      }
      if (statsRes.success) {
        setStats(statsRes.stats);
      }
      if (historyRes.success) {
        setHistory(historyRes.history);
      }
    } catch (error) {
      console.error("Failed to load profile data:", error);
      toast({
        title: "Error",
        description: "Failed to load profile data. Make sure the backend is running.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUsername = async () => {
    if (!user || !newUsername.trim()) return;

    try {
      const result = await api.updateUserProfile(user.id, newUsername.trim());
      if (result.success) {
        const updatedUser = { ...user, username: newUsername.trim() };
        storage.setUser(updatedUser);
        setUser(updatedUser);
        setIsEditing(false);
        toast({
          title: "Profile updated",
          description: "Your username has been updated successfully.",
        });
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to update profile",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-pulse text-muted-foreground">Loading profile...</div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  User Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-10 w-10 text-primary" />
                  </div>
                  <div className="flex-1">
                    {isEditing ? (
                      <div className="flex items-center gap-2">
                        <Input
                          value={newUsername}
                          onChange={(e) => setNewUsername(e.target.value)}
                          className="max-w-xs"
                        />
                        <Button size="icon" onClick={handleUpdateUsername}>
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" onClick={() => setIsEditing(false)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <h2 className="text-2xl font-bold">{user?.username}</h2>
                        <Button size="icon" variant="ghost" onClick={() => setIsEditing(true)}>
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                    {profile && (
                      <p className="text-muted-foreground">
                        Member since {format(new Date(profile.createdAt), "MMMM d, yyyy")}
                      </p>
                    )}
                  </div>
                </div>

                {profile?.lastLogin && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    Last login: {format(new Date(profile.lastLogin), "PPpp")}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            {stats ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center">
                        <Target className="h-8 w-8 text-primary mb-2" />
                        <p className="text-2xl font-bold">{stats.totalInterviews}</p>
                        <p className="text-sm text-muted-foreground">Total Interviews</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center">
                        <Award className="h-8 w-8 text-primary mb-2" />
                        <p className="text-2xl font-bold">{stats.avgScore}%</p>
                        <p className="text-sm text-muted-foreground">Avg Score</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center">
                        <TrendingUp className="h-8 w-8 text-primary mb-2" />
                        <p className="text-2xl font-bold">{stats.totalCorrect}/{stats.totalQuestions}</p>
                        <p className="text-sm text-muted-foreground">Correct Answers</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center">
                        <Clock className="h-8 w-8 text-primary mb-2" />
                        <p className="text-2xl font-bold">{formatTime(stats.totalTime)}</p>
                        <p className="text-sm text-muted-foreground">Total Time</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {Object.keys(stats.topicStats).length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Performance by Topic</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {Object.entries(stats.topicStats).map(([topic, data]) => (
                          <div key={topic} className="p-4 rounded-lg bg-muted/50">
                            <p className="font-medium">{topic}</p>
                            <p className="text-sm text-muted-foreground">
                              {data.count} interviews • Avg: {Math.round(data.totalScore / data.count)}%
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No statistics available yet. Complete some interviews!</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            {history.length > 0 ? (
              history.map((item) => (
                <Card key={item._id}>
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{item.topic}</h3>
                          <Badge variant="secondary">{item.difficulty}</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {format(new Date(item.date), "PPp")}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {formatTime(item.timeSpent)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary">{item.score}%</p>
                          <p className="text-sm text-muted-foreground">
                            {item.correctAnswers}/{item.questionsAttempted} correct
                          </p>
                        </div>
                      </div>
                    </div>
                    {(item.strengths.length > 0 || item.improvements.length > 0) && (
                      <div className="mt-4 pt-4 border-t grid md:grid-cols-2 gap-4">
                        {item.strengths.length > 0 && (
                          <div>
                            <p className="text-sm font-medium text-green-600 mb-1">Strengths</p>
                            <p className="text-sm text-muted-foreground">{item.strengths.join(", ")}</p>
                          </div>
                        )}
                        {item.improvements.length > 0 && (
                          <div>
                            <p className="text-sm font-medium text-orange-600 mb-1">Areas to Improve</p>
                            <p className="text-sm text-muted-foreground">{item.improvements.join(", ")}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No interview history yet. Start your first interview!</p>
                  <Button className="mt-4" onClick={() => navigate("/dashboard")}>
                    Go to Dashboard
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Profile;
