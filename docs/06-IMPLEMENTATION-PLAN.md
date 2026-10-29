# Implementation Plan & Engineering Execution Roadmap
## NutriWise USA — Health & Nutrition Platform

**Document Identifier:** NW-PLAN-006  
**Version:** 2.0 (End-to-End Production Phasing & Deployment Runbook)  
**Date:** October 2026  
**Status:** Approved for Development & Implementation  
**Primary Execution Environments:** Google AI Studio / GitHub / Cloudflare Pages / Supabase / Stripe

---

## 1. Master Development Lifecycle & Gateways

```
┌────────────────────────────────────────────────────────────────────────┐
│                   STAGE A: FRONTEND IMPLEMENTATION                     │
│            Phases 1 to 10: Complete UI, Mock Data & Stores             │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │  [Checkpoint A: All 35+ routes pass build]
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   STAGE B: HIGH-FIDELITY ASSETS                        │
│          Curated Food Photography, USDA Badges & Vector Marks          │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │  [Checkpoint B: No broken media or missing assets]
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   STAGE C: SUPABASE DATABASE PROVISION                 │
│         SQL Migrations 001–013, 28 Tables, RLS Policies, Triggers      │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │  [Checkpoint C: All RLS rules tested]
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   STAGE D: SUPABASE LIVE INTEGRATION                   │
│        Connect Auth, Profiles, USDA Data, Meal Plans, Food Diary       │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │  [Checkpoint D: Real DB reads/writes verified]
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   STAGE E: DUAL AI ENGINE INTEGRATION                  │
│       Server-side Gemini Thinking Mode + Cloudflare AI Gateway Proxy   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │  [Checkpoint E: Safety guardrails & quotas active]
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   STAGE F: STRIPE BILLING & TELEHEALTH                 │
│         Subscriptions ($9.99/mo), Consultations, Webhook Sync          │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │  [Checkpoint F: Test mode payments succeed]
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   STAGE G: PRODUCTION DEPLOYMENT & GO-LIVE             │
│        Cloudflare Pages Git Auto-Deploy, Custom Domain, Lighthouse >90 │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Stage A: Granular Frontend Phases

### Phase 1: Project Scaffolding, Design System & Home View
- **Scope:** Vite React TypeScript setup, Tailwind v4 design tokens (`@theme`), Header, Footer, PageWrapper, Primitive UI (Button, Input, Card, Badge, Modal, Toast), and complete public `HomePage`.
- **Exit Criteria:** `npm run build` succeeds; homepage renders responsive layout from 320px to 1440px with no console errors.

### Phase 2: Evidence-Based Health Articles Knowledge Base
- **Scope:** `ArticlesPage` (category filtering, search, pagination), `ArticleDetailPage` (clinical markdown renderer, primary author card, RDN reviewer credentials badge, inline DOI citations, related articles).
- **Exit Criteria:** Article navigation works seamlessly; metadata displays published and last-reviewed timestamps.

### Phase 3: Recipe Library & USDA Foods Explorer
- **Scope:** `RecipesPage` (dietary tag filters, cooking time, calorie ranges), `RecipeDetailPage` (FDA 21 CFR 101.9 Nutrition Facts label, interactive `ServingCalculator`, step-by-step instructions), `FoodsPage` (USDA FDC search), `FoodDetailPage` (detailed micronutrient table, culinary preparation guides, food comparisons).
- **Exit Criteria:** Serving calculator dynamically updates ingredient fractions without layout shift; nutrition facts conform to FDA formatting.

### Phase 4: Curated Diet Plans & Unified Global Search
- **Scope:** `DietPlansPage` (6 dietary archetypes: Mediterranean, Heart-Healthy, High-Protein, Balanced, Vegetarian, Family), `DietPlanDetailPage` (Monday–Sunday `WeeklyCalendar` with meal slots), `SearchPage` (unified real-time query across articles, recipes, and USDA foods), `SubscriptionPlansPage` (Free vs Premium comparison grid).
- **Exit Criteria:** Multi-day calendar tabs switch cleanly; search debounces and routes accurately to detail pages.

### Phase 5: Authentication & Onboarding Views
- **Scope:** `LoginPage`, `SignUpPage`, `ForgotPasswordPage`, `ResetPasswordPage`. Form validation with accessible error labels, loading spinners, and first-time questionnaire launcher.
- **Exit Criteria:** All forms validate required fields and password strength before submission; mock auth updates reactive state.

### Phase 6: Authenticated Member Dashboard & Settings
- **Scope:** `UserDashboard` (daily meal schedule, active meal plan widget, quick progress stats), `SavedContentPage` (tabs for recipes, articles, and plans), `DashboardSettingsPage` (dietary profile editor, allergen checklist, budget adjuster).
- **Exit Criteria:** Saved items update reactively across tabs via `useStore`; role switcher in header allows testing guest vs member vs admin views.

### Phase 7: AI Tools Suite (Frontend & High-Reasoning Proxy)
- **Scope:** `AIToolsHubPage`, `ChatbotPage` (conversational assistant with clinical boundary guardrails), `MealPlanGeneratorPage` (4-step onboarding questionnaire with structured calendar output), `RecipeGeneratorPage` (Pantry chef ingredient matcher), `GroceryPlannerPage` (aisle-sorted shopping list with pantry exclusion), `PhotoAnalyzerPage` (meal plate vision analyzer), `LabelScannerPage` (FDA label OCR and plain-English ingredient decoder).
- **Exit Criteria:** All 7 AI tools operate with full interactive states, realistic loading animations, and graceful fallbacks.

### Phase 8: Registered Dietitian Telehealth Directory
- **Scope:** `DietitianServicesPage` (specialty filters, license badges), `DietitianProfilePage` (full bio, consultation packages, verified reviews), `BookingPage` (interactive calendar, timezone selector, clinical intake notes, Stripe payment step).
- **Exit Criteria:** Booking flow confirms appointment and records it in `AppointmentsPage` under dashboard.

### Phase 9: Super Admin & Content Management Portal
- **Scope:** `AdminDashboard` (operational metrics, revenue, AI query counts), `AdminArticles` (article draft/publish/archive CMS), `AdminRecipes` (structured recipe builder), `AdminFoods` (USDA sync manager), `AdminUsers` (user account table, role promotion, ban triggers), `AdminAISettings` (prompt editor and model temperature controls), `AdminAnalytics` (deep engagement trends).
- **Exit Criteria:** Admin shell enforces role-based guard; tables support search, sort, and modal edit workflows.

### Phase 10: Legal, Compliance & Supporting Documentation Pages
- **Scope:** `AboutPage` (mission, editorial standards, advisory board), `ContactPage` (support ticket submission), `FAQPage` (interactive accordion), `MedicalDisclaimerPage`, `PrivacyPolicyPage` (CCPA compliant), `TermsPage`, `NotFoundPage` (404 error).
- **Exit Criteria:** Complete legal disclosures linked in footer; 100% route coverage verified.

---

## 3. Stage B: High-Fidelity Asset & Image Strategy

1. **Culinary Photography:** Unsplash high-resolution food photography for recipe covers, meal categories, and hero banners.
2. **Optimization Protocol:**
   - Pre-convert images to modern WebP format.
   - Enforce explicit `width` and `height` attributes to eliminate Cumulative Layout Shift (CLS).
   - Apply `loading="lazy"` on all images below the fold.
   - Ensure descriptive `alt` text for screen-reader accessibility.

---

## 4. Stage C & D: Supabase Database Setup & Live Integration

### 4.1 SQL Migration Sequence (Generated in `supabase/migrations/`)
```
001_create_profiles.sql              -> Base user metadata & preferences
002_create_articles_recipes.sql      -> Knowledge base & recipe tables
003_create_foods.sql                 -> USDA FoodData Central reference tables
004_create_meal_plans.sql            -> 7-day plans, days, and meal slots
005_create_grocery_diary.sql         -> Aisle-categorized grocery & food diary
006_create_dietitians_appointments.sql -> Provider profiles & telehealth booking
007_create_subscriptions_payments.sql -> Stripe customer & billing records
008_create_ai_logs_audit.sql         -> Usage quota enforcement & compliance audit
009_create_rls_policies.sql          -> Row-level security for all 28 tables
010_create_indexes.sql               -> B-tree, GIN trigram, and composite indexes
011_create_triggers_functions.sql    -> Auto-profile creation & updated_at triggers
012_create_storage_buckets.sql       -> Public & private S3-compatible buckets
013_seed_data.sql                    -> Initial food items, categories & articles
```

---

## 5. Stage E: AI Gateway & High-Reasoning Model Strategy

### 5.1 Dual-Model Orchestration Matrix

| Feature | Primary AI Engine | Fallback Engine | Thinking Level | Output Format |
|---|---|---|---|---|
| **Personalized 7-Day Meal Plan** | Gemini-4-Argon | gemini-3.8-flash | `ThinkingLevel.HIGH` | Strict JSON Schema |
| **Clinical Nutrition Chatbot** | Gemini-4-Argon | Cloudflare LLaMA 3.1 8B | `ThinkingLevel.HIGH` | Markdown + Citations |
| **Pantry Recipe Generator** | Gemini-3.8-Flash | Mistral 7B | Balanced | Structured Recipe JSON |
| **Smart Grocery Planner** | Deterministic Aggregator + Gemini-3.8-Flash | Local Algorithmic | None | Aisle JSON Array |
| **Food Photo Analyzer** | Gemini Multimodal Vision | Cloudflare LLaVA 1.5 | None | Portion & Macro JSON |
| **FDA Label Scanner** | Gemini Multimodal OCR | Cloudflare LLaVA 1.5 | None | Nutrient Breakdown JSON |
| **AI Progress Coach** | Gemini-4-Argon | gemini-3.8-flash | `ThinkingLevel.HIGH` | Empathetic Report Letter |

---

## 6. Stage F & G: Deployment Runbook & Quality Assurance

### 6.1 Pre-Flight Deployment Checklist
- [x] No `bun.lock` in repository (standard `package-lock.json` enforced).
- [x] `.npmrc` present with `legacy-peer-deps=true`.
- [x] `public/_redirects` contains `/* /index.html 200` for SPA client-side routing.
- [x] Zero API keys or secrets exposed in frontend client bundles.
- [x] All 35+ routes defined and tested in React Router.
- [x] TypeScript compiler passes with zero errors (`npm run build`).

### 6.2 Target Production Quality Benchmarks

```
┌────────────────────────────────────────────────────────────────────────┐
│                     LIGHTHOUSE PRODUCTION TARGETS                      │
├─────────────────────────┬────────────────────────┬─────────────────────┤
│ Dimension               │ Measured Benchmark     │ Verification Tool   │
├─────────────────────────┼────────────────────────┼─────────────────────┤
│ Performance             │ >= 90 / 100            │ Google Lighthouse   │
│ Accessibility (a11y)    │ >= 98 / 100            │ Axe Core / DevTools │
│ Best Practices          │ 100 / 100              │ Chrome Audit Engine │
│ SEO                     │ 100 / 100              │ Schema Validator    │
└─────────────────────────┴────────────────────────┴─────────────────────┘
```

---

*Document Author: NutriWise Technical Steering Committee*  
*Classification: Confidential — Approved for Engineering Build*
