import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Cross, 
  Leaf, 
  Lightbulb, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle,
  User,
  Building,
  FileText
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface CovenantType {
  id: string;
  name: string;
  icon: typeof Cross;
  description: string;
  principles: string[];
  quote: string;
}

interface FounderProfile {
  name: string;
  email: string;
  country: string;
  bio: string;
}

interface StartupDetails {
  projectName: string;
  focusArea: string;
  targetImpact: string;
  stage: string;
}

interface OnboardingData {
  covenant: CovenantType | null;
  founderProfile: FounderProfile;
  startupDetails: StartupDetails;
  digitalSignature: string;
  acceptTerms: boolean;
}

const OnboardingWizard = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    covenant: null,
    founderProfile: {
      name: "",
      email: "",
      country: "",
      bio: ""
    },
    startupDetails: {
      projectName: "",
      focusArea: "",
      targetImpact: "",
      stage: "ideation"
    },
    digitalSignature: "",
    acceptTerms: false
  });

  const covenants: CovenantType[] = [
    {
      id: "gospel",
      name: "Gospel Covenant",
      icon: Cross,
      description: "Build ventures grounded in Biblical principles, spreading the Gospel through business as mission.",
      principles: ["Kingdom First", "Servant Leadership", "Eternal Perspective", "Stewardship"],
      quote: "\"But seek first the kingdom of God and his righteousness, and all these things will be added to you.\" - Matthew 6:33"
    },
    {
      id: "ecological", 
      name: "Ecological Covenant",
      icon: Leaf,
      description: "Create sustainable ventures that honor creation and promote environmental stewardship.",
      principles: ["Creation Care", "Sustainability", "Regenerative Impact", "Earth Stewardship"],
      quote: "\"The earth is the Lord's, and everything in it, the world, and all who live in it.\" - Psalm 24:1"
    },
    {
      id: "stoic",
      name: "Stoic Covenant", 
      icon: Lightbulb,
      description: "Develop ventures with philosophical wisdom, virtue, and rational decision-making.",
      principles: ["Virtue Ethics", "Wisdom", "Resilience", "Personal Growth"],
      quote: "\"The best revenge is not to be like your enemy.\" - Marcus Aurelius"
    }
  ];

  const handleNext = () => {
    if (currentStep === 1 && !onboardingData.covenant) {
      toast({
        title: "Please select a covenant",
        description: "Choose the founding principles that will guide your venture.",
        variant: "destructive"
      });
      return;
    }
    
    if (currentStep === 2) {
      const { name, email } = onboardingData.founderProfile;
      if (!name || !email) {
        toast({
          title: "Please complete your profile",
          description: "Name and email are required to continue.",
          variant: "destructive"
        });
        return;
      }
    }

    if (currentStep === 3) {
      const { projectName, focusArea } = onboardingData.startupDetails;
      if (!projectName || !focusArea) {
        toast({
          title: "Please complete startup details",
          description: "Project name and focus area are required.",
          variant: "destructive"
        });
        return;
      }
    }

    if (currentStep === 4) {
      handleSubmit();
      return;
    }

    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    if (!onboardingData.digitalSignature || !onboardingData.acceptTerms) {
      toast({
        title: "Please complete the covenant acceptance",
        description: "Digital signature and terms acceptance are required.",
        variant: "destructive"
      });
      return;
    }

    // Simulate API call
    const founderId = crypto.randomUUID();
    const dashboardToken = `foundry_${founderId}`;
    
    // Store in localStorage (in real app, this would be an API call)
    localStorage.setItem("foundry_token", dashboardToken);
    localStorage.setItem("onboarding_data", JSON.stringify({
      ...onboardingData,
      founderId,
      completedAt: new Date().toISOString()
    }));

    toast({
      title: "Welcome to Foundry OS!",
      description: "Your covenant has been established. Redirecting to completion...",
    });

    setTimeout(() => {
      navigate("/onboarding/complete");
    }, 1500);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foundry-forest mb-4">
                Choose Your Covenant
              </h2>
              <p className="text-foundry-sage">
                Select the foundational principles that will guide your venture
              </p>
            </div>
            
            <div className="grid gap-6">
              {covenants.map((covenant) => {
                const IconComponent = covenant.icon;
                const isSelected = onboardingData.covenant?.id === covenant.id;
                
                return (
                  <Card 
                    key={covenant.id}
                    className={`p-6 cursor-pointer transition-all hover:shadow-medium ${
                      isSelected 
                        ? "border-2 border-foundry-gold bg-foundry-gold/5" 
                        : "border border-border hover:border-foundry-sage"
                    }`}
                    onClick={() => setOnboardingData(prev => ({ ...prev, covenant }))}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        isSelected ? "bg-foundry-gold" : "bg-foundry-forest"
                      }`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-semibold text-foundry-forest">
                            {covenant.name}
                          </h3>
                          {isSelected && (
                            <CheckCircle className="w-6 h-6 text-foundry-gold" />
                          )}
                        </div>
                        <p className="text-foundry-sage mb-4">
                          {covenant.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {covenant.principles.map((principle) => (
                            <Badge key={principle} variant="secondary">
                              {principle}
                            </Badge>
                          ))}
                        </div>
                        <blockquote className="text-sm italic text-foundry-sage border-l-4 border-foundry-gold pl-4">
                          {covenant.quote}
                        </blockquote>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-foundry-forest rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-foundry-forest mb-4">
                Tell Us About Yourself
              </h2>
              <p className="text-foundry-sage">
                Help us create your founder profile
              </p>
            </div>

            <div className="grid gap-6 max-w-md mx-auto">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={onboardingData.founderProfile.name}
                  onChange={(e) => setOnboardingData(prev => ({
                    ...prev,
                    founderProfile: { ...prev.founderProfile, name: e.target.value }
                  }))}
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={onboardingData.founderProfile.email}
                  onChange={(e) => setOnboardingData(prev => ({
                    ...prev,
                    founderProfile: { ...prev.founderProfile, email: e.target.value }
                  }))}
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={onboardingData.founderProfile.country}
                  onChange={(e) => setOnboardingData(prev => ({
                    ...prev,
                    founderProfile: { ...prev.founderProfile, country: e.target.value }
                  }))}
                  placeholder="Where are you based?"
                />
              </div>

              <div>
                <Label htmlFor="bio">Brief Bio</Label>
                <Textarea
                  id="bio"
                  value={onboardingData.founderProfile.bio}
                  onChange={(e) => setOnboardingData(prev => ({
                    ...prev,
                    founderProfile: { ...prev.founderProfile, bio: e.target.value }
                  }))}
                  placeholder="Tell us about your background and calling..."
                  rows={4}
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-foundry-forest rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-foundry-forest mb-4">
                Your Startup Vision
              </h2>
              <p className="text-foundry-sage">
                Share details about the venture you're building
              </p>
            </div>

            <div className="grid gap-6 max-w-md mx-auto">
              <div>
                <Label htmlFor="projectName">Project Name *</Label>
                <Input
                  id="projectName"
                  value={onboardingData.startupDetails.projectName}
                  onChange={(e) => setOnboardingData(prev => ({
                    ...prev,
                    startupDetails: { ...prev.startupDetails, projectName: e.target.value }
                  }))}
                  placeholder="What's your venture called?"
                />
              </div>

              <div>
                <Label htmlFor="focusArea">Focus Area *</Label>
                <Input
                  id="focusArea"
                  value={onboardingData.startupDetails.focusArea}
                  onChange={(e) => setOnboardingData(prev => ({
                    ...prev,
                    startupDetails: { ...prev.startupDetails, focusArea: e.target.value }
                  }))}
                  placeholder="e.g., Education, Healthcare, Agriculture"
                />
              </div>

              <div>
                <Label htmlFor="targetImpact">Target Impact</Label>
                <Textarea
                  id="targetImpact"
                  value={onboardingData.startupDetails.targetImpact}
                  onChange={(e) => setOnboardingData(prev => ({
                    ...prev,
                    startupDetails: { ...prev.startupDetails, targetImpact: e.target.value }
                  }))}
                  placeholder="What positive change do you want to create?"
                  rows={3}
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-foundry-forest rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-foundry-forest mb-4">
                Covenant Commitment
              </h2>
              <p className="text-foundry-sage">
                Review and commit to your chosen path
              </p>
            </div>

            {onboardingData.covenant && (
              <Card className="p-6 bg-foundry-gold/5 border-foundry-gold">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-foundry-gold rounded-lg flex items-center justify-center">
                    <onboardingData.covenant.icon className="w-6 h-6 text-foundry-forest" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foundry-forest">
                      {onboardingData.covenant.name}
                    </h3>
                    <p className="text-foundry-sage">Your chosen covenant</p>
                  </div>
                </div>
                
                <blockquote className="text-foundry-sage italic border-l-4 border-foundry-gold pl-4 mb-6">
                  {onboardingData.covenant.quote}
                </blockquote>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="signature">Digital Signature *</Label>
                    <Input
                      id="signature"
                      value={onboardingData.digitalSignature}
                      onChange={(e) => setOnboardingData(prev => ({
                        ...prev,
                        digitalSignature: e.target.value
                      }))}
                      placeholder="Type your full name to sign"
                    />
                  </div>

                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="acceptTerms"
                      checked={onboardingData.acceptTerms}
                      onChange={(e) => setOnboardingData(prev => ({
                        ...prev,
                        acceptTerms: e.target.checked
                      }))}
                      className="mt-1"
                    />
                    <Label htmlFor="acceptTerms" className="text-sm leading-relaxed">
                      I commit to building my venture according to the {onboardingData.covenant.name} principles 
                      and accept the terms of the Foundry OS platform.
                    </Label>
                  </div>
                </div>
              </Card>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-card">
      <div className="container mx-auto px-6 py-8">
        {/* Progress Header */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" onClick={() => navigate("/")} className="text-foundry-sage">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <span className="text-foundry-sage">Step {currentStep} of 4</span>
          </div>
          
          <div className="w-full bg-foundry-sage/20 rounded-full h-2">
            <div 
              className="bg-foundry-gold h-2 rounded-full transition-all duration-300" 
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          <Card className="p-8">
            {renderStepContent()}
            
            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t border-border">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              
              <Button
                variant="default"
                onClick={handleNext}
                className="group"
              >
                {currentStep === 4 ? "Complete Journey" : "Continue"}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OnboardingWizard;