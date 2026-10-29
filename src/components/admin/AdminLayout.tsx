import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PageWrapper } from '../layout/PageWrapper';
import { useAppStore } from '../../store/useStore';
import {
  LayoutDashboard,
  FileText,
  Utensils,
  Apple,
  Users,
  Brain,
  BarChart3,
  LogOut,
  ArrowLeft,
  ShieldCheck
} from 'lucide-react';
import { Button } from '../ui/Button';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
  const location = useLocation();
  const { setUserRole } = useAppStore();

  const adminNav = [
    { name: 'Admin Overview', path: '/admin', icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: 'Articles Management', path: '/admin/articles', icon: <FileText className="w-4 h-4" /> },
    { name: 'Recipe Database', path: '/admin/recipes', icon: <Utensils className="w-4 h-4" /> },
    { name: 'USDA Food Items', path: '/admin/foods', icon: <Apple className="w-4 h-4" /> },
    { name: 'User Accounts', path: '/admin/users', icon: <Users className="w-4 h-4" /> },
    { name: 'AI Models & Prompts', path: '/admin/ai-settings', icon: <Brain className="w-4 h-4" /> },
    { name: 'Platform Analytics', path: '/admin/analytics', icon: <BarChart3 className="w-4 h-4" /> }
  ];

  return (
    <PageWrapper title={`[Admin] ${title}`} hideFooter={true}>
      <div className="bg-[#1A2E1A] text-white px-6 py-3 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#52B788]" />
          <span className="font-bold uppercase tracking-wider">NutriWise Administration Console</span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/" className="text-stone-300 hover:text-white flex items-center gap-1 font-medium">
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Public Site
          </Link>
          <button
            onClick={() => setUserRole('free')}
            className="text-amber-400 hover:underline cursor-pointer"
          >
            Exit Admin Mode
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Admin Sidebar */}
          <aside className="lg:col-span-3 bg-white p-3 rounded-[24px] border border-[#D4E4D0] shadow-xs space-y-1">
            <div className="px-3.5 py-2 text-[10px] font-bold uppercase tracking-wider text-[#8FAE8A]">
              System Operations
            </div>
            {adminNav.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-[12px] text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#2D6A4F] text-white shadow-xs'
                      : 'text-[#4A6741] hover:text-[#1A2E1A] hover:bg-[#F0F4EF]'
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </aside>

          {/* Admin Content */}
          <main className="lg:col-span-9 space-y-6">
            {children}
          </main>
        </div>
      </div>
    </PageWrapper>
  );
};
