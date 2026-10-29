import React, { useState } from 'react';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { RecipeCard } from '../../components/shared/RecipeCard';
import { mockRecipes } from '../../data/mockRecipes';
import { Search, Clock, DollarSign, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';

export const RecipesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDiet, setSelectedDiet] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [maxTime, setMaxTime] = useState<number>(60);

  const categories = [
    { id: 'all', name: 'All Meals' },
    { id: 'breakfast', name: 'Breakfast' },
    { id: 'lunch', name: 'Lunch' },
    { id: 'dinner', name: 'Dinner' },
    { id: 'snack', name: 'Snacks' },
    { id: 'meal-prep', name: 'Meal Prep' }
  ];

  const diets = [
    { id: 'all', name: 'Any Diet' },
    { id: 'High-Protein', name: 'High-Protein' },
    { id: 'Mediterranean', name: 'Mediterranean' },
    { id: 'Gluten-Free', name: 'Gluten-Free' },
    { id: 'Vegan', name: 'Vegan / Plant-Based' },
    { id: 'Heart-Healthy', name: 'Heart-Healthy' }
  ];

  const filteredRecipes = mockRecipes.filter(r => {
    const matchesCategory = selectedCategory === 'all' || r.category === selectedCategory;
    const matchesDiet = selectedDiet === 'all' || r.dietaryTags.includes(selectedDiet);
    const matchesTime = (r.prepTimeMinutes + r.cookTimeMinutes) <= maxTime;
    const matchesSearch =
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.ingredients.some(i => i.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesDiet && matchesTime && matchesSearch;
  });

  return (
    <PageWrapper title="Healthy Recipe Library with Nutrition Facts">
      <div className="bg-[#F0F4EF] py-12 border-b border-[#D4E4D0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F] block mb-2">
                NutriWise Test Kitchen
              </span>
              <h1 className="font-serif-heading text-4xl sm:text-5xl font-bold text-[#1A2E1A]">
                Nourishing Recipes for US Kitchens
              </h1>
              <p className="text-sm sm:text-base text-[#4A6741] mt-3 leading-relaxed">
                Every recipe is created with standard US measurements, full FDA-style nutrition labels, allergen callouts, and budget-friendly ingredients.
              </p>
            </div>

            <Link to="/ai/recipe-generator">
              <Button variant="primary" className="shadow-sm">
                <Sparkles className="w-4 h-4 text-[#FFBE0B]" />
                Generate from My Ingredients
              </Button>
            </Link>
          </div>

          {/* Search bar */}
          <div className="mt-8 max-w-xl">
            <div className="relative">
              <Search className="w-5 h-5 text-[#8FAE8A] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by ingredient, recipe name (e.g. salmon, kale, oats)..."
                className="w-full h-12 pl-12 pr-4 bg-white rounded-[14px] border border-[#D4E4D0] focus:border-[#2D6A4F] focus:outline-none focus:ring-1 focus:ring-[#2D6A4F] text-sm text-[#1A2E1A] placeholder-[#8FAE8A] shadow-xs"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filter Controls Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-[#E8EFE6]">
          {/* Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#2D6A4F] text-white shadow-xs'
                    : 'bg-white text-[#4A6741] border border-[#D4E4D0] hover:bg-[#F0F4EF]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Diet dropdown & Max time slider */}
          <div className="flex flex-wrap items-center gap-4">
            <select
              value={selectedDiet}
              onChange={(e) => setSelectedDiet(e.target.value)}
              className="h-9 px-3 text-xs font-semibold rounded-[10px] bg-white border border-[#D4E4D0] text-[#1A2E1A] focus:outline-none focus:ring-1 focus:ring-[#2D6A4F]"
            >
              {diets.map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>

            <div className="flex items-center gap-2 text-xs text-[#4A6741]">
              <Clock className="w-3.5 h-3.5 text-[#2D6A4F]" />
              <span>Under {maxTime} min</span>
              <input
                type="range"
                min="10"
                max="60"
                step="5"
                value={maxTime}
                onChange={(e) => setMaxTime(Number(e.target.value))}
                className="w-24 accent-[#2D6A4F] cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Recipe Grid */}
        <div className="flex items-center justify-between text-xs text-[#4A6741] mb-6">
          <span>Showing {filteredRecipes.length} recipes</span>
          <span className="text-[#2D6A4F] font-semibold">Standard US Cups & Ounces</span>
        </div>

        {filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRecipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-[24px] border border-[#E8EFE6] p-8">
            <p className="text-[#4A6741] text-sm">No recipes match your current filters.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedDiet('all');
                setMaxTime(60);
                setSearchQuery('');
              }}
              className="mt-3 text-xs font-semibold text-[#2D6A4F] hover:underline cursor-pointer"
            >
              Reset all filters
            </button>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};
