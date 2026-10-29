import React from 'react';
import { PageWrapper } from '../../components/layout/PageWrapper';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <PageWrapper title="Privacy Policy (CCPA Aligned)">
      <div className="bg-[#F0F4EF] py-12 border-b border-[#D4E4D0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-serif-heading text-3xl font-bold text-[#1A2E1A]">
            Privacy Policy
          </h1>
          <p className="text-xs text-[#4A6741] mt-1">
            Last Updated: October 2026 • CCPA Aligned
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 bg-white rounded-[24px] border border-[#E8EFE6] my-8 p-8 space-y-4 text-xs text-[#4A6741] leading-relaxed">
        <h2 className="font-serif-heading text-lg font-bold text-[#1A2E1A]">
          1. Commitment to Health Data Privacy
        </h2>
        <p>
          At NutriWise USA, we hold your personal health and nutrition inquiries to the highest standards of confidentiality. We adhere strictly to data minimization principles: your dietary preferences, food diary logs, and meal images are never sold, rented, or distributed to third-party data brokers or targeted advertising exchanges.
        </p>

        <h2 className="font-serif-heading text-lg font-bold text-[#1A2E1A]">
          2. Information We Collect
        </h2>
        <p>
          We collect information that you directly provide when registering an account, submitting questionnaire responses, logging meals into your food diary, or uploading labels for scanning.
        </p>

        <h2 className="font-serif-heading text-lg font-bold text-[#1A2E1A]">
          3. Your Rights Under California Consumer Privacy Act (CCPA)
        </h2>
        <p>
          You have the right to request access to the personal information we hold about you, request deletion of your account and diary entries, and opt out of any non-essential data processing. To exercise these rights, email privacy@nutriwiseusa.com.
        </p>
      </div>
    </PageWrapper>
  );
};
