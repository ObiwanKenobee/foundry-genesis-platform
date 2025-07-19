import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  CheckCircle,
  Download,
  Mail,
  ArrowRight,
  Cross,
  Leaf,
  Lightbulb,
} from "lucide-react";

const OnboardingComplete = () => {
  const navigate = useNavigate();
  const [onboardingData, setOnboardingData] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem("onboarding_data");
    if (data) {
      setOnboardingData(JSON.parse(data));
    } else {
      // If no onboarding data, redirect to start
      navigate("/");
    }
  }, [navigate]);

  const handleDownloadCovenant = () => {
    // In a real app, this would generate and download a PDF
    const covenantText = `
FOUNDRY OS COVENANT AGREEMENT

Founder: ${onboardingData?.founderProfile?.name}
Covenant: ${onboardingData?.covenant?.name}
Project: ${onboardingData?.startupDetails?.projectName}
Date: ${new Date().toLocaleDateString()}

I commit to building my venture according to the ${onboardingData?.covenant?.name} principles:
${onboardingData?.covenant?.principles?.map((p: string) => `• ${p}`).join("\n")}

Guiding Scripture/Quote:
${onboardingData?.covenant?.quote}

Digital Signature: ${onboardingData?.digitalSignature}
    `;

    const blob = new Blob([covenantText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${onboardingData?.founderProfile?.name?.replace(/\s+/g, "_")}_Covenant.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!onboardingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-foundry-sage">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-card flex items-center justify-center">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Animation */}
          <div className="mb-8">
            <div className="w-24 h-24 bg-foundry-gold rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
              <CheckCircle className="w-12 h-12 text-foundry-forest" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foundry-forest mb-4 animate-fade-in">
              Welcome to Foundry OS!
            </h1>
            <p className="text-xl text-foundry-sage animate-fade-in">
              Your covenant has been established and your journey begins now.
            </p>
          </div>

          {/* Covenant Summary Card */}
          <Card className="p-8 mb-8 bg-white shadow-medium animate-fade-in">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-foundry-gold rounded-lg flex items-center justify-center">
                <onboardingData.covenant.icon className="w-8 h-8 text-foundry-forest" />
              </div>
              <div className="text-left">
                <h2 className="text-2xl font-bold text-foundry-forest">
                  {onboardingData.covenant.name}
                </h2>
                <p className="text-foundry-sage">Your chosen covenant</p>
              </div>
            </div>

            <blockquote className="text-foundry-sage italic border-l-4 border-foundry-gold pl-4 mb-6">
              {onboardingData.covenant.quote}
            </blockquote>

            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <h3 className="font-semibold text-foundry-forest mb-2">
                  Founder
                </h3>
                <p className="text-foundry-sage">
                  {onboardingData.founderProfile.name}
                </p>
                <p className="text-foundry-sage text-sm">
                  {onboardingData.founderProfile.email}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foundry-forest mb-2">
                  Venture
                </h3>
                <p className="text-foundry-sage">
                  {onboardingData.startupDetails.projectName}
                </p>
                <p className="text-foundry-sage text-sm">
                  {onboardingData.startupDetails.focusArea}
                </p>
              </div>
            </div>
          </Card>

          {/* Action Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card
              className="p-6 hover:shadow-medium transition-smooth cursor-pointer"
              onClick={handleDownloadCovenant}
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-foundry-forest rounded-lg flex items-center justify-center">
                  <Download className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-foundry-forest">
                    Download Covenant
                  </h3>
                  <p className="text-foundry-sage text-sm">
                    Save your commitment document
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-medium transition-smooth">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-foundry-forest rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-foundry-forest">
                    Email Sent
                  </h3>
                  <p className="text-foundry-sage text-sm">
                    Confirmation sent to your inbox
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="space-y-4">
            <Button
              variant="hero"
              size="lg"
              onClick={() => navigate("/dashboard")}
              className="group"
            >
              Enter Your Dashboard
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>

            <p className="text-foundry-sage text-sm">
              Begin tracking your venture's impact and connect with the kingdom
              builder community
            </p>
          </div>

          {/* Footer Message */}
          <div className="mt-12 p-6 bg-foundry-forest/5 rounded-lg">
            <p className="text-foundry-sage italic">
              "For we are his workmanship, created in Christ Jesus for good
              works, which God prepared beforehand, that we should walk in
              them." - Ephesians 2:10
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingComplete;
