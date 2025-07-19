import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Cross,
  Leaf,
  Brain,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  User,
  Building,
  FileText,
  BookOpen,
  Heart,
  Target,
  Globe,
  Lightbulb,
  Download,
  MapPin,
  Eye,
  Calendar,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface CovenantType {
  id: string;
  name: string;
  icon: typeof Cross;
  description: string;
  principles: string[];
  quote: string;
  verse?: string;
}

interface FounderProfile {
  name: string;
  email: string;
  country: string;
  region: string;
  faithTradition: string;
  bio: string;
  calling: string;
  linkedIn?: string;
  website?: string;
}

interface StartupDetails {
  projectName: string;
  missionStatement: string;
  focusArea: string;
  targetImpact: string;
  impactType: string;
  regionOfOperation: string;
  stage: string;
  readiness: string;
  problemSolving: string;
}

interface MissionTracker {
  weeklyFocus: string;
  reflectionPrompt: string;
  prayerIntention: string;
  covenantScore: number;
}

interface MarketplaceSettings {
  isPublic: boolean;
  allowInvestorContact: boolean;
  fundingStage: string;
  fundingAmount: string;
}

interface OnboardingData {
  covenant: CovenantType | null;
  founderProfile: FounderProfile;
  startupDetails: StartupDetails;
  missionTracker: MissionTracker;
  marketplaceSettings: MarketplaceSettings;
  digitalSignature: string;
  acceptTerms: boolean;
  completedSteps: number[];
}

const OnboardingWizard = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;

  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    covenant: null,
    founderProfile: {
      name: "",
      email: "",
      country: "",
      region: "",
      faithTradition: "",
      bio: "",
      calling: "",
      linkedIn: "",
      website: "",
    },
    startupDetails: {
      projectName: "",
      missionStatement: "",
      focusArea: "",
      targetImpact: "",
      impactType: "",
      regionOfOperation: "",
      stage: "ideation",
      readiness: "idea",
      problemSolving: "",
    },
    missionTracker: {
      weeklyFocus: "",
      reflectionPrompt: "",
      prayerIntention: "",
      covenantScore: 0,
    },
    marketplaceSettings: {
      isPublic: false,
      allowInvestorContact: false,
      fundingStage: "not-seeking",
      fundingAmount: "",
    },
    digitalSignature: "",
    acceptTerms: false,
    completedSteps: [],
  });

  const covenants: CovenantType[] = [
    {
      id: "gospel",
      name: "Gospel Covenant",
      icon: Cross,
      description:
        "Build ventures grounded in Biblical principles, spreading the Gospel through business as mission.",
      principles: [
        "Kingdom First",
        "Servant Leadership",
        "Eternal Perspective",
        "Stewardship",
      ],
      quote:
        "But seek first the kingdom of God and his righteousness, and all these things will be added to you.",
      verse: "Matthew 6:33",
    },
    {
      id: "ecological",
      name: "Ecological Covenant",
      icon: Leaf,
      description:
        "Create sustainable ventures that honor creation and promote environmental stewardship.",
      principles: [
        "Creation Care",
        "Sustainability",
        "Regenerative Impact",
        "Earth Stewardship",
      ],
      quote:
        "The earth is the Lord's, and everything in it, the world, and all who live in it.",
      verse: "Psalm 24:1",
    },
    {
      id: "stoic",
      name: "Stoic Covenant",
      icon: Brain,
      description:
        "Develop ventures with philosophical wisdom, virtue, and rational decision-making.",
      principles: ["Virtue Ethics", "Wisdom", "Resilience", "Personal Growth"],
      quote: "The best revenge is not to be like your enemy.",
      verse: "Marcus Aurelius",
    },
  ];

  const countries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Germany",
    "France",
    "Australia",
    "New Zealand",
    "Brazil",
    "Mexico",
    "South Africa",
    "Nigeria",
    "Kenya",
    "India",
    "Philippines",
    "South Korea",
    "Japan",
    "Other",
  ];

  const faithTraditions = [
    "Christian - Protestant",
    "Christian - Catholic",
    "Christian - Orthodox",
    "Jewish",
    "Islamic",
    "Buddhist",
    "Hindu",
    "Secular Humanist",
    "Agnostic",
    "Spiritual but not Religious",
    "Other",
    "Prefer not to say",
  ];

  const impactTypes = [
    "Land Regeneration",
    "Education & Training",
    "Healthcare & Healing",
    "Poverty Alleviation",
    "Environmental Protection",
    "Technology for Good",
    "Community Development",
    "Food Security",
    "Clean Energy",
    "Mental Health",
    "Economic Empowerment",
    "Cultural Preservation",
    "Other",
  ];

  const fundingStages = [
    "Not seeking funding",
    "Pre-seed ($0-50K)",
    "Seed ($50K-500K)",
    "Series A ($500K-2M)",
    "Series B+ ($2M+)",
    "Grant funding only",
    "Exploring options",
  ];

  const getCovenantPrompt = (covenant: CovenantType | null) => {
    if (!covenant) return "What problem are you passionate about solving?";

    switch (covenant.id) {
      case "gospel":
        return "You are building with the spirit of Kingdom principles. What problem are you called to solve for God's glory?";
      case "ecological":
        return "You are building with the spirit of stewardship. What environmental or sustainability problem are you repairing?";
      case "stoic":
        return "You are building with philosophical wisdom. What problem requires virtue and rational thinking to solve?";
      default:
        return "What problem are you passionate about solving?";
    }
  };

  const updateData = (section: keyof OnboardingData, updates: any) => {
    setOnboardingData((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...updates },
    }));
  };

  const markStepComplete = (step: number) => {
    setOnboardingData((prev) => ({
      ...prev,
      completedSteps: [...new Set([...prev.completedSteps, step])],
    }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(
          onboardingData.founderProfile.name &&
          onboardingData.founderProfile.email &&
          onboardingData.founderProfile.country
        );
      case 2:
        return !!onboardingData.covenant;
      case 3:
        return !!(
          onboardingData.startupDetails.projectName &&
          onboardingData.startupDetails.missionStatement
        );
      case 4:
        return !!onboardingData.missionTracker.weeklyFocus;
      case 5:
        return true; // Marketplace settings are optional
      case 6:
        return !!(
          onboardingData.digitalSignature && onboardingData.acceptTerms
        );
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      markStepComplete(currentStep);
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      }
    } else {
      toast({
        title: "Please complete all required fields",
        description: "Some required information is missing.",
        variant: "destructive",
      });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateCovenantPDF = () => {
    if (!onboardingData.covenant) return;

    const pdfContent = `
FOUNDRY OS COVENANT AGREEMENT

Founder: ${onboardingData.founderProfile.name}
Email: ${onboardingData.founderProfile.email}
Date: ${new Date().toLocaleDateString()}

COVENANT TYPE: ${onboardingData.covenant.name}

GUIDING PRINCIPLE:
"${onboardingData.covenant.quote}" - ${onboardingData.covenant.verse}

CORE PRINCIPLES:
${onboardingData.covenant.principles.map((p) => `• ${p}`).join("\n")}

VENTURE MISSION:
Project: ${onboardingData.startupDetails.projectName}
Mission: ${onboardingData.startupDetails.missionStatement}
Impact Type: ${onboardingData.startupDetails.impactType}

SPIRITUAL COMMITMENT:
I commit to building my venture according to the ${onboardingData.covenant.name} principles outlined above. I will seek wisdom, act with integrity, and pursue sustainable impact that honors my faith and values.

Digital Signature: ${onboardingData.digitalSignature}
    `;

    const blob = new Blob([pdfContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${onboardingData.founderProfile.name.replace(/\s+/g, "_")}_Covenant.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const completeOnboarding = () => {
    if (!validateStep(currentStep)) return;

    const completionData = {
      ...onboardingData,
      completedAt: new Date().toISOString(),
      founderId: Math.random().toString(36).substr(2, 9),
    };

    localStorage.setItem(
      "foundry_token",
      Math.random().toString(36).substr(2, 16),
    );
    localStorage.setItem("onboarding_data", JSON.stringify(completionData));

    toast({
      title: "Welcome to Foundry OS!",
      description: "Your spiritual entrepreneurship journey begins now.",
    });

    navigate("/onboarding/complete");
  };

  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card className="p-8">
            <div className="text-center mb-8">
              <User className="w-16 h-16 mx-auto mb-4 text-foundry-gold" />
              <h2 className="text-3xl font-bold text-foundry-forest mb-2">
                🧑‍💻 Founder Identity & Profile Setup
              </h2>
              <p className="text-foundry-sage">
                Establish the person behind the purpose.
              </p>
            </div>

            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={onboardingData.founderProfile.name}
                    onChange={(e) =>
                      updateData("founderProfile", { name: e.target.value })
                    }
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={onboardingData.founderProfile.email}
                    onChange={(e) =>
                      updateData("founderProfile", { email: e.target.value })
                    }
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="country">Country / Region *</Label>
                  <Select
                    value={onboardingData.founderProfile.country}
                    onValueChange={(value) =>
                      updateData("founderProfile", { country: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="region">Specific Region/State</Label>
                  <Input
                    id="region"
                    value={onboardingData.founderProfile.region}
                    onChange={(e) =>
                      updateData("founderProfile", { region: e.target.value })
                    }
                    placeholder="State, Province, or Region"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="faithTradition">Faith Tradition</Label>
                <Select
                  value={onboardingData.founderProfile.faithTradition}
                  onValueChange={(value) =>
                    updateData("founderProfile", { faithTradition: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your faith tradition" />
                  </SelectTrigger>
                  <SelectContent>
                    {faithTraditions.map((tradition) => (
                      <SelectItem key={tradition} value={tradition}>
                        {tradition}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="calling">Your Calling or Origin Story</Label>
                <Textarea
                  id="calling"
                  value={onboardingData.founderProfile.calling}
                  onChange={(e) =>
                    updateData("founderProfile", { calling: e.target.value })
                  }
                  placeholder="Share your story... What led you to entrepreneurship? What's your calling?"
                  rows={4}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="linkedin">LinkedIn (Optional)</Label>
                  <Input
                    id="linkedin"
                    value={onboardingData.founderProfile.linkedIn}
                    onChange={(e) =>
                      updateData("founderProfile", { linkedIn: e.target.value })
                    }
                    placeholder="linkedin.com/in/yourprofile"
                  />
                </div>
                <div>
                  <Label htmlFor="website">Personal Website (Optional)</Label>
                  <Input
                    id="website"
                    value={onboardingData.founderProfile.website}
                    onChange={(e) =>
                      updateData("founderProfile", { website: e.target.value })
                    }
                    placeholder="yourwebsite.com"
                  />
                </div>
              </div>
            </div>
          </Card>
        );

      case 2:
        return (
          <Card className="p-8">
            <div className="text-center mb-8">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-foundry-gold" />
              <h2 className="text-3xl font-bold text-foundry-forest mb-2">
                🕊️ Covenant Generator + Scripture Guidance
              </h2>
              <p className="text-foundry-sage">
                Turn your moral center into a guiding framework for startup
                decisions.
              </p>
            </div>

            <div className="grid gap-6 max-w-4xl mx-auto">
              {covenants.map((covenant) => (
                <Card
                  key={covenant.id}
                  className={`p-6 cursor-pointer transition-all duration-300 border-2 ${
                    onboardingData.covenant?.id === covenant.id
                      ? "border-foundry-gold bg-foundry-gold/5 shadow-medium"
                      : "border-foundry-sage/20 hover:border-foundry-gold/50 hover:shadow-soft"
                  }`}
                  onClick={() => updateData("covenant", covenant)}
                >
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <div
                        className={`w-16 h-16 rounded-xl flex items-center justify-center ${
                          onboardingData.covenant?.id === covenant.id
                            ? "bg-foundry-gold text-foundry-forest"
                            : "bg-foundry-sage/10 text-foundry-sage"
                        }`}
                      >
                        <covenant.icon className="w-8 h-8" />
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="text-xl font-bold text-foundry-forest">
                          {covenant.name}
                        </h3>
                        {onboardingData.covenant?.id === covenant.id && (
                          <CheckCircle className="w-6 h-6 text-foundry-gold" />
                        )}
                      </div>

                      <p className="text-foundry-sage mb-4">
                        {covenant.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {covenant.principles.map((principle) => (
                          <Badge
                            key={principle}
                            variant="secondary"
                            className="bg-foundry-cream text-foundry-forest"
                          >
                            {principle}
                          </Badge>
                        ))}
                      </div>

                      <blockquote className="italic text-foundry-sage border-l-4 border-foundry-gold pl-4">
                        "{covenant.quote}" - {covenant.verse}
                      </blockquote>
                    </div>
                  </div>
                </Card>
              ))}

              {onboardingData.covenant && (
                <Card className="p-6 bg-foundry-forest text-white">
                  <div className="text-center">
                    <h3 className="text-xl font-bold mb-2">
                      Covenant Selected!
                    </h3>
                    <p className="text-foundry-cream/90 mb-4">
                      You've chosen the {onboardingData.covenant.name}. This
                      will guide your venture decisions and connect you with
                      like-minded builders.
                    </p>
                    <Button
                      variant="secondary"
                      onClick={generateCovenantPDF}
                      className="bg-foundry-gold text-foundry-forest hover:bg-foundry-gold/90"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Covenant Summary
                    </Button>
                  </div>
                </Card>
              )}
            </div>
          </Card>
        );

      case 3:
        return (
          <Card className="p-8">
            <div className="text-center mb-8">
              <Building className="w-16 h-16 mx-auto mb-4 text-foundry-gold" />
              <h2 className="text-3xl font-bold text-foundry-forest mb-2">
                ✍️ Startup Profile + Idea Builder
              </h2>
              <p className="text-foundry-sage">
                Translate your calling into a tangible, mission-driven venture
                idea.
              </p>
            </div>

            <div className="space-y-6 max-w-2xl mx-auto">
              <div>
                <Label htmlFor="projectName">Startup Name *</Label>
                <Input
                  id="projectName"
                  value={onboardingData.startupDetails.projectName}
                  onChange={(e) =>
                    updateData("startupDetails", {
                      projectName: e.target.value,
                    })
                  }
                  placeholder="Your project name"
                />
              </div>

              <div>
                <Label htmlFor="missionStatement">Mission Statement *</Label>
                <Textarea
                  id="missionStatement"
                  value={onboardingData.startupDetails.missionStatement}
                  onChange={(e) =>
                    updateData("startupDetails", {
                      missionStatement: e.target.value,
                    })
                  }
                  placeholder="What you're building and why (2-3 sentences)"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="impactType">Impact Type</Label>
                <Select
                  value={onboardingData.startupDetails.impactType}
                  onValueChange={(value) =>
                    updateData("startupDetails", { impactType: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your primary impact area" />
                  </SelectTrigger>
                  <SelectContent>
                    {impactTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="regionOfOperation">Region of Operation</Label>
                <Input
                  id="regionOfOperation"
                  value={onboardingData.startupDetails.regionOfOperation}
                  onChange={(e) =>
                    updateData("startupDetails", {
                      regionOfOperation: e.target.value,
                    })
                  }
                  placeholder="Where will your venture operate?"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="stage">Current Stage</Label>
                  <Select
                    value={onboardingData.startupDetails.stage}
                    onValueChange={(value) =>
                      updateData("startupDetails", { stage: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select stage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ideation">Ideation</SelectItem>
                      <SelectItem value="prototype">Prototype</SelectItem>
                      <SelectItem value="mvp">MVP</SelectItem>
                      <SelectItem value="launch">In Launch</SelectItem>
                      <SelectItem value="growth">Growth</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="readiness">Readiness Level</Label>
                  <Select
                    value={onboardingData.startupDetails.readiness}
                    onValueChange={(value) =>
                      updateData("startupDetails", { readiness: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select readiness" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="idea">Idea</SelectItem>
                      <SelectItem value="prototype">Prototype</SelectItem>
                      <SelectItem value="launch">In Launch</SelectItem>
                      <SelectItem value="scaling">Scaling</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Card className="p-6 bg-foundry-gold/5 border-foundry-gold/30">
                <div className="flex items-start space-x-3">
                  <Lightbulb className="w-6 h-6 text-foundry-gold flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-foundry-forest mb-2">
                      Scripture-Guided Prompt
                    </h4>
                    <p className="text-foundry-sage mb-3">
                      {getCovenantPrompt(onboardingData.covenant)}
                    </p>
                    <Textarea
                      value={onboardingData.startupDetails.problemSolving}
                      onChange={(e) =>
                        updateData("startupDetails", {
                          problemSolving: e.target.value,
                        })
                      }
                      placeholder="Describe the problem you're solving and your approach..."
                      rows={4}
                    />
                  </div>
                </div>
              </Card>
            </div>
          </Card>
        );

      case 4:
        return (
          <Card className="p-8">
            <div className="text-center mb-8">
              <Heart className="w-16 h-16 mx-auto mb-4 text-foundry-gold" />
              <h2 className="text-3xl font-bold text-foundry-forest mb-2">
                🧘 Mission Tracker + Spiritual Reflections
              </h2>
              <p className="text-foundry-sage">
                Foster internal alignment while building externally.
              </p>
            </div>

            <div className="space-y-6 max-w-2xl mx-auto">
              <Card className="p-6 bg-foundry-cream/50">
                <h3 className="text-lg font-semibold text-foundry-forest mb-4 flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  🌤️ Weekly Mission Focus
                </h3>
                <Label htmlFor="weeklyFocus">My goal this week is to...</Label>
                <Textarea
                  id="weeklyFocus"
                  value={onboardingData.missionTracker.weeklyFocus}
                  onChange={(e) =>
                    updateData("missionTracker", {
                      weeklyFocus: e.target.value,
                    })
                  }
                  placeholder="Set your weekly mission focus..."
                  rows={3}
                />
              </Card>

              <Card className="p-6 bg-foundry-cream/50">
                <h3 className="text-lg font-semibold text-foundry-forest mb-4 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  📖 Reflection Prompt
                </h3>
                <Label htmlFor="reflectionPrompt">
                  {onboardingData.covenant?.id === "gospel" &&
                    "How did I reflect Christ in my actions this week?"}
                  {onboardingData.covenant?.id === "ecological" &&
                    "How did I honor creation in my decisions this week?"}
                  {onboardingData.covenant?.id === "stoic" &&
                    "How did I practice virtue and wisdom this week?"}
                  {!onboardingData.covenant &&
                    "How did I align with my values this week?"}
                </Label>
                <Textarea
                  id="reflectionPrompt"
                  value={onboardingData.missionTracker.reflectionPrompt}
                  onChange={(e) =>
                    updateData("missionTracker", {
                      reflectionPrompt: e.target.value,
                    })
                  }
                  placeholder="Reflect on your week..."
                  rows={4}
                />
              </Card>

              <Card className="p-6 bg-foundry-cream/50">
                <h3 className="text-lg font-semibold text-foundry-forest mb-4 flex items-center">
                  <Heart className="w-5 h-5 mr-2" />
                  🙏 Prayer/Intention Setting
                </h3>
                <Label htmlFor="prayerIntention">
                  I am seeking clarity/wisdom in...
                </Label>
                <Textarea
                  id="prayerIntention"
                  value={onboardingData.missionTracker.prayerIntention}
                  onChange={(e) =>
                    updateData("missionTracker", {
                      prayerIntention: e.target.value,
                    })
                  }
                  placeholder="Share your prayer intentions or areas where you seek guidance..."
                  rows={3}
                />
              </Card>

              <Card className="p-6 bg-foundry-forest text-white">
                <h3 className="text-lg font-semibold mb-4">
                  🧠 Covenant Consistency Score
                </h3>
                <p className="text-foundry-cream/90 mb-4">
                  Each submission contributes to your alignment score. Regular
                  reflection builds spiritual momentum.
                </p>
                <div className="flex items-center space-x-3">
                  <Progress value={75} className="flex-1" />
                  <span className="font-bold">75%</span>
                </div>
                <p className="text-sm text-foundry-cream/80 mt-2">
                  Strong foundation! Continue building consistent practices.
                </p>
              </Card>
            </div>
          </Card>
        );

      case 5:
        return (
          <Card className="p-8">
            <div className="text-center mb-8">
              <Globe className="w-16 h-16 mx-auto mb-4 text-foundry-gold" />
              <h2 className="text-3xl font-bold text-foundry-forest mb-2">
                💸 Public Capital Marketplace (Basic)
              </h2>
              <p className="text-foundry-sage">
                Signal project readiness to values-aligned investors.
              </p>
            </div>

            <div className="space-y-6 max-w-2xl mx-auto">
              <Card className="p-6 border-foundry-gold/30">
                <h3 className="text-lg font-semibold text-foundry-forest mb-4">
                  Marketplace Visibility Settings
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="isPublic"
                      checked={onboardingData.marketplaceSettings.isPublic}
                      onCheckedChange={(checked) =>
                        updateData("marketplaceSettings", { isPublic: checked })
                      }
                    />
                    <Label htmlFor="isPublic" className="flex-1">
                      <div>
                        <div className="font-medium">
                          Make project visible to investors
                        </div>
                        <div className="text-sm text-foundry-sage">
                          Show startup name, mission, and impact tags (no full
                          deck)
                        </div>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="allowContact"
                      checked={
                        onboardingData.marketplaceSettings.allowInvestorContact
                      }
                      onCheckedChange={(checked) =>
                        updateData("marketplaceSettings", {
                          allowInvestorContact: checked,
                        })
                      }
                    />
                    <Label htmlFor="allowContact" className="flex-1">
                      <div>
                        <div className="font-medium">
                          Allow investor notifications
                        </div>
                        <div className="text-sm text-foundry-sage">
                          Receive notifications when investors match your
                          covenant + region + theme
                        </div>
                      </div>
                    </Label>
                  </div>
                </div>
              </Card>

              <div>
                <Label htmlFor="fundingStage">Current Funding Stage</Label>
                <Select
                  value={onboardingData.marketplaceSettings.fundingStage}
                  onValueChange={(value) =>
                    updateData("marketplaceSettings", { fundingStage: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select funding stage" />
                  </SelectTrigger>
                  <SelectContent>
                    {fundingStages.map((stage) => (
                      <SelectItem key={stage} value={stage}>
                        {stage}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="fundingAmount">
                  Target Funding Amount (Optional)
                </Label>
                <Input
                  id="fundingAmount"
                  value={onboardingData.marketplaceSettings.fundingAmount}
                  onChange={(e) =>
                    updateData("marketplaceSettings", {
                      fundingAmount: e.target.value,
                    })
                  }
                  placeholder="e.g., $50,000 - $250,000"
                />
              </div>

              <Card className="p-6 bg-yellow-50 border-yellow-200">
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                  Free Tier Limitations
                </h3>
                <ul className="text-yellow-700 space-y-1 text-sm">
                  <li>• No pitch deck upload (Pro feature)</li>
                  <li>• No direct investor introductions (Pro feature)</li>
                  <li>
                    • No detailed analytics on investor views (Pro feature)
                  </li>
                  <li>• Basic matching based on covenant + region only</li>
                </ul>
                <p className="text-yellow-600 text-sm mt-3">
                  Upgrade to Pro after completing your founder journey for
                  advanced features.
                </p>
              </Card>
            </div>
          </Card>
        );

      case 6:
        return (
          <Card className="p-8">
            <div className="text-center mb-8">
              <FileText className="w-16 h-16 mx-auto mb-4 text-foundry-gold" />
              <h2 className="text-3xl font-bold text-foundry-forest mb-2">
                📝 Digital Covenant Signing
              </h2>
              <p className="text-foundry-sage">
                Commit to your spiritual entrepreneurship journey.
              </p>
            </div>

            <div className="space-y-6 max-w-2xl mx-auto">
              {onboardingData.covenant && (
                <Card className="p-6 bg-foundry-cream/50">
                  <h3 className="text-lg font-semibold text-foundry-forest mb-4">
                    Your Covenant Summary
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <strong>Name:</strong>{" "}
                      {onboardingData.founderProfile.name}
                    </div>
                    <div>
                      <strong>Covenant:</strong> {onboardingData.covenant.name}
                    </div>
                    <div>
                      <strong>Project:</strong>{" "}
                      {onboardingData.startupDetails.projectName}
                    </div>
                    <div>
                      <strong>Mission:</strong>{" "}
                      {onboardingData.startupDetails.missionStatement}
                    </div>
                  </div>
                </Card>
              )}

              <div>
                <Label htmlFor="signature">Digital Signature *</Label>
                <Input
                  id="signature"
                  value={onboardingData.digitalSignature}
                  onChange={(e) =>
                    updateData("digitalSignature", e.target.value)
                  }
                  placeholder="Type your full name as your digital signature"
                />
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="terms"
                  checked={onboardingData.acceptTerms}
                  onCheckedChange={(checked) =>
                    setOnboardingData((prev) => ({
                      ...prev,
                      acceptTerms: !!checked,
                    }))
                  }
                />
                <Label htmlFor="terms" className="text-sm leading-relaxed">
                  I commit to building my venture according to the{" "}
                  {onboardingData.covenant?.name || "selected"} principles. I
                  will seek wisdom, act with integrity, and pursue sustainable
                  impact that honors my faith and values. I understand this is a
                  spiritual commitment to excellence in entrepreneurship.
                </Label>
              </div>

              <Card className="p-6 bg-foundry-forest text-white">
                <h3 className="text-lg font-semibold mb-3">
                  🎉 Ready to Begin?
                </h3>
                <p className="text-foundry-cream/90 mb-4">
                  Complete your covenant signing to unlock your Foundry OS
                  dashboard and begin your guided entrepreneurship journey.
                </p>
                <div className="flex items-center space-x-2 text-foundry-cream/80 text-sm">
                  <CheckCircle className="w-4 h-4" />
                  <span>Spiritual foundation established</span>
                </div>
              </Card>
            </div>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-foundry-cream">
      {/* Header */}
      <div className="bg-white border-b border-foundry-sage/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-foundry-forest rounded-lg flex items-center justify-center">
                <Cross className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foundry-forest">
                  Foundry OS
                </h1>
                <p className="text-sm text-foundry-sage">
                  Spiritual Entrepreneurship Platform
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-foundry-sage">
                Step {currentStep} of {totalSteps}
              </p>
              <p className="text-xs text-foundry-sage">Free Tier Setup</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b border-foundry-sage/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foundry-forest">
              {Math.round(progressPercentage)}% Complete
            </span>
            <span className="text-sm text-foundry-sage">
              {onboardingData.completedSteps.length} of {totalSteps} steps done
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {renderStep()}

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 max-w-2xl mx-auto">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="border-foundry-sage/30 text-foundry-sage hover:bg-foundry-sage/5"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          {currentStep < totalSteps ? (
            <Button onClick={nextStep} variant="hero">
              Next Step
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={completeOnboarding} variant="hero">
              Complete Journey
              <CheckCircle className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingWizard;
