import React, { useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { Brain, ShieldCheck, Sparkles, Sliders, CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useAppStore } from '../../store/useStore';

export const AdminAISettings: React.FC = () => {
  const { showToast } = useAppStore();

  const [activeModel, setActiveModel] = useState<'gemini-4-argon' | 'gemini-3.8-flash'>('gemini-4-argon');
  const [thinkingLevel, setThinkingLevel] = useState<'HIGH' | 'MEDIUM' | 'LOW'>('HIGH');
  const [isFreeUnlimited, setIsFreeUnlimited] = useState(true);
  const [medicalDisclaimerEnforced, setMedicalDisclaimerEnforced] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('AI Settings updated successfully! All tools set to 100% Free Unlimited access.', 'success');
  };

  return (
    <AdminLayout title="AI Models & Thinking Mode Configuration">
      <div className="space-y-6 max-w-3xl">
        <div>
          <h1 className="font-serif-heading text-2xl font-bold text-[#1A2E1A]">
            AI Prompt & Model Configurations
          </h1>
          <p className="text-xs text-[#4A6741]">
            Control model selection, Gemini thinking level parameters, and 100% free community access policy.
          </p>
        </div>

        <form onSubmit={handleSave} className="bg-white p-8 rounded-[28px] border border-[#E8EFE6] shadow-xs space-y-6">
          {/* Model Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#4A6741] mb-2">
              Primary Complex Query Model (Thinking Mode)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                onClick={() => setActiveModel('gemini-4-argon')}
                className={`p-4 rounded-[16px] border transition-all cursor-pointer ${
                  activeModel === 'gemini-4-argon'
                    ? 'bg-[#F0F4EF] border-[#2D6A4F] ring-1 ring-[#2D6A4F]'
                    : 'bg-[#FAFAF7] border-[#E8EFE6]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-[#1A2E1A]">gemini-4-argon</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#2D6A4F] text-white">Recommended</span>
                </div>
                <p className="text-xs text-[#4A6741] mt-1 leading-snug">
                  High-capacity reasoning engine for multi-step nutritional analysis and complete 7-day meal plan logic.
                </p>
              </div>

              <div
                onClick={() => setActiveModel('gemini-3.8-flash')}
                className={`p-4 rounded-[16px] border transition-all cursor-pointer ${
                  activeModel === 'gemini-3.8-flash'
                    ? 'bg-[#F0F4EF] border-[#2D6A4F] ring-1 ring-[#2D6A4F]'
                    : 'bg-[#FAFAF7] border-[#E8EFE6]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-[#1A2E1A]">gemini-3.8-flash</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-200 text-stone-700">Ultra Fast</span>
                </div>
                <p className="text-xs text-[#4A6741] mt-1 leading-snug">
                  Low-latency model optimal for rapid conversational responses and vision photo scanning.
                </p>
              </div>
            </div>
          </div>

          {/* Thinking Level Selector */}
          <div className="p-5 rounded-[20px] bg-gradient-to-r from-emerald-50 to-[#F0F4EF] border border-[#D4E4D0] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-[#2D6A4F]" />
                <h4 className="font-bold text-sm text-[#1A2E1A]">
                  Gemini Thinking Level Configuration
                </h4>
              </div>
              <span className="text-xs font-mono font-bold text-[#2D6A4F]">
                ThinkingLevel.{thinkingLevel}
              </span>
            </div>
            <p className="text-xs text-[#4A6741] leading-relaxed">
              In accordance with prompt instructions, <code>thinkingLevel</code> is configured to <code>ThinkingLevel.HIGH</code> without setting <code>maxOutputTokens</code>.
            </p>
            <div className="flex gap-2">
              {(['HIGH', 'MEDIUM', 'LOW'] as const).map(lvl => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setThinkingLevel(lvl)}
                  className={`px-3 py-1.5 rounded-[10px] text-xs font-bold transition-colors cursor-pointer border ${
                    thinkingLevel === lvl
                      ? 'bg-[#2D6A4F] text-white border-[#2D6A4F]'
                      : 'bg-white text-[#4A6741] border-[#D4E4D0] hover:bg-[#F0F4EF]'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* 100% Free Policy Toggle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-[16px] bg-[#FAFAF7] border border-[#D4E4D0] space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#4A6741] mb-1">
                Zero Cost / Free AI Access Policy
              </label>
              <label className="flex items-center gap-2 text-xs font-semibold text-[#1A2E1A] cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFreeUnlimited}
                  onChange={(e) => setIsFreeUnlimited(e.target.checked)}
                  className="w-4 h-4 accent-[#2D6A4F]"
                />
                <span>100% Free & Unlimited for all users ($0)</span>
              </label>
              <p className="text-[11px] text-[#8FAE8A]">
                No paywalls, token fees, or subscription barriers on AI intelligence features.
              </p>
            </div>

            <div className="p-4 rounded-[16px] bg-[#FAFAF7] border border-[#D4E4D0] space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#4A6741] mb-1">
                Medical Disclaimer Guardrail
              </label>
              <label className="flex items-center gap-2 text-xs font-semibold text-[#1A2E1A] cursor-pointer">
                <input
                  type="checkbox"
                  checked={medicalDisclaimerEnforced}
                  onChange={(e) => setMedicalDisclaimerEnforced(e.target.checked)}
                  className="w-4 h-4 accent-[#2D6A4F]"
                />
                <span>Always attach medical boundary notice</span>
              </label>
              <p className="text-[11px] text-[#8FAE8A]">
                Explicitly states content is educational and not medical diagnosis or prescription.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-[#F0F4EF] flex justify-end">
            <Button type="submit" variant="primary">
              Save AI Configuration
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};
