# NutriWise USA — Technical Requirements Document (TRD)
## Full-Stack Architecture, AI Engine & Engineering Specifications

**Document Version:** 2.0 (Updated & Expanded)  
**Date:** October 2026  
**Status:** Implemented & Production-Ready  

---

## 1. System Technology Stack

| Layer | Technology | Version / Specification | Rationale & Purpose |
|---|---|---|---|
| **Runtime & Language** | Node.js + TypeScript | Node 20+, TypeScript 5.8+ | Strict type checking, robust server-side execution, full developer tooling |
| **Frontend Framework** | React 19 | `react: ^19.0.1`, `react-dom: ^19.0.1` | Concurrent rendering, fast virtual DOM reconciliation |
| **Build & Tooling** | Vite | `vite: ^8.3.0`, `@vitejs/plugin-react` | Instant HMR in dev, optimized production roll-up bundles |
| **Styling & Tokens** | Tailwind CSS v4 | `@tailwindcss/vite: ^4.3.3`, `@theme` | Zero runtime overhead utility-first CSS with CSS variables design tokens |
| **Routing** | React Router v7 | `react-router-dom: ^7.x` | Client-side SPA routing with 25+ nested and protected routes |
| **Icons & Motion** | Lucide React + Motion | `lucide-react: ^0.546.0`, `motion: ^12.23.24` | Accessible SVG iconography and fluid micro-interactions |
| **Backend Web Server** | Express | `express: ^4.21.2`, `tsx: ^4.21.0` | Server-side proxy for secure Gemini API calls and Vite middleware mounting |
| **AI Intelligence SDK** | Google GenAI SDK | `@google/genai: ^2.4.0` | Official Google GenAI TypeScript SDK for server-side Gemini integration |
| **Primary AI Models** | `gemini-4-argon` & `gemini-3.8-flash` | Server-side proxy with Thinking Mode | High Thinking deep reasoning (`ThinkingLevel.HIGH`) and high-throughput vision |
| **Nutrition Data** | USDA FoodData Central | Standard Reference & Foundation Datasets | Verified laboratory nutritional data for US foods |
| **State Management** | Custom Reactive Store | Hook-based with `localStorage` cache | Zero boilerplate, instant updates, persistent user data across reloads |

---

## 2. High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                             BROWSER CLIENT (SPA)                            │
│  React 19 + React Router v7 + Tailwind CSS v4 (@theme design tokens)        │
│  - Public Content: Articles, Recipes, Food Database, Diet Plans             │
│  - Interactive AI UIs: Chatbot, Meal Planner, Recipe Gen, Vision Scanners   │
│  - Member Portal: User Dashboard, Food Diary, Grocery Planner, Settings     │
│  - Admin Operations: Content Pipeline, RBAC Users, AI Parameters, Analytics │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                      HTTP REST API (/api/*) JSON Requests
                      (No API keys exposed to browser)
                                       │
┌──────────────────────────────────────▼──────────────────────────────────────┐
│                    EXPRESS BACKEND SERVER (server.ts :3000)                 │
│  - Serves static assets in production / mounts vite.middlewares in dev      │
│  - Request rate limiting and data validation                                │
│  - Securely accesses process.env.GEMINI_API_KEY                             │
│  - Configures user-agent header 'aistudio-build' for telemetry              │
└───────────────┬─────────────────────────────────────────────┬───────────────┘
                │                                             │
      High Thinking Tasks                          Multimodal & Text Tasks
(Meal Plans, Deep Nutrition Q&A)                 (Photo Analysis, Fast Chat)
                │                                             │
┌───────────────▼───────────────┐             ┌───────────────▼───────────────┐
│       gemini-4-argon          │             │       gemini-3.8-flash        │
│ - thinkingConfig:             │             │ - Fast low-latency generation │
│   thinkingLevel:              │             │ - Vision photo meal analysis  │
│   ThinkingLevel.HIGH          │             │ - Nutrition Facts label OCR   │
│ - No maxOutputTokens          │             │ - Fallback resilience         │
└───────────────────────────────┘             └───────────────────────────────┘
```

---

## 3. Server-Side Gemini AI Implementation

### 3.1 SDK Initialization (`server.ts`)
In strict adherence to AI Studio security and integration guidelines, the `@google/genai` client is instantiated exclusively on the server with the mandatory `aistudio-build` User-Agent header:

```typescript
import { GoogleGenAI, ThinkingLevel, Type } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});
```

### 3.2 High Thinking Mode Configuration
For complex nutritional reasoning, meal plan synthesis, and recipe creation, `server.ts` activates `gemini-4-argon` configured with `ThinkingLevel.HIGH`. In strict compliance with SDK rules, `maxOutputTokens` is omitted to avoid truncating reasoning tokens:

```typescript
async function callGeminiText({
  prompt,
  systemInstruction,
  isHighThinking = false,
  responseSchema,
  responseMimeType,
}: {
  prompt: string;
  systemInstruction?: string;
  isHighThinking?: boolean;
  responseSchema?: any;
  responseMimeType?: string;
}): Promise<string> {
  const modelToUse = isHighThinking ? 'gemini-4-argon' : 'gemini-3.8-flash';

  const config: any = {
    systemInstruction,
  };

  if (responseMimeType) config.responseMimeType = responseMimeType;
  if (responseSchema) config.responseSchema = responseSchema;

  if (isHighThinking) {
    config.thinkingConfig = {
      thinkingLevel: ThinkingLevel.HIGH,
    };
  }

  try {
    const response = await ai.models.generateContent({
      model: modelToUse,
      contents: prompt,
      config,
    });
    return response.text || '';
  } catch (error) {
    // Seamless fallback to gemini-3.8-flash for uninterrupted availability
    const fallbackResponse = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: { systemInstruction, responseMimeType, responseSchema }
    });
    return fallbackResponse.text || '';
  }
}
```

---

## 4. Backend API Endpoints & Request/Response Contracts

### 4.1 AI Chatbot
- **Endpoint:** `POST /api/ai/chat`
- **Request Body:**
  ```json
  {
    "message": "Give me a high-fiber breakfast under $5",
    "conversation": [
      { "sender": "user", "content": "..." },
      { "sender": "assistant", "content": "..." }
    ],
    "isHighThinking": true,
    "userProfile": {
      "healthGoal": "balanced",
      "dietaryPreferences": ["Mediterranean"],
      "foodAllergies": []
    }
  }
  ```
- **Response Body:**
  ```json
  {
    "reply": "Here are 3 evidence-based breakfast ideas packed with 10g+ prebiotic fiber...",
    "isHighThinking": true,
    "disclaimer": "NutriWise AI provides general nutritional and wellness education only."
  }
  ```

### 4.2 7-Day Meal Plan Generator
- **Endpoint:** `POST /api/ai/meal-plan`
- **Request Body:**
  ```json
  {
    "goal": "weight_management",
    "ageRange": "26-35",
    "activityLevel": "moderate",
    "dietaryPreferences": ["High-Protein", "Gluten-Free"],
    "foodAllergies": ["Peanuts"],
    "weeklyBudget": 120,
    "cookingTime": "30 min",
    "cookingSkill": "intermediate",
    "householdSize": 2,
    "isHighThinking": true
  }
  ```
- **Response Body:** Structured JSON containing `title`, `goal`, `rationale`, `caloriesTarget`, array of 7 `days` (each with `breakfast`, `lunch`, `dinner`, `snack`), and `weeklyGroceryList` grouped by store department.

### 4.3 Smart Recipe Generator
- **Endpoint:** `POST /api/ai/recipe-gen`
- **Request Body:**
  ```json
  {
    "ingredients": ["Eggs", "Spinach", "Avocado", "Olive Oil"],
    "dietaryTags": ["High-Protein", "Vegetarian"],
    "maxTimeMinutes": 20,
    "isHighThinking": true
  }
  ```
- **Response Body:** Structured recipe containing `title`, `description`, `servings`, `prepTimeMinutes`, `cookTimeMinutes`, `caloriesPerServing`, macros (`proteinG`, `carbsG`, `fatG`, `fiberG`), `ingredients` with units, and numbered `steps`.

### 4.4 Food Photo Meal Analyzer
- **Endpoint:** `POST /api/ai/analyze-food`
- **Request Body:**
  ```json
  {
    "description": "Pan-seared salmon with sweet potatoes",
    "imageBase64": "data:image/jpeg;base64,..."
  }
  ```
- **Response Body:**
  ```json
  {
    "mealName": "Herb-Roasted Salmon with Sweet Potatoes",
    "identifiedItems": [
      { "item": "Wild Salmon", "estimatedPortion": "5 oz", "calories": 280 },
      { "item": "Roasted Sweet Potato", "estimatedPortion": "1 cup", "calories": 160 }
    ],
    "averageCalories": 490,
    "estimatedCaloriesMin": 440,
    "estimatedCaloriesMax": 540,
    "proteinG": 38,
    "carbsG": 36,
    "fatG": 18,
    "fiberG": 6,
    "healthierPrepSuggestions": ["Add a squeeze of fresh lemon to boost iron absorption."]
  }
  ```

### 4.5 Nutrition Facts Label Scanner
- **Endpoint:** `POST /api/ai/scan-label`
- **Request Body:** `{ "productDescription": "...", "imageBase64": "..." }`
- **Response Body:** `{ "productName": "...", "servingSize": "...", "calories": 220, "addedSugarG": 12, "sodiumMg": 140, "summary": "...", "redFlags": [...], "healthierAlternatives": [...] }`

### 4.6 Weekly Progress Coach
- **Endpoint:** `POST /api/ai/progress-coach`
- **Request Body:** `{ "streakDays": 5, "loggedMealsCount": 14, "avgProtein": 95, "avgFiber": 36, "goal": "balanced" }`
- **Response Body:** `{ "coachMessage": "...", "consistencyGrade": "A", "highlight": "...", "microHabitRecommendation": "..." }`

---

## 5. Frontend Architecture & Directory Layout

```
/
├── server.ts                       # Express backend server with Gemini AI endpoints
├── package.json                    # Full-stack dependencies & scripts
├── vite.config.ts                  # Vite config with path aliases
├── tsconfig.json                   # Strict TypeScript compiler options
├── index.html                      # Entry HTML with Google Fonts & SEO meta tags
├── metadata.json                   # Applet metadata with server-side AI capability
├── public/                         # Static assets and icons
└── src/
    ├── main.tsx                    # React 19 application entry point
    ├── index.css                   # Tailwind v4 directives & @theme design tokens
    ├── App.tsx                     # React Router definition (25+ routes)
    ├── types/
    │   └── index.ts                # TypeScript data interfaces (PRD & Schema mapped)
    ├── data/
    │   ├── mockArticles.ts         # Peer-reviewed articles with citations
    │   ├── mockRecipes.ts          # Tested recipes with FDA nutrition facts
    │   ├── mockFoods.ts            # USDA FoodData Central verified items
    │   ├── mockDietPlans.ts        # 7-day curated meal plans
    │   └── mockDietitians.ts       # Board certified Registered Dietitians
    ├── store/
    │   └── useStore.ts             # Global reactive state store with localStorage sync
    ├── lib/
    │   └── api.ts                  # Client-side API client calling server endpoints
    ├── components/
    │   ├── ui/                     # Button, Badge, Card, Input, Modal, Toast
    │   ├── shared/                 # NutritionFacts, MacroBadges, ServingCalculator,
    │   │                           # RecipeCard, ArticleCard, FoodCard, DietitianCard,
    │   │                           # WeeklyCalendar
    │   ├── layout/                 # Header, Footer, PageWrapper, DashboardLayout
    │   └── admin/                  # AdminLayout
    └── pages/
        ├── public/                 # Home, Articles, Recipes, Foods, DietPlans,
        │                           # DietitianServices, Booking, Search, Pricing,
        │                           # About, Contact, FAQ, Legal, NotFound
        ├── ai/                     # AIToolsHub, Chatbot, MealPlanGen, RecipeGen,
        │                           # GroceryPlanner, PhotoAnalyzer, LabelScanner
        ├── dashboard/              # UserDashboard, FoodDiary, Progress, Saved,
        │                           # Appointments, DashboardSettings
        ├── auth/                   # LoginPage, SignUpPage, ForgotPasswordPage
        └── admin/                  # AdminDashboard, AdminArticles, AdminRecipes,
                                    # AdminFoods, AdminUsers, AdminAISettings, AdminAnalytics
```

---

## 6. Design System Tokens & Styling Standards

The project utilizes Tailwind CSS v4 with design variables defined directly in `src/index.css`:

```css
@theme {
  --font-serif: "DM Serif Display", Georgia, serif;
  --font-sans: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  --color-primary: #2D6A4F;
  --color-primary-hover: #245840;
  --color-primary-light: #52B788;
  --color-accent: #F77F00;
  --color-surface: #FAFAF7;
  --color-surface-alt: #F0F4EF;
  --color-text-primary: #1A2E1A;
  --color-text-secondary: #4A6741;
  --color-text-muted: #8FAE8A;
  --color-border: #D4E4D0;
  --color-error: #D62828;

  --color-macro-cal: #F77F00;
  --color-macro-protein: #3A86FF;
  --color-macro-carbs: #FFBE0B;
  --color-macro-fat: #FF6B6B;
  --color-macro-fiber: #2D6A4F;
  --color-macro-sodium: #7B5EA7;
}
```

---

## 7. Performance & Quality Benchmarks

1. **Build Compilation:** `npm run build` runs `vite build` cleanly with zero TypeScript errors.
2. **Type Safety:** Strict TypeScript mode with `tsc --noEmit` passing all validation checks.
3. **Responsive Breakpoints:** Fully validated across mobile (375px), tablet (768px), and desktop (1280px+).
4. **Resilient AI Calling:** Graceful offline/fallback mechanisms in `src/lib/api.ts` ensure the UI remains fully responsive even during network interruptions.

---

*Document approved for NutriWise USA Platform v2.0.*
