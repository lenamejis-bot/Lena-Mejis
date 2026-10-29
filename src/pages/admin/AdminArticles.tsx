import React, { useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { mockArticles } from '../../data/mockArticles';
import { Article } from '../../types';
import { Plus, Eye, Edit, Trash2, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { useAppStore } from '../../store/useStore';

export const AdminArticles: React.FC = () => {
  const { showToast } = useAppStore();
  const [articles, setArticles] = useState<Article[]>(mockArticles);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<any>('digestion');
  const [newExcerpt, setNewExcerpt] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newArt: Article = {
      id: `art-${Date.now()}`,
      title: newTitle,
      slug: newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      excerpt: newExcerpt || 'Clinical nutrition article overview.',
      content: `<p>${newExcerpt}</p>`,
      category: newCategory,
      tags: ['Nutrition', 'Health'],
      coverImageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
      readingTimeMinutes: 5,
      publishedAt: new Date().toISOString().split('T')[0],
      lastReviewedAt: new Date().toISOString().split('T')[0],
      viewCount: 1,
      author: {
        name: 'Dr. Rebecca Vance',
        credentials: 'PhD, Nutritional Sciences',
        avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
        bio: 'Nutritional biochemist.'
      },
      references: []
    };

    setArticles([newArt, ...articles]);
    setIsModalOpen(false);
    setNewTitle('');
    setNewExcerpt('');
    showToast('Published new scientific article!', 'success');
  };

  const handleDelete = (id: string) => {
    setArticles(articles.filter(a => a.id !== id));
    showToast('Article archived.', 'info');
  };

  return (
    <AdminLayout title="Articles Management">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8EFE6]">
          <div>
            <h1 className="font-serif-heading text-2xl font-bold text-[#1A2E1A]">
              Articles & Clinical Reviews
            </h1>
            <p className="text-xs text-[#4A6741]">
              Manage evidence-based health articles, assigned authors, and RD reviewers.
            </p>
          </div>
          <Button variant="primary" size="sm" onClick={() => setIsModalOpen(true)}>
            <Plus className="w-3.5 h-3.5" /> New Article
          </Button>
        </div>

        {/* Article Table */}
        <div className="bg-white rounded-[24px] border border-[#E8EFE6] overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#FAFAF7] border-b border-[#E8EFE6] text-stone-500 font-bold uppercase tracking-wider">
                  <th className="py-3 px-4">Title & Slug</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Author</th>
                  <th className="py-3 px-4">Reviewer</th>
                  <th className="py-3 px-4">Published</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0F4EF]">
                {articles.map((art) => (
                  <tr key={art.id} className="hover:bg-[#FAFAF7] transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-[#1A2E1A] max-w-xs truncate">
                      {art.title}
                      <span className="text-[11px] text-[#8FAE8A] block font-normal">/{art.slug}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-full bg-[#2D6A4F]/10 text-[#2D6A4F] text-[11px] font-bold uppercase">
                        {art.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[#4A6741] font-medium">{art.author.name}</td>
                    <td className="py-3.5 px-4 text-[#2D6A4F] font-semibold">
                      {art.reviewer ? art.reviewer.name : '—'}
                    </td>
                    <td className="py-3.5 px-4 text-stone-500">{art.publishedAt}</td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleDelete(art.id)}
                          className="p-1.5 text-stone-400 hover:text-red-600 transition-colors cursor-pointer"
                          title="Archive"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* New Article Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Create New Health Article"
          subtitle="Add evidence-based nutrition content"
        >
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-[#4A6741] mb-1">Article Title</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Dietary Fiber and Gut Microbiome Diversity"
                className="w-full h-11 px-3.5 rounded-[12px] bg-[#FAFAF7] border border-[#D4E4D0] text-xs font-semibold focus:outline-none focus:border-[#2D6A4F]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#4A6741] mb-1">Category</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full h-11 px-3 rounded-[12px] bg-[#FAFAF7] border border-[#D4E4D0] text-xs font-semibold"
              >
                <option value="digestion">Digestive Wellness</option>
                <option value="heart-health">Heart Health</option>
                <option value="weight-management">Weight Management</option>
                <option value="sleep">Sleep & Recovery</option>
                <option value="hydration">Hydration</option>
                <option value="energy">Energy & Metabolism</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#4A6741] mb-1">Excerpt / Summary</label>
              <textarea
                rows={3}
                required
                value={newExcerpt}
                onChange={(e) => setNewExcerpt(e.target.value)}
                placeholder="Brief peer-reviewed summary..."
                className="w-full p-3 rounded-[12px] bg-[#FAFAF7] border border-[#D4E4D0] text-xs focus:outline-none focus:border-[#2D6A4F]"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Publish Article
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </AdminLayout>
  );
};
