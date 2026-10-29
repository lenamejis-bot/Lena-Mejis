import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { Button } from '../../components/ui/Button';
import { RecipeCard } from '../../components/shared/RecipeCard';
import { ArticleCard } from '../../components/shared/ArticleCard';
import { FoodCard } from '../../components/shared/FoodCard';
import { DietitianCard } from '../../components/shared/DietitianCard';
import { mockRecipes } from '../../data/mockRecipes';
import { mockArticles } from '../../data/mockArticles';
import { mockFoods } from '../../data/mockFoods';
import { mockDietitians } from '../../data/mockDietitians';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Brain,
  Utensils,
  BookOpen,
  Calendar,
  CheckCircle2,
  Heart,
  TrendingUp,
  Apple
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const [activeRecipeCategory, setActiveRecipeCategory] = useState<'all' | 'dinner' | 'breakfast' | 'lunch' | 'snack'>('all');

  const filteredRecipes = activeRecipeCategory === 'all'
    ? mockRecipes.slice(0, 4)
    : mockRecipes.filter(r => r.category === activeRecipeCategory).slice(0, 4);

  return (
    <PageWrapper title="Evidence-Based Nutrition & AI Meal Planning">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#E8EFE6] bg-gradient-to-b from-white to-[#F0F4EF]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headlines & CTA */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2D6A4F]/10 border border-[#2D6A4F]/20 text-[#2D6A4F] text-xs font-semibold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-[#F77F00]" />
                <span>Next-Gen Nutrition Platform for US Households</span>
              </div>

              <h1 className="font-serif-heading text-4xl sm:text-5xl lg:text-6xl text-[#1A2E1A] tracking-tight leading-[1.1]">
                Eat smarter. <br />
                <span className="text-[#2D6A4F] italic">Live better.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#4A6741] max-w-xl leading-relaxed">
                Empower your family with evidence-based nutrition science, AI-tailored weekly meal plans with thinking mode, realistic grocery budgets, and Board Certified Registered Dietitians.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link to="/ai/chatbot">
                  <Button size="lg" variant="accent" className="shadow-md hover:shadow-lg bg-[#2D6A4F] text-white hover:bg-[#245840]">
                    <span>🌿</span>
                    Ask Free AI Chatbot
                  </Button>
                </Link>
                <Link to="/ai/meal-plan-generator">
                  <Button size="lg" variant="primary" className="shadow-md hover:shadow-lg">
                    <Sparkles className="w-4 h-4" />
                    Free Meal Plan Generator
                  </Button>
                </Link>
                <Link to="/ai-tools">
                  <Button size="lg" variant="outline">
                    All Free AI Tools
                  </Button>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-[#4A6741] font-medium">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#2D6A4F]" />
                  <span>RD & MD Peer-Reviewed</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2D6A4F]" />
                  <span>USDA FoodData Central</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Brain className="w-4 h-4 text-[#F77F00]" />
                  <span>High Thinking AI Mode</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual & Floating Nutrition Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-[32px] overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] bg-stone-100">
                <img
                  src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1000&q=80"
                  alt="Wholesome colorful nutrition bowl"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold">
                      Featured Meal Prep
                    </span>
                    <span className="text-xs text-white/80">35g Protein • 12g Prebiotic Fiber</span>
                  </div>
                  <h3 className="font-serif-heading text-xl font-bold leading-snug">
                    Herb-Crusted Salmon & Warm Quinoa Salad
                  </h3>
                </div>
              </div>

              {/* Floating Daily Target Pill Card */}
              <div className="hidden sm:block absolute -top-4 -left-6 bg-white/95 backdrop-blur-md p-4 rounded-[20px] shadow-xl border border-[#D4E4D0] max-w-xs animate-in slide-in-from-left duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#2D6A4F]/10 flex items-center justify-center text-[#2D6A4F]">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#1A2E1A]">Daily Fiber Target</div>
                    <div className="text-xs text-[#4A6741]">38g / 38g reached (100%)</div>
                  </div>
                </div>
                <div className="w-full bg-[#E8EFE6] h-2 rounded-full mt-2.5 overflow-hidden">
                  <div className="bg-[#2D6A4F] h-full w-full rounded-full"></div>
                </div>
              </div>

              {/* Floating Registered Dietitian Pill */}
              <div className="hidden sm:block absolute -bottom-6 -right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-[18px] shadow-xl border border-[#D4E4D0] animate-in slide-in-from-right duration-300">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1594824813579-455b57f0012b?auto=format&fit=crop&w=120&q=80"
                    alt="Sarah Jenkins RDN"
                    className="w-10 h-10 rounded-full object-cover border-2 border-[#52B788]"
                  />
                  <div>
                    <div className="text-xs font-bold text-[#1A2E1A]">Sarah Jenkins, MS, RDN</div>
                    <div className="text-[11px] text-[#2D6A4F] font-semibold">Registered Dietitian Available</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Key Platform Pillars Strip */}
      <section className="py-10 bg-white border-b border-[#E8EFE6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#2D6A4F]/10 flex items-center justify-center text-[#2D6A4F] shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#1A2E1A]">Evidence-Based</h4>
                <p className="text-xs text-[#4A6741] mt-0.5">Peer-reviewed clinical research and academic references.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F77F00]/15 flex items-center justify-center text-[#F77F00] shrink-0">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#1A2E1A]">Thinking AI Engine</h4>
                <p className="text-xs text-[#4A6741] mt-0.5">Deep nutritional reasoning powered by gemini-4-argon.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#3A86FF]/10 flex items-center justify-center text-[#3A86FF] shrink-0">
                <Apple className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#1A2E1A]">USDA Food Database</h4>
                <p className="text-xs text-[#4A6741] mt-0.5">Laboratory nutrient analysis for verified precision.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-700 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#1A2E1A]">Dietitian Telehealth</h4>
                <p className="text-xs text-[#4A6741] mt-0.5">Consultations with licensed healthcare providers.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. AI Tools Showcase Teaser */}
      <section className="py-16 bg-[#F0F4EF]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F] block mb-1">
                100% Free AI Nutrition Suite
              </span>
              <h2 className="font-serif-heading text-3xl font-bold text-[#1A2E1A]">
                Smart Nutrition Tools — Completely Free (Zero Dollars)
              </h2>
            </div>
            <Link to="/ai-tools">
              <Button variant="outline" size="sm">
                Explore All 7 Free AI Tools <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tool 1 */}
            <div className="bg-white p-6 rounded-[24px] border border-[#D4E4D0] shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-[14px] bg-[#2D6A4F]/10 flex items-center justify-center text-[#2D6A4F] mb-4">
                  <Calendar className="w-6 h-6" />
                </div>
                <h3 className="font-serif-heading text-xl font-bold text-[#1A2E1A] mb-2">
                  Personalized 7-Day Meal Planner
                </h3>
                <p className="text-xs text-[#4A6741] leading-relaxed">
                  Generates customized weekly calendars with breakfast, lunch, dinner, and snacks, matched to your budget ($25–$200/wk) and cooking time.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#F0F4EF] flex items-center justify-between">
                <span className="text-xs text-[#2D6A4F] font-bold">100% Free • Unlimited</span>
                <Link to="/ai/meal-plan-generator">
                  <Button variant="primary" size="sm">Try Generator</Button>
                </Link>
              </div>
            </div>

            {/* Tool 2 */}
            <div className="bg-white p-6 rounded-[24px] border border-[#D4E4D0] shadow-sm hover:shadow-md transition-all flex flex-col justify-between ring-2 ring-[#2D6A4F]/20">
              <div>
                <div className="w-12 h-12 rounded-[14px] bg-emerald-100 flex items-center justify-center text-[#2D6A4F] mb-4">
                  <span className="text-2xl">🌿</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-serif-heading text-xl font-bold text-[#1A2E1A]">
                    Free AI Nutrition Chatbot
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-[#2D6A4F]">
                    FREE
                  </span>
                </div>
                <p className="text-xs text-[#4A6741] leading-relaxed">
                  Ask complex questions about meal prep, nutrient synergy, macro pacing, and grocery swaps with Gemini High Thinking reasoning.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#F0F4EF] flex items-center justify-between">
                <span className="text-xs text-[#2D6A4F] font-bold">100% Free • Unlimited</span>
                <Link to="/ai/chatbot">
                  <Button variant="primary" size="sm">Start Free Chat</Button>
                </Link>
              </div>
            </div>

            {/* Tool 3 */}
            <div className="bg-white p-6 rounded-[24px] border border-[#D4E4D0] shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-[14px] bg-[#3A86FF]/10 flex items-center justify-center text-[#3A86FF] mb-4">
                  <Utensils className="w-6 h-6" />
                </div>
                <h3 className="font-serif-heading text-xl font-bold text-[#1A2E1A] mb-2">
                  Smart Recipe Generator
                </h3>
                <p className="text-xs text-[#4A6741] leading-relaxed">
                  Type what ingredients are sitting in your fridge, and let AI generate delicious, nutrient-dense recipes in under 20 minutes.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#F0F4EF] flex items-center justify-between">
                <span className="text-xs text-[#2D6A4F] font-bold">100% Free • Unlimited</span>
                <Link to="/ai/recipe-generator">
                  <Button variant="primary" size="sm">Create Recipe</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Trending Recipes Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F] block mb-1">
                Delicious & Nourishing
              </span>
              <h2 className="font-serif-heading text-3xl font-bold text-[#1A2E1A]">
                Trending Recipes with Full Nutrition Facts
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {(['all', 'dinner', 'breakfast', 'lunch', 'snack'] as const).map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveRecipeCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-colors cursor-pointer ${
                    activeRecipeCategory === cat
                      ? 'bg-[#2D6A4F] text-white'
                      : 'bg-[#F0F4EF] text-[#4A6741] hover:bg-[#E2ECE0]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredRecipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link to="/recipes">
              <Button variant="outline" size="md">
                Browse All {mockRecipes.length} Tested Recipes <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Evidence-Based Articles Section */}
      <section className="py-16 bg-[#FAFAF7] border-t border-[#E8EFE6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F] block mb-1">
                From the Nutrition Lab
              </span>
              <h2 className="font-serif-heading text-3xl font-bold text-[#1A2E1A]">
                Evidence-Based Health & Wellness Articles
              </h2>
            </div>
            <Link to="/articles">
              <Button variant="outline" size="sm">
                View All Articles <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {mockArticles.slice(0, 3).map((art, idx) => (
              <ArticleCard key={art.id} article={art} featured={idx === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Foods Database Spotlight */}
      <section className="py-16 bg-white border-t border-[#E8EFE6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F] block mb-1">
                USDA FoodData Central
              </span>
              <h2 className="font-serif-heading text-3xl font-bold text-[#1A2E1A]">
                Explore Verified Nutrition Profiles
              </h2>
            </div>
            <Link to="/foods">
              <Button variant="outline" size="sm">
                Search Food Database <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockFoods.slice(0, 4).map(food => (
              <FoodCard key={food.id} food={food} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. Dietitians Directory Spotlight */}
      <section className="py-16 bg-[#F0F4EF]/60 border-t border-[#D4E4D0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F] block mb-1">
                Clinical Healthcare
              </span>
              <h2 className="font-serif-heading text-3xl font-bold text-[#1A2E1A]">
                Consult with Board Certified Registered Dietitians
              </h2>
            </div>
            <Link to="/nutritionist-services">
              <Button variant="outline" size="sm">
                View All Dietitians <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockDietitians.map(rd => (
              <DietitianCard key={rd.id} dietitian={rd} />
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};
