import React, { useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { mockFoods } from '../../data/mockFoods';
import { FoodItem } from '../../types';
import { ShieldCheck, Plus, Trash2, Download, Apple } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { useAppStore } from '../../store/useStore';

export const AdminFoods: React.FC = () => {
  const { showToast } = useAppStore();
  const [foods, setFoods] = useState<FoodItem[]>(mockFoods);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [name, setName] = useState('');
  const [category, setCategory] = useState('Whole Grains & Legumes');
  const [defaultServingUnit, setDefaultServingUnit] = useState('1 cup (150g)');
  const [calories, setCalories] = useState(160);
  const [proteinG, setProteinG] = useState(6);
  const [fiberG, setFiberG] = useState(4);
  const [potassiumMg, setPotassiumMg] = useState(300);

  const handleImportUSDA = () => {
    showToast('Simulated sync with USDA FoodData Central API: 8 food profiles up to date.', 'success');
  };

  const handleAddFood = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newFood: FoodItem = {
      id: `food-${Date.now()}`,
      name: name.trim(),
      slug: name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category,
      usdaFdcId: Math.floor(100000 + Math.random() * 900000),
      imageUrl: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&w=400&q=80',
      defaultServingSize: 100,
      defaultServingUnit,
      calories: Number(calories),
      proteinG: Number(proteinG),
      totalCarbsG: 25,
      totalFatG: 2,
      saturatedFatG: 0.5,
      fiberG: Number(fiberG),
      potassiumMg: Number(potassiumMg),
      sodiumMg: 15,
      totalSugarsG: 1,
      calciumMg: 30,
      ironMg: 2,
      vitaminCMg: 0,
      description: `Nutrient profile for ${name.trim()}.`,
      preparationMethods: 'Wash and prepare according to dietary preference.',
      storageInstructions: 'Store in cool dry pantry or refrigerator.',
      commonAllergens: [],
      healthBenefits: 'Supports cardiovascular and gut health with micronutrient density.'
    };

    setFoods([newFood, ...foods]);
    setIsModalOpen(false);
    setName('');
    showToast(`Added "${newFood.name}" to USDA database!`, 'success');
  };

  const handleDelete = (id: string) => {
    setFoods(foods.filter(f => f.id !== id));
    showToast('Food profile archived.', 'info');
  };

  return (
    <AdminLayout title="USDA Food Database Items">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8EFE6]">
          <div>
            <h1 className="font-serif-heading text-2xl font-bold text-[#1A2E1A]">
              USDA Reference Food Database
            </h1>
            <p className="text-xs text-[#4A6741]">
              Manage laboratory food nutrient records, portion weights, and micronutrient densities.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" onClick={handleImportUSDA}>
              <Download className="w-3.5 h-3.5" /> Sync with USDA API
            </Button>
            <Button variant="primary" size="sm" onClick={() => setIsModalOpen(true)}>
              <Plus className="w-3.5 h-3.5" /> Add Food Record
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-[24px] border border-[#E8EFE6] overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#FAFAF7] border-b border-[#E8EFE6] text-stone-500 font-bold uppercase tracking-wider">
                  <th className="py-3 px-4">USDA FDC #</th>
                  <th className="py-3 px-4">Food Item Name</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Serving Unit</th>
                  <th className="py-3 px-4">Calories</th>
                  <th className="py-3 px-4">Fiber (g)</th>
                  <th className="py-3 px-4">Potassium (mg)</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0F4EF]">
                {foods.map((f) => (
                  <tr key={f.id} className="hover:bg-[#FAFAF7] transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#2D6A4F]">
                      #{f.usdaFdcId}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-[#1A2E1A]">{f.name}</td>
                    <td className="py-3.5 px-4 text-[#4A6741] font-medium">{f.category}</td>
                    <td className="py-3.5 px-4 text-stone-600">{f.defaultServingUnit}</td>
                    <td className="py-3.5 px-4 font-bold text-[#F77F00]">{f.calories} kcal</td>
                    <td className="py-3.5 px-4 font-bold text-[#2D6A4F]">{f.fiberG}g</td>
                    <td className="py-3.5 px-4 font-semibold text-purple-700">{f.potassiumMg}mg</td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleDelete(f.id)}
                        className="p-1.5 text-stone-400 hover:text-red-600 transition-colors cursor-pointer"
                        title="Delete record"
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

        {/* Add Food Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Add USDA Food Record"
          subtitle="Input laboratory nutritional profile"
        >
          <form onSubmit={handleAddFood} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-[#4A6741] mb-1">Food Item Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Organic Raw Blueberries"
                className="w-full h-11 px-3.5 rounded-[12px] bg-[#FAFAF7] border border-[#D4E4D0] text-xs font-semibold focus:outline-none focus:border-[#2D6A4F]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase text-[#4A6741] mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-11 px-3 rounded-[12px] bg-[#FAFAF7] border border-[#D4E4D0] text-xs font-semibold"
                >
                  <option value="Produce & Vegetables">Produce & Vegetables</option>
                  <option value="Fruits & Berries">Fruits & Berries</option>
                  <option value="Whole Grains & Legumes">Whole Grains & Legumes</option>
                  <option value="Seafood & Proteins">Seafood & Proteins</option>
                  <option value="Healthy Fats & Nuts">Healthy Fats & Nuts</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#4A6741] mb-1">Serving Unit</label>
                <input
                  type="text"
                  value={defaultServingUnit}
                  onChange={(e) => setDefaultServingUnit(e.target.value)}
                  placeholder="e.g. 1 cup (148g)"
                  className="w-full h-11 px-3.5 rounded-[12px] bg-[#FAFAF7] border border-[#D4E4D0] text-xs font-semibold"
                />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 pt-2 border-t border-[#F0F4EF]">
              <div>
                <label className="block text-[11px] font-bold text-[#4A6741] uppercase mb-1">Calories</label>
                <input
                  type="number"
                  value={calories}
                  onChange={(e) => setCalories(Number(e.target.value))}
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
                <label className="block text-[11px] font-bold text-[#4A6741] uppercase mb-1">Fiber (g)</label>
                <input
                  type="number"
                  value={fiberG}
                  onChange={(e) => setFiberG(Number(e.target.value))}
                  className="w-full h-10 px-2 text-center rounded-[8px] bg-[#FAFAF7] border border-[#D4E4D0] text-xs font-bold"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-[#4A6741] uppercase mb-1">Potassium (mg)</label>
                <input
                  type="number"
                  value={potassiumMg}
                  onChange={(e) => setPotassiumMg(Number(e.target.value))}
                  className="w-full h-10 px-2 text-center rounded-[8px] bg-[#FAFAF7] border border-[#D4E4D0] text-xs font-bold"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Save Food Record
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </AdminLayout>
  );
};
