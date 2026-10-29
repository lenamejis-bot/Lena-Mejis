import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { mockDietitians } from '../../data/mockDietitians';
import { Star, ShieldCheck, ArrowLeft, Calendar, Clock, Award, CheckCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const DietitianProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const dietitian = mockDietitians.find(d => d.id === id) || mockDietitians[0];

  return (
    <PageWrapper title={`${dietitian.fullName}, ${dietitian.credential} — Dietitian Profile`} description={dietitian.bio}>
      <div className="bg-white border-b border-[#E8EFE6]">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/nutritionist-services')}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#4A6741] hover:text-[#2D6A4F] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Dietitians
          </button>

          <Link to={`/nutritionist-services/${dietitian.id}/book`}>
            <Button variant="primary" size="sm">
              <Calendar className="w-3.5 h-3.5" /> Book Consultation (${dietitian.consultationFeeUsd})
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10">
        {/* Profile Card Header */}
        <div className="bg-white p-8 rounded-[28px] border border-[#E8EFE6] shadow-sm flex flex-col md:flex-row items-start gap-8">
          <img
            src={dietitian.avatarUrl}
            alt={dietitian.fullName}
            className="w-32 h-32 md:w-40 md:h-40 rounded-[24px] object-cover border-4 border-[#F0F4EF] shadow-md shrink-0"
          />

          <div className="flex-1 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-[8px] bg-[#2D6A4F]/10 text-[#2D6A4F] text-xs font-bold uppercase">
                {dietitian.credential}
              </span>
              <div className="flex items-center gap-1 text-xs text-amber-500 font-bold ml-auto">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-stone-900">{dietitian.ratingAvg}</span>
                <span className="text-[#8FAE8A] font-normal">({dietitian.ratingCount} verified patient reviews)</span>
              </div>
            </div>

            <h1 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#1A2E1A]">
              {dietitian.fullName}
            </h1>

            <p className="text-sm font-semibold text-[#2D6A4F]">
              {dietitian.title}
            </p>

            <p className="text-xs sm:text-sm text-[#4A6741] leading-relaxed">
              {dietitian.bio}
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-[#4A6741]">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#2D6A4F]" />
                <span>{dietitian.consultationDurationMin}-Minute Telehealth Sessions</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#2D6A4F]" />
                <span>CDR Verified & HIPAA-Compliant</span>
              </div>
            </div>
          </div>
        </div>

        {/* Clinical Specializations */}
        <div className="bg-white p-8 rounded-[24px] border border-[#E8EFE6] shadow-sm space-y-4">
          <h3 className="font-serif-heading text-xl font-bold text-[#1A2E1A] flex items-center gap-2">
            <Award className="w-5 h-5 text-[#2D6A4F]" />
            Clinical Areas of Expertise
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {dietitian.specializations.map((spec, i) => (
              <div key={i} className="flex items-center gap-2.5 p-3 rounded-[12px] bg-[#FAFAF7] border border-[#E8EFE6] text-xs font-semibold text-[#1A2E1A]">
                <CheckCircle className="w-4 h-4 text-[#2D6A4F] shrink-0" />
                <span>{spec}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing & Booking CTA Card */}
        <div className="bg-gradient-to-r from-[#2D6A4F] to-[#1E4D38] p-8 rounded-[28px] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#52B788] block mb-1">
              Initial Consultation
            </span>
            <h3 className="font-serif-heading text-2xl font-bold">
              Ready to build a clinically tailored plan?
            </h3>
            <p className="text-xs text-white/80 mt-1 max-w-md leading-relaxed">
              Includes comprehensive medical intake review, personalized nutrition plan, and secure follow-up messaging.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <div className="text-right">
              <span className="text-3xl font-extrabold">${dietitian.consultationFeeUsd}</span>
              <span className="text-xs text-white/70 block">/ 50-minute session</span>
            </div>
            <Link to={`/nutritionist-services/${dietitian.id}/book`}>
              <Button size="lg" variant="accent" className="shadow-lg">
                <Calendar className="w-4 h-4" /> Schedule Visit
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};
