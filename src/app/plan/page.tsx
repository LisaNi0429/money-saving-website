"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PlanPage() {
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
    { id: "young", label: "刚入职年轻人", icon: "👨‍💼" },
    { id: "mom", label: "宝妈", icon: "👩‍👧" },
    { id: "middle", label: "中年人", icon: "👔" },
  ];

  const goalOptions = [
    "攒下第一桶金",
    "买房首付",
    "子女教育",
    "养老储备",
    "还清债务",
    "财务自由",
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
    const savings = parseInt(formData.savings) || 0;
    const monthlySavings = income - expenses;
    const savingsRate = income > 0 ? Math.round((monthlySavings / income) * 100) : 0;

    return {
      monthlySavings,
      savingsRate,
      yearlySavings: monthlySavings * 12,
      recommendations: [
        {
          title: "优化支出结构",
          content: `你的储蓄率为 ${savingsRate}%。建议将储蓄率提升至20%以上，每月可多存 ${Math.round(income * 0.2 - monthlySavings)} 元。`,
        },
        {
          title: "建立应急基金",
          content: "建议先存够3-6个月的生活费作为应急基金，约 " + (expenses * 3).toLocaleString() + " - " + (expenses * 6).toLocaleString() + " 元。",
        },
        {
          title: "自动储蓄机制",
          content: "设置工资到账自动转账，将 " + Math.round(income * 0.2) + " 元转入储蓄账户。",
        },
      ],
    };
  };

  const plan = showResult ? generatePlan() : null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-gray-50">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">生成你的省钱计划</h1>
            <p className="text-lg opacity-90">
              只需几分钟，获得专属于你的个性化省钱方案
            </p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {!showResult ? (
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>基本信息</span>
                  <span>用户类型</span>
                  <span>储蓄目标</span>
                </div>
                <div className="bg-gray-200 h-2 rounded-full">
                  <div
                    className="bg-green-600 h-2 rounded-full transition-all"
                    style={{ width: `${(step / 3) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Step 1: Basic Info */}
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold">第一步：基本信息</h2>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      月收入（元）
                    </label>
                    <input
                      type="number"
                      value={formData.income}
                      onChange={(e) => setFormData({ ...formData, income: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="例如：8000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      月支出（元）
                    </label>
                    <input
                      type="number"
                      value={formData.expenses}
                      onChange={(e) => setFormData({ ...formData, expenses: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="例如：6000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      现有存款（元）
                    </label>
                    <input
                      type="number"
                      value={formData.savings}
                      onChange={(e) => setFormData({ ...formData, savings: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="例如：50000"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: User Type */}
              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold">第二步：选择你的身份</h2>
                  <div className="grid grid-cols-1 gap-4">
                    {userTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setFormData({ ...formData, userType: type.id })}
                        className={`p-4 rounded-xl border-2 text-left transition-colors ${
                          formData.userType === type.id
                            ? "border-green-500 bg-green-50"
                            : "border-gray-200 hover:border-green-300"
                        }`}
                      >
                        <span className="text-3xl mr-3">{type.icon}</span>
                        <span className="font-medium">{type.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Goals */}
              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold">第三步：你的储蓄目标</h2>
                  <p className="text-gray-600">选择你想要实现的目标（可多选）</p>
                  <div className="grid grid-cols-2 gap-3">
                    {goalOptions.map((goal) => (
                      <button
                        key={goal}
                        onClick={() => {
                          const newGoals = formData.goals.includes(goal)
                            ? formData.goals.filter((g) => g !== goal)
                            : [...formData.goals, goal];
                          setFormData({ ...formData, goals: newGoals });
                        }}
                        className={`p-3 rounded-lg border-2 text-sm transition-colors ${
                          formData.goals.includes(goal)
                            ? "border-green-500 bg-green-50 text-green-700"
                            : "border-gray-200 hover:border-green-300"
                        }`}
                      >
                        {formData.goals.includes(goal) ? "✓ " : ""}
                        {goal}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={handlePrev}
                  disabled={step === 1}
                  className={`px-6 py-3 rounded-lg font-medium ${
                    step === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  上一步
                </button>
                <button
                  onClick={handleNext}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  {step === 3 ? "生成计划" : "下一步"}
                </button>
              </div>
            </div>
          ) : (
            /* Result */
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-2xl font-bold mb-2">你的省钱计划已生成！</h2>
                <p className="text-gray-600">以下是根据你的情况定制的建议</p>
              </div>

              {/* Summary Card */}
              <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl p-8 text-white">
                <h3 className="text-lg font-semibold mb-4">储蓄概览</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-green-100 text-sm">每月可储蓄</p>
                    <p className="text-3xl font-bold">¥{plan?.monthlySavings.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-green-100 text-sm">储蓄率</p>
                    <p className="text-3xl font-bold">{plan?.savingsRate}%</p>
                  </div>
                  <div>
                    <p className="text-green-100 text-sm">每年可存</p>
                    <p className="text-2xl font-bold">¥{plan?.yearlySavings.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-green-100 text-sm">5年后预计</p>
                    <p className="text-2xl font-bold">¥{(plan?.yearlySavings || 0 * 5).toLocaleString()}+</p>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h3 className="text-xl font-bold mb-6">个性化建议</h3>
                <div className="space-y-6">
                  {plan?.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{rec.title}</h4>
                        <p className="text-gray-600">{rec.content}</p>
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
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  重新生成
                </button>
                <button
                  onClick={() => alert("分享功能开发中...")}
                  className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  分享我的计划
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
