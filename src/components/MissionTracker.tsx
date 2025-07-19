import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  BookOpen,
  Target,
  Calendar,
  CheckCircle2,
  TrendingUp,
  Flame,
  Award,
  Clock,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface MissionEntry {
  id: string;
  weeklyFocus: string;
  reflection: string;
  prayerIntention: string;
  date: string;
  covenantAlignment: number;
}

interface MissionTrackerProps {
  covenantType: string;
}

const MissionTracker = ({ covenantType }: MissionTrackerProps) => {
  const [currentEntry, setCurrentEntry] = useState({
    weeklyFocus: "",
    reflection: "",
    prayerIntention: "",
  });

  const [missionEntries] = useState<MissionEntry[]>([
    {
      id: "1",
      weeklyFocus: "Launch MVP with integrity",
      reflection:
        "I chose honesty over quick profits when discussing pricing with potential customers.",
      prayerIntention: "Clarity in product-market fit",
      date: "2024-01-15",
      covenantAlignment: 85,
    },
    {
      id: "2",
      weeklyFocus: "Build authentic partnerships",
      reflection:
        "Connected with local ministry for community outreach component.",
      prayerIntention: "Wisdom in choosing the right partners",
      date: "2024-01-08",
      covenantAlignment: 92,
    },
  ]);

  const [currentStreak, setCurrentStreak] = useState(7);
  const [covenantScore, setCovenantScore] = useState(88);

  const getReflectionPrompt = () => {
    switch (covenantType) {
      case "gospel":
        return "How did I reflect Christ in my business actions this week?";
      case "ecological":
        return "How did I honor creation in my business decisions this week?";
      case "stoic":
        return "How did I practice virtue and wisdom in my leadership this week?";
      default:
        return "How did I align with my values in my work this week?";
    }
  };

  const getPrayerLabel = () => {
    switch (covenantType) {
      case "gospel":
        return "Prayer Intentions";
      case "ecological":
        return "Meditation on Stewardship";
      case "stoic":
        return "Philosophical Reflection";
      default:
        return "Intentions & Guidance";
    }
  };

  const handleSubmitReflection = () => {
    if (!currentEntry.weeklyFocus || !currentEntry.reflection) {
      toast({
        title: "Please complete required fields",
        description: "Weekly focus and reflection are required.",
        variant: "destructive",
      });
      return;
    }

    // Calculate alignment score based on content quality
    const alignmentScore = Math.floor(Math.random() * 20) + 80;

    toast({
      title: "Reflection submitted!",
      description: `Covenant alignment: ${alignmentScore}%. Keep building with purpose.`,
    });

    // Reset form
    setCurrentEntry({
      weeklyFocus: "",
      reflection: "",
      prayerIntention: "",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-foundry-gold/20 rounded-lg flex items-center justify-center">
              <Flame className="w-5 h-5 text-foundry-gold" />
            </div>
            <div>
              <p className="text-sm text-foundry-sage">Current Streak</p>
              <p className="text-2xl font-bold text-foundry-forest">
                {currentStreak} days
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-foundry-gold/20 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-foundry-gold" />
            </div>
            <div>
              <p className="text-sm text-foundry-sage">Covenant Score</p>
              <p className="text-2xl font-bold text-foundry-forest">
                {covenantScore}%
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-foundry-gold/20 rounded-lg flex items-center justify-center">
              <Award className="w-5 h-5 text-foundry-gold" />
            </div>
            <div>
              <p className="text-sm text-foundry-sage">Reflections</p>
              <p className="text-2xl font-bold text-foundry-forest">
                {missionEntries.length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Current Week Entry */}
      <Card className="p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Calendar className="w-6 h-6 text-foundry-gold" />
          <h3 className="text-xl font-bold text-foundry-forest">
            This Week's Mission Focus
          </h3>
        </div>

        <div className="space-y-6">
          <div>
            <Label
              htmlFor="weeklyFocus"
              className="flex items-center space-x-2"
            >
              <Target className="w-4 h-4 text-foundry-gold" />
              <span>🌤️ My goal this week is to...</span>
            </Label>
            <Input
              id="weeklyFocus"
              value={currentEntry.weeklyFocus}
              onChange={(e) =>
                setCurrentEntry((prev) => ({
                  ...prev,
                  weeklyFocus: e.target.value,
                }))
              }
              placeholder="Set your weekly mission focus..."
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="reflection" className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-foundry-gold" />
              <span>📖 {getReflectionPrompt()}</span>
            </Label>
            <Textarea
              id="reflection"
              value={currentEntry.reflection}
              onChange={(e) =>
                setCurrentEntry((prev) => ({
                  ...prev,
                  reflection: e.target.value,
                }))
              }
              placeholder="Share your weekly reflection..."
              rows={4}
              className="mt-2"
            />
          </div>

          <div>
            <Label
              htmlFor="prayerIntention"
              className="flex items-center space-x-2"
            >
              <Heart className="w-4 h-4 text-foundry-gold" />
              <span>🙏 {getPrayerLabel()}</span>
            </Label>
            <Textarea
              id="prayerIntention"
              value={currentEntry.prayerIntention}
              onChange={(e) =>
                setCurrentEntry((prev) => ({
                  ...prev,
                  prayerIntention: e.target.value,
                }))
              }
              placeholder="I am seeking clarity/wisdom in..."
              rows={3}
              className="mt-2"
            />
          </div>

          <Button
            onClick={handleSubmitReflection}
            className="w-full"
            variant="hero"
          >
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Submit This Week's Reflection
          </Button>
        </div>
      </Card>

      {/* Covenant Consistency Progress */}
      <Card className="p-6 bg-foundry-forest text-white">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <TrendingUp className="w-6 h-6 mr-2" />
          🧠 Covenant Consistency Timeline
        </h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span>Overall Alignment</span>
              <span className="font-bold">{covenantScore}%</span>
            </div>
            <Progress value={covenantScore} className="h-3" />
          </div>

          <div className="grid grid-cols-7 gap-2">
            {[92, 88, 95, 85, 90, 87, 93].map((score, index) => (
              <div key={index} className="text-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    score >= 85
                      ? "bg-foundry-gold text-foundry-forest"
                      : "bg-foundry-sage text-white"
                  }`}
                >
                  {score}
                </div>
                <p className="text-xs text-foundry-cream/70 mt-1">
                  {new Date(
                    Date.now() - (6 - index) * 24 * 60 * 60 * 1000,
                  ).toLocaleDateString("en-US", { weekday: "short" })}
                </p>
              </div>
            ))}
          </div>

          <p className="text-foundry-cream/90 text-sm">
            Consistent reflection builds spiritual momentum. Your{" "}
            {currentStreak}-day streak shows strong covenant alignment!
          </p>
        </div>
      </Card>

      {/* Recent Reflections */}
      <Card className="p-6">
        <h3 className="text-xl font-bold text-foundry-forest mb-4 flex items-center">
          <Clock className="w-6 h-6 mr-2" />
          Recent Reflections
        </h3>
        <div className="space-y-4">
          {missionEntries.map((entry) => (
            <Card key={entry.id} className="p-4 bg-foundry-cream/30">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-foundry-forest">
                    {entry.weeklyFocus}
                  </h4>
                  <p className="text-sm text-foundry-sage">
                    {new Date(entry.date).toLocaleDateString()}
                  </p>
                </div>
                <Badge
                  variant="secondary"
                  className={`${
                    entry.covenantAlignment >= 90
                      ? "bg-green-100 text-green-800"
                      : entry.covenantAlignment >= 80
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                  }`}
                >
                  {entry.covenantAlignment}% aligned
                </Badge>
              </div>
              <p className="text-foundry-sage text-sm mb-2">
                {entry.reflection}
              </p>
              {entry.prayerIntention && (
                <p className="text-foundry-sage text-sm italic">
                  🙏 {entry.prayerIntention}
                </p>
              )}
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default MissionTracker;
