import React, { useState } from 'react';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { mockDietitians } from '../../data/mockDietitians';
import { DietitianCard } from '../../components/shared/DietitianCard';
import { ShieldCheck, Calendar, CheckCircle2 } from 'lucide-react';

export const DietitianServicesPage: React.FC = () => {
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>('all');

  const specializations = [
    { id: 'all', name: 'All Specialties' },
    { id: 'Gastrointestinal Health', name: 'Gut & GI Health' },
    { id: 'Weight Management', name: 'Weight Management' },
    { id: 'Sports Nutrition & Hypertophy', name: 'Sports & Performance' },
    { id: 'PCOS & Hormonal Health', name: 'Hormonal & Women’s Health' }
  ];

  const filteredDietitians = mockDietitians.filter(rd =>
    selectedSpecialization === 'all' || rd.specializations.includes(selectedSpecialization)
  );

  return (
    <PageWrapper title="Consult Licensed Registered Dietitians">
      <div className="bg-[#F0F4EF] py-14 border-b border-[#D4E4D0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F] block mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> Board Certified Healthcare Providers
            </span>
            <h1 className="font-serif-heading text-4xl sm:text-5xl font-bold text-[#1A2E1A]">
              1-on-1 Registered Dietitian Consultations
            </h1>
            <p className="text-sm sm:text-base text-[#4A6741] mt-3 leading-relaxed">
              When you need specialized medical nutrition therapy, guidance for complex conditions, or personalized accountability, connect directly with licensed healthcare providers.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Specialization Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {specializations.map(spec => (
            <button
              key={spec.id}
              onClick={() => setSelectedSpecialization(spec.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedSpecialization === spec.id
                  ? 'bg-[#2D6A4F] text-white shadow-xs'
                  : 'bg-white text-[#4A6741] border border-[#D4E4D0] hover:bg-[#F0F4EF]'
              }`}
            >
              {spec.name}
            </button>
          ))}
        </div>

        {/* Dietitians Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDietitians.map(rd => (
            <DietitianCard key={rd.id} dietitian={rd} />
          ))}
        </div>

        {/* Credential Assurance Box */}
        <div className="mt-12 p-8 bg-white rounded-[24px] border border-[#E8EFE6] shadow-sm max-w-4xl mx-auto space-y-4">
          <h3 className="font-serif-heading text-xl font-bold text-[#1A2E1A] flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#2D6A4F]" />
            The NutriWise Credential Standard
          </h3>
          <p className="text-xs text-[#4A6741] leading-relaxed">
            Unlike informal "health coaches" or social media influencers, Registered Dietitians (RD / RDN) hold accredited master's degrees in nutritional sciences, have completed over 1,200 hours of supervised clinical practice in medical hospitals, and passed national board examinations overseen by the Commission on Dietetic Registration (CDR).
          </p>
        </div>
      </div>
    </PageWrapper>
  );
};
