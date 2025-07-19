import {
  Cross,
  Leaf,
  Brain,
  BookOpen,
  Heart,
  Users,
  Zap,
  Target,
  TrendingUp,
  Recycle,
  ShieldCheck,
  Star,
} from "lucide-react";

export interface CovenantPrinciple {
  name: string;
  description: string;
  icon: any;
  metrics: string[];
}

export interface CovenantData {
  id: string;
  name: string;
  description: string;
  icon: any;
  primaryColor: string;
  secondaryColor: string;
  coreVerse: {
    reference: string;
    text: string;
  };
  principles: CovenantPrinciple[];
  dailyScriptures: Array<{
    reference: string;
    text: string;
    focus: string;
  }>;
  weeklyFocusAreas: string[];
  reflectionPrompts: string[];
  missionActions: Array<{
    id: string;
    title: string;
    description: string;
    icon: any;
    priority: "high" | "medium" | "low";
    category: "spiritual" | "business" | "impact" | "growth";
  }>;
  kpis: Array<{
    name: string;
    description: string;
    icon: any;
    currentValue?: number;
    targetValue?: number;
    unit: string;
  }>;
  investorTypes: string[];
  fundingFocus: string[];
}

export const COVENANT_DATA: Record<string, CovenantData> = {
  gospel: {
    id: "gospel",
    name: "Gospel Covenant",
    description:
      "Build ventures grounded in Biblical principles, spreading the Gospel through business as mission.",
    icon: Cross,
    primaryColor: "hsl(150, 60%, 25%)", // foundry-forest
    secondaryColor: "hsl(45, 60%, 70%)", // foundry-gold
    coreVerse: {
      reference: "Matthew 6:33",
      text: "But seek first the kingdom of God and his righteousness, and all these things will be added to you.",
    },
    principles: [
      {
        name: "Kingdom First",
        description: "Prioritize eternal impact over temporal success",
        icon: Target,
        metrics: ["Gospel reach", "Lives transformed", "Kingdom partnerships"],
      },
      {
        name: "Servant Leadership",
        description: "Lead by serving others and following Christ's example",
        icon: Heart,
        metrics: [
          "Team discipleship",
          "Community service",
          "Leadership development",
        ],
      },
      {
        name: "Eternal Perspective",
        description: "Make decisions with eternity in view",
        icon: Star,
        metrics: ["Mission alignment", "Eternal investment", "Legacy building"],
      },
      {
        name: "Stewardship",
        description: "Faithfully manage resources entrusted by God",
        icon: ShieldCheck,
        metrics: ["Resource efficiency", "Faithful management", "Kingdom ROI"],
      },
    ],
    dailyScriptures: [
      {
        reference: "Luke 14:28",
        text: "For which of you, desiring to build a tower, does not first sit down and count the cost?",
        focus: "Wise Planning",
      },
      {
        reference: "Proverbs 16:3",
        text: "Commit your work to the Lord, and your plans will be established.",
        focus: "Divine Partnership",
      },
      {
        reference: "Colossians 3:23",
        text: "Whatever you do, work heartily, as for the Lord and not for men.",
        focus: "Excellence",
      },
      {
        reference: "1 Corinthians 10:31",
        text: "So, whether you eat or drink, or whatever you do, do all to the glory of God.",
        focus: "Purpose",
      },
      {
        reference: "Matthew 25:21",
        text: "Well done, good and faithful servant. You have been faithful over a little; I will set you over much.",
        focus: "Faithfulness",
      },
    ],
    weeklyFocusAreas: [
      "Stewardship",
      "Servant Leadership",
      "Gospel Impact",
      "Kingdom Building",
      "Eternal Perspective",
      "Faithful Management",
    ],
    reflectionPrompts: [
      "How did I honor God through my business decisions today?",
      "What opportunities did I have to share the Gospel through my work?",
      "How am I stewarding the resources God has entrusted to me?",
      "Where can I serve others more effectively in my leadership?",
      "How does this decision align with eternal values?",
    ],
    missionActions: [
      {
        id: "gospel-profile",
        title: "Complete Kingdom Profile",
        description: "Share your testimony and mission calling",
        icon: Cross,
        priority: "high",
        category: "spiritual",
      },
      {
        id: "gospel-mission",
        title: "Draft Mission Statement",
        description: "Articulate your Gospel-centered business mission",
        icon: BookOpen,
        priority: "high",
        category: "spiritual",
      },
      {
        id: "gospel-deck",
        title: "Upload Kingdom Deck",
        description: "Present your venture with eternal perspective",
        icon: TrendingUp,
        priority: "medium",
        category: "business",
      },
      {
        id: "gospel-discipleship",
        title: "Plan Team Discipleship",
        description: "Develop spiritual growth plan for your team",
        icon: Users,
        priority: "medium",
        category: "spiritual",
      },
    ],
    kpis: [
      {
        name: "Gospel Reach",
        description: "Lives touched through business ministry",
        icon: Heart,
        currentValue: 142,
        targetValue: 500,
        unit: "people",
      },
      {
        name: "Kingdom ROI",
        description: "Eternal return on investment",
        icon: Target,
        currentValue: 85,
        unit: "%",
      },
      {
        name: "Servant Leadership Score",
        description: "Team and stakeholder service rating",
        icon: Users,
        currentValue: 92,
        targetValue: 95,
        unit: "%",
      },
      {
        name: "Mission Alignment",
        description: "Consistency with Gospel values",
        icon: Cross,
        currentValue: 88,
        targetValue: 95,
        unit: "%",
      },
    ],
    investorTypes: [
      "Faith-based VCs",
      "Kingdom-minded angels",
      "Mission-driven funds",
      "Christian family offices",
    ],
    fundingFocus: [
      "Business as Mission",
      "Gospel Impact",
      "Kingdom Building",
      "Discipleship Through Work",
    ],
  },

  ecological: {
    id: "ecological",
    name: "Ecological Covenant",
    description:
      "Create sustainable ventures that honor creation and promote environmental stewardship.",
    icon: Leaf,
    primaryColor: "hsl(120, 60%, 25%)", // earth green
    secondaryColor: "hsl(80, 60%, 60%)", // nature green
    coreVerse: {
      reference: "Psalm 24:1",
      text: "The earth is the Lord's, and everything in it, the world, and all who live in it.",
    },
    principles: [
      {
        name: "Creation Care",
        description: "Protect and restore God's creation through business",
        icon: Leaf,
        metrics: [
          "Carbon reduction",
          "Ecosystem restoration",
          "Biodiversity impact",
        ],
      },
      {
        name: "Sustainability",
        description: "Build for long-term ecological health",
        icon: Recycle,
        metrics: [
          "Resource efficiency",
          "Circular economy",
          "Renewable adoption",
        ],
      },
      {
        name: "Regenerative Impact",
        description: "Leave the environment better than you found it",
        icon: TrendingUp,
        metrics: [
          "Net positive impact",
          "Regenerative practices",
          "Ecosystem health",
        ],
      },
      {
        name: "Earth Stewardship",
        description: "Responsibly manage natural resources",
        icon: ShieldCheck,
        metrics: ["Resource stewardship", "Waste reduction", "Natural capital"],
      },
    ],
    dailyScriptures: [
      {
        reference: "Genesis 2:15",
        text: "The Lord God took the man and put him in the Garden of Eden to work it and take care of it.",
        focus: "Stewardship",
      },
      {
        reference: "Romans 8:19-21",
        text: "For the creation waits in eager expectation for the children of God to be revealed.",
        focus: "Creation Hope",
      },
      {
        reference: "Psalm 104:14",
        text: "He makes grass grow for the cattle, and plants for people to cultivate.",
        focus: "Divine Provision",
      },
      {
        reference: "Isaiah 55:10-11",
        text: "As the rain and the snow come down from heaven, and do not return to it without watering the earth...",
        focus: "Natural Cycles",
      },
      {
        reference: "Matthew 6:26",
        text: "Look at the birds of the air; they do not sow or reap or store away in barns, and yet your heavenly Father feeds them.",
        focus: "Divine Care",
      },
    ],
    weeklyFocusAreas: [
      "Carbon Reduction",
      "Regenerative Practices",
      "Circular Economy",
      "Biodiversity",
      "Resource Efficiency",
      "Ecosystem Health",
    ],
    reflectionPrompts: [
      "How did my business decisions impact God's creation today?",
      "What opportunities do I have to reduce environmental harm?",
      "How can I make my operations more regenerative?",
      "Where can I partner with nature instead of exploiting it?",
      "How does my work contribute to creation's flourishing?",
    ],
    missionActions: [
      {
        id: "eco-assessment",
        title: "Complete Environmental Assessment",
        description: "Measure your current environmental impact",
        icon: Leaf,
        priority: "high",
        category: "impact",
      },
      {
        id: "eco-strategy",
        title: "Develop Sustainability Strategy",
        description: "Create comprehensive environmental action plan",
        icon: Target,
        priority: "high",
        category: "impact",
      },
      {
        id: "eco-certification",
        title: "Pursue B-Corp Certification",
        description: "Verify your environmental commitments",
        icon: ShieldCheck,
        priority: "medium",
        category: "business",
      },
      {
        id: "eco-partnerships",
        title: "Build Eco Partnerships",
        description: "Connect with environmental organizations",
        icon: Users,
        priority: "medium",
        category: "impact",
      },
    ],
    kpis: [
      {
        name: "Carbon Footprint",
        description: "CO2 equivalent emissions reduction",
        icon: Leaf,
        currentValue: -25,
        targetValue: -50,
        unit: "% reduction",
      },
      {
        name: "Regenerative Impact",
        description: "Net positive environmental contribution",
        icon: TrendingUp,
        currentValue: 15,
        targetValue: 50,
        unit: "% net positive",
      },
      {
        name: "Resource Efficiency",
        description: "Circular economy implementation",
        icon: Recycle,
        currentValue: 78,
        targetValue: 90,
        unit: "% efficiency",
      },
      {
        name: "Biodiversity Score",
        description: "Ecosystem health contribution",
        icon: Heart,
        currentValue: 82,
        targetValue: 95,
        unit: "% score",
      },
    ],
    investorTypes: [
      "Impact investors",
      "ESG funds",
      "Climate VCs",
      "Sustainable investment funds",
    ],
    fundingFocus: [
      "Climate Solutions",
      "Sustainable Technology",
      "Regenerative Business",
      "Environmental Impact",
    ],
  },

  stoic: {
    id: "stoic",
    name: "Stoic Covenant",
    description:
      "Develop ventures with philosophical wisdom, virtue, and rational decision-making.",
    icon: Brain,
    primaryColor: "hsl(220, 30%, 25%)", // stoic blue-grey
    secondaryColor: "hsl(35, 60%, 60%)", // wisdom gold
    coreVerse: {
      reference: "Marcus Aurelius",
      text: "The best revenge is not to be like your enemy.",
    },
    principles: [
      {
        name: "Virtue Ethics",
        description:
          "Ground all decisions in wisdom, justice, courage, and temperance",
        icon: ShieldCheck,
        metrics: [
          "Ethical decisions",
          "Virtue consistency",
          "Moral leadership",
        ],
      },
      {
        name: "Wisdom",
        description: "Seek understanding and make rational choices",
        icon: Brain,
        metrics: [
          "Decision quality",
          "Learning velocity",
          "Strategic thinking",
        ],
      },
      {
        name: "Resilience",
        description: "Maintain equanimity through challenges and setbacks",
        icon: ShieldCheck,
        metrics: ["Crisis response", "Emotional stability", "Adaptability"],
      },
      {
        name: "Personal Growth",
        description: "Continuously develop character and capability",
        icon: TrendingUp,
        metrics: ["Self-improvement", "Skill development", "Character growth"],
      },
    ],
    dailyScriptures: [
      {
        reference: "Epictetus",
        text: "It's not what happens to you, but how you react to it that matters.",
        focus: "Response Control",
      },
      {
        reference: "Marcus Aurelius",
        text: "Very little is needed to make a happy life; it is all within yourself, in your way of thinking.",
        focus: "Inner Peace",
      },
      {
        reference: "Seneca",
        text: "Every new beginning comes from some other beginning's end.",
        focus: "Change Acceptance",
      },
      {
        reference: "Marcus Aurelius",
        text: "The universe is change; our life is what our thoughts make it.",
        focus: "Perspective",
      },
      {
        reference: "Epictetus",
        text: "Wealth consists in not having great possessions, but in having few wants.",
        focus: "Contentment",
      },
    ],
    weeklyFocusAreas: [
      "Rational Decision Making",
      "Virtue Development",
      "Emotional Resilience",
      "Philosophical Wisdom",
      "Character Building",
      "Stoic Leadership",
    ],
    reflectionPrompts: [
      "Did I respond to challenges with wisdom and virtue today?",
      "What can I control versus what is outside my influence?",
      "How did I practice the four cardinal virtues in my work?",
      "What did I learn from today's difficulties?",
      "How can I better align my actions with philosophical principles?",
    ],
    missionActions: [
      {
        id: "stoic-philosophy",
        title: "Define Core Philosophy",
        description: "Articulate your venture's philosophical foundation",
        icon: Brain,
        priority: "high",
        category: "growth",
      },
      {
        id: "stoic-principles",
        title: "Establish Virtue Metrics",
        description: "Create systems to measure virtue-based decisions",
        icon: Target,
        priority: "high",
        category: "growth",
      },
      {
        id: "stoic-leadership",
        title: "Develop Stoic Leadership",
        description: "Train in philosophical leadership principles",
        icon: Users,
        priority: "medium",
        category: "growth",
      },
      {
        id: "stoic-resilience",
        title: "Build Resilience Systems",
        description: "Create frameworks for handling adversity",
        icon: ShieldCheck,
        priority: "medium",
        category: "business",
      },
    ],
    kpis: [
      {
        name: "Virtue Score",
        description: "Consistency in wisdom, justice, courage, temperance",
        icon: ShieldCheck,
        currentValue: 87,
        targetValue: 95,
        unit: "% consistency",
      },
      {
        name: "Decision Quality",
        description: "Rational, principle-based choices",
        icon: Brain,
        currentValue: 82,
        targetValue: 90,
        unit: "% quality",
      },
      {
        name: "Emotional Resilience",
        description: "Stability under pressure and setbacks",
        icon: ShieldCheck,
        currentValue: 90,
        targetValue: 95,
        unit: "% stability",
      },
      {
        name: "Philosophical Growth",
        description: "Development of wisdom and character",
        icon: TrendingUp,
        currentValue: 76,
        targetValue: 85,
        unit: "% growth",
      },
    ],
    investorTypes: [
      "Rational investors",
      "Philosophy-driven funds",
      "Long-term value investors",
      "Virtue-based capital",
    ],
    fundingFocus: [
      "Rational Business Models",
      "Sustainable Growth",
      "Virtue-Based Leadership",
      "Philosophical Innovation",
    ],
  },
};

export const getCovenantData = (covenantId: string): CovenantData | null => {
  return COVENANT_DATA[covenantId] || null;
};

export const getRandomDailyScripture = (covenantId: string) => {
  const covenant = getCovenantData(covenantId);
  if (!covenant) return null;

  const today = new Date().getDate();
  const index = today % covenant.dailyScriptures.length;
  return covenant.dailyScriptures[index];
};

export const getWeeklyFocus = (covenantId: string) => {
  const covenant = getCovenantData(covenantId);
  if (!covenant) return null;

  const weekNumber = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000));
  const index = weekNumber % covenant.weeklyFocusAreas.length;
  return covenant.weeklyFocusAreas[index];
};

export const getRandomReflectionPrompt = (covenantId: string) => {
  const covenant = getCovenantData(covenantId);
  if (!covenant) return null;

  const today = new Date().getDate();
  const index = today % covenant.reflectionPrompts.length;
  return covenant.reflectionPrompts[index];
};
