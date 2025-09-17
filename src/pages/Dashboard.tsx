import { useEffect, useState } from "react";
import BottomNavigation from "@/components/BottomNavigation";
import Home from "@/components/dashboard/Home";
import SearchTab from "@/components/dashboard/SearchTab";
import CreatePost from "@/components/dashboard/CreatePost";
import Courses from "@/components/dashboard/Courses";
import Messages from "@/components/dashboard/Messages";
import Profile from "@/components/dashboard/Profile";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("home");
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate("/auth", { replace: true });
      }
    })();
  }, [navigate]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "home":
        return <Home />;
      case "search":
        return <SearchTab />;
      case "create":
        return <CreatePost />;
      case "courses":
        return <Courses />;
      case "messages":
        return <Messages />;
      case "profile":
        return <Profile />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <main className="container mx-auto px-4 py-6">
        {renderTabContent()}
      </main>
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Dashboard;