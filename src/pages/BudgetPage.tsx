import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

const BudgetPage = () => {
  const { t } = useLanguage();
  const [income, setIncome] = useState("");
  const [household, setHousehold] = useState("");
  const [education, setEducation] = useState("");
  const [savingsGoal, setSavingsGoal] = useState("");
  const [result, setResult] = useState<null | { savings: number; data: { name: string; value: number }[] }>(null);

  const handleCalculate = () => {
    const inc = parseFloat(income) || 0;
    const hh = parseFloat(household) || 0;
    const edu = parseFloat(education) || 0;
    const savings = inc - hh - edu;

    setResult({
      savings,
      data: [
        { name: t("Household", "घरेलू"), value: hh },
        { name: t("Education", "शिक्षा"), value: edu },
        { name: t("Savings", "बचत"), value: Math.max(savings, 0) },
      ],
    });
  };

  const COLORS = ["hsl(24, 85%, 48%)", "hsl(40, 75%, 55%)", "hsl(145, 40%, 40%)"];

  return (
    <div className="min-h-screen bg-background">
      <div className="gradient-saffron py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-primary-foreground">{t("Budget Planner", "बजट प्लानर")}</h1>
          <p className="text-primary-foreground/80 mt-1">{t("Plan your monthly budget wisely", "अपना मासिक बजट समझदारी से बनाएं")}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
            <h2 className="text-lg font-semibold text-foreground mb-4">{t("Enter Your Details", "अपना विवरण दर्ज करें")}</h2>
            <div className="space-y-4">
              {[
                { label: t("Monthly Income (₹)", "मासिक आय (₹)"), value: income, set: setIncome },
                { label: t("Household Expenses (₹)", "घरेलू खर्च (₹)"), value: household, set: setHousehold },
                { label: t("Children Education (₹)", "बच्चों की शिक्षा (₹)"), value: education, set: setEducation },
                { label: t("Savings Goal (₹)", "बचत लक्ष्य (₹)"), value: savingsGoal, set: setSavingsGoal },
              ].map((field, i) => (
                <div key={i}>
                  <label className="block text-sm font-medium text-foreground mb-1">{field.label}</label>
                  <input
                    type="number"
                    value={field.value}
                    onChange={(e) => field.set(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-background border border-input text-foreground text-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="0"
                  />
                </div>
              ))}
              <button
                onClick={handleCalculate}
                className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
              >
                {t("Calculate", "गणना करें")}
              </button>
            </div>
          </div>

          {/* Result Section */}
          <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
            <h2 className="text-lg font-semibold text-foreground mb-4">{t("Your Budget Summary", "आपका बजट सारांश")}</h2>
            {result ? (
              <>
                <div className={`text-center p-4 rounded-lg mb-4 ${result.savings >= 0 ? "bg-accent/10" : "bg-destructive/10"}`}>
                  <p className="text-sm text-muted-foreground">{t("Monthly Savings", "मासिक बचत")}</p>
                  <p className={`text-3xl font-bold ${result.savings >= 0 ? "text-accent" : "text-destructive"}`}>
                    ₹{result.savings.toLocaleString()}
                  </p>
                  {savingsGoal && result.savings < parseFloat(savingsGoal) && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {t(
                        `You need to save ₹${(parseFloat(savingsGoal) - result.savings).toLocaleString()} more to reach your goal`,
                        `अपने लक्ष्य तक पहुंचने के लिए आपको ₹${(parseFloat(savingsGoal) - result.savings).toLocaleString()} और बचाने की जरूरत है`
                      )}
                    </p>
                  )}
                </div>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={result.data} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                      {result.data.map((_, i) => (
                        <Cell key={i} fill={COLORS[i]} />
                      ))}
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </>
            ) : (
              <div className="flex items-center justify-center h-64 text-muted-foreground">
                {t("Enter your details and click Calculate", "अपना विवरण दर्ज करें और गणना करें पर क्लिक करें")}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetPage;
