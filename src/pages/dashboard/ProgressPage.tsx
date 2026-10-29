import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useAppStore } from '../../store/useStore';
import { getProgressCoachFeedback } from '../../lib/api';
import { TrendingUp, Sparkles, CheckCircle2, Flame, Award, Brain, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router-dom';

export const ProgressPage: React.FC = () => {
  const { user, diaryEntries } = useAppStore();

  const [coachData, setCoachData] = useState<{
    coachMessage: string;
    consistencyGrade: string;
    highlight: string;
    microHabitRecommendation: string;
  } | null>(null);
  const [isLoadingCoach, setIsLoadingCoach] = useState(false);

  useEffect(() => {
    async function loadCoach() {
      setIsLoadingCoach(true);
      try {
        const feedback = await getProgressCoachFeedback({
          streakDays: 5,
          loggedMealsCount: 14,
          avgProtein: 92,
          avgFiber: 34,
          goal: user.healthGoal || 'balanced'
        });
        setCoachData(feedback);
      } catch (e) {
        console.warn('Coach feedback error', e);
      } finally {
        setIsLoadingCoach(false);
      }
    }
    loadCoach();
  }, [user.healthGoal]);

  const weeklyDays = [
    { day: 'Mon', protein: 110, fiber: 38, calories: 1920, logged: true },
    { day: 'Tue', protein: 118, fiber: 42, calories: 1960, logged: true },
    { day: 'Wed', protein: 108, fiber: 39, calories: 1890, logged: true },
    { day: 'Thu', protein: 115, fiber: 37, calories: 1940, logged: true },
    { day: 'Fri', protein: 95, fiber: 32, calories: 1820, logged: true },
    { day: 'Sat', protein: 85, fiber: 28, calories: 1750, logged: false },
    { day: 'Sun', protein: 0, fiber: 0, calories: 0, logged: false }
  ];

  return (
    <DashboardLayout title="Weekly Progress & AI Habit Coach">
      <div className="space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F] block mb-1">
            Nutritional Consistency & Trends
          </span>
          <h1 className="font-serif-heading text-3xl font-bold text-[#1A2E1A]">
            Weekly Progress & Habit Coach
          </h1>
          <p className="text-xs sm:text-sm text-[#4A6741] mt-1">
            Focus on sustainable food variety and consistent habits rather than obsessive calorie restriction.
          </p>
        </div>

        {/* AI Coach Card */}
        <div className="bg-gradient-to-r from-emerald-50 via-white to-[#F0F4EF] p-8 rounded-[28px] border-2 border-[#2D6A4F] shadow-md space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#D4E4D0]">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-[#2D6A4F] text-white flex items-center justify-center shadow-xs">
                🌿
              </div>
              <div>
                <h3 className="font-bold text-sm text-[#1A2E1A]">
                  AI Nutrition & Habit Coach Review
                </h3>
                <span className="text-[11px] text-[#2D6A4F] font-semibold">Weekly Report for Week 42</span>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full bg-[#2D6A4F] text-white text-xs font-extrabold">
              Grade: {coachData?.consistencyGrade || 'A'}
            </span>
          </div>

          <p className="text-sm text-[#1A2E1A] leading-relaxed font-medium">
            {coachData?.coachMessage ||
              'You logged meals 5 out of 7 days this week — fantastic consistency! Maintaining routine awareness of food groups is the single greatest predictor of long-term metabolic health.'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-[16px] bg-white border border-[#D4E4D0] space-y-1">
              <span className="text-[10px] font-bold text-[#2D6A4F] uppercase tracking-wider flex items-center gap-1">
                <Award className="w-3.5 h-3.5" /> Weekly Highlight
              </span>
              <p className="text-xs text-[#1A2E1A] font-semibold leading-relaxed">
                {coachData?.highlight || 'Your average daily fiber (34g) surpasses 90% of US adults!'}
              </p>
            </div>

            <div className="p-4 rounded-[16px] bg-white border border-[#D4E4D0] space-y-1">
              <span className="text-[10px] font-bold text-[#F77F00] uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Next Week's Micro-Habit
              </span>
              <p className="text-xs text-[#1A2E1A] font-semibold leading-relaxed">
                {coachData?.microHabitRecommendation || 'Drink a glass of water before morning coffee to optimize intracellular hydration.'}
              </p>
            </div>
          </div>
        </div>

        {/* 7-Day Consistency Grid */}
        <div className="bg-white p-7 rounded-[28px] border border-[#E8EFE6] shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#F0F4EF]">
            <h3 className="font-serif-heading text-xl font-bold text-[#1A2E1A]">
              7-Day Dietary Fiber & Protein Intake
            </h3>
            <span className="text-xs text-[#4A6741] font-semibold">Target: 35g+ Fiber • 100g+ Protein</span>
          </div>

          <div className="grid grid-cols-7 gap-3 text-center">
            {weeklyDays.map((d, i) => (
              <div key={i} className="p-3.5 rounded-[16px] bg-[#FAFAF7] border border-[#E8EFE6] space-y-2">
                <span className="text-xs font-bold text-[#1A2E1A] block">{d.day}</span>
                {d.logged ? (
                  <>
                    <div className="text-[11px] font-semibold text-[#2D6A4F]">{d.fiber}g fiber</div>
                    <div className="text-[11px] font-semibold text-[#3A86FF]">{d.protein}g pro</div>
                    <span className="inline-block w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">✓</span>
                  </>
                ) : (
                  <div className="py-4 text-[11px] text-[#8FAE8A] italic">Not logged</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
