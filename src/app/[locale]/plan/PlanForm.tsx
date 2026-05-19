"use client";

import { useState } from "react";
import { useTranslation } from "@/lib/I18nContext";

function YoungIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
      <path d="M12 4V2" />
      <path d="M9 6l-2-1" />
      <path d="M15 6l2-1" />
    </svg>
  );
}

function MomIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="7" r="4" />
      <path d="M5.5 21a6.5 6.5 0 0 1 13 0" />
      <circle cx="17" cy="12" r="2.5" />
      <path d="M17 14.5V17" />
    </svg>
  );
}

function MiddleIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
      <rect x="8" y="12" width="8" height="2" rx="1" />
    </svg>
  );
}

export default function PlanForm() {
  const { t } = useTranslation();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    income: "",
    expenses: "",
    savings: "",
    userType: "",
    goals: [] as string[],
  });
  const [showResult, setShowResult] = useState(false);

  const userTypes = [
    { id: "young", label: t("plan.youngLabel"), description: t("plan.youngDescription"), Icon: YoungIcon },
    { id: "mom", label: t("plan.momLabel"), description: t("plan.momDescription"), Icon: MomIcon },
    { id: "middle", label: t("plan.middleLabel"), description: t("plan.middleDescription"), Icon: MiddleIcon },
  ];

  const goalOptions = [
    t("plan.goal1"),
    t("plan.goal2"),
    t("plan.goal3"),
    t("plan.goal4"),
    t("plan.goal5"),
    t("plan.goal6"),
  ];

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setShowResult(true);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const generatePlan = () => {
    const income = parseInt(formData.income) || 0;
    const expenses = parseInt(formData.expenses) || 0;
    const monthlySavings = income - expenses;
    const savingsRate = income > 0 ? Math.round((monthlySavings / income) * 100) : 0;

    return {
      monthlySavings,
      savingsRate,
      yearlySavings: monthlySavings * 12,
      recommendations: [
        {
          title: t("plan.rec1Title"),
          content: `Your savings rate is ${savingsRate}%. We recommend increasing it to 20% or more, which would allow you to save an additional ${Math.round(income * 0.2 - monthlySavings)} per month.`,
        },
        {
          title: t("plan.rec2Title"),
          content: "We recommend saving 3-6 months of living expenses as an emergency fund, approximately " + (expenses * 3).toLocaleString() + " - " + (expenses * 6).toLocaleString() + ".",
        },
        {
          title: t("plan.rec3Title"),
          content: "Set up automatic transfers on payday to move " + Math.round(income * 0.2) + " to your savings account.",
        },
      ],
    };
  };

  const plan = showResult ? generatePlan() : null;

  const stepLabels = [t("plan.step1"), t("plan.step2"), t("plan.step3")];

  return (
    <>
      {!showResult ? (
        <div className="bg-white rounded-2xl p-8 md:p-10 border border-[#E8E8E4] shadow-sm">
          {/* Progress Steps */}
          <div className="mb-10">
            <div className="flex items-center justify-between relative">
              {/* Progress line background */}
              <div className="absolute top-5 left-0 right-0 h-[2px] bg-[#E8E8E4]" />
              {/* Progress line active */}
              <div
                className="absolute top-5 left-0 h-[2px] bg-[#0F4C3A] transition-all duration-500"
                style={{ width: `${((step - 1) / 2) * 100}%` }}
              />
              {stepLabels.map((label, i) => (
                <div key={i} className="relative flex flex-col items-center z-10">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                      i + 1 <= step
                        ? "bg-[#0F4C3A] text-white shadow-md"
                        : "bg-[#FAFAF8] text-[#94A3B8] border border-[#E8E8E4]"
                    }`}
                  >
                    {i + 1}
                  </div>
                  <span className={`mt-2 text-xs font-medium ${i + 1 <= step ? "text-[#0F4C3A]" : "text-[#94A3B8]"}`}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-6 animate-fade-in-up">
              <h2 className="text-xl font-bold text-[#0F4C3A]">{t("plan.step1")}</h2>
              <div>
                <label className="block text-sm font-medium text-[#4A5568] mb-2">
                  {t("plan.incomeLabel")}
                </label>
                <input
                  type="number"
                  value={formData.income}
                  onChange={(e) => setFormData({ ...formData, income: e.target.value })}
                  className="w-full px-4 py-3.5 border border-[#E8E8E4] rounded-xl focus:ring-2 focus:ring-[#0F4C3A]/20 focus:border-[#0F4C3A] transition-all bg-[#FAFAF8] text-[#1A1A2E]"
                  placeholder={t("plan.incomePlaceholder")}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#4A5568] mb-2">
                  {t("plan.expensesLabel")}
                </label>
                <input
                  type="number"
                  value={formData.expenses}
                  onChange={(e) => setFormData({ ...formData, expenses: e.target.value })}
                  className="w-full px-4 py-3.5 border border-[#E8E8E4] rounded-xl focus:ring-2 focus:ring-[#0F4C3A]/20 focus:border-[#0F4C3A] transition-all bg-[#FAFAF8] text-[#1A1A2E]"
                  placeholder={t("plan.expensesPlaceholder")}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#4A5568] mb-2">
                  {t("plan.savingsLabel")}
                </label>
                <input
                  type="number"
                  value={formData.savings}
                  onChange={(e) => setFormData({ ...formData, savings: e.target.value })}
                  className="w-full px-4 py-3.5 border border-[#E8E8E4] rounded-xl focus:ring-2 focus:ring-[#0F4C3A]/20 focus:border-[#0F4C3A] transition-all bg-[#FAFAF8] text-[#1A1A2E]"
                  placeholder={t("plan.savingsPlaceholder")}
                />
              </div>
            </div>
          )}

          {/* Step 2: User Type */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in-up">
              <h2 className="text-xl font-bold text-[#0F4C3A]">{t("plan.userTypeTitle")}</h2>
              <div className="grid grid-cols-1 gap-4">
                {userTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setFormData({ ...formData, userType: type.id })}
                    className={`p-5 rounded-xl border-2 text-left transition-all flex items-center gap-4 ${
                      formData.userType === type.id
                        ? "border-[#0F4C3A] bg-[#E8F5E9] shadow-sm"
                        : "border-[#E8E8E4] hover:border-[#0F4C3A]/30 bg-[#FAFAF8]"
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                      formData.userType === type.id
                        ? "bg-[#0F4C3A] text-white"
                        : "bg-[#E8E8E4] text-[#4A5568]"
                    }`}>
                      <type.Icon />
                    </div>
                    <div>
                      <span className="font-semibold text-[#0F4C3A] block">{type.label}</span>
                      <span className="text-sm text-[#94A3B8]">{type.description}</span>
                    </div>
                    {formData.userType === type.id && (
                      <div className="ml-auto">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Goals */}
          {step === 3 && (
            <div className="space-y-6 animate-fade-in-up">
              <h2 className="text-xl font-bold text-[#0F4C3A]">{t("plan.goalsTitle")}</h2>
              <p className="text-[#4A5568] text-sm">{t("plan.goalsDescription")}</p>
              <div className="grid grid-cols-2 gap-3">
                {goalOptions.map((goal) => {
                  const isSelected = formData.goals.includes(goal);
                  return (
                    <button
                      key={goal}
                      onClick={() => {
                        const newGoals = formData.goals.includes(goal)
                          ? formData.goals.filter((g) => g !== goal)
                          : [...formData.goals, goal];
                        setFormData({ ...formData, goals: newGoals });
                      }}
                      className={`p-4 rounded-xl border-2 text-sm font-medium transition-all ${
                        isSelected
                          ? "border-[#0F4C3A] bg-[#E8F5E9] text-[#0F4C3A]"
                          : "border-[#E8E8E4] hover:border-[#0F4C3A]/30 bg-[#FAFAF8] text-[#4A5568]"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
                          isSelected ? "bg-[#0F4C3A] border-[#0F4C3A]" : "border-[#E8E8E4]"
                        }`}>
                          {isSelected && (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </div>
                        {goal}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-10">
            <button
              onClick={handlePrev}
              disabled={step === 1}
              className={`px-6 py-3 rounded-xl font-medium text-sm transition-all ${
                step === 1
                  ? "bg-[#FAFAF8] text-[#94A3B8] cursor-not-allowed"
                  : "bg-[#FAFAF8] text-[#4A5568] hover:bg-[#E8E8E4] border border-[#E8E8E4]"
              }`}
            >
              {t("plan.prevButton")}
            </button>
            <button
              onClick={handleNext}
              className="px-8 py-3 bg-[#0F4C3A] text-white rounded-xl font-medium text-sm hover:bg-[#1A6B52] transition-all shadow-md hover:shadow-lg"
            >
              {step === 3 ? t("plan.generateButton") : t("plan.nextButton")}
            </button>
          </div>
        </div>
      ) : (
        /* Result */
        <div className="space-y-6 animate-fade-in-up">
          {/* Success Header */}
          <div className="bg-white rounded-2xl p-8 border border-[#E8E8E4] text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#E8F5E9] flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h2
              className="text-2xl font-bold text-[#0F4C3A] mb-2"
              style={{ fontFamily: "'Noto Serif SC', Georgia, serif" }}
            >
              {t("plan.resultTitle")}
            </h2>
            <p className="text-[#4A5568]">{t("plan.resultDescription")}</p>
          </div>

          {/* Summary Card */}
          <div className="gradient-forest rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-[-30px] right-[-30px] w-[120px] h-[120px] rounded-full border border-white/10" />
            <div className="absolute bottom-[-40px] left-[-20px] w-[100px] h-[100px] rounded-full border border-white/5" />
            <div className="relative">
              <h3 className="text-lg font-semibold mb-6 text-[#D4A853]">{t("plan.monthlySavings")}</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/5 rounded-xl p-5 backdrop-blur-sm border border-white/10">
                  <p className="text-white/50 text-xs uppercase tracking-wider mb-1">{t("plan.monthlySavings")}</p>
                  <p className="text-2xl md:text-3xl font-bold">{plan?.monthlySavings.toLocaleString()}</p>
                  <p className="text-white/40 text-xs mt-1">CNY</p>
                </div>
                <div className="bg-white/5 rounded-xl p-5 backdrop-blur-sm border border-white/10">
                  <p className="text-white/50 text-xs uppercase tracking-wider mb-1">{t("plan.savingsRate")}</p>
                  <p className="text-2xl md:text-3xl font-bold">{plan?.savingsRate}%</p>
                  <p className="text-white/40 text-xs mt-1">{t("plan.savingsRateSuggestion")}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-5 backdrop-blur-sm border border-white/10">
                  <p className="text-white/50 text-xs uppercase tracking-wider mb-1">{t("plan.yearlySavings")}</p>
                  <p className="text-2xl font-bold">{plan?.yearlySavings.toLocaleString()}</p>
                  <p className="text-white/40 text-xs mt-1">CNY</p>
                </div>
                <div className="bg-white/5 rounded-xl p-5 backdrop-blur-sm border border-white/10">
                  <p className="text-white/50 text-xs uppercase tracking-wider mb-1">{t("plan.fiveYearProjection")}</p>
                  <p className="text-2xl font-bold">{(plan?.yearlySavings || 0 * 5).toLocaleString()}+</p>
                  <p className="text-white/40 text-xs mt-1">CNY</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-2xl p-8 border border-[#E8E8E4]">
            <h3
              className="text-xl font-bold text-[#0F4C3A] mb-6"
              style={{ fontFamily: "'Noto Serif SC', Georgia, serif" }}
            >
              {t("plan.recommendationsTitle")}
            </h3>
            <div className="space-y-6">
              {plan?.recommendations.map((rec, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#0F4C3A] text-white rounded-lg flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#0F4C3A] mb-1">{rec.title}</h4>
                    <p className="text-[#4A5568] text-sm leading-relaxed">{rec.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => {
                setShowResult(false);
                setStep(1);
              }}
              className="flex-1 px-6 py-3.5 bg-[#FAFAF8] text-[#4A5568] rounded-xl font-medium text-sm hover:bg-[#E8E8E4] transition-all border border-[#E8E8E4]"
            >
              {t("plan.resetButton")}
            </button>
            <button
              onClick={() => alert("Share feature coming soon...")}
              className="flex-1 px-6 py-3.5 bg-[#0F4C3A] text-white rounded-xl font-medium text-sm hover:bg-[#1A6B52] transition-all shadow-md hover:shadow-lg"
            >
              {t("plan.shareButton")}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
