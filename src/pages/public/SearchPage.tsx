import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { mockArticles } from '../../data/mockArticles';
import { mockRecipes } from '../../data/mockRecipes';
import { mockFoods } from '../../data/mockFoods';
import { mockDietPlans } from '../../data/mockDietPlans';
import { Search, BookOpen, Utensils, Apple, Calendar, ChevronRight } from 'lucide-react';
import { ArticleCard } from '../../components/shared/ArticleCard';
import { RecipeCard } from '../../components/shared/RecipeCard';
import { FoodCard } from '../../components/shared/FoodCard';

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState<'all' | 'articles' | 'recipes' | 'foods' | 'plans'>('all');

  useEffect(() => {
    if (initialQuery !== query) {
      setQuery(initialQuery);
    }
  }, [initialQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    setSearchParams(val ? { q: val } : {});
  };

  const q = query.trim().toLowerCase();

  const matchingArticles = mockArticles.filter(a =>
    !q || a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q) || a.tags.some(t => t.toLowerCase().includes(q))
  );

  const matchingRecipes = mockRecipes.filter(r =>
    !q || r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q) || r.ingredients.some(i => i.name.toLowerCase().includes(q))
  );

  const matchingFoods = mockFoods.filter(f =>
    !q || f.name.toLowerCase().includes(q) || f.description.toLowerCase().includes(q) || f.category.toLowerCase().includes(q)
  );

  const matchingPlans = mockDietPlans.filter(p =>
    !q || p.title.toLowerCase().includes(q) || p.goal.toLowerCase().includes(q)
  );

  const totalResults = matchingArticles.length + matchingRecipes.length + matchingFoods.length + matchingPlans.length;

  return (
    <PageWrapper title="Universal Nutrition Search">
      <div className="bg-[#F0F4EF] py-10 border-b border-[#D4E4D0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="font-serif-heading text-3xl font-bold text-[#1A2E1A] mb-3">
            Search NutriWise
          </h1>
          <div className="relative">
            <Search className="w-5 h-5 text-[#8FAE8A] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={handleSearchChange}
              placeholder="Search across all articles, recipes, USDA foods, and meal plans..."
              className="w-full h-14 pl-12 pr-4 bg-white rounded-[16px] border border-[#D4E4D0] focus:border-[#2D6A4F] focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/20 text-base text-[#1A2E1A] placeholder-[#8FAE8A] shadow-xs"
              autoFocus
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'all', label: `All Results (${totalResults})` },
              { id: 'recipes', label: `Recipes (${matchingRecipes.length})` },
              { id: 'articles', label: `Articles (${matchingArticles.length})` },
              { id: 'foods', label: `USDA Foods (${matchingFoods.length})` },
              { id: 'plans', label: `Diet Plans (${matchingPlans.length})` }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#2D6A4F] text-white shadow-xs'
                    : 'bg-white text-[#4A6741] border border-[#D4E4D0] hover:bg-[#E2ECE0]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* Diet Plans Section */}
        {(activeTab === 'all' || activeTab === 'plans') && matchingPlans.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-4 h-4 text-[#2D6A4F]" />
              <h2 className="font-serif-heading text-xl font-bold text-[#1A2E1A]">
                7-Day Diet Plans ({matchingPlans.length})
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {matchingPlans.map(plan => (
                <div key={plan.id} className="p-6 bg-white rounded-[20px] border border-[#E8EFE6] shadow-xs flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#F77F00] uppercase">~{plan.caloriesTarget} kcal / day</span>
                    <h3 className="font-serif-heading text-lg font-bold text-[#1A2E1A] mt-1">{plan.title}</h3>
                    <p className="text-xs text-[#4A6741] mt-1.5 line-clamp-2">{plan.goal}</p>
                  </div>
                  <Link to={`/diet-plans/${plan.id}`} className="mt-4 text-xs font-bold text-[#2D6A4F] hover:underline flex items-center gap-1">
                    View 7-day schedule <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recipes Section */}
        {(activeTab === 'all' || activeTab === 'recipes') && matchingRecipes.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Utensils className="w-4 h-4 text-[#2D6A4F]" />
              <h2 className="font-serif-heading text-xl font-bold text-[#1A2E1A]">
                Recipes ({matchingRecipes.length})
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchingRecipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </div>
        )}

        {/* USDA Foods Section */}
        {(activeTab === 'all' || activeTab === 'foods') && matchingFoods.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Apple className="w-4 h-4 text-[#2D6A4F]" />
              <h2 className="font-serif-heading text-xl font-bold text-[#1A2E1A]">
                USDA Foods ({matchingFoods.length})
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {matchingFoods.map(food => (
                <FoodCard key={food.id} food={food} />
              ))}
            </div>
          </div>
        )}

        {/* Articles Section */}
        {(activeTab === 'all' || activeTab === 'articles') && matchingArticles.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-4 h-4 text-[#2D6A4F]" />
              <h2 className="font-serif-heading text-xl font-bold text-[#1A2E1A]">
                Nutrition Articles ({matchingArticles.length})
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {matchingArticles.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        )}

        {totalResults === 0 && (
          <div className="text-center py-20 bg-white rounded-[24px] border border-[#E8EFE6] p-8">
            <p className="text-sm text-[#4A6741]">No matching results found for "{query}".</p>
            <p className="text-xs text-[#8FAE8A] mt-1">Try searching for broader terms like "salmon", "fiber", "potassium", or "breakfast".</p>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};
