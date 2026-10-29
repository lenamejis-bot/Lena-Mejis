# App Flow — User & Admin Experience
## NutriWise USA — Health & Nutrition Platform

**Version:** 1.0  
**Date:** October 2026  
**Status:** Approved for Development

---

## 1. Authentication Flow

### 1.1 Sign Up
```
Landing Page / Any Page
        │
        ▼
Click "Sign Up" (header CTA)
        │
        ▼
Sign Up Page
  ├── Full Name
  ├── Email Address
  ├── Password (min 8 chars)
  └── "Continue with Google" option
        │
        ▼
Email Confirmation Sent
  └── Toast: "Check your email to confirm your account"
        │
        ▼
User clicks link in email
        │
        ▼
Email confirmed → Auto-login → User Dashboard
  └── First-time: Onboarding Questionnaire (optional, skippable)
```

### 1.2 Login
```
Login Page
  ├── Email + Password → Submit
  ├── "Continue with Google"
  └── "Forgot Password?" link
        │
   ┌────┴────────────────────┐
   │                         │
Success                    Error
   │                         │
   ▼                         ▼
Redirect to:          "Invalid credentials"
 - Previous page        Stay on login page
 - OR Dashboard         Offer "Forgot Password"
```

### 1.3 Forgot Password
```
Forgot Password Page
  └── Enter email → Submit
        │
        ▼
"Reset link sent" message (shown even if email not found — security)
        │
        ▼
User clicks email link → Reset Password Page
  └── New password + confirm → Submit
        │
        ▼
Success → Redirect to Login
```

### 1.4 Session Management
- JWT auto-refresh via Supabase
- Persistent session (remember me — default ON)
- Auto-logout after 30 days of inactivity
- Protected routes redirect to login with return URL

---

## 2. Guest User Flow (Not Logged In)

### 2.1 Home Page Journey
```
Home Page
  ├── Hero Section: "Eat Smarter, Live Better"
  │     └── CTA: "Get My Free Meal Plan" → Sign Up
  ├── Popular Articles (3 visible, "View All" → Articles page)
  ├── Trending Recipes (6 cards, clickable)
  ├── AI Chatbot Teaser → Click → Sign Up prompt
  ├── Featured Diet Plans → Click → Diet Plans page
  ├── Newsletter Signup (email only, no account needed)
  └── Footer: Links to all main sections
```

### 2.2 Content Browsing (Fully Public)
```
Articles / Blog
  ├── Category filters (Sleep, Heart Health, Digestion, etc.)
  ├── Search articles
  ├── Click article → Full article page
  │     ├── Author info + credentials
  │     ├── Reviewer info
  │     ├── Publish + last-reviewed date
  │     ├── References section
  │     ├── Related articles
  │     └── "Save Article" → Requires login
  └── Pagination

Recipes
  ├── Filter by: Category | Time | Diet | Budget
  ├── Search recipes
  ├── Click recipe → Full recipe page
  │     ├── Ingredients (US measures)
  │     ├── Step-by-step instructions
  │     ├── Nutrition facts card
  │     ├── Serving size adjuster
  │     ├── "Save Recipe" → Requires login
  │     └── Print recipe card
  └── Load more / Pagination

Foods Database
  ├── Search food items
  ├── Browse by category
  ├── Click food → Food detail page
  │     ├── Nutrition facts table
  │     ├── Serving size selector
  │     ├── Preparation guide
  │     ├── Related recipes
  │     └── Food comparison
  └── "Add to Food Diary" → Requires login

Diet Plans
  ├── Browse plan types
  ├── Click plan → Plan overview
  │     ├── 7-day sample calendar (read-only)
  │     ├── Linked recipes preview
  │     └── "Start This Plan" → Requires login
  └── Download sample PDF (email required)
```

### 2.3 AI Tools — Guest Limits
```
Click any AI tool (Chatbot, Meal Planner, etc.)
        │
        ▼
If Guest:
  ├── Chatbot: 2 free queries shown → Then "Sign up for more"
  ├── Meal Plan Generator: Preview only → "Sign up to generate"
  └── Other AI tools: "Create free account to access"
```

---

## 3. Free Member Flow (Logged In, Free Tier)

### 3.1 User Dashboard
```
Dashboard (post-login home)
  ├── Welcome back, [Name]
  ├── Quick Stats: Saved recipes | Active meal plan | Days streak
  ├── Today's Meal Plan (if active)
  ├── Recent Food Diary entries
  ├── Recommended Articles (based on saved interests)
  ├── Upgrade to Premium CTA banner
  └── Quick access: [Chatbot] [Recipes] [Foods] [Diet Plans]
```

### 3.2 AI Chatbot (5 queries/day)
```
AI Chatbot Page
  ├── Chat interface (WhatsApp-style)
  ├── Suggested starter questions shown
  ├── User types question → Send
  │     ├── AI responds with text
  │     ├── AI may include: recipe links, article links, food page links
  │     └── "Was this helpful?" feedback buttons
  ├── Query counter visible: "3 of 5 daily queries used"
  ├── At limit: "You've used today's free queries. Upgrade for unlimited."
  └── Conversation history saved for 7 days
```

### 3.3 Meal Plan Generator (1 plan/month)
```
"Create Meal Plan" button
        │
        ▼
Onboarding Questionnaire (multi-step)
  Step 1: Goal selection
  Step 2: Dietary preferences + allergies
  Step 3: Budget + cooking time
  Step 4: Food likes/dislikes + household size
        │
        ▼
"Generating your plan..." loading state (5–10 seconds)
        │
        ▼
7-Day Meal Plan displayed
  ├── Mon–Sun calendar tabs
  ├── Each day: Breakfast | Lunch | Dinner | Snacks
  ├── Each meal: Name, image, time, calories
  ├── Click meal → Recipe detail
  ├── "Replace this meal" → AI suggests alternative
  ├── Daily nutrition summary bar
  ├── Weekly grocery list (collapsible)
  └── "Save Plan" → Saves to dashboard
        │
  At monthly limit:
  └── "Upgrade to Premium for unlimited plans"
```

### 3.4 Saved Content
```
Dashboard → "My Saves"
  ├── Saved Recipes (grid view)
  ├── Saved Articles (list view)
  ├── Saved Diet Plans
  └── Remove from saves option
```

---

## 4. Premium Member Flow

### 4.1 Upgrade Flow
```
Upgrade CTA click (anywhere in app)
        │
        ▼
Subscription Plans Page
  ├── Free vs Premium comparison table
  ├── Monthly ($9.99) or Annual ($79.99 — save 33%) toggle
  └── "Upgrade Now" button
        │
        ▼
Stripe Checkout (redirect)
  ├── Card details
  └── Confirm payment
        │
        ▼
Stripe Webhook → Supabase updates user role to "premium"
        │
        ▼
Redirect back to Dashboard with success toast
"Welcome to Premium! All features unlocked."
```

### 4.2 Smart Grocery Planner
```
Grocery Planner (from meal plan or standalone)
        │
        ▼
Auto-populated from active meal plan
  ├── Organized by: Produce | Dairy | Meat | Pantry | Frozen
  ├── Item quantities combined
  ├── Check off items as purchased
  ├── "I already have this" → removes from list
  ├── Budget mode: swap expensive items with alternatives
  ├── Edit quantities manually
  ├── Add custom items
  ├── Print list button
  └── Export as PDF button
```

### 4.3 Food Diary
```
Food Diary (My Diary)
  ├── Date navigator (today by default)
  ├── Add food entries:
  │     ├── Search food database → Add
  │     ├── "Add from recipe" option
  │     └── Upload photo → AI analyzes → Confirm entry
  ├── Meal sections: Breakfast | Lunch | Dinner | Snacks
  ├── Daily nutrition summary:
  │     └── Calories | Protein | Carbs | Fat | Fiber (progress bars)
  └── Export diary as PDF
```

### 4.4 AI Progress Coach
```
Progress tab in Dashboard
  ├── This Week's Summary:
  │     ├── Days with logged meals
  │     ├── Estimated avg. protein / fiber
  │     └── Habit streak
  ├── AI Coach Message (weekly, AI-generated):
  │     ├── "You logged meals 5/7 days — great consistency!"
  │     └── "Consider adding more fiber-rich foods this week."
  ├── Weekly nutrition trend charts
  └── Personalized article recommendations
```

### 4.5 Food Photo Analyzer
```
"Analyze a Meal Photo"
        │
        ▼
Upload photo (camera or file)
        │
        ▼
"Analyzing your meal..." (5–8 seconds)
        │
        ▼
Results:
  ├── Identified foods listed
  ├── Estimated portion sizes
  ├── Calorie range (e.g., "400–550 calories estimated")
  ├── Macros breakdown (approximate)
  ├── "Healthier prep suggestions" section
  ├── Edit any item or quantity manually
  └── "Add to Food Diary" button
```

### 4.6 Food Label Scanner
```
"Scan a Food Label"
        │
        ▼
Upload photo of Nutrition Facts label
        │
        ▼
"Reading label..." (3–5 seconds)
        │
        ▼
Results:
  ├── Serving size explanation
  ├── Per-serving breakdown (calories, protein, carbs, fat, fiber, sodium)
  ├── Ingredient list simplified explanation
  ├── Red flags highlighted (high sodium, added sugars, etc.)
  └── "Similar healthier alternatives" suggestions
```

---

## 5. Dietitian Services Flow

### 5.1 Browse Dietitians
```
Nutritionist Services page
  ├── Filter by: Specialization | Availability | Language
  ├── Dietitian cards: Photo, name, credentials, specialization, rating
  └── Click card → Dietitian Profile Page
        │
        ▼
Profile Page:
  ├── Full bio + credentials (RD clearly shown)
  ├── Specializations list
  ├── Consultation types and prices
  ├── Reviews from past clients
  └── "Book a Consultation" button
```

### 5.2 Book Consultation
```
"Book a Consultation"
        │
        ▼
Select date + time from calendar
        │
        ▼
Enter reason for consultation (brief form)
        │
        ▼
Stripe payment → Confirm booking
        │
        ▼
Confirmation email (user + dietitian)
        │
        ▼
Appointment in user dashboard "My Appointments"
  └── Reminder email 24 hours before
```

---

## 6. Admin Flow

### 6.1 Admin Login
```
/admin/login (separate from user login)
  └── Email + password (admin accounts only)
        │
        ▼
Role check → If not admin or editor → Redirect to home
        │
        ▼
Admin Dashboard
```

### 6.2 Admin Dashboard
```
Admin Dashboard (/admin)
  ├── Stats: Total users | Premium subscribers | Revenue | New signups today
  ├── Recent content published
  ├── AI usage stats (queries today / this month)
  ├── Recent user signups
  └── Quick actions: [New Article] [New Recipe] [View Users]
```

### 6.3 Content Management Flow
```
Admin → Articles
  ├── Article list (title | author | status | date)
  ├── Search + filter by status (draft / published / archived)
  ├── "New Article" button
  │     ├── Rich text editor (TipTap or similar)
  │     ├── Fields: Title, Slug, Author, Reviewer, Category, Tags
  │     ├── SEO: Meta title, Meta description, OG image
  │     ├── References section
  │     ├── Publication date + "Last reviewed" date
  │     ├── Save as draft | Publish | Schedule
  │     └── Preview before publish
  └── Edit / Archive existing articles

Admin → Recipes (same flow as articles, plus):
  ├── Ingredients editor (structured, not free text)
  ├── Step-by-step instructions
  ├── Nutrition data entry
  └── Recipe image upload

Admin → Food Database
  ├── List all foods (searchable)
  ├── Add food manually OR import from USDA API
  │     └── Search USDA → Select → Import data
  └── Edit / review existing food entries
```

### 6.4 User Management
```
Admin → Users
  ├── User list (email | name | role | joined | subscription status)
  ├── Search by email or name
  ├── Click user → User detail view
  │     ├── Profile information
  │     ├── Subscription status + history
  │     ├── AI usage stats
  │     └── Actions: [Change role] [Suspend] [Delete] [Reset password]
  └── Export user list (CSV)
```

### 6.5 AI Management
```
Admin → AI Settings
  ├── System prompt editor per AI tool
  ├── Model selection (Cloudflare Workers AI models)
  ├── Usage limits per user tier
  ├── AI response log viewer:
  │     ├── Recent conversations (anonymized option)
  │     ├── Flag/unflag responses
  │     └── Mark as quality issue
  └── AI quota usage dashboard (per day/month)
```

### 6.6 Analytics
```
Admin → Analytics
  ├── Traffic: Page views | Sessions | Bounce rate | Top pages
  ├── Users: New signups | Active users | Retention
  ├── Revenue: MRR | New subscribers | Churn rate
  ├── AI Usage: Total queries | By tool | By user tier
  └── Content: Top articles | Top recipes | Top foods
```

---

## 7. Page Navigation Map

```
PUBLIC PAGES (No login required)
├── / (Home)
├── /articles (Blog index)
│   └── /articles/[slug]
├── /recipes (Recipe index)
│   └── /recipes/[slug]
├── /foods (Foods database)
│   └── /foods/[food-name]
├── /diet-plans (Diet plans)
│   └── /diet-plans/[plan-slug]
├── /nutritionist-services
│   └── /nutritionist-services/[dietitian-id]
├── /ai-tools (Tools overview page)
├── /about
├── /contact
├── /faq
├── /search
├── /login
├── /signup
├── /forgot-password
├── /reset-password
├── /subscription-plans
├── /privacy-policy
├── /terms-of-service
└── /medical-disclaimer

PROTECTED PAGES (Login required)
├── /dashboard
├── /dashboard/meal-plan
├── /dashboard/diary
├── /dashboard/progress
├── /dashboard/grocery-list
├── /dashboard/saved
├── /dashboard/appointments
├── /dashboard/settings
│   ├── /dashboard/settings/profile
│   ├── /dashboard/settings/preferences
│   ├── /dashboard/settings/subscription
│   └── /dashboard/settings/privacy
├── /ai/chatbot
├── /ai/meal-plan-generator
├── /ai/recipe-generator
├── /ai/grocery-planner
├── /ai/photo-analyzer (Premium only)
├── /ai/label-scanner (Premium only)
└── /ai/progress-coach (Premium only)

ADMIN PAGES
├── /admin
├── /admin/articles
├── /admin/recipes
├── /admin/foods
├── /admin/diet-plans
├── /admin/users
├── /admin/ai-settings
├── /admin/dietitians
├── /admin/analytics
├── /admin/email-campaigns
└── /admin/settings
```

---

## 8. Key UX States

### 8.1 Loading States
- Skeleton screens for content lists (articles, recipes, foods)
- Spinner with message for AI tool responses ("Analyzing your meal...")
- Progress indicator for multi-step forms (questionnaire)
- Skeleton for dashboard stats

### 8.2 Empty States
- No saved recipes: "You haven't saved any recipes yet. [Browse Recipes]"
- No food diary entries: "Start logging your meals to track nutrition. [Add Meal]"
- No active meal plan: "Create your personalized meal plan. [Get Started]"
- No search results: "No results for '[query]'. Try different keywords."

### 8.3 Error States
- AI tool error: "Something went wrong. Please try again." + Retry button
- Network error: Toast notification "Check your internet connection"
- Payment failed: Clear message + link to update payment method
- Upload too large: "Photo must be under 10MB. Please compress and try again."
- Form validation: Inline field-level error messages

### 8.4 Success States
- Recipe saved: Toast "Recipe saved to your collection ✓"
- Meal plan created: Full plan displayed with success banner
- Subscription upgraded: "Welcome to Premium!" banner on dashboard
- Appointment booked: Confirmation page + email sent notification
- Article published (admin): Toast "Article published successfully ✓"

---

## 9. Permissions Summary

| Action | Guest | Free | Premium | Admin |
|---|---|---|---|---|
| Read articles / recipes / foods | ✅ | ✅ | ✅ | ✅ |
| Save recipes / articles | ❌ | ✅ | ✅ | ✅ |
| AI chatbot (limited) | ✅ 2/day | ✅ 5/day | ✅ Unlimited | ✅ |
| Meal plan generator | Preview only | ✅ 1/month | ✅ Unlimited | ✅ |
| Recipe generator | ❌ | ✅ 3/day | ✅ Unlimited | ✅ |
| Grocery planner | ❌ | ❌ | ✅ | ✅ |
| Food diary | ❌ | ❌ | ✅ | ✅ |
| Photo analyzer | ❌ | ❌ | ✅ 10/day | ✅ |
| Label scanner | ❌ | ❌ | ✅ | ✅ |
| Progress coach | ❌ | ❌ | ✅ | ✅ |
| Book dietitian | ❌ | ✅ | ✅ | ✅ |
| Admin panel | ❌ | ❌ | ❌ | ✅ |

---

*Document Owner: UX Lead*  
*Last Updated: October 2026*  
*Consistent with: PRD v1.0, TRD v1.0*
