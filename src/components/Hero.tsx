import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Users, Target, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Foundry OS - Empowering Kingdom Builders"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foundry-forest/90 via-foundry-forest/70 to-foundry-forest/60" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Foundry OS
          </h1>
          <p className="text-xl md:text-2xl text-foundry-cream mb-4 font-light">
            Empowering Kingdom Builders
          </p>
          <p className="text-lg md:text-xl text-foundry-cream/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            A platform where faith-driven founders connect, build, and scale ventures 
            aligned with Gospel values, ecological stewardship, and eternal impact.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button 
              variant="hero" 
              size="lg" 
              className="group"
              onClick={() => navigate("/onboarding")}
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
              Explore Platform
            </Button>
          </div>
          
          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6 text-center hover:shadow-strong transition-smooth">
              <div className="w-12 h-12 bg-foundry-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-foundry-forest" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Covenant-Driven</h3>
              <p className="text-foundry-cream/80">
                Choose your founding covenant: Gospel, Ecological, or Stoic principles guiding your venture.
              </p>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6 text-center hover:shadow-strong transition-smooth">
              <div className="w-12 h-12 bg-foundry-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-foundry-forest" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Kingdom Network</h3>
              <p className="text-foundry-cream/80">
                Connect with mission-aligned founders, investors, and mentors building for eternity.
              </p>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6 text-center hover:shadow-strong transition-smooth">
              <div className="w-12 h-12 bg-foundry-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-foundry-forest" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Impact Focused</h3>
              <p className="text-foundry-cream/80">
                Track real impact metrics alongside financial growth for sustainable kingdom advancement.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;