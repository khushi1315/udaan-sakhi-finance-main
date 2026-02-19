import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { BookOpen, CheckCircle, Landmark, Smartphone, AlertTriangle } from "lucide-react";

const categories = [
  { id: "banking", iconEn: "Banking Basics", iconHi: "बैंकिंग मूल बातें", icon: Landmark },
  { id: "saving", iconEn: "Saving & Budgeting", iconHi: "बचत और बजट", icon: BookOpen },
  { id: "digital", iconEn: "Digital Payments", iconHi: "डिजिटल भुगतान", icon: Smartphone },
  { id: "loans", iconEn: "Loan Awareness", iconHi: "ऋण जागरूकता", icon: AlertTriangle },
];

const lessonsData: Record<string, { titleEn: string; titleHi: string; contentEn: string; contentHi: string }[]> = {
  banking: [
    { titleEn: "Opening a Bank Account", titleHi: "बैंक खाता खोलना", contentEn: "Learn how to open a bank account with simple documents like Aadhaar and PAN. Banks offer savings accounts, fixed deposits, and benefits like interest earnings.", contentHi: "आधार और पैन जैसे सरल दस्तावेजों से बैंक खाता खोलना सीखें। बैंक बचत खाते, सावधि जमा और ब्याज जैसी सुविधाएं देते हैं।" },
    { titleEn: "Using an ATM", titleHi: "ATM का उपयोग", contentEn: "Understand how to withdraw cash, deposit money, and check balances safely using ATM machines. Never share your PIN with anyone.", contentHi: "ATM मशीन का सुरक्षित उपयोग करना सीखें—नकद निकालना, जमा करना और बैलेंस चेक करना। अपना PIN किसी से साझा न करें।" },
    { titleEn: "Reading Your Passbook", titleHi: "पासबुक पढ़ना", contentEn: "Track all deposits and withdrawals using your passbook. Regularly update it to monitor transactions and avoid fraud.", contentHi: "पासबुक का उपयोग करके सभी जमा और निकासी का पता लगाएं। धोखाधड़ी से बचने के लिए इसे नियमित रूप से अपडेट करें।" },
  ],
  saving: [
    { titleEn: "Why Saving Matters", titleHi: "बचत क्यों महत्वपूर्ण है", contentEn: "Saving even small amounts regularly helps in emergencies, education, and future security. Start with 10% of your income.", contentHi: "नियमित छोटी बचत भी आपातकाल, शिक्षा और भविष्य की सुरक्षा में मदद करती है। अपनी आय का 10% बचत से शुरू करें।" },
    { titleEn: "Creating a Monthly Budget", titleHi: "मासिक बजट बनाना", contentEn: "List all incomes and expenses. Separate essential and non-essential items. A budget helps control overspending.", contentHi: "सभी आय और खर्च सूचीबद्ध करें। आवश्यक और गैर-आवश्यक खर्च अलग करें। बजट से अधिक खर्च पर नियंत्रण रहता है।" },
    { titleEn: "Emergency Fund", titleHi: "आपातकालीन निधि", contentEn: "Set aside funds for emergencies like medical expenses or sudden repairs. Aim for 3-6 months of expenses.", contentHi: "आपातकालीन स्थिति के लिए धन अलग रखें जैसे मेडिकल खर्च या आकस्मिक मरम्मत। 3-6 महीने के खर्च का लक्ष्य रखें।" },
  ],
  digital: [
    { titleEn: "UPI Payments Made Easy", titleHi: "UPI भुगतान आसान बनाया", contentEn: "Send and receive money instantly using UPI apps. Ensure correct UPI IDs and avoid sharing OTPs.", contentHi: "UPI ऐप्स से तुरंत पैसे भेजें और प्राप्त करें। सही UPI ID सुनिश्चित करें और OTP साझा न करें।" },
    { titleEn: "Mobile Wallets", titleHi: "मोबाइल वॉलेट्स", contentEn: "Apps like Paytm and PhonePe allow digital payments for shopping, bills, and tickets. Keep wallets secured with strong passwords.", contentHi: "Paytm और PhonePe जैसे ऐप्स से शॉपिंग, बिल और टिकट का डिजिटल भुगतान करें। मजबूत पासवर्ड से वॉलेट सुरक्षित रखें।" },
    { titleEn: "Online Safety", titleHi: "ऑनलाइन सुरक्षा", contentEn: "Protect your accounts from fraud. Never click unknown links or share sensitive information online.", contentHi: "अपने खातों को धोखाधड़ी से बचाएं। अज्ञात लिंक पर क्लिक न करें और संवेदनशील जानकारी साझा न करें।" },
  ],
  loans: [
    { titleEn: "Understanding Interest Rates", titleHi: "ब्याज दरों को समझना", contentEn: "Interest is the extra cost on borrowed money. Compare rates before taking loans from banks or NBFCs.", contentHi: "ब्याज उधार लिए गए पैसे की अतिरिक्त लागत है। बैंक या एनबीएफसी से ऋण लेने से पहले दरों की तुलना करें।" },
    { titleEn: "Avoiding Debt Traps", titleHi: "कर्ज के जाल से बचें", contentEn: "Borrow only what you can repay. Avoid local moneylenders with high interest. Use bank or government schemes.", contentHi: "केवल उतना ही उधार लें जितना चुकता कर सकते हैं। उच्च ब्याज वाले साहूकार से बचें। बैंक या सरकारी योजना का उपयोग करें।" },
    { titleEn: "Types of Loans", titleHi: "ऋण के प्रकार", contentEn: "Learn about personal loans, home loans, education loans, and their repayment options to choose wisely.", contentHi: "पर्सनल, होम, शिक्षा ऋण और उनकी चुकौती विकल्पों के बारे में जानें ताकि सही विकल्प चुन सकें।" },
  ],
};

const LearnPage = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("banking");
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const toggleComplete = (key: string) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const toggleExpand = (key: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const lessons = lessonsData[activeCategory] || [];

  return (
    <div className="min-h-screen bg-background">
      <div className="gradient-saffron py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-primary-foreground">{t("Learn Finance", "वित्त सीखें")}</h1>
          <p className="text-primary-foreground/80 mt-1">{t("Beginner-friendly financial lessons", "शुरुआती-अनुकूल वित्तीय पाठ")}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card text-foreground hover:bg-secondary"
              }`}
            >
              <cat.icon className="w-4 h-4" />
              {t(cat.iconEn, cat.iconHi)}
            </button>
          ))}
        </div>

        {/* Lessons */}
        <div className="space-y-4">
          {lessons.map((lesson, i) => {
            const key = `${activeCategory}-${i}`;
            const isComplete = completed.has(key);
            const isExpanded = expanded.has(key);
            return (
              <div key={key} className="bg-card rounded-xl p-4 shadow-sm border border-border">
                <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleExpand(key)}>
                  <h3 className="text-lg font-semibold text-foreground">{t(lesson.titleEn, lesson.titleHi)}</h3>
                  <span>{isExpanded ? "▲" : "▼"}</span>
                </div>
                {isExpanded && (
                  <div className="mt-2">
                    <p className="text-muted-foreground">{t(lesson.contentEn, lesson.contentHi)}</p>
                    <button
                      onClick={() => toggleComplete(key)}
                      className={`mt-2 flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                        isComplete
                          ? "bg-accent text-accent-foreground"
                          : "bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground"
                      }`}
                    >
                      <CheckCircle className="w-4 h-4" />
                      {isComplete ? t("Completed", "पूर्ण") : t("Mark Complete", "पूर्ण करें")}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LearnPage;
