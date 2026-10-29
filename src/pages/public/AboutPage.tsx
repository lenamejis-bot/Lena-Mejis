import React from 'react';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { ShieldCheck, BookOpen, Heart, Award, Users } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <PageWrapper title="About NutriWise USA — Editorial Standards & Mission">
      <div className="bg-[#F0F4EF] py-14 border-b border-[#D4E4D0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F] block mb-2">
            Our Purpose & Standards
          </span>
          <h1 className="font-serif-heading text-4xl sm:text-5xl font-bold text-[#1A2E1A]">
            Making Healthy Eating Simple, Personalized & Practical
          </h1>
          <p className="text-sm sm:text-base text-[#4A6741] mt-3 max-w-2xl mx-auto leading-relaxed">
            NutriWise USA was founded to bridge the divide between sterile medical literature and real-world American grocery shopping and meal preparation.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-12">
        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-[24px] bg-white border border-[#E8EFE6] shadow-xs space-y-2">
            <ShieldCheck className="w-8 h-8 text-[#2D6A4F]" />
            <h3 className="font-serif-heading text-lg font-bold text-[#1A2E1A]">
              100% Peer-Reviewed
            </h3>
            <p className="text-xs text-[#4A6741] leading-relaxed">
              Every dietary recommendation and health article cites primary randomized clinical trials, NHANES epidemiology, or USDA reference data.
            </p>
          </div>

          <div className="p-6 rounded-[24px] bg-white border border-[#E8EFE6] shadow-xs space-y-2">
            <Award className="w-8 h-8 text-[#F77F00]" />
            <h3 className="font-serif-heading text-lg font-bold text-[#1A2E1A]">
              Dietitian Supervised
            </h3>
            <p className="text-xs text-[#4A6741] leading-relaxed">
              Content is vetted by Board Certified Registered Dietitians (RD / RDN) who maintain active hospital and clinical outpatient practices.
            </p>
          </div>

          <div className="p-6 rounded-[24px] bg-white border border-[#E8EFE6] shadow-xs space-y-2">
            <Heart className="w-8 h-8 text-[#2D6A4F]" />
            <h3 className="font-serif-heading text-lg font-bold text-[#1A2E1A]">
              Budget & Family Centric
            </h3>
            <p className="text-xs text-[#4A6741] leading-relaxed">
              Healthy eating must be sustainable. We celebrate canned beans, frozen berries, simple sheet-pan suppers, and affordable staples.
            </p>
          </div>
        </div>

        {/* Editorial Policy */}
        <div className="bg-white p-8 rounded-[28px] border border-[#E8EFE6] shadow-xs space-y-4">
          <h2 className="font-serif-heading text-2xl font-bold text-[#1A2E1A]">
            Our Editorial Standards & Review Workflow
          </h2>
          <p className="text-xs sm:text-sm text-[#4A6741] leading-relaxed">
            We adhere to rigorous editorial discipline: No AI-generated article is ever published automatically without direct author attribution and verified Registered Dietitian or Medical Doctor review. Health benefit claims must meet FTC guidelines for substantiated scientific evidence.
          </p>
          <div className="pt-4 border-t border-[#F0F4EF] text-xs text-[#8FAE8A]">
            Questions about our scientific citations? Email editorial@nutriwiseusa.com.
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};
