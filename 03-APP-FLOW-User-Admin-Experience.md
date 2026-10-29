# NutriWise USA — Application Flow Document
## User & Administrator Experience Map

**Document Version:** 2.0 (Updated & Expanded)  
**Date:** October 2026  
**Status:** Implemented & Production-Ready  

---

## 1. Global Navigation & User Roles Architecture

NutriWise USA implements an accessible, responsive navigation system with real-time **Role Previewing** available directly in the header.

```
                    ┌─────────────────────────┐
                    │    APP ENTRY POINT      │
                    │   nutriwiseusa.com/     │
                    └────────────┬────────────┘
                                 │
           ┌─────────────────────┴─────────────────────┐
           ▼                                           ▼
┌──────────────────────┐                    ┌──────────────────────┐
│  PUBLIC GUEST FLOW   │                    │ LOGGED-IN EXPERIENCE │
│  - Browse Articles   │                    │ - Free Member        │
│  - Browse Recipes    │                    │ - Premium Member     │
│  - USDA Foods DB     │                    │ - Dietitian Provider │
│  - Curated Plans     │                    │ - Super Admin        │
│  - Limited AI (2-5)  │                    │ - Full Dashboard     │
└──────────────────────┘                    └──────────────────────┘
```

---

## 2. Public / Guest Experience Journey

### 2.1 Homepage Journey (`/`)
1. **Hero Section:**
   - Headline: *"Eat smarter. Live better."* in `DM Serif Display`.
   - Floating live nutrition target card (Daily Fiber Goal: 100% reached).
   - Primary Call to Action: **"Get My Free Meal Plan"** (navigates to `/ai/meal-plan-generator`).
   - Secondary Call to Action: **"Browse Curated Plans"** (navigates to `/diet-plans`).
2. **Platform Pillars Strip:** Instant credibility indicators (Peer-Reviewed Evidence, Thinking AI Engine, USDA Laboratory Data, Licensed Dietitians).
3. **AI Tools Showcase:** Interactive teaser cards for Meal Planner, Chatbot with High Thinking, and Recipe Generator.
4. **Trending Recipes Section:** Category tabs (*All*, *Dinner*, *Breakfast*, *Lunch*, *Snack*) with card hover lifts and macro badges.
5. **From the Nutrition Lab:** Highlights peer-reviewed scientific articles with author/reviewer badges.
6. **USDA Food Spotlight:** Verified nutrient density profiles with direct links.
7. **Dietitian Telehealth:** Profile preview cards with consultation fees and booking CTAs.
8. **Weekly Digest Form:** Instant email subscription with validation toast.

### 2.2 Content Discovery & Detail Exploration
- **Articles Flow (`/articles` → `/articles/:slug`):**
  - Search by keyword or filter by Category pill (*Digestive Wellness*, *Heart Health*, *Weight Management*, *Sleep*, *Hydration*, *Energy*).
  - Article Page displays single readable column (max 68 characters per line) with Author credential card, Reviewer verification card, and scientific reference footnotes linking to PubMed/DOI.
  - Save button bookmarks article to user collection.
- **Recipes Flow (`/recipes` → `/recipes/:slug`):**
  - Search by ingredient or filter by meal category, dietary preference, and max cooking time slider.
  - Recipe Page features two-column layout: Sticky left column with interactive **Serving Calculator** (+/- buttons scaling ingredient quantities proportionally) and FDA-compliant Nutrition Facts label; right column with numbered step instructions and clickable timers.
  - One-click print stylesheet formatting for physical kitchen cards.
- **USDA Foods Flow (`/foods` → `/foods/:slug`):**
  - Search or sort by *Highest Fiber*, *Highest Protein*, or *Highest Potassium*.
  - Food Detail Page displays portion multiplier (0.5x, 1x, 1.5x, 2x), complete micronutrient table (Potassium, Calcium, Iron, Vitamin C), preparation and storage advice, and a **"Add to Food Diary"** button.
- **Diet Plans Flow (`/diet-plans` → `/diet-plans/:slug`):**
  - Browse 7-day protocols (e.g. *Balanced Mediterranean Vitality*, *High-Protein Metabolic Satiety*).
  - Detail page offers interactive **WeeklyCalendar** with Monday–Sunday tabs, meal slot cards, swap alternative modal, and consolidated grocery list view.
  - **"Set as My Active Plan"** instantly sets the plan as active in the user dashboard.

---

## 3. Member Authentication & Onboarding Flow

```
[ Click Sign In / Get Started ]
            │
            ├── Sign In (`/login`)
            │     ├── Enter Email & Password
            │     ├── Or Click Quick Role Preview: [Free] [Premium] [Dietitian] [Admin]
            │     └── Redirect to `/dashboard` (or `/admin` if Admin)
            │
            ├── Sign Up (`/signup`)
            │     ├── Full Name, Email, Password (min 8 chars)
            │     ├── Select Primary Health Focus (Balanced, Weight, Muscle, Family)
            │     └── Auto-login with Welcome Toast → `/dashboard`
            │
            └── Forgot Password (`/forgot-password`)
                  ├── Enter registered email
                  └── Instant confirmation screen with secure reset link instructions
```

---

## 4. Interactive AI Tools Experience

### 4.1 AI Nutrition Chatbot (`/ai/chatbot`)
```
[ Open Chatbot Page ]
        │
        ├── State Check:
        │     - Guest / Free: Tracks queries used today (e.g. "2/5 queries today")
        │     - Premium: "Unlimited Premium"
        │
        ├── User Toggles "Thinking Mode":
        │     - Checked: Activates gemini-4-argon with ThinkingLevel.HIGH
        │     - Unchecked: Uses gemini-3.8-flash for fast answers
        │
        ├── User inputs question OR clicks Starter Chip:
        │     - "Give me healthy breakfast ideas under $5"
        │     - "High-fiber vegetarian lunch recipes"
        │     - "How to prepare healthier meals with chicken and rice"
        │
        ├── Loading State:
        │     - Displays animated indicator: "Evaluating biochemical pathways and dietary trade-offs..."
        │
        └── Response Bubble Rendered:
              - AI avatar with leaf icon
              - High Thinking badge when enabled
              - Actionable evidence-based recommendations
              - Mandatory medical education disclaimer footer
```

### 4.2 7-Day Meal Plan Generator (`/ai/meal-plan-generator`)
```
[ Step 1: Goal Selection ]
  Choose: Balanced Vitality | Weight Management | Lean Muscle | Family Meal Planning
  Set: Age Range (e.g. 26-35) & Activity Level (e.g. Moderate)
        │
[ Step 2: Dietary Preferences & Allergies ]
  Select Tags: Mediterranean, High-Protein, Vegetarian, Gluten-Free, Dairy-Free...
  Select Allergies: Peanuts, Tree Nuts, Shellfish, Dairy, Soy, Wheat...
        │
[ Step 3: Budget & Kitchen Logistics ]
  Adjust Weekly Budget Slider: $35/wk to $220/wk
  Choose Max Daily Prep Time: Under 15m | Under 30m | 45m+
  Choose Skill Level: Beginner | Intermediate | Advanced
  Choose Household Size: 1, 2, 4, 6 persons
        │
[ Step 4: AI Model & Thinking Mode Configuration ]
  Enable High Thinking Mode: gemini-4-argon with ThinkingLevel.HIGH
  Click "Generate My 7-Day Plan"
        │
[ Generation Loading State (3–6 seconds) ]
        │
[ Full 7-Day Output Displayed ]
  ├── Monday–Sunday Day Selector Tabs with daily calorie summaries
  ├── 4 Meal Slots per day (Breakfast, Lunch, Dinner, Snack)
  ├── Daily Macro Bar (Calories, Protein, Carbs, Fat, Fiber)
  ├── "Swap Meal" button per slot opening alternative suggestions
  ├── Recipe links for tested dishes
  └── Action Buttons: [Set as Active Plan] [Re-run Questionnaire]
```

### 4.3 Smart Recipe Generator (`/ai/recipe-generator`)
1. User enters ingredients currently in fridge/pantry (e.g. *Eggs*, *Spinach*, *Sweet Potato*, *Olive Oil*).
2. Selects dietary tags (*High-Protein*, *Vegetarian*, *Under 20 min*).
3. Sets cooking time limit (10–45 mins).
4. Toggles High Thinking Mode.
5. Clicks **"Generate Tested Recipe"**.
6. Recipe rendered complete with prep time, servings, macro badges, ingredients with safe substitutions, step-by-step instructions with timers, and storage advice.

### 4.4 Smart Grocery Planner (`/ai/grocery-planner`)
1. Automatically populates ingredients from active 7-Day Meal Plan.
2. Grouped into store aisles: *Fresh Produce*, *Dairy & Milks*, *Meat & Seafood*, *Pantry & Grains*, *Frozen Essentials*.
3. User checks off purchased items (strikethrough and opacity change).
4. User clicks **Home icon ("In Pantry")** on items they already own:
   - Item is marked in pantry and excluded from the active basket calculation.
   - User can toggle **"Hide items marked In Pantry"** for a clean shopping view.
5. Real-time **Est. Basket Total ($)** updates dynamically.
6. User can add ad-hoc custom items with quantity and department.

### 4.5 AI Vision Food Photo Meal Analyzer (`/ai/photo-analyzer`)
1. User uploads meal photo from phone/desktop (or selects one of 3 sample tested meals).
2. Vision model inspects the plate image.
3. Output reveals:
   - Identified plate components and estimated portion weights.
   - Calorie density range (e.g. *440–540 kcal, average 490 kcal*).
   - Macronutrient badges (Protein, Carbs, Fat, Fiber).
   - Healthier preparation tweaks (e.g. adding citrus to boost iron absorption).
4. User clicks **"Save to Diary"** to log the meal directly into their daily food record.

### 4.6 Nutrition Facts Label Scanner (`/ai/label-scanner`)
1. User uploads or selects packaged food label photo.
2. AI OCR decodes serving size and macro numbers.
3. System highlights **Watch Out For** red flags (e.g. added sugars >20% DV, elevated sodium).
4. Recommends cleaner, whole-food alternatives.

---

## 5. Member Dashboard & Health Tracker Experience

### 5.1 Dashboard Home (`/dashboard`)
- Personalized welcome greeting with active plan summary.
- 4 Quick Metric Cards:
  - **Today's Calories:** Logged vs Daily Goal progress meter.
  - **Active Streak:** Consecutive days of food awareness.
  - **Saved Recipes:** Count of bookmarked favorites.
  - **Dietary Profile:** Active weekly budget and primary health focus.
- **Today's Schedule:** Direct preview of today's 4 scheduled meals.
- **Recent Diary Entries:** Summary with quick entry button.

### 5.2 Daily Food Diary (`/dashboard/diary`)
- Daily progress meters for **Calories**, **Protein**, and **Dietary Fiber**.
- Categorized meal sections (*Breakfast*, *Lunch*, *Dinner*, *Snack*).
- Click **"Log Meal"** to open modal with food name, portion, and calculated macros.
- Remove entries anytime with instant totals recalculation.

### 5.3 Weekly Progress & AI Habit Coach (`/dashboard/progress`)
- **AI Coach Weekly Review:** Empathetic report card (*Consistency Grade: A*).
- **Weekly Highlight:** Positive reinforcement on fiber and food variety.
- **Next Week's Micro-Habit:** Achievable science-backed habit suggestion.
- **7-Day Trend Grid:** Mon–Sun history of logged fiber and protein.

### 5.4 Saved Content (`/dashboard/saved`)
- Tabbed view switching between **Saved Recipes** and **Saved Articles**.
- Un-bookmark items with immediate list update.

### 5.5 Account & Nutrition Settings (`/dashboard/settings`)
- View and manage Membership Tier (Free vs Premium with one-click toggle).
- Edit Full Name, Health Goal, Household Size, Weekly Food Budget slider, and Default Dietary Preferences.

---

## 6. Dietitian Telehealth Experience

```
[ Nutritionist Services Directory (`/nutritionist-services`) ]
  ├── Filter by Specialty: Gut & GI | Weight Management | Sports | Hormones
  ├── Browse Verified Dietitian Cards (RD, RDN, LD credentials)
  └── Click "View Profile" OR "Book"
            │
[ Dietitian Profile (`/nutritionist-services/:id`) ]
  ├── Credentials, clinical bio, and verified reviews
  ├── 50-minute session fee ($135–$165)
  └── Click "Book Consultation"
            │
[ Booking Flow (`/nutritionist-services/:id/book`) ]
  ├── Step 1: Pick calendar date (from tomorrow onwards)
  ├── Step 2: Select time slot (9:00 AM, 10:00 AM, 1:00 PM, 2:30 PM...)
  ├── Step 3: Enter clinical visit reason & background
  ├── Step 4: Review fee summary and click "Confirm & Book Consultation"
  └── Success Toast + Redirect to Appointments Portal
            │
[ My Appointments (`/dashboard/appointments`) ]
  ├── Shows scheduled consultation card with date, time, and dietitian name
  └── Click "Join Telehealth Room"
```

---

## 7. Super Administrator Experience (`/admin/*`)

### 7.1 Admin Overview (`/admin`)
- Operations metric cards: *Total Registered Users*, *Premium Subscribers*, *Monthly Recurring Revenue (MRR)*, and *Daily AI Queries*.
- Content pipeline overview: Live article counts, recipe counts, and USDA food records.
- AI system telemetry: Model status, Thinking Mode confirmation, and latency monitoring.

### 7.2 Content & Record Management
- **Articles Management (`/admin/articles`):** View all articles, view count, author, and reviewer. Click "New Article" to open modal and publish instantly.
- **Recipe Database (`/admin/recipes`):** Inspect tested recipes, calorie counts, protein density, and estimated cost per serving.
- **USDA Food Items (`/admin/foods`):** Inspect USDA FDC IDs, default serving weights, fiber, and potassium values. Click "Sync with USDA API".
- **User Accounts (`/admin/users`):** View all registered users and change roles (*Free*, *Premium*, *Dietitian*, *Super Admin*) with immediate permission updates.
- **AI Models & Prompts (`/admin/ai-settings`):** Switch default thinking model (`gemini-4-argon` vs `gemini-3.8-flash`), set Thinking Level (`HIGH`, `MEDIUM`, `LOW`), configure Free Tier daily query limits, and enforce medical disclaimers.
- **Platform Analytics (`/admin/analytics`):** Breakdown of AI tool adoption percentages, top read articles, and reader engagement times.

---

*Document approved for NutriWise USA Platform v2.0.*
