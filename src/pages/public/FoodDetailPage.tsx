import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { mockFoods } from '../../data/mockFoods';
import { mockRecipes } from '../../data/mockRecipes';
import { RecipeCard } from '../../components/shared/RecipeCard';
import { MacroBadges } from '../../components/shared/MacroBadges';
import { NutritionFacts } from '../../components/shared/NutritionFacts';
import { ShieldCheck, ArrowLeft, PlusCircle, Sparkles, BookOpen } from 'lucide-react';
import { useAppStore } from '../../store/useStore';
import { Button } from '../../components/ui/Button';

export const FoodDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addFoodDiaryEntry, showToast } = useAppStore();

  const food = mockFoods.find(f => f.slug === slug) || mockFoods[0];
  const [servingMultiplier, setServingMultiplier] = useState<number>(1);

  const relatedRecipes = mockRecipes.filter(r =>
    (food.relatedRecipeSlugs || []).includes(r.slug)
  );

  const handleAddToDiary = () => {
    addFoodDiaryEntry({
      date: new Date().toISOString().split('T')[0],
      mealType: 'lunch',
      foodName: food.name,
      servingAmount: `${servingMultiplier} × ${food.defaultServingUnit}`,
      calories: Math.round(food.calories * servingMultiplier),
      proteinG: Number((food.proteinG * servingMultiplier).toFixed(1)),
      carbsG: Number((food.totalCarbsG * servingMultiplier).toFixed(1)),
      fatG: Number((food.totalFatG * servingMultiplier).toFixed(1)),
      fiberG: Number((food.fiberG * servingMultiplier).toFixed(1)),
    });
  };

  return (
    <PageWrapper title={`${food.name} — USDA Nutrition Facts`} description={food.description}>
      <div className="bg-white border-b border-[#E8EFE6]">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/foods')}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#4A6741] hover:text-[#2D6A4F] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Foods Database
          </button>

          <Button variant="primary" size="sm" onClick={handleAddToDiary}>
            <PlusCircle className="w-3.5 h-3.5" /> Add to Food Diary
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Image & USDA Nutrition Facts Label */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-[24px] overflow-hidden aspect-[4/3] shadow-md border border-[#E8EFE6] bg-stone-100">
              <img
                src={food.imageUrl}
                alt={food.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="bg-white p-5 rounded-[20px] border border-[#D4E4D0] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-[#4A6741]">Portion Multiplier:</span>
                <div className="flex items-center gap-1">
                  {[0.5, 1, 1.5, 2].map(m => (
                    <button
                      key={m}
                      onClick={() => setServingMultiplier(m)}
                      className={`px-2.5 py-1 text-xs rounded-[6px] font-semibold transition-colors cursor-pointer ${
                        servingMultiplier === m
                          ? 'bg-[#2D6A4F] text-white shadow-xs'
                          : 'bg-[#F0F4EF] text-[#4A6741] hover:bg-[#E2ECE0]'
                      }`}
                    >
                      {m}x
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <NutritionFacts
              servingSize={`${servingMultiplier} × ${food.defaultServingUnit}`}
              servingsPerContainer={1}
              calories={Math.round(food.calories * servingMultiplier)}
              totalFatG={Number((food.totalFatG * servingMultiplier).toFixed(1))}
              saturatedFatG={Number((food.saturatedFatG * servingMultiplier).toFixed(1))}
              sodiumMg={Math.round(food.sodiumMg * servingMultiplier)}
              totalCarbsG={Number((food.totalCarbsG * servingMultiplier).toFixed(1))}
              fiberG={Number((food.fiberG * servingMultiplier).toFixed(1))}
              sugarG={Number((food.totalSugarsG * servingMultiplier).toFixed(1))}
              proteinG={Number((food.proteinG * servingMultiplier).toFixed(1))}
              calciumMg={Math.round(food.calciumMg * servingMultiplier)}
              ironMg={Number((food.ironMg * servingMultiplier).toFixed(1))}
              potassiumMg={Math.round(food.potassiumMg * servingMultiplier)}
              vitaminCMg={Math.round(food.vitaminCMg * servingMultiplier)}
            />
          </div>

          {/* Right Column: Detailed Culinary & Micronutrient Guidance */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-0.5 rounded-full bg-[#2D6A4F]/10 text-[#2D6A4F] text-xs font-bold uppercase">
                  {food.category}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#F0F4EF] text-[#4A6741] text-xs font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#52B788]" />
                  USDA FoodData Central #{food.usdaFdcId}
                </span>
              </div>

              <h1 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#1A2E1A]">
                {food.name}
              </h1>

              <p className="text-base text-[#4A6741] mt-3 leading-relaxed">
                {food.description}
              </p>
            </div>

            {/* Health Benefits Callout */}
            <div className="p-6 bg-[#F0F4EF] rounded-[20px] border border-[#D4E4D0] space-y-2">
              <h3 className="font-serif-heading text-lg font-bold text-[#1A2E1A] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#F77F00]" />
                Evidence-Based Health Benefits
              </h3>
              <p className="text-sm text-[#245840] leading-relaxed">
                {food.healthBenefits}
              </p>
            </div>

            {/* Culinary Preparation & Storage */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 bg-white rounded-[18px] border border-[#E8EFE6] space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A2E1A]">
                  Preparation Methods
                </h4>
                <p className="text-xs text-[#4A6741] leading-relaxed">
                  {food.preparationMethods}
                </p>
              </div>

              <div className="p-5 bg-white rounded-[18px] border border-[#E8EFE6] space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A2E1A]">
                  Storage & Shelf-Life
                </h4>
                <p className="text-xs text-[#4A6741] leading-relaxed">
                  {food.storageInstructions}
                </p>
              </div>
            </div>

            {/* Micronutrient Profile Highlights */}
            <div className="bg-white p-6 rounded-[20px] border border-[#E8EFE6] space-y-4">
              <h3 className="font-serif-heading text-lg font-bold text-[#1A2E1A]">
                Key Micronutrient Breakdown (per 100g)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="p-3 rounded-[12px] bg-[#FAFAF7] border border-[#E8EFE6]">
                  <span className="text-[11px] text-[#8FAE8A] block">Potassium</span>
                  <span className="text-base font-bold text-[#1A2E1A]">{food.potassiumMg} mg</span>
                </div>
                <div className="p-3 rounded-[12px] bg-[#FAFAF7] border border-[#E8EFE6]">
                  <span className="text-[11px] text-[#8FAE8A] block">Vitamin C</span>
                  <span className="text-base font-bold text-[#1A2E1A]">{food.vitaminCMg} mg</span>
                </div>
                <div className="p-3 rounded-[12px] bg-[#FAFAF7] border border-[#E8EFE6]">
                  <span className="text-[11px] text-[#8FAE8A] block">Calcium</span>
                  <span className="text-base font-bold text-[#1A2E1A]">{food.calciumMg} mg</span>
                </div>
                <div className="p-3 rounded-[12px] bg-[#FAFAF7] border border-[#E8EFE6]">
                  <span className="text-[11px] text-[#8FAE8A] block">Iron</span>
                  <span className="text-base font-bold text-[#1A2E1A]">{food.ironMg} mg</span>
                </div>
              </div>
            </div>

            {/* Related Recipes */}
            {relatedRecipes.length > 0 && (
              <div className="pt-4 space-y-4">
                <h3 className="font-serif-heading text-xl font-bold text-[#1A2E1A]">
                  Tested Recipes Featuring {food.name}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {relatedRecipes.map(r => (
                    <RecipeCard key={r.id} recipe={r} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};
