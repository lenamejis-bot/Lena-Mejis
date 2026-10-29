import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShieldCheck, Calendar, Clock } from 'lucide-react';
import { Dietitian } from '../../types';
import { Button } from '../ui/Button';

interface DietitianCardProps {
  dietitian: Dietitian;
  onBookClick?: () => void;
}

export const DietitianCard: React.FC<DietitianCardProps> = ({ dietitian, onBookClick }) => {
  return (
    <div className="bg-white rounded-[24px] border border-[#E8EFE6] p-6 shadow-[0_2px_12px_rgba(45,106,79,0.06)] hover:shadow-[0_8px_24px_rgba(45,106,79,0.12)] transition-all flex flex-col justify-between">
      <div>
        <div className="flex items-start gap-4 mb-4">
          <div className="relative">
            <img
              src={dietitian.avatarUrl}
              alt={dietitian.fullName}
              className="w-20 h-20 rounded-[16px] object-cover border-2 border-[#D4E4D0]"
            />
            <span className="absolute -bottom-1.5 -right-1.5 bg-[#2D6A4F] text-white p-1 rounded-full shadow-xs" title="Registered Dietitian Credential Verified">
              <ShieldCheck className="w-3.5 h-3.5" />
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-[6px] bg-[#2D6A4F]/10 text-[#2D6A4F] text-xs font-bold uppercase tracking-wider">
                {dietitian.credential}
              </span>
              <div className="flex items-center gap-1 text-xs text-amber-500 font-bold ml-auto">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{dietitian.ratingAvg}</span>
                <span className="text-stone-400 font-normal">({dietitian.ratingCount})</span>
              </div>
            </div>

            <h3 className="font-serif-heading text-lg font-bold text-[#1A2E1A] mt-1 truncate">
              {dietitian.fullName}
            </h3>
            <p className="text-xs text-[#4A6741] font-medium leading-tight line-clamp-1 mt-0.5">
              {dietitian.title}
            </p>
          </div>
        </div>

        <p className="text-xs text-[#4A6741] line-clamp-3 leading-relaxed mb-4">
          {dietitian.bio}
        </p>

        {/* Specializations */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {dietitian.specializations.slice(0, 3).map((spec, i) => (
            <span
              key={i}
              className="text-[11px] px-2 py-0.5 rounded-[6px] bg-[#F0F4EF] text-[#2D6A4F] font-medium"
            >
              {spec}
            </span>
          ))}
          {dietitian.specializations.length > 3 && (
            <span className="text-[11px] px-1.5 py-0.5 rounded-[6px] bg-[#F0F4EF] text-[#4A6741]">
              +{dietitian.specializations.length - 3} more
            </span>
          )}
        </div>
      </div>

      <div className="pt-4 border-t border-[#F0F4EF] flex items-center justify-between gap-3">
        <div>
          <span className="text-xl font-bold text-[#1A2E1A]">${dietitian.consultationFeeUsd}</span>
          <span className="text-xs text-[#4A6741] block">/ {dietitian.consultationDurationMin} min session</span>
        </div>

        <div className="flex items-center gap-2">
          <Link to={`/nutritionist-services/${dietitian.id}`}>
            <Button variant="outline" size="sm">
              View Profile
            </Button>
          </Link>
          <Link to={`/nutritionist-services/${dietitian.id}/book`}>
            <Button variant="primary" size="sm" onClick={onBookClick}>
              <Calendar className="w-3.5 h-3.5" />
              Book
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
