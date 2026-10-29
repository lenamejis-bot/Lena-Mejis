import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useAppStore } from '../../store/useStore';
import { Button } from '../../components/ui/Button';
import { Crown, Check, Shield, Sparkles, HeartHandshake } from 'lucide-react';
import { Link } from 'react-router-dom';

export const DashboardSettingsPage: React.FC = () => {
  const { user, updateUserProfile, setUserRole, showToast } = useAppStore();

  const [fullName, setFullName] = useState(user.fullName);
  const [weeklyBudget, setWeeklyBudget] = useState(user.weeklyBudget || 100);
  const [householdSize, setHouseholdSize] = useState(user.householdSize || 2);
  const [healthGoal, setHealthGoal] = useState(user.healthGoal || 'balanced');
  const [selectedDiets, setSelectedDiets] = useState<string[]>(user.dietaryPreferences || []);

  const diets = ['Mediterranean', 'High-Protein', 'Vegetarian', 'Vegan', 'Pescatarian', 'Gluten-Free', 'Dairy-Free', 'Low-Sodium'];

  const toggleDiet = (d: string) => {
    setSelectedDiets(prev =>
      prev.includes(d) ? prev.filter(item => item !== d) : [...prev, d]
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      fullName,
      weeklyBudget,
      householdSize,
      healthGoal: healthGoal as any,
      dietaryPreferences: selectedDiets
    });
  };

  return (
    <DashboardLayout title="Account Settings & Nutrition Profile">
      <div className="space-y-8 max-w-3xl">
        <div>
          <h1 className="font-serif-heading text-3xl font-bold text-[#1A2E1A]">
            Account & Nutrition Settings
          </h1>
          <p className="text-xs text-[#4A6741] mt-0.5">
            Configure your nutritional goals, household budget, and membership tier.
          </p>
        </div>

        {/* 100% Free AI Tools Guarantee Banner */}
        <div className="p-6 rounded-[24px] bg-gradient-to-r from-emerald-50 to-[#F0F4EF] border border-[#D4E4D0] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#2D6A4F] text-white">
                100% Free AI Tools Active
              </span>
              <span className="text-xs font-semibold text-emerald-800 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Unlimited • $0 Forever
              </span>
            </div>
            <p className="text-xs text-[#4A6741] mt-1.5 leading-relaxed">
              Every AI intelligence tool on NutriWise (AI Chatbot, 7-Day Meal Plan Generator, Smart Recipe Generator, Label Scanner, Photo Meal Analyzer) is completely free and unlimited for all registered and guest users.
            </p>
          </div>

          <div className="shrink-0">
            <Link to="/ai/chatbot">
              <Button variant="primary" size="sm">
                Open AI Chatbot
              </Button>
            </Link>
          </div>
        </div>

        {/* Optional RD Consultation Tier */}
        <div className="p-6 rounded-[24px] bg-white border border-[#E8EFE6] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase ${
                user.role === 'premium' ? 'bg-[#F77F00]/20 text-[#C46500]' : 'bg-[#2D6A4F]/10 text-[#2D6A4F]'
              }`}>
                {user.role === 'premium' ? 'RD Clinical Care Member' : 'Standard Member'}
              </span>
            </div>
            <p className="text-xs text-[#4A6741] mt-1.5">
              {user.role === 'premium'
                ? 'Your membership includes monthly 1-on-1 Registered Dietitian telehealth consultations.'
                : 'Free membership with unlimited AI tools. Upgrade only if you want 1-on-1 human RD consultations.'}
            </p>
          </div>

          <div>
            {user.role === 'premium' ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setUserRole('free');
                  showToast('Switched to Free Standard Membership.', 'info');
                }}
              >
                Downgrade to Standard
              </Button>
            ) : (
              <Link to="/nutritionist-services">
                <Button variant="secondary" size="sm">
                  <HeartHandshake className="w-3.5 h-3.5" /> Book Dietitian ($0 AI Included)
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Profile Settings Form */}
        <form onSubmit={handleSave} className="bg-white p-8 rounded-[28px] border border-[#E8EFE6] shadow-xs space-y-6">
          <h3 className="font-serif-heading text-xl font-bold text-[#1A2E1A]">
            Personal & Household Defaults
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-[#4A6741] mb-1">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full h-11 px-3.5 rounded-[12px] bg-[#FAFAF7] border border-[#D4E4D0] text-xs font-medium focus:outline-none focus:border-[#2D6A4F]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#4A6741] mb-1">Email Address</label>
              <input
                type="email"
                disabled
                value={user.email}
                className="w-full h-11 px-3.5 rounded-[12px] bg-stone-100 border border-[#D4E4D0] text-xs text-stone-500 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-[#4A6741] mb-1">Primary Health Goal</label>
              <select
                value={healthGoal}
                onChange={(e) => setHealthGoal(e.target.value as any)}
                className="w-full h-11 px-3 rounded-[12px] bg-[#FAFAF7] border border-[#D4E4D0] text-xs font-semibold"
              >
                <option value="balanced">Balanced Vitality</option>
                <option value="weight_management">Weight Management</option>
                <option value="muscle">Lean Muscle & Recovery</option>
                <option value="family">Family Meal Planning</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#4A6741] mb-1">Household Size</label>
              <select
                value={householdSize}
                onChange={(e) => setHouseholdSize(Number(e.target.value))}
                className="w-full h-11 px-3 rounded-[12px] bg-[#FAFAF7] border border-[#D4E4D0] text-xs font-semibold"
              >
                <option value="1">1 Person</option>
                <option value="2">2 People</option>
                <option value="4">4 People</option>
                <option value="6">6 People</option>
              </select>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold text-[#1A2E1A] mb-1">
              <span>Weekly Food Budget:</span>
              <span className="text-[#2D6A4F]">${weeklyBudget}/week</span>
            </div>
            <input
              type="range"
              min="35"
              max="220"
              step="5"
              value={weeklyBudget}
              onChange={(e) => setWeeklyBudget(Number(e.target.value))}
              className="w-full accent-[#2D6A4F] cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-[#4A6741] mb-2">Default Dietary Preferences</label>
            <div className="flex flex-wrap gap-2">
              {diets.map(diet => (
                <button
                  key={diet}
                  type="button"
                  onClick={() => toggleDiet(diet)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer border ${
                    selectedDiets.includes(diet)
                      ? 'bg-[#2D6A4F] text-white border-[#2D6A4F]'
                      : 'bg-[#FAFAF7] text-[#4A6741] border-[#D4E4D0] hover:bg-[#F0F4EF]'
                  }`}
                >
                  {diet}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-[#F0F4EF] flex justify-end">
            <Button type="submit" variant="primary">
              Save Profile Settings
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};
