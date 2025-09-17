import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageSquare, Share2, BookOpen, Users, TrendingUp } from "lucide-react";

const Home = () => {
  const recentPosts: any[] = [];

  const trendingCourses: any[] = [];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome back!</h1>
          <p className="text-muted-foreground">Discover what's happening in your learning community</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Card className="p-4 glass border-0 shadow-soft">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-p3/20 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-p3" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Courses</p>
              <p className="text-2xl font-bold">0</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 glass border-0 shadow-soft">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-p2/20 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-p2" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Connections</p>
              <p className="text-2xl font-bold">0</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 glass border-0 shadow-soft col-span-2 md:col-span-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-p1/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-p1" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Progress</p>
              <p className="text-2xl font-bold">0%</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Feed */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-semibold">Recent Updates</h2>
          
          {recentPosts.map((post) => (
            <Card key={post.id} className="p-6 glass border-0 shadow-soft hover:shadow-glow transition-smooth">
              <div className="flex items-start gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={post.author.avatar} />
                  <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold">{post.author.name}</h3>
                    <span className="text-sm text-muted-foreground">@{post.author.username}</span>
                    <Badge variant="secondary" className="text-xs">
                      {post.type === "project" ? "Project" : "Post"}
                    </Badge>
                  </div>
                  
                  <p className="text-foreground mb-3">{post.content}</p>
                  
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <button className="flex items-center gap-2 hover:text-p2 transition-colors">
                      <Heart className="w-4 h-4" />
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-p3 transition-colors">
                      <MessageSquare className="w-4 h-4" />
                      <span>{post.comments}</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-p1 transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                    <span className="ml-auto">{post.timestamp}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Trending Courses */}
          <Card className="p-6 glass border-0 shadow-soft">
            <h3 className="font-semibold mb-4">Trending Courses</h3>
            <div className="space-y-4">
              {trendingCourses.map((course, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{course.title}</p>
                    <p className="text-xs text-muted-foreground">by {course.instructor}</p>
                    <p className="text-xs text-muted-foreground">{course.students} students</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4" size="sm">
              View All Courses
            </Button>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6 glass border-0 shadow-soft">
            <h3 className="font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start" size="sm">
                <BookOpen className="w-4 h-4 mr-2" />
                Join a Course
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Users className="w-4 h-4 mr-2" />
                Find Peers
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <MessageSquare className="w-4 h-4 mr-2" />
                Start Chat
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;