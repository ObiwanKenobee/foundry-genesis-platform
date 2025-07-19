import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Brain,
  Cross,
  Building,
  Users,
  TrendingUp,
  CheckCircle2,
  Star,
  Target,
  Eye,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react";

interface PurposeScoreProps {
  founderData: any;
}

const PurposeScore = ({ founderData }: PurposeScoreProps) => {
  // Calculate metrics based on founder data
  const calculateClarity = () => {
    const profileFields = ["name", "email", "country", "bio", "calling"];
    const startupFields = ["projectName", "missionStatement", "impactType"];

    const profileCompletion =
      profileFields.filter((field) => founderData?.founderProfile?.[field])
        .length / profileFields.length;

    const startupCompletion =
      startupFields.filter((field) => founderData?.startupDetails?.[field])
        .length / startupFields.length;

    return Math.round(((profileCompletion + startupCompletion) / 2) * 100);
  };

  const calculateCovenantDepth = () => {
    // Based on reflections and covenant engagement
    const hasReflections = founderData?.missionTracker?.reflectionPrompt
      ? 1
      : 0;
    const hasWeeklyFocus = founderData?.missionTracker?.weeklyFocus ? 1 : 0;
    const hasPrayerIntention = founderData?.missionTracker?.prayerIntention
      ? 1
      : 0;
    const covenantSelected = founderData?.covenant ? 1 : 0;

    return Math.round(
      ((hasReflections +
        hasWeeklyFocus +
        hasPrayerIntention +
        covenantSelected) /
        4) *
        100,
    );
  };

  const calculateExecution = () => {
    // Based on completion of mission tracker and startup progress
    const hasProject = founderData?.startupDetails?.projectName ? 25 : 0;
    const hasMission = founderData?.startupDetails?.missionStatement ? 25 : 0;
    const hasReflection = founderData?.missionTracker?.reflectionPrompt
      ? 25
      : 0;
    const hasWeeklyGoal = founderData?.missionTracker?.weeklyFocus ? 25 : 0;

    return hasProject + hasMission + hasReflection + hasWeeklyGoal;
  };

  const calculateConsistency = () => {
    // Simulate consistency based on engagement
    const daysSinceJoining = founderData?.completedAt
      ? Math.floor(
          (new Date().getTime() - new Date(founderData.completedAt).getTime()) /
            (1000 * 60 * 60 * 24),
        )
      : 0;

    if (daysSinceJoining < 7) return 85;
    if (daysSinceJoining < 14) return 78;
    return 72;
  };

  const calculateSocialProof = () => {
    // Based on marketplace visibility and community engagement
    const isPublic = founderData?.marketplaceSettings?.isPublic ? 50 : 0;
    const allowsContact = founderData?.marketplaceSettings?.allowInvestorContact
      ? 30
      : 0;
    const hasComplete = founderData?.completedSteps?.length >= 5 ? 20 : 0;

    return isPublic + allowsContact + hasComplete;
  };

  const metrics = {
    clarity: calculateClarity(),
    covenantDepth: calculateCovenantDepth(),
    execution: calculateExecution(),
    consistency: calculateConsistency(),
    socialProof: calculateSocialProof(),
  };

  const overallScore = Math.round(
    (metrics.clarity +
      metrics.covenantDepth +
      metrics.execution +
      metrics.consistency +
      metrics.socialProof) /
      5,
  );

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90)
      return { label: "Excellent", color: "bg-green-100 text-green-800" };
    if (score >= 80)
      return { label: "Strong", color: "bg-blue-100 text-blue-800" };
    if (score >= 70)
      return { label: "Good", color: "bg-yellow-100 text-yellow-800" };
    if (score >= 60)
      return { label: "Developing", color: "bg-orange-100 text-orange-800" };
    return { label: "Building", color: "bg-red-100 text-red-800" };
  };

  const getNextSteps = () => {
    const steps = [];

    if (metrics.clarity < 80) {
      steps.push({
        title: "Complete your profile",
        description: "Add missing details to your founder and startup profiles",
        icon: Building,
        priority: "high",
      });
    }

    if (metrics.covenantDepth < 70) {
      steps.push({
        title: "Deepen spiritual practices",
        description: "Submit weekly reflections and set prayer intentions",
        icon: Cross,
        priority: "high",
      });
    }

    if (metrics.execution < 75) {
      steps.push({
        title: "Track mission progress",
        description: "Set weekly goals and track your startup milestones",
        icon: Target,
        priority: "medium",
      });
    }

    if (metrics.socialProof < 60) {
      steps.push({
        title: "Join the community",
        description:
          "Make your project visible and connect with other founders",
        icon: Users,
        priority: "medium",
      });
    }

    return steps;
  };

  const nextSteps = getNextSteps();

  return (
    <div className="space-y-6">
      {/* Overall Purpose Score */}
      <Card className="p-6 bg-gradient-card">
        <div className="text-center mb-6">
          <div className="w-24 h-24 mx-auto mb-4 relative">
            <svg
              className="w-24 h-24 transform -rotate-90"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-foundry-sage/20"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - overallScore / 100)}`}
                className="text-foundry-gold transition-all duration-1000"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div
                  className={`text-2xl font-bold ${getScoreColor(overallScore)}`}
                >
                  {overallScore}%
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-foundry-forest mb-2">
            Purpose Progress Score
          </h2>
          <Badge className={getScoreBadge(overallScore).color}>
            {getScoreBadge(overallScore).label}
          </Badge>
          <p className="text-foundry-sage mt-2">
            Your spiritual entrepreneurship alignment and growth trajectory
          </p>
        </div>
      </Card>

      {/* Detailed Metrics */}
      <Card className="p-6">
        <h3 className="text-xl font-bold text-foundry-forest mb-6 flex items-center">
          <Brain className="w-6 h-6 mr-2" />
          Purpose Breakdown
        </h3>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Building className="w-5 h-5 text-foundry-gold" />
              <div>
                <h4 className="font-semibold text-foundry-forest">
                  🧠 Clarity
                </h4>
                <p className="text-sm text-foundry-sage">
                  Profile & startup details completion
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Progress value={metrics.clarity} className="w-24" />
              <span className={`font-bold ${getScoreColor(metrics.clarity)}`}>
                {metrics.clarity}%
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Cross className="w-5 h-5 text-foundry-gold" />
              <div>
                <h4 className="font-semibold text-foundry-forest">
                  ✝️ Covenant Depth
                </h4>
                <p className="text-sm text-foundry-sage">
                  Spiritual reflections & engagement
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Progress value={metrics.covenantDepth} className="w-24" />
              <span
                className={`font-bold ${getScoreColor(metrics.covenantDepth)}`}
              >
                {metrics.covenantDepth}%
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Target className="w-5 h-5 text-foundry-gold" />
              <div>
                <h4 className="font-semibold text-foundry-forest">
                  🛠️ Execution
                </h4>
                <p className="text-sm text-foundry-sage">
                  Mission tracking & goal completion
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Progress value={metrics.execution} className="w-24" />
              <span className={`font-bold ${getScoreColor(metrics.execution)}`}>
                {metrics.execution}%
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-5 h-5 text-foundry-gold" />
              <div>
                <h4 className="font-semibold text-foundry-forest">
                  💡 Consistency
                </h4>
                <p className="text-sm text-foundry-sage">
                  Login & spiritual check-in streaks
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Progress value={metrics.consistency} className="w-24" />
              <span
                className={`font-bold ${getScoreColor(metrics.consistency)}`}
              >
                {metrics.consistency}%
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5 text-foundry-gold" />
              <div>
                <h4 className="font-semibold text-foundry-forest">
                  💬 Social Proof
                </h4>
                <p className="text-sm text-foundry-sage">
                  Community engagement & visibility
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Progress value={metrics.socialProof} className="w-24" />
              <span
                className={`font-bold ${getScoreColor(metrics.socialProof)}`}
              >
                {metrics.socialProof}%
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Next Steps */}
      {nextSteps.length > 0 && (
        <Card className="p-6">
          <h3 className="text-xl font-bold text-foundry-forest mb-4 flex items-center">
            <Star className="w-6 h-6 mr-2" />
            Recommended Next Steps
          </h3>
          <div className="space-y-4">
            {nextSteps.map((step, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-foundry-cream/50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      step.priority === "high" ? "bg-red-100" : "bg-yellow-100"
                    }`}
                  >
                    <step.icon
                      className={`w-5 h-5 ${
                        step.priority === "high"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foundry-forest">
                      {step.title}
                    </h4>
                    <p className="text-sm text-foundry-sage">
                      {step.description}
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <ArrowUpRight className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Graduation Status */}
      {overallScore >= 80 && (
        <Card className="p-6 bg-foundry-forest text-white">
          <div className="text-center">
            <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-foundry-gold" />
            <h3 className="text-xl font-bold mb-2">
              🎉 Ready for Pro Features!
            </h3>
            <p className="text-foundry-cream/90 mb-4">
              You've completed the Core Founder journey. Unlock advanced tools,
              mentorship, and funding opportunities.
            </p>
            <Button
              variant="secondary"
              className="bg-foundry-gold text-foundry-forest hover:bg-foundry-gold/90"
            >
              Upgrade to Pro
              <ArrowUpRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default PurposeScore;
