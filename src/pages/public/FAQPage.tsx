import React, { useState } from 'react';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export const FAQPage: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Are all AI tools on NutriWise really 100% Free with no dollars charged?',
      a: 'Yes, absolutely! Every AI intelligence tool on NutriWise (Free AI Chatbot, 7-Day Meal Plan Generator, Smart Recipe Generator, Food Photo Analyzer, Nutrition Label Scanner, and Progress Coach) is 100% free with unlimited queries. No credit card, token fee, or dollar subscription is ever required to use our AI tools.'
    },
    {
      q: 'Are the AI meal plans safe for medical conditions or food allergies?',
      a: 'NutriWise AI plans are intended solely for general healthy eating, balanced meal prep, and nutritional awareness. They are not intended for clinical management of disease, diabetes medication dosing, chronic kidney disease, active pregnancy, or eating disorders. Always consult your personal physician or a Registered Dietitian.'
    },
    {
      q: 'Where does your food nutrition information come from?',
      a: 'All reference nutritional data in our food database and recipe calculator is calibrated against the USDA FoodData Central Foundation and Standard Reference datasets, overseen by the Agricultural Research Service (ARS).'
    },
    {
      q: 'How does High Thinking Mode work?',
      a: 'High Thinking mode engages Google Gemini (gemini-4-argon with ThinkingLevel.HIGH) to reason through biochemical nutrient synergies, leucine thresholds for muscle pacing, soluble-to-insoluble fiber balances, and cost constraints before formulating recommendations.'
    },
    {
      q: 'What is the optional paid tier for if AI is free?',
      a: 'Paid bookings are solely for 1-on-1 private video telehealth consultations with Board Certified Registered Dietitians (RD / RDN). You only pay if you book a human healthcare provider.'
    },
    {
      q: 'Are your dietitians licensed and accredited in the United States?',
      a: 'Yes. All dietitians listed on NutriWise hold active Registered Dietitian (RD or RDN) credentials granted by the Commission on Dietetic Registration (CDR) and state licensure.'
    }
  ];

  return (
    <PageWrapper title="Frequently Asked Questions">
      <div className="bg-[#F0F4EF] py-12 border-b border-[#D4E4D0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F] block mb-2">
            Got Questions?
          </span>
          <h1 className="font-serif-heading text-4xl font-bold text-[#1A2E1A]">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-[#4A6741] mt-2">
            Answers to common questions about our evidence-based platform and AI features.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-[20px] border border-[#E8EFE6] overflow-hidden transition-all shadow-xs"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-[#1A2E1A] hover:bg-[#FAFAF7] transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                {isOpen ? <ChevronUp className="w-4 h-4 text-[#2D6A4F] shrink-0" /> : <ChevronDown className="w-4 h-4 text-[#8FAE8A] shrink-0" />}
              </button>
              {isOpen && (
                <div className="px-5 pb-5 text-xs text-[#4A6741] leading-relaxed border-t border-[#F0F4EF] pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </PageWrapper>
  );
};
