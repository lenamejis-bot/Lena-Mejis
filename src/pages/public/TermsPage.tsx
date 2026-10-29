import React from 'react';
import { PageWrapper } from '../../components/layout/PageWrapper';

export const TermsPage: React.FC = () => {
  return (
    <PageWrapper title="Terms of Service">
      <div className="bg-[#F0F4EF] py-12 border-b border-[#D4E4D0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-serif-heading text-3xl font-bold text-[#1A2E1A]">
            Terms of Service
          </h1>
          <p className="text-xs text-[#4A6741] mt-1">
            Last Updated: October 2026
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 bg-white rounded-[24px] border border-[#E8EFE6] my-8 p-8 space-y-4 text-xs text-[#4A6741] leading-relaxed">
        <h2 className="font-serif-heading text-lg font-bold text-[#1A2E1A]">
          1. Acceptance of Terms
        </h2>
        <p>
          By accessing or using NutriWise USA, you agree to be bound by these Terms of Service. If you do not agree to these terms, you should immediately cease use of our services.
        </p>

        <h2 className="font-serif-heading text-lg font-bold text-[#1A2E1A]">
          2. Use of AI Guidance & Meal Plans
        </h2>
        <p>
          You acknowledge that AI-generated nutritional content represents automated guidance derived from publicly available dietary guidelines. You agree not to rely upon AI outputs as medical diagnosis or clinical healthcare advice.
        </p>

        <h2 className="font-serif-heading text-lg font-bold text-[#1A2E1A]">
          3. Subscriptions & Billing
        </h2>
        <p>
          Premium memberships are billed on a recurring monthly ($9.99/mo) or annual basis ($79.99/yr). You may cancel your subscription at any time via your Account Settings.
        </p>
      </div>
    </PageWrapper>
  );
};
