import React from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { BarChart3, TrendingUp, Users, Brain, Eye } from 'lucide-react';

export const AdminAnalytics: React.FC = () => {
  const topArticles = [
    { title: 'The Evidence-Based Guide to Dietary Fiber & Microbiome', views: '4,210', avgRead: '5.2 min' },
    { title: 'Cardiovascular Nutrition: Sodium & Potassium Ratio', views: '3,840', avgRead: '4.8 min' },
    { title: 'Protein Pacing and Satiety: Leucine Thresholds', views: '5,120', avgRead: '4.1 min' }
  ];

  const toolUsage = [
    { tool: 'AI Nutrition Chatbot', queries: '4,120 queries', percent: '45%' },
    { tool: '7-Day Meal Plan Generator', queries: '2,890 plans', percent: '30%' },
    { tool: 'Food Photo Meal Analyzer', queries: '1,240 photos', percent: '15%' },
    { tool: 'Nutrition Label Scanner', queries: '950 labels', percent: '10%' }
  ];

  return (
    <AdminLayout title="Platform Analytics">
      <div className="space-y-6">
        <div>
          <h1 className="font-serif-heading text-2xl font-bold text-[#1A2E1A]">
            Traffic & Intelligence Usage Analytics
          </h1>
          <p className="text-xs text-[#4A6741]">
            Privacy-first engagement metrics and AI feature adoption breakdown.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tool usage */}
          <div className="bg-white p-6 rounded-[24px] border border-[#E8EFE6] shadow-xs space-y-4">
            <h3 className="font-serif-heading text-lg font-bold text-[#1A2E1A] flex items-center gap-2">
              <Brain className="w-4 h-4 text-[#2D6A4F]" /> AI Tool Adoption
            </h3>
            <div className="space-y-3">
              {toolUsage.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-[#1A2E1A]">
                    <span>{item.tool}</span>
                    <span className="text-[#2D6A4F]">{item.queries} ({item.percent})</span>
                  </div>
                  <div className="w-full bg-[#F0F4EF] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#2D6A4F] h-full rounded-full" style={{ width: item.percent }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Articles */}
          <div className="bg-white p-6 rounded-[24px] border border-[#E8EFE6] shadow-xs space-y-4">
            <h3 className="font-serif-heading text-lg font-bold text-[#1A2E1A] flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#2D6A4F]" /> Top Read Scientific Articles
            </h3>
            <div className="space-y-2 text-xs">
              {topArticles.map((art, idx) => (
                <div key={idx} className="p-3 rounded-[12px] bg-[#FAFAF7] border border-[#E8EFE6] flex items-center justify-between">
                  <span className="font-semibold text-[#1A2E1A] max-w-xs truncate">{art.title}</span>
                  <div className="text-right shrink-0 ml-2">
                    <span className="font-bold text-[#2D6A4F] block">{art.views} reads</span>
                    <span className="text-[10px] text-[#8FAE8A]">{art.avgRead}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
