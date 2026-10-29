import React, { useState } from 'react';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { Check, X, Crown, Sparkles, ShieldCheck, Heart, Gift } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useAppStore } from '../../store/useStore';
import { useNavigate, Link } from 'react-router-dom';

export const SubscriptionPlansPage: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const { user, setUserRole, showToast } = useAppStore();
  const navigate = useNavigate();

  const handleUpgrade = () => {
    setUserRole('premium');
    showToast('🎉 Activated VIP Telehealth & Priority Access!', 'success');
    navigate('/dashboard');
  };

  const features = [
    { name: 'Free AI Nutrition Chatbot (Gemini Thinking Mode)', free: '100% Free Unlimited', vip: '100% Free Unlimited' },
    { name: '7-Day AI Meal Plan Generator', free: '100% Free Unlimited', vip: '100% Free Unlimited' },
    { name: 'Smart Recipe Generator from Fridge Staples', free: '100% Free Unlimited', vip: '100% Free Unlimited' },
    { name: 'Smart Grocery Planner & Pantry Sync', free: '100% Free Unlimited', vip: '100% Free Unlimited' },
    { name: 'Food Photo Meal Analyzer', free: '100% Free Unlimited', vip: '100% Free Unlimited' },
    { name: 'Nutrition Facts Label Scanner', free: '100% Free Unlimited', vip: '100% Free Unlimited' },
    { name: 'Weekly AI Progress & Habit Coach', free: '100% Free Unlimited', vip: '100% Free Unlimited' },
    { name: 'USDA Verified Food Database & FDA Labels', free: true, vip: true },
    { name: 'Healthy Tested Recipe Library', free: true, vip: true },
    { name: 'Evidence-Based Nutrition Articles', free: true, vip: true },
    { name: '1-on-1 Registered Dietitian Video Telehealth', free: 'Pay per consult', vip: 'Priority Booking & RD Review' },
    { name: 'Custom Dietitian Meal Plan Review', free: 'Optional add-on', vip: 'Included monthly review' }
  ];

  return (
    <PageWrapper title="100% Free AI Tools & Dietitian Support">
      <div className="bg-[#F0F4EF] py-14 border-b border-[#D4E4D0] text-center">
        <div className="max-w-3xl mx-auto px-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-[#2D6A4F] border border-emerald-300 text-xs font-bold uppercase mb-2">
            <Gift className="w-4 h-4 text-[#F77F00]" /> All AI Tools Are 100% Free • No Dollars Needed
          </div>
          <h1 className="font-serif-heading text-4xl sm:text-5xl font-bold text-[#1A2E1A]">
            Free Nutrition Intelligence for Everyone
          </h1>
          <p className="text-sm sm:text-base text-[#4A6741] mt-3 leading-relaxed">
            Every American household deserves evidence-based nutrition tools. That is why our AI Chatbot, 7-Day Meal Planner, and Vision Scanners are completely free with zero dollar subscription fees.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link to="/ai/chatbot">
              <Button size="lg" variant="primary">
                🌿 Start Free Chatbot Now
              </Button>
            </Link>
            <Link to="/ai-tools">
              <Button size="lg" variant="outline">
                View All Free AI Tools
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Comparison Table */}
        <div className="bg-white rounded-[28px] border border-[#E8EFE6] p-6 sm:p-8 shadow-sm overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#F0F4EF]">
            <div>
              <h3 className="font-serif-heading text-2xl font-bold text-[#1A2E1A]">
                Feature & Tool Access Overview
              </h3>
              <p className="text-xs text-[#4A6741] mt-1">
                Zero paywalls on all AI algorithms and nutrition intelligence.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-emerald-100 text-[#2D6A4F]">
                ✓ AI Tools: $0 Forever
              </span>
            </div>
          </div>

          <div className="overflow-x-auto mt-4">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#E8EFE6] text-stone-500 font-bold uppercase tracking-wider">
                  <th className="py-3 px-4 w-1/2">Capability</th>
                  <th className="py-3 px-4 w-1/4 text-[#2D6A4F] bg-emerald-50/50 rounded-t-lg">
                    Free Member ($0)
                  </th>
                  <th className="py-3 px-4 w-1/4 text-[#1A2E1A]">
                    Optional RD Telehealth ($)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0F4EF]">
                {features.map((f, i) => (
                  <tr key={i} className="hover:bg-[#FAFAF7] transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-[#1A2E1A]">{f.name}</td>
                    <td className="py-3.5 px-4 text-[#2D6A4F] font-bold bg-emerald-50/30">
                      {typeof f.free === 'boolean' ? (
                        f.free ? <Check className="w-4 h-4 text-[#2D6A4F]" /> : <X className="w-4 h-4 text-stone-300" />
                      ) : (
                        f.free
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-[#4A6741]">
                      {typeof f.vip === 'boolean' ? (
                        f.vip ? <Check className="w-4 h-4 text-[#2D6A4F]" /> : <X className="w-4 h-4 text-stone-300" />
                      ) : (
                        f.vip
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Call to action boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-[#F0F4EF] p-6 rounded-[24px] border border-[#D4E4D0] flex flex-col justify-between">
            <div>
              <span className="text-2xl mb-2 block">🌿</span>
              <h4 className="font-serif-heading text-xl font-bold text-[#1A2E1A]">
                Free AI Assistant Ready
              </h4>
              <p className="text-xs text-[#4A6741] mt-2 leading-relaxed">
                Got a food question right now? Try our Free AI Nutrition Chatbot powered by Gemini High Thinking mode. No login required to test.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-[#D4E4D0]/60">
              <Link to="/ai/chatbot">
                <Button variant="primary" size="sm" className="w-full">
                  Launch Free Chatbot
                </Button>
              </Link>
            </div>
          </div>

          <div className="bg-white p-6 rounded-[24px] border border-[#D4E4D0] flex flex-col justify-between shadow-xs">
            <div>
              <span className="text-2xl mb-2 block">🩺</span>
              <h4 className="font-serif-heading text-xl font-bold text-[#1A2E1A]">
                Licensed Registered Dietitians
              </h4>
              <p className="text-xs text-[#4A6741] mt-2 leading-relaxed">
                Looking for medical nutrition therapy or personalized 1-on-1 healthcare coaching? Book a virtual telehealth consultation with a certified RDN.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-[#F0F4EF]">
              <Link to="/nutritionist-services">
                <Button variant="outline" size="sm" className="w-full">
                  Browse Dietitian Directory
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};
