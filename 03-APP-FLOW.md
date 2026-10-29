# App Flow — User & Admin Experience
## NutriWise USA — Health & Nutrition Platform

**Document Identifier:** NW-FLOW-003  
**Version:** 2.0 (End-to-End Experience & State Machine Edition)  
**Date:** October 2026  
**Status:** Approved for Development & Implementation  
**Audience:** Product Managers, UX Designers, Frontend & Full-Stack Engineers

---

## 1. Global User Journey & Architecture Map

NutriWise USA guides users through a seamless, progressive engagement lifecycle: from anonymous discovery to personalized AI guidance, premium lifestyle management, and professional healthcare consultation:

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│  PUBLIC GUEST   │ ────► │   FREE MEMBER   │ ────► │ PREMIUM MEMBER  │ ────► │ CLINICAL CLIENT │
│ Discovery & SEO │       │ AI Plan & Saves │       │ Vision & Diary  │       │ RD Telehealth   │
└─────────────────┘       └─────────────────┘       └─────────────────┘       └─────────────────┘
         │                         │                         │                         │
         ▼                         ▼                         ▼                         ▼
  - Evidence Blog           - 1 Plan / Month          - Unlimited AI            - 1-on-1 Consults
  - USDA Database           - 5 AI Chats/day          - Grocery Planner         - Intake Review
  - Tested Recipes          - Recipe Bookmarks        - Food Diary Log          - RD Meal Plans
  - 2 AI Teasers            - Basic Dashboard         - Photo & Label Vision    - Direct Chat
```

---

## 2. Authentication & Session Lifecycles

### 2.1 Sign Up & Onboarding Flow
```
[User clicks "Sign Up" or "Get Started"]
                  │
                  ▼
         /signup Page Form
    ├── Full Name (text, required)
    ├── Email Address (RFC 5322 validation)
    ├── Password (>= 8 chars, 1 number, 1 special symbol)
    ├── "Agree to Terms & Privacy Policy" checkbox
    └── "Continue with Google" OAuth Button (PKCE Flow)
                  │
        ┌─────────┴─────────┐
        │                   │
  [Email / Password]   [Google OAuth]
        │                   │
        ▼                   ▼
  Supabase Auth      Google Consent Screen
        │                   │
  Verification      Returns OAuth Token
  Email Sent                │
        │                   ▼
  User clicks link   Profiles table auto-created via trigger
        │                   │
        └─────────┬─────────┘
                  │
                  ▼
  Auto-Login & JWT Session Initialized
                  │
                  ▼
  [First-Time Check: onboarding_completed == false?]
        ├── YES ──► Launch 4-Step Dietary Questionnaire Modal
        └── NO  ──► Redirect to /dashboard with Welcome Toast
```

### 2.2 Login & Session Recovery
```
               /login Page
    ├── Email & Password Input
    ├── "Remember Me on this device" (Stores refresh token in secure cookie)
    ├── "Continue with Google"
    └── "Forgot Password?" Link
                  │
        ┌─────────┴─────────┐
        │                   │
  [Authentication Success]  [Authentication Failure]
        │                   │
        ▼                   ▼
  Fetch User Profile        Display inline error: "Invalid email or password"
  & Role Permissions        Offer "Forgot Password" after 2 failures
        │
        ▼
  Redirect Target:
    ├── If returnUrl query parameter present ──► returnUrl
    └── Default ──► /dashboard
```

---

## 3. Public & Guest User Experience

Guests enjoy high-speed, frictionless access to all evidence-based content, establishing trust before prompting registration.

```
                                  GUEST FLOW
                                       │
     ┌──────────────────┬──────────────┴─────┬──────────────────┐
     │                  │                    │                  │
     ▼                  ▼                    ▼                  ▼
/ (Home Page)      /articles            /recipes            /foods
├── Hero Headline  ├── Category filter  ├── Dietary tags   ├── USDA Search
├── Trending Foods ├── Author/Reviewer  ├── Servings scaler ├── 100g vs Portions
└── AI Plan CTA    └── PubMed citations └── FDA Facts Label └── Macro Badges
     │                  │                    │                  │
     └──────────────────┼────────────────────┼──────────────────┘
                        │
                        ▼
             [Guest Action Trigger]
     ├── "Save Recipe / Article" ──────► Modal: "Sign up to save favorites"
     ├── "Add to Food Diary" ──────────► Modal: "Create free account to track"
     ├── "Ask AI Chatbot (> 2 msgs)" ──► Teaser Lockout: "Sign up for 5 daily chats"
     └── "Generate Custom Meal Plan" ──► Multi-step Questionnaire → Sign Up to save
```

---

## 4. Free Member Experience & Dashboard Journey

Upon registration, Free Members unlock persistent personalization, recipe collections, and trial access to AI capabilities.

```
                           /dashboard (User Dashboard)
                                       │
  ┌─────────────────┬──────────────────┼─────────────────┬──────────────────┐
  │                 │                  │                 │                  │
  ▼                 ▼                  ▼                 ▼                  ▼
Welcome Banner   Daily Meal Schedule  Quick Statistics  Saved Items Hub    Upgrade Banner
- User Name      - Today's Breakfast  - Active streak   - Saved Recipes    - "Unlock Vision
- Health Goal    - Today's Lunch      - Saved recipes   - Saved Articles     Scanner & Food
- Avatar         - Today's Dinner     - Saved plans     - Direct links       Diary ($9.99/mo)"
```

### 4.1 AI Meal Plan Generation Workflow (Free: 1/mo | Premium: Unlimited)

```
[User clicks "Create New Meal Plan" on /ai/meal-plan-generator]
                           │
                           ▼
            STEP 1: Core Health Objective
    (Weight Management | Balanced Vitality | High Protein | Heart Health | Family)
                           │
                           ▼
            STEP 2: Dietary Restrictions & Allergens
    (Omnivore | Pescatarian | Vegetarian | Vegan | Gluten-Free | Nut Allergies)
                           │
                           ▼
            STEP 3: Household Budget & Prep Constraints
    (Budget: $35–$250/wk | Weekday Prep Time: 15m, 30m, 45m, 60m+)
                           │
                           ▼
            STEP 4: Household Size & Food Preferences
    (Servings: 1 to 6 people | Disliked ingredients blacklist)
                           │
                           ▼
[Backend Reasoning Execution: server.ts → Gemini-4-Argon (ThinkingLevel.HIGH)]
    - Validates caloric envelope (e.g., 2,100 kcal target)
    - Allocates macro distributions (30% Protein, 45% Carb, 25% Fat)
    - Cross-utilizes bulk pantry ingredients across 7 days
    - Formats strict structured JSON
                           │
                           ▼
            7-Day Interactive Calendar Output Display
    ├── Day Selector Tabs (Monday through Sunday)
    ├── Meal Slots (Breakfast, Lunch, Dinner, Snack)
    ├── Per-Meal Macro Badges (Calories, Protein, Carbs, Fat)
    ├── "Smart Meal Swap" Button per slot (1-click AI alternative)
    ├── Daily Nutritional Totals progress bar
    └── "Save & Add Ingredients to Grocery List" CTA
```

---

## 5. Premium Member Experience & Vision Intelligence Suite

### 5.1 Stripe Upgrade & Payment Flow
```
[User clicks "Upgrade to Premium" anywhere in the app]
                           │
                           ▼
                 /subscription-plans
    ├── Free vs Premium Feature Comparison Grid
    ├── Billing Frequency Toggle:
    │     ├── Monthly: $9.99 / month
    │     └── Annual: $79.99 / year (Save 33% — Best Value)
    └── "Upgrade to Premium" CTA
                           │
                           ▼
Stripe Checkout Hosted Session (TLS Encrypted)
    ├── Credit Card / Apple Pay / Google Pay
    └── Stripe 3D Secure Authentication
                           │
                 ┌─────────┴─────────┐
                 │                   │
         [Payment Succeeded]   [Payment Cancelled]
                 │                   │
                 ▼                   ▼
     Stripe Webhook Dispatched  Return to /subscription-plans
                 │              with no account alteration
                 ▼
     Supabase Edge Function:
     - Sets profiles.role = 'premium'
     - Creates subscriptions record
                 │
                 ▼
     Redirect to /dashboard with Celebration Confetti Toast:
     "Welcome to Premium! All vision tools, grocery planner & food diary unlocked."
```

### 5.2 Dynamic Smart Grocery Planner
```
                  /ai/grocery-planner
                           │
       ┌───────────────────┴───────────────────┐
       │                                       │
[Auto-Populated from Active Plan]      [Manual Custom Additions]
       │                                       │
       └───────────────────┬───────────────────┘
                           │
                           ▼
           Aisle-Categorized Interactive List
    ├── Produce (Fresh vegetables, fruits, herbs)
    ├── Meat & Seafood (Poultry, wild fish, eggs)
    ├── Dairy & Refrigerated (Greek yogurt, milks, cheeses)
    ├── Pantry & Dry Goods (Quinoa, oats, oils, spices)
    └── Frozen Essentials (Berries, edamame)
                           │
    ├── Checkbox: Mark as purchased
    ├── "In Pantry" Toggle: Deducts item from active shopping cart
    ├── "Budget Swap" Recommendation: AI suggests cost-effective alternatives
    └── Print / Export PDF formatted for in-store shopping
```

### 5.3 AI Food Photo Analyzer Flow
```
                  /ai/photo-analyzer
                           │
                           ▼
    [Upload Meal Photo via Camera Capture or File Upload]
                           │
                           ▼
    Client-side Compression (WebP, max 1600px, < 1.5MB)
                           │
                           ▼
    POST /api/ai/analyze-food (Multimodal Gemini Vision)
                           │
                           ▼
                    Results Display
    ├── Photo Preview with detected food callouts
    ├── Estimated Nutritional Range (e.g. 480–540 kcal)
    ├── Macro Breakdown: 38g Protein, 46g Carbs, 16g Fat
    ├── Culinary Prep Insight: "Rich in polyphenols and monounsaturated fats"
    ├── Interactive Edit Mode: Tap any food to adjust grams or serving sizes
    └── "Log to Food Diary" ──► Commits record to food_diary_entries
```

### 5.4 AI Nutrition Facts Label Scanner Flow
```
                   /ai/label-scanner
                           │
                           ▼
    [Photograph or Upload Nutrition Facts Label on Package]
                           │
                           ▼
    POST /api/ai/scan-label (OCR & Analytical Parsing)
                           │
                           ▼
                    Results Display
    ├── Structured FDA Label Breakdown:
    │     ├── Calories, Saturated Fat, Sodium, Added Sugars, Protein
    ├── Plain-English Ingredient Translation:
    │     ├── Explains preservatives, food dyes, and sugar alcohols
    ├── Health Flag Alerts:
    │     ├── Warning: High Sodium (> 650mg / 28% DV)
    │     └── Alert: Contains Hidden Allergen (Soy Lecithin)
    └── "Healthier Shelf Alternatives" AI Recommendation
```

---

## 6. Registered Dietitian Telehealth Experience

```
               /nutritionist-services (Directory)
                           │
    ├── Filter by: Specialty (Gut Health, Sports, Cardiometabolic, Plant-Based)
    ├── Filter by: State Licensure & Availability
    └── Dietitian Cards with verified RD credential badges
                           │
                           ▼
        /nutritionist-services/:id (Provider Profile)
    ├── Full clinical bio, academic degrees (MS, RDN, LD, CDCES)
    ├── Consultation Packages:
    │     ├── Initial 60-Min Comprehensive Clinical Assessment ($150)
    │     └── 30-Min Follow-up & Plan Calibration ($80)
    ├── Verified client reviews & star ratings
    └── "Book Consultation" Button
                           │
                           ▼
                 /nutritionist-services/:id/book
    ├── Step 1: Select Date & Available Time Slot (Timezone Auto-Synced)
    ├── Step 2: Clinical Intake Questionnaire (Health concerns, medical notes)
    ├── Step 3: Secure Stripe Consultation Payment
    └── Step 4: Instant Confirmation & Google Calendar / iCal invite dispatched
```

---

## 7. Super Admin & Content Management Experience

Access to `/admin` routes requires `role === 'admin'` or `role === 'editor'`, enforced via server-side session checks and frontend layout guards.

```
                             /admin (Admin Dashboard)
                                        │
  ┌──────────────────┬──────────────────┼──────────────────┬──────────────────┐
  │                  │                  │                  │                  │
  ▼                  ▼                  ▼                  ▼                  ▼
/admin/articles    /admin/recipes     /admin/foods       /admin/users       /admin/ai-settings
- Article CMS      - Recipe Builder   - USDA FDC Sync    - User Accounts    - Model Selection
- Markdown Editor  - Nutrition Entry  - Serving Editor   - Role Elevation   - Prompt Templates
- Reviewer Assign  - Image Upload     - Category Tags    - Account Bans     - Quota Adjustments
- Publish/Archive  - Step-by-Step     - Verified Badges  - Revenue Metrics  - AI Quality Logs
```

---

## 8. Complete Application Navigation & Route Matrix

| Route Path | Access Level | Primary Component | Layout Shell | Core Purpose |
|---|---|---|---|---|
| `/` | Public | `HomePage` | Public Header/Footer | Value proposition, trending foods, AI teaser |
| `/articles` | Public | `ArticlesPage` | Public Header/Footer | Evidence-based article directory with filters |
| `/articles/:slug` | Public | `ArticleDetailPage` | Public Header/Footer | Full clinical article with citations & reviewer |
| `/recipes` | Public | `RecipesPage` | Public Header/Footer | Recipe directory with time & macro filters |
| `/recipes/:slug` | Public | `RecipeDetailPage` | Public Header/Footer | Recipe steps, ingredients, FDA facts label |
| `/foods` | Public | `FoodsPage` | Public Header/Footer | USDA FoodData Central searchable database |
| `/foods/:slug` | Public | `FoodDetailPage` | Public Header/Footer | Food nutrient profile & preparation guides |
| `/diet-plans` | Public | `DietPlansPage` | Public Header/Footer | Curated 7-day diet plan catalog |
| `/diet-plans/:slug` | Public | `DietPlanDetailPage`| Public Header/Footer | 7-day calendar view & linked recipes |
| `/nutritionist-services` | Public | `DietitianServicesPage` | Public Header/Footer | Registered Dietitian directory |
| `/nutritionist-services/:id` | Public | `DietitianProfilePage` | Public Header/Footer | Provider bio, credentials, pricing, reviews |
| `/nutritionist-services/:id/book` | Public | `BookingPage` | Public Header/Footer | Consultation scheduling & payment |
| `/search` | Public | `SearchPage` | Public Header/Footer | Unified multi-domain instant search |
| `/subscription-plans` | Public | `SubscriptionPlansPage` | Public Header/Footer | Free vs Premium pricing table |
| `/about` | Public | `AboutPage` | Public Header/Footer | Editorial standards & advisory team |
| `/contact` | Public | `ContactPage` | Public Header/Footer | Customer & clinical support inquiry |
| `/faq` | Public | `FAQPage` | Public Header/Footer | Interactive question & answer accordion |
| `/medical-disclaimer` | Public | `MedicalDisclaimerPage` | Public Header/Footer | Legally reviewed health disclosure |
| `/privacy-policy` | Public | `PrivacyPolicyPage` | Public Header/Footer | CCPA/CPRA privacy compliance |
| `/terms-of-service` | Public | `TermsPage` | Public Header/Footer | Terms of platform service |
| `/login` | Public (Unauth) | `LoginPage` | Auth Wrapper | User authentication |
| `/signup` | Public (Unauth) | `SignUpPage` | Auth Wrapper | Registration & onboarding hook |
| `/forgot-password` | Public (Unauth) | `ForgotPasswordPage`| Auth Wrapper | Password recovery |
| `/ai-tools` | Public | `AIToolsHubPage` | Public Header/Footer | Overview of all 7 AI tools |
| `/ai/chatbot` | Public/Member | `ChatbotPage` | Public Header/Footer | Conversational AI nutrition assistant |
| `/ai/meal-plan-generator` | Member | `MealPlanGeneratorPage` | Public Header/Footer | Multi-step AI plan questionnaire |
| `/ai/recipe-generator` | Member | `RecipeGeneratorPage` | Public Header/Footer | Pantry-to-recipe generator |
| `/ai/grocery-planner` | Premium | `GroceryPlannerPage` | Public Header/Footer | Aisle-sorted shopping list |
| `/ai/photo-analyzer` | Premium | `PhotoAnalyzerPage` | Public Header/Footer | Computer vision plate analyzer |
| `/ai/label-scanner` | Premium | `LabelScannerPage` | Public Header/Footer | FDA label OCR scanner |
| `/dashboard` | Member | `UserDashboard` | Dashboard Layout | Active plan, daily meals, quick metrics |
| `/dashboard/diary` | Premium | `FoodDiaryPage` | Dashboard Layout | Daily food logging & macro progress |
| `/dashboard/progress` | Premium | `ProgressPage` | Dashboard Layout | AI progress coach & longitudinal trends |
| `/dashboard/saved` | Member | `SavedContentPage` | Dashboard Layout | Saved recipes, articles, and plans |
| `/dashboard/appointments` | Member | `AppointmentsPage` | Dashboard Layout | Telehealth bookings & reminders |
| `/dashboard/settings` | Member | `DashboardSettingsPage`| Dashboard Layout | Profile, dietary rules, subscription |
| `/admin` | Admin | `AdminDashboard` | Admin Layout | Operational metrics, signups, revenue |
| `/admin/articles` | Admin/Editor | `AdminArticles` | Admin Layout | Article CMS & publication workflow |
| `/admin/recipes` | Admin/Editor | `AdminRecipes` | Admin Layout | Recipe authoring & nutrition editor |
| `/admin/foods` | Admin | `AdminFoods` | Admin Layout | USDA food catalog manager |
| `/admin/users` | Admin | `AdminUsers` | Admin Layout | User role management & audit |
| `/admin/ai-settings` | Admin | `AdminAISettings` | Admin Layout | System prompts & LLM parameters |
| `/admin/analytics` | Admin | `AdminAnalytics` | Admin Layout | AI usage, revenue, and traffic analytics |

---

*Document Author: NutriWise USA UX Architecture Group*  
*Classification: Confidential — Approved for Engineering Build*
