import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";

// Multi-step auth + onboarding flow
// Steps: 1) email/password sign in or sign up, 2) profile completion, 3) policy agreement

const educationOptions = [
  { value: "highschool", label: "High School" },
  { value: "bachelor", label: "Bachelor's" },
  { value: "master", label: "Master's" },
  { value: "phd", label: "PhD" },
  { value: "other", label: "Other" },
] as const;

type Step = "auth" | "profile" | "policy";
type Mode = "signin" | "signup";

const Auth = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("signup");
  const [step, setStep] = useState<Step>("auth");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Step 1 fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Step 2 fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [educationLevel, setEducationLevel] = useState<string>("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const [country, setCountry] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  // Step 3 fields
  const [policyAgreed, setPolicyAgreed] = useState(false);

  const needsFieldOfStudy = useMemo(
    () => ["bachelor", "master", "phd"].includes(educationLevel),
    [educationLevel]
  );

  useEffect(() => {
    // If already authenticated and profile is complete, go to dashboard
    (async () => {
      const { data } = await supabase.auth.getSession();
      const session = data.session;
      if (!session) return;
      const userId = session.user.id;
      const { data: prof } = await supabase
        .from("profiles")
        .select("user_id, username, full_name, role, avatar_url, bio, created_at, updated_at, country, education_level, field_of_study, policy_agreed")
        .eq("user_id", userId)
        .maybeSingle();

      // If profile exists and policy agreed, send to dashboard
      if (prof && (prof as any).policy_agreed) {
        navigate("/dashboard", { replace: true });
      } else if (prof) {
        // Continue onboarding
        setStep("profile");
      }
    })();
  }, [navigate]);

  const handleAuth = async () => {
    setBusy(true);
    setError(null);
    try {
      if (mode === "signin") {
        const { error: signInErr } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInErr) throw signInErr;
      } else {
        const { error: signUpErr } = await supabase.auth.signUp({
          email,
          password,
        });
        if (signUpErr) throw signUpErr;
      }

      const { data } = await supabase.auth.getSession();
      const session = data.session;
      if (!session) {
        // Email confirmation might be required.
        setStep("profile");
        return;
      }

      const userId = session.user.id;

      // Ensure a profiles row exists (trigger usually creates it on sign up)
      await supabase
        .from("profiles")
        .upsert(
          [
            {
              user_id: userId,
            } as any,
          ],
          { onConflict: "user_id" }
        );

      setStep("profile");
    } catch (e: any) {
      setError(e.message ?? "Authentication failed");
    } finally {
      setBusy(false);
    }
  };

  const handleProfile = async () => {
    setBusy(true);
    setError(null);
    try {
      const { data } = await supabase.auth.getSession();
      const session = data.session;
      if (!session) throw new Error("No session");
      const userId = session.user.id;

      const fullName = `${firstName} ${lastName}`.trim();

      // Optional: upload avatar to storage
      let uploadedAvatarUrl: string | null = null;
      if (avatarFile) {
        const fileExt = avatarFile.name.split('.').pop();
        const filePath = `${userId}/${Date.now()}.${fileExt}`;
        const { error: uploadErr } = await supabase.storage
          .from('avatars')
          .upload(filePath, avatarFile, {
            upsert: true,
            cacheControl: '3600',
            contentType: avatarFile.type,
          });
        if (uploadErr) throw uploadErr;
        const { data: pub } = supabase.storage.from('avatars').getPublicUrl(filePath);
        uploadedAvatarUrl = pub.publicUrl;
      }

      // Update profile details
      const payload: any = {
        user_id: userId,
        username: username || null,
        full_name: fullName || null,
        country: country || null,
        education_level: educationLevel || null,
        field_of_study: needsFieldOfStudy ? fieldOfStudy || null : null,
        avatar_url: uploadedAvatarUrl || null,
      };

      const { error: upErr } = await supabase
        .from("profiles")
        .upsert([payload], { onConflict: "user_id" });

      if (upErr) throw upErr;

      setStep("policy");
    } catch (e: any) {
      setError(e.message ?? "Profile update failed");
    } finally {
      setBusy(false);
    }
  };

  const handlePolicy = async () => {
    if (!policyAgreed) {
      setError("You must agree to the site policy to continue.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const { data } = await supabase.auth.getSession();
      const session = data.session;
      if (!session) throw new Error("No session");
      const userId = session.user.id;

      const { error: updErr } = await supabase
        .from("profiles")
        .update({ policy_agreed: true, policy_agreed_at: new Date().toISOString() } as any)
        .eq("user_id", userId);

      if (updErr) throw updErr;

      navigate("/dashboard", { replace: true });
    } catch (e: any) {
      setError(e.message ?? "Failed to save policy agreement");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md p-8 glass border-0 shadow-soft">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">{step === "auth" ? (mode === "signin" ? "Sign In" : "Create an account") : step === "profile" ? "Complete your profile" : "Agree to site policy"}</h1>
          <p className="text-sm text-muted-foreground">
            {step === "auth" && (mode === "signin" ? "Welcome back! Enter your credentials to continue." : "Let's get you started. Create your account with email and password.")}
            {step === "profile" && "Tell us a bit more about you to personalize your experience."}
            {step === "policy" && "Please read and agree to the site policy to finish onboarding."}
          </p>
        </div>

        {error && (
          <div className="mb-4 text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded p-2">{error}</div>
        )}

        {step === "auth" && (
          <div className="space-y-4">
            <div className="flex gap-2 mb-2">
              <Button variant={mode === "signup" ? "default" : "outline"} onClick={() => setMode("signup")}>Sign Up</Button>
              <Button variant={mode === "signin" ? "default" : "outline"} onClick={() => setMode("signin")}>Sign In</Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
              <p className="text-xs text-muted-foreground">Use a strong password. You'll use this to sign in later.</p>
            </div>

            <Button className="w-full bg-gradient-primary text-foreground" disabled={busy || !email || !password} onClick={handleAuth}>
              {busy ? "Please wait..." : mode === "signin" ? "Sign In" : "Create account"}
            </Button>
          </div>
        )}

        {step === "profile" && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                {avatarPreview ? (
                  <AvatarImage src={avatarPreview} />
                ) : (
                  <AvatarFallback>IMG</AvatarFallback>
                )}
              </Avatar>
              <div className="space-y-2">
                <Label htmlFor="avatar">Profile picture</Label>
                <Input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const f = e.target.files?.[0] || null;
                    setAvatarFile(f);
                    if (f) {
                      const url = URL.createObjectURL(f);
                      setAvatarPreview(url);
                    } else {
                      setAvatarPreview(null);
                    }
                  }}
                />
                <p className="text-xs text-muted-foreground">Upload a clear square image (PNG/JPG). This will be shown on your profile.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <Input id="firstName" placeholder="e.g. Sarah" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input id="lastName" placeholder="e.g. Chen" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" placeholder="unique username (e.g. sarahc)" value={username} onChange={(e) => setUsername(e.target.value)} />
              <p className="text-xs text-muted-foreground">This appears in your public profile URL and must be unique.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="education">Education level</Label>
              <select id="education" className="w-full h-10 rounded-md border border-border bg-transparent px-3 text-sm" value={educationLevel} onChange={(e) => setEducationLevel(e.target.value)}>
                <option value="">Select...</option>
                {educationOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <p className="text-xs text-muted-foreground">Choose your current highest level of education.</p>
            </div>
            {needsFieldOfStudy && (
              <div className="space-y-2">
                <Label htmlFor="fieldOfStudy">Field of study</Label>
                <Input id="fieldOfStudy" placeholder="e.g. Computer Science" value={fieldOfStudy} onChange={(e) => setFieldOfStudy(e.target.value)} />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input id="country" placeholder="e.g. Iran" value={country} onChange={(e) => setCountry(e.target.value)} />
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep("auth")}>Back</Button>
              <Button className="ml-auto bg-gradient-primary text-foreground" disabled={busy || !username || !firstName || !lastName} onClick={handleProfile}>
                {busy ? "Saving..." : "Continue"}
              </Button>
            </div>
          </div>
        )}

        {step === "policy" && (
          <div className="space-y-4">
            <div className="p-3 rounded-md bg-muted/40 border border-border/30 text-sm h-40 overflow-auto">
              <p className="mb-2 font-semibold">Site Policy (Summary)</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Respect others; no harassment or hate speech.</li>
                <li>Share only content you have the rights to share.</li>
                <li>Keep your account secure; you are responsible for your activity.</li>
                <li>We process your data according to our privacy policy.</li>
              </ul>
              <p className="mt-3 text-muted-foreground">By agreeing, you accept these terms and our full Terms of Service.</p>
            </div>

            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={policyAgreed} onChange={(e) => setPolicyAgreed(e.target.checked)} />
              I have read and agree to the site policy.
            </label>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep("profile")}>Back</Button>
              <Button className="ml-auto bg-gradient-primary text-foreground" disabled={busy} onClick={handlePolicy}>
                {busy ? "Saving..." : "Finish and continue"}
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Auth;
