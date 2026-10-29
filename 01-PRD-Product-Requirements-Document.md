# NutriWise USA — Product Requirements Document (PRD)
## Comprehensive Health & Evidence-Based Nutrition Platform

**Document Version:** 2.0 (Updated & Expanded)  
**Date:** October 2026  
**Status:** Implemented & Production-Ready  
**Application Target:** United States Adults, Families & Registered Dietitians  

---

## 1. Executive Summary & Purpose

### 1.1 Purpose
NutriWise USA is a modern, evidence-based health and nutrition web platform engineered specifically for American households. The platform brings together peer-reviewed nutrition science, advanced AI meal planning featuring **Gemini High Thinking Mode** (`gemini-4-argon`), USDA FoodData Central laboratory nutrition profiles, and direct access to licensed Registered Dietitians (RD/RDN).

### 1.2 Mission Statement
Make evidence-based nutrition simple, personalized, budget-conscious, and practical for every American kitchen.

### 1.3 Core Value Propositions
- **Evidence-Based Foundation:** All articles, meal plans, and nutritional guidelines cite primary clinical trials, NHANES epidemiology, or USDA food data. No fad diets, unproven cleanses, or pseudo-scientific claims.
- **AI High Thinking Engine:** Powered by `gemini-4-argon` with `ThinkingLevel.HIGH` to evaluate complete amino acid profiles (leucine threshold pacing), prebiotic fiber ratios (25–38g daily targets), and micro-nutrient synergies.
- **Pantry & Budget Sync:** Integrates real US grocery shopping realities ($25–$200/week budgets), department-grouped grocery lists (Produce, Dairy, Meat, Pantry, Frozen), and pantry exclusion.
- **Clinical Telehealth Integration:** Seamless 1-on-1 consultation booking with Board Certified Registered Dietitians (RD, RDN, LD, CSSD, CDCES).

---

## 2. Target Audience & Personas

### 2.1 Demographics
- **Geography:** United States (all 50 states).
- **Target Age:** 18–65 years (Singles, couples, parents with children, seniors).
- **Measurement Standards:** Standard US household measurements (cups, tablespoons, ounces, pounds, Fahrenheit) alongside metric equivalents.

### 2.2 Core Personas

| Persona | Demographics | Primary Need | Platform Solution |
|---|---|---|---|
| **Busy Working Parent** | 32–45, manages meals for 4 on a $120/wk budget | Fast weekly dinner prep with common grocery staples | 7-Day Meal Plan Generator + Smart Grocery Planner with pantry sync |
| **Health & Nutrition Beginner** | 22–32, overwhelmed by conflicting social media diet advice | Plain-language, trustworthy dietary guidance | AI Nutrition Chatbot with High Thinking mode + USDA food breakdowns |
| **Metabolic Health & Weight-Conscious Adult** | 35–55, focused on sustained weight regulation and blood sugar | Caloric awareness without deprivation or extreme restriction | Satiety-focused meal plans + daily Food Diary tracking protein & fiber |
| **Active Fitness Enthusiast** | 24–42, tracks macronutrient splits & recovery | High-protein leucine pacing (25–35g/meal) and anti-inflammatory recovery | High-Protein recipe filter + Macro badges + USDA nutrient lookups |
| **Senior & Heart-Health Focused** | 55–70, managing hypertension and arterial elasticity | Low-sodium, high-potassium (DASH) eating patterns | Sodium-to-potassium ratio guides + Registered Dietitian consultations |

---

## 3. User Roles & Permission Matrix (RBAC)

The platform provides 5 clearly defined roles, switchable in real-time for testing and production:

| Capability / Feature | Guest (Public) | Free Member | Premium Member ($9.99/mo) | Registered Dietitian | Super Admin |
|---|:---:|:---:|:---:|:---:|:---:|
| Read Articles & USDA Food Database | ✅ | ✅ | ✅ | ✅ | ✅ |
| Access Tested Recipe Library | ✅ | ✅ | ✅ | ✅ | ✅ |
| AI Nutrition Chatbot | 2 queries/day | 5 queries/day | **Unlimited** (High Thinking) | Unlimited | Unlimited |
| 7-Day AI Meal Plan Generator | Preview only | 1 plan/month | **Unlimited** Custom Plans | Unlimited | Unlimited |
| Smart Recipe Generator (Fridge Staples) | ❌ | 3 recipes/day | **Unlimited** | Unlimited | Unlimited |
| Smart Grocery Planner (Pantry Sync) | ❌ | ❌ | ✅ | ✅ | ✅ |
| Food Diary & Macro Progress Tracker | ❌ | ❌ | ✅ | ✅ | ✅ |
| AI Vision Food Photo Meal Analyzer | ❌ | ❌ | ✅ (10/day) | ✅ | ✅ |
| Nutrition Facts Label Scanner | ❌ | ❌ | ✅ | ✅ | ✅ |
| Weekly AI Habit Coach | ❌ | ❌ | ✅ | ✅ | ✅ |
| Book Registered Dietitians | ❌ | ✅ | ✅ | N/A (Provider) | ✅ |
| Provider Appointments Portal | ❌ | ❌ | ❌ | ✅ | ✅ |
| Admin Operations Console | ❌ | ❌ | ❌ | ❌ | ✅ |

---

## 4. Detailed Feature Specifications

### 4.1 Content & Food Database

#### 4.1.1 Evidence-Based Health Articles
- **Editorial Standard:** Every article is authored by an MD or PhD nutritional biochemist and reviewed by an active Registered Dietitian.
- **Peer-Reviewed References:** Footnotes link directly to PubMed, DOI, and US Dietary Guidelines.
- **Reading Time & Dates:** Real-time reading duration estimate, publication date, and last-reviewed date clearly displayed.
- **Categories:** Digestive Wellness, Heart Health, Weight Management, Sleep & Recovery, Hydration, Energy & Metabolism.

#### 4.1.2 USDA FoodData Central Database
- **Verified Nutrient Profiles:** Exact laboratory values for Calories, Protein, Total Carbs, Dietary Fiber, Sugars, Total Fat, Saturated Fat, Sodium, Vitamin C, Calcium, Iron, and Potassium.
- **Portion Multipliers:** Interactive portion scaler (0.5x, 1x, 1.5x, 2x) updating all Daily Values in real-time.
- **Preparation & Storage Advice:** Evidence-based culinary techniques to preserve heat-sensitive vitamins (e.g. Folate, Vitamin C).
- **Direct Diary Integration:** "Add to Food Diary" button logs the selected food directly into user records.

#### 4.1.3 Tested Healthy Recipe Library
- **Two-Column Interface:** Ingredients list on left with dynamic Serving Calculator (1, 2, 4, 6 persons) updating quantities; step-by-step instructions on right with step timer markers.
- **FDA Nutrition Facts Label:** Authentic FDA-compliant nutrition card with bold borders, % Daily Value (DV), and macro callouts.
- **Allergens & Substitutions:** Clear callouts for top 9 allergens (Dairy, Eggs, Peanuts, Tree Nuts, Fish, Shellfish, Soy, Wheat, Sesame) with safe chef substitutions.
- **Printable Recipe Card:** Dedicated CSS print styles for clean paper export.

#### 4.1.4 7-Day Curated Diet Plans
- **Protocols:** Mediterranean Vitality, High-Protein Metabolic Satiety, DASH Heart-Health, Plant-Forward Longevity.
- **WeeklyCalendar Component:** Monday–Sunday tabs with Breakfast, Lunch, Dinner, Snack slots.
- **One-Click Meal Swap:** Swap any meal with AI-curated alternative maintaining daily caloric and macro targets.
- **"Set as Active Plan":** Syncs the 7-day schedule to the user's dashboard and populates the Smart Grocery Planner.

---

### 4.2 AI Nutrition Intelligence Suite (Gemini Engine)

#### 4.2.1 AI Nutrition Chatbot with High Thinking Mode
- **Dual LLM Architecture:**
  - `gemini-4-argon`: Engaged when High Thinking mode is activated (`thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH }` with no `maxOutputTokens`). Analyzes biochemical pathways, gut microbiome fermentation, and metabolic balance.
  - `gemini-3.8-flash`: Standard mode for fast, high-throughput question-answering.
- **Prompt Starter Chips:** Pre-built quick queries for budget breakfasts, fiber-rich lunches, dinner meal prep, and grocery ideas.
- **Medical Disclaimer Guardrail:** Mandatory clinical boundary statement appended to prevent unauthorized disease diagnosis or treatment claims.

#### 4.2.2 7-Day Meal Plan Generator
- **4-Step Onboarding Questionnaire:**
  1. *Primary Goal:* Balanced Vitality, Weight Management, Lean Muscle, Family Meal Planning.
  2. *Dietary Preferences & Allergies:* Mediterranean, High-Protein, Vegetarian, Vegan, Gluten-Free, Nut Allergies, etc.
  3. *Budget & Kitchen Logistics:* Weekly food budget slider ($35–$220/wk), max daily prep time (15m, 30m, 45m+), cooking skill, and household size.
  4. *Thinking Mode Configuration:* Gemini Thinking mode toggle for multi-step nutritional optimization.
- **Structured JSON Output:** 7 full days of meals with calorie/protein/carb/fat/fiber distributions and consolidated weekly grocery items grouped by department.

#### 4.2.3 Smart Recipe Generator from Fridge Staples
- **Input:** Dynamic ingredient tags from user's fridge/pantry + dietary restrictions + max time limit.
- **Output:** Complete recipe with prep time, cook time, serving count, structured ingredient quantities, step-by-step instructions, and calculated nutrition facts.

#### 4.2.4 Smart Grocery Planner
- **Aisle Organization:** Categorizes items into *Fresh Produce*, *Dairy & Milks*, *Meat & Seafood*, *Pantry & Grains*, and *Frozen Essentials*.
- **Pantry Sync:** User can flag items as "In Pantry" to exclude them from the shopping basket and recalculate total estimated basket cost.
- **Custom Additions:** Form to add ad-hoc items with quantities and departments.

#### 4.2.5 AI Vision Food Photo Meal Analyzer
- **Multimodal Vision:** Accepts base64 encoded user plate photos (camera or gallery upload, max 10MB) or sample plates.
- **Analysis Metrics:** Identified items, estimated portion sizes in US units and grams, calorie range, macronutrients, and healthier preparation tweaks.
- **One-Click Save:** Instantly logs the analyzed meal directly into the user's Food Diary.

#### 4.2.6 Nutrition Facts Label Scanner
- **Label OCR & Analysis:** Uploads or selects packaged food labels.
- **Plain-Language Breakdown:** Explains serving size, total calories, % Daily Value of sodium and saturated fat.
- **Red Flag Alerts:** Identifies hidden added sugars (cane sugar, high fructose corn syrup), excessive sodium (>20% DV), and artificial trans fats.
- **Cleaner Alternatives:** Recommends 2–3 wholesome whole-food alternatives.

#### 4.2.7 AI Progress & Habit Coach
- **Habit Consistency:** Evaluates weekly logging streak and consistency rather than punitive calorie counting.
- **Nutrient Trend Evaluation:** Compares average daily fiber and protein against peer benchmarks.
- **Weekly Micro-Habit:** Recommends one achievable, science-backed lifestyle habit for the upcoming week.

---

### 4.3 Professional Registered Dietitian Services

#### 4.3.1 Dietitian Directory
- **Credential Verification:** All providers are verified Registered Dietitians (RD / RDN / LD) with state licensure.
- **Specializations:** Gastrointestinal Health (IBS/SIBO), Sports Nutrition (CSSD), Diabetes & Insulin Resistance (CDCES), Women's Longevity & Hormones.
- **Transparent Pricing:** Clear consultation fee per 50-minute session.

#### 4.3.2 Telehealth Booking Flow
- **Scheduling:** Interactive calendar date selection and time slot picking.
- **Clinical Reason Intake:** Client specifies medical background and primary consultation objectives.
- **Appointment Portal:** Scheduled sessions appear in user dashboard with direct room access links.

---

### 4.4 User Dashboard & Health Tracker

- **Today's Meal Schedule:** Displays active day meals directly from the user's 7-day meal plan.
- **Daily Food Diary:** Real-time calorie, protein, and fiber progress bars tracking intake against personalized targets.
- **Saved Collection:** One-click access to saved recipes, scientific articles, and diet plans.
- **Settings & Preferences:** Management of health goals, allergies, weekly budget, and subscription tiers.

---

### 4.5 Administration Operations Portal

- **Operations Metrics:** Real-time tracking of Total Registered Users, Active Premium Subscribers, Monthly Recurring Revenue (MRR), and Daily AI Queries.
- **Content Pipeline:** CRUD operations for articles (author/reviewer assignment, status drafting/publishing) and recipe databases.
- **USDA Food Manager:** Food item catalog manager with simulated USDA FoodData Central sync.
- **User Management (RBAC):** Direct assignment of user roles (Free, Premium, Dietitian, Admin).
- **AI Settings:** Model selection (`gemini-4-argon` vs `gemini-3.8-flash`), Thinking level selector (`ThinkingLevel.HIGH`), daily free query quota controls, and mandatory medical guardrail toggles.
- **Platform Analytics:** AI tool adoption percentages, top read articles, and reader engagement times.

---

## 5. Non-Functional & Safety Requirements

| Category | Standard & Specification |
|---|---|
| **Performance** | Initial JavaScript bundle optimized with code-splitting; initial page render < 1.5s. |
| **Mobile Responsiveness** | Fully responsive fluid grid supporting Mobile (375px), Tablet (768px), and Desktop (1280px+). |
| **Accessibility (a11y)** | WCAG 2.1 AA compliant; high-contrast text ratios (minimum 4.5:1), visible 2px keyboard focus indicators, and semantic HTML elements. |
| **Security & Privacy** | HTTPS enforced; API keys strictly contained on backend server (`process.env.GEMINI_API_KEY`); CCPA-aligned data minimization. |
| **Medical Safety Guardrail** | Explicit disclaimers on all AI responses and health content; automated escalation recommending physician/dietitian consultation for high-risk symptoms or medically restricted diets. |

---

*Document approved for NutriWise USA Platform v2.0.*
