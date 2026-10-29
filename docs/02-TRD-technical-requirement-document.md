# TRD — Technical Requirements Document
## NutriWise USA — Health & Nutrition Platform

**Document Identifier:** NW-TRD-002  
**Version:** 2.0 (Comprehensive Production Architecture)  
**Date:** October 2026  
**Status:** Approved for Development & Implementation  
**Runtime Compatibility:** Dual Target — Cloudflare Pages (Serverless/BaaS) & Express/Node Full-Stack (Google Cloud Run / AI Studio)

---

## 1. System Architecture Overview

```
                               ┌─────────────────────────────────────────────────────────┐
                               │                    CLIENT LAYER                         │
                               │          React 19 + TypeScript + Tailwind CSS           │
                               │      React Router SPA | Zustand / Reactive Hook Store   │
                               └───────────┬─────────────────────────────────┬───────────┘
                                           │                                 │
                            HTTPS / REST   │                  HTTPS / REST   │
                                           ▼                                 ▼
         ┌──────────────────────────────────────────────────┐   ┌───────────────────────────────┐
         │              BACKEND PROXY & ORCHESTRATION       │   │      MANAGED BAAS BACKEND     │
         │          Express.js / Vite Server (server.ts)    │   │         (Supabase)            │
         │   - Environment secrets protection (no client keys)   - PostgreSQL 16 (28 Tables)     │
         │   - Rate limiting, token-bucket user quota guard │   │   - Row Level Security (RLS)  │
         │   - System prompt sandboxing & clinical triage   │   │   - Auth: JWT + Google OAuth  │
         │   - Dual AI Gateway: Gemini & Cloudflare Workers │   │   - Storage: 5 S3-compat buckets│
         └─────────────┬──────────────────────┬─────────────┘   └───────────────┬───────────────┘
                       │                      │                                 │
           REST / gRPC │          REST / JSON │                     HTTP / REST │
                       ▼                      ▼                                 ▼
         ┌──────────────────────┐   ┌───────────────────────┐   ┌───────────────────────────────┐
         │ GOOGLE GEMINI ENGINE │   │ CLOUDFLARE AI GATEWAY │   │ EXTERNAL SERVICES & APIS      │
         │ - Gemini-4-Argon     │   │ - Workers AI          │   │ - USDA FoodData Central API   │
         │ - gemini-3.8-flash   │   │ - LLaMA 3.1 8B        │   │ - Stripe Billing & Webhooks   │
         │ - ThinkingLevel.HIGH │   │ - Mistral 7B          │   │ - Resend Transactional Email  │
         │ - JSON Schema Mode   │   │ - LLaVA 1.5 (Vision)  │   │ - Umami Privacy Analytics     │
         └──────────────────────┘   └───────────────────────┘   └───────────────────────────────┘
```

---

## 2. Technology Stack & Component Matrix

| Architectural Layer | Selected Technology | Version / Spec | Engineering Rationale & Role |
|---|---|---|---|
| **Frontend Framework** | React + TypeScript | React 19.x / TS 5.8+ | Component-driven architecture, strict compile-time type safety, concurrent rendering features. |
| **Build Tool & Bundler** | Vite | 6.x / 8.x | Sub-second HMR, optimized Rollup production tree-shaking, unified SPA module resolution. |
| **Styling & CSS** | Tailwind CSS | v4 Engine (`@theme`) | Zero-runtime CSS extraction, standardized custom design tokens, modern responsive media queries. |
| **Icons & Micro-Graphics** | Lucide React | 0.546+ | Clean, accessible SVG iconography with consistent 1.5px stroke weight matching brand aesthetic. |
| **UI Motion & Transitions** | Motion (Framer Motion) | 12.x | Hardware-accelerated layout transitions, accessible `prefers-reduced-motion` compliance. |
| **Client Routing** | React Router | DOM v6 / v7 | Declarative SPA route definitions, scroll restoration, nested layouts, protected route guards. |
| **State Management** | Custom Reactive Store | Zustand-compatible Hook | Zero boilerplate, cross-tab synchronization, localStorage persistence for offline resilience. |
| **Backend & App Server** | Express.js / tsx | Express 4.21+ / tsx 4.x | Lightweight full-stack server running Vite middlewares in dev, serving static SPA in production. |
| **Database & Auth (BaaS)** | Supabase / PostgreSQL | Postgres 16 | Relational data integrity, ACID compliance, native Row-Level Security, built-in Auth & JWT. |
| **AI High-Reasoning** | Google GenAI SDK | `@google/genai` 2.4+ | Server-side Gemini 4-Argon / 3.8-Flash with `ThinkingLevel.HIGH` for clinical-grade diet plans. |
| **AI Edge Proxy** | Cloudflare AI Gateway | V1 Universal Gateway | Edge proxy for caching, usage logging, rate limiting, and free-tier Workers AI execution. |
| **Nutrition Data Provider**| USDA FoodData Central | REST API v1 | Authoritative standard reference for 300,000+ US food items, micronutrients, and portions. |
| **Payment Gateway** | Stripe Elements & Billing | API 2024-11 | Secure customer portals, recurring subscriptions ($9.99/mo), and RD consultation charges. |
| **Email Dispatch** | Resend | Node REST SDK | High-deliverability transactional emails (welcome, appointment confirmations, reminders). |

---

## 3. Directory & File Architecture Blueprint

```
nutriwise-usa/
├── .env.example                     # Reference environment variables (no real secrets)
├── .gitignore                       # Git exclusion rules
├── .npmrc                           # legacy-peer-deps=true for stable NPM builds
├── index.html                       # HTML5 entry with preloaded fonts and metadata
├── metadata.json                    # Google AI Studio manifest and permissions
├── package.json                     # Project scripts and dependencies
├── tsconfig.json                    # TypeScript strict compiler configuration
├── vite.config.ts                   # Vite plugins (React, Tailwind v4, path aliases)
├── server.ts                        # Full-Stack Express entry point & Gemini API proxy
├── public/
│   ├── _redirects                   # Cloudflare Pages SPA fallback (/* /index.html 200)
│   ├── favicon.svg                  # Brand vector mark (emerald leaf)
│   └── assets/                      # Static reference media and documentation
├── docs/                            # Comprehensive engineering and product specs
│   ├── 01-PRD-product-requirement-document.md
│   ├── 02-TRD-technical-requirement-document.md
│   ├── 03-APP-FLOW-user-admin-experience.md
│   ├── 04-UIUX-DESIGN-BRIEF.md
│   ├── 05-BACKEND-SCHEMA.md
│   └── 06-IMPLEMENTATION-PLAN.md
└── src/
    ├── main.tsx                     # React root mount point
    ├── App.tsx                      # Master Router (35+ defined application routes)
    ├── index.css                    # Tailwind CSS v4 design tokens and global styles
    ├── types/
    │   └── index.ts                 # Central TypeScript domain models and interfaces
    ├── constants/
    │   └── index.ts                 # App-wide nutrition constants, US units, FDA DVs
    ├── lib/
    │   ├── api.ts                   # Client-side API service with server-proxy fallbacks
    │   ├── supabase.ts              # Supabase client instance and query abstractions
    │   └── usda.ts                  # USDA FoodData Central API fetchers and parsers
    ├── store/
    │   └── useStore.ts              # Global reactive state store with local persistence
    ├── components/
    │   ├── ui/                      # Primitive atomic components
    │   │   ├── Button.tsx           # Button (primary, secondary, accent, ghost, outline)
    │   │   ├── Input.tsx            # Form input with validation states and helper text
    │   │   ├── Card.tsx             # Surface card with subtle hover elevations
    │   │   ├── Badge.tsx            # Semantic badges (dietary, category, verified)
    │   │   ├── Modal.tsx            # Accessible modal dialog with backdrop blur
    │   │   └── Toast.tsx            # Toast notification banner
    │   ├── layout/                  # Structural layout wrappers
    │   │   ├── Header.tsx           # Sticky top navigation with role switcher
    │   │   ├── Footer.tsx           # Comprehensive footer with legal & FDA disclaimer
    │   │   └── PageWrapper.tsx      # Page container with dynamic SEO title updates
    │   ├── shared/                  # Reusable domain-specific widgets
    │   │   ├── NutritionFacts.tsx   # Authentic FDA 21 CFR 101.9 Nutrition Facts label
    │   │   ├── MacroBadges.tsx      # Color-coded nutrient indicators (Protein/Carb/Fat)
    │   │   ├── ServingCalculator.tsx# Interactive serving scaler (1, 2, 4, 6 servings)
    │   │   ├── RecipeCard.tsx       # Standardized recipe preview card
    │   │   ├── ArticleCard.tsx      # Clinical article preview card with reviewer badge
    │   │   ├── FoodCard.tsx         # USDA food item card
    │   │   ├── DietitianCard.tsx    # Credentialed provider card with booking CTA
    │   │   └── WeeklyCalendar.tsx   # Interactive 7-day meal plan calendar
    │   ├── ai/                      # Interactive AI tool interfaces
    │   │   ├── ChatInterface.tsx    # Streaming conversational assistant
    │   │   ├── MealPlanOnboarding.tsx # Multi-step questionnaire wizard
    │   │   ├── GroceryList.tsx      # Aisle-sorted grocery checklist
    │   │   └── VisionUploader.tsx   # Drag-and-drop food photo & label scanner
    │   └── admin/                   # Administrative interface components
    │       ├── AdminLayout.tsx      # Dedicated clean admin shell
    │       └── DataTable.tsx        # Sortable, searchable tabular data viewer
    ├── data/                        # Verified reference and seed datasets
    │   ├── mockArticles.ts          # Clinical articles with citations and RDN reviewers
    │   ├── mockRecipes.ts           # Standardized US recipes with full nutrient profiles
    │   ├── mockFoods.ts             # USDA FoodData Central reference entries
    │   ├── mockDietPlans.ts         # 7-day sample plans across 6 dietary archetypes
    │   └── mockDietitians.ts        # Licensed Registered Dietitians with credentials
    └── pages/
        ├── public/                  # Publicly accessible routes
        │   ├── HomePage.tsx         # Hero, value props, trending items, CTA
        │   ├── ArticlesPage.tsx     # Blog catalog with category filters
        │   ├── ArticleDetailPage.tsx# Full clinical article with citations
        │   ├── RecipesPage.tsx      # Recipe catalog with dietary & time filters
        │   ├── RecipeDetailPage.tsx # Recipe with ingredients, steps, and FDA label
        │   ├── FoodsPage.tsx        # USDA foods search and category browser
        │   ├── FoodDetailPage.tsx   # Deep nutrition profile and culinary guide
        │   ├── DietPlansPage.tsx    # Curated meal plan directory
        │   ├── DietPlanDetailPage.tsx # 7-day calendar and linked recipes
        │   ├── DietitianServicesPage.tsx # Telehealth directory
        │   ├── DietitianProfilePage.tsx  # Provider bio, pricing, and reviews
        │   ├── BookingPage.tsx      # Consultation booking and calendar
        │   ├── SearchPage.tsx       # Unified global multi-domain search
        │   ├── SubscriptionPlansPage.tsx # Free vs Premium tier comparison
        │   ├── AboutPage.tsx        # Mission, editorial standard, advisory board
        │   ├── ContactPage.tsx      # Support inquiry form
        │   ├── FAQPage.tsx          # Comprehensive FAQ accordion
        │   ├── MedicalDisclaimerPage.tsx # Legally reviewed disclaimer
        │   ├── PrivacyPolicyPage.tsx # CCPA-compliant privacy policy
        │   ├── TermsPage.tsx        # Terms of Service
        │   └── NotFoundPage.tsx     # Custom 404 error page
        ├── auth/                    # Authentication views
        │   ├── LoginPage.tsx        # Email/password and Google login
        │   ├── SignUpPage.tsx       # Registration with questionnaire trigger
        │   └── ForgotPasswordPage.tsx # Secure password recovery
        ├── ai/                      # AI feature endpoints
        │   ├── AIToolsHubPage.tsx   # Central portal for all 7 AI tools
        │   ├── ChatbotPage.tsx      # Conversational nutrition assistant
        │   ├── MealPlanGeneratorPage.tsx # AI personalized meal plan creator
        │   ├── RecipeGeneratorPage.tsx # "Pantry Chef" recipe generator
        │   ├── GroceryPlannerPage.tsx  # Dynamic grocery list generator
        │   ├── PhotoAnalyzerPage.tsx   # Computer vision meal photo analyzer
        │   └── LabelScannerPage.tsx    # FDA label scanner and ingredient decoder
        ├── dashboard/               # Authenticated user dashboard
        │   ├── UserDashboard.tsx    # Daily schedule, quick stats, active meal plan
        │   ├── FoodDiaryPage.tsx    # Interactive food logger with macro bars
        │   ├── ProgressPage.tsx     # Longitudinal habit and nutrition trends
        │   ├── SavedContentPage.tsx # Saved recipes, articles, and plans
        │   ├── AppointmentsPage.tsx # Upcoming dietitian telehealth visits
        │   └── DashboardSettingsPage.tsx # Profile, diet preferences, subscription
        └── admin/                   # Super Admin & Editor portal
            ├── AdminDashboard.tsx   # Platform KPIs, traffic, and revenue
            ├── AdminArticles.tsx    # Content management for articles
            ├── AdminRecipes.tsx     # Recipe creation and nutrition editing
            ├── AdminFoods.tsx       # USDA food database manager
            ├── AdminUsers.tsx       # User management and role assignment
            ├── AdminAISettings.tsx  # System prompts, models, and usage limits
            └── AdminAnalytics.tsx   # Deep operational and AI usage analytics
```

---

## 4. Server-Side Architecture & AI Orchestration

To satisfy strict enterprise security constraints, **no AI API keys, Stripe secrets, or database service credentials ever touch client code.** The backend proxy in `server.ts` handles:

### 4.1 Server-Side Gemini API Engine (`server.ts`)

```typescript
// Architectural implementation pattern inside server.ts
import { GoogleGenAI, ThinkingLevel, Type } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({
  apiKey: apiKey || '',
  userAgent: 'NutriWiseUSA-Server/2.0'
});

// Primary Reasoning Model: gemini-4-argon with high thinking level
// Fallback Model: gemini-3.8-flash for rapid responses
```

#### Dedicated Server Proxy Endpoints:
1. `POST /api/ai/nutrition-chat`: Accepts message history, user health goal, and allergies. Invokes Gemini with high thinking level, verifying output against clinical boundaries.
2. `POST /api/ai/meal-plan-gen`: Accepts full onboarding questionnaire (caloric budget, macros, budget, restrictions). Enforces JSON schema returning 7 complete days with macro distributions.
3. `POST /api/ai/recipe-gen`: Translates available pantry ingredients into tested culinary recipes with step-by-step instructions.
4. `POST /api/ai/analyze-food`: Multimodal endpoint receiving base64 image strings of meal plates to estimate food items, portions, and calories.
5. `POST /api/ai/scan-label`: Multimodal endpoint reading Nutrition Facts label photos, outputting structured nutrient numbers and plain-English ingredient translations.
6. `POST /api/ai/progress-coach`: Synthesizes 7-day food diary logs into an empathetic coaching synthesis.

---

## 5. Security & Threat Modeling (STRIDE Analysis)

```
┌────────────────────────────────────────────────────────────────────────┐
│                        STRIDE THREAT MITIGATION                        │
├─────────────────────┬──────────────────────────────────────────────────┤
│ Threat Category     │ Architectural Defense                            │
├─────────────────────┼──────────────────────────────────────────────────┤
│ Spoofing Identity   │ Supabase Auth JWT tokens verified on every       │
│                     │ protected API route; Google OAuth via PKCE flow. │
├─────────────────────┼──────────────────────────────────────────────────┤
│ Tampering with Data │ Postgres Row Level Security (RLS) ensures users  │
│                     │ can only modify their own diary/plans.           │
│                     │ Parameterized SQL queries prevent injection.     │
├─────────────────────┼──────────────────────────────────────────────────┤
│ Repudiation         │ Immutable `audit_logs` table records every admin │
│                     │ action, content publication, and role elevation. │
├─────────────────────┼──────────────────────────────────────────────────┤
│ Information Leakage │ Zero API keys in frontend build artifacts.       │
│                     │ Strip sensitive headers; strict CORS allowlist.  │
├─────────────────────┼──────────────────────────────────────────────────┤
│ Denial of Service   │ Token-bucket rate limiting per IP and user ID;   │
│                     │ AI usage quotas enforced in database before LLM. │
├─────────────────────┼──────────────────────────────────────────────────┤
│ Elevation of Priv.  │ Role stored in database `profiles.role`; checked │
│                     │ server-side via Supabase service role checks.    │
└─────────────────────┴──────────────────────────────────────────────────┘
```

### 5.1 AI Prompt Injection & Guardrail Defenses
1. **System Prompt Encapsulation:** User input is strictly delimited within JSON payloads or XML tags (`<user_query>`). The system instructions forbid overriding foundational clinical safety rules.
2. **Medical Safety Validator:** Server filters outgoing AI responses for banned curative claims (e.g., "this cures diabetes") or unsafe caloric deficits (< 800 kcal/day).

---

## 6. Performance Optimization, Caching & Network Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                    MULTI-TIER CACHING TOPOLOGY                         │
├───────────────────┬────────────────────────────────────────────────────┤
│ Tier              │ Implementation & Eviction Strategy                 │
├───────────────────┼────────────────────────────────────────────────────┤
│ L1: Browser Cache │ LocalStorage cache for user profile, active plan,  │
│                   │ and saved bookmarks. Instant offline availability. │
├───────────────────┼────────────────────────────────────────────────────┤
│ L2: Edge CDN      │ Cloudflare Edge cache for static assets and public │
│                   │ USDA food entries (`stale-while-revalidate=86400`).│
├───────────────────┼────────────────────────────────────────────────────┤
│ L3: Server Memory │ LRU in-memory cache on Express server for frequent │
│                   │ USDA searches and static recipe data (TTL: 1 hour).│
├───────────────────┼────────────────────────────────────────────────────┤
│ L4: Database      │ Indexed PostgreSQL queries; GIN indexes on full-text│
│                   │ search and JSONB arrays.                           │
└───────────────────┴────────────────────────────────────────────────────┘
```

---

## 7. Cloudflare Deployment Configuration

### 7.1 Build Specifications
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Node.js Version:** `18.x` or `20.x`
- **Legacy Peer Deps:** Enforced via `.npmrc` (`legacy-peer-deps=true`)
- **SPA Fallback Routing:** Managed via `public/_redirects`:
  ```
  /*    /index.html   200
  ```

### 7.2 Cloudflare Pages Environment Variables
```env
# Public Client Variables (VITE_ prefix required)
VITE_APP_URL="https://nutriwise-usa.pages.dev"
VITE_SUPABASE_URL="https://YOUR_PROJECT_ID.supabase.co"
VITE_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI..."
VITE_STRIPE_PUBLISHABLE_KEY="pk_live_..."

# Server & Edge Secrets (Never prefixed with VITE_)
GEMINI_API_KEY="AIzaSy..."
CLOUDFLARE_AI_GATEWAY_URL="https://gateway.ai.cloudflare.com/v1/..."
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
RESEND_API_KEY="re_..."
```

---

*Document Author: NutriWise Technical Architecture Group*  
*Classification: Confidential — Approved for Engineering Build*
