import React from 'react';
import { Link } from 'react-router-dom';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { mockDietPlans } from '../../data/mockDietPlans';
import { Calendar, CheckCircle2, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const DietPlansPage: React.FC = () => {
  return (
    <PageWrapper title="Evidence-Based 7-Day Diet Plans">
      <div className="bg-[#F0F4EF] py-12 border-b border-[#D4E4D0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F] block mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> Registered Dietitian Designed
              </span>
              <h1 className="font-serif-heading text-4xl sm:text-5xl font-bold text-[#1A2E1A]">
                Structured 7-Day Meal Plans
              </h1>
              <p className="text-sm sm:text-base text-[#4A6741] mt-3 leading-relaxed">
                Take the guesswork out of healthy eating. Explore curated 7-day meal schedules, complete with balanced breakfast, lunch, dinner, snack ideas, and consolidated grocery lists.
              </p>
            </div>

            <Link to="/ai/meal-plan-generator">
              <Button size="lg" variant="primary" className="shadow-sm">
                <Sparkles className="w-4 h-4 text-[#FFBE0B]" />
                Generate Custom AI Plan
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {mockDietPlans.map(plan => (
            <div
              key={plan.id}
              className="bg-white rounded-[24px] border border-[#E8EFE6] p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 rounded-full bg-[#2D6A4F]/10 text-[#2D6A4F] text-xs font-bold uppercase tracking-wider">
                    7-Day Protocol
                  </span>
                  <span className="text-xs font-bold text-[#F77F00]">
                    Target: ~{plan.caloriesTarget} kcal / day
                  </span>
                </div>

                <h2 className="font-serif-heading text-2xl font-bold text-[#1A2E1A]">
                  {plan.title}
                </h2>

                <p className="text-xs text-[#4A6741] font-semibold mt-1">
                  Goal: {plan.goal}
                </p>

                <p className="text-sm text-[#4A6741] mt-3 leading-relaxed line-clamp-3">
                  {plan.rationale}
                </p>

                {/* Dietary Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {plan.dietaryPreferences.map((pref, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-[6px] bg-[#F0F4EF] text-[#2D6A4F] text-xs font-medium"
                    >
                      {pref}
                    </span>
                  ))}
                </div>

                {/* Sample Day Preview */}
                <div className="mt-6 p-4 rounded-[16px] bg-[#FAFAF7] border border-[#E8EFE6] space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#8FAE8A] block">
                    Sample Day 1 Menu:
                  </span>
                  <div className="text-xs space-y-1.5 text-[#1A2E1A]">
                    {plan.days[0]?.meals.map((m, mi) => (
                      <div key={mi} className="flex items-center justify-between">
                        <span className="font-medium">
                          <strong className="capitalize text-[#4A6741] font-semibold">{m.mealType}:</strong> {m.title}
                        </span>
                        <span className="text-[11px] text-[#8FAE8A] shrink-0 ml-2">{m.calories} kcal</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#F0F4EF] flex items-center justify-between">
                <div className="text-xs text-[#4A6741]">
                  <span>7 Full Days • Consolidated Shopping List</span>
                </div>
                <Link to={`/diet-plans/${plan.id}`}>
                  <Button variant="primary" size="sm">
                    View Full 7-Day Plan <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
};
