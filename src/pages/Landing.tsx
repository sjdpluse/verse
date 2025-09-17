import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Users, BookOpen, MessageSquare, Search, Star, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">SJD<span className="text-p3">Verse</span></h1>
          <div className="flex items-center gap-4">
            <Link to="/auth">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/auth">
              <Button className="bg-gradient-primary text-foreground hover:shadow-glow transition-smooth">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-32 relative">
        {/* Background Hero Image */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl">
          <img 
            src={heroImage} 
            alt="SJDVerse community learning platform" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-hero"></div>
        </div>
        
        <div className="relative z-10 text-center animate-fade-up">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-p3/20 text-p5 mb-6">
              <Star className="w-4 h-4 text-p3" />
              <span className="text-sm font-medium">Welcome to the Future of Learning</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6">
              SJD<span className="text-p3">Verse</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              Where portfolios meet education. Connect with peers, showcase your work, and learn through 
              structured courses in a beautiful social environment.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/auth">
              <Button size="lg" className="bg-gradient-primary text-foreground hover:shadow-glow transition-smooth">
                Get Started Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="border-p3/30 hover:bg-p3/10 transition-smooth">
              Explore Courses
            </Button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 animate-fade-in">
          <Card className="p-8 glass shadow-soft border-0 hover:shadow-glow transition-smooth group">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-6 group-hover:animate-float">
              <Users className="w-6 h-6 text-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Portfolio Profiles</h3>
            <p className="text-muted-foreground">
              Create stunning portfolio profiles that showcase your projects, skills, and achievements. 
              Connect with like-minded individuals through unique usernames.
            </p>
          </Card>

          <Card className="p-8 glass shadow-soft border-0 hover:shadow-glow transition-smooth group">
            <div className="w-12 h-12 bg-gradient-secondary rounded-xl flex items-center justify-center mb-6 group-hover:animate-float">
              <BookOpen className="w-6 h-6 text-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Structured Learning</h3>
            <p className="text-muted-foreground">
              Access courses with session-based learning, unlock content with unique codes, 
              and track your progress through interactive sessions.
            </p>
          </Card>

          <Card className="p-8 glass shadow-soft border-0 hover:shadow-glow transition-smooth group">
            <div className="w-12 h-12 bg-p4/80 rounded-xl flex items-center justify-center mb-6 group-hover:animate-float">
              <MessageSquare className="w-6 h-6 text-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Real-time Chat</h3>
            <p className="text-muted-foreground">
              Connect instantly with peers through real-time messaging, file sharing, 
              and collaborative learning environments.
            </p>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Everything You Need to Succeed</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover the tools and features that make SJDVerse the perfect platform for modern learning
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-p2/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Search className="w-5 h-5 text-p2" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Smart Discovery</h3>
                  <p className="text-muted-foreground">
                    Find peers and content through intelligent search powered by usernames, skills, and interests.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 bg-p1/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5 text-p1" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Instant Collaboration</h3>
                  <p className="text-muted-foreground">
                    Work together seamlessly with real-time messaging, file sharing, and project collaboration tools.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 bg-p3/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-5 h-5 text-p3" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Progressive Learning</h3>
                  <p className="text-muted-foreground">
                    Unlock course sessions progressively with unique access codes and track your learning journey.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary opacity-10 rounded-2xl blur-2xl"></div>
              <Card className="relative p-8 glass border-0 shadow-soft">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-primary rounded-2xl mx-auto mb-6 flex items-center justify-center">
                    <Star className="w-10 h-10 text-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Learning?</h3>
                  <p className="text-muted-foreground mb-6">
                    Join thousands of learners already using SJDVerse to advance their careers and connect with peers.
                  </p>
                  <Link to="/auth">
                    <Button className="bg-gradient-primary text-foreground hover:shadow-glow transition-smooth">
                      Start Your Journey
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;