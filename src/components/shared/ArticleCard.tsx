import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ShieldCheck, Bookmark } from 'lucide-react';
import { Article } from '../../types';
import { useAppStore } from '../../store/useStore';

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, featured = false }) => {
  const { user, toggleSaveArticle } = useAppStore();
  const isSaved = user.savedArticleIds.includes(article.id);

  const categoryLabels: Record<string, string> = {
    'weight-management': 'Weight Management',
    'heart-health': 'Heart Health',
    'digestion': 'Digestive Wellness',
    'energy': 'Energy & Metabolism',
    'sleep': 'Sleep & Recovery',
    'hydration': 'Hydration'
  };

  if (featured) {
    return (
      <div className="group relative bg-white rounded-[24px] overflow-hidden border border-[#D4E4D0] shadow-md grid grid-cols-1 md:grid-cols-12 gap-0 hover:shadow-lg transition-all duration-200">
        <div className="md:col-span-7 relative aspect-[16/10] md:aspect-auto overflow-hidden bg-stone-100">
          <img
            src={article.coverImageUrl}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
          />
          <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 text-[#2D6A4F] text-xs font-bold uppercase tracking-wider shadow-xs backdrop-blur-xs">
            {categoryLabels[article.category] || article.category}
          </span>
        </div>
        <div className="md:col-span-5 p-6 md:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 text-xs text-[#4A6741] mb-2.5">
              <span className="flex items-center gap-1 font-medium">
                <Clock className="w-3.5 h-3.5" />
                {article.readingTimeMinutes} min read
              </span>
              <span>•</span>
              <span>Updated {new Date(article.lastReviewedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>

            <Link to={`/articles/${article.slug}`}>
              <h2 className="font-serif-heading text-2xl font-bold text-[#1A2E1A] group-hover:text-[#2D6A4F] transition-colors leading-snug">
                {article.title}
              </h2>
            </Link>

            <p className="text-sm text-[#4A6741] mt-3 line-clamp-3 leading-relaxed">
              {article.excerpt}
            </p>
          </div>

          <div className="pt-6 mt-6 border-t border-[#F0F4EF] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={article.author.avatarUrl}
                alt={article.author.name}
                className="w-10 h-10 rounded-full object-cover border border-[#D4E4D0]"
              />
              <div>
                <p className="text-sm font-bold text-[#1A2E1A]">{article.author.name}</p>
                <p className="text-xs text-[#4A6741]">{article.author.credentials}</p>
              </div>
            </div>

            <button
              onClick={() => toggleSaveArticle(article.id)}
              className={`p-2.5 rounded-full transition-colors cursor-pointer ${
                isSaved ? 'bg-[#2D6A4F] text-white' : 'bg-[#F0F4EF] text-[#4A6741] hover:text-[#2D6A4F]'
              }`}
              title={isSaved ? 'Saved' : 'Save article'}
            >
              <Bookmark className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-white rounded-[20px] overflow-hidden border border-[#E8EFE6] shadow-[0_2px_12px_rgba(45,106,79,0.06)] hover:shadow-[0_8px_24px_rgba(45,106,79,0.12)] hover:-translate-y-1 transition-all duration-200 flex flex-col h-full">
      <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
        <img
          src={article.coverImageUrl}
          alt={article.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold rounded-full bg-white/95 text-[#2D6A4F] backdrop-blur-xs shadow-xs">
          {categoryLabels[article.category] || article.category}
        </span>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleSaveArticle(article.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-xs transition-colors cursor-pointer shadow-xs ${
            isSaved ? 'bg-[#2D6A4F] text-white' : 'bg-white/90 text-[#4A6741] hover:bg-white hover:text-[#2D6A4F]'
          }`}
          title={isSaved ? 'Saved' : 'Save article'}
        >
          <Bookmark className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#4A6741] mb-2 font-medium">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readingTimeMinutes} min read
            </span>
            {article.reviewer && (
              <>
                <span>•</span>
                <span className="flex items-center gap-1 text-[#2D6A4F] font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  RD Reviewed
                </span>
              </>
            )}
          </div>

          <Link to={`/articles/${article.slug}`}>
            <h3 className="font-serif-heading text-lg font-bold text-[#1A2E1A] group-hover:text-[#2D6A4F] transition-colors line-clamp-2 leading-snug">
              {article.title}
            </h3>
          </Link>

          <p className="text-xs text-[#4A6741] mt-2 line-clamp-2 leading-relaxed">
            {article.excerpt}
          </p>
        </div>

        <div className="pt-4 mt-4 border-t border-[#F0F4EF] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img
              src={article.author.avatarUrl}
              alt={article.author.name}
              className="w-7 h-7 rounded-full object-cover border border-[#D4E4D0]"
            />
            <span className="text-xs font-semibold text-[#1A2E1A] truncate max-w-[140px]">
              {article.author.name}
            </span>
          </div>
          <span className="text-[11px] text-[#8FAE8A]">
            {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
        </div>
      </div>
    </div>
  );
};
