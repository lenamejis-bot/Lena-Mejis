import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { mockArticles } from '../../data/mockArticles';
import { Clock, ShieldCheck, Bookmark, ArrowLeft, ExternalLink, Share2 } from 'lucide-react';
import { useAppStore } from '../../store/useStore';
import { Button } from '../../components/ui/Button';
import { ArticleCard } from '../../components/shared/ArticleCard';

export const ArticleDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { user, toggleSaveArticle, showToast } = useAppStore();

  const article = mockArticles.find(a => a.slug === slug) || mockArticles[0];
  const isSaved = user.savedArticleIds.includes(article.id);

  const relatedArticles = mockArticles
    .filter(a => a.id !== article.id && (a.category === article.category || true))
    .slice(0, 3);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Article link copied to clipboard!', 'info');
    }
  };

  return (
    <PageWrapper title={article.title} description={article.excerpt}>
      {/* Top back navigation */}
      <div className="bg-white border-b border-[#E8EFE6]">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/articles')}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#4A6741] hover:text-[#2D6A4F] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Articles
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-full hover:bg-[#F0F4EF] text-[#4A6741] transition-colors cursor-pointer"
              title="Share article"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => toggleSaveArticle(article.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                isSaved ? 'bg-[#2D6A4F] text-white' : 'bg-[#F0F4EF] text-[#4A6741] hover:bg-[#E2ECE0]'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" fill={isSaved ? 'currentColor' : 'none'} />
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        {/* Category & Metadata */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="px-3 py-1 rounded-full bg-[#2D6A4F]/10 text-[#2D6A4F] text-xs font-bold uppercase tracking-wider">
            {article.category.replace('-', ' ')}
          </span>
          <span className="text-xs text-[#8FAE8A]">•</span>
          <span className="flex items-center gap-1 text-xs text-[#4A6741] font-medium">
            <Clock className="w-3.5 h-3.5" />
            {article.readingTimeMinutes} min read
          </span>
          <span className="text-xs text-[#8FAE8A]">•</span>
          <span className="text-xs text-[#4A6741]">
            Published {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
        </div>

        {/* Title */}
        <h1 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A2E1A] leading-[1.2] mb-6">
          {article.title}
        </h1>

        {/* Excerpt Lead */}
        <p className="text-base sm:text-lg text-[#4A6741] font-medium leading-relaxed pb-8 border-b border-[#E8EFE6]">
          {article.excerpt}
        </p>

        {/* Author & Reviewer Card */}
        <div className="my-8 p-6 bg-[#F0F4EF] rounded-[20px] border border-[#D4E4D0] grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Author */}
          <div className="flex items-start gap-3.5">
            <img
              src={article.author.avatarUrl}
              alt={article.author.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-xs shrink-0"
            />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8FAE8A] block">Written By</span>
              <h4 className="text-sm font-bold text-[#1A2E1A]">{article.author.name}</h4>
              <p className="text-xs text-[#2D6A4F] font-semibold">{article.author.credentials}</p>
              <p className="text-[11px] text-[#4A6741] mt-1 leading-snug">{article.author.bio}</p>
            </div>
          </div>

          {/* Reviewer */}
          {article.reviewer && (
            <div className="flex items-start gap-3.5 md:border-l md:border-[#D4E4D0] md:pl-6">
              <img
                src={article.reviewer.avatarUrl}
                alt={article.reviewer.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-xs shrink-0"
              />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#2D6A4F] flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Expert Reviewed
                </span>
                <h4 className="text-sm font-bold text-[#1A2E1A]">{article.reviewer.name}</h4>
                <p className="text-xs text-[#2D6A4F] font-semibold">{article.reviewer.credentials}</p>
                <p className="text-[11px] text-[#4A6741] mt-1 leading-snug">{article.reviewer.title}</p>
              </div>
            </div>
          )}
        </div>

        {/* Cover Photo */}
        <div className="mb-10 rounded-[24px] overflow-hidden aspect-[16/9] shadow-md border border-[#E8EFE6]">
          <img
            src={article.coverImageUrl}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Body HTML Content (Styled to 68 characters per line maximum readable column) */}
        <div
          className="prose prose-stone prose-lg max-w-none text-[#1A2E1A] leading-[1.8] space-y-6 text-[17px]"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* References Footnotes */}
        {article.references && article.references.length > 0 && (
          <div className="mt-12 pt-8 border-t border-[#D4E4D0] bg-white p-6 rounded-[20px] border border-[#E8EFE6]">
            <h3 className="font-serif-heading text-lg font-bold text-[#1A2E1A] mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#2D6A4F]" />
              Scientific References & Sources
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-xs text-[#4A6741]">
              {article.references.map((ref, idx) => (
                <li key={idx} className="leading-relaxed">
                  <span className="font-medium text-[#1A2E1A]">{ref.title}</span> — <em>{ref.source}</em>
                  {ref.url && (
                    <a
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-0.5 ml-1 text-[#2D6A4F] hover:underline"
                    >
                      [PubMed/DOI <ExternalLink className="w-2.5 h-2.5 inline" />]
                    </a>
                  )}
                </li>
              ))}
            </ol>
          </div>
        )}
      </article>

      {/* Related Articles Section */}
      <section className="bg-[#F0F4EF] py-14 border-t border-[#D4E4D0] mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif-heading text-2xl font-bold text-[#1A2E1A]">
              Related Nutrition Articles
            </h2>
            <Link to="/articles">
              <Button variant="outline" size="sm">View All</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map(art => (
              <ArticleCard key={art.id} article={art} />
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};
