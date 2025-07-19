import { Button } from "@/components/ui/button";
import { Cross, Twitter, Linkedin, Mail, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foundry-forest text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-foundry-gold rounded-lg flex items-center justify-center">
                <Cross className="w-5 h-5 text-foundry-forest" />
              </div>
              <span className="text-2xl font-bold">Foundry OS</span>
            </div>
            <p className="text-foundry-cream/80 mb-6 leading-relaxed max-w-md">
              Empowering kingdom builders to create ventures that honor God, 
              serve humanity, and build for eternity.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-foundry-cream hover:text-foundry-gold hover:bg-foundry-gold/10">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-foundry-cream hover:text-foundry-gold hover:bg-foundry-gold/10">
                <Linkedin className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-foundry-cream hover:text-foundry-gold hover:bg-foundry-gold/10">
                <Github className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-foundry-cream hover:text-foundry-gold hover:bg-foundry-gold/10">
                <Mail className="w-5 h-5" />
              </Button>
            </div>
          </div>
          
          {/* Platform */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Platform</h4>
            <ul className="space-y-3 text-foundry-cream/80">
              <li><a href="#" className="hover:text-foundry-gold transition-smooth">Dashboard</a></li>
              <li><a href="#" className="hover:text-foundry-gold transition-smooth">Covenant Builder</a></li>
              <li><a href="#" className="hover:text-foundry-gold transition-smooth">Network</a></li>
              <li><a href="#" className="hover:text-foundry-gold transition-smooth">Capital</a></li>
              <li><a href="#" className="hover:text-foundry-gold transition-smooth">Scripture Engine</a></li>
            </ul>
          </div>
          
          {/* Community */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Community</h4>
            <ul className="space-y-3 text-foundry-cream/80">
              <li><a href="#" className="hover:text-foundry-gold transition-smooth">Founder Stories</a></li>
              <li><a href="#" className="hover:text-foundry-gold transition-smooth">Regional Chapters</a></li>
              <li><a href="#" className="hover:text-foundry-gold transition-smooth">Mentorship</a></li>
              <li><a href="#" className="hover:text-foundry-gold transition-smooth">Events</a></li>
              <li><a href="#" className="hover:text-foundry-gold transition-smooth">Resources</a></li>
            </ul>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="border-t border-foundry-cream/20 pt-12 mb-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Build Kingdom Ventures?</h3>
            <p className="text-foundry-cream/80 mb-6 max-w-2xl mx-auto">
              Join thousands of founders building businesses that matter for eternity.
            </p>
            <Button variant="hero" size="lg">
              Start Your Foundry Journey
            </Button>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="border-t border-foundry-cream/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-foundry-cream/60 text-sm mb-4 md:mb-0">
            © 2024 Foundry OS. Built for the Kingdom.
          </p>
          <div className="flex space-x-6 text-sm text-foundry-cream/60">
            <a href="#" className="hover:text-foundry-gold transition-smooth">Privacy Policy</a>
            <a href="#" className="hover:text-foundry-gold transition-smooth">Terms of Service</a>
            <a href="#" className="hover:text-foundry-gold transition-smooth">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;