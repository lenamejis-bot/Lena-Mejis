import React, { useState } from 'react';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { FoodCard } from '../../components/shared/FoodCard';
import { mockFoods } from '../../data/mockFoods';
import { Search, ShieldCheck, ArrowUpDown } from 'lucide-react';

export const FoodsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'name' | 'fiber' | 'protein' | 'potassium'>('name');

  const categories = ['all', 'Produce', 'Fish & Seafood', 'Grains', 'Dairy', 'Legumes', 'Seeds & Nuts'];

  const filteredFoods = mockFoods.filter(f => {
    const matchesCategory = selectedCategory === 'all' || f.category === selectedCategory;
    const matchesSearch =
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.healthBenefits.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'fiber') return b.fiberG - a.fiberG;
    if (sortBy === 'protein') return b.proteinG - a.proteinG;
    if (sortBy === 'potassium') return b.potassiumMg - a.potassiumMg;
    return a.name.localeCompare(b.name);
  });

  return (
    <PageWrapper title="USDA Verified Foods Database">
      <div className="bg-[#F0F4EF] py-12 border-b border-[#D4E4D0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F] block mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> USDA FoodData Central Verified
            </span>
            <h1 className="font-serif-heading text-4xl sm:text-5xl font-bold text-[#1A2E1A]">
              Nutrient-Dense Food Database
            </h1>
            <p className="text-sm sm:text-base text-[#4A6741] mt-3 leading-relaxed">
              Explore verified laboratory nutrient profiles, standard US household serving weights, cooking recommendations, and evidence-based health impacts.
            </p>
          </div>

          <div className="mt-8 max-w-xl">
            <div className="relative">
              <Search className="w-5 h-5 text-[#8FAE8A] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search food database (e.g. avocado, salmon, oats, kale)..."
                className="w-full h-12 pl-12 pr-4 bg-white rounded-[14px] border border-[#D4E4D0] focus:border-[#2D6A4F] focus:outline-none focus:ring-1 focus:ring-[#2D6A4F] text-sm text-[#1A2E1A] placeholder-[#8FAE8A] shadow-xs"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-[#E8EFE6]">
          {/* Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap capitalize transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#2D6A4F] text-white shadow-xs'
                    : 'bg-white text-[#4A6741] border border-[#D4E4D0] hover:bg-[#F0F4EF]'
                }`}
              >
                {cat === 'all' ? 'All Food Groups' : cat}
              </button>
            ))}
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#2D6A4F]" />
            <span className="text-xs text-[#4A6741] font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="h-9 px-3 text-xs font-semibold rounded-[10px] bg-white border border-[#D4E4D0] text-[#1A2E1A] focus:outline-none focus:ring-1 focus:ring-[#2D6A4F]"
            >
              <option value="name">Alphabetical (A-Z)</option>
              <option value="fiber">Highest Fiber</option>
              <option value="protein">Highest Protein</option>
              <option value="potassium">Highest Potassium</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-[#4A6741] mb-6">
          <span>Showing {filteredFoods.length} reference food items</span>
          <span className="text-[#2D6A4F] font-semibold">Standard Reference Nutrient Data</span>
        </div>

        {filteredFoods.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredFoods.map(food => (
              <FoodCard key={food.id} food={food} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-[24px] border border-[#E8EFE6] p-8">
            <p className="text-[#4A6741] text-sm">No food items found matching "{searchQuery}".</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-3 text-xs font-semibold text-[#2D6A4F] hover:underline cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};
