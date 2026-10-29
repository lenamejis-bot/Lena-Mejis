import React, { useState } from 'react';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { useAppStore } from '../../store/useStore';
import { ShoppingBag, Check, Plus, Printer, Trash2, Home, CheckSquare, Square, DollarSign } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const GroceryPlannerPage: React.FC = () => {
  const { groceryList, toggleGroceryItem, togglePantryItem, addGroceryItem, showToast } = useAppStore();

  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState('1 count');
  const [newItemCategory, setNewItemCategory] = useState<'produce' | 'dairy' | 'meat' | 'pantry' | 'frozen'>('produce');
  const [hideInPantry, setHideInPantry] = useState(false);

  const categories = [
    { id: 'produce', title: 'Fresh Produce' },
    { id: 'dairy', title: 'Dairy & Plant Milks' },
    { id: 'meat', title: 'Meat, Seafood & Tofu' },
    { id: 'pantry', title: 'Pantry, Grains & Legumes' },
    { id: 'frozen', title: 'Frozen Essentials' }
  ];

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    addGroceryItem({
      name: newItemName.trim(),
      quantity: newItemQuantity.trim() || '1 item',
      category: newItemCategory,
      isChecked: false,
      inPantry: false,
      estimatedCostUsd: 3.50
    });

    setNewItemName('');
    setNewItemQuantity('1 count');
  };

  const handlePrint = () => {
    window.print();
  };

  const totalCost = groceryList
    .filter(item => !item.inPantry)
    .reduce((sum, item) => sum + (item.estimatedCostUsd || 3.0), 0);

  const checkedCount = groceryList.filter(item => item.isChecked).length;
  const neededItems = groceryList.filter(item => !item.inPantry);

  return (
    <PageWrapper title="Smart Grocery Planner & Pantry Sync">
      <div className="bg-[#F0F4EF] py-12 border-b border-[#D4E4D0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F] block mb-2 flex items-center gap-1.5">
              <ShoppingBag className="w-4 h-4" /> Automated Shopping List
            </span>
            <h1 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#1A2E1A]">
              Smart Grocery Planner
            </h1>
            <p className="text-sm text-[#4A6741] mt-2 max-w-xl leading-relaxed">
              Consolidated from your active 7-Day Meal Plan. Organize by store aisle, check off items as you shop, and mark items already in your pantry.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-[12px] bg-white border border-[#D4E4D0] text-xs font-semibold text-[#1A2E1A] hover:bg-[#F0F4EF] transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4 text-[#2D6A4F]" /> Print List
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        {/* Quick Stats & Pantry Toggle Bar */}
        <div className="bg-white p-6 rounded-[24px] border border-[#E8EFE6] shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-xs text-[#4A6741]">
            <div>
              <span className="text-[#8FAE8A] block">Total Items Needed</span>
              <strong className="text-base text-[#1A2E1A]">{neededItems.length} items</strong>
            </div>
            <div>
              <span className="text-[#8FAE8A] block">Purchased Progress</span>
              <strong className="text-base text-[#2D6A4F]">{checkedCount} / {neededItems.length}</strong>
            </div>
            <div>
              <span className="text-[#8FAE8A] block">Est. Basket Total</span>
              <strong className="text-base text-[#F77F00]">${totalCost.toFixed(2)}</strong>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-xs font-semibold text-[#1A2E1A] cursor-pointer">
              <input
                type="checkbox"
                checked={hideInPantry}
                onChange={(e) => setHideInPantry(e.target.checked)}
                className="w-4 h-4 accent-[#2D6A4F] rounded cursor-pointer"
              />
              <span>Hide items marked "In Pantry"</span>
            </label>
          </div>
        </div>

        {/* Add Custom Item Row */}
        <form onSubmit={handleAddItem} className="bg-white p-6 rounded-[20px] border border-[#D4E4D0] shadow-xs flex flex-wrap items-center gap-3">
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder="Add custom item (e.g. lemons, almond butter, olive oil)..."
              className="w-full h-11 px-3.5 rounded-[10px] bg-[#FAFAF7] border border-[#D4E4D0] text-xs text-[#1A2E1A] focus:outline-none focus:border-[#2D6A4F]"
            />
          </div>

          <div className="w-32">
            <input
              type="text"
              value={newItemQuantity}
              onChange={(e) => setNewItemQuantity(e.target.value)}
              placeholder="Qty (e.g. 2 lbs)"
              className="w-full h-11 px-3 rounded-[10px] bg-[#FAFAF7] border border-[#D4E4D0] text-xs text-[#1A2E1A] focus:outline-none focus:border-[#2D6A4F]"
            />
          </div>

          <div className="w-44">
            <select
              value={newItemCategory}
              onChange={(e) => setNewItemCategory(e.target.value as any)}
              className="w-full h-11 px-3 rounded-[10px] bg-[#FAFAF7] border border-[#D4E4D0] text-xs font-semibold text-[#1A2E1A] focus:outline-none focus:border-[#2D6A4F]"
            >
              <option value="produce">Fresh Produce</option>
              <option value="dairy">Dairy & Milks</option>
              <option value="meat">Meat & Seafood</option>
              <option value="pantry">Pantry & Grains</option>
              <option value="frozen">Frozen</option>
            </select>
          </div>

          <Button type="submit" variant="primary" size="md">
            <Plus className="w-3.5 h-3.5" /> Add Item
          </Button>
        </form>

        {/* Categorized Grocery Departments */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(cat => {
            const items = groceryList.filter(item => {
              const matchesCat = item.category === cat.id;
              if (hideInPantry && item.inPantry) return false;
              return matchesCat;
            });

            if (items.length === 0) return null;

            return (
              <div key={cat.id} className="bg-white p-6 rounded-[24px] border border-[#E8EFE6] shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-[#F0F4EF] mb-4">
                    <h3 className="font-serif-heading text-lg font-bold text-[#1A2E1A]">
                      {cat.title}
                    </h3>
                    <span className="text-[11px] font-bold text-[#8FAE8A] bg-[#F0F4EF] px-2 py-0.5 rounded-full">
                      {items.length} items
                    </span>
                  </div>

                  <div className="space-y-2">
                    {items.map(item => (
                      <div
                        key={item.id}
                        className={`flex items-center justify-between p-2.5 rounded-[12px] border transition-all ${
                          item.isChecked
                            ? 'bg-[#F0F4EF] border-[#D4E4D0] opacity-60'
                            : item.inPantry
                            ? 'bg-amber-50/50 border-amber-200/50 text-[#8FAE8A]'
                            : 'bg-[#FAFAF7] border-[#E8EFE6] hover:bg-white'
                        }`}
                      >
                        <div
                          className="flex items-center gap-2.5 flex-1 cursor-pointer"
                          onClick={() => toggleGroceryItem(item.id)}
                        >
                          {item.isChecked ? (
                            <CheckSquare className="w-4 h-4 text-[#2D6A4F] shrink-0" />
                          ) : (
                            <Square className="w-4 h-4 text-[#8FAE8A] shrink-0" />
                          )}
                          <span className={`text-xs font-medium ${item.isChecked ? 'line-through text-[#8FAE8A]' : 'text-[#1A2E1A]'}`}>
                            {item.name}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 ml-2">
                          <span className="text-[11px] font-semibold text-[#4A6741]">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => togglePantryItem(item.id)}
                            className={`p-1 rounded-md text-[10px] font-bold transition-colors cursor-pointer ${
                              item.inPantry
                                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                : 'bg-[#F0F4EF] text-[#8FAE8A] hover:text-[#2D6A4F]'
                            }`}
                            title={item.inPantry ? 'Marked in pantry' : 'Mark as in pantry'}
                          >
                            <Home className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PageWrapper>
  );
};
