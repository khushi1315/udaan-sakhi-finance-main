import { useLanguage } from "@/contexts/LanguageContext";
import sunitaImage from "@/assets/sunita.jpg";
import kamlaImage from "@/assets/kamla.jpg";
import meeraImage from "@/assets/meera.jpg";

const stories = [
  {
    nameEn: "Sunita Devi",
    nameHi: "सुनीता देवी",
    villageEn: "Madhubani, Bihar",
    villageHi: "मधुबनी, बिहार",
    image: sunitaImage,
    beforeEn: "Had no bank account, saved money at home under the mattress.",
    beforeHi: "कोई बैंक खाता नहीं था, गद्दे के नीचे घर पर पैसे बचाती थीं।",
    afterEn: "Opened a Jan Dhan account, started saving ₹500/month, and now runs a tailoring business earning ₹8,000/month.",
    afterHi: "जन धन खाता खोला, ₹500/महीना बचाना शुरू किया, और अब ₹8,000/महीना कमाने वाला सिलाई व्यवसाय चलाती हैं।",
    quoteEn: "\"Financial literacy changed my life. I am now independent and confident.\"",
    quoteHi: "\"वित्तीय साक्षरता ने मेरा जीवन बदल दिया। अब मैं स्वतंत्र और आत्मविश्वासी हूं।\"",
  },
  {
    nameEn: "Kamla Bai",
    nameHi: "कमला बाई",
    villageEn: "Rajgarh, Madhya Pradesh",
    villageHi: "राजगढ़, मध्य प्रदेश",
    image: kamlaImage,
    beforeEn: "Took loans from local moneylenders at 5% monthly interest.",
    beforeHi: "स्थानीय साहूकारों से 5% मासिक ब्याज पर ऋण लेती थीं।",
    afterEn: "Joined an SHG, got a Mudra Loan at low interest, and started a grocery shop in her village.",
    afterHi: "SHG में शामिल हुईं, कम ब्याज पर मुद्रा ऋण मिला, और अपने गांव में किराने की दुकान शुरू की।",
    quoteEn: "\"I tell every woman — learn about money, it's your biggest power.\"",
    quoteHi: "\"मैं हर महिला से कहती हूं — पैसे के बारे में सीखो, यह तुम्हारी सबसे बड़ी शक्ति है।\"",
  },
  {
    nameEn: "Meera Kumari",
    nameHi: "मीरा कुमारी",
    villageEn: "Vaishali, Bihar",
    villageHi: "वैशाली, बिहार",
    image: meeraImage,
    beforeEn: "Never used a mobile phone for transactions, afraid of digital fraud.",
    beforeHi: "लेनदेन के लिए कभी मोबाइल फोन का उपयोग नहीं किया, डिजिटल धोखाधड़ी से डरती थीं।",
    afterEn: "Now uses UPI confidently, teaches other women in her village about safe digital payments.",
    afterHi: "अब आत्मविश्वास से UPI का उपयोग करती हैं, अपने गांव की अन्य महिलाओं को सुरक्षित डिजिटल भुगतान के बारे में सिखाती हैं।",
    quoteEn: "\"Once I understood how UPI works, I realized technology is not scary — it's empowering!\"",
    quoteHi: "\"जब मैंने समझा कि UPI कैसे काम करता है, तो मुझे एहसास हुआ कि तकनीक डरावनी नहीं है — यह सशक्त बनाती है!\"",
  },
];

const StoriesPage = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <div className="gradient-saffron py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-primary-foreground">{t("Success Stories", "सफलता की कहानियां")}</h1>
          <p className="text-primary-foreground/80 mt-1">{t("Inspiring journeys of empowerment", "सशक्तिकरण की प्रेरणादायक यात्राएं")}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {stories.map((story, i) => (
          <div key={i} className="bg-card rounded-xl overflow-hidden shadow-sm border border-border md:flex">
            <div className="md:w-1/3">
              <img src={story.image} alt={t(story.nameEn, story.nameHi)} className="w-full h-64 md:h-full object-cover" />
            </div>
            <div className="p-6 md:w-2/3">
              <h3 className="text-xl font-bold text-foreground">{t(story.nameEn, story.nameHi)}</h3>
              <p className="text-sm text-primary font-medium mb-3">{t(story.villageEn, story.villageHi)}</p>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div className="bg-destructive/5 rounded-lg p-3">
                  <p className="text-xs font-semibold text-destructive uppercase mb-1">{t("Before", "पहले")}</p>
                  <p className="text-sm text-foreground/80">{t(story.beforeEn, story.beforeHi)}</p>
                </div>
                <div className="bg-accent/10 rounded-lg p-3">
                  <p className="text-xs font-semibold text-accent uppercase mb-1">{t("After", "बाद में")}</p>
                  <p className="text-sm text-foreground/80">{t(story.afterEn, story.afterHi)}</p>
                </div>
              </div>
              <blockquote className="italic text-muted-foreground border-l-4 border-primary pl-4">
                {t(story.quoteEn, story.quoteHi)}
              </blockquote>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoriesPage;