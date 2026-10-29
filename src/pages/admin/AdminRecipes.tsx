import React, { useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { mockRecipes } from '../../data/mockRecipes';
import { Recipe } from '../../types';
import { Plus, Trash2, Clock, DollarSign, Utensils } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { useAppStore } from '../../store/useStore';

export const AdminRecipes: React.FC = () => {
  const { showToast } = useAppStore();
  const [recipes, setRecipes] = useState<Recipe[]>(mockRecipes);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack'>('dinner');
  const [prepTimeMinutes, setPrepTimeMinutes] = useState(15);
  const [cookTimeMinutes, setCookTimeMinutes] = useState(20);
  const [caloriesPerServing, setCaloriesPerServing] = useState(480);
  const [proteinG, setProteinG] = useState(32);
  const [carbsG, setCarbsG] = useState(45);
  const [fatG, setFatG] = useState(16);
  const [fiberG, setFiberG] = useState(8);
  const [estimatedCost, setEstimatedCost] = useState(3.50);

  const handleCreateRecipe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newRecipe: Recipe = {
      id: `rec-${Date.now()}`,
      title: title.trim(),
      slug: title.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: `Nutrient-dense ${category} formulation balanced for health goals.`,
      coverImageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
      category,
      prepTimeMinutes: Number(prepTimeMinutes),
      cookTimeMinutes: Number(cookTimeMinutes),
      servings: 4,
      difficulty: 'easy',
      caloriesPerServing: Number(caloriesPerServing),
      proteinG: Number(proteinG),
      carbsG: Number(carbsG),
      fatG: Number(fatG),
      fiberG: Number(fiberG),
      sodiumMg: 380,
      sugarG: 3,
      saturatedFatG: 2,
      dietaryTags: ['High-Protein', 'Balanced'],
      allergens: [],
      storageInstructions: 'Refrigerate in airtight containers for up to 4 days.',
      estimatedCostPerServingUsd: Number(estimatedCost),
      ratingAvg: 5.0,
      ratingCount: 1,
      ingredients: [
        { name: 'Core protein staple', quantity: 1, unit: 'portion' },
        { name: 'Fresh seasonal greens', quantity: 2, unit: 'cups' },
        { name: 'Extra virgin olive oil', quantity: 1, unit: 'tbsp' }
      ],
      steps: [
        { stepNumber: 1, instruction: 'Prep all fresh whole food ingredients and warm cooking pan.' },
        { stepNumber: 2, instruction: 'Cook protein thoroughly and assemble with fiber greens and dressing.' }
      ]
    };

    setRecipes([newRecipe, ...recipes]);
    setIsModalOpen(false);
    setTitle('');
    showToast(`Added "${newRecipe.title}" to recipe catalog!`, 'success');
  };

  const handleDelete = (id: string) => {
    setRecipes(recipes.filter(r => r.id !== id));
    showToast('Recipe archived from catalog.', 'info');
  };

  return (
    <AdminLayout title="Recipe Database Management">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8EFE6]">
          <div>
            <h1 className="font-serif-heading text-2xl font-bold text-[#1A2E1A]">
              Tested Recipe Library
            </h1>
            <p className="text-xs text-[#4A6741]">
              Manage culinary formulations, standardized US measurements, and calculated nutrition facts.
            </p>
          </div>
          <Button variant="primary" size="sm" onClick={() => setIsModalOpen(true)}>
            <Plus className="w-3.5 h-3.5" /> Add New Recipe
          </Button>
        </div>

        <div className="bg-white rounded-[24px] border border-[#E8EFE6] overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#FAFAF7] border-b border-[#E8EFE6] text-stone-500 font-bold uppercase tracking-wider">
                  <th className="py-3 px-4">Recipe Title</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Total Time</th>
                  <th className="py-3 px-4">Calories / Serving</th>
                  <th className="py-3 px-4">Protein (g)</th>
                  <th className="py-3 px-4">Est. Cost</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0F4EF]">
                {recipes.map((r) => (
                  <tr key={r.id} className="hover:bg-[#FAFAF7] transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-[#1A2E1A] max-w-xs truncate">
                      {r.title}
                    </td>
                    <td className="py-3.5 px-4 capitalize font-medium text-[#4A6741]">{r.category}</td>
                    <td className="py-3.5 px-4 text-stone-600 font-medium">
                      {r.prepTimeMinutes + r.cookTimeMinutes} min
                    </td>
                    <td className="py-3.5 px-4 font-bold text-[#F77F00]">{r.caloriesPerServing} kcal</td>
                    <td className="py-3.5 px-4 font-bold text-[#3A86FF]">{r.proteinG}g</td>
                    <td className="py-3.5 px-4 font-semibold text-[#2D6A4F]">
                      ${r.estimatedCostPerServingUsd?.toFixed(2) || '2.50'}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleDelete(r.id)}
                        className="p-1.5 text-stone-400 hover:text-red-600 transition-colors cursor-pointer"
                        title="Delete recipe"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Create Recipe Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Add New Recipe to Catalog"
          subtitle="Formulate wholesome tested recipes"
        >
          <form onSubmit={handleCreateRecipe} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-[#4A6741] mb-1">Recipe Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Lemon Rosemary Chicken with Roasted Veggies"
                className="w-full h-11 px-3.5 rounded-[12px] bg-[#FAFAF7] border border-[#D4E4D0] text-xs font-semibold focus:outline-none focus:border-[#2D6A4F]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase text-[#4A6741] mb-1">Meal Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full h-11 px-3 rounded-[12px] bg-[#FAFAF7] border border-[#D4E4D0] text-xs font-semibold"
                >
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                  <option value="snack">Snack</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#4A6741] mb-1">Est. Cost / Serving ($)</label>
                <input
                  type="number"
                  step="0.10"
                  value={estimatedCost}
                  onChange={(e) => setEstimatedCost(Number(e.target.value))}
                  className="w-full h-11 px-3.5 rounded-[12px] bg-[#FAFAF7] border border-[#D4E4D0] text-xs font-semibold"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase text-[#4A6741] mb-1">Prep Time (mins)</label>
                <input
                  type="number"
                  value={prepTimeMinutes}
                  onChange={(e) => setPrepTimeMinutes(Number(e.target.value))}
                  className="w-full h-11 px-3.5 rounded-[12px] bg-[#FAFAF7] border border-[#D4E4D0] text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#4A6741] mb-1">Cook Time (mins)</label>
                <input
                  type="number"
                  value={cookTimeMinutes}
                  onChange={(e) => setCookTimeMinutes(Number(e.target.value))}
                  className="w-full h-11 px-3.5 rounded-[12px] bg-[#FAFAF7] border border-[#D4E4D0] text-xs font-semibold"
                />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 pt-2 border-t border-[#F0F4EF]">
              <div>
                <label className="block text-[11px] font-bold text-[#4A6741] uppercase mb-1">Calories</label>
                <input
                  type="number"
                  value={caloriesPerServing}
                  onChange={(e) => setCaloriesPerServing(Number(e.target.value))}
                  className="w-full h-10 px-2 text-center rounded-[8px] bg-[#FAFAF7] border border-[#D4E4D0] text-xs font-bold"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-[#4A6741] uppercase mb-1">Protein (g)</label>
                <input
                  type="number"
                  value={proteinG}
                  onChange={(e) => setProteinG(Number(e.target.value))}
                  className="w-full h-10 px-2 text-center rounded-[8px] bg-[#FAFAF7] border border-[#D4E4D0] text-xs font-bold"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-[#4A6741] uppercase mb-1">Carbs (g)</label>
                <input
                  type="number"
                  value={carbsG}
                  onChange={(e) => setCarbsG(Number(e.target.value))}
                  className="w-full h-10 px-2 text-center rounded-[8px] bg-[#FAFAF7] border border-[#D4E4D0] text-xs font-bold"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-[#4A6741] uppercase mb-1">Fiber (g)</label>
                <input
                  type="number"
                  value={fiberG}
                  onChange={(e) => setFiberG(Number(e.target.value))}
                  className="w-full h-10 px-2 text-center rounded-[8px] bg-[#FAFAF7] border border-[#D4E4D0] text-xs font-bold"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Save Recipe
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </AdminLayout>
  );
};
