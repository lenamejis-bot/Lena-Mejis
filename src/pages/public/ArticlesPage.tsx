import React, { useState } from 'react';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { ArticleCard } from '../../components/shared/ArticleCard';
import { mockArticles } from '../../data/mockArticles';
import { Search, Filter, ShieldCheck } from 'lucide-react';

export const ArticlesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'digestion', name: 'Digestive Wellness' },
    { id: 'heart-health', name: 'Heart Health' },
    { id: 'weight-management', name: 'Weight Management' },
    { id: 'sleep', name: 'Sleep & Recovery' },
    { id: 'hydration', name: 'Hydration' },
    { id: 'energy', name: 'Energy & Metabolism' }
  ];

  const filteredArticles = mockArticles.filter(art => {
    const matchesCategory = selectedCategory === 'all' || art.category === selectedCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <PageWrapper title="Evidence-Based Health & Nutrition Blog">
      <div className="bg-[#F0F4EF] py-12 border-b border-[#D4E4D0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F] block mb-2">
              NutriWise Scientific Journal
            </span>
            <h1 className="font-serif-heading text-4xl sm:text-5xl font-bold text-[#1A2E1A]">
              Evidence-Based Nutrition & Longevity
            </h1>
            <p className="text-sm sm:text-base text-[#4A6741] mt-3 leading-relaxed">
              Every article is authored by clinical nutrition scientists or Registered Dietitians, backed by peer-reviewed literature, and reviewed for factual precision.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mt-8 max-w-xl">
            <div className="relative">
              <Search className="w-5 h-5 text-[#8FAE8A] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles by nutrient, condition, or keyword (e.g. fiber, blood pressure)..."
                className="w-full h-12 pl-12 pr-4 bg-white rounded-[14px] border border-[#D4E4D0] focus:border-[#2D6A4F] focus:outline-none focus:ring-1 focus:ring-[#2D6A4F] text-sm text-[#1A2E1A] placeholder-[#8FAE8A] shadow-xs"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#2D6A4F] text-white shadow-xs'
                  : 'bg-white text-[#4A6741] border border-[#D4E4D0] hover:bg-[#F0F4EF]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-[#4A6741] mb-6">
          <span>Showing {filteredArticles.length} evidence-based articles</span>
          <div className="flex items-center gap-1 text-[#2D6A4F] font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>100% Peer-Reviewed Standards</span>
          </div>
        </div>

        {/* Article Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-[24px] border border-[#E8EFE6] p-8">
            <p className="text-[#4A6741] text-sm">No articles found matching "{searchQuery}".</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-3 text-xs font-semibold text-[#2D6A4F] hover:underline cursor-pointer"
            >
              Reset search filters
            </button>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};
