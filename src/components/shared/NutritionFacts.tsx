import React from 'react';

interface NutritionFactsProps {
  servingSize: string;
  servingsPerContainer?: number | string;
  calories: number;
  totalFatG: number;
  saturatedFatG?: number;
  sodiumMg: number;
  totalCarbsG: number;
  fiberG: number;
  sugarG?: number;
  proteinG: number;
  calciumMg?: number;
  ironMg?: number;
  potassiumMg?: number;
  vitaminCMg?: number;
  className?: string;
}

export const NutritionFacts: React.FC<NutritionFactsProps> = ({
  servingSize,
  servingsPerContainer = 1,
  calories,
  totalFatG,
  saturatedFatG = 0,
  sodiumMg,
  totalCarbsG,
  fiberG,
  sugarG = 0,
  proteinG,
  calciumMg,
  ironMg,
  potassiumMg,
  className = ''
}) => {
  // FDA Daily Values (based on 2,000 kcal diet)
  // Fat: 78g, SatFat: 20g, Sodium: 2300mg, Carbs: 275g, Fiber: 28g, Calcium: 1300mg, Iron: 18mg, Potassium: 4700mg
  const dvFat = Math.round((totalFatG / 78) * 100);
  const dvSatFat = Math.round((saturatedFatG / 20) * 100);
  const dvSodium = Math.round((sodiumMg / 2300) * 100);
  const dvCarbs = Math.round((totalCarbsG / 275) * 100);
  const dvFiber = Math.round((fiberG / 28) * 100);
  const dvCalcium = calciumMg ? Math.round((calciumMg / 1300) * 100) : 0;
  const dvIron = ironMg ? Math.round((ironMg / 18) * 100) : 0;
  const dvPotassium = potassiumMg ? Math.round((potassiumMg / 4700) * 100) : 0;

  return (
    <div className={`bg-white border-2 border-black p-4 font-sans text-black max-w-sm rounded-lg shadow-sm ${className}`}>
      <h2 className="text-3xl font-extrabold tracking-tight leading-none border-b border-black pb-1">
        Nutrition Facts
      </h2>
      <div className="flex justify-between items-baseline py-1 border-b border-black text-sm">
        <span>{servingsPerContainer} serving{servingsPerContainer !== 1 ? 's' : ''} per container</span>
      </div>
      <div className="flex justify-between items-baseline font-bold py-1 border-b-[8px] border-black">
        <span>Serving size</span>
        <span>{servingSize}</span>
      </div>

      <div className="flex justify-between items-end py-1.5 border-b-[4px] border-black">
        <div>
          <div className="text-xs font-bold leading-none">Amount per serving</div>
          <div className="text-3xl font-black leading-none mt-1">Calories</div>
        </div>
        <div className="text-4xl font-black leading-none">{calories}</div>
      </div>

      <div className="text-right text-xs font-bold py-1 border-b border-black">
        % Daily Value*
      </div>

      <div className="space-y-0.5 text-xs">
        <div className="flex justify-between py-1 border-b border-stone-300">
          <span>
            <strong className="font-bold">Total Fat</strong> {totalFatG}g
          </span>
          <span className="font-bold">{dvFat}%</span>
        </div>

        <div className="flex justify-between py-0.5 pl-4 border-b border-stone-200 text-stone-700">
          <span>Saturated Fat {saturatedFatG}g</span>
          <span className="font-bold text-black">{dvSatFat}%</span>
        </div>

        <div className="flex justify-between py-1 border-b border-stone-300">
          <span>
            <strong className="font-bold">Sodium</strong> {sodiumMg}mg
          </span>
          <span className="font-bold">{dvSodium}%</span>
        </div>

        <div className="flex justify-between py-1 border-b border-stone-300">
          <span>
            <strong className="font-bold">Total Carbohydrate</strong> {totalCarbsG}g
          </span>
          <span className="font-bold">{dvCarbs}%</span>
        </div>

        <div className="flex justify-between py-0.5 pl-4 border-b border-stone-200 text-stone-700">
          <span>Dietary Fiber {fiberG}g</span>
          <span className="font-bold text-black">{dvFiber}%</span>
        </div>

        <div className="flex justify-between py-0.5 pl-4 border-b border-stone-200 text-stone-700">
          <span>Total Sugars {sugarG}g</span>
          <span></span>
        </div>

        <div className="flex justify-between py-1 border-b-[8px] border-black">
          <span>
            <strong className="font-bold">Protein</strong> {proteinG}g
          </span>
          <span className="font-bold"></span>
        </div>

        {calciumMg !== undefined && (
          <div className="flex justify-between py-0.5 border-b border-stone-200 text-stone-700">
            <span>Calcium {calciumMg}mg</span>
            <span className="font-bold text-black">{dvCalcium}%</span>
          </div>
        )}

        {ironMg !== undefined && (
          <div className="flex justify-between py-0.5 border-b border-stone-200 text-stone-700">
            <span>Iron {ironMg}mg</span>
            <span className="font-bold text-black">{dvIron}%</span>
          </div>
        )}

        {potassiumMg !== undefined && (
          <div className="flex justify-between py-0.5 border-b border-stone-200 text-stone-700">
            <span>Potassium {potassiumMg}mg</span>
            <span className="font-bold text-black">{dvPotassium}%</span>
          </div>
        )}
      </div>

      <div className="text-[10px] text-stone-600 mt-2 leading-tight pt-1">
        * The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000 calories a day is used for general nutrition advice.
      </div>
    </div>
  );
};
