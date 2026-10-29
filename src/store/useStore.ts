import { useState, useEffect } from 'react';
import { UserProfile, UserRole, MealPlan, GroceryItem, FoodDiaryEntry, Appointment } from '../types';
import { mockDietPlans } from '../data/mockDietPlans';

const DEFAULT_PROFILE: UserProfile = {
  id: 'usr-101',
  email: 'jordan.miller@example.com',
  fullName: 'Jordan Miller',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  role: 'free', // Default to 'free', users can switch to 'premium', 'admin', 'guest'
  dietaryPreferences: ['Mediterranean', 'High-Protein'],
  foodAllergies: [],
  weeklyBudget: 125,
  householdSize: 2,
  cookingSkill: 'intermediate',
  healthGoal: 'balanced',
  ageRange: '26-35',
  activityLevel: 'moderate',
  newsletterSubscribed: true,
  onboardingCompleted: true,
  savedRecipeIds: ['rec-1', 'rec-2'],
  savedArticleIds: ['art-1']
};

const DEFAULT_DIARY_ENTRIES: FoodDiaryEntry[] = [
  {
    id: 'diary-1',
    date: new Date().toISOString().split('T')[0],
    mealType: 'breakfast',
    foodName: 'High-Protein Cinnamon Apple Overnight Oats',
    servingAmount: '1 serving (1.5 cups)',
    calories: 360,
    proteinG: 24,
    carbsG: 48,
    fatG: 8,
    fiberG: 9
  },
  {
    id: 'diary-2',
    date: new Date().toISOString().split('T')[0],
    mealType: 'lunch',
    foodName: 'Tuscan White Bean & Kale Stew with Sourdough',
    servingAmount: '1 large bowl (350g)',
    calories: 420,
    proteinG: 22,
    carbsG: 62,
    fatG: 9,
    fiberG: 12
  }
];

const DEFAULT_APPOINTMENTS: Appointment[] = [
  {
    id: 'appt-demo-1',
    dietitianId: 'rd-1',
    dietitianName: 'Sarah Jenkins, MS, RDN, LD',
    date: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    timeSlot: '10:00 AM - 10:45 AM EST',
    durationMin: 45,
    feeUsd: 120,
    reason: 'Reviewing personalized Mediterranean meal plan and IBS-friendly fiber pacing.',
    status: 'confirmed',
    createdAt: new Date().toISOString()
  }
];

// Persistent state listener pattern
type Listener = () => void;
let globalState = {
  user: DEFAULT_PROFILE,
  activeMealPlan: mockDietPlans[0],
  groceryList: mockDietPlans[0].weeklyGroceryList,
  diaryEntries: DEFAULT_DIARY_ENTRIES,
  appointments: DEFAULT_APPOINTMENTS,
  aiQueriesUsedToday: 0,
  activeToast: null as { message: string; type: 'success' | 'info' | 'error' } | null
};

// Load from localStorage if present
try {
  const savedState = localStorage.getItem('nutriwise_state_v1');
  if (savedState) {
    const parsed = JSON.parse(savedState);
    globalState = { ...globalState, ...parsed };
  }
} catch (e) {
  console.warn('Storage read failed', e);
}

const listeners = new Set<Listener>();

function saveAndNotify() {
  try {
    localStorage.setItem('nutriwise_state_v1', JSON.stringify({
      user: globalState.user,
      activeMealPlan: globalState.activeMealPlan,
      groceryList: globalState.groceryList,
      diaryEntries: globalState.diaryEntries,
      appointments: globalState.appointments,
      aiQueriesUsedToday: globalState.aiQueriesUsedToday
    }));
  } catch (e) {
    console.warn('Storage write failed', e);
  }
  listeners.forEach(fn => fn());
}

export function useAppStore() {
  const [, setTick] = useState(0);

  useEffect(() => {
    const l = () => setTick(t => t + 1);
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  }, []);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    globalState.activeToast = { message, type };
    saveAndNotify();
    setTimeout(() => {
      globalState.activeToast = null;
      saveAndNotify();
    }, 3500);
  };

  const setUserRole = (role: UserRole) => {
    globalState.user = { ...globalState.user, role };
    saveAndNotify();
    showToast(`Role switched to ${role.toUpperCase()}`, 'info');
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    globalState.user = { ...globalState.user, ...updates };
    saveAndNotify();
    showToast('Profile updated successfully', 'success');
  };

  const toggleSaveRecipe = (recipeId: string) => {
    const exists = globalState.user.savedRecipeIds.includes(recipeId);
    if (exists) {
      globalState.user.savedRecipeIds = globalState.user.savedRecipeIds.filter(id => id !== recipeId);
      showToast('Removed recipe from your collection', 'info');
    } else {
      globalState.user.savedRecipeIds.push(recipeId);
      showToast('Recipe saved to your collection ✓', 'success');
    }
    saveAndNotify();
  };

  const toggleSaveArticle = (articleId: string) => {
    const exists = globalState.user.savedArticleIds.includes(articleId);
    if (exists) {
      globalState.user.savedArticleIds = globalState.user.savedArticleIds.filter(id => id !== articleId);
      showToast('Removed article from saves', 'info');
    } else {
      globalState.user.savedArticleIds.push(articleId);
      showToast('Article saved to your reading list ✓', 'success');
    }
    saveAndNotify();
  };

  const setActiveMealPlan = (plan: MealPlan) => {
    globalState.activeMealPlan = plan;
    if (plan.weeklyGroceryList && plan.weeklyGroceryList.length > 0) {
      globalState.groceryList = plan.weeklyGroceryList;
    }
    saveAndNotify();
    showToast('Activated new 7-Day Meal Plan!', 'success');
  };

  const addFoodDiaryEntry = (entry: Omit<FoodDiaryEntry, 'id'>) => {
    const newEntry: FoodDiaryEntry = {
      ...entry,
      id: `diary-${Date.now()}`
    };
    globalState.diaryEntries = [newEntry, ...globalState.diaryEntries];
    saveAndNotify();
    showToast(`Logged ${entry.foodName} to ${entry.mealType} ✓`, 'success');
  };

  const removeFoodDiaryEntry = (id: string) => {
    globalState.diaryEntries = globalState.diaryEntries.filter(e => e.id !== id);
    saveAndNotify();
    showToast('Removed entry from food diary', 'info');
  };

  const toggleGroceryItem = (id: string) => {
    globalState.groceryList = globalState.groceryList.map(item =>
      item.id === id ? { ...item, isChecked: !item.isChecked } : item
    );
    saveAndNotify();
  };

  const togglePantryItem = (id: string) => {
    globalState.groceryList = globalState.groceryList.map(item =>
      item.id === id ? { ...item, inPantry: !item.inPantry } : item
    );
    saveAndNotify();
  };

  const addGroceryItem = (item: Omit<GroceryItem, 'id'>) => {
    const newItem: GroceryItem = {
      ...item,
      id: `g-${Date.now()}`
    };
    globalState.groceryList = [newItem, ...globalState.groceryList];
    saveAndNotify();
    showToast(`Added ${item.name} to grocery list`, 'success');
  };

  const bookAppointment = (data: Omit<Appointment, 'id' | 'createdAt'>) => {
    const newAppt: Appointment = {
      ...data,
      id: `appt-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    globalState.appointments = [newAppt, ...globalState.appointments];
    saveAndNotify();
    showToast(`Confirmed consultation with ${data.dietitianName}! Check your email for details.`, 'success');
  };

  const cancelAppointment = (id: string) => {
    globalState.appointments = globalState.appointments.map(a =>
      a.id === id ? { ...a, status: 'cancelled' as const } : a
    );
    saveAndNotify();
    showToast('Consultation cancelled. Any applicable deposit will be refunded within 3 days.', 'info');
  };

  const incrementAiQueryCount = () => {
    globalState.aiQueriesUsedToday += 1;
    saveAndNotify();
  };

  const replaceMealInPlan = (dayIndex: number, mealType: string, newMeal: any) => {
    if (!globalState.activeMealPlan) return;
    const days = [...globalState.activeMealPlan.days];
    const day = { ...days[dayIndex] };
    day.meals = day.meals.map(m => m.mealType === mealType ? { ...m, ...newMeal } : m);
    // recalculate totals
    day.totalCalories = day.meals.reduce((sum, m) => sum + (m.calories || 0), 0);
    day.totalProteinG = day.meals.reduce((sum, m) => sum + (m.proteinG || 0), 0);
    day.totalCarbsG = day.meals.reduce((sum, m) => sum + (m.carbsG || 0), 0);
    day.totalFatG = day.meals.reduce((sum, m) => sum + (m.fatG || 0), 0);
    days[dayIndex] = day;

    globalState.activeMealPlan = {
      ...globalState.activeMealPlan,
      days
    };
    saveAndNotify();
    showToast(`Replaced ${mealType} on ${day.dayName} with ${newMeal.title}!`, 'success');
  };

  return {
    user: globalState.user,
    activeMealPlan: globalState.activeMealPlan,
    groceryList: globalState.groceryList,
    diaryEntries: globalState.diaryEntries,
    appointments: globalState.appointments,
    aiQueriesUsedToday: globalState.aiQueriesUsedToday,
    activeToast: globalState.activeToast,
    setUserRole,
    updateUserProfile,
    toggleSaveRecipe,
    toggleSaveArticle,
    setActiveMealPlan,
    addFoodDiaryEntry,
    removeFoodDiaryEntry,
    toggleGroceryItem,
    togglePantryItem,
    addGroceryItem,
    bookAppointment,
    cancelAppointment,
    incrementAiQueryCount,
    replaceMealInPlan,
    showToast
  };
}
