import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PageWrapper } from './PageWrapper';
import { useAppStore } from '../../store/useStore';
import {
  LayoutDashboard,
  Calendar,
  BookOpen,
  ShoppingBag,
  TrendingUp,
  Bookmark,
  CalendarCheck,
  Settings,
  Crown,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Button } from '../ui/Button';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title }) => {
  const { user } = useAppStore();
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard Overview', path: '/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: 'Active Meal Plan', path: '/dashboard/meal-plan', icon: <Calendar className="w-4 h-4" /> },
    { name: 'Food Diary & Macros', path: '/dashboard/diary', icon: <BookOpen className="w-4 h-4" /> },
    { name: 'Weekly Progress & AI Coach', path: '/dashboard/progress', icon: <TrendingUp className="w-4 h-4" /> },
    { name: 'Smart Grocery List', path: '/dashboard/grocery-list', icon: <ShoppingBag className="w-4 h-4" /> },
    { name: 'My Saved Content', path: '/dashboard/saved', icon: <Bookmark className="w-4 h-4" /> },
    { name: 'Dietitian Appointments', path: '/dashboard/appointments', icon: <CalendarCheck className="w-4 h-4" /> },
    { name: 'Account Settings', path: '/dashboard/settings', icon: <Settings className="w-4 h-4" /> }
  ];

  return (
    <PageWrapper title={title}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Sidebar */}
          <aside className="lg:col-span-3 space-y-6">
            {/* User Mini Profile Card */}
            <div className="bg-white p-5 rounded-[24px] border border-[#E8EFE6] shadow-xs">
              <div className="flex items-center gap-3">
                <img
                  src={user.avatarUrl}
                  alt={user.fullName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#D4E4D0]"
                />
                <div className="min-w-0">
                  <h3 className="font-bold text-sm text-[#1A2E1A] truncate">{user.fullName}</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      user.role === 'premium' ? 'bg-[#F77F00]/20 text-[#C46500]' : 'bg-[#2D6A4F]/10 text-[#2D6A4F]'
                    }`}>
                      {user.role} Member
                    </span>
                  </div>
                </div>
              </div>

              {/* 100% Free AI Banner */}
              <div className="mt-4 pt-4 border-t border-[#F0F4EF]">
                <div className="p-3.5 rounded-[16px] bg-gradient-to-r from-emerald-50 to-[#F0F4EF] border border-[#D4E4D0] text-xs">
                  <div className="font-bold text-[#2D6A4F] flex items-center gap-1.5 mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#F77F00]" />
                    100% Free AI Active
                  </div>
                  <p className="text-[11px] text-[#4A6741] leading-snug">
                    All 7 AI tools (Chatbot, 7-Day Meal Plans, Food Vision) are free with unlimited queries.
                  </p>
                  <Link to="/ai/chatbot" className="mt-2.5 block">
                    <Button variant="primary" size="sm" className="w-full text-xs py-1.5">
                      Open AI Chatbot
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Sidebar Navigation Links */}
            <nav className="bg-white p-3 rounded-[24px] border border-[#E8EFE6] shadow-xs space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-[14px] text-xs font-semibold transition-all ${
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
            </nav>
          </aside>

          {/* Main Dashboard Content */}
          <main className="lg:col-span-9 space-y-8">
            {children}
          </main>
        </div>
      </div>
    </PageWrapper>
  );
};
