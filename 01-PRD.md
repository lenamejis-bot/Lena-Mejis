# PRD — Product Requirements Document
## NutriWise USA — Health & Nutrition Platform

**Document Identifier:** NW-PRD-001  
**Version:** 2.0 (Comprehensive Production Edition)  
**Date:** October 2026  
**Status:** Approved for Development & Implementation  
**Target Market:** United States (All 50 States, DC & US Territories)  
**Regulatory Baseline:** FDA 21 CFR 101.9, USDA Dietary Guidelines for Americans (2025–2030), FTC Health Claims Substantiation, CCPA/CPRA Privacy Standard

---

## 1. Executive Summary & Product Vision

### 1.1 Purpose
NutriWise USA is a premier, evidence-based nutrition intelligence and meal planning platform tailored specifically to American lifestyles, food systems, and grocery realities. The platform bridges the gap between scientific nutrition research, daily household meal preparation, and licensed healthcare expertise. It unifies credible educational resources, an authentic USDA FoodData Central nutrition engine, cutting-edge AI-assisted meal and recipe generation with high-reasoning thinking capabilities, and registered dietitian telehealth booking.

### 1.2 Mission Statement
*Make healthy eating simple, personalized, culturally inclusive, and economically practical for every American household.*

### 1.3 Core Value Propositions
1. **Uncompromising Scientific Credibility:** All nutritional figures adhere to official USDA FoodData Central standard reference guidelines and FDA Nutrition Facts labeling regulations. All editorial content is authored and reviewed by credentialed medical and dietary professionals (MS, RDN, LD, CDCES).
2. **Context-Aware AI Intelligence:** Rather than generic chatbot text, NutriWise harnesses deep reasoning AI models (including Google Gemini with high thinking level and Cloudflare Workers AI) that respect strict nutritional bounds, dietary constraints, family budgets, and prep-time limits.
3. **Pantry-to-Plate Practicality:** Every meal plan translates dynamically into an organized grocery shopping list segmented by supermarket aisle, with pantry deduction, budget-swap recommendations, and household serving scaling.
4. **Professional Continuity:** Seamless escalation from algorithmic wellness guidance to 1-on-1 consultations with verified Registered Dietitians when users encounter complex medical, metabolic, or athletic goals.

---

## 2. Market Analysis, Target Personas & Quantitative Objectives

### 2.1 Demographics & Geographic Scope
- **Geography:** United States national footprint (incorporating regional grocery variations, US customary measurement units, and domestic food supply chains).
- **Core Demographic:** Adults aged 18–68 across urban, suburban, and rural communities.
- **Economic Spectrum:** Solutions catering from SNAP/budget-conscious ($35/person/week) to gourmet organic meal planners.

### 2.2 Detailed User Personas

| Persona Attribute | Persona A: The Busy Working Parent | Persona B: The Chronic Health Navigator | Persona C: The Macro-Focused Fitness Enthusiast | Persona D: The Beginner Meal Prepper |
|---|---|---|---|---|
| **Representative Name** | "Marcus" (Age 38, Chicago, IL) | "Eleanor" (Age 56, Phoenix, AZ) | "Devon" (Age 27, Austin, TX) | "Chloe" (Age 23, Columbus, OH) |
| **Household & Income** | Married, 2 kids, $85k HHI | Empty nester, $62k HHI | Single, $75k HHI | First apartment, $42k HHI |
| **Primary Health Need** | Weeknight dinners in under 30 mins that kids will eat without exceeding grocery budget | Lowering LDL cholesterol, managing pre-diabetic glucose spikes via low-GI, high-fiber foods | Hypertrophy support: 160g+ daily protein with clean whole foods, precise macro splits | Simple, non-intimidating recipes; grocery lists that don't result in wasted produce |
| **Key Frustration** | "Meal planning takes hours on Sunday, and recipes online call for 20 obscure ingredients." | "Diet books contradict each other and medical advice is too rushed to give actual recipes." | "Most apps just estimate calories randomly; I need exact USDA micronutrient profiles." | "I buy fresh spinach and it rots before I figure out what to cook with it." |
| **NutriWise Solution** | 7-day family meal plan with 1-click grocery aisle list and $120/wk budget filter | Heart-healthy & glycemic-balanced diet plan, FDA-style fiber breakdowns, RD booking | High-Protein library, macro badges, gram-level USDA food comparisons, exportable food diary | AI ingredient-swap generator ("cook with what's in my fridge"), step-by-step timed recipe cards |

### 2.3 Product OKRs & Measurable Success Metrics (Year 1)

```
┌────────────────────────────────────────────────────────────────────────┐
│                   ANNUAL PERFORMANCE OBJECTIVES                        │
├─────────────────────────┬────────────────────────┬─────────────────────┤
│ Objective Area          │ Key Result Metric      │ 12-Month Target     │
├─────────────────────────┼────────────────────────┼─────────────────────┤
│ 1. User Engagement      │ 30-Day Retention Rate  │ > 42% (Free & Prem) │
│                         │ Weekly Active Sessions │ >= 3.4 sessions/wk  │
│                         │ Meal Plan Completion   │ > 68% 7-day logs    │
├─────────────────────────┼────────────────────────┼─────────────────────┤
│ 2. AI Utility & Quality │ AI Plan Acceptance Rate│ > 84% saved plans   │
│                         │ Meal Swap Rate         │ < 2.1 swaps/week    │
│                         │ Safety Flag Escalation │ 100% medical triage │
├─────────────────────────┼────────────────────────┼─────────────────────┤
│ 3. Commercial Growth    │ Freemium-to-Paid Conv. │ 4.8% of active users│
│                         │ Monthly Churn (Premium)│ < 4.2%              │
│                         │ RD Consult Booking MoM │ +22% monthly growth │
├─────────────────────────┼────────────────────────┼─────────────────────┤
│ 4. Platform Performance │ P95 Page Load (Mobile) │ < 1.8 seconds       │
│                         │ Lighthouse Accessibility│ >= 98 / 100        │
└─────────────────────────┴────────────────────────┴─────────────────────┘
```

---

## 3. User Roles, Access Matrix & RBAC Specification

NutriWise USA implements strict Role-Based Access Control (RBAC) across six hierarchical user states:

```
[Guest] ──► [Free Member] ──► [Premium Member]
                 │
                 ├──► [Dietitian Provider]
                 └──► [Content Editor] ──► [Super Admin]
```

### 3.1 Role Definitions & Capabilities

| Role | Target Identity | Authentication Level | Capabilities & Boundaries |
|---|---|---|---|
| **Guest** | Unauthenticated public visitor | None | Read all public articles, recipes, foods, and diet plan overviews. Access Free AI Chatbot. Full FDA nutrition view. Cannot save or bookmark. |
| **Free Member** | Registered account holder | Verified Email / Google OAuth | 100% Free & Unlimited access to all AI Tools (Chatbot, 7-Day Meal Plan Generator, Smart Recipe Generator, Grocery Planner, Photo Meal Analyzer, Label Scanner, Progress Coach). Save unlimited recipes & articles. Zero dollars required. |
| **VIP Member** | Community supporter | Free / Active Profile | Same unlimited free AI access + optional priority booking and clinical notes review with Registered Dietitians. |
| **Dietitian** | Licensed Healthcare Professional | Credential Verified by Admin | Dedicated provider profile, custom consultation availability schedules, booking management, client intake record reviews, professional meal plan authoring. |
| **Content Editor** | Staff Nutritionist / Copywriter | 2FA Admin Credentials | Draft, edit, schedule, and publish articles and recipes. Manage food database taxonomy and reviewer attributions. No access to financial or billing databases. |
| **Super Admin** | Platform Engineering & Operations | 2FA + Hardware Key | Complete control over users, subscription overrides, system prompt configuration, AI reasoning parameters, Stripe payment auditing, and platform security logs. |

---

## 4. Comprehensive Feature Specifications by System Phase

### 4.1 Phase 1: Foundational Content & Dietary Intelligence Engine

#### 4.1.1 Health & Wellness Knowledge Base
- **Taxonomy Categories:** Weight Management, Cardiovascular Wellness, Gut Microbiome & Digestion, Sustained Energy, Sleep & Cellular Recovery, Cellular Hydration & Electrolytes.
- **Editorial Standard:** Mandatory two-tier attribution: Primary Author + Credentialed Medical Reviewer (RDN, MD, or PhD).
- **Metadata Fields:** Title, Slug, Abstract/Excerpt, Body (Markdown/HTML), Published Date, Last Medically Reviewed Date, Estimated Reading Speed (220 wpm baseline), Canonical URLs, OpenGraph schema.
- **Citation Protocol:** Structured footnotes linking directly to PubMed, NIH, CDC, or peer-reviewed medical journals with DOI identifiers.

#### 4.1.2 USDA FoodData Central Verified Database
- **Standard Reference:** Interfaced directly with USDA FoodData Central API (SR Legacy and Foundation Foods dataset).
- **Nutrient Profile per Food (100g and Standard Household Measure):**
  - Energy (Calories in kcal)
  - Macronutrients: Protein (g), Total Carbohydrates (g), Dietary Fiber (g), Total Sugars (g), Added Sugars (g), Total Fat (g), Saturated Fat (g), Monounsaturated Fat (g), Polyunsaturated Fat (g), Trans Fat (g), Cholesterol (mg).
  - Essential Electrolytes & Minerals: Sodium (mg), Potassium (mg), Calcium (mg), Iron (mg), Magnesium (mg), Zinc (mg).
  - Key Vitamins: Vitamin D (mcg), Vitamin C (mg), Vitamin A (mcg RAE), Vitamin B12 (mcg), Folate (mcg DFE).
- **Preparation & Culinary Guidance:** Optimal culinary methods (roasting, steaming, raw, boiling) to preserve thermo-labile vitamins. Storage protocols (shelf-life at 34°F–38°F vs pantry).
- **Comparative Analysis Engine:** Side-by-side nutrition comparison (e.g., Hass Avocado vs Butter; Wild Salmon vs Farmed Tilapia).

#### 4.1.3 Authentic US Recipe Library
- **Classification:** Breakfast, Lunch, Dinner, Healthy Snacks, Batch Meal Prep, Under 30 Minutes, Budget-Friendly (< $3.50/serving).
- **Standardized US Household Measures:** Teaspoons (tsp), tablespoons (tbsp), cups, fluid ounces (fl oz), avoirdupois ounces (oz), pounds (lbs), with automated metric conversions (grams/milliliters).
- **Dynamic Serving Scaling Engine:** Instant recalculation of ingredient quantities and yields for 1, 2, 4, 6, 8, or 12 servings with smart culinary rounding (e.g., 0.33 cups rounded to 1/3 cup).
- **FDA Nutrition Facts Panel:** Authentic rendering matching 21 CFR 101.9 standard vertical format, with % Daily Values (%DV) calibrated to 2,000-calorie reference intake.

#### 4.1.4 Curated 7-Day Diet Plans
- **Core Archetypes:**
  1. *Balanced Mediterranean Vitality:* High monounsaturated fats, polyphenol-rich legumes, leafy greens, wild seafood.
  2. *Metabolic Heart-Healthy:* Low saturated fat (< 6% calories), high soluble fiber (> 30g/day), restricted sodium (< 1500mg).
  3. *High-Protein Athletic Fuel:* 1.6g–2.2g protein per kg lean mass, timed complex carbohydrates, micronutrient-dense recovery foods.
  4. *Plant-Forward Flexitarian:* Whole grains, sprouted legumes, nuts, seeds, minimal ultra-processed meat alternatives.
  5. *Family Budget Harmony:* Nutritious meals under $125/week for family of 4, kid-approved flavor profiles, bulk-ingredient cross-utilization.

---

### 4.2 Phase 2: AI-Powered Nutrition Intelligence Systems

#### 4.2.1 Deep-Reasoning AI Meal Plan Generator
- **Multi-Factor Questionnaire Inputs:**
  1. Health & Wellness Objectives: Balanced lifestyle, sustainable fat loss, athletic conditioning, cardiovascular optimization, digestive comfort.
  2. Demographic Parameters: Age bracket, biological sex, height, weight, activity expenditure factor (1.2 to 1.9).
  3. Dietary Restrictions & Preferences: Omnivore, Pescatarian, Mediterranean, Lacto-Ovo Vegetarian, Vegan, Low-FODMAP, Dairy-Free, Gluten-Free.
  4. Allergen Blacklist: Tree nuts, Peanuts, Shellfish, Finfish, Dairy/Lactose, Eggs, Soy, Wheat, Sesame.
  5. Economic & Prep Constraints: Weekly food budget ($35–$250/person), maximum prep time on weekdays (15m, 30m, 45m, 60m+), batch-prep affinity.
  6. Disliked Ingredients & Taste Aversions: Free-form entry with auto-complete.
- **Reasoning Architecture:** Utilizes Gemini with `thinkingLevel: HIGH` or Cloudflare Workers AI. The system reasons through daily caloric envelopes, macro distributions, nutrient timing, and pantry ingredient overlap across the 7-day schedule before emitting strict structured JSON.
- **Output Artifacts:**
  - 7 distinct daily menus (Monday through Sunday) comprising Breakfast, Lunch, Dinner, and 1–2 Nutritive Snacks.
  - Aggregated daily nutrition summaries (Calories, Protein, Net Carbs, Fats, Dietary Fiber, Sodium).
  - Contextual culinary prep tips (e.g., "Roast extra sweet potatoes on Monday to use in Wednesday's salad").
  - "Smart Swap" mechanism: Allows 1-click replacement of any individual meal with an AI-generated alternative that maintains the exact caloric and macro budget (+/- 8%).

#### 4.2.2 Clinical Guardrail Nutrition Chatbot
- **Conversational Protocol:** Natural language conversational assistant grounded in US dietary guidelines, avoiding medical diagnosis or curative claims.
- **Context Injection:** Seamlessly consumes the user's active dietary preferences, known allergens, and active meal plan from local state/profile.
- **Intelligent Triage & Guardrails:**
  - *Emergency & Eating Disorder Triggers:* Immediate referral to 911, 988 Suicide & Crisis Lifeline, or NEDA (National Eating Disorders Association) helpline if self-harm, purging, or dangerous caloric restriction (< 800 kcal/day) is detected.
  - *Medical Condition Boundaries:* If a user queries management of Stage 4 Renal Disease, Type 1 Diabetes insulin dosing, or chemotherapy nutrition, the chatbot clarifies: *"I cannot provide medical nutrition therapy for clinical conditions. Please consult with our licensed Registered Dietitians or your primary physician."* and surfaces direct booking links.

#### 4.2.3 Smart Ingredient-to-Recipe Generator ("Pantry Chef")
- **Input:** Dynamic list of ingredients currently in user's refrigerator and pantry, optional kitchen equipment filters (Air Fryer, Slow Cooker, Instant Pot, Sheet Pan).
- **Processing:** Evaluates matching recipes from internal verified library; if no exact match exists, generates a custom recipe adhering to culinary logic, food safety internal temperatures (e.g., poultry 165°F), and standard US measurements.

#### 4.2.4 Dynamic Smart Grocery Planner
- **Aisle Segmentation:**
  - Produce (Fresh fruits, vegetables, fresh herbs)
  - Meat & Seafood (Poultry, beef, fish, plant proteins)
  - Dairy & Refrigerated (Milk, yogurts, eggs, cheeses, fermented foods)
  - Pantry & Dry Goods (Grains, legumes, canned goods, oils, spices, broths)
  - Bakery & Deli
  - Frozen Essentials
- **Intelligent Consolidation:** Multiplies and sums identical ingredients across multiple days (e.g., 2 tbsp olive oil on Monday + 1/4 cup on Thursday = 6 tbsp / ~3/8 cup).
- **Pantry Exclusion ("Already Have This"):** Toggleable items to eliminate unnecessary purchases.
- **Budget Optimization:** Highlights potential substitutions (e.g., frozen wild blueberries in lieu of fresh out-of-season berries to save $3.00).

---

### 4.3 Phase 3: Premium Health Tracking & Computer Vision Suite

#### 4.3.1 AI Food Photo Analyzer
- **Vision Pipeline:** Client-side image pre-compression (max 1600px, WebP/JPEG) sent to multimodal vision models.
- **Segmentation & Detection:** Recognizes multi-item food plates (e.g., grilled chicken breast, steamed broccoli florets, brown rice).
- **Volumetric Estimation:** Estimates portion sizes based on plate aspect ratios, generating a realistic nutritional confidence range (e.g., 420–490 kcal; 38–44g protein).
- **User Correction Loop:** Interactive UI allows the user to tap any recognized item, adjust portion grams or cups, or remove false positives prior to saving to their official Food Diary.

#### 4.3.2 AI Nutrition Facts Label Scanner
- **OCR & Parsing Engine:** Extracts structured values from photographed FDA nutrition labels:
  - Serving Size and Servings Per Container
  - Calories per serving
  - Total Fat, Saturated Fat, Trans Fat
  - Cholesterol & Sodium
  - Total Carbohydrates, Dietary Fiber, Total Sugars, Added Sugars
  - Protein & Micronutrients
- **Ingredient Decryption:** Translates complex chemical preservatives, artificial colors, and sugar alcohols (e.g., maltitol, dextrose, sodium benzoate) into plain-English health explanations.
- **Red Flag Detector:** Highlights high sodium (> 20% DV per serving), excessive added sugars (> 12g), or hidden allergens (e.g., whey, casein, hydrolyzed soy protein).

#### 4.3.3 AI Progress Coach & Longitudinal Habit Analytics
- **Holistic Metric Tracking:** Transcends simple weight loss by measuring:
  - Weekly Dietary Fiber Consistency (Target: 25g/day for women, 38g/day for men).
  - Protein Distribution across meals (preventing dinner-heavy protein backloading).
  - Plant Diversity Score (Target: 20–30 unique plants/week for microbiome health).
  - Meal Prep Adherence & Diary Streak.
- **Weekly Executive Synthesis:** AI generates an encouraging, actionable weekly letter celebrating wins and proposing one small, micro-habit upgrade for the following week.

---

### 4.4 Phase 4: Licensed Healthcare Telehealth & Dietitian Services

#### 4.4.1 Verified Registered Dietitian (RD/RDN) Directory
- **Credential Verification:** Mandatory verification of Commission on Dietetic Registration (CDR) license numbers and state licensure (LD/LDN).
- **Specialty Classifications:**
  - Gastrointestinal & IBS (Low-FODMAP, SIBO, Celiac)
  - Cardiometabolic Health (Hypertension, Hyperlipidemia, Pre-Diabetes)
  - Sports Performance & Endurance Nutrition (CSSD certified)
  - Women's Hormonal & Maternal Nutrition (PCOS, Gestational Wellness)
  - Plant-Based & Vegan Lifestyle Transitions
  - Pediatric & Family Feeding Dynamics

#### 4.4.2 Booking, Telehealth Scheduling & Stripe Integration
- **Calendar Engine:** Real-time scheduling across US Eastern, Central, Mountain, and Pacific time zones.
- **Service Tiers:**
  - Initial 60-Minute Comprehensive Nutritional Assessment ($140–$180).
  - 30-Minute Follow-Up & Plan Calibration ($75–$95).
  - 4-Week Intensive Telehealth Package (Assessment + 3 Follow-ups + Direct Chat).
- **Secure Intake Workflow:** HIPAA-conscious intake forms capturing medical history, primary physician details, current medications, biometric lab work, and dietary logs.

---

## 5. Non-Functional Requirements & Architectural Constraints

```
┌────────────────────────────────────────────────────────────────────────┐
│                     NON-FUNCTIONAL SPECIFICATIONS                      │
├──────────────────────┬─────────────────────────────────────────────────┤
│ Dimension            │ Requirement & Engineering Threshold             │
├──────────────────────┼─────────────────────────────────────────────────┤
│ Latency & Speed      │ Time-to-First-Byte (TTFB) < 180ms worldwide     │
│                      │ Largest Contentful Paint (LCP) < 1.8s on 4G LTE │
│                      │ Cumulative Layout Shift (CLS) < 0.05            │
│                      │ First Input Delay (FID) / INP < 100ms           │
├──────────────────────┼─────────────────────────────────────────────────┤
│ Mobile Adaptability  │ Responsive design: 320px, 375px, 768px, 1280px+ │
│                      │ Minimum touch target: 44px × 44px               │
│                      │ Offline-first client caching for active plans   │
├──────────────────────┼─────────────────────────────────────────────────┤
│ Accessibility (a11y) │ Full WCAG 2.1 Level AA compliance               │
│                      │ Minimum text contrast ratio: 4.5:1 (normal text)│
│                      │ Screen-reader tested (NVDA, VoiceOver)          │
│                      │ Full keyboard tab order and focus-visible rings │
├──────────────────────┼─────────────────────────────────────────────────┤
│ Security & Privacy   │ Transport Layer Security: TLS 1.3 enforced      │
│                      │ Zero client-side API key exposure               │
│                      │ OWASP Top-10 mitigation (CSP, sanitization, RLS)│
│                      │ CCPA/CPRA full compliance: right to delete/opt  │
├──────────────────────┼─────────────────────────────────────────────────┤
│ Reliability & Uptime │ High-availability target: 99.95% uptime         │
│                      │ Automated database backups with 1-hr RPO        │
│                      │ Graceful UI degradation if external APIs fail   │
└──────────────────────┴─────────────────────────────────────────────────┘
```

---

## 6. Regulatory, Legal & Medical Compliance Framework

1. **FDA 21 CFR 101.9 Nutrition Labeling Compliance:**
   - Calorie values computed via 4-4-9 Atwater general factors or specific USDA analytical tables.
   - Required standard nutrient listing and official US Daily Values (%DV): Fat (78g), Saturated Fat (20g), Cholesterol (300mg), Sodium (2300mg), Carbs (275g), Fiber (28g), Added Sugars (50g), Protein (50g), Vitamin D (20mcg), Calcium (1300mg), Iron (18mg), Potassium (4700mg).
2. **Prominent Medical Disclaimers:**
   - Every AI interface, recipe page, and meal plan displays clear language: *"NutriWise USA provides evidence-based educational content and automated dietary tools for general health and wellness. This platform does not provide medical diagnoses, treatment, or clinical medical nutrition therapy. Always consult your physician or a Registered Dietitian before beginning any rigorous dietary regimen."*
3. **FTC Section 5 Truth in Advertising:**
   - Full disclosure of commercial affiliate partnerships (e.g., kitchenware, pantry ingredients) with distinct visual tags (`#AffiliateDisclosure`).
4. **Data Privacy & User Rights:**
   - One-click account data export (JSON/CSV) and automated permanent deletion workflows to comply with state privacy laws (California, Virginia, Colorado).

---

## 7. Product Release Phasing & Roadmap

```
PHASE 1: Foundations (Months 1–2)
├── Design system implementation (DM Serif Display + Inter, Tailwind tokens)
├── Core layout: Sticky header, responsive footer, role switcher
├── USDA Foods Database (Search, categories, FDA facts labels)
├── 100+ Tested Recipes with dynamic serving calculator
├── Evidence-based Articles library with RDN review badges
└── Curated 7-day Diet Plans with weekly calendar views

PHASE 2: AI Intelligence & User System (Months 3–4)
├── Full authentication (Email/Password, Google OAuth, session refresh)
├── Client-side global store with persistent local storage
├── Express backend with Google GenAI thinking mode & Cloudflare proxy
├── 7-day AI Meal Plan Generator with multi-step onboarding
├── Clinical-triage AI Nutrition Chatbot with starter prompts
├── Smart Grocery Planner with pantry exclusion & aisle grouping
└── User Dashboard: saved recipes, active plans, grocery checklists

PHASE 3: Premium Tracking & Vision (Months 5–6)
├── Stripe Checkout integration (Monthly $9.99 / Annual $79.99)
├── Interactive Food Diary with daily macro progress bars
├── AI Food Photo Analyzer (multimodal portion & calorie estimator)
├── AI Nutrition Label Scanner & ingredient plain-English explainer
├── AI Weekly Progress Coach with personalized habit letters
└── Exportable PDF reports for healthcare provider visits

PHASE 4: Telehealth & Clinical Network (Months 7+)
├── Registered Dietitian directory with state license verification
├── Appointment booking & calendar availability engine
├── Secure client intake forms & clinical notes portal
├── Admin portal: CMS for articles, recipes, foods, user moderation, analytics
└── Enterprise wellness & employee health pilot programs
```

---

*Document Author: NutriWise USA Product Architecture Board*  
*Classification: Confidential — Approved for Engineering Build*
