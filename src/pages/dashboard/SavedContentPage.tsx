import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useAppStore } from '../../store/useStore';
import { mockRecipes } from '../../data/mockRecipes';
import { mockArticles } from '../../data/mockArticles';
import { mockDietPlans } from '../../data/mockDietPlans';
import { RecipeCard } from '../../components/shared/RecipeCard';
import { ArticleCard } from '../../components/shared/ArticleCard';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Bookmark, Utensils, BookOpen, Calendar, ChevronRight, Check } from 'lucide-react';

export const SavedContentPage: React.FC = () => {
  const { user, activeMealPlan, setActiveMealPlan } = useAppStore();
  const [activeTab, setActiveTab] = useState<'recipes' | 'articles' | 'plans'>('recipes');

  const savedRecipes = mockRecipes.filter(r => user.savedRecipeIds.includes(r.id));
  const savedArticles = mockArticles.filter(a => user.savedArticleIds.includes(a.id));

  return (
    <DashboardLayout title="My Saved Content">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8EFE6]">
          <div>
            <h1 className="font-serif-heading text-3xl font-bold text-[#1A2E1A]">
              My Saved Collection
            </h1>
            <p className="text-xs text-[#4A6741] mt-0.5">
              Access your bookmarked recipes, peer-reviewed clinical articles, and 7-day diet plans.
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-[#F0F4EF] rounded-[12px] border border-[#D4E4D0] overflow-x-auto">
            <button
              onClick={() => setActiveTab('recipes')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'recipes'
                  ? 'bg-[#2D6A4F] text-white shadow-xs'
                  : 'text-[#4A6741] hover:text-[#1A2E1A]'
              }`}
            >
              <Utensils className="w-3.5 h-3.5" />
              <span>Recipes ({savedRecipes.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('articles')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'articles'
                  ? 'bg-[#2D6A4F] text-white shadow-xs'
                  : 'text-[#4A6741] hover:text-[#1A2E1A]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Articles ({savedArticles.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('plans')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'plans'
                  ? 'bg-[#2D6A4F] text-white shadow-xs'
                  : 'text-[#4A6741] hover:text-[#1A2E1A]'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Diet Plans ({mockDietPlans.length})</span>
            </button>
          </div>
        </div>

        {activeTab === 'recipes' && (
          <div>
            {savedRecipes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedRecipes.map(recipe => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-[24px] border border-[#E8EFE6] p-12 text-center space-y-3">
                <Bookmark className="w-12 h-12 text-[#8FAE8A] mx-auto" />
                <h3 className="font-serif-heading text-xl font-bold text-[#1A2E1A]">
                  No Saved Recipes Yet
                </h3>
                <p className="text-xs text-[#4A6741] max-w-sm mx-auto">
                  Browse our wholesome recipe library and click the bookmark icon to save recipes for easy meal planning.
                </p>
                <Link to="/recipes" className="inline-block mt-2">
                  <Button variant="primary" size="sm">Browse Recipes</Button>
                </Link>
              </div>
            )}
          </div>
        )}

        {activeTab === 'articles' && (
          <div>
            {savedArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedArticles.map(article => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-[24px] border border-[#E8EFE6] p-12 text-center space-y-3">
                <Bookmark className="w-12 h-12 text-[#8FAE8A] mx-auto" />
                <h3 className="font-serif-heading text-xl font-bold text-[#1A2E1A]">
                  No Saved Articles Yet
                </h3>
                <p className="text-xs text-[#4A6741] max-w-sm mx-auto">
                  Read evidence-based guides on gut health, sleep, and heart health and save them to your reading list.
                </p>
                <Link to="/articles" className="inline-block mt-2">
                  <Button variant="primary" size="sm">Browse Articles</Button>
                </Link>
              </div>
            )}
          </div>
        )}

        {activeTab === 'plans' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockDietPlans.map(plan => {
                const isCurrentlyActive = activeMealPlan?.id === plan.id;
                return (
                  <div
                    key={plan.id}
                    className={`p-6 rounded-[24px] bg-white border transition-all ${
                      isCurrentlyActive
                        ? 'border-[#2D6A4F] ring-2 ring-[#2D6A4F]/20 shadow-md'
                        : 'border-[#E8EFE6] shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-[#F77F00] uppercase tracking-wider">
                        ~{plan.caloriesTarget} kcal / day
                      </span>
                      {isCurrentlyActive && (
                        <span className="px-2.5 py-0.5 rounded-full bg-[#2D6A4F] text-white text-[10px] font-bold flex items-center gap-1">
                          <Check className="w-3 h-3" /> Active Plan
                        </span>
                      )}
                    </div>
                    <h3 className="font-serif-heading text-xl font-bold text-[#1A2E1A]">
                      {plan.title}
                    </h3>
                    <p className="text-xs text-[#4A6741] mt-1.5 leading-relaxed">
                      {plan.goal}
                    </p>
                    <div className="flex items-center gap-4 text-xs font-semibold text-[#8FAE8A] mt-3">
                      <span>7 Full Days</span>
                      <span>•</span>
                      <span>{plan.weeklyGroceryList.length} Grocery Staples</span>
                    </div>

                    <div className="flex items-center gap-3 mt-5 pt-4 border-t border-[#F0F4EF]">
                      <Link to={`/diet-plans/${plan.id}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full justify-center">
                          View Schedule <ChevronRight className="w-3.5 h-3.5 ml-1" />
                        </Button>
                      </Link>
                      {!isCurrentlyActive && (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => setActiveMealPlan(plan)}
                          className="shrink-0"
                        >
                          Set as Active
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
