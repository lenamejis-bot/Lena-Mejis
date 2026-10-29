import React from 'react';
import { Link } from 'react-router-dom';
import { FoodItem } from '../../types';
import { MacroBadges } from './MacroBadges';
import { ShieldCheck } from 'lucide-react';

interface FoodCardProps {
  food: FoodItem;
}

export const FoodCard: React.FC<FoodCardProps> = ({ food }) => {
  return (
    <div className="group bg-white rounded-[20px] overflow-hidden border border-[#E8EFE6] shadow-[0_2px_12px_rgba(45,106,79,0.06)] hover:shadow-[0_8px_24px_rgba(45,106,79,0.12)] hover:-translate-y-1 transition-all duration-200 flex flex-col h-full">
      <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
        <img
          src={food.imageUrl}
          alt={food.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-white/95 text-[#2D6A4F] backdrop-blur-xs shadow-xs">
            {food.category}
          </span>
        </div>
        <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 text-white text-[11px] backdrop-blur-xs">
          <ShieldCheck className="w-3 h-3 text-[#52B788]" />
          <span>USDA FDC #{food.usdaFdcId}</span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <div className="text-xs font-medium text-[#4A6741] mb-1">
            Serving: {food.defaultServingUnit}
          </div>
          <Link to={`/foods/${food.slug}`}>
            <h3 className="font-serif-heading text-lg font-bold text-[#1A2E1A] group-hover:text-[#2D6A4F] transition-colors leading-snug">
              {food.name}
            </h3>
          </Link>
          <p className="text-xs text-[#4A6741] mt-1.5 line-clamp-2 leading-relaxed">
            {food.description}
          </p>
        </div>

        <div className="pt-4 mt-4 border-t border-[#F0F4EF]">
          <MacroBadges
            calories={food.calories}
            proteinG={food.proteinG}
            fiberG={food.fiberG}
            carbsG={food.totalCarbsG}
            size="sm"
          />
        </div>
      </div>
    </div>
  );
};
