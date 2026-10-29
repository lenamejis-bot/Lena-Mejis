import React from 'react';

interface MacroBadgesProps {
  calories?: number;
  proteinG?: number;
  carbsG?: number;
  fatG?: number;
  fiberG?: number;
  sodiumMg?: number;
  size?: 'sm' | 'md';
}

export const MacroBadges: React.FC<MacroBadgesProps> = ({
  calories,
  proteinG,
  carbsG,
  fatG,
  fiberG,
  sodiumMg,
  size = 'sm'
}) => {
  const isSm = size === 'sm';
  const badgeClasses = isSm
    ? 'text-xs px-2 py-0.5 rounded-[6px] font-medium'
    : 'text-sm px-2.5 py-1 rounded-[8px] font-medium';

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {calories !== undefined && (
        <span className={`${badgeClasses} bg-[#F77F00]/15 text-[#B25900]`}>
          <span className="font-semibold">{calories}</span> kcal
        </span>
      )}
      {proteinG !== undefined && (
        <span className={`${badgeClasses} bg-[#3A86FF]/15 text-[#1D63D6]`}>
          <span className="font-semibold">{proteinG}g</span> protein
        </span>
      )}
      {carbsG !== undefined && (
        <span className={`${badgeClasses} bg-[#FFBE0B]/20 text-[#A67800]`}>
          <span className="font-semibold">{carbsG}g</span> carbs
        </span>
      )}
      {fatG !== undefined && (
        <span className={`${badgeClasses} bg-[#FF6B6B]/15 text-[#D13B3B]`}>
          <span className="font-semibold">{fatG}g</span> fat
        </span>
      )}
      {fiberG !== undefined && (
        <span className={`${badgeClasses} bg-[#2D6A4F]/15 text-[#245840]`}>
          <span className="font-semibold">{fiberG}g</span> fiber
        </span>
      )}
      {sodiumMg !== undefined && (
        <span className={`${badgeClasses} bg-[#7B5EA7]/15 text-[#5D3F87]`}>
          <span className="font-semibold">{sodiumMg}mg</span> sodium
        </span>
      )}
    </div>
  );
};
