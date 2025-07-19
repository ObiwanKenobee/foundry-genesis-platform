import { Button } from "@/components/ui/button";
import { Cross, Menu, X } from "lucide-react";
import { useState } from "react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-foundry-sage/20">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-button rounded-lg flex items-center justify-center">
              <Cross className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-foundry-forest">Foundry OS</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-foundry-sage hover:text-foundry-forest transition-smooth">
              Features
            </a>
            <a href="#community" className="text-foundry-sage hover:text-foundry-forest transition-smooth">
              Community
            </a>
            <a href="#about" className="text-foundry-sage hover:text-foundry-forest transition-smooth">
              About
            </a>
            <Button variant="outline" size="sm">
              Sign In
            </Button>
            <Button variant="default" size="sm">
              Join Foundry
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-foundry-forest" />
            ) : (
              <Menu className="w-6 h-6 text-foundry-forest" />
            )}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-foundry-sage/20">
            <div className="flex flex-col space-y-4">
              <a href="#features" className="text-foundry-sage hover:text-foundry-forest transition-smooth">
                Features
              </a>
              <a href="#community" className="text-foundry-sage hover:text-foundry-forest transition-smooth">
                Community
              </a>
              <a href="#about" className="text-foundry-sage hover:text-foundry-forest transition-smooth">
                About
              </a>
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
                <Button variant="default" size="sm">
                  Join Foundry
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;