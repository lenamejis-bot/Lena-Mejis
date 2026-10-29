import React from 'react';
import { Link } from 'react-router-dom';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { Button } from '../../components/ui/Button';
import {
  Sparkles,
  Calendar,
  MessageSquare,
  Utensils,
  ShoppingBag,
  Camera,
  ScanLine,
  TrendingUp,
  Brain,
  CheckCircle2,
  Gift
} from 'lucide-react';

export const AIToolsHubPage: React.FC = () => {
  const tools = [
    {
      title: 'Free AI Nutrition Chatbot',
      description: 'Ask anything about nutrition science, meal substitutions, and grocery shopping with High Thinking deep reasoning mode.',
      path: '/ai/chatbot',
      icon: <MessageSquare className="w-6 h-6 text-[#2D6A4F]" />,
      badge: '100% Free',
      badgeColor: 'bg-emerald-100 text-[#2D6A4F] border border-emerald-300',
      access: 'Free & Unlimited • No Cost'
    },
    {
      title: '7-Day Meal Plan Generator',
      description: 'Answer our 4-step questionnaire to generate a full 7-day calendar tailored to your budget, kitchen time, and health goals.',
      path: '/ai/meal-plan-generator',
      icon: <Calendar className="w-6 h-6 text-[#F77F00]" />,
      badge: '100% Free',
      badgeColor: 'bg-emerald-100 text-[#2D6A4F] border border-emerald-300',
      access: 'Free & Unlimited • No Cost'
    },
    {
      title: 'Smart Recipe Generator from Pantry',
      description: 'Tell AI what ingredients are in your pantry and fridge to receive tested, dietitian-vetted recipes in under 20 minutes.',
      path: '/ai/recipe-generator',
      icon: <Utensils className="w-6 h-6 text-[#3A86FF]" />,
      badge: '100% Free',
      badgeColor: 'bg-emerald-100 text-[#2D6A4F] border border-emerald-300',
      access: 'Free & Unlimited • No Cost'
    },
    {
      title: 'Smart Grocery Planner & Pantry Sync',
      description: 'Auto-consolidates grocery lists from your meal plans, groups items by department, and excludes items you already have in your pantry.',
      path: '/ai/grocery-planner',
      icon: <ShoppingBag className="w-6 h-6 text-emerald-600" />,
      badge: '100% Free',
      badgeColor: 'bg-emerald-100 text-[#2D6A4F] border border-emerald-300',
      access: 'Free & Unlimited • No Cost'
    },
    {
      title: 'Food Photo Meal Analyzer',
      description: 'Upload a picture of your plate to detect components, estimate portion sizes, calculate approximate calories, and get healthier prep tips.',
      path: '/ai/photo-analyzer',
      icon: <Camera className="w-6 h-6 text-purple-600" />,
      badge: '100% Free',
      badgeColor: 'bg-emerald-100 text-[#2D6A4F] border border-emerald-300',
      access: 'Free & Unlimited • No Cost'
    },
    {
      title: 'Nutrition Facts Label Scanner',
      description: 'Scan or upload packaged food labels for plain-language ingredient breakdowns, hidden added sugar detection, and cleaner alternatives.',
      path: '/ai/label-scanner',
      icon: <ScanLine className="w-6 h-6 text-indigo-600" />,
      badge: '100% Free',
      badgeColor: 'bg-emerald-100 text-[#2D6A4F] border border-emerald-300',
      access: 'Free & Unlimited • No Cost'
    },
    {
      title: 'AI Progress & Habit Coach',
      description: 'Weekly motivational consistency summaries, fiber & protein intake trend analysis, and gentle evidence-based micro-habit challenges.',
      path: '/dashboard/progress',
      icon: <TrendingUp className="w-6 h-6 text-teal-600" />,
      badge: '100% Free',
      badgeColor: 'bg-emerald-100 text-[#2D6A4F] border border-emerald-300',
      access: 'Free & Unlimited • No Cost'
    }
  ];

  return (
    <PageWrapper title="Free AI Nutrition Tools — No Dollars Required">
      {/* Hero Banner */}
      <div className="bg-[#F0F4EF] py-14 border-b border-[#D4E4D0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-[#2D6A4F] border border-emerald-300 text-xs font-bold uppercase mb-3 shadow-2xs">
            <Gift className="w-4 h-4 text-[#F77F00]" /> 100% Free AI Nutrition Suite • Zero Dollars
          </div>
          <h1 className="font-serif-heading text-4xl sm:text-5xl font-bold text-[#1A2E1A]">
            Free AI Nutrition Tools
          </h1>
          <p className="text-sm sm:text-base text-[#4A6741] mt-3 leading-relaxed max-w-2xl mx-auto">
            All AI tools on NutriWise USA are completely free with unlimited access. Plan weekly meals, chat with an AI nutritionist, analyze meal photos, and scan food labels without paying a single dollar.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
            <Link to="/ai/chatbot">
              <Button size="lg" variant="primary" className="shadow-md">
                <MessageSquare className="w-4 h-4" /> Start Free Chatbot
              </Button>
            </Link>
            <Link to="/ai/meal-plan-generator">
              <Button size="lg" variant="outline">
                <Calendar className="w-4 h-4" /> Generate Free Meal Plan
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Free Tools Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[24px] border border-[#E8EFE6] p-7 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-[16px] bg-[#F0F4EF] flex items-center justify-center shadow-xs">
                    {t.icon}
                  </div>
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${t.badgeColor}`}>
                    {t.badge}
                  </span>
                </div>

                <h3 className="font-serif-heading text-xl font-bold text-[#1A2E1A] mb-2">
                  {t.title}
                </h3>

                <p className="text-xs text-[#4A6741] leading-relaxed">
                  {t.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#F0F4EF] flex items-center justify-between">
                <span className="text-[11px] text-[#2D6A4F] font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  {t.access}
                </span>
                <Link to={t.path}>
                  <Button variant="primary" size="sm">
                    Open Free
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
};
