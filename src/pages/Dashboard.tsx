import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Cross,
  Heart,
  Leaf,
  Users,
  DollarSign,
  Target,
  BookOpen,
  Settings,
  LogOut,
  Bell,
  Calendar,
  MapPin,
  TrendingUp,
  Upload,
  FileText,
  User,
  CheckCircle2,
  Clock,
  Star,
  Eye,
  Edit,
  Zap,
  Trophy,
  BarChart3,
  Brain,
  BarChart,
  Briefcase,
  Home,
} from "lucide-react";
import {
  getCovenantData,
  getRandomDailyScripture,
  getWeeklyFocus,
  getRandomReflectionPrompt,
} from "@/lib/covenantData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MissionTracker from "@/components/MissionTracker";
import PurposeScore from "@/components/PurposeScore";
import CapitalMarketplace from "@/components/CapitalMarketplace";

interface DashboardData {
  founderId: string;
  founderProfile: {
    name: string;
    email: string;
    country: string;
    region?: string;
    faithTradition?: string;
    bio?: string;
    calling?: string;
    linkedIn?: string;
    website?: string;
  };
  covenant: {
    id: string;
    name: string;
    icon: any;
    quote: string;
    description?: string;
    principles?: string[];
  };
  startupDetails: {
    projectName: string;
    missionStatement?: string;
    focusArea: string;
    targetImpact: string;
    impactType?: string;
    regionOfOperation?: string;
    stage?: string;
    readiness?: string;
    problemSolving?: string;
  };
  missionTracker?: {
    weeklyFocus: string;
    reflectionPrompt: string;
    prayerIntention: string;
    covenantScore?: number;
  };
  marketplaceSettings?: {
    isPublic: boolean;
    allowInvestorContact: boolean;
    fundingStage: string;
    fundingAmount: string;
  };
  completedSteps?: number[];
  digitalSignature?: string;
  acceptTerms?: boolean;
  completedAt?: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null,
  );

  useEffect(() => {
    const token = localStorage.getItem("foundry_token");
    const data = localStorage.getItem("onboarding_data");

    if (!token || !data) {
      navigate("/");
      return;
    }

    setDashboardData(JSON.parse(data));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("foundry_token");
    localStorage.removeItem("onboarding_data");
    navigate("/");
  };

  if (!dashboardData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-foundry-cream">
        <div className="text-center">
          <div className="w-12 h-12 bg-foundry-gold rounded-full flex items-center justify-center mx-auto mb-4">
            <Cross className="w-6 h-6 text-foundry-forest" />
          </div>
          <p className="text-foundry-sage">
            Loading your spiritual dashboard...
          </p>
        </div>
      </div>
    );
  }

  const firstName = dashboardData.founderProfile.name.split(" ")[0];
  const daysSinceJoining = dashboardData.completedAt
    ? Math.floor(
        (new Date().getTime() - new Date(dashboardData.completedAt).getTime()) /
          (1000 * 60 * 60 * 24),
      )
    : 0;

  // Get covenant-specific data
  const covenantType =
    dashboardData.covenant?.name?.toLowerCase().split(" ")[0] || "gospel"; // gospel, ecological, stoic
  const covenantData = getCovenantData(covenantType);
  const todayScripture = getRandomDailyScripture(covenantType);
  const weeklyMoralFocus = getWeeklyFocus(covenantType);
  const reflectionPrompt = getRandomReflectionPrompt(covenantType);

  if (!covenantData) {
    console.warn("Covenant data not found for:", covenantType);
    return (
      <div className="min-h-screen flex items-center justify-center bg-foundry-cream">
        <div className="text-center">
          <p className="text-foundry-sage">
            Error loading covenant data. Please try refreshing the page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "hsl(var(--foundry-cream))" }}
    >
      {/* Header */}
      <header className="bg-white border-b border-foundry-sage/20 sticky top-0 z-50 shadow-soft">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-foundry-forest rounded-lg flex items-center justify-center">
                  <Cross className="w-4 h-4 text-white" />
                </div>
                <h1 className="text-xl font-bold text-foundry-forest">
                  Foundry OS
                </h1>
              </div>
              <Badge
                variant="secondary"
                className="bg-foundry-gold/20 text-foundry-forest border-foundry-gold/30"
              >
                {dashboardData.covenant.name.split(" ")[0]} Covenant
              </Badge>
            </div>

            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="icon"
                className="text-foundry-sage hover:bg-foundry-gold/10"
              >
                <Bell className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-foundry-sage hover:bg-foundry-gold/10"
              >
                <Settings className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="text-foundry-sage hover:bg-foundry-gold/10"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Welcome Message */}
        <Card className="p-8 mb-8 bg-gradient-hero text-white shadow-medium">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">Peace, {firstName} 🌿</h1>
            <p className="text-white/90 text-lg">
              "A founder's dashboard should not just show progress. It should
              reflect purpose."
            </p>
          </div>
        </Card>

        {/* Navigation Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger
              value="overview"
              className="flex items-center space-x-2"
            >
              <Home className="w-4 h-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger
              value="mission"
              className="flex items-center space-x-2"
            >
              <Heart className="w-4 h-4" />
              <span>Mission Tracker</span>
            </TabsTrigger>
            <TabsTrigger
              value="capital"
              className="flex items-center space-x-2"
            >
              <Briefcase className="w-4 h-4" />
              <span>Capital</span>
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="flex items-center space-x-2"
            >
              <BarChart className="w-4 h-4" />
              <span>Purpose Score</span>
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="flex items-center space-x-2"
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            {/* Top Section: Covenant Summary + Quick Stats */}
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              {/* Covenant Summary */}
              <Card className="p-6 bg-white shadow-soft border-foundry-gold/30">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-foundry-gold rounded-xl flex items-center justify-center">
                    <covenantData.icon className="w-8 h-8 text-foundry-forest" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foundry-forest">
                      Covenant Summary
                    </h3>
                    <p className="text-foundry-sage">
                      Your spiritual foundation
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-foundry-sage">
                      Covenant Type
                    </p>
                    <p className="text-lg font-semibold text-foundry-forest">
                      {dashboardData.covenant.name}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-foundry-sage">
                      Core Principle
                    </p>
                    <blockquote className="text-foundry-forest italic mt-1">
                      "{covenantData.coreVerse.text}"
                    </blockquote>
                    <p className="text-xs text-foundry-sage mt-1">
                      - {covenantData.coreVerse.reference}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-foundry-sage">
                      Moral Focus This Week
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Heart className="w-4 h-4 text-foundry-gold" />
                      <span className="font-semibold text-foundry-forest">
                        {weeklyMoralFocus}
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-foundry-sage">
                      Last Reflection Done
                    </p>
                    <p className="text-foundry-forest">
                      {daysSinceJoining === 0
                        ? "Today"
                        : `${daysSinceJoining} day${daysSinceJoining !== 1 ? "s" : ""} ago`}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Quick Stats */}
              <Card className="p-6 bg-white shadow-soft">
                <h3 className="text-xl font-bold text-foundry-forest mb-6">
                  Quick Stats
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {covenantData.kpis.slice(0, 4).map((kpi, index) => (
                    <div
                      key={index}
                      className="text-center p-4 bg-foundry-cream rounded-lg"
                    >
                      <div className="w-12 h-12 bg-foundry-gold/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <kpi.icon className="w-6 h-6 text-foundry-gold" />
                      </div>
                      <p className="text-xs text-foundry-sage mb-1">
                        {kpi.name}
                      </p>
                      <p className="font-bold text-foundry-forest">
                        {kpi.currentValue}
                        {kpi.unit}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-8">
                {/* Startup Card */}
                <Card className="p-6 bg-white shadow-soft border-foundry-forest/10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Leaf className="w-8 h-8 text-foundry-gold" />
                      <h3 className="text-xl font-bold text-foundry-forest">
                        🌱 Startup Card
                      </h3>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-foundry-gold/30 text-foundry-forest hover:bg-foundry-gold/10"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-2xl font-bold text-foundry-forest mb-2">
                        {dashboardData.startupDetails.projectName}
                      </h4>
                      <p className="text-foundry-sage text-lg">
                        {dashboardData.startupDetails.focusArea}
                      </p>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-foundry-sage">
                      <span>Purpose: Kingdom Building</span>
                      <span>•</span>
                      <span>Stage: Pre-Seed</span>
                      <span>•</span>
                      <Button
                        variant="link"
                        className="p-0 h-auto text-foundry-gold hover:text-foundry-forest"
                      >
                        View Details →
                      </Button>
                    </div>

                    {dashboardData.startupDetails.targetImpact && (
                      <div className="p-4 bg-foundry-cream rounded-lg">
                        <h5 className="font-semibold text-foundry-forest mb-2">
                          Target Impact
                        </h5>
                        <p className="text-foundry-sage">
                          {dashboardData.startupDetails.targetImpact}
                        </p>
                      </div>
                    )}
                  </div>
                </Card>

                {/* Mission Actions */}
                <Card className="p-6 bg-white shadow-soft">
                  <div className="flex items-center space-x-3 mb-6">
                    <Zap className="w-8 h-8 text-foundry-gold" />
                    <h3 className="text-xl font-bold text-foundry-forest">
                      🛠️ Mission Actions
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {covenantData.missionActions.map((action, index) => {
                      const statuses = [
                        "90% done",
                        "Pending",
                        "Ready",
                        "Locked",
                      ];
                      const variants = [
                        "text-foundry-gold border-foundry-gold",
                        "text-foundry-sage border-foundry-sage",
                        "text-foundry-gold border-foundry-gold",
                        "text-foundry-sage border-foundry-sage",
                      ];

                      return (
                        <div
                          key={action.id}
                          className="flex items-center space-x-3 p-3 bg-foundry-cream/50 rounded-lg"
                        >
                          <Checkbox id={action.id} />
                          <action.icon className="w-5 h-5 text-foundry-sage" />
                          <div className="flex-1">
                            <label
                              htmlFor={action.id}
                              className="text-foundry-forest font-medium cursor-pointer block"
                            >
                              {action.title}
                            </label>
                            <p className="text-xs text-foundry-sage">
                              {action.description}
                            </p>
                          </div>
                          <Badge
                            variant="outline"
                            className={variants[index % variants.length]}
                          >
                            {statuses[index % statuses.length]}
                          </Badge>
                        </div>
                      );
                    })}
                  </div>
                </Card>

                {/* Growth Tracker */}
                <Card className="p-6 bg-white shadow-soft">
                  <div className="flex items-center space-x-3 mb-6">
                    <BarChart3 className="w-8 h-8 text-foundry-gold" />
                    <h3 className="text-xl font-bold text-foundry-forest">
                      📊 Growth Tracker
                    </h3>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-foundry-forest mb-3">
                        Core Principles Progress
                      </h4>
                      <div className="space-y-3">
                        {covenantData.principles.map((principle, index) => {
                          const values = [75, 85, 68, 82];
                          return (
                            <div key={principle.name}>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-foundry-sage">
                                  {principle.name}
                                </span>
                                <span className="text-foundry-forest font-medium">
                                  {values[index]}%
                                </span>
                              </div>
                              <Progress value={values[index]} className="h-2" />
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foundry-forest mb-3">
                        Covenant Consistency Timeline
                      </h4>
                      <div className="flex items-center space-x-2 text-sm">
                        <div className="flex space-x-1">
                          <div className="w-3 h-3 bg-foundry-gold rounded-full"></div>
                          <div className="w-3 h-3 bg-foundry-gold rounded-full"></div>
                          <div className="w-3 h-3 bg-foundry-gold rounded-full"></div>
                          <div className="w-3 h-3 bg-foundry-gold rounded-full"></div>
                          <div className="w-3 h-3 bg-foundry-gold rounded-full"></div>
                          <div className="w-3 h-3 bg-foundry-sage/30 rounded-full"></div>
                          <div className="w-3 h-3 bg-foundry-sage/30 rounded-full"></div>
                        </div>
                        <span className="text-foundry-sage">7-day streak</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                {/* Spiritual Insights */}
                <Card className="p-6 bg-gradient-card shadow-soft border-foundry-gold/30">
                  <div className="flex items-center space-x-3 mb-6">
                    <BookOpen className="w-8 h-8 text-foundry-gold" />
                    <h3 className="text-xl font-bold text-foundry-forest">
                      🧠 Spiritual Insights
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <BookOpen className="w-4 h-4 text-foundry-gold" />
                        <h4 className="font-semibold text-foundry-forest">
                          {covenantType === "stoic"
                            ? "Wisdom of the Day"
                            : "Scripture of the Day"}
                        </h4>
                      </div>
                      {todayScripture && (
                        <>
                          <p className="text-sm text-foundry-sage mb-2">
                            {todayScripture.reference}
                          </p>
                          <blockquote className="text-foundry-forest italic text-sm bg-white/50 p-3 rounded-lg">
                            "{todayScripture.text}"
                          </blockquote>
                          <p className="text-xs text-foundry-sage mt-2 font-medium">
                            Focus: {todayScripture.focus}
                          </p>
                        </>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <Heart className="w-4 h-4 text-foundry-gold" />
                        <h4 className="font-semibold text-foundry-forest">
                          Reflection Prompt
                        </h4>
                      </div>
                      <p className="text-sm text-foundry-sage italic">
                        "{reflectionPrompt}"
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <Clock className="w-4 h-4 text-foundry-gold" />
                        <h4 className="font-semibold text-foundry-forest">
                          Next Prayer Reminder
                        </h4>
                      </div>
                      <p className="text-sm text-foundry-sage">
                        Today at 6:00 PM
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Capital Engine */}
                <Card className="p-6 bg-foundry-forest text-white shadow-strong">
                  <div className="flex items-center space-x-3 mb-6">
                    <DollarSign className="w-8 h-8 text-foundry-gold" />
                    <h3 className="text-xl font-bold">💸 Capital Engine</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                      <div>
                        <p className="text-foundry-cream/80 text-sm">
                          Matching Investors Found
                        </p>
                        <p className="text-2xl font-bold">3</p>
                      </div>
                      <Users className="w-8 h-8 text-foundry-gold" />
                    </div>

                    <div className="p-3 bg-white/10 rounded-lg">
                      <p className="text-foundry-cream/80 text-sm mb-1">
                        Recommended Investors
                      </p>
                      <p className="font-bold text-sm">
                        {covenantData.investorTypes.slice(0, 2).join(", ")}
                      </p>
                    </div>

                    <div className="p-3 bg-white/10 rounded-lg">
                      <p className="text-foundry-cream/80 text-sm mb-1">
                        Focus Areas
                      </p>
                      <p className="font-bold text-sm">
                        {covenantData.fundingFocus.slice(0, 2).join(", ")}
                      </p>
                    </div>

                    <Button
                      variant="hero"
                      className="w-full bg-foundry-gold hover:bg-foundry-gold/90 text-foundry-forest"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      🔍 See Backers →
                    </Button>
                  </div>
                </Card>

                {/* Recent Activity */}
                <Card className="p-6 bg-white shadow-soft">
                  <h3 className="text-lg font-bold text-foundry-forest mb-4">
                    Kingdom Progress
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-foundry-gold rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foundry-forest">
                          🛐 7 Days of Aligned Execution
                        </p>
                        <p className="text-xs text-foundry-sage">
                          Earned today
                        </p>
                      </div>
                      <Star className="w-4 h-4 text-foundry-gold" />
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-foundry-sage rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foundry-forest">
                          📖 Scripture Streak: 5 Days
                        </p>
                        <p className="text-xs text-foundry-sage">Keep it up!</p>
                      </div>
                      <BookOpen className="w-4 h-4 text-foundry-sage" />
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-foundry-gold rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foundry-forest">
                          🪙 Ready for Pitch Review
                        </p>
                        <p className="text-xs text-foundry-sage">
                          2 backers interested
                        </p>
                      </div>
                      <CheckCircle2 className="w-4 h-4 text-foundry-gold" />
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="mission">
            <MissionTracker covenantType={covenantType} />
          </TabsContent>

          <TabsContent value="capital">
            <CapitalMarketplace founderData={dashboardData} />
          </TabsContent>

          <TabsContent value="analytics">
            <PurposeScore founderData={dashboardData} />
          </TabsContent>

          <TabsContent value="settings">
            <Card className="p-6">
              <h3 className="text-xl font-bold text-foundry-forest mb-4">
                Account Settings
              </h3>
              <p className="text-foundry-sage">
                Settings panel coming soon in Pro tier...
              </p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
