import React, { useState } from 'react';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { MacroBadges } from '../../components/shared/MacroBadges';
import { NutritionFacts } from '../../components/shared/NutritionFacts';
import { generateAiRecipe } from '../../lib/api';
import { Recipe } from '../../types';
import { Sparkles, Brain, Plus, X, Clock, AlertTriangle, CheckCircle2, Bookmark } from 'lucide-react';
import { useAppStore } from '../../store/useStore';

export const RecipeGeneratorPage: React.FC = () => {
  const { user, showToast } = useAppStore();

  const [ingredients, setIngredients] = useState<string[]>(['Eggs', 'Baby Spinach', 'Sweet Potato', 'Olive Oil']);
  const [newIngredient, setNewIngredient] = useState('');
  const [dietaryTags, setDietaryTags] = useState<string[]>(['High-Protein']);
  const [maxTime, setMaxTime] = useState<number>(25);
  const [isHighThinking, setIsHighThinking] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [generatedRecipe, setGeneratedRecipe] = useState<Recipe | null>(null);

  const availableDietTags = ['High-Protein', 'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Under 20 min', 'Meal-Prep Friendly'];

  const addIngredient = (e: React.FormEvent) => {
    e.preventDefault();
    if (newIngredient.trim() && !ingredients.includes(newIngredient.trim())) {
      setIngredients([...ingredients, newIngredient.trim()]);
      setNewIngredient('');
    }
  };

  const removeIngredient = (name: string) => {
    setIngredients(ingredients.filter(i => i !== name));
  };

  const toggleTag = (tag: string) => {
    setDietaryTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleGenerate = async () => {
    if (ingredients.length === 0) {
      showToast('Please add at least 1 ingredient from your kitchen!', 'info');
      return;
    }
    setIsLoading(true);
    try {
      const res = await generateAiRecipe({
        ingredients,
        dietaryTags,
        maxTimeMinutes: maxTime,
        isHighThinking
      });
      setGeneratedRecipe(res);
      showToast('Created custom recipe!', 'success');
    } catch (err) {
      showToast('Failed to generate recipe.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageWrapper title="Smart Recipe Generator from Pantry">
      <div className="bg-[#F0F4EF] py-12 border-b border-[#D4E4D0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F] block mb-2 flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#F77F00]" /> Zero-Waste Culinary Intelligence
          </span>
          <h1 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#1A2E1A]">
            Smart Recipe Generator from Fridge Staples
          </h1>
          <p className="text-sm text-[#4A6741] mt-2 max-w-xl mx-auto leading-relaxed">
            Tell AI what items are waiting in your refrigerator or pantry. Get delicious, dietitian-vetted recipes in under 30 minutes.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-5 bg-white p-6 rounded-[24px] border border-[#D4E4D0] shadow-sm space-y-6">
            <div>
              <h3 className="font-serif-heading text-lg font-bold text-[#1A2E1A]">
                1. What ingredients do you have?
              </h3>
              <form onSubmit={addIngredient} className="flex gap-2 mt-2">
                <input
                  type="text"
                  value={newIngredient}
                  onChange={(e) => setNewIngredient(e.target.value)}
                  placeholder="e.g. canned black beans, broccoli, garlic..."
                  className="flex-1 h-11 px-3.5 rounded-[12px] bg-[#FAFAF7] border border-[#D4E4D0] text-xs focus:outline-none focus:border-[#2D6A4F]"
                />
                <Button type="submit" size="sm" variant="primary">
                  <Plus className="w-3.5 h-3.5" /> Add
                </Button>
              </form>

              {/* Tag Pills */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {ingredients.map(ing => (
                  <span
                    key={ing}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F0F4EF] text-[#2D6A4F] text-xs font-semibold border border-[#D4E4D0]"
                  >
                    {ing}
                    <button
                      type="button"
                      onClick={() => removeIngredient(ing)}
                      className="hover:text-red-600 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Dietary Tags */}
            <div>
              <h3 className="font-serif-heading text-lg font-bold text-[#1A2E1A] mb-2">
                2. Dietary Goals
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {availableDietTags.map(tag => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer border ${
                      dietaryTags.includes(tag)
                        ? 'bg-[#2D6A4F] text-white border-[#2D6A4F]'
                        : 'bg-[#FAFAF7] text-[#4A6741] border-[#D4E4D0] hover:bg-[#F0F4EF]'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slider */}
            <div>
              <div className="flex justify-between text-xs font-bold text-[#1A2E1A] mb-1">
                <span>Max Cooking Time:</span>
                <span className="text-[#2D6A4F]">{maxTime} minutes</span>
              </div>
              <input
                type="range"
                min="10"
                max="45"
                step="5"
                value={maxTime}
                onChange={(e) => setMaxTime(Number(e.target.value))}
                className="w-full accent-[#2D6A4F] cursor-pointer"
              />
            </div>

            {/* High Thinking Mode Toggle */}
            <div className="p-4 rounded-[16px] bg-[#F0F4EF] border border-[#D4E4D0] flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#1A2E1A] flex items-center gap-1.5">
                  <Brain className="w-4 h-4 text-[#F77F00]" /> High Thinking Mode
                </span>
                <span className="text-[11px] text-[#4A6741] block">
                  gemini-4-argon with ThinkingLevel.HIGH
                </span>
              </div>
              <input
                type="checkbox"
                checked={isHighThinking}
                onChange={(e) => setIsHighThinking(e.target.checked)}
                className="w-4 h-4 accent-[#2D6A4F] cursor-pointer"
              />
            </div>

            <Button
              variant="primary"
              size="lg"
              className="w-full shadow-md"
              isLoading={isLoading}
              onClick={handleGenerate}
            >
              <Sparkles className="w-4 h-4 text-[#FFBE0B]" />
              Generate Tested Recipe
            </Button>
          </div>

          {/* Recipe Output Display */}
          <div className="lg:col-span-7">
            {generatedRecipe ? (
              <div className="bg-white p-8 rounded-[28px] border border-[#D4E4D0] shadow-sm space-y-6 animate-in fade-in">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#F0F4EF]">
                  <div>
                    <span className="px-3 py-0.5 rounded-full bg-[#2D6A4F]/10 text-[#2D6A4F] text-xs font-bold uppercase">
                      {generatedRecipe.category || 'Dinner'}
                    </span>
                    <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#1A2E1A] mt-1">
                      {generatedRecipe.title}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 text-xs text-[#4A6741] bg-[#F0F4EF] px-3 py-1.5 rounded-full font-semibold">
                      <Clock className="w-3.5 h-3.5 text-[#2D6A4F]" />
                      {(generatedRecipe.prepTimeMinutes || 10) + (generatedRecipe.cookTimeMinutes || 15)} min
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#4A6741] leading-relaxed">
                  {generatedRecipe.description}
                </p>

                {/* Macro Badges */}
                <MacroBadges
                  calories={generatedRecipe.caloriesPerServing}
                  proteinG={generatedRecipe.proteinG}
                  carbsG={generatedRecipe.carbsG}
                  fatG={generatedRecipe.fatG}
                  fiberG={generatedRecipe.fiberG}
                  sodiumMg={generatedRecipe.sodiumMg}
                  size="md"
                />

                {/* Ingredients */}
                <div className="space-y-2">
                  <h3 className="font-serif-heading text-lg font-bold text-[#1A2E1A]">
                    Required Ingredients
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {(generatedRecipe.ingredients || []).map((ing, i) => (
                      <div key={i} className="p-2.5 rounded-[10px] bg-[#FAFAF7] border border-[#E8EFE6] flex items-center justify-between">
                        <span className="font-semibold text-[#1A2E1A]">{ing.quantity ? `${ing.quantity} ${ing.unit}` : ''} {ing.name}</span>
                        {ing.substitution && (
                          <span className="text-[10px] text-[#52B788] italic">Sub: {ing.substitution}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Steps */}
                <div className="space-y-3">
                  <h3 className="font-serif-heading text-lg font-bold text-[#1A2E1A]">
                    Step-by-Step Instructions
                  </h3>
                  <div className="space-y-2">
                    {(generatedRecipe.steps || []).map((s, idx) => (
                      <div key={idx} className="p-3.5 rounded-[14px] bg-[#FAFAF7] border border-[#E8EFE6] flex items-start gap-3 text-xs leading-relaxed">
                        <span className="w-6 h-6 rounded-full bg-[#2D6A4F] text-white flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                          {s.stepNumber || idx + 1}
                        </span>
                        <div className="flex-1">
                          <p className="text-[#1A2E1A] font-medium">{s.instruction}</p>
                          {s.timerMinutes && (
                            <span className="text-[10px] text-[#2D6A4F] font-bold block mt-1">Timer: {s.timerMinutes} mins</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {generatedRecipe.storageInstructions && (
                  <div className="p-4 rounded-[14px] bg-[#F0F4EF] text-xs text-[#4A6741]">
                    <strong>Storage:</strong> {generatedRecipe.storageInstructions}
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white p-12 rounded-[28px] border border-[#E8EFE6] text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#F0F4EF] flex items-center justify-center text-[#2D6A4F] mx-auto text-2xl">
                  🍳
                </div>
                <h3 className="font-serif-heading text-xl font-bold text-[#1A2E1A]">
                  Ready to Cook Something Fresh?
                </h3>
                <p className="text-xs text-[#4A6741] max-w-sm mx-auto leading-relaxed">
                  Add 2 or more ingredients on the left and click Generate. AI will craft a balanced, chef-tested meal with full nutrition metrics.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};
