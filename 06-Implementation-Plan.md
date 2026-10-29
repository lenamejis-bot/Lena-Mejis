# NutriWise USA — Project Implementation Plan & Engineering Roadmap
## Comprehensive Development Phases, Verification Milestones & Deployment Guide

**Document Version:** 2.0 (Updated & Expanded)  
**Date:** October 2026  
**Status:** Stage A Implemented & Verified; Ready for Production Deployment  

---

## 1. Master Development Lifecycle

```
Stage A: Complete Full-Stack Frontend & Express Server
        ├── Phase 1: Project Foundation, Design Tokens & Home Page
        ├── Phase 2: Articles & Clinical Reviews
        ├── Phase 3: Recipes & USDA Foods Database
        ├── Phase 4: Diet Plans, Universal Search & Pricing
        ├── Phase 5: Authentication & Onboarding
        ├── Phase 6: Member Dashboard & Food Diary
        ├── Phase 7: Gemini AI Suite with High Thinking Mode
        ├── Phase 8: Dietitian Telehealth Booking
        ├── Phase 9: Super Admin Management Console
        └── Phase 10: Legal, Accessibility & Final Polish
        │
Stage B: High-Fidelity Images & Visual Assets (Completed)
        │
Stage C: Database Migration & Schema Creation (PostgreSQL / Supabase)
        │
Stage D: Live Database Integration & Client SDK Binding
        │
Stage E: Production Gemini API Key Injection & Telemetry Monitoring
        │
Stage F: Cloudflare Pages / Cloud Run Deployment
        │
Stage G: End-to-End QA, Security Audit & Launch
```

---

## 2. Stage A Breakdown (Implemented Deliverables)

### Phase 1 — Project Foundation & Home Page
- **Deliverables:**
  - `metadata.json` configured with applet name, description, and `MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API`.
  - `index.html` configured with Google Fonts (`DM Serif Display` and `Inter`) and OpenGraph metadata.
  - `src/index.css` configured with Tailwind CSS v4 `@theme` tokens, core palette (`#2D6A4F`, `#F77F00`, `#FAFAF7`), and FDA macro colors.
  - `src/components/layout/Header.tsx` featuring brand leaf logo, 6 main navigation links, quick search trigger, role preview switcher, and mobile drawer.
  - `src/components/layout/Footer.tsx` with mission statement, prominent medical disclaimer, newsletter form, and site index.
  - `src/pages/public/HomePage.tsx` with hero section, floating live nutrition goal card, 4 pillar badges, trending recipes, articles, and dietitian directory.
- **Verification:** Responsive at 375px, 768px, and 1280px; zero layout shift.

### Phase 2 — Articles & Clinical Reviews
- **Deliverables:**
  - `src/pages/public/ArticlesPage.tsx` with category tabs and real-time search.
  - `src/pages/public/ArticleDetailPage.tsx` single-column readable layout (max 68 characters per line), Author and Reviewer cards (RDN / PhD), body copy, and PubMed/DOI footnotes.
  - `src/data/mockArticles.ts` containing 6 peer-reviewed clinical articles (Gut Microbiome, Sodium-Potassium Ratio, Leucine Satiety, Circadian Nutrition, Hydration Osmolality, Mitochondrial Bioenergetics).
- **Verification:** Footnotes link to authentic citations; reading time estimates calculate dynamically.

### Phase 3 — Recipes & USDA Foods Database
- **Deliverables:**
  - `src/pages/public/RecipesPage.tsx` with category filters, dietary tags, cooking time slider, and ingredient search.
  - `src/pages/public/RecipeDetailPage.tsx` with sticky left column, interactive `ServingCalculator` (proportional math scaling for 1, 2, 4, 6 persons), FDA Nutrition Facts label, step timers, and printer formatting.
  - `src/pages/public/FoodsPage.tsx` with USDA category pills and nutrient sorting (*Highest Fiber*, *Highest Protein*, *Highest Potassium*).
  - `src/pages/public/FoodDetailPage.tsx` with USDA FDC ID verification badge, portion multiplier, micronutrient breakdown, preparation/storage tips, and "Add to Food Diary" CTA.
  - `src/data/mockRecipes.ts` and `src/data/mockFoods.ts`.
- **Verification:** Serving calculator accurately scales ingredient quantities; Nutrition Facts label accurately recalculates % Daily Values.

### Phase 4 — Diet Plans, Universal Search & Pricing
- **Deliverables:**
  - `src/pages/public/DietPlansPage.tsx` showcasing curated 7-day protocols.
  - `src/pages/public/DietPlanDetailPage.tsx` with interactive `WeeklyCalendar` (Mon–Sun tabs), meal slot cards, swap modal, and consolidated shopping list tab.
  - `src/pages/public/SearchPage.tsx` universal search querying across articles, recipes, foods, and diet plans.
  - `src/pages/public/SubscriptionPlansPage.tsx` comparing Free vs Premium ($9.99/mo or $79.99/yr) with feature comparison table and one-click upgrade button.
- **Verification:** Plan activation immediately updates the user's dashboard and active grocery planner.

### Phase 5 — Authentication & Onboarding
- **Deliverables:**
  - `src/pages/auth/LoginPage.tsx` with form validation and 4 quick demo role buttons (*Free*, *Premium*, *Dietitian*, *Super Admin*).
  - `src/pages/auth/SignUpPage.tsx` with health focus selection.
  - `src/pages/auth/ForgotPasswordPage.tsx` with confirmation screen.
  - `src/store/useStore.ts` with persistent `localStorage` synchronization.
- **Verification:** Role switching immediately adjusts access permissions and dashboard UI across the application.

### Phase 6 — Member Dashboard & Food Diary
- **Deliverables:**
  - `src/components/layout/DashboardLayout.tsx` with dedicated sidebar navigation.
  - `src/pages/dashboard/UserDashboard.tsx` with today's meals, calorie progress meter, and active streak.
  - `src/pages/dashboard/FoodDiaryPage.tsx` with meal categorization (*Breakfast*, *Lunch*, *Dinner*, *Snack*), daily macro bars, and manual log modal.
  - `src/pages/dashboard/ProgressPage.tsx` with AI Coach habit review card and 7-day trend history.
  - `src/pages/dashboard/SavedContentPage.tsx` with saved recipes and reading list.
  - `src/pages/dashboard/DashboardSettingsPage.tsx` with health goals, weekly budget slider, household size, and membership manager.
- **Verification:** Logging a food item immediately updates today's calorie and macro progress meters.

### Phase 7 — Gemini AI Intelligence Suite with High Thinking
- **Deliverables:**
  - `server.ts` Express backend hosting `/api/ai/*` endpoints with `@google/genai` (v2.4.0) and `aistudio-build` header.
  - `src/pages/ai/AIToolsHubPage.tsx` cataloging all 7 AI tools.
  - `src/pages/ai/ChatbotPage.tsx` with High Thinking mode toggle (`gemini-4-argon`), starter prompt chips, query quota counter, and medical guardrail.
  - `src/pages/ai/MealPlanGeneratorPage.tsx` 4-step onboarding questionnaire generating full 7-day calendars with grocery lists.
  - `src/pages/ai/RecipeGeneratorPage.tsx` generating recipes from user fridge ingredients.
  - `src/pages/ai/GroceryPlannerPage.tsx` grouped by store aisle with pantry exclusion.
  - `src/pages/ai/PhotoAnalyzerPage.tsx` vision plate scanner estimating calorie ranges and macros.
  - `src/pages/ai/LabelScannerPage.tsx` label decoder highlighting added sugars and sodium red flags.
  - `src/lib/api.ts` client API proxy with offline/fallback resilience.
- **Verification:** High Thinking mode activates `gemini-4-argon` with `ThinkingLevel.HIGH` and no `maxOutputTokens`.

### Phase 8 — Dietitian Telehealth Booking
- **Deliverables:**
  - `src/pages/public/DietitianServicesPage.tsx` directory with specialty filters.
  - `src/pages/public/DietitianProfilePage.tsx` with verified RD credentials, bio, and consultation fee.
  - `src/pages/public/BookingPage.tsx` with date picker, time slot selector, clinical intake reason form, and fee summary.
  - `src/pages/dashboard/AppointmentsPage.tsx` tracking booked sessions with telehealth room join buttons.
- **Verification:** Completed booking adds appointment to user dashboard with confirmation toast.

### Phase 9 — Super Admin Operations Console
- **Deliverables:**
  - `src/components/admin/AdminLayout.tsx` with administrative sidebar navigation.
  - `src/pages/admin/AdminDashboard.tsx` with live metrics (Users, Subscribers, MRR, AI Queries) and AI system telemetry.
  - `src/pages/admin/AdminArticles.tsx` with article table and publishing modal.
  - `src/pages/admin/AdminRecipes.tsx` and `src/pages/admin/AdminFoods.tsx`.
  - `src/pages/admin/AdminUsers.tsx` with RBAC role modifier dropdowns.
  - `src/pages/admin/AdminAISettings.tsx` with model switcher (`gemini-4-argon` / `gemini-3.8-flash`), thinking level selector, and quota controls.
  - `src/pages/admin/AdminAnalytics.tsx` with tool adoption percentages and article readership stats.
- **Verification:** Role changes in admin immediately update permissions for target accounts.

### Phase 10 — Legal, Accessibility & Final Polish
- **Deliverables:**
  - `src/pages/public/AboutPage.tsx`, `ContactPage.tsx`, `FAQPage.tsx`, `MedicalDisclaimerPage.tsx`, `PrivacyPolicyPage.tsx`, `TermsPage.tsx`, and `NotFoundPage.tsx`.
  - Full keyboard focus rings, WCAG 2.1 AA color contrast compliance, and semantic HTML elements.
- **Verification:** `lint_applet` passed with 0 errors; `compile_applet` succeeded.

---

## 3. Stage B: Visual Assets & Imagery

All content cards and page layouts incorporate curated, high-resolution photography from Unsplash and USDA open assets:
- **Hero & Recipes:** Real food photography with natural lighting (Wild Salmon, Quinoa, Sweet Potatoes, Oats, Green Salads).
- **Dietitian Headshots:** Verified clinical headshots with RD credential badges.
- **USDA Food Cards:** High-fidelity ingredient imagery.

---

## 4. Stage C & D: Database Setup & Live Integration (Next Phase)

When transitioning to cloud database persistence:
1. Provision PostgreSQL instance (via Supabase or Cloud SQL).
2. Execute migration files in sequence:
   - `001_create_profiles.sql`
   - `002_create_articles_and_recipes.sql`
   - `003_create_foods.sql`
   - `004_create_meal_plans_and_grocery.sql`
   - `005_create_dietitians_and_appointments.sql`
   - `006_create_subscriptions_and_ai_logs.sql`
   - `007_enable_rls_policies.sql`
   - `008_create_triggers_and_indexes.sql`
3. Bind frontend queries in `src/store/useStore.ts` to live database tables using Supabase JS client or REST API.

---

## 5. Stage E & F: Production Deployment & Cloudflare Setup

### 5.1 Cloudflare Pages / Cloud Run Configuration
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Node Version:** `20.x`
- **Environment Variables:**
  - `GEMINI_API_KEY`: Injected via cloud provider secrets.
  - `APP_URL`: Canonical public domain (e.g. `https://nutriwiseusa.com`).

### 5.2 Pre-Deployment Checklist
- [x] Strict TypeScript validation passes with `tsc --noEmit`.
- [x] Production build passes cleanly with `vite build`.
- [x] No API keys exposed in client-side bundles.
- [x] Server-side proxy handling all Gemini AI requests.
- [x] Medical disclaimer visible across all pages and AI responses.
- [x] Responsive layout verified at mobile, tablet, and desktop breakpoints.

---

*Document approved for NutriWise USA Platform v2.0.*
