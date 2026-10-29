import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useAppStore } from '../../store/useStore';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { mockFoods } from '../../data/mockFoods';
import { PlusCircle, Trash2, Calendar, Sparkles, TrendingUp, Camera, Apple } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FoodDiaryPage: React.FC = () => {
  const { diaryEntries, addFoodDiaryEntry, removeFoodDiaryEntry, activeMealPlan } = useAppStore();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [foodName, setFoodName] = useState('');
  const [mealType, setMealType] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack'>('breakfast');
  const [servingAmount, setServingAmount] = useState('1 serving');
  const [calories, setCalories] = useState<number>(350);
  const [proteinG, setProteinG] = useState<number>(20);
  const [carbsG, setCarbsG] = useState<number>(40);
  const [fatG, setFatG] = useState<number>(12);
  const [fiberG, setFiberG] = useState<number>(6);

  const targetCalories = activeMealPlan?.caloriesTarget || 2000;
  const targetProtein = 120;
  const targetFiber = 35;

  const totalCalories = diaryEntries.reduce((s, e) => s + e.calories, 0);
  const totalProtein = diaryEntries.reduce((s, e) => s + e.proteinG, 0);
  const totalFiber = diaryEntries.reduce((s, e) => s + e.fiberG, 0);

  const handleSelectQuickFood = (food: typeof mockFoods[0]) => {
    setFoodName(food.name);
    setServingAmount(food.defaultServingUnit);
    setCalories(food.calories);
    setProteinG(food.proteinG);
    setCarbsG(food.totalCarbsG);
    setFatG(food.totalFatG);
    setFiberG(food.fiberG);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!foodName.trim()) return;

    addFoodDiaryEntry({
      date: new Date().toISOString().split('T')[0],
      mealType,
      foodName: foodName.trim(),
      servingAmount,
      calories: Number(calories),
      proteinG: Number(proteinG),
      carbsG: Number(carbsG),
      fatG: Number(fatG),
      fiberG: Number(fiberG)
    });

    setIsAddModalOpen(false);
    setFoodName('');
  };

  const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'] as const;

  return (
    <DashboardLayout title="My Food Diary & Daily Macros">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8EFE6]">
        <div>
          <h1 className="font-serif-heading text-3xl font-bold text-[#1A2E1A]">
            Daily Food Diary
          </h1>
          <p className="text-xs text-[#4A6741] mt-0.5">
            Log your daily meals to track macro balance, fiber pacing, and dietary consistency.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/ai/photo-analyzer">
            <Button variant="outline" size="sm">
              <Camera className="w-3.5 h-3.5" /> Photo Log
            </Button>
          </Link>
          <Button variant="primary" size="sm" onClick={() => setIsAddModalOpen(true)}>
            <PlusCircle className="w-3.5 h-3.5" /> Log Meal
          </Button>
        </div>
      </div>

      {/* Daily Progress Bars */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-[20px] bg-white border border-[#E8EFE6] shadow-xs">
          <div className="flex justify-between text-xs font-bold mb-1">
            <span className="text-[#1A2E1A]">Calories</span>
            <span className="text-[#F77F00]">{totalCalories} / {targetCalories} kcal</span>
          </div>
          <div className="w-full bg-[#F0F4EF] h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-[#F77F00] h-full rounded-full transition-all"
              style={{ width: `${Math.min(100, (totalCalories / targetCalories) * 100)}%` }}
            ></div>
          </div>
        </div>

        <div className="p-5 rounded-[20px] bg-white border border-[#E8EFE6] shadow-xs">
          <div className="flex justify-between text-xs font-bold mb-1">
            <span className="text-[#1A2E1A]">Protein</span>
            <span className="text-[#3A86FF]">{totalProtein}g / {targetProtein}g</span>
          </div>
          <div className="w-full bg-[#F0F4EF] h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-[#3A86FF] h-full rounded-full transition-all"
              style={{ width: `${Math.min(100, (totalProtein / targetProtein) * 100)}%` }}
            ></div>
          </div>
        </div>

        <div className="p-5 rounded-[20px] bg-white border border-[#E8EFE6] shadow-xs">
          <div className="flex justify-between text-xs font-bold mb-1">
            <span className="text-[#1A2E1A]">Dietary Fiber</span>
            <span className="text-[#2D6A4F]">{totalFiber}g / {targetFiber}g</span>
          </div>
          <div className="w-full bg-[#F0F4EF] h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-[#2D6A4F] h-full rounded-full transition-all"
              style={{ width: `${Math.min(100, (totalFiber / targetFiber) * 100)}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Categorized Meal Sections */}
      <div className="space-y-6">
        {mealTypes.map((type) => {
          const entries = diaryEntries.filter(e => e.mealType === type);
          const mealCals = entries.reduce((s, e) => s + e.calories, 0);

          return (
            <div key={type} className="bg-white rounded-[24px] border border-[#E8EFE6] p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#F0F4EF]">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#2D6A4F]/10 text-[#2D6A4F] text-xs font-bold uppercase tracking-wider">
                    {type}
                  </span>
                  <span className="text-xs text-[#8FAE8A]">({entries.length} items logged)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-[#1A2E1A]">{mealCals} kcal</span>
                  <button
                    onClick={() => {
                      setMealType(type);
                      setIsAddModalOpen(true);
                    }}
                    className="text-xs text-[#2D6A4F] font-bold hover:underline cursor-pointer"
                  >
                    + Add to {type}
                  </button>
                </div>
              </div>

              {entries.length > 0 ? (
                <div className="space-y-2">
                  {entries.map(entry => (
                    <div
                      key={entry.id}
                      className="p-3.5 rounded-[16px] bg-[#FAFAF7] border border-[#E8EFE6] flex items-center justify-between text-xs hover:bg-white transition-colors"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-[#1A2E1A]">{entry.foodName}</span>
                          {entry.aiAnalyzed && (
                            <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 text-[10px] font-bold">
                              AI Vision
                            </span>
                          )}
                        </div>
                        <span className="text-[#8FAE8A] block mt-0.5">{entry.servingAmount}</span>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <span className="font-bold text-[#1A2E1A]">{entry.calories} kcal</span>
                          <span className="text-[11px] text-[#4A6741] block">
                            {entry.proteinG}g P • {entry.carbsG}g C • {entry.fatG}g F • {entry.fiberG}g Fiber
                          </span>
                        </div>
                        <button
                          onClick={() => removeFoodDiaryEntry(entry.id)}
                          className="p-1.5 text-stone-400 hover:text-red-600 transition-colors cursor-pointer"
                          title="Remove entry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-xs text-[#8FAE8A]">
                  No {type} logged yet today.{' '}
                  <button
                    onClick={() => {
                      setMealType(type);
                      setIsAddModalOpen(true);
                    }}
                    className="text-[#2D6A4F] font-bold hover:underline cursor-pointer"
                  >
                    Click to add
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Manual Entry Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Log a Meal or Food Item"
        subtitle="Record food intake and calculated macronutrients"
      >
        <form onSubmit={handleAddSubmit} className="space-y-4">
          {/* Quick pick chips from USDA database */}
          <div>
            <label className="block text-[11px] font-bold uppercase text-[#4A6741] mb-1.5">
              Quick Select Popular USDA Food:
            </label>
            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-1 bg-[#FAFAF7] rounded-[10px] border border-[#E8EFE6]">
              {mockFoods.map(food => (
                <button
                  key={food.id}
                  type="button"
                  onClick={() => handleSelectQuickFood(food)}
                  className="px-2.5 py-1 text-[11px] font-semibold rounded-full bg-white border border-[#D4E4D0] hover:bg-[#2D6A4F] hover:text-white transition-colors cursor-pointer text-[#1A2E1A]"
                >
                  {food.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-[#4A6741] mb-1">Food / Dish Name</label>
            <input
              type="text"
              required
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              placeholder="e.g. Scrambled eggs with spinach"
              className="w-full h-11 px-3.5 rounded-[10px] bg-[#FAFAF7] border border-[#D4E4D0] text-xs font-medium focus:outline-none focus:border-[#2D6A4F]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase text-[#4A6741] mb-1">Meal Slot</label>
              <select
                value={mealType}
                onChange={(e) => setMealType(e.target.value as any)}
                className="w-full h-11 px-3 rounded-[10px] bg-[#FAFAF7] border border-[#D4E4D0] text-xs font-semibold"
              >
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="snack">Snack</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#4A6741] mb-1">Portion Size</label>
              <input
                type="text"
                value={servingAmount}
                onChange={(e) => setServingAmount(e.target.value)}
                placeholder="e.g. 1 bowl (300g)"
                className="w-full h-11 px-3.5 rounded-[10px] bg-[#FAFAF7] border border-[#D4E4D0] text-xs font-medium focus:outline-none focus:border-[#2D6A4F]"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 pt-2 border-t border-[#F0F4EF]">
            <div>
              <label className="block text-[11px] font-bold text-[#4A6741] uppercase mb-1">Calories</label>
              <input
                type="number"
                value={calories}
                onChange={(e) => setCalories(Number(e.target.value))}
                className="w-full h-10 px-2 text-center rounded-[8px] bg-[#FAFAF7] border border-[#D4E4D0] text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-[#4A6741] uppercase mb-1">Protein (g)</label>
              <input
                type="number"
                value={proteinG}
                onChange={(e) => setProteinG(Number(e.target.value))}
                className="w-full h-10 px-2 text-center rounded-[8px] bg-[#FAFAF7] border border-[#D4E4D0] text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-[#4A6741] uppercase mb-1">Carbs (g)</label>
              <input
                type="number"
                value={carbsG}
                onChange={(e) => setCarbsG(Number(e.target.value))}
                className="w-full h-10 px-2 text-center rounded-[8px] bg-[#FAFAF7] border border-[#D4E4D0] text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-[#4A6741] uppercase mb-1">Fat (g)</label>
              <input
                type="number"
                value={fatG}
                onChange={(e) => setFatG(Number(e.target.value))}
                className="w-full h-10 px-2 text-center rounded-[8px] bg-[#FAFAF7] border border-[#D4E4D0] text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-[#4A6741] uppercase mb-1">Fiber (g)</label>
              <input
                type="number"
                value={fiberG}
                onChange={(e) => setFiberG(Number(e.target.value))}
                className="w-full h-10 px-2 text-center rounded-[8px] bg-[#FAFAF7] border border-[#D4E4D0] text-xs font-bold"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="ghost" size="sm" type="button" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Save Entry
            </Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
};
