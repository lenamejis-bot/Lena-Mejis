import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MealPlan, MealSlot } from '../../types';
import { Clock, RefreshCw, ChevronRight, Check } from 'lucide-react';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { useAppStore } from '../../store/useStore';

interface WeeklyCalendarProps {
  plan: MealPlan;
  interactive?: boolean;
}

export const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({ plan, interactive = true }) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [replaceModalOpen, setReplaceModalOpen] = useState(false);
  const [targetSlot, setTargetSlot] = useState<{ dayIndex: number; mealType: string; currentTitle: string } | null>(null);

  const { replaceMealInPlan } = useAppStore();

  const currentDay = plan.days[selectedDayIndex] || plan.days[0];

  const mealTypeLabels: Record<string, { label: string; time: string; badgeColor: string }> = {
    breakfast: { label: 'Breakfast', time: '7:30 AM – 8:30 AM', badgeColor: 'bg-amber-100 text-amber-800' },
    lunch: { label: 'Lunch', time: '12:00 PM – 1:00 PM', badgeColor: 'bg-emerald-100 text-emerald-800' },
    dinner: { label: 'Dinner', time: '6:30 PM – 7:30 PM', badgeColor: 'bg-blue-100 text-blue-800' },
    snack: { label: 'Afternoon Fuel', time: '3:30 PM – 4:00 PM', badgeColor: 'bg-purple-100 text-purple-800' }
  };

  // Sample AI replacements
  const replacementOptions: Record<string, Array<{ title: string; calories: number; proteinG: number; carbsG: number; fatG: number; prepTimeMinutes: number }>> = {
    breakfast: [
      { title: 'Spinach & Feta Egg Scramble with Whole Grain Toast', calories: 370, proteinG: 26, carbsG: 28, fatG: 16, prepTimeMinutes: 10 },
      { title: 'Berry Chia Protein Smoothie Bowl with Hemp Seeds', calories: 350, proteinG: 28, carbsG: 40, fatG: 9, prepTimeMinutes: 8 }
    ],
    lunch: [
      { title: 'Mediterranean Lentil & Roasted Beet Salad with Goat Cheese', calories: 390, proteinG: 19, carbsG: 48, fatG: 14, prepTimeMinutes: 15 },
      { title: 'Tuscan White Bean & Kale Stew with Sourdough', calories: 420, proteinG: 22, carbsG: 62, fatG: 9, prepTimeMinutes: 15 }
    ],
    dinner: [
      { title: 'Grilled Lemon Herb Chicken with Roasted Sweet Potatoes', calories: 480, proteinG: 44, carbsG: 38, fatG: 14, prepTimeMinutes: 25 },
      { title: 'Sheet-Pan Pesto Salmon with Asparagus & Baby Potatoes', calories: 510, proteinG: 39, carbsG: 32, fatG: 24, prepTimeMinutes: 25 }
    ],
    snack: [
      { title: 'Greek Yogurt with Raw Walnuts & Wild Honey', calories: 210, proteinG: 18, carbsG: 14, fatG: 9, prepTimeMinutes: 3 },
      { title: 'Avocado Cacao Energy Bites (2 pcs) with Mint Tea', calories: 220, proteinG: 8, carbsG: 24, fatG: 12, prepTimeMinutes: 2 }
    ]
  };

  const handleOpenReplace = (dayIdx: number, mealType: string, currentTitle: string) => {
    setTargetSlot({ dayIndex: dayIdx, mealType, currentTitle });
    setReplaceModalOpen(true);
  };

  const handleSelectReplacement = (option: any) => {
    if (targetSlot) {
      replaceMealInPlan(targetSlot.dayIndex, targetSlot.mealType, option);
      setReplaceModalOpen(false);
      setTargetSlot(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Day Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {plan.days.map((day, idx) => {
          const isSelected = selectedDayIndex === idx;
          return (
            <button
              key={idx}
              onClick={() => setSelectedDayIndex(idx)}
              className={`flex-1 min-w-[110px] p-3 rounded-[16px] text-center transition-all cursor-pointer border ${
                isSelected
                  ? 'bg-[#2D6A4F] text-white border-[#2D6A4F] shadow-sm scale-102 font-bold'
                  : 'bg-white text-[#4A6741] border-[#E8EFE6] hover:bg-[#F0F4EF] hover:border-[#D4E4D0]'
              }`}
            >
              <div className="text-xs uppercase tracking-wider opacity-85">
                Day {idx + 1}
              </div>
              <div className="text-sm font-semibold mt-0.5">{day.dayName}</div>
              <div className={`text-[11px] mt-1 ${isSelected ? 'text-[#52B788]' : 'text-stone-400'}`}>
                {day.totalCalories} kcal
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Day Meals Grid */}
      <div className="bg-white rounded-[24px] border border-[#E8EFE6] p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#F0F4EF]">
          <div>
            <h3 className="font-serif-heading text-xl font-bold text-[#1A2E1A]">
              {currentDay.dayName} Nutrition Overview
            </h3>
            <p className="text-xs text-[#4A6741] mt-0.5">
              Goal Target: ~{plan.caloriesTarget} kcal / day
            </p>
          </div>

          {/* Daily Macro Bar */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="px-3 py-1.5 rounded-[10px] bg-[#F77F00]/10 text-xs">
              <span className="text-[#C46500] font-bold">{currentDay.totalCalories}</span> kcal
            </div>
            <div className="px-3 py-1.5 rounded-[10px] bg-[#3A86FF]/10 text-xs">
              <span className="text-[#1D63D6] font-bold">{currentDay.totalProteinG}g</span> protein
            </div>
            <div className="px-3 py-1.5 rounded-[10px] bg-[#FFBE0B]/20 text-xs">
              <span className="text-[#A67800] font-bold">{currentDay.totalCarbsG}g</span> carbs
            </div>
            <div className="px-3 py-1.5 rounded-[10px] bg-[#FF6B6B]/15 text-xs">
              <span className="text-[#D13B3B] font-bold">{currentDay.totalFatG}g</span> fat
            </div>
            <div className="px-3 py-1.5 rounded-[10px] bg-[#2D6A4F]/10 text-xs">
              <span className="text-[#2D6A4F] font-bold">{currentDay.totalFiberG}g</span> fiber
            </div>
          </div>
        </div>

        {/* Meal Slots List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {currentDay.meals.map((meal, mIdx) => {
            const meta = mealTypeLabels[meal.mealType] || {
              label: meal.mealType,
              time: 'Scheduled',
              badgeColor: 'bg-stone-100 text-stone-800'
            };

            return (
              <div
                key={mIdx}
                className="group p-5 rounded-[18px] bg-[#FAFAF7] border border-[#E8EFE6] hover:border-[#2D6A4F]/40 hover:bg-white hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${meta.badgeColor}`}>
                      {meta.label}
                    </span>
                    <span className="text-[11px] text-[#8FAE8A] flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {meal.prepTimeMinutes}m prep
                    </span>
                  </div>

                  <h4 className="font-serif-heading text-base font-bold text-[#1A2E1A] line-clamp-2">
                    {meal.title}
                  </h4>

                  {meal.notes && (
                    <p className="text-xs text-[#4A6741] mt-1 line-clamp-2 italic">
                      "{meal.notes}"
                    </p>
                  )}
                </div>

                <div className="pt-4 mt-4 border-t border-[#E8EFE6] flex items-center justify-between">
                  <div className="text-xs space-x-2 text-[#4A6741]">
                    <span className="font-bold text-[#1A2E1A]">{meal.calories} kcal</span>
                    <span>•</span>
                    <span>{meal.proteinG}g protein</span>
                    <span>•</span>
                    <span>{meal.carbsG}g C</span>
                    <span>•</span>
                    <span>{meal.fatG}g F</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {interactive && (
                      <button
                        onClick={() => handleOpenReplace(selectedDayIndex, meal.mealType, meal.title)}
                        className="p-1.5 rounded-full text-[#4A6741] hover:bg-[#F0F4EF] hover:text-[#2D6A4F] transition-colors cursor-pointer"
                        title="Swap with AI alternative"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>
                    )}
                    {meal.recipeSlug && (
                      <Link
                        to={`/recipes/${meal.recipeSlug}`}
                        className="text-xs font-semibold text-[#2D6A4F] hover:underline flex items-center gap-0.5"
                      >
                        Recipe <ChevronRight className="w-3 h-3" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Replace Meal Modal */}
      <Modal
        isOpen={replaceModalOpen}
        onClose={() => setReplaceModalOpen(false)}
        title="Swap Meal with AI Alternative"
        subtitle={`Replace "${targetSlot?.currentTitle}" on ${currentDay.dayName}`}
      >
        <div className="space-y-4">
          <p className="text-xs text-[#4A6741]">
            Select an evidence-based alternative tailored to maintain daily caloric targets and macronutrient equilibrium:
          </p>

          <div className="space-y-3">
            {targetSlot && (replacementOptions[targetSlot.mealType] || []).map((opt, idx) => (
              <div
                key={idx}
                className="p-4 rounded-[14px] border border-[#D4E4D0] hover:border-[#2D6A4F] hover:bg-[#F0F4EF]/50 transition-all cursor-pointer flex items-center justify-between group"
                onClick={() => handleSelectReplacement(opt)}
              >
                <div>
                  <h5 className="font-bold text-sm text-[#1A2E1A] group-hover:text-[#2D6A4F] transition-colors">
                    {opt.title}
                  </h5>
                  <div className="flex items-center gap-3 text-xs text-[#4A6741] mt-1">
                    <span className="font-semibold text-amber-700">{opt.calories} kcal</span>
                    <span>{opt.proteinG}g protein</span>
                    <span>{opt.carbsG}g carbs</span>
                    <span>{opt.fatG}g fat</span>
                    <span>{opt.prepTimeMinutes}m prep</span>
                  </div>
                </div>
                <Button size="sm" variant="secondary">
                  <Check className="w-3.5 h-3.5" />
                  Select
                </Button>
              </div>
            ))}
          </div>

          <div className="pt-2 flex justify-end">
            <Button variant="ghost" size="sm" onClick={() => setReplaceModalOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
