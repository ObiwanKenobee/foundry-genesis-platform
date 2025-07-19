import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  DollarSign,
  Eye,
  EyeOff,
  Users,
  MapPin,
  Cross,
  Leaf,
  Brain,
  TrendingUp,
  Heart,
  Star,
  Lock,
  ArrowUpRight,
  Mail,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface CapitalMarketplaceProps {
  founderData: any;
}

interface InvestorMatch {
  id: string;
  name: string;
  type: string;
  focus: string[];
  covenantAlignment: string;
  region: string;
  fundingRange: string;
  description: string;
  matchScore: number;
  isActive: boolean;
}

const CapitalMarketplace = ({ founderData }: CapitalMarketplaceProps) => {
  const [isPublicVisible, setIsPublicVisible] = useState(
    founderData?.marketplaceSettings?.isPublic || false,
  );
  const [allowNotifications, setAllowNotifications] = useState(
    founderData?.marketplaceSettings?.allowInvestorContact || false,
  );

  // Sample investor matches based on covenant
  const getInvestorMatches = (): InvestorMatch[] => {
    const covenantType = founderData?.covenant?.name?.toLowerCase();

    if (covenantType?.includes("gospel")) {
      return [
        {
          id: "1",
          name: "Kingdom Seed Fund",
          type: "Faith-based VC",
          focus: ["Kingdom Business", "Mission-Driven", "Gospel Impact"],
          covenantAlignment: "Gospel",
          region: "North America",
          fundingRange: "$25K - $250K",
          description:
            "Investing in ventures that advance God's kingdom through business excellence.",
          matchScore: 92,
          isActive: true,
        },
        {
          id: "2",
          name: "Praxis Capital",
          type: "Christian Angel Network",
          focus: [
            "Redemptive Entrepreneurship",
            "Social Impact",
            "Ministry Integration",
          ],
          covenantAlignment: "Gospel",
          region: "Global",
          fundingRange: "$10K - $100K",
          description:
            "Supporting Christians building ventures for human flourishing.",
          matchScore: 88,
          isActive: true,
        },
        {
          id: "3",
          name: "Legacy Investment Group",
          type: "Family Office",
          focus: [
            "Generational Impact",
            "Christian Values",
            "Leadership Development",
          ],
          covenantAlignment: "Gospel",
          region: "United States",
          fundingRange: "$50K - $500K",
          description:
            "Multi-generational family committed to kingdom investing.",
          matchScore: 85,
          isActive: false,
        },
      ];
    } else if (covenantType?.includes("ecological")) {
      return [
        {
          id: "4",
          name: "Terra Impact Ventures",
          type: "Climate VC",
          focus: [
            "Climate Solutions",
            "Regenerative Business",
            "Environmental Tech",
          ],
          covenantAlignment: "Ecological",
          region: "Global",
          fundingRange: "$50K - $2M",
          description:
            "Backing ventures that restore the planet while building sustainable businesses.",
          matchScore: 94,
          isActive: true,
        },
        {
          id: "5",
          name: "Green Covenant Fund",
          type: "ESG Investment Fund",
          focus: ["Sustainability", "Creation Care", "Environmental Justice"],
          covenantAlignment: "Ecological",
          region: "Europe & North America",
          fundingRange: "$25K - $500K",
          description:
            "Faith-motivated environmental investing for creation stewardship.",
          matchScore: 89,
          isActive: true,
        },
      ];
    } else if (covenantType?.includes("stoic")) {
      return [
        {
          id: "6",
          name: "Rational Capital Partners",
          type: "Philosophy-driven VC",
          focus: [
            "Virtue-based Leadership",
            "Rational Business Models",
            "Long-term Thinking",
          ],
          covenantAlignment: "Stoic",
          region: "Global",
          fundingRange: "$100K - $1M",
          description:
            "Investing in founders who lead with wisdom, virtue, and rational decision-making.",
          matchScore: 87,
          isActive: true,
        },
        {
          id: "7",
          name: "Wisdom Fund",
          type: "Patient Capital",
          focus: [
            "Philosophical Innovation",
            "Character-driven",
            "Sustainable Growth",
          ],
          covenantAlignment: "Stoic",
          region: "North America",
          fundingRange: "$50K - $300K",
          description:
            "Supporting entrepreneurs who build with virtue and philosophical depth.",
          matchScore: 83,
          isActive: false,
        },
      ];
    }

    return [];
  };

  const investorMatches = getInvestorMatches();
  const activeMatches = investorMatches.filter((m) => m.isActive);

  const getCovenantIcon = (covenant: string) => {
    if (covenant === "Gospel") return Cross;
    if (covenant === "Ecological") return Leaf;
    if (covenant === "Stoic") return Brain;
    return Star;
  };

  const handleVisibilityToggle = (checked: boolean) => {
    setIsPublicVisible(checked);

    if (checked) {
      toast({
        title: "Project now visible to investors",
        description:
          "Your venture is now discoverable by values-aligned investors.",
      });
    } else {
      toast({
        title: "Project hidden from marketplace",
        description: "Your venture is no longer visible to investors.",
      });
    }
  };

  const handleNotificationToggle = (checked: boolean) => {
    setAllowNotifications(checked);

    if (checked) {
      toast({
        title: "Investor notifications enabled",
        description:
          "You'll receive notifications when new investors match your profile.",
      });
    }
  };

  const handleContactInvestor = (investor: InvestorMatch) => {
    toast({
      title: "Pro feature required",
      description:
        "Direct investor contact is available in Pro tier. Complete your founder journey to unlock!",
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      {/* Marketplace Settings */}
      <Card className="p-6">
        <h3 className="text-xl font-bold text-foundry-forest mb-4 flex items-center">
          <Eye className="w-6 h-6 mr-2" />
          Marketplace Visibility
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-foundry-cream/50 rounded-lg">
            <div>
              <Label
                htmlFor="public-toggle"
                className="font-medium text-foundry-forest"
              >
                Make project visible to investors
              </Label>
              <p className="text-sm text-foundry-sage">
                Show startup name, mission, and impact tags (no full deck)
              </p>
            </div>
            <Switch
              id="public-toggle"
              checked={isPublicVisible}
              onCheckedChange={handleVisibilityToggle}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-foundry-cream/50 rounded-lg">
            <div>
              <Label
                htmlFor="notification-toggle"
                className="font-medium text-foundry-forest"
              >
                Allow investor notifications
              </Label>
              <p className="text-sm text-foundry-sage">
                Receive notifications when investors match your covenant +
                region + theme
              </p>
            </div>
            <Switch
              id="notification-toggle"
              checked={allowNotifications}
              onCheckedChange={handleNotificationToggle}
            />
          </div>
        </div>

        {/* Current Project Preview */}
        {isPublicVisible && founderData?.startupDetails && (
          <Card className="mt-6 p-4 bg-foundry-gold/5 border-foundry-gold/30">
            <h4 className="font-semibold text-foundry-forest mb-2">
              Your Public Profile Preview
            </h4>
            <div className="space-y-2 text-sm">
              <div>
                <strong>Project:</strong>{" "}
                {founderData.startupDetails.projectName}
              </div>
              <div>
                <strong>Mission:</strong>{" "}
                {founderData.startupDetails.missionStatement}
              </div>
              <div>
                <strong>Impact Type:</strong>{" "}
                {founderData.startupDetails.impactType}
              </div>
              <div>
                <strong>Covenant:</strong> {founderData.covenant?.name}
              </div>
              <div className="flex items-center space-x-2">
                <strong>Region:</strong>
                <span>{founderData.founderProfile?.country}</span>
                <MapPin className="w-3 h-3 text-foundry-sage" />
              </div>
            </div>
          </Card>
        )}
      </Card>

      {/* Matching Investors */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-foundry-forest flex items-center">
            <Users className="w-6 h-6 mr-2" />
            Matching Investors
          </h3>
          <Badge
            variant="secondary"
            className="bg-foundry-gold/20 text-foundry-forest"
          >
            {activeMatches.length} active matches
          </Badge>
        </div>

        <div className="space-y-4">
          {investorMatches.map((investor) => (
            <Card
              key={investor.id}
              className={`p-4 ${
                investor.isActive
                  ? "border-foundry-gold/30 bg-white"
                  : "bg-gray-50 opacity-70"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 bg-foundry-gold/20 rounded-lg flex items-center justify-center">
                      {(() => {
                        const IconComponent = getCovenantIcon(
                          investor.covenantAlignment,
                        );
                        return (
                          <IconComponent className="w-5 h-5 text-foundry-gold" />
                        );
                      })()}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foundry-forest">
                        {investor.name}
                      </h4>
                      <p className="text-sm text-foundry-sage">
                        {investor.type}
                      </p>
                    </div>
                    {investor.isActive && (
                      <Badge className="bg-green-100 text-green-800">
                        {investor.matchScore}% match
                      </Badge>
                    )}
                    {!investor.isActive && (
                      <Badge
                        variant="secondary"
                        className="bg-gray-100 text-gray-600"
                      >
                        Inactive
                      </Badge>
                    )}
                  </div>

                  <p className="text-foundry-sage text-sm mb-3">
                    {investor.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {investor.focus.map((focus, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {focus}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-foundry-sage">
                    <span className="flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {investor.region}
                    </span>
                    <span className="flex items-center">
                      <DollarSign className="w-3 h-3 mr-1" />
                      {investor.fundingRange}
                    </span>
                  </div>
                </div>

                <div className="ml-4 space-y-2">
                  {investor.isActive ? (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleContactInvestor(investor)}
                        className="w-full"
                      >
                        <Lock className="w-3 h-3 mr-1" />
                        Contact
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="w-full text-xs"
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        View Profile
                      </Button>
                    </>
                  ) : (
                    <Button
                      size="sm"
                      variant="ghost"
                      disabled
                      className="w-full"
                    >
                      <EyeOff className="w-3 h-3 mr-1" />
                      Unavailable
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* Free Tier Limitations */}
      <Card className="p-6 bg-yellow-50 border-yellow-200">
        <h3 className="text-lg font-semibold text-yellow-800 mb-3 flex items-center">
          <Lock className="w-5 h-5 mr-2" />
          Free Tier Marketplace Features
        </h3>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <h4 className="font-medium text-green-700 mb-2">✅ Included:</h4>
            <ul className="text-green-600 space-y-1 text-sm">
              <li>• Basic investor discovery</li>
              <li>• Public project listing</li>
              <li>• Covenant-based matching</li>
              <li>• Email notifications</li>
              <li>• Regional filtering</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-red-700 mb-2">🔒 Pro Features:</h4>
            <ul className="text-red-600 space-y-1 text-sm">
              <li>• Pitch deck uploads</li>
              <li>• Direct investor messaging</li>
              <li>• Warm introductions</li>
              <li>• Detailed analytics</li>
              <li>• Priority matching</li>
            </ul>
          </div>
        </div>

        <div className="flex items-center justify-between p-3 bg-yellow-100 rounded-lg">
          <div>
            <p className="font-medium text-yellow-800">
              Ready for advanced features?
            </p>
            <p className="text-sm text-yellow-700">
              Complete your founder journey to unlock Pro tier
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-yellow-600 text-yellow-700"
          >
            <ArrowUpRight className="w-4 h-4 mr-1" />
            Learn More
          </Button>
        </div>
      </Card>

      {/* Recent Activity */}
      {allowNotifications && (
        <Card className="p-6">
          <h3 className="text-lg font-bold text-foundry-forest mb-4 flex items-center">
            <Mail className="w-5 h-5 mr-2" />
            Recent Investor Activity
          </h3>

          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-foundry-cream/30 rounded-lg">
              <div className="w-2 h-2 bg-foundry-gold rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foundry-forest">
                  Kingdom Seed Fund viewed your profile
                </p>
                <p className="text-xs text-foundry-sage">2 hours ago</p>
              </div>
              <Badge variant="secondary" className="text-xs">
                New
              </Badge>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-foundry-cream/30 rounded-lg">
              <div className="w-2 h-2 bg-foundry-sage rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foundry-forest">
                  New investor match: Praxis Capital
                </p>
                <p className="text-xs text-foundry-sage">1 day ago</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-foundry-cream/30 rounded-lg">
              <div className="w-2 h-2 bg-foundry-sage rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foundry-forest">
                  Your project gained marketplace visibility
                </p>
                <p className="text-xs text-foundry-sage">3 days ago</p>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default CapitalMarketplace;
