import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Users, BookOpen, Filter, TrendingUp } from "lucide-react";

const SearchTab = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const searchResults: any[] = [];

  const trendingTopics: any[] = [];

  const filters = [
    { id: "all", label: "All", icon: Search },
    { id: "people", label: "People", icon: Users },
    { id: "courses", label: "Courses", icon: BookOpen }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Search Header */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Discover</h1>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            placeholder="Search for people, courses, or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-12 h-12 bg-card/50 border-border/20 focus:bg-card transition-smooth"
          />
          <Button size="sm" className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <Filter className="w-4 h-4" />
          </Button>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {filters.map((filter) => {
            const Icon = filter.icon;
            return (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(filter.id)}
                className="flex items-center gap-2 whitespace-nowrap"
              >
                <Icon className="w-4 h-4" />
                {filter.label}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Trending Topics */}
      <Card className="p-6 glass border-0 shadow-soft">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-p1" />
          <h2 className="font-semibold">Trending Topics</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {trendingTopics.map((topic, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="cursor-pointer hover:bg-primary/20 hover:text-primary transition-colors"
            >
              {topic}
            </Badge>
          ))}
        </div>
      </Card>

      {/* Search Results */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">
          {searchQuery ? `Results for "${searchQuery}"` : "Suggested for You"}
        </h2>

        {searchResults
          .filter(result => activeFilter === "all" || 
                  (activeFilter === "people" && result.type === "user") ||
                  (activeFilter === "courses" && result.type === "course"))
          .map((result, index) => (
            <Card key={index} className="p-6 glass border-0 shadow-soft hover:shadow-glow transition-smooth cursor-pointer">
              {result.type === "user" ? (
                <div className="flex items-start gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={result.avatar} />
                    <AvatarFallback>{result.name[0]}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg">{result.name}</h3>
                      <span className="text-muted-foreground">@{result.username}</span>
                    </div>
                    <p className="text-muted-foreground mb-3">{result.bio}</p>
                    <div className="flex flex-wrap gap-2">
                      {result.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Button size="sm" className="bg-gradient-primary text-foreground hover:shadow-soft">
                    Follow
                  </Button>
                </div>
              ) : (
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-secondary rounded-lg flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-foreground" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{result.title}</h3>
                    <p className="text-muted-foreground mb-2">by {result.instructor}</p>
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-sm text-muted-foreground">{result.students} students</span>
                      <span className="text-sm text-muted-foreground">⭐ {result.rating}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {result.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Button size="sm" className="bg-gradient-primary text-foreground hover:shadow-soft">
                    Enroll
                  </Button>
                </div>
              )}
            </Card>
          ))}
      </div>
    </div>
  );
};

export default SearchTab;