import { MealPlan } from '../types';

export const mockDietPlans: MealPlan[] = [
  {
    id: 'plan-1',
    title: 'Balanced Mediterranean Vitality (7-Day)',
    goal: 'Cardiovascular wellness, stable glycemic energy, and gut microbiome diversity',
    dietaryPreferences: ['Mediterranean', 'High-Fiber', 'Heart-Healthy'],
    caloriesTarget: 1950,
    generatedBy: 'curated',
    rationale: 'Rooted in the clinical PREDIMED trial principles: unrefined whole grains, wild-caught omega-3 rich seafood, extra virgin olive oil, and 30+ diverse plant foods weekly.',
    days: [
      {
        dayName: 'Monday',
        dayIndex: 0,
        totalCalories: 1920,
        totalProteinG: 110,
        totalCarbsG: 210,
        totalFatG: 68,
        totalFiberG: 38,
        meals: [
          {
            mealType: 'breakfast',
            title: 'High-Protein Cinnamon Apple Overnight Oats',
            recipeSlug: 'high-protein-cinnamon-apple-overnight-oats',
            calories: 360,
            proteinG: 24,
            carbsG: 48,
            fatG: 8,
            prepTimeMinutes: 10,
            notes: 'Prepared the evening prior in a mason jar.'
          },
          {
            mealType: 'lunch',
            title: 'Edamame Crunch Power Salad with Ginger Tahini',
            recipeSlug: 'edamame-crunch-power-salad',
            calories: 340,
            proteinG: 18,
            carbsG: 28,
            fatG: 18,
            prepTimeMinutes: 15,
            notes: 'Garnish with toasted pumpkin and sesame seeds.'
          },
          {
            mealType: 'dinner',
            title: 'Mediterranean Herb-Roasted Salmon & Quinoa Bowl',
            recipeSlug: 'mediterranean-herb-salmon-quinoa-bowl',
            calories: 520,
            proteinG: 38,
            carbsG: 42,
            fatG: 22,
            prepTimeMinutes: 25,
            notes: 'Fresh lemon juice and extra virgin olive oil finish.'
          },
          {
            mealType: 'snack',
            title: 'Avocado Cacao Energy Bites (2 pcs) with Green Tea',
            recipeSlug: 'avocado-cacao-energy-bites',
            calories: 220,
            proteinG: 8,
            carbsG: 24,
            fatG: 12,
            prepTimeMinutes: 5,
            notes: 'Polyphenol-rich afternoon sustained energy boost.'
          }
        ]
      },
      {
        dayName: 'Tuesday',
        dayIndex: 1,
        totalCalories: 1960,
        totalProteinG: 118,
        totalCarbsG: 205,
        totalFatG: 72,
        totalFiberG: 42,
        meals: [
          {
            mealType: 'breakfast',
            title: 'Greek Yogurt Parfait with Black Chia Seeds & Blueberries',
            calories: 380,
            proteinG: 26,
            carbsG: 42,
            fatG: 10,
            prepTimeMinutes: 5,
            notes: 'Use unsweetened nonfat Greek yogurt with raw walnuts.'
          },
          {
            mealType: 'lunch',
            title: 'Hearty Tuscan White Bean & Kale Stew with Sourdough',
            recipeSlug: 'tuscan-white-bean-kale-stew',
            calories: 420,
            proteinG: 22,
            carbsG: 62,
            fatG: 9,
            prepTimeMinutes: 20,
            notes: 'Serve with 1 slice toasted whole grain sourdough.'
          },
          {
            mealType: 'dinner',
            title: 'Sheet-Pan Lemon Herb Chicken & Roasted Root Vegetables',
            recipeSlug: 'sheet-pan-lemon-chicken-root-vegetables',
            calories: 440,
            proteinG: 42,
            carbsG: 34,
            fatG: 14,
            prepTimeMinutes: 30,
            notes: 'Rich in beta-carotene from garnet sweet potatoes.'
          },
          {
            mealType: 'snack',
            title: 'Sliced English Cucumber with Garlic Hummus & Kalamata Olives',
            calories: 190,
            proteinG: 6,
            carbsG: 18,
            fatG: 11,
            prepTimeMinutes: 5
          }
        ]
      },
      {
        dayName: 'Wednesday',
        dayIndex: 2,
        totalCalories: 1890,
        totalProteinG: 108,
        totalCarbsG: 215,
        totalFatG: 65,
        totalFiberG: 39,
        meals: [
          {
            mealType: 'breakfast',
            title: 'Spinach & Pasture-Raised Egg White Omelet with Avocado Toast',
            calories: 410,
            proteinG: 28,
            carbsG: 32,
            fatG: 18,
            prepTimeMinutes: 12
          },
          {
            mealType: 'lunch',
            title: 'Mediterranean Herb-Roasted Salmon Leftover Bowl',
            recipeSlug: 'mediterranean-herb-salmon-quinoa-bowl',
            calories: 520,
            proteinG: 38,
            carbsG: 42,
            fatG: 22,
            prepTimeMinutes: 5,
            notes: 'Meal-prep portion from Monday dinner.'
          },
          {
            mealType: 'dinner',
            title: 'Tuscan White Bean & Kale Stew with Olive Oil Drizzle',
            recipeSlug: 'tuscan-white-bean-kale-stew',
            calories: 380,
            proteinG: 20,
            carbsG: 56,
            fatG: 8,
            prepTimeMinutes: 10
          },
          {
            mealType: 'snack',
            title: 'Crisp Honeycrisp Apple with 1 tbsp Natural Almond Butter',
            calories: 200,
            proteinG: 4,
            carbsG: 28,
            fatG: 9,
            prepTimeMinutes: 2
          }
        ]
      },
      {
        dayName: 'Thursday',
        dayIndex: 3,
        totalCalories: 1940,
        totalProteinG: 115,
        totalCarbsG: 200,
        totalFatG: 70,
        totalFiberG: 37,
        meals: [
          {
            mealType: 'breakfast',
            title: 'High-Protein Cinnamon Apple Overnight Oats',
            recipeSlug: 'high-protein-cinnamon-apple-overnight-oats',
            calories: 360,
            proteinG: 24,
            carbsG: 48,
            fatG: 8,
            prepTimeMinutes: 5
          },
          {
            mealType: 'lunch',
            title: 'Edamame Crunch Power Salad with Lemon Tahini',
            recipeSlug: 'edamame-crunch-power-salad',
            calories: 340,
            proteinG: 18,
            carbsG: 28,
            fatG: 18,
            prepTimeMinutes: 10
          },
          {
            mealType: 'dinner',
            title: 'Sheet-Pan Lemon Herb Chicken & Roasted Root Vegetables',
            recipeSlug: 'sheet-pan-lemon-chicken-root-vegetables',
            calories: 440,
            proteinG: 42,
            carbsG: 34,
            fatG: 14,
            prepTimeMinutes: 10
          },
          {
            mealType: 'snack',
            title: 'Avocado Cacao Energy Bites (2 pcs) with Mint Infusion',
            recipeSlug: 'avocado-cacao-energy-bites',
            calories: 220,
            proteinG: 8,
            carbsG: 24,
            fatG: 12,
            prepTimeMinutes: 2
          }
        ]
      },
      {
        dayName: 'Friday',
        dayIndex: 4,
        totalCalories: 1980,
        totalProteinG: 122,
        totalCarbsG: 190,
        totalFatG: 74,
        totalFiberG: 36,
        meals: [
          {
            mealType: 'breakfast',
            title: 'Berry Chia Protein Smoothie Bowl',
            calories: 390,
            proteinG: 30,
            carbsG: 44,
            fatG: 10,
            prepTimeMinutes: 8
          },
          {
            mealType: 'lunch',
            title: 'Warm Quinoa & Chickpea Tabbouleh with Feta',
            calories: 420,
            proteinG: 16,
            carbsG: 54,
            fatG: 16,
            prepTimeMinutes: 15
          },
          {
            mealType: 'dinner',
            title: 'Wild Alaskan Salmon with Roasted Asparagus & Baby Potatoes',
            calories: 540,
            proteinG: 42,
            carbsG: 38,
            fatG: 22,
            prepTimeMinutes: 25
          },
          {
            mealType: 'snack',
            title: 'Raw Walnuts and Dark Chocolate (85% Cacao)',
            calories: 210,
            proteinG: 5,
            carbsG: 14,
            fatG: 16,
            prepTimeMinutes: 2
          }
        ]
      },
      {
        dayName: 'Saturday',
        dayIndex: 5,
        totalCalories: 2010,
        totalProteinG: 114,
        totalCarbsG: 220,
        totalFatG: 72,
        totalFiberG: 40,
        meals: [
          {
            mealType: 'breakfast',
            title: 'Whole Grain Shakshuka with Poached Eggs & Herbs',
            calories: 440,
            proteinG: 24,
            carbsG: 40,
            fatG: 20,
            prepTimeMinutes: 20
          },
          {
            mealType: 'lunch',
            title: 'Mediterranean Lentil Soup with Baby Spinach',
            calories: 380,
            proteinG: 22,
            carbsG: 56,
            fatG: 7,
            prepTimeMinutes: 15
          },
          {
            mealType: 'dinner',
            title: 'Herb-Crusted Cod with Roasted Cauliflower Steaks',
            calories: 480,
            proteinG: 44,
            carbsG: 28,
            fatG: 18,
            prepTimeMinutes: 30
          },
          {
            mealType: 'snack',
            title: 'Roasted Spicy Edamame & Fresh Orange Slices',
            calories: 180,
            proteinG: 11,
            carbsG: 20,
            fatG: 6,
            prepTimeMinutes: 5
          }
        ]
      },
      {
        dayName: 'Sunday',
        dayIndex: 6,
        totalCalories: 1910,
        totalProteinG: 116,
        totalCarbsG: 205,
        totalFatG: 66,
        totalFiberG: 41,
        meals: [
          {
            mealType: 'breakfast',
            title: 'High-Protein Cinnamon Apple Overnight Oats',
            recipeSlug: 'high-protein-cinnamon-apple-overnight-oats',
            calories: 360,
            proteinG: 24,
            carbsG: 48,
            fatG: 8,
            prepTimeMinutes: 5
          },
          {
            mealType: 'lunch',
            title: 'Edamame Crunch Power Salad with Grilled Chicken Tenders',
            recipeSlug: 'edamame-crunch-power-salad',
            calories: 460,
            proteinG: 38,
            carbsG: 30,
            fatG: 20,
            prepTimeMinutes: 15
          },
          {
            mealType: 'dinner',
            title: 'Family Sheet-Pan Salmon & Rainbow Bell Peppers',
            recipeSlug: 'mediterranean-herb-salmon-quinoa-bowl',
            calories: 510,
            proteinG: 36,
            carbsG: 44,
            fatG: 20,
            prepTimeMinutes: 25
          },
          {
            mealType: 'snack',
            title: 'Avocado Cacao Energy Bites (2 pcs)',
            recipeSlug: 'avocado-cacao-energy-bites',
            calories: 220,
            proteinG: 8,
            carbsG: 24,
            fatG: 12,
            prepTimeMinutes: 2
          }
        ]
      }
    ],
    weeklyGroceryList: [
      { id: 'g-1', name: 'Wild Alaskan Sockeye Salmon Fillets', quantity: '2.5 lbs', category: 'meat', isChecked: false, inPantry: false, estimatedCostUsd: 22.50 },
      { id: 'g-2', name: 'Boneless Skinless Chicken Breasts', quantity: '2 lbs', category: 'meat', isChecked: false, inPantry: false, estimatedCostUsd: 8.99 },
      { id: 'g-3', name: 'Lacinato Tuscan Kale', quantity: '2 bunches', category: 'produce', isChecked: false, inPantry: false, estimatedCostUsd: 4.98 },
      { id: 'g-4', name: 'Hass Avocados', quantity: '4 count', category: 'produce', isChecked: false, inPantry: false, estimatedCostUsd: 5.00 },
      { id: 'g-5', name: 'Honeycrisp Apples', quantity: '4 count', category: 'produce', isChecked: false, inPantry: false, estimatedCostUsd: 4.50 },
      { id: 'g-6', name: 'Garnet Sweet Potatoes', quantity: '3 lbs', category: 'produce', isChecked: false, inPantry: false, estimatedCostUsd: 4.20 },
      { id: 'g-7', name: 'Brussels Sprouts', quantity: '1.5 lbs', category: 'produce', isChecked: false, inPantry: false, estimatedCostUsd: 4.50 },
      { id: 'g-8', name: 'Plain 0% Nonfat Greek Yogurt (32 oz tub)', quantity: '1 tub', category: 'dairy', isChecked: false, inPantry: false, estimatedCostUsd: 5.49 },
      { id: 'g-9', name: 'Organic Rolled Oats', quantity: '32 oz bag', category: 'pantry', isChecked: false, inPantry: true, estimatedCostUsd: 4.19 },
      { id: 'g-10', name: 'White & Red Quinoa', quantity: '16 oz bag', category: 'pantry', isChecked: false, inPantry: true, estimatedCostUsd: 3.99 },
      { id: 'g-11', name: 'Cannellini Beans (Low-Sodium 15 oz)', quantity: '4 cans', category: 'pantry', isChecked: false, inPantry: false, estimatedCostUsd: 4.80 },
      { id: 'g-12', name: 'Frozen Shelled Edamame', quantity: '16 oz bag', category: 'frozen', isChecked: false, inPantry: false, estimatedCostUsd: 2.89 },
      { id: 'g-13', name: 'Black Chia Seeds', quantity: '12 oz bag', category: 'pantry', isChecked: false, inPantry: true, estimatedCostUsd: 5.99 }
    ]
  },
  {
    id: 'plan-2',
    title: 'High-Protein Metabolic Satiety (7-Day)',
    goal: 'Maintain lean muscle mass, maximize thermic effect, and stabilize appetite',
    dietaryPreferences: ['High-Protein', 'Low-Glycemic'],
    caloriesTarget: 2100,
    generatedBy: 'curated',
    rationale: 'Distributes 35-45g of bioavailable protein evenly every 4-5 hours to trigger the leucine MPS threshold and optimize fullness hormones.',
    days: [
      {
        dayName: 'Monday',
        dayIndex: 0,
        totalCalories: 2080,
        totalProteinG: 155,
        totalCarbsG: 175,
        totalFatG: 65,
        totalFiberG: 34,
        meals: [
          {
            mealType: 'breakfast',
            title: '4-Egg Herb Frittata with Smoked Salmon & Arugula',
            calories: 450,
            proteinG: 38,
            carbsG: 8,
            fatG: 28,
            prepTimeMinutes: 15
          },
          {
            mealType: 'lunch',
            title: 'Sheet-Pan Lemon Herb Chicken Bowl with Quinoa',
            recipeSlug: 'sheet-pan-lemon-chicken-root-vegetables',
            calories: 520,
            proteinG: 48,
            carbsG: 42,
            fatG: 16,
            prepTimeMinutes: 20
          },
          {
            mealType: 'dinner',
            title: 'Mediterranean Herb-Roasted Salmon & Quinoa Bowl',
            recipeSlug: 'mediterranean-herb-salmon-quinoa-bowl',
            calories: 520,
            proteinG: 38,
            carbsG: 42,
            fatG: 22,
            prepTimeMinutes: 25
          },
          {
            mealType: 'snack',
            title: '1 Cup Greek Yogurt with Whey Protein, Cinnamon & Chia Seeds',
            calories: 270,
            proteinG: 35,
            carbsG: 18,
            fatG: 5,
            prepTimeMinutes: 3
          }
        ]
      }
    ],
    weeklyGroceryList: []
  }
];
