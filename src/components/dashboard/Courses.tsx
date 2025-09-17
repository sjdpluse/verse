import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Clock, 
  Users, 
  Star, 
  Play, 
  Lock, 
  Search,
  Filter,
  TrendingUp
} from "lucide-react";

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const enrolledCourses: any[] = [];

  const availableCourses: any[] = [];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Courses</h1>
        <Button className="bg-gradient-primary text-foreground hover:shadow-glow transition-smooth">
          Create Course
        </Button>
      </div>

      <Tabs defaultValue="enrolled" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="enrolled">My Courses</TabsTrigger>
          <TabsTrigger value="discover">Discover</TabsTrigger>
        </TabsList>
        
        {/* Enrolled Courses */}
        <TabsContent value="enrolled" className="space-y-6">
          {enrolledCourses.length > 0 ? (
            <>
              <div className="grid gap-6">
                {enrolledCourses.map((course) => (
                  <Card key={course.id} className="p-6 glass border-0 shadow-soft hover:shadow-glow transition-smooth">
                    <div className="flex items-start gap-6">
                      <div className={`w-20 h-20 bg-${course.color}/20 rounded-xl flex items-center justify-center`}>
                        <BookOpen className={`w-10 h-10 text-${course.color}`} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-semibold mb-1">{course.title}</h3>
                            <p className="text-muted-foreground">by {course.instructor}</p>
                          </div>
                          <Badge variant="secondary" className="bg-p3/20 text-p3">
                            {course.progress}% Complete
                          </Badge>
                        </div>
                        
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-muted-foreground">
                              {course.completedSessions}/{course.totalSessions} sessions
                            </span>
                            <span className="text-sm font-medium">{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Play className="w-4 h-4 text-p3" />
                            <span className="text-sm">Next: {course.nextSession}</span>
                          </div>
                          <Button size="sm" className="bg-gradient-primary text-foreground">
                            Continue Learning
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <Card className="p-12 text-center glass border-0 shadow-soft">
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Enrolled Courses</h3>
              <p className="text-muted-foreground mb-6">Start your learning journey by enrolling in a course</p>
              <Button className="bg-gradient-primary text-foreground hover:shadow-glow transition-smooth">
                Browse Courses
              </Button>
            </Card>
          )}
        </TabsContent>

        {/* Discover Courses */}
        <TabsContent value="discover" className="space-y-6">
          {/* Search */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 bg-card/50 border-border/20"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
          </div>

          {/* Trending */}
          <Card className="p-6 glass border-0 shadow-soft">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-p1" />
              <h2 className="font-semibold">Trending This Week</h2>
            </div>
            <div className="flex gap-2 flex-wrap">
              {["JavaScript", "React", "Python", "UI/UX", "Machine Learning"].map((tag) => (
                <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-primary/20">
                  {tag}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Available Courses */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableCourses.map((course) => (
              <Card key={course.id} className="p-6 glass border-0 shadow-soft hover:shadow-glow transition-smooth group">
                <div className="w-full h-32 bg-gradient-secondary rounded-lg mb-4 flex items-center justify-center">
                  <BookOpen className="w-12 h-12 text-foreground group-hover:scale-110 transition-transform" />
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{course.title}</h3>
                    <p className="text-sm text-muted-foreground">by {course.instructor}</p>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span>{course.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {course.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-2">
                    <span className="font-semibold text-lg">{course.price}</span>
                    <Button size="sm" className="bg-gradient-primary text-foreground">
                      Enroll Now
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Courses;