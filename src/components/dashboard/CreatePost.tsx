import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Image, Video, Link2, FileText, Send, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CreatePost = () => {
  const [postContent, setPostContent] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const { toast } = useToast();

  const handlePost = (type: "post" | "project") => {
    if (type === "post" && !postContent.trim()) {
      toast({
        title: "Error",
        description: "Please add some content to your post.",
        variant: "destructive"
      });
      return;
    }

    if (type === "project" && (!projectTitle.trim() || !projectDescription.trim())) {
      toast({
        title: "Error", 
        description: "Please fill in project title and description.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Success!",
      description: `Your ${type} has been shared with your network.`
    });

    // Reset forms
    setPostContent("");
    setProjectTitle("");
    setProjectDescription("");
    setProjectLink("");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Create & Share</h1>
      </div>

      <Tabs defaultValue="post" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="post">Quick Post</TabsTrigger>
          <TabsTrigger value="project">Share Project</TabsTrigger>
        </TabsList>
        
        {/* Quick Post */}
        <TabsContent value="post">
          <Card className="p-6 glass border-0 shadow-soft">
            <div className="flex items-start gap-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>YU</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 space-y-4">
                <Textarea
                  placeholder="What's on your mind? Share your thoughts, ask questions, or update your network..."
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  className="min-h-[120px] resize-none border-0 bg-transparent text-lg placeholder:text-muted-foreground focus-visible:ring-0"
                />
                
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                      <Image className="w-4 h-4 mr-2" />
                      Photo
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                      <Video className="w-4 h-4 mr-2" />
                      Video
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                      <Link2 className="w-4 h-4 mr-2" />
                      Link
                    </Button>
                  </div>
                  
                  <Button 
                    onClick={() => handlePost("post")}
                    className="bg-gradient-primary text-foreground hover:shadow-glow transition-smooth"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Share Post
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Share Project */}
        <TabsContent value="project">
          <Card className="p-6 glass border-0 shadow-soft">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Share Your Project</h2>
                  <p className="text-muted-foreground">Showcase your work to the community</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="project-title">Project Title*</Label>
                  <Input
                    id="project-title"
                    placeholder="Enter your project title..."
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <Label htmlFor="project-description">Description*</Label>
                  <Textarea
                    id="project-description"
                    placeholder="Describe your project, the technologies used, challenges faced, and key learnings..."
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    className="mt-2 min-h-[120px]"
                  />
                </div>
                
                <div>
                  <Label htmlFor="project-link">Project Link (optional)</Label>
                  <Input
                    id="project-link"
                    placeholder="https://github.com/username/project or live demo URL..."
                    value={projectLink}
                    onChange={(e) => setProjectLink(e.target.value)}
                    className="mt-2"
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-6 border-t">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Image className="w-4 h-4 mr-2" />
                    Add Screenshots
                  </Button>
                  <Button variant="outline" size="sm">
                    <Video className="w-4 h-4 mr-2" />
                    Demo Video
                  </Button>
                </div>
                
                <Button 
                  onClick={() => handlePost("project")}
                  className="bg-gradient-primary text-foreground hover:shadow-glow transition-smooth"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Share Project
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Tips */}
      <Card className="p-6 glass border-0 shadow-soft">
        <h3 className="font-semibold mb-3">💡 Tips for Great Posts</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• Share your learning journey and progress</li>
          <li>• Ask thoughtful questions to engage the community</li>
          <li>• Include relevant tags and hashtags for discoverability</li>
          <li>• Add visuals to make your content more engaging</li>
          <li>• Celebrate wins and share lessons learned from failures</li>
        </ul>
      </Card>
    </div>
  );
};

export default CreatePost;