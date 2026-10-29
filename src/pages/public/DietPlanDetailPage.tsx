import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { mockDietPlans } from '../../data/mockDietPlans';
import { WeeklyCalendar } from '../../components/shared/WeeklyCalendar';
import { ArrowLeft, CheckCircle2, ShoppingBag, Printer, Share2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useAppStore } from '../../store/useStore';

export const DietPlanDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { setActiveMealPlan, activeMealPlan, showToast } = useAppStore();

  const plan = (slug ? mockDietPlans.find(p => p.id === slug) : activeMealPlan) || activeMealPlan || mockDietPlans[0];
  const [activeTab, setActiveTab] = useState<'calendar' | 'grocery'>('calendar');

  const isActive = activeMealPlan?.id === plan.id;

  const handleActivate = () => {
    setActiveMealPlan(plan);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <PageWrapper title={`${plan.title} — 7-Day Calendar & Grocery List`} description={plan.goal}>
      <div className="bg-white border-b border-[#E8EFE6] print:hidden">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/diet-plans')}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#4A6741] hover:text-[#2D6A4F] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Diet Plans
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#F0F4EF] text-[#4A6741] hover:bg-[#E2ECE0] transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" /> Print Plan
            </button>
            <Button
              variant={isActive ? 'secondary' : 'primary'}
              size="sm"
              onClick={handleActivate}
            >
              {isActive ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2D6A4F]" /> Active Plan
                </>
              ) : (
                'Set as My Active Plan'
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Plan Header */}
        <div className="bg-white p-8 rounded-[24px] border border-[#E8EFE6] shadow-sm">
          <div className="max-w-3xl space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-0.5 rounded-full bg-[#2D6A4F]/10 text-[#2D6A4F] text-xs font-bold uppercase">
                Curated 7-Day Plan
              </span>
              <span className="text-xs font-semibold text-[#F77F00]">
                ~{plan.caloriesTarget} Daily Calories
              </span>
            </div>

            <h1 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#1A2E1A]">
              {plan.title}
            </h1>

            <p className="text-sm font-semibold text-[#2D6A4F]">
              Primary Focus: {plan.goal}
            </p>

            <p className="text-xs sm:text-sm text-[#4A6741] leading-relaxed">
              {plan.rationale}
            </p>
          </div>

          {/* Navigation view toggle */}
          <div className="flex items-center gap-2 mt-8 pt-6 border-t border-[#F0F4EF]">
            <button
              onClick={() => setActiveTab('calendar')}
              className={`px-4 py-2 rounded-[10px] text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'calendar'
                  ? 'bg-[#2D6A4F] text-white shadow-xs'
                  : 'bg-[#F0F4EF] text-[#4A6741] hover:bg-[#E2ECE0]'
              }`}
            >
              7-Day Meal Schedule
            </button>
            <button
              onClick={() => setActiveTab('grocery')}
              className={`px-4 py-2 rounded-[10px] text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'grocery'
                  ? 'bg-[#2D6A4F] text-white shadow-xs'
                  : 'bg-[#F0F4EF] text-[#4A6741] hover:bg-[#E2ECE0]'
              }`}
            >
              Weekly Grocery List ({plan.weeklyGroceryList?.length || 0} items)
            </button>
          </div>
        </div>

        {/* Tab 1: Weekly Calendar */}
        {activeTab === 'calendar' && (
          <WeeklyCalendar plan={plan} interactive={true} />
        )}

        {/* Tab 2: Consolidated Grocery List */}
        {activeTab === 'grocery' && (
          <div className="bg-white p-8 rounded-[24px] border border-[#E8EFE6] shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#F0F4EF]">
              <div>
                <h3 className="font-serif-heading text-xl font-bold text-[#1A2E1A]">
                  Consolidated Shopping List
                </h3>
                <p className="text-xs text-[#4A6741] mt-0.5">
                  Organized by grocery department for efficient in-store navigation.
                </p>
              </div>
              <Link to="/ai/grocery-planner">
                <Button variant="outline" size="sm">
                  Open Interactive Grocery Planner
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(['produce', 'dairy', 'meat', 'pantry', 'frozen'] as const).map(category => {
                const items = (plan.weeklyGroceryList || []).filter(item => item.category === category);
                if (items.length === 0) return null;

                return (
                  <div key={category} className="p-5 rounded-[18px] bg-[#FAFAF7] border border-[#E8EFE6] space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F] border-b border-[#E8EFE6] pb-2">
                      {category}
                    </h4>
                    <ul className="space-y-2 text-xs">
                      {items.map(item => (
                        <li key={item.id} className="flex items-center justify-between text-[#1A2E1A]">
                          <span className="font-medium">{item.name}</span>
                          <span className="text-[#8FAE8A] shrink-0 font-semibold">{item.quantity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};
