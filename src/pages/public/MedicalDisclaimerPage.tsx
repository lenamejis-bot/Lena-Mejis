import React from 'react';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { ShieldAlert, ShieldCheck } from 'lucide-react';

export const MedicalDisclaimerPage: React.FC = () => {
  return (
    <PageWrapper title="Medical & Clinical Disclaimer">
      <div className="bg-[#F0F4EF] py-12 border-b border-[#D4E4D0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto mb-3">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h1 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#1A2E1A]">
            Medical & Clinical Disclaimer
          </h1>
          <p className="text-xs sm:text-sm text-[#4A6741] mt-2">
            Please read this clinical boundary statement carefully prior to utilizing our AI tools or meal plans.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-6 text-xs text-[#4A6741] leading-relaxed">
        <div className="p-6 bg-white rounded-[24px] border border-[#E8EFE6] space-y-4">
          <h2 className="font-serif-heading text-xl font-bold text-[#1A2E1A]">
            General Wellness & Educational Guidance Only
          </h2>
          <p>
            The content, AI outputs, meal plans, recipes, and food analyses available on NutriWise USA (including generated through Google Gemini LLMs) are created solely for general informational, educational, and lifestyle wellness purposes. 
          </p>
          <p>
            NutriWise USA is not an emergency response provider or a healthcare facility. Under no circumstances should information provided on this platform be interpreted as medical advice, clinical diagnosis, prescription, or a treatment protocol for any physical, psychological, or metabolic condition.
          </p>
        </div>

        <div className="p-6 bg-white rounded-[24px] border border-[#E8EFE6] space-y-4">
          <h2 className="font-serif-heading text-xl font-bold text-[#1A2E1A]">
            Mandatory Physician Consultation for High-Risk Groups
          </h2>
          <p>
            You must consult a licensed physician or Board Certified Registered Dietitian prior to initiating any significant dietary alteration, especially if you:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>Have diagnosed Type 1 or Type 2 Diabetes requiring insulin or oral hypoglycemics</li>
            <li>Suffer from Chronic Kidney Disease (CKD), End-Stage Renal Disease, or Liver Cirrhosis</li>
            <li>Are currently pregnant, nursing, or planning pregnancy</li>
            <li>Have a personal history of clinically diagnosed eating disorders (e.g. anorexia or bulimia nervosa)</li>
            <li>Are taking prescription anticoagulants (e.g. Warfarin), antihypertensives, or MAO inhibitors that interact with dietary Vitamin K, Potassium, or Tyramine</li>
          </ul>
        </div>
      </div>
    </PageWrapper>
  );
};
