import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cross, Leaf, Lightbulb, ArrowRight } from "lucide-react";

const CovenantSection = () => {
  const covenants = [
    {
      id: "gospel",
      name: "Gospel Covenant",
      icon: Cross,
      description: "Build ventures grounded in Biblical principles, spreading the Gospel through business as mission.",
      principles: ["Kingdom First", "Servant Leadership", "Eternal Perspective", "Stewardship"],
      color: "bg-foundry-forest",
      textColor: "text-foundry-forest",
      bgColor: "bg-foundry-forest/5"
    },
    {
      id: "ecological", 
      name: "Ecological Covenant",
      icon: Leaf,
      description: "Create sustainable ventures that honor creation and promote environmental stewardship.",
      principles: ["Creation Care", "Sustainability", "Regenerative Impact", "Earth Stewardship"],
      color: "bg-green-600",
      textColor: "text-green-600", 
      bgColor: "bg-green-50"
    },
    {
      id: "stoic",
      name: "Stoic Covenant", 
      icon: Lightbulb,
      description: "Develop ventures with philosophical wisdom, virtue, and rational decision-making.",
      principles: ["Virtue Ethics", "Wisdom", "Resilience", "Personal Growth"],
      color: "bg-slate-600",
      textColor: "text-slate-600",
      bgColor: "bg-slate-50"
    }
  ];

  return (
    <section id="covenants" className="py-20 bg-gradient-card">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foundry-forest mb-6">
            Choose Your Covenant
          </h2>
          <p className="text-xl text-foundry-sage max-w-3xl mx-auto leading-relaxed">
            Every founder begins with a covenant—a set of guiding principles that shape how you build, 
            lead, and create lasting impact through your venture.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {covenants.map((covenant) => {
            const IconComponent = covenant.icon;
            return (
              <Card key={covenant.id} className={`p-8 hover:shadow-strong transition-smooth border-2 hover:border-foundry-gold ${covenant.bgColor}`}>
                <div className="text-center mb-6">
                  <div className={`w-16 h-16 ${covenant.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className={`text-2xl font-bold ${covenant.textColor} mb-3`}>
                    {covenant.name}
                  </h3>
                  <p className="text-foundry-sage leading-relaxed">
                    {covenant.description}
                  </p>
                </div>
                
                <div className="space-y-3 mb-8">
                  <h4 className="font-semibold text-foundry-forest">Core Principles:</h4>
                  <div className="flex flex-wrap gap-2">
                    {covenant.principles.map((principle) => (
                      <Badge key={principle} variant="secondary" className="text-sm">
                        {principle}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <Button variant="covenant" className="w-full group">
                  Choose {covenant.name.split(' ')[0]}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Card>
            );
          })}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-foundry-sage mb-6">
            Not sure which covenant fits your vision? Take our guided assessment.
          </p>
          <Button variant="outline" size="lg">
            Take Covenant Assessment
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CovenantSection;