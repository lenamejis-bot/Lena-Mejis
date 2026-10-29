import React from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useAppStore } from '../../store/useStore';
import { Button } from '../../components/ui/Button';
import {
  Calendar,
  BookOpen,
  Bookmark,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Clock,
  PlusCircle,
  CheckCircle2
} from 'lucide-react';

export const UserDashboard: React.FC = () => {
  const { user, activeMealPlan, diaryEntries } = useAppStore();

  const todayMeals = activeMealPlan?.days[0]?.meals || [];
  const todayCaloriesLogged = diaryEntries.reduce((sum, e) => sum + e.calories, 0);
  const targetCalories = activeMealPlan?.caloriesTarget || 2000;
  const progressPercent = Math.min(100, Math.round((todayCaloriesLogged / targetCalories) * 100));

  return (
    <DashboardLayout title="Health & Nutrition Dashboard">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#2D6A4F] to-[#1E4D38] p-8 rounded-[28px] text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <span className="text-xs uppercase tracking-wider text-[#52B788] font-bold block mb-1">
            Personal Health Portal
          </span>
          <h1 className="font-serif-heading text-3xl font-bold">
            Welcome back, {user.fullName.split(' ')[0]}!
          </h1>
          <p className="text-xs text-white/80 mt-1 max-w-lg leading-relaxed">
            Your active meal plan: <strong>{activeMealPlan?.title || '7-Day Balanced Vitality'}</strong>. You're on a 5-day consistent food awareness streak!
          </p>
        </div>

        <Link to="/ai/meal-plan-generator">
          <Button variant="accent" size="sm" className="shadow-xs shrink-0">
            <Sparkles className="w-3.5 h-3.5" /> Adjust Weekly Plan
          </Button>
        </Link>
      </div>

      {/* Quick Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-[20px] bg-white border border-[#E8EFE6] shadow-xs">
          <span className="text-xs text-[#8FAE8A] font-semibold block">Today's Calories</span>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-2xl font-bold text-[#1A2E1A]">{todayCaloriesLogged}</span>
            <span className="text-xs text-[#4A6741]">/ {targetCalories} kcal</span>
          </div>
          <div className="w-full bg-[#F0F4EF] h-2 rounded-full mt-2.5 overflow-hidden">
            <div className="bg-[#2D6A4F] h-full rounded-full transition-all duration-300" style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>

        <div className="p-5 rounded-[20px] bg-white border border-[#E8EFE6] shadow-xs">
          <span className="text-xs text-[#8FAE8A] font-semibold block">Active Streak</span>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-2xl font-bold text-[#2D6A4F]">5</span>
            <span className="text-xs text-[#4A6741]">days logged</span>
          </div>
          <span className="text-[11px] text-[#52B788] font-semibold mt-2.5 block">Consistent habit ✓</span>
        </div>

        <div className="p-5 rounded-[20px] bg-white border border-[#E8EFE6] shadow-xs">
          <span className="text-xs text-[#8FAE8A] font-semibold block">Saved Recipes</span>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-2xl font-bold text-[#1A2E1A]">{user.savedRecipeIds.length}</span>
            <span className="text-xs text-[#4A6741]">favorites</span>
          </div>
          <Link to="/dashboard/saved" className="text-[11px] text-[#2D6A4F] font-semibold hover:underline mt-2.5 block">
            View Collection →
          </Link>
        </div>

        <div className="p-5 rounded-[20px] bg-white border border-[#E8EFE6] shadow-xs">
          <span className="text-xs text-[#8FAE8A] font-semibold block">Dietary Profile</span>
          <div className="mt-1">
            <span className="text-sm font-bold text-[#1A2E1A] truncate block">
              {user.dietaryPreferences[0] || 'Balanced'}
            </span>
            <span className="text-xs text-[#4A6741]">${user.weeklyBudget}/wk target</span>
          </div>
          <Link to="/dashboard/settings" className="text-[11px] text-[#2D6A4F] font-semibold hover:underline mt-2.5 block">
            Edit Profile →
          </Link>
        </div>
      </div>

      {/* Today's Scheduled Meals */}
      <div className="bg-white p-7 rounded-[28px] border border-[#E8EFE6] shadow-xs space-y-5">
        <div className="flex items-center justify-between pb-4 border-b border-[#F0F4EF]">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F] block">
              Today's Schedule
            </span>
            <h2 className="font-serif-heading text-2xl font-bold text-[#1A2E1A]">
              Meals on {activeMealPlan?.days[0]?.dayName || 'Monday'}
            </h2>
          </div>
          <Link to="/dashboard/meal-plan">
            <Button variant="outline" size="sm">
              View Full 7-Day Plan <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {todayMeals.map((meal, idx) => (
            <div key={idx} className="p-4 rounded-[18px] bg-[#FAFAF7] border border-[#E8EFE6] space-y-2 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#2D6A4F]/10 text-[#2D6A4F]">
                  {meal.mealType}
                </span>
                <h3 className="font-serif-heading text-sm font-bold text-[#1A2E1A] mt-2 line-clamp-2">
                  {meal.title}
                </h3>
              </div>
              <div className="pt-2 border-t border-[#E8EFE6] flex items-center justify-between text-xs text-[#4A6741]">
                <span className="font-bold text-[#1A2E1A]">{meal.calories} kcal</span>
                <span>{meal.proteinG}g protein</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Food Diary Quick Preview */}
      <div className="bg-white p-7 rounded-[28px] border border-[#E8EFE6] shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-[#F0F4EF]">
          <h2 className="font-serif-heading text-xl font-bold text-[#1A2E1A]">
            Recent Food Diary Entries
          </h2>
          <Link to="/dashboard/diary">
            <Button variant="primary" size="sm">
              <PlusCircle className="w-3.5 h-3.5" /> Log a Meal
            </Button>
          </Link>
        </div>

        <div className="space-y-2">
          {diaryEntries.slice(0, 3).map((entry) => (
            <div
              key={entry.id}
              className="p-3.5 rounded-[14px] bg-[#FAFAF7] border border-[#E8EFE6] flex items-center justify-between text-xs"
            >
              <div>
                <span className="font-bold text-[#1A2E1A] text-sm block">{entry.foodName}</span>
                <span className="text-[#8FAE8A] capitalize">{entry.mealType} • {entry.servingAmount}</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-sm text-[#2D6A4F] block">{entry.calories} kcal</span>
                <span className="text-[11px] text-[#4A6741]">{entry.proteinG}g P • {entry.fiberG}g Fiber</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};
