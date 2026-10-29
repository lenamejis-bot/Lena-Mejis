import React from 'react';
import { Minus, Plus, Users } from 'lucide-react';

interface ServingCalculatorProps {
  currentServings: number;
  baseServings: number;
  onServingsChange: (servings: number) => void;
  presetOptions?: number[];
}

export const ServingCalculator: React.FC<ServingCalculatorProps> = ({
  currentServings,
  baseServings,
  onServingsChange,
  presetOptions = [1, 2, 4, 6]
}) => {
  return (
    <div className="flex flex-wrap items-center gap-3 bg-[#F0F4EF] p-3 rounded-[12px] border border-[#D4E4D0]">
      <div className="flex items-center gap-1.5 text-xs font-semibold uppercase text-[#4A6741]">
        <Users className="w-4 h-4 text-[#2D6A4F]" />
        <span>Servings:</span>
      </div>

      {/* Stepper buttons */}
      <div className="flex items-center bg-white rounded-[8px] border border-[#D4E4D0] overflow-hidden shadow-xs">
        <button
          type="button"
          onClick={() => onServingsChange(Math.max(1, currentServings - 1))}
          className="p-1.5 text-[#4A6741] hover:bg-[#F0F4EF] hover:text-[#1A2E1A] transition-colors cursor-pointer"
          title="Decrease servings"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
        <span className="w-9 text-center font-bold text-sm text-[#1A2E1A]">
          {currentServings}
        </span>
        <button
          type="button"
          onClick={() => onServingsChange(currentServings + 1)}
          className="p-1.5 text-[#4A6741] hover:bg-[#F0F4EF] hover:text-[#1A2E1A] transition-colors cursor-pointer"
          title="Increase servings"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Quick Presets */}
      <div className="flex items-center gap-1">
        {presetOptions.map(preset => (
          <button
            key={preset}
            type="button"
            onClick={() => onServingsChange(preset)}
            className={`px-2 py-1 text-xs rounded-[6px] font-medium transition-colors cursor-pointer ${
              currentServings === preset
                ? 'bg-[#2D6A4F] text-white shadow-xs'
                : 'bg-white text-[#4A6741] border border-[#D4E4D0] hover:bg-[#F0F4EF]'
            }`}
          >
            {preset} {preset === 1 ? 'person' : 'people'}
          </button>
        ))}
      </div>

      {currentServings !== baseServings && (
        <span className="text-xs text-[#2D6A4F] font-medium ml-auto">
          Scaled from {baseServings} base servings
        </span>
      )}
    </div>
  );
};
