import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Star, Bookmark } from 'lucide-react';
import { Recipe } from '../../types';
import { MacroBadges } from './MacroBadges';
import { useAppStore } from '../../store/useStore';

interface RecipeCardProps {
  recipe: Recipe;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const { user, toggleSaveRecipe } = useAppStore();
  const isSaved = user.savedRecipeIds.includes(recipe.id);

  return (
    <div className="group bg-white rounded-[20px] overflow-hidden border border-[#E8EFE6] shadow-[0_2px_12px_rgba(45,106,79,0.06)] hover:shadow-[0_8px_24px_rgba(45,106,79,0.12)] hover:-translate-y-1 transition-all duration-200 flex flex-col h-full">
      {/* Image container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
        <img
          src={recipe.coverImageUrl}
          alt={recipe.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-white/95 text-[#2D6A4F] backdrop-blur-xs shadow-xs capitalize">
            {recipe.category}
          </span>
          {recipe.dietaryTags[0] && (
            <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-[#2D6A4F]/90 text-white backdrop-blur-xs shadow-xs">
              {recipe.dietaryTags[0]}
            </span>
          )}
        </div>

        {/* Save button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleSaveRecipe(recipe.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-xs transition-colors cursor-pointer shadow-xs ${
            isSaved
              ? 'bg-[#2D6A4F] text-white'
              : 'bg-white/90 text-[#4A6741] hover:bg-white hover:text-[#2D6A4F]'
          }`}
          title={isSaved ? 'Saved to collection' : 'Save recipe'}
        >
          <Bookmark className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} />
        </button>

        {/* Time badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 text-white text-xs backdrop-blur-xs">
          <Clock className="w-3.5 h-3.5 text-[#52B788]" />
          <span>{recipe.prepTimeMinutes + recipe.cookTimeMinutes} min</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center gap-1 text-xs font-medium text-[#4A6741] mb-1.5">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="font-bold ml-1 text-stone-900">{recipe.ratingAvg}</span>
            </div>
            <span>•</span>
            <span>({recipe.ratingCount} reviews)</span>
            {recipe.estimatedCostPerServingUsd && (
              <>
                <span>•</span>
                <span className="text-[#2D6A4F] font-semibold">${recipe.estimatedCostPerServingUsd.toFixed(2)}/serving</span>
              </>
            )}
          </div>

          <Link to={`/recipes/${recipe.slug}`} className="block">
            <h3 className="font-serif-heading text-lg font-bold text-[#1A2E1A] group-hover:text-[#2D6A4F] transition-colors line-clamp-2 leading-snug">
              {recipe.title}
            </h3>
          </Link>

          <p className="text-xs text-[#4A6741] mt-2 line-clamp-2 leading-relaxed">
            {recipe.description}
          </p>
        </div>

        {/* Nutrition Badges */}
        <div className="pt-4 mt-4 border-t border-[#F0F4EF] flex items-center justify-between">
          <MacroBadges
            calories={recipe.caloriesPerServing}
            proteinG={recipe.proteinG}
            carbsG={recipe.carbsG}
            fiberG={recipe.fiberG}
            size="sm"
          />
        </div>
      </div>
    </div>
  );
};
