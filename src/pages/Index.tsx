import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { BookOpen, Landmark, Smartphone, Award, ArrowRight, MessageCircle } from "lucide-react";
import heroImage from "@/assets/hero-women.jpg";
import successImage from "@/assets/success-story-woman.jpg";

const featureCards = [
  { icon: BookOpen, labelEn: "Savings & Budgeting", labelHi: "बचत और बजट", color: "bg-primary/10", link: "/learn" },
  { icon: Landmark, labelEn: "Banking Basics", labelHi: "बैंकिंग की मूल बातें", color: "bg-accent/10", link: "/learn" },
  { icon: Smartphone, labelEn: "Digital Payments", labelHi: "डिजिटल भुगतान", color: "bg-gold/10", link: "/learn" },
  { icon: Award, labelEn: "Government Schemes", labelHi: "सरकारी योजनाएं", color: "bg-forest/10", link: "/schemes" },
];

const Index = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Rural women learning" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-pink-300/60" />
        </div>
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-2xl text-white">
            <h1 className="text-3xl md:text-5xl font-bold mb-2 animate-fade-in-up">
              {t("Empowering Rural Women", "ग्रामीण महिलाओं को सशक्त बनाना")}
            </h1>
            <p className="text-xl md:text-2xl font-medium mb-2 text-white/90" style={{ animationDelay: "0.1s" }}>
              {t("Through Financial Literacy", "वित्तीय साक्षरता के माध्यम से")}
            </p>
            <div className="w-16 h-1 bg-white/60 rounded mb-4" />
            <p className="text-lg font-hindi text-white/80 mb-8">
              {t("सशक्त महिलाएं - सशक्त समाज", "सशक्त महिलाएं - सशक्त समाज")}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/learn"
                className="px-6 py-3 bg-foreground text-background rounded-lg font-semibold text-sm hover:bg-foreground/90 transition-all"
              >
                {t("Start Learning", "सीखना शुरू करें")}
              </Link>
              <Link
                to="/schemes"
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:bg-primary/90 transition-all"
              >
                {t("Explore Schemes", "योजनाएं देखें")}
              </Link>
              <Link
                to="/budget"
                className="px-6 py-3 bg-saffron-light text-primary-foreground rounded-lg font-semibold text-sm hover:bg-saffron-light/90 transition-all"
              >
                {t("Budget Planner", "बजट प्लानर")}
              </Link>
              <Link
                to="/chatbot"
                className="px-6 py-3 bg-white/20 text-white border border-white/30 rounded-lg font-semibold text-sm hover:bg-white/30 transition-all flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                {t("Chat with Sakhi Assistant", "सखी असिस्टेंट से बात करें")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="container mx-auto px-4 py-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featureCards.map((card, i) => (
            <Link
              key={i}
              to={card.link}
              className={`${card.color} rounded-xl p-5 text-center hover:shadow-lg transition-all hover:-translate-y-1 group bg-white shadow-md`}
            >
              <card.icon className="w-10 h-10 mx-auto mb-3 text-primary" />
              <p className="font-semibold text-sm text-foreground">{t(card.labelEn, card.labelHi)}</p>
              <ArrowRight className="w-4 h-4 mx-auto mt-2 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
          ))}
        </div>
      </section>

      {/* Success Stories Preview */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              {t("Success Stories", "सफलता की कहानियां")}
            </h2>
            <p className="text-muted-foreground mb-6">
              {t("Inspiring Journeys of Empowerment", "सशक्तिकरण की प्रेरणादायक यात्राएं")}
            </p>
            <p className="text-foreground/80 mb-6 leading-relaxed">
              {t(
                "Meet women from villages across India who transformed their lives through financial literacy. From saving their first ₹100 to running successful small businesses.",
                "भारत के गांवों की उन महिलाओं से मिलें जिन्होंने वित्तीय साक्षरता से अपना जीवन बदला। अपनी पहली ₹100 की बचत से लेकर सफल छोटे व्यवसाय चलाने तक।"
              )}
            </p>
            <Link
              to="/stories"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors"
            >
              {t("Read Stories", "कहानियां पढ़ें")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <img
              src={successImage}
              alt="Success story"
              className="w-full h-80 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-secondary py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { num: "500+", labelEn: "Women Trained", labelHi: "महिलाएं प्रशिक्षित" },
              { num: "50+", labelEn: "Villages Reached", labelHi: "गांव तक पहुंच" },
              { num: "10+", labelEn: "Lessons Available", labelHi: "पाठ उपलब्ध" },
              { num: "95%", labelEn: "Satisfaction Rate", labelHi: "संतुष्टि दर" },
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-3xl font-bold text-primary">{stat.num}</p>
                <p className="text-sm text-muted-foreground">{t(stat.labelEn, stat.labelHi)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;