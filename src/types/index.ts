export type UserRole = 'guest' | 'free' | 'premium' | 'dietitian' | 'editor' | 'admin';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  role: UserRole;
  dietaryPreferences: string[];
  foodAllergies: string[];
  weeklyBudget?: number;
  householdSize: number;
  cookingSkill?: 'beginner' | 'intermediate' | 'advanced';
  healthGoal?: 'weight_management' | 'balanced' | 'muscle' | 'family';
  ageRange?: string;
  activityLevel?: 'sedentary' | 'light' | 'moderate' | 'active';
  newsletterSubscribed: boolean;
  onboardingCompleted: boolean;
  savedRecipeIds: string[];
  savedArticleIds: string[];
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: 'weight-management' | 'heart-health' | 'digestion' | 'energy' | 'sleep' | 'hydration';
  tags: string[];
  coverImageUrl: string;
  author: {
    name: string;
    credentials: string;
    avatarUrl: string;
    bio: string;
  };
  reviewer?: {
    name: string;
    credentials: string; // e.g., 'RDN, LD'
    avatarUrl: string;
    title: string;
  };
  publishedAt: string;
  lastReviewedAt: string;
  readingTimeMinutes: number;
  references: Array<{
    title: string;
    source: string;
    url?: string;
  }>;
  viewCount: number;
}

export interface RecipeIngredient {
  name: string;
  quantity: number;
  unit: string;
  notes?: string;
  isOptional?: boolean;
  substitution?: string;
}

export interface RecipeStep {
  stepNumber: number;
  instruction: string;
  timerMinutes?: number;
  tip?: string;
}

export interface Recipe {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverImageUrl: string;
  category: 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'meal-prep';
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  caloriesPerServing: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  fiberG: number;
  sodiumMg: number;
  sugarG?: number;
  saturatedFatG?: number;
  dietaryTags: string[];
  allergens: string[];
  storageInstructions: string;
  ingredients: RecipeIngredient[];
  steps: RecipeStep[];
  ratingAvg: number;
  ratingCount: number;
  estimatedCostPerServingUsd?: number;
}

export interface FoodItem {
  id: string;
  usdaFdcId: number;
  name: string;
  slug: string;
  category: string;
  imageUrl: string;
  description: string;
  defaultServingSize: number;
  defaultServingUnit: string;
  calories: number;
  proteinG: number;
  totalCarbsG: number;
  fiberG: number;
  totalSugarsG: number;
  totalFatG: number;
  saturatedFatG: number;
  sodiumMg: number;
  vitaminCMg: number;
  calciumMg: number;
  ironMg: number;
  potassiumMg: number;
  preparationMethods: string;
  storageInstructions: string;
  commonAllergens: string[];
  healthBenefits: string;
  relatedRecipeSlugs?: string[];
}

export interface MealSlot {
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  title: string;
  recipeSlug?: string;
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  prepTimeMinutes: number;
  notes?: string;
  imageUrl?: string;
}

export interface MealPlanDay {
  dayName: string; // 'Monday', 'Tuesday', etc.
  dayIndex: number;
  meals: MealSlot[];
  totalCalories: number;
  totalProteinG: number;
  totalCarbsG: number;
  totalFatG: number;
  totalFiberG: number;
}

export interface MealPlan {
  id: string;
  title: string;
  goal: string;
  dietaryPreferences: string[];
  caloriesTarget: number;
  generatedBy: 'ai' | 'curated' | 'dietitian';
  days: MealPlanDay[];
  weeklyGroceryList: GroceryItem[];
  rationale?: string;
  aiThinkingNotes?: string;
}

export interface GroceryItem {
  id: string;
  name: string;
  quantity: string;
  category: 'produce' | 'dairy' | 'meat' | 'pantry' | 'frozen';
  isChecked: boolean;
  inPantry: boolean;
  estimatedCostUsd?: number;
}

export interface FoodDiaryEntry {
  id: string;
  date: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  foodName: string;
  servingAmount: string;
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  fiberG: number;
  photoUrl?: string;
  aiAnalyzed?: boolean;
}

export interface Dietitian {
  id: string;
  fullName: string;
  credential: string; // 'RD', 'RDN, LD'
  title: string;
  avatarUrl: string;
  bio: string;
  specializations: string[];
  consultationFeeUsd: number;
  consultationDurationMin: number;
  isAcceptingClients: boolean;
  ratingAvg: number;
  ratingCount: number;
  availableDays: string[];
}

export interface Appointment {
  id: string;
  dietitianId: string;
  dietitianName: string;
  date: string;
  timeSlot: string;
  durationMin: number;
  feeUsd: number;
  reason: string;
  status: 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  suggestedLinks?: Array<{ title: string; url: string; type: 'article' | 'recipe' | 'food' }>;
  thinkingSummary?: string;
  isHighThinking?: boolean;
}
