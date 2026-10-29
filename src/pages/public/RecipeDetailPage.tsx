import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { mockRecipes } from '../../data/mockRecipes';
import { NutritionFacts } from '../../components/shared/NutritionFacts';
import { ServingCalculator } from '../../components/shared/ServingCalculator';
import { MacroBadges } from '../../components/shared/MacroBadges';
import {
  Clock,
  Printer,
  Bookmark,
  ArrowLeft,
  AlertTriangle,
  Sparkles,
  CheckCircle,
  Share2,
  DollarSign
} from 'lucide-react';
import { useAppStore } from '../../store/useStore';
import { Button } from '../../components/ui/Button';

export const RecipeDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { user, toggleSaveRecipe, showToast } = useAppStore();

  const recipe = mockRecipes.find(r => r.slug === slug) || mockRecipes[0];
  const [servings, setServings] = useState<number>(recipe.servings);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const isSaved = user.savedRecipeIds.includes(recipe.id);
  const scaleRatio = servings / recipe.servings;

  const toggleStep = (stepNumber: number) => {
    if (completedSteps.includes(stepNumber)) {
      setCompletedSteps(completedSteps.filter(s => s !== stepNumber));
    } else {
      setCompletedSteps([...completedSteps, stepNumber]);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Recipe link copied to clipboard!', 'info');
    }
  };

  return (
    <PageWrapper title={recipe.title} description={recipe.description}>
      {/* Top back navigation bar */}
      <div className="bg-white border-b border-[#E8EFE6] print:hidden">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/recipes')}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#4A6741] hover:text-[#2D6A4F] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Recipes
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#F0F4EF] text-[#4A6741] hover:bg-[#E2ECE0] transition-colors cursor-pointer"
              title="Print Recipe Card"
            >
              <Printer className="w-3.5 h-3.5" /> Print
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-full hover:bg-[#F0F4EF] text-[#4A6741] transition-colors cursor-pointer"
              title="Share Recipe"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => toggleSaveRecipe(recipe.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                isSaved ? 'bg-[#2D6A4F] text-white' : 'bg-[#F0F4EF] text-[#4A6741] hover:bg-[#E2ECE0]'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" fill={isSaved ? 'currentColor' : 'none'} />
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Recipe Title & Meta */}
        <div className="max-w-4xl mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-0.5 rounded-full bg-[#2D6A4F]/10 text-[#2D6A4F] text-xs font-bold uppercase tracking-wider">
              {recipe.category}
            </span>
            {recipe.dietaryTags.map((tag, i) => (
              <span key={i} className="px-2.5 py-0.5 rounded-full bg-[#F0F4EF] text-[#4A6741] text-xs font-medium">
                {tag}
              </span>
            ))}
          </div>

          <h1 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A2E1A] leading-[1.2]">
            {recipe.title}
          </h1>

          <p className="text-base text-[#4A6741] mt-3 leading-relaxed">
            {recipe.description}
          </p>

          {/* Quick Metrics Bar */}
          <div className="flex flex-wrap items-center gap-6 mt-6 pt-6 border-t border-[#E8EFE6] text-xs text-[#4A6741]">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#2D6A4F]" />
              <div>
                <span className="text-[#8FAE8A] block">Prep / Cook Time</span>
                <span className="font-bold text-[#1A2E1A]">{recipe.prepTimeMinutes}m prep • {recipe.cookTimeMinutes}m cook</span>
              </div>
            </div>

            <div>
              <span className="text-[#8FAE8A] block">Difficulty</span>
              <span className="font-bold text-[#1A2E1A] capitalize">{recipe.difficulty}</span>
            </div>

            {recipe.estimatedCostPerServingUsd && (
              <div className="flex items-center gap-1">
                <DollarSign className="w-4 h-4 text-[#2D6A4F]" />
                <div>
                  <span className="text-[#8FAE8A] block">Est. Cost / Serving</span>
                  <span className="font-bold text-[#2D6A4F]">${recipe.estimatedCostPerServingUsd.toFixed(2)}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Hero Image */}
        <div className="rounded-[24px] overflow-hidden aspect-[21/9] max-h-[460px] shadow-md border border-[#E8EFE6] mb-12">
          <img
            src={recipe.coverImageUrl}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Two-Column Grid: Left (Ingredients + Nutrition) | Right (Instructions) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Ingredients, Serving Scaler, Nutrition */}
          <div className="lg:col-span-5 space-y-8">
            {/* Interactive Serving Adjuster */}
            <div className="space-y-4">
              <h2 className="font-serif-heading text-2xl font-bold text-[#1A2E1A]">
                Ingredients
              </h2>

              <ServingCalculator
                currentServings={servings}
                baseServings={recipe.servings}
                onServingsChange={setServings}
              />

              {/* Ingredients List */}
              <div className="bg-white rounded-[20px] p-6 border border-[#D4E4D0] shadow-sm space-y-3">
                {recipe.ingredients.map((ing, idx) => {
                  const scaledQty = ing.quantity ? Number((ing.quantity * scaleRatio).toFixed(2)) : undefined;
                  return (
                    <div
                      key={idx}
                      className="flex items-start justify-between py-2 border-b border-[#F0F4EF] last:border-b-0 text-sm"
                    >
                      <div>
                        <span className="font-semibold text-[#1A2E1A]">
                          {scaledQty ? `${scaledQty} ${ing.unit}` : ''} {ing.name}
                        </span>
                        {ing.notes && (
                          <span className="text-xs text-[#8FAE8A] block mt-0.5">({ing.notes})</span>
                        )}
                        {ing.substitution && (
                          <span className="text-xs text-[#52B788] font-medium block mt-0.5">
                            Sub: {ing.substitution}
                          </span>
                        )}
                      </div>
                      {ing.isOptional && (
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-stone-100 text-stone-600">
                          Optional
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Allergens Notice */}
            {recipe.allergens && recipe.allergens.length > 0 && (
              <div className="p-4 bg-amber-50 rounded-[16px] border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Contains Common Allergens:</span>
                  <span>{recipe.allergens.join(', ')}. Check labels carefully.</span>
                </div>
              </div>
            )}

            {/* FDA Nutrition Label */}
            <div className="space-y-3">
              <h3 className="font-serif-heading text-xl font-bold text-[#1A2E1A]">
                Nutrition Facts Card
              </h3>
              <NutritionFacts
                servingSize="1 serving"
                servingsPerContainer={servings}
                calories={recipe.caloriesPerServing}
                totalFatG={recipe.fatG}
                saturatedFatG={recipe.saturatedFatG}
                sodiumMg={recipe.sodiumMg}
                totalCarbsG={recipe.carbsG}
                fiberG={recipe.fiberG}
                sugarG={recipe.sugarG}
                proteinG={recipe.proteinG}
              />
            </div>
          </div>

          {/* Right Column: Step-by-Step Instructions & Storage */}
          <div className="lg:col-span-7 space-y-8">
            <h2 className="font-serif-heading text-2xl font-bold text-[#1A2E1A]">
              Step-by-Step Instructions
            </h2>

            <div className="space-y-6">
              {recipe.steps.map((step) => {
                const isDone = completedSteps.includes(step.stepNumber);
                return (
                  <div
                    key={step.stepNumber}
                    onClick={() => toggleStep(step.stepNumber)}
                    className={`p-6 rounded-[20px] border transition-all cursor-pointer ${
                      isDone
                        ? 'bg-[#F0F4EF]/70 border-[#D4E4D0] opacity-80'
                        : 'bg-white border-[#E8EFE6] shadow-xs hover:border-[#2D6A4F]/40'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Step Number Anchor */}
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shrink-0 transition-colors ${
                          isDone
                            ? 'bg-[#2D6A4F] text-white'
                            : 'bg-[#2D6A4F]/10 text-[#2D6A4F]'
                        }`}
                      >
                        {isDone ? <CheckCircle className="w-5 h-5" /> : step.stepNumber}
                      </div>

                      <div className="flex-1">
                        <p className={`text-base text-[#1A2E1A] leading-relaxed ${isDone ? 'line-through text-stone-500' : ''}`}>
                          {step.instruction}
                        </p>

                        {step.tip && (
                          <div className="mt-3 p-3 rounded-[12px] bg-[#F0F4EF] text-xs text-[#2D6A4F] font-medium flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-[#F77F00]" />
                            <span><strong>Chef Tip:</strong> {step.tip}</span>
                          </div>
                        )}

                        {step.timerMinutes && (
                          <div className="mt-2.5 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-semibold">
                            <Clock className="w-3 h-3 text-[#2D6A4F]" />
                            <span>Timer: {step.timerMinutes} minutes</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Storage and Leftover Guidance */}
            <div className="p-6 bg-[#FAFAF7] rounded-[20px] border border-[#D4E4D0] space-y-2">
              <h3 className="font-serif-heading text-lg font-bold text-[#1A2E1A]">
                Storage & Meal-Prep Advice
              </h3>
              <p className="text-xs text-[#4A6741] leading-relaxed">
                {recipe.storageInstructions}
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};
