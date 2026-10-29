import React from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { Users, DollarSign, Brain, FileText, ArrowUpRight, ShieldCheck, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';

export const AdminDashboard: React.FC = () => {
  const stats = [
    { title: 'Total Registered Users', value: '18,420', change: '+12% this month', icon: <Users className="w-5 h-5 text-[#2D6A4F]" /> },
    { title: 'Premium Subscribers', value: '2,890', change: '+18% this month', icon: <DollarSign className="w-5 h-5 text-[#F77F00]" /> },
    { title: 'Monthly Recurring Rev', value: '$26,450', change: 'MRR Growth', icon: <Activity className="w-5 h-5 text-emerald-600" /> },
    { title: 'AI Queries Today', value: '6,140', change: '84% High Thinking', icon: <Brain className="w-5 h-5 text-[#3A86FF]" /> }
  ];

  return (
    <AdminLayout title="Operational Overview">
      <div className="space-y-6">
        <div>
          <h1 className="font-serif-heading text-3xl font-bold text-[#1A2E1A]">
            Operations Dashboard
          </h1>
          <p className="text-xs text-[#4A6741] mt-0.5">
            Real-time platform metrics, content performance, and AI resource usage.
          </p>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, idx) => (
            <div key={idx} className="bg-white p-5 rounded-[20px] border border-[#E8EFE6] shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-[#8FAE8A] font-semibold">{s.title}</span>
                <div className="p-2 rounded-[10px] bg-[#F0F4EF]">{s.icon}</div>
              </div>
              <div className="text-2xl font-bold text-[#1A2E1A]">{s.value}</div>
              <span className="text-[11px] text-[#2D6A4F] font-semibold mt-1 block flex items-center gap-0.5">
                <ArrowUpRight className="w-3.5 h-3.5" /> {s.change}
              </span>
            </div>
          ))}
        </div>

        {/* Content Status & Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-[24px] border border-[#E8EFE6] shadow-xs space-y-4">
            <h3 className="font-serif-heading text-lg font-bold text-[#1A2E1A]">
              Content Pipeline
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-3 rounded-[12px] bg-[#FAFAF7]">
                <span className="font-semibold text-[#1A2E1A]">Published Scientific Articles</span>
                <span className="font-bold text-[#2D6A4F]">6 Live</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-[12px] bg-[#FAFAF7]">
                <span className="font-semibold text-[#1A2E1A]">Tested Healthy Recipes</span>
                <span className="font-bold text-[#2D6A4F]">6 Live</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-[12px] bg-[#FAFAF7]">
                <span className="font-semibold text-[#1A2E1A]">USDA Verified Food Database Items</span>
                <span className="font-bold text-[#2D6A4F]">8 Synced</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-[12px] bg-[#FAFAF7]">
                <span className="font-semibold text-[#1A2E1A]">Board Certified Dietitians</span>
                <span className="font-bold text-[#2D6A4F]">3 Active</span>
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <Link to="/admin/articles">
                <Button size="sm" variant="outline">Manage Articles</Button>
              </Link>
              <Link to="/admin/recipes">
                <Button size="sm" variant="outline">Manage Recipes</Button>
              </Link>
            </div>
          </div>

          <div className="bg-white p-6 rounded-[24px] border border-[#E8EFE6] shadow-xs space-y-4">
            <h3 className="font-serif-heading text-lg font-bold text-[#1A2E1A]">
              AI System Telemetry
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-3 rounded-[12px] bg-[#FAFAF7]">
                <span className="font-semibold text-[#1A2E1A]">Primary LLM Engine</span>
                <span className="font-bold text-[#2D6A4F]">gemini-4-argon / 3.8-flash</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-[12px] bg-[#FAFAF7]">
                <span className="font-semibold text-[#1A2E1A]">Thinking Mode Status</span>
                <span className="font-bold text-[#F77F00]">ThinkingLevel.HIGH Active</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-[12px] bg-[#FAFAF7]">
                <span className="font-semibold text-[#1A2E1A]">Average Response Latency</span>
                <span className="font-bold text-[#1A2E1A]">1.8 seconds</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-[12px] bg-[#FAFAF7]">
                <span className="font-semibold text-[#1A2E1A]">API Status</span>
                <span className="font-bold text-emerald-600 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> 100% Operational
                </span>
              </div>
            </div>

            <div className="pt-2">
              <Link to="/admin/ai-settings">
                <Button size="sm" variant="primary">AI Prompt & Model Settings</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
