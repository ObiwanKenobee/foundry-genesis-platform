import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  Users, 
  DollarSign, 
  TrendingUp, 
  MapPin, 
  BookOpen,
  Shield,
  Zap
} from "lucide-react";

const PlatformPreview = () => {
  const features = [
    {
      icon: BarChart3,
      title: "Venture Dashboard",
      description: "Track impact metrics, funding progress, and covenant adherence in one unified view.",
      preview: "Real-time KPI tracking with spiritual and business metrics"
    },
    {
      icon: Users,
      title: "Kingdom Network",
      description: "Connect with mission-aligned founders, mentors, and investors in your region.",
      preview: "Smart matching based on values, location, and industry"
    },
    {
      icon: DollarSign,
      title: "Capital Marketplace",
      description: "Access patient capital from investors who share your covenant values.",
      preview: "Faith-based funding with covenant-aligned investors"
    },
    {
      icon: BookOpen,
      title: "Scripture Engine",
      description: "Get contextual biblical wisdom for your startup challenges and decisions.",
      preview: "AI-powered scripture recommendations for founders"
    },
    {
      icon: MapPin,
      title: "Global Impact Map",
      description: "Visualize the worldwide network of kingdom ventures and their local impact.",
      preview: "Interactive map showing ventures and their communities"
    },
    {
      icon: Shield,
      title: "Covenant Tracking",
      description: "Maintain accountability to your chosen principles with guided assessments.",
      preview: "Regular check-ins and covenant adherence metrics"
    }
  ];

  return (
    <section id="platform" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Badge variant="secondary" className="text-foundry-forest bg-foundry-gold/20">
              Platform Preview
            </Badge>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foundry-forest mb-6">
            Everything You Need to Build Kingdom Ventures
          </h2>
          <p className="text-xl text-foundry-sage max-w-3xl mx-auto leading-relaxed">
            From initial covenant selection to scaling your impact, Foundry OS provides 
            the tools and community to build ventures that honor God and serve humanity.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="p-6 hover:shadow-medium transition-smooth border-foundry-sage/20">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-button rounded-lg flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foundry-forest mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-foundry-sage mb-3 leading-relaxed">
                      {feature.description}
                    </p>
                    <p className="text-sm text-foundry-sage/70 font-medium">
                      {feature.preview}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Demo Dashboard Preview */}
        <Card className="p-8 bg-gradient-card border-foundry-sage/20 shadow-medium">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Zap className="w-5 h-5 text-foundry-gold" />
                <Badge variant="secondary" className="text-foundry-forest bg-foundry-gold/20">
                  Dashboard Preview
                </Badge>
              </div>
              <h3 className="text-3xl font-bold text-foundry-forest mb-4">
                Your Mission Command Center
              </h3>
              <p className="text-foundry-sage mb-6 leading-relaxed">
                Monitor your venture's spiritual and business health with integrated metrics 
                that matter for kingdom impact—from revenue growth to community transformation.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-foundry-gold rounded-full"></div>
                  <span className="text-foundry-sage">Real-time impact scoring</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-foundry-gold rounded-full"></div>
                  <span className="text-foundry-sage">Covenant adherence tracking</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-foundry-gold rounded-full"></div>
                  <span className="text-foundry-sage">Kingdom network integration</span>
                </div>
              </div>
              <Button variant="hero" size="lg">
                Request Early Access
              </Button>
            </div>
            
            {/* Mock Dashboard */}
            <div className="bg-white rounded-xl shadow-soft p-6 border border-foundry-sage/10">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-foundry-forest">Kingdom Venture Dashboard</h4>
                  <Badge className="bg-foundry-forest text-white">Gospel Covenant</Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-foundry-cream/50 rounded-lg p-3">
                    <div className="text-2xl font-bold text-foundry-forest">85%</div>
                    <div className="text-sm text-foundry-sage">Impact Score</div>
                  </div>
                  <div className="bg-foundry-cream/50 rounded-lg p-3">
                    <div className="text-2xl font-bold text-foundry-forest">$2.4M</div>
                    <div className="text-sm text-foundry-sage">Revenue Growth</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-foundry-sage">Covenant Adherence</span>
                    <span className="text-foundry-forest font-medium">92%</span>
                  </div>
                  <div className="w-full bg-foundry-sage/20 rounded-full h-2">
                    <div className="bg-foundry-gold h-2 rounded-full" style={{width: '92%'}}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-foundry-sage">Community Impact</span>
                    <span className="text-foundry-forest font-medium">1,247 lives</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default PlatformPreview;