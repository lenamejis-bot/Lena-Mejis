import React, { useState } from 'react';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { Button } from '../../components/ui/Button';
import { WeeklyCalendar } from '../../components/shared/WeeklyCalendar';
import { MealPlan } from '../../types';
import { generateAiMealPlan } from '../../lib/api';
import { useAppStore } from '../../store/useStore';
import {
  Sparkles,
  Brain,
  CheckCircle2,
  Calendar,
  Clock,
  DollarSign,
  Users,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  RefreshCw,
  ShoppingBag
} from 'lucide-react';

export const MealPlanGeneratorPage: React.FC = () => {
  const { setActiveMealPlan, showToast } = useAppStore();

  const [step, setStep] = useState<number>(1);
  const [goal, setGoal] = useState<string>('balanced');
  const [ageRange, setAgeRange] = useState<string>('26-35');
  const [activityLevel, setActivityLevel] = useState<string>('moderate');
  const [selectedDiets, setSelectedDiets] = useState<string[]>(['Mediterranean']);
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const [weeklyBudget, setWeeklyBudget] = useState<number>(100);
  const [cookingTime, setCookingTime] = useState<string>('30 min');
  const [cookingSkill, setCookingSkill] = useState<string>('intermediate');
  const [householdSize, setHouseholdSize] = useState<number>(2);
  const [isHighThinking, setIsHighThinking] = useState<boolean>(true);

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedPlan, setGeneratedPlan] = useState<MealPlan | null>(null);

  const goalOptions = [
    { id: 'balanced', title: 'Balanced Vitality', desc: 'Sustained daily energy, gut diversity, and general wellness.' },
    { id: 'weight_management', title: 'Weight Management', desc: 'Moderate calorie deficit with high satiety protein & prebiotic fiber.' },
    { id: 'muscle', title: 'Lean Muscle & Recovery', desc: 'High-protein leucine pacing (1.6-2.2g/kg) and clean energy carbs.' },
    { id: 'family', title: 'Family Meal Planning', desc: 'Crowd-pleasing, budget-friendly recipes scaled for busy households.' }
  ];

  const dietOptions = ['Mediterranean', 'High-Protein', 'Vegetarian', 'Vegan', 'Pescatarian', 'Gluten-Free', 'Dairy-Free', 'Low-Sodium'];
  const allergyOptions = ['Peanuts', 'Tree Nuts', 'Shellfish', 'Dairy', 'Eggs', 'Soy', 'Wheat / Gluten'];

  const toggleDiet = (item: string) => {
    setSelectedDiets(prev =>
      prev.includes(item) ? prev.filter(d => d !== item) : [...prev, item]
    );
  };

  const toggleAllergy = (item: string) => {
    setSelectedAllergies(prev =>
      prev.includes(item) ? prev.filter(a => a !== item) : [...prev, item]
    );
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const plan = await generateAiMealPlan({
        goal,
        ageRange,
        activityLevel,
        dietaryPreferences: selectedDiets,
        foodAllergies: selectedAllergies,
        weeklyBudget,
        cookingTime,
        cookingSkill,
        householdSize,
        isHighThinking
      });
      setGeneratedPlan(plan);
      setActiveMealPlan(plan);
      showToast('Generated and activated your custom 7-Day Meal Plan!', 'success');
    } catch (err) {
      showToast('Failed to generate plan. Please try again.', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <PageWrapper title="AI 7-Day Meal Plan Generator">
      <div className="bg-[#F0F4EF] py-12 border-b border-[#D4E4D0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2D6A4F]/10 text-[#2D6A4F] text-xs font-bold uppercase mb-2">
            <Brain className="w-3.5 h-3.5 text-[#F77F00]" />
            High Thinking AI Nutrition Planner
          </div>
          <h1 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#1A2E1A]">
            Personalized 7-Day Meal Plan Generator
          </h1>
          <p className="text-sm text-[#4A6741] mt-2 max-w-xl mx-auto leading-relaxed">
            Answer a few quick questions to create a custom weekly calendar with breakfast, lunch, dinner, snack, and a consolidated grocery list.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        {!generatedPlan ? (
          <div className="bg-white rounded-[28px] border border-[#D4E4D0] p-8 shadow-sm">
            {/* Step Progress Bar */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E8EFE6]">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      step === s
                        ? 'bg-[#2D6A4F] text-white'
                        : step > s
                        ? 'bg-[#52B788] text-white'
                        : 'bg-[#F0F4EF] text-[#8FAE8A]'
                    }`}
                  >
                    {step > s ? '✓' : s}
                  </div>
                  <span className="hidden sm:inline text-xs font-medium text-[#4A6741]">
                    {s === 1 ? 'Primary Goal' : s === 2 ? 'Diet & Allergies' : s === 3 ? 'Budget & Time' : 'Thinking Mode'}
                  </span>
                </div>
              ))}
            </div>

            {/* Step 1: Goal */}
            {step === 1 && (
              <div className="space-y-6">
                <h3 className="font-serif-heading text-xl font-bold text-[#1A2E1A]">
                  Step 1: What is your primary health & nutrition objective?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {goalOptions.map(opt => (
                    <div
                      key={opt.id}
                      onClick={() => setGoal(opt.id)}
                      className={`p-5 rounded-[18px] border transition-all cursor-pointer ${
                        goal === opt.id
                          ? 'bg-[#F0F4EF] border-[#2D6A4F] shadow-xs ring-1 ring-[#2D6A4F]'
                          : 'bg-white border-[#E8EFE6] hover:bg-[#FAFAF7]'
                      }`}
                    >
                      <h4 className="font-bold text-sm text-[#1A2E1A]">{opt.title}</h4>
                      <p className="text-xs text-[#4A6741] mt-1 leading-relaxed">{opt.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#F0F4EF]">
                  <div>
                    <label className="block text-xs font-bold text-[#4A6741] uppercase mb-1">Age Range</label>
                    <select
                      value={ageRange}
                      onChange={(e) => setAgeRange(e.target.value)}
                      className="w-full h-11 px-3 rounded-[10px] bg-[#FAFAF7] border border-[#D4E4D0] text-xs font-semibold"
                    >
                      <option value="18-25">18–25 years</option>
                      <option value="26-35">26–35 years</option>
                      <option value="36-50">36–50 years</option>
                      <option value="51-65">51–65 years</option>
                      <option value="65+">65+ years</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#4A6741] uppercase mb-1">Activity Level</label>
                    <select
                      value={activityLevel}
                      onChange={(e) => setActivityLevel(e.target.value)}
                      className="w-full h-11 px-3 rounded-[10px] bg-[#FAFAF7] border border-[#D4E4D0] text-xs font-semibold"
                    >
                      <option value="sedentary">Sedentary (Desk work)</option>
                      <option value="light">Lightly Active (1-3 days/wk)</option>
                      <option value="moderate">Moderately Active (3-5 days/wk)</option>
                      <option value="active">Very Active (6-7 days/wk)</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button variant="primary" onClick={() => setStep(2)}>
                    Next Step <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Dietary Preferences & Allergies */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif-heading text-xl font-bold text-[#1A2E1A]">
                    Step 2: Dietary Preferences & Allergies
                  </h3>
                  <p className="text-xs text-[#4A6741] mt-1">Select all that apply to tailor recipe suggestions.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4A6741] uppercase mb-2">Dietary Preferences</label>
                  <div className="flex flex-wrap gap-2">
                    {dietOptions.map(diet => (
                      <button
                        key={diet}
                        type="button"
                        onClick={() => toggleDiet(diet)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer border ${
                          selectedDiets.includes(diet)
                            ? 'bg-[#2D6A4F] text-white border-[#2D6A4F]'
                            : 'bg-[#FAFAF7] text-[#4A6741] border-[#D4E4D0] hover:bg-[#F0F4EF]'
                        }`}
                      >
                        {diet}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4A6741] uppercase mb-2">Food Allergies / Exclusions</label>
                  <div className="flex flex-wrap gap-2">
                    {allergyOptions.map(allergy => (
                      <button
                        key={allergy}
                        type="button"
                        onClick={() => toggleAllergy(allergy)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer border ${
                          selectedAllergies.includes(allergy)
                            ? 'bg-[#D62828] text-white border-[#D62828]'
                            : 'bg-[#FAFAF7] text-[#4A6741] border-[#D4E4D0] hover:bg-[#F0F4EF]'
                        }`}
                      >
                        {allergy}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button variant="ghost" onClick={() => setStep(1)}>
                    <ChevronLeft className="w-4 h-4" /> Back
                  </Button>
                  <Button variant="primary" onClick={() => setStep(3)}>
                    Next Step <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Budget & Time */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif-heading text-xl font-bold text-[#1A2E1A]">
                    Step 3: Budget & Kitchen Logistics
                  </h3>
                  <p className="text-xs text-[#4A6741] mt-1">Realistic recipes that match your weekly lifestyle.</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-[#1A2E1A]">
                    <span>Weekly Grocery Budget:</span>
                    <span className="text-[#2D6A4F] text-sm">${weeklyBudget} / week</span>
                  </div>
                  <input
                    type="range"
                    min="35"
                    max="220"
                    step="5"
                    value={weeklyBudget}
                    onChange={(e) => setWeeklyBudget(Number(e.target.value))}
                    className="w-full accent-[#2D6A4F] cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-[#8FAE8A]">
                    <span>Budget-Friendly ($35)</span>
                    <span>Comfortable ($120)</span>
                    <span>Gourmet ($220)</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#F0F4EF]">
                  <div>
                    <label className="block text-xs font-bold text-[#4A6741] uppercase mb-1">Max Daily Prep Time</label>
                    <select
                      value={cookingTime}
                      onChange={(e) => setCookingTime(e.target.value)}
                      className="w-full h-11 px-3 rounded-[10px] bg-[#FAFAF7] border border-[#D4E4D0] text-xs font-semibold"
                    >
                      <option value="15 min">Under 15 minutes (Quick assembly)</option>
                      <option value="30 min">Under 30 minutes (Standard)</option>
                      <option value="45+ min">45+ minutes (Love cooking)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#4A6741] uppercase mb-1">Cooking Skill</label>
                    <select
                      value={cookingSkill}
                      onChange={(e) => setCookingSkill(e.target.value)}
                      className="w-full h-11 px-3 rounded-[10px] bg-[#FAFAF7] border border-[#D4E4D0] text-xs font-semibold"
                    >
                      <option value="beginner">Beginner (Simple steps)</option>
                      <option value="intermediate">Intermediate (Comfortable)</option>
                      <option value="advanced">Advanced (Master)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#4A6741] uppercase mb-1">Household Size</label>
                    <select
                      value={householdSize}
                      onChange={(e) => setHouseholdSize(Number(e.target.value))}
                      className="w-full h-11 px-3 rounded-[10px] bg-[#FAFAF7] border border-[#D4E4D0] text-xs font-semibold"
                    >
                      <option value="1">1 Person (Single)</option>
                      <option value="2">2 People (Couple)</option>
                      <option value="4">4 People (Family)</option>
                      <option value="6">6 People (Large Household)</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button variant="ghost" onClick={() => setStep(2)}>
                    <ChevronLeft className="w-4 h-4" /> Back
                  </Button>
                  <Button variant="primary" onClick={() => setStep(4)}>
                    Next Step <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Thinking Mode & Generation Confirmation */}
            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif-heading text-xl font-bold text-[#1A2E1A]">
                    Step 4: AI Model & Thinking Mode Configuration
                  </h3>
                  <p className="text-xs text-[#4A6741] mt-1">Review your plan parameters before running the AI engine.</p>
                </div>

                {/* High Thinking Callout Box */}
                <div className="p-6 rounded-[20px] bg-gradient-to-r from-[#F0F4EF] to-white border-2 border-[#2D6A4F] space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Brain className="w-5 h-5 text-[#2D6A4F]" />
                      <h4 className="font-bold text-sm text-[#1A2E1A]">
                        High Thinking Mode (Deep Nutritional Reasoning)
                      </h4>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isHighThinking}
                        onChange={(e) => setIsHighThinking(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2D6A4F]"></div>
                    </label>
                  </div>
                  <p className="text-xs text-[#4A6741] leading-relaxed">
                    Uses <strong>gemini-4-argon</strong> with <code>ThinkingLevel.HIGH</code> to rigorously evaluate complete amino acid profiles, prebiotic fiber, omega-3 ratios, and cost efficiency across the full 7-day schedule.
                  </p>
                </div>

                {/* Summary Chips */}
                <div className="p-5 rounded-[16px] bg-[#FAFAF7] border border-[#E8EFE6] space-y-2 text-xs text-[#4A6741]">
                  <div className="flex justify-between">
                    <span>Goal:</span>
                    <strong className="text-[#1A2E1A] capitalize">{goal}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Diet / Allergies:</span>
                    <strong className="text-[#1A2E1A]">{selectedDiets.join(', ')} {selectedAllergies.length > 0 ? `(No ${selectedAllergies.join(', ')})` : ''}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Weekly Budget & Time:</span>
                    <strong className="text-[#1A2E1A]">${weeklyBudget}/week • {cookingTime} max prep</strong>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button variant="ghost" onClick={() => setStep(3)}>
                    <ChevronLeft className="w-4 h-4" /> Back
                  </Button>
                  <Button
                    variant="primary"
                    size="lg"
                    isLoading={isGenerating}
                    onClick={handleGenerate}
                    className="shadow-md"
                  >
                    <Sparkles className="w-4 h-4 text-[#FFBE0B]" />
                    Generate My 7-Day Plan
                  </Button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Output View: Generated Plan */
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="bg-white p-8 rounded-[28px] border border-[#D4E4D0] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-3 py-0.5 rounded-full bg-[#2D6A4F]/10 text-[#2D6A4F] text-xs font-bold uppercase">
                    Generated Plan Ready
                  </span>
                  <span className="text-xs text-[#F77F00] font-bold">
                    Target: ~{generatedPlan.caloriesTarget} kcal / day
                  </span>
                </div>
                <h2 className="font-serif-heading text-3xl font-bold text-[#1A2E1A]">
                  {generatedPlan.title}
                </h2>
                <p className="text-xs text-[#4A6741] mt-1 max-w-xl">
                  {generatedPlan.rationale}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setGeneratedPlan(null)}
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Re-run Questionnaire
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    setActiveMealPlan(generatedPlan);
                    showToast('Saved to your user dashboard!', 'success');
                  }}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" /> Set as Active Plan
                </Button>
              </div>
            </div>

            {/* Render 7-day schedule with full meal swap support */}
            <WeeklyCalendar plan={generatedPlan} interactive={true} />
          </div>
        )}
      </div>
    </PageWrapper>
  );
};
