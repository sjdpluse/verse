import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { Award, BookOpen, Globe, Github, Linkedin, MapPin, Calendar, Edit3, Settings } from "lucide-react";

const educationOptions = [
  { value: "highschool", label: "High School" },
  { value: "bachelor", label: "Bachelor's" },
  { value: "master", label: "Master's" },
  { value: "phd", label: "PhD" },
  { value: "other", label: "Other" },
] as const;

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [userId, setUserId] = useState<string | null>(null);

  // profile fields
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [country, setCountry] = useState("");
  const [educationLevel, setEducationLevel] = useState<string>("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");

  const [links, setLinks] = useState<{ github?: string; linkedin?: string; website?: string }>({});

  const needsFieldOfStudy = useMemo(
    () => ["bachelor", "master", "phd"].includes(educationLevel),
    [educationLevel]
  );

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await supabase.auth.getSession();
        const session = data.session;
        if (!session) return;
        setUserId(session.user.id);

        const { data: prof, error: pErr } = await supabase
          .from("profiles")
          .select("user_id, full_name, username, avatar_url, bio, country, education_level, field_of_study, github, linkedin, website, created_at")
          .eq("user_id", session.user.id)
          .maybeSingle();

        if (pErr) throw pErr;
        if (prof) {
          setAvatarUrl(prof.avatar_url ?? null);
          setFullName(prof.full_name ?? "");
          setUsername(prof.username ?? "");
          setBio(prof.bio ?? "");
          setCountry(prof.country ?? "");
          setEducationLevel((prof as any).education_level ?? "");
          setFieldOfStudy((prof as any).field_of_study ?? "");
          setLinks({
            github: (prof as any).github ?? undefined,
            linkedin: (prof as any).linkedin ?? undefined,
            website: (prof as any).website ?? undefined,
          });
        }
      } catch (e: any) {
        setError(e.message ?? "Failed to load profile");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSave = async () => {
    if (!userId) return;
    setSaving(true);
    setError(null);
    try {
      const payload: any = {
        user_id: userId,
        full_name: fullName || null,
        username: username || null,
        bio: bio || null,
        country: country || null,
        education_level: educationLevel || null,
        field_of_study: needsFieldOfStudy ? fieldOfStudy || null : null,
        avatar_url: avatarUrl || null,
        github: links.github || null,
        linkedin: links.linkedin || null,
        website: links.website || null,
      };

      const { error: upErr } = await supabase
        .from("profiles")
        .upsert([payload], { onConflict: "user_id" });

      if (upErr) throw upErr;
      setIsEditing(false);
    } catch (e: any) {
      setError(e.message ?? "Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  const initial = fullName?.trim()?.[0] || username?.trim()?.[0] || "?";

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="p-8 glass border-0 shadow-soft">
        {error && (
          <div className="mb-4 text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded p-2">{error}</div>
        )}

        <div className="flex flex-col lg:flex-row items-start gap-6">
          <div className="flex items-center gap-6">
            <Avatar className="w-24 h-24 border-4 border-primary/20">
              {avatarUrl ? (
                <AvatarImage src={avatarUrl} />
              ) : null}
              <AvatarFallback className="text-2xl">{initial}</AvatarFallback>
            </Avatar>

            <div>
              <h1 className="text-3xl font-bold mb-2">{fullName || "Complete your name"}</h1>
              <p className="text-muted-foreground mb-3">{username ? `@${username}` : "Choose a unique username"}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{country || "Add your country"}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>Member since {new Date().getFullYear()}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2 ml-auto">
            <Button 
              variant="outline" 
              onClick={() => setIsEditing((v) => !v)}
              className="flex items-center gap-2"
            >
              <Edit3 className="w-4 h-4" />
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
            <Button variant="outline" size="icon">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {!isEditing ? (
          <div className="mt-6">
            <p className="text-foreground mb-4">{bio || "Write a short bio about yourself (e.g., your skills, interests, and goals)."}</p>
            <div className="flex items-center gap-4">
              {links.github && (
                <a href={`https://${links.github}`} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                  <Github className="w-4 h-4" />
                  <span className="text-sm">GitHub</span>
                </a>
              )}
              {links.linkedin && (
                <a href={`https://${links.linkedin}`} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                  <Linkedin className="w-4 h-4" />
                  <span className="text-sm">LinkedIn</span>
                </a>
              )}
              {links.website && (
                <a href={`https://${links.website}`} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                  <Globe className="w-4 h-4" />
                  <span className="text-sm">Website</span>
                </a>
              )}
            </div>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full name</Label>
                <Input id="fullName" placeholder="e.g. Sarah Chen" value={fullName} onChange={(e) => setFullName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" placeholder="unique username (e.g. sarahc)" value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" placeholder="Describe your background, strengths, and interests..." value={bio} onChange={(e) => setBio(e.target.value)} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input id="country" placeholder="e.g. Iran" value={country} onChange={(e) => setCountry(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="education">Education level</Label>
                <select id="education" className="w-full h-10 rounded-md border border-border bg-transparent px-3 text-sm" value={educationLevel} onChange={(e) => setEducationLevel(e.target.value)}>
                  <option value="">Select...</option>
                  {educationOptions.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {needsFieldOfStudy && (
              <div className="space-y-2">
                <Label htmlFor="field">Field of study</Label>
                <Input id="field" placeholder="e.g. Computer Science" value={fieldOfStudy} onChange={(e) => setFieldOfStudy(e.target.value)} />
              </div>
            )}

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="github">GitHub</Label>
                <Input id="github" placeholder="e.g. github.com/yourname" value={links.github ?? ""} onChange={(e) => setLinks((l) => ({ ...l, github: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input id="linkedin" placeholder="e.g. linkedin.com/in/yourname" value={links.linkedin ?? ""} onChange={(e) => setLinks((l) => ({ ...l, linkedin: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input id="website" placeholder="e.g. yourname.dev" value={links.website ?? ""} onChange={(e) => setLinks((l) => ({ ...l, website: e.target.value }))} />
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
              <Button className="ml-auto bg-gradient-primary text-foreground" disabled={saving} onClick={handleSave}>
                {saving ? "Saving..." : "Save changes"}
              </Button>
            </div>
          </div>
        )}
      </Card>

      <Card className="p-8 text-center glass border-0 shadow-soft">
        <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">No Achievements</h3>
        <p className="text-muted-foreground">Complete activities to earn achievements</p>
      </Card>

      <Card className="p-8 text-center glass border-0 shadow-soft">
        <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">No Projects</h3>
        <p className="text-muted-foreground">Add your first project to showcase your work</p>
      </Card>
    </div>
  );
};

export default Profile;
