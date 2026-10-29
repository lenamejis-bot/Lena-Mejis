# Backend Schema & Database DDL Specification
## NutriWise USA — Health & Nutrition Platform

**Document Identifier:** NW-DB-005  
**Version:** 2.0 (Production Relational Architecture & RLS Specification)  
**Date:** October 2026  
**Status:** Approved for Development & Implementation  
**Database Engine:** PostgreSQL 16 (Managed via Supabase)  
**Extensions:** `uuid-ossp`, `pg_trgm`, `btree_gist`

---

## 1. Relational Architecture & Entity-Relationship Map

```
auth.users (Supabase Identity)
    │
    ▼
profiles ────────────────── subscriptions ──► payments
    │ (1:N)                       │
    ├── saved_recipes             └── Stripe Customer Linking
    ├── saved_articles
    ├── saved_diet_plans
    ├── food_diary_entries
    ├── ai_usage_logs
    ├── meal_plans ──────── meal_plan_days ──── meal_plan_meals
    │                             │                   │
    ├── grocery_lists ───── grocery_list_items        └── FK to recipes
    │                             │
    │                             └── FK to foods
    └── appointments ────── dietitians ──────── dietitian_availability
                                  │
                                  └── dietitian_reviews

articles ─── article_categories ─── article_tags
recipes ──── recipe_ingredients ─── recipe_steps ─── recipe_ratings
foods ────── food_categories ────── food_nutrients (USDA Analytical Ref)
audit_logs (Immutable compliance trail)
```

---

## 2. Table Schemas, Constraints & Indexes

### 2.1 Identity, Users & Subscriptions

#### `profiles` (Extended User Metadata)
```sql
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text,
  avatar_url text,
  role text NOT NULL DEFAULT 'free' 
    CHECK (role IN ('guest', 'free', 'premium', 'dietitian', 'editor', 'admin')),
  dietary_preferences text[] DEFAULT '{}',
  food_allergies text[] DEFAULT '{}',
  weekly_budget numeric(10,2) CHECK (weekly_budget >= 0),
  household_size int DEFAULT 1 CHECK (household_size >= 1 AND household_size <= 20),
  cooking_skill text CHECK (cooking_skill IN ('beginner', 'intermediate', 'advanced')),
  health_goal text CHECK (health_goal IN ('weight_management', 'balanced', 'muscle', 'family', 'heart_health')),
  age_range text CHECK (age_range IN ('18-25', '26-35', '36-50', '51-65', '65+')),
  activity_level text CHECK (activity_level IN ('sedentary', 'light', 'moderate', 'active', 'very_active')),
  newsletter_subscribed boolean DEFAULT false,
  onboarding_completed boolean DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_profiles_role ON public.profiles(role);
CREATE INDEX idx_profiles_email ON public.profiles(email);
```

#### `subscriptions` (Billing & Plan Records)
```sql
CREATE TABLE public.subscriptions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  stripe_customer_id text UNIQUE NOT NULL,
  stripe_subscription_id text UNIQUE,
  plan text NOT NULL CHECK (plan IN ('free', 'premium_monthly', 'premium_annual')),
  status text NOT NULL CHECK (status IN ('active', 'canceled', 'past_due', 'trialing', 'incomplete')),
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_subscriptions_user ON public.subscriptions(user_id);
CREATE INDEX idx_subscriptions_stripe_customer ON public.subscriptions(stripe_customer_id);
```

---

### 2.2 Content: Articles, Recipes & Foods

#### `articles` (Evidence-Based Health Knowledge Base)
```sql
CREATE TABLE public.articles (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  excerpt text,
  content text NOT NULL,
  cover_image_url text,
  author_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  reviewer_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  category text NOT NULL CHECK (category IN (
    'weight-management', 'heart-health', 'digestion', 'energy', 'sleep', 'hydration'
  )),
  tags text[] DEFAULT '{}',
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at timestamptz,
  last_reviewed_at timestamptz,
  reading_time_minutes int DEFAULT 5,
  meta_title text,
  meta_description text,
  og_image_url text,
  references jsonb DEFAULT '[]'::jsonb,
  view_count int DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_articles_slug ON public.articles(slug);
CREATE INDEX idx_articles_published_at ON public.articles(published_at DESC) WHERE status = 'published';
CREATE INDEX idx_articles_search ON public.articles USING gin(to_tsvector('english', title || ' ' || excerpt || ' ' || content));
```

#### `recipes` (Standardized US Tested Recipes)
```sql
CREATE TABLE public.recipes (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  cover_image_url text,
  category text NOT NULL CHECK (category IN ('breakfast', 'lunch', 'dinner', 'snack', 'meal-prep')),
  prep_time_minutes int NOT NULL CHECK (prep_time_minutes >= 0),
  cook_time_minutes int NOT NULL DEFAULT 0 CHECK (cook_time_minutes >= 0),
  total_time_minutes int GENERATED ALWAYS AS (prep_time_minutes + cook_time_minutes) STORED,
  servings int NOT NULL DEFAULT 4 CHECK (servings >= 1),
  difficulty text DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard')),
  calories_per_serving numeric(8,2) NOT NULL,
  protein_g numeric(8,2) NOT NULL,
  carbs_g numeric(8,2) NOT NULL,
  fat_g numeric(8,2) NOT NULL,
  fiber_g numeric(8,2) NOT NULL,
  sodium_mg numeric(8,2) NOT NULL,
  dietary_tags text[] DEFAULT '{}',
  allergens text[] DEFAULT '{}',
  storage_instructions text,
  author_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  rating_avg numeric(3,2) DEFAULT 0,
  rating_count int DEFAULT 0,
  meta_title text,
  meta_description text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_recipes_slug ON public.recipes(slug);
CREATE INDEX idx_recipes_category ON public.recipes(category);
CREATE INDEX idx_recipes_dietary_tags ON public.recipes USING gin(dietary_tags);
CREATE INDEX idx_recipes_search ON public.recipes USING gin(to_tsvector('english', title || ' ' || description));
```

#### `recipe_ingredients` & `recipe_steps`
```sql
CREATE TABLE public.recipe_ingredients (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  recipe_id uuid NOT NULL REFERENCES public.recipes(id) ON DELETE CASCADE,
  name text NOT NULL,
  quantity numeric(8,3),
  unit text CHECK (unit IN ('tsp', 'tbsp', 'cup', 'oz', 'fl oz', 'lb', 'g', 'ml', 'clove', 'piece', 'pinch', 'can')),
  notes text,
  is_optional boolean DEFAULT false,
  substitution text,
  sort_order int NOT NULL DEFAULT 1
);

CREATE TABLE public.recipe_steps (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  recipe_id uuid NOT NULL REFERENCES public.recipes(id) ON DELETE CASCADE,
  step_number int NOT NULL,
  instruction text NOT NULL,
  image_url text,
  timer_minutes int,
  UNIQUE(recipe_id, step_number)
);

CREATE TABLE public.recipe_ratings (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  recipe_id uuid NOT NULL REFERENCES public.recipes(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  rating int NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text text,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(recipe_id, user_id)
);
```

#### `foods` (USDA FoodData Central Reference Foods)
```sql
CREATE TABLE public.foods (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  usda_fdc_id int UNIQUE,
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  category text NOT NULL,
  image_url text,
  description text,
  default_serving_size numeric(8,2) NOT NULL DEFAULT 100,
  default_serving_unit text NOT NULL DEFAULT 'g',
  calories numeric(8,2) NOT NULL,
  protein_g numeric(8,2) NOT NULL,
  total_carbs_g numeric(8,2) NOT NULL,
  fiber_g numeric(8,2) NOT NULL DEFAULT 0,
  total_sugars_g numeric(8,2) NOT NULL DEFAULT 0,
  total_fat_g numeric(8,2) NOT NULL,
  saturated_fat_g numeric(8,2) NOT NULL DEFAULT 0,
  sodium_mg numeric(8,2) NOT NULL DEFAULT 0,
  potassium_mg numeric(8,2) DEFAULT 0,
  calcium_mg numeric(8,2) DEFAULT 0,
  iron_mg numeric(8,2) DEFAULT 0,
  preparation_methods text,
  storage_instructions text,
  common_allergens text[] DEFAULT '{}',
  health_benefits text,
  data_source text DEFAULT 'usda' CHECK (data_source IN ('usda', 'manual')),
  last_verified_at timestamptz DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_foods_slug ON public.foods(slug);
CREATE INDEX idx_foods_name_trgm ON public.foods USING gin(name gin_trgm_ops);
```

---

### 2.3 User Data: Saved Items, Meal Plans, Diary & Grocery Lists

#### `saved_recipes`, `saved_articles`, `saved_diet_plans`
```sql
CREATE TABLE public.saved_recipes (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  recipe_id uuid NOT NULL REFERENCES public.recipes(id) ON DELETE CASCADE,
  saved_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, recipe_id)
);

CREATE TABLE public.saved_articles (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  article_id uuid NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
  saved_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, article_id)
);
```

#### `meal_plans`, `meal_plan_days`, `meal_plan_meals`
```sql
CREATE TABLE public.meal_plans (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  goal text,
  dietary_preferences text[] DEFAULT '{}',
  calories_target numeric(8,2),
  generated_by text DEFAULT 'ai' CHECK (generated_by IN ('ai', 'manual', 'professional')),
  is_active boolean DEFAULT true,
  week_start_date date,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.meal_plan_days (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  meal_plan_id uuid NOT NULL REFERENCES public.meal_plans(id) ON DELETE CASCADE,
  day_of_week int NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6), -- 0=Mon, 6=Sun
  total_calories numeric(8,2),
  total_protein_g numeric(8,2),
  total_carbs_g numeric(8,2),
  total_fat_g numeric(8,2),
  total_fiber_g numeric(8,2),
  UNIQUE(meal_plan_id, day_of_week)
);

CREATE TABLE public.meal_plan_meals (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  day_id uuid NOT NULL REFERENCES public.meal_plan_days(id) ON DELETE CASCADE,
  meal_type text NOT NULL CHECK (meal_type IN ('breakfast', 'lunch', 'dinner', 'snack')),
  recipe_id uuid REFERENCES public.recipes(id) ON DELETE SET NULL,
  custom_meal_name text,
  servings numeric(4,1) DEFAULT 1,
  calories numeric(8,2),
  protein_g numeric(8,2),
  carbs_g numeric(8,2),
  fat_g numeric(8,2),
  notes text
);
```

#### `grocery_lists` & `grocery_list_items`
```sql
CREATE TABLE public.grocery_lists (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  meal_plan_id uuid REFERENCES public.meal_plans(id) ON DELETE SET NULL,
  title text NOT NULL,
  week_start_date date,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.grocery_list_items (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  list_id uuid NOT NULL REFERENCES public.grocery_lists(id) ON DELETE CASCADE,
  name text NOT NULL,
  quantity text,
  category text NOT NULL CHECK (category IN ('produce', 'meat', 'dairy', 'pantry', 'frozen', 'other')),
  is_checked boolean DEFAULT false,
  in_pantry boolean DEFAULT false,
  food_id uuid REFERENCES public.foods(id) ON DELETE SET NULL
);
```

#### `food_diary_entries` (Daily Tracking & Macro Log)
```sql
CREATE TABLE public.food_diary_entries (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  entry_date date NOT NULL,
  meal_type text NOT NULL CHECK (meal_type IN ('breakfast', 'lunch', 'dinner', 'snack')),
  food_id uuid REFERENCES public.foods(id) ON DELETE SET NULL,
  recipe_id uuid REFERENCES public.recipes(id) ON DELETE SET NULL,
  custom_food_name text,
  quantity numeric(8,2) NOT NULL DEFAULT 1,
  unit text NOT NULL DEFAULT 'serving',
  calories numeric(8,2) NOT NULL,
  protein_g numeric(8,2) NOT NULL,
  carbs_g numeric(8,2) NOT NULL,
  fat_g numeric(8,2) NOT NULL,
  fiber_g numeric(8,2) NOT NULL DEFAULT 0,
  photo_url text,
  ai_analyzed boolean DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_diary_user_date ON public.food_diary_entries(user_id, entry_date);
```

---

### 2.4 Dietitians, Appointments & Telehealth

#### `dietitians`, `appointments` & `dietitian_reviews`
```sql
CREATE TABLE public.dietitians (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  credential text NOT NULL, -- e.g. 'MS, RDN, LD, CDCES'
  title text NOT NULL,
  bio text NOT NULL,
  photo_url text,
  specializations text[] NOT NULL DEFAULT '{}',
  consultation_fee_usd numeric(10,2) NOT NULL,
  consultation_duration_min int NOT NULL DEFAULT 50,
  is_accepting_clients boolean DEFAULT true,
  rating_avg numeric(3,2) DEFAULT 5.0,
  rating_count int DEFAULT 0,
  stripe_account_id text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.appointments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  dietitian_id uuid NOT NULL REFERENCES public.dietitians(id) ON DELETE CASCADE,
  scheduled_at timestamptz NOT NULL,
  duration_minutes int NOT NULL DEFAULT 50,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  reason text,
  fee_usd numeric(10,2) NOT NULL,
  stripe_payment_intent_id text,
  payment_status text DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded')),
  reminder_sent boolean DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
```

---

### 2.5 Compliance, Auditing & AI Quotas

#### `ai_usage_logs` & `audit_logs`
```sql
CREATE TABLE public.ai_usage_logs (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  tool text NOT NULL CHECK (tool IN (
    'chatbot', 'meal_plan', 'recipe_gen', 'photo_analyzer', 'label_scanner', 'grocery_planner', 'progress_coach'
  )),
  tokens_used int,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_ai_logs_user_date ON public.ai_usage_logs(user_id, created_at);

CREATE TABLE public.audit_logs (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  action text NOT NULL,
  target_type text NOT NULL,
  target_id uuid,
  details jsonb DEFAULT '{}'::jsonb,
  ip_address text,
  created_at timestamptz NOT NULL DEFAULT now()
);
```

---

## 3. Row Level Security (RLS) Policies

All tables have RLS enabled by default:
```sql
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.foods ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meal_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.food_diary_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.grocery_lists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_usage_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
```

### 3.1 Representative RLS Policies
```sql
-- Profiles: Users manage only their own profile; public reads dietitian profiles
CREATE POLICY "Users read own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Articles: Published articles are world-readable; drafts reserved for admins/editors
CREATE POLICY "Public read published articles" ON public.articles
  FOR SELECT USING (status = 'published');

CREATE POLICY "Editors manage articles" ON public.articles
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('editor', 'admin'))
  );

-- Food Diary: Strictly private to account holder
CREATE POLICY "User manage own diary" ON public.food_diary_entries
  FOR ALL USING (auth.uid() = user_id);

-- Meal Plans: Strictly private to account holder
CREATE POLICY "User manage own meal plans" ON public.meal_plans
  FOR ALL USING (auth.uid() = user_id);
```

---

## 4. Triggers & Stored Procedures

```sql
-- 1. Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url, role)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url',
    'free'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 2. Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger AS $$
BEGIN
  new.updated_at = now();
  RETURN new;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE PROCEDURE public.set_updated_at();

CREATE TRIGGER set_recipes_updated_at
  BEFORE UPDATE ON public.recipes
  FOR EACH ROW EXECUTE PROCEDURE public.set_updated_at();
```

---

*Document Author: NutriWise USA Database Engineering Team*  
*Classification: Confidential — Approved for Engineering Build*
