# Implementation Plan
## NutriWise USA — Health & Nutrition Platform

**Version:** 1.0  
**Date:** October 2026  
**Status:** Approved — Ready for Development  
**Development Environment:** Google AI Studio (Gemini)

---

## Overview: Development Stages

```
Stage A: Complete Frontend (All phases below)
        │
Stage B: Images & Visual Assets
        │
Stage C: Supabase Database Setup (via Claude connector)
        │
Stage D: Supabase Integration (connect frontend to database)
        │
Stage E: Cloudflare AI Gateway Integration
        │
Stage F: GitHub → Cloudflare Deployment
        │
Stage G: Final QA & Go-Live
```

**Rule:** Never skip or reorder stages. Supabase is NOT created during frontend development.

---

## Stage A: Frontend Development

### Phase 1 — Project Foundation & Home Page

**Objectives:**
- Initialize React + TypeScript + Vite project
- Configure Tailwind CSS with design tokens from UI/UX Brief
- Set up React Router with all route placeholders
- Build Header and Footer components
- Build Home Page (static, no real data)
- Mobile-responsive layout
- Google Fonts loaded (DM Serif Display + Inter)

**Files to create:**
```
package.json              (React, TypeScript, Vite, Tailwind, React Router, Lucide React, Zustand)
vite.config.ts
tailwind.config.ts        (custom colors, spacing, fonts from design brief)
.npmrc                    (legacy-peer-deps=true)
public/_redirects         (/* /index.html 200)
public/favicon.svg        (leaf emoji)
src/main.tsx
src/App.tsx               (Router setup, all routes defined)
src/index.css             (Tailwind directives + CSS variables)
src/types/index.ts        (All TypeScript interfaces)
src/constants/index.ts    (App-wide constants)
src/components/layout/Header.tsx
src/components/layout/Footer.tsx
src/components/layout/PageWrapper.tsx
src/components/ui/Button.tsx
src/components/ui/Input.tsx
src/components/ui/Card.tsx
src/components/ui/Badge.tsx
src/pages/public/HomePage.tsx
```

**Home Page Sections (static/mock):**
1. Hero with headline + CTA button
2. Quick features strip (4 icons + labels)
3. Popular Articles (3 mock cards)
4. Trending Recipes (6 mock cards, horizontal scroll mobile)
5. AI Tools teaser section
6. Newsletter signup (email input only)

**AI Studio Prompt Goal:** "Build Phase 1 of NutriWise, a US health/nutrition website. See spec below. Use React + TypeScript + Vite + Tailwind CSS. Set up all routes as empty page placeholders. Build the Header, Footer, and complete Home Page with static content. Follow the exact color palette and typography in the design brief."

**Change Report:** List all files created/modified  
**Test Report:** Navigation works, home page renders, mobile responsive, no TypeScript errors

---

### Phase 2 — Articles & Content Pages

**Objectives:**
- Articles listing page with filters and search
- Single article page template
- Author / reviewer display component
- Article category pages

**Files to create:**
```
src/pages/public/ArticlesPage.tsx
src/pages/public/ArticleDetailPage.tsx
src/components/shared/ArticleCard.tsx
src/components/shared/AuthorCard.tsx
src/components/shared/ReviewerCard.tsx
src/components/shared/CategoryFilter.tsx
src/data/mockArticles.ts      (5-6 sample articles for UI testing)
```

**Mock data needed:** 5-6 article objects with title, slug, excerpt, author, category, reading time, cover image placeholder

**Test:** Article list renders, filters work, clicking card opens detail page, all sections visible

---

### Phase 3 — Recipes & Foods Database Pages

**Objectives:**
- Recipe listing with filters (category, time, dietary preference)
- Single recipe detail page (ingredients, steps, nutrition facts, serving calculator)
- Foods database listing page
- Single food detail page (nutrition table, preparation, related recipes)
- Recipe rating display (static stars)

**Files to create:**
```
src/pages/public/RecipesPage.tsx
src/pages/public/RecipeDetailPage.tsx
src/pages/public/FoodsPage.tsx
src/pages/public/FoodDetailPage.tsx
src/components/shared/RecipeCard.tsx
src/components/shared/FoodCard.tsx
src/components/shared/NutritionFacts.tsx      (FDA-style nutrition label)
src/components/shared/ServingCalculator.tsx   (adjustable servings)
src/components/shared/IngredientList.tsx
src/components/shared/RecipeSteps.tsx
src/components/shared/MacroBadges.tsx         (color-coded protein/carbs/fat)
src/components/shared/SearchBar.tsx
src/data/mockRecipes.ts
src/data/mockFoods.ts
```

**Test:** Recipe filters work, serving calculator updates quantities, nutrition label displays correctly, food search works

---

### Phase 4 — Diet Plans & Search Pages

**Objectives:**
- Diet Plans listing page (plan type cards)
- Single diet plan page (7-day calendar view)
- Search results page (unified across articles, recipes, foods)
- Subscription Plans comparison page

**Files to create:**
```
src/pages/public/DietPlansPage.tsx
src/pages/public/DietPlanDetailPage.tsx
src/pages/public/SearchPage.tsx
src/pages/public/SubscriptionPlansPage.tsx
src/components/shared/WeeklyCalendar.tsx      (Mon-Sun tabs, meal slots)
src/components/shared/MealSlotCard.tsx
src/data/mockDietPlans.ts
```

---

### Phase 5 — Auth Pages

**Objectives:**
- Login page
- Sign Up page
- Forgot Password page
- Reset Password page
- All forms with validation
- Loading states during submission
- Error message display

**Files to create:**
```
src/pages/auth/LoginPage.tsx
src/pages/auth/SignUpPage.tsx
src/pages/auth/ForgotPasswordPage.tsx
src/pages/auth/ResetPasswordPage.tsx
src/lib/supabase.ts               (Supabase client — placeholder with env vars)
src/store/authStore.ts            (Zustand auth state)
src/hooks/useAuth.ts
src/components/ui/Modal.tsx
src/components/ui/Toast.tsx
```

**Note:** Auth pages are built with forms only — Supabase not yet connected. Submit shows success toast with mock behavior.

---

### Phase 6 — User Dashboard & Protected Pages

**Objectives:**
- User dashboard page (after login)
- My Saves (recipes, articles)
- Dashboard layout with sidebar
- Protected route guard component
- User settings pages
- Membership/billing page

**Files to create:**
```
src/components/layout/DashboardLayout.tsx
src/components/layout/DashboardSidebar.tsx
src/pages/dashboard/DashboardHomePage.tsx
src/pages/dashboard/SavedContentPage.tsx
src/pages/dashboard/DashboardSettingsPage.tsx
src/components/shared/ProtectedRoute.tsx
src/components/shared/PremiumGate.tsx       (wrapper that shows upgrade CTA for locked features)
```

---

### Phase 7 — AI Tools Pages (Frontend Only)

**Objectives:**
- AI Chatbot page (UI only — mock responses)
- Meal Plan Generator (questionnaire UI + mock plan display)
- Recipe Generator page
- Grocery Planner page
- Food Diary page
- Progress Dashboard page
- Photo Analyzer page (upload UI + mock result)
- Label Scanner page (upload UI + mock result)

**Files to create:**
```
src/pages/ai/ChatbotPage.tsx
src/pages/ai/MealPlanGeneratorPage.tsx
src/pages/ai/RecipeGeneratorPage.tsx
src/pages/ai/GroceryPlannerPage.tsx
src/pages/ai/PhotoAnalyzerPage.tsx
src/pages/ai/LabelScannerPage.tsx
src/pages/dashboard/FoodDiaryPage.tsx
src/pages/dashboard/ProgressPage.tsx
src/components/ai/ChatInterface.tsx
src/components/ai/MealPlanOnboarding.tsx     (multi-step questionnaire)
src/components/ai/MealPlanDisplay.tsx        (7-day calendar with meals)
src/components/ai/GroceryList.tsx
src/components/ai/PhotoUploader.tsx
src/lib/cloudflareAI.ts                     (Cloudflare AI Gateway client — placeholder)
src/data/mockAIResponses.ts                 (mock chatbot + meal plan data)
```

**Test:** All AI pages render, questionnaire steps work, mock data displays correctly

---

### Phase 8 — Dietitian Services Pages

**Objectives:**
- Dietitian directory page
- Individual dietitian profile page
- Booking form (mock — no real payment yet)
- Appointment confirmation page

**Files to create:**
```
src/pages/public/DietitianServicesPage.tsx
src/pages/public/DietitianProfilePage.tsx
src/pages/public/BookingPage.tsx
src/components/shared/DietitianCard.tsx
src/components/shared/BookingCalendar.tsx    (date/time picker UI)
src/data/mockDietitians.ts
```

---

### Phase 9 — Admin Panel

**Objectives:**
- Complete admin panel (separate from user-facing site)
- Admin layout with sidebar
- Article management (list, create, edit)
- Recipe management
- Food database management
- User management table
- AI settings page
- Analytics dashboard
- Admin login page

**Files to create:**
```
src/pages/admin/AdminLoginPage.tsx
src/pages/admin/AdminDashboard.tsx
src/pages/admin/AdminArticles.tsx
src/pages/admin/AdminArticleEditor.tsx
src/pages/admin/AdminRecipes.tsx
src/pages/admin/AdminFoods.tsx
src/pages/admin/AdminUsers.tsx
src/pages/admin/AdminAISettings.tsx
src/pages/admin/AdminAnalytics.tsx
src/components/admin/AdminLayout.tsx
src/components/admin/AdminSidebar.tsx
src/components/admin/DataTable.tsx
src/components/admin/RichTextEditor.tsx      (TipTap or simple textarea)
src/components/admin/IngredientEditor.tsx    (structured ingredient list editor)
src/components/admin/StatsCard.tsx
```

---

### Phase 10 — Supporting Pages & Final Frontend Polish

**Objectives:**
- About Us page
- Contact page
- FAQ page (accordion)
- Privacy Policy page
- Terms of Service page
- Medical Disclaimer page
- 404 Not Found page
- Loading skeletons for all content lists
- Empty states for all dashboard sections
- Final responsive review (all breakpoints)
- Accessibility review (keyboard nav, ARIA labels, focus states)

**Frontend Complete Checkpoint:**
- [ ] All pages exist and render without errors
- [ ] All navigation works
- [ ] Mobile responsive at 375px, 768px, 1280px
- [ ] No TypeScript errors (`npm run build` passes)
- [ ] No console errors
- [ ] All forms have validation and error states
- [ ] Loading and empty states implemented
- [ ] Focus states visible on all interactive elements

---

## Stage B: Images & Visual Assets

**Process:**
1. Admin provides a list of all images needed (food photos, article headers, recipe covers, team photos, dietitian headshots)
2. Admin sources or provides image URLs
3. AI Studio prompt: "Integrate these image URLs into the NutriWise codebase, replacing placeholder images. Update all mock data files with real image URLs."

**Image List to prepare:**
- Home page hero background (food photography)
- 6 food category icons or images
- 5-6 article cover images
- 8-10 recipe cover images
- 20-30 food item images (top foods in database)
- 3-4 dietitian headshots (placeholder/stock photos)

---

## Stage C: Supabase Database Setup

**When:** After Stage A + B complete, frontend fully tested

**Process:**
1. Enable Supabase connector/plugin in Claude settings
2. Provide Claude with: Supabase project URL + anon key
3. Claude inspects existing Supabase project (if any)
4. Claude generates complete SQL migration scripts based on Backend Schema document
5. Human reviews SQL before running
6. Run SQL in Supabase SQL editor
7. Verify all tables, RLS policies, indexes, triggers created correctly
8. Verify storage buckets created

**SQL Files Claude will generate:**
```
supabase/
  migrations/
    001_create_profiles.sql
    002_create_articles_recipes.sql
    003_create_foods.sql
    004_create_meal_plans.sql
    005_create_grocery_diary.sql
    006_create_dietitians_appointments.sql
    007_create_subscriptions_payments.sql
    008_create_ai_logs_audit.sql
    009_create_rls_policies.sql
    010_create_indexes.sql
    011_create_triggers_functions.sql
    012_create_storage_buckets.sql
    013_seed_data.sql                 (categories, food database seed)
```

---

## Stage D: Supabase Integration

**Objectives:** Replace all mock data with real Supabase queries

**AI Studio Prompt structure:** "Connect NutriWise frontend to Supabase. Replace all mock data with real database queries. Here is the GitHub repo URL: [URL]. Supabase URL: [URL], Anon Key: [KEY]. Implement auth flows, protected routes, article/recipe/food database queries, user profile management, saved content."

**Integration order:**
1. Supabase client configuration
2. Authentication (login, signup, session, Google OAuth)
3. Profile management
4. Articles + Recipes + Foods (public reads)
5. Save/unsave recipes and articles
6. Meal plans (CRUD)
7. Food diary
8. Grocery lists
9. User settings
10. Admin panel data connections
11. Subscription status reads

---

## Stage E: Cloudflare AI Gateway Integration

**Process (as per MD workflow):**

1. Claude reviews GitHub repo and generates exact questions to ask Cloudflare AI support:
   - Stack details
   - Which AI features needed
   - Exact setup steps, file structure, environment variables
   - How to call AI Gateway from React frontend safely

2. Human pastes Cloudflare AI support answers to Claude

3. Claude generates AI Studio prompt to integrate:
   - `src/lib/cloudflareAI.ts` — real API client
   - Supabase Edge Functions for each AI tool
   - Environment variables setup
   - Quota checking before each AI call
   - Error handling for AI failures

4. AI Tools to connect in order:
   1. AI Chatbot (text)
   2. Meal Plan Generator (structured JSON output)
   3. Recipe Generator
   4. Smart Grocery Planner (derives from meal plan)
   5. Food Photo Analyzer (vision model)
   6. Food Label Scanner (vision model)
   7. AI Progress Coach

5. Push to GitHub → Deploy to Cloudflare → Test all AI tools

**Security checklist for AI integration:**
- [ ] No API keys in any frontend file
- [ ] All AI calls go through Edge Function or Cloudflare Worker
- [ ] Quota check enforced before every AI call
- [ ] AI system prompts include safety guardrails
- [ ] Medical escalation triggers working

---

## Stage F: GitHub → Cloudflare Deployment

**Pre-deployment checklist:**
- [ ] `bun.lock` NOT in repository (only `package-lock.json`)
- [ ] `.npmrc` with `legacy-peer-deps=true` at root
- [ ] `public/_redirects` file exists (`/* /index.html 200`)
- [ ] `npm run build` passes locally with no errors
- [ ] All environment variables documented
- [ ] No API keys in any frontend file
- [ ] No console.log statements with sensitive data

**Cloudflare Pages Setup:**
```
Framework preset:    Vite
Build command:       npm run build
Build output dir:    dist
Root directory:      /
Node version:        18

Environment Variables:
  VITE_SUPABASE_URL              = [Supabase project URL]
  VITE_SUPABASE_ANON_KEY         = [Supabase anon key]
  VITE_CLOUDFLARE_AI_GATEWAY_URL = [Gateway URL]
  VITE_STRIPE_PUBLISHABLE_KEY    = [Stripe publishable key]
  VITE_APP_URL                   = https://[your-domain].pages.dev
```

**Steps:**
1. Push final code to GitHub (public repo)
2. Cloudflare Pages → Create project → Import from GitHub
3. Set framework and build settings above
4. Add all environment variables
5. Deploy
6. Verify build passes in Cloudflare build log
7. Test on Cloudflare subdomain URL

---

## Stage G: Final QA & Go-Live

### Functional Testing
- [ ] User can sign up and receive confirmation email
- [ ] User can log in with email/password
- [ ] User can log in with Google
- [ ] Password reset works
- [ ] Articles load from database
- [ ] Recipes load with correct nutrition data
- [ ] Food search returns results
- [ ] AI Chatbot responds correctly
- [ ] Meal Plan Generator creates real plan
- [ ] Recipe Generator works
- [ ] Grocery Planner generates list
- [ ] Food Diary saves entries
- [ ] Premium upgrade via Stripe works (test mode)
- [ ] Premium features unlock after payment
- [ ] Subscription cancellation works
- [ ] Dietitian booking form submits
- [ ] Admin can create/publish article
- [ ] Admin can manage users
- [ ] All email templates send correctly

### UI/UX Review
- [ ] All pages match design brief (colors, typography, spacing)
- [ ] Mobile layout correct at 375px
- [ ] Tablet layout correct at 768px
- [ ] Desktop layout correct at 1280px
- [ ] No broken images
- [ ] No broken links (internal)
- [ ] All loading states shown
- [ ] All empty states shown
- [ ] Error messages helpful and clear

### Performance
- [ ] Lighthouse mobile score > 85
- [ ] Images lazy-loaded
- [ ] No large unoptimized images (> 200KB)

### Security
- [ ] No API keys visible in browser DevTools network tab
- [ ] RLS blocking unauthorized data access (manual test)
- [ ] Admin routes require admin role
- [ ] Forms reject empty/invalid inputs

### SEO
- [ ] Article pages have correct meta title and description
- [ ] Recipe pages have Recipe structured data
- [ ] Sitemap accessible at /sitemap.xml
- [ ] Robots.txt correct

### Go-Live
1. Custom domain connected to Cloudflare Pages
2. SSL certificate active
3. Final smoke test on production domain
4. Announce launch

---

## Remix Continuation Protocol

If Google AI Studio quota runs out mid-development:

1. Before switching Gmail, Claude generates a **Remix Continuation Prompt** containing:
   - Project name: NutriWise USA
   - Current phase + what was completed
   - Files that exist (from last Change Report)
   - What the next prompt should do
   - Strict instruction: "Do NOT rewrite, delete, or restructure existing files. Continue from exactly where we left off."

2. Human remixes project to new Gmail
3. Human pastes Remix Continuation Prompt
4. Development continues from exact stopping point

---

## Development Rules (Always Active)

1. After each phase: provide **Change Report** (files added/modified) + **Test Report** (what to test)
2. Never create Supabase database during frontend stages
3. Never add real API keys to any file
4. Each phase: `npm run build` must pass before calling phase complete
5. Admin panel is a separate section of the same React app (not a separate project)
6. Hosting is Cloudflare Pages only — no Vercel references
7. When Claude detects an issue, state it clearly before attempting to fix it
8. At every major stage transition, clearly state: current stage, completed work, next step

---

## Quick Reference: Phase Summary

| Phase | Scope | Key Output |
|---|---|---|
| 1 | Foundation + Home | Working React app, complete home page |
| 2 | Articles | Blog listing + article detail |
| 3 | Recipes + Foods | Recipe/food pages with nutrition display |
| 4 | Diet Plans + Search | Plan calendar, search results, pricing page |
| 5 | Auth Pages | Login, signup, password reset forms |
| 6 | Dashboard | User dashboard, saved content, settings |
| 7 | AI Tool Pages | All 7 AI feature UIs (mock data) |
| 8 | Dietitian Pages | Directory, profile, booking UI |
| 9 | Admin Panel | Full admin UI |
| 10 | Polish + Extras | About, FAQ, 404, accessibility, final review |
| B | Images | Real images integrated |
| C | Supabase DB | Database created via Claude connector |
| D | Supabase Integration | Frontend connected to real data |
| E | AI Gateway | Live AI features working |
| F | Deployment | Live on Cloudflare Pages |
| G | Final QA | All tests passed, go-live |

---

*Document Owner: Project Lead*  
*Last Updated: October 2026*  
*Consistent with: PRD v1.0, TRD v1.0, App Flow v1.0, UI/UX Brief v1.0, Backend Schema v1.0*
