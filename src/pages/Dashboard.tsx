import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign,
  Target,
  BookOpen,
  Settings,
  LogOut,
  Bell,
  Plus,
  Calendar,
  MapPin
} from "lucide-react";

interface DashboardData {
  founderId: string;
  founderProfile: {
    name: string;
    email: string;
    country: string;
  };
  covenant: {
    name: string;
    icon: any;
    quote: string;
  };
  startupDetails: {
    projectName: string;
    focusArea: string;
    targetImpact: string;
  };
  completedAt: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-foundry-sage">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const daysSinceJoining = Math.floor(
    (new Date().getTime() - new Date(dashboardData.completedAt).getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-foundry-sage/20 sticky top-0 z-50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-foundry-forest">Foundry OS</h1>
              <Badge variant="secondary" className="bg-foundry-gold/20 text-foundry-forest">
                {dashboardData.covenant.name.split(' ')[0]} Covenant
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foundry-forest mb-2">
            Welcome back, {dashboardData.founderProfile.name.split(' ')[0]}!
          </h2>
          <p className="text-foundry-sage">
            Building with {dashboardData.covenant.name} principles for {daysSinceJoining === 0 ? 'less than a day' : `${daysSinceJoining} day${daysSinceJoining !== 1 ? 's' : ''}`}
          </p>
        </div>

        {/* Covenant Summary */}
        <Card className="p-6 mb-8 bg-gradient-card border-foundry-gold/30">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-foundry-gold rounded-lg flex items-center justify-center">
              <dashboardData.covenant.icon className="w-6 h-6 text-foundry-forest" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foundry-forest">Your Covenant</h3>
              <p className="text-foundry-sage">{dashboardData.covenant.name}</p>
            </div>
          </div>
          <blockquote className="text-foundry-sage italic border-l-4 border-foundry-gold pl-4">
            {dashboardData.covenant.quote}
          </blockquote>
        </Card>

        {/* Metrics Grid */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-foundry-sage text-sm">Impact Score</p>
                <p className="text-3xl font-bold text-foundry-forest">85%</p>
              </div>
              <div className="w-12 h-12 bg-foundry-gold/20 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-foundry-gold" />
              </div>
            </div>
            <p className="text-foundry-sage text-sm">Building with purpose</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-foundry-sage text-sm">Revenue Growth</p>
                <p className="text-3xl font-bold text-foundry-forest">$2.4K</p>
              </div>
              <div className="w-12 h-12 bg-foundry-gold/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-foundry-gold" />
              </div>
            </div>
            <p className="text-foundry-sage text-sm">Monthly recurring</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-foundry-sage text-sm">Network Connections</p>
                <p className="text-3xl font-bold text-foundry-forest">12</p>
              </div>
              <div className="w-12 h-12 bg-foundry-gold/20 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-foundry-gold" />
              </div>
            </div>
            <p className="text-foundry-sage text-sm">Kingdom builders</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-foundry-sage text-sm">Covenant Adherence</p>
                <p className="text-3xl font-bold text-foundry-forest">92%</p>
              </div>
              <div className="w-12 h-12 bg-foundry-gold/20 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-foundry-gold" />
              </div>
            </div>
            <p className="text-foundry-sage text-sm">Staying faithful</p>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Venture Overview */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-foundry-forest">Venture Overview</h3>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foundry-forest mb-2">{dashboardData.startupDetails.projectName}</h4>
                  <p className="text-foundry-sage">{dashboardData.startupDetails.focusArea}</p>
                </div>
                
                {dashboardData.startupDetails.targetImpact && (
                  <div>
                    <h4 className="font-semibold text-foundry-forest mb-2">Mission Impact</h4>
                    <p className="text-foundry-sage">{dashboardData.startupDetails.targetImpact}</p>
                  </div>
                )}

                <div>
                  <h4 className="font-semibold text-foundry-forest mb-2">Covenant Adherence</h4>
                  <div className="w-full bg-foundry-sage/20 rounded-full h-3">
                    <div className="bg-foundry-gold h-3 rounded-full transition-all duration-300" style={{width: '92%'}}></div>
                  </div>
                  <p className="text-foundry-sage text-sm mt-2">
                    Maintaining strong alignment with {dashboardData.covenant.name} principles
                  </p>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-foundry-forest mb-4">Quick Actions</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-auto p-4 flex flex-col items-start space-y-2">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-5 h-5 text-foundry-gold" />
                    <span className="font-medium">Apply for Capital</span>
                  </div>
                  <p className="text-sm text-foundry-sage text-left">
                    Connect with mission-aligned investors
                  </p>
                </Button>

                <Button variant="outline" className="h-auto p-4 flex flex-col items-start space-y-2">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-5 h-5 text-foundry-gold" />
                    <span className="font-medium">Scripture Guidance</span>
                  </div>
                  <p className="text-sm text-foundry-sage text-left">
                    Get biblical wisdom for decisions
                  </p>
                </Button>

                <Button variant="outline" className="h-auto p-4 flex flex-col items-start space-y-2">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-foundry-gold" />
                    <span className="font-medium">Find Mentors</span>
                  </div>
                  <p className="text-sm text-foundry-sage text-left">
                    Connect with experienced builders
                  </p>
                </Button>

                <Button variant="outline" className="h-auto p-4 flex flex-col items-start space-y-2">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-foundry-gold" />
                    <span className="font-medium">Local Community</span>
                  </div>
                  <p className="text-sm text-foundry-sage text-left">
                    Join builders in {dashboardData.founderProfile.country}
                  </p>
                </Button>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foundry-forest mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-foundry-gold rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-foundry-forest">Covenant established</p>
                    <p className="text-xs text-foundry-sage">
                      {daysSinceJoining === 0 ? 'Today' : `${daysSinceJoining} day${daysSinceJoining !== 1 ? 's' : ''} ago`}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-foundry-sage rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-foundry-forest">Profile completed</p>
                    <p className="text-xs text-foundry-sage">
                      {daysSinceJoining === 0 ? 'Today' : `${daysSinceJoining} day${daysSinceJoining !== 1 ? 's' : ''} ago`}
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Upcoming Events */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foundry-forest mb-4">Upcoming Events</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-4 h-4 text-foundry-gold" />
                  <div>
                    <p className="text-sm font-medium text-foundry-forest">Kingdom Builders Meetup</p>
                    <p className="text-xs text-foundry-sage">Next Friday, 7:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-4 h-4 text-foundry-gold" />
                  <div>
                    <p className="text-sm font-medium text-foundry-forest">Investor Pitch Night</p>
                    <p className="text-xs text-foundry-sage">Next month</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Call to Action */}
            <Card className="p-6 bg-foundry-forest text-white">
              <h3 className="text-lg font-semibold mb-2">Ready to Scale?</h3>
              <p className="text-foundry-cream/80 text-sm mb-4">
                Take your venture to the next level with our accelerator program.
              </p>
              <Button variant="hero" size="sm" className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Apply Now
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;