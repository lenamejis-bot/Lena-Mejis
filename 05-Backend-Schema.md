# NutriWise USA — Backend Database Schema & Data Models
## PostgreSQL Relational Schema, RLS Policies & API Data Structures

**Document Version:** 2.0 (Updated & Expanded)  
**Date:** October 2026  
**Status:** Implemented & Production-Ready  
**Database Engine:** PostgreSQL 15+ (Supabase / Cloud SQL)  

---

## 1. Database Architecture & ER Diagram

```
auth.users (Built-in Auth)
    │
    ▼
profiles ────────────── subscriptions ──── payments
    │
    ├── saved_recipes ──────── recipes ─── recipe_ingredients
    │                                  ─── recipe_steps
    │                                  ─── recipe_ratings
    │
    ├── saved_articles ─────── articles ── article_categories
    │
    ├── meal_plans ─────────── meal_plan_days ── meal_plan_meals
    │      │
    │      └── grocery_lists ─ grocery_list_items ──── foods (USDA)
    │
    ├── food_diary_entries
    │
    ├── appointments ───────── dietitians ── dietitian_availability
    │                              │      ── dietitian_reviews
    │                              │
    │                              └── dietitian_specializations
    └── ai_usage_logs

audit_logs
diet_plans (Curated templates)
newsletter_subscribers
ai_prompt_configs
```

---

## 2. Detailed Table Definitions (SQL DDL)

### 2.1 Users, Profiles & Subscriptions

```sql
-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- 1. profiles table (extends auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'free' CHECK (role IN ('guest', 'free', 'premium', 'dietitian', 'editor', 'admin')),
  dietary_preferences TEXT[] DEFAULT '{}',
  food_allergies TEXT[] DEFAULT '{}',
  weekly_budget NUMERIC(10, 2) DEFAULT 100.00,
  household_size INT DEFAULT 2,
  cooking_skill TEXT DEFAULT 'intermediate' CHECK (cooking_skill IN ('beginner', 'intermediate', 'advanced')),
  health_goal TEXT DEFAULT 'balanced' CHECK (health_goal IN ('weight_management', 'balanced', 'muscle', 'family')),
  age_range TEXT DEFAULT '26-35',
  activity_level TEXT DEFAULT 'moderate' CHECK (activity_level IN ('sedentary', 'light', 'moderate', 'active')),
  newsletter_subscribed BOOLEAN DEFAULT false,
  onboarding_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. subscriptions table
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT UNIQUE,
  plan TEXT NOT NULL CHECK (plan IN ('free', 'premium_monthly', 'premium_annual')),
  status TEXT NOT NULL CHECK (status IN ('active', 'canceled', 'past_due', 'trialing')),
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. payments table
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('subscription', 'consultation')),
  amount_usd NUMERIC(10, 2) NOT NULL,
  stripe_payment_intent_id TEXT UNIQUE,
  status TEXT NOT NULL CHECK (status IN ('succeeded', 'failed', 'refunded')),
  created_at TIMESTAMPTZ DEFAULT now()
);
```

---

### 2.2 Articles & Educational Content

```sql
-- 4. articles table
CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image_url TEXT,
  author_id UUID REFERENCES profiles(id),
  reviewer_id UUID REFERENCES profiles(id),
  category TEXT NOT NULL CHECK (category IN ('weight-management', 'heart-health', 'digestion', 'energy', 'sleep', 'hydration')),
  tags TEXT[] DEFAULT '{}',
  reading_time_minutes INT DEFAULT 5,
  published_at TIMESTAMPTZ DEFAULT now(),
  last_reviewed_at TIMESTAMPTZ DEFAULT now(),
  references JSONB DEFAULT '[]'::jsonb,
  view_count INT DEFAULT 0,
  status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_articles_category ON articles(category);
CREATE INDEX idx_articles_fts ON articles USING gin(to_tsvector('english', title || ' ' || excerpt || ' ' || content));

-- 5. saved_articles table
CREATE TABLE saved_articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  article_id UUID NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  saved_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (user_id, article_id)
);
```

---

### 2.3 Recipes & Culinary Intelligence

```sql
-- 6. recipes table
CREATE TABLE recipes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  cover_image_url TEXT,
  category TEXT NOT NULL CHECK (category IN ('breakfast', 'lunch', 'dinner', 'snack', 'meal-prep')),
  prep_time_minutes INT NOT NULL DEFAULT 15,
  cook_time_minutes INT NOT NULL DEFAULT 20,
  total_time_minutes INT GENERATED ALWAYS AS (prep_time_minutes + cook_time_minutes) STORED,
  servings INT NOT NULL DEFAULT 4,
  difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')),
  calories_per_serving NUMERIC(8, 2) NOT NULL,
  protein_g NUMERIC(8, 2) NOT NULL,
  carbs_g NUMERIC(8, 2) NOT NULL,
  fat_g NUMERIC(8, 2) NOT NULL,
  fiber_g NUMERIC(8, 2) NOT NULL,
  sodium_mg NUMERIC(8, 2) NOT NULL,
  sugar_g NUMERIC(8, 2) DEFAULT 0,
  saturated_fat_g NUMERIC(8, 2) DEFAULT 0,
  dietary_tags TEXT[] DEFAULT '{}',
  allergens TEXT[] DEFAULT '{}',
  storage_instructions TEXT,
  estimated_cost_per_serving_usd NUMERIC(8, 2),
  rating_avg NUMERIC(3, 2) DEFAULT 5.0,
  rating_count INT DEFAULT 1,
  status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_recipes_slug ON recipes(slug);
CREATE INDEX idx_recipes_category ON recipes(category);
CREATE INDEX idx_recipes_tags ON recipes USING gin(dietary_tags);

-- 7. recipe_ingredients table
CREATE TABLE recipe_ingredients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  recipe_id UUID NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  quantity NUMERIC(10, 2),
  unit TEXT,
  notes TEXT,
  is_optional BOOLEAN DEFAULT false,
  substitution TEXT,
  sort_order INT DEFAULT 0
);

-- 8. recipe_steps table
CREATE TABLE recipe_steps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  recipe_id UUID NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
  step_number INT NOT NULL,
  instruction TEXT NOT NULL,
  timer_minutes INT,
  tip TEXT
);

-- 9. saved_recipes table
CREATE TABLE saved_recipes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  recipe_id UUID NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
  saved_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (user_id, recipe_id)
);
```

---

### 2.4 USDA Food Database

```sql
-- 10. foods table (USDA FoodData Central mapped)
CREATE TABLE foods (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  usda_fdc_id INT UNIQUE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  image_url TEXT,
  description TEXT,
  default_serving_size NUMERIC(10, 2) NOT NULL,
  default_serving_unit TEXT NOT NULL,
  calories NUMERIC(8, 2) NOT NULL,
  protein_g NUMERIC(8, 2) NOT NULL,
  total_carbs_g NUMERIC(8, 2) NOT NULL,
  fiber_g NUMERIC(8, 2) NOT NULL,
  total_sugars_g NUMERIC(8, 2) DEFAULT 0,
  total_fat_g NUMERIC(8, 2) NOT NULL,
  saturated_fat_g NUMERIC(8, 2) DEFAULT 0,
  sodium_mg NUMERIC(8, 2) NOT NULL,
  vitamin_c_mg NUMERIC(8, 2) DEFAULT 0,
  calcium_mg NUMERIC(8, 2) DEFAULT 0,
  iron_mg NUMERIC(8, 2) DEFAULT 0,
  potassium_mg NUMERIC(8, 2) DEFAULT 0,
  preparation_methods TEXT,
  storage_instructions TEXT,
  common_allergens TEXT[] DEFAULT '{}',
  health_benefits TEXT,
  related_recipe_slugs TEXT[] DEFAULT '{}',
  data_source TEXT DEFAULT 'usda' CHECK (data_source IN ('usda', 'manual')),
  last_verified_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_foods_slug ON foods(slug);
CREATE INDEX idx_foods_category ON foods(category);
CREATE INDEX idx_foods_fts ON foods USING gin(to_tsvector('english', name || ' ' || description));
```

---

### 2.5 Meal Plans, Grocery Lists & Food Diary

```sql
-- 11. meal_plans table
CREATE TABLE meal_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  goal TEXT,
  dietary_preferences TEXT[] DEFAULT '{}',
  calories_target NUMERIC(8, 2),
  generated_by TEXT DEFAULT 'ai' CHECK (generated_by IN ('ai', 'curated', 'dietitian')),
  rationale TEXT,
  is_active BOOLEAN DEFAULT true,
  week_start_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 12. meal_plan_days table
CREATE TABLE meal_plan_days (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  meal_plan_id UUID NOT NULL REFERENCES meal_plans(id) ON DELETE CASCADE,
  day_name TEXT NOT NULL,
  day_index INT NOT NULL CHECK (day_index BETWEEN 0 AND 6),
  total_calories NUMERIC(8, 2),
  total_protein_g NUMERIC(8, 2),
  total_carbs_g NUMERIC(8, 2),
  total_fat_g NUMERIC(8, 2),
  total_fiber_g NUMERIC(8, 2)
);

-- 13. meal_plan_meals table
CREATE TABLE meal_plan_meals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  day_id UUID NOT NULL REFERENCES meal_plan_days(id) ON DELETE CASCADE,
  meal_type TEXT NOT NULL CHECK (meal_type IN ('breakfast', 'lunch', 'dinner', 'snack')),
  title TEXT NOT NULL,
  recipe_slug TEXT,
  calories NUMERIC(8, 2),
  protein_g NUMERIC(8, 2),
  carbs_g NUMERIC(8, 2),
  fat_g NUMERIC(8, 2),
  prep_time_minutes INT,
  notes TEXT
);

-- 14. grocery_lists table
CREATE TABLE grocery_lists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  meal_plan_id UUID REFERENCES meal_plans(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 15. grocery_list_items table
CREATE TABLE grocery_list_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  list_id UUID NOT NULL REFERENCES grocery_lists(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  quantity TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('produce', 'dairy', 'meat', 'pantry', 'frozen')),
  is_checked BOOLEAN DEFAULT false,
  in_pantry BOOLEAN DEFAULT false,
  estimated_cost_usd NUMERIC(8, 2)
);

-- 16. food_diary_entries table
CREATE TABLE food_diary_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  entry_date DATE NOT NULL DEFAULT CURRENT_DATE,
  meal_type TEXT NOT NULL CHECK (meal_type IN ('breakfast', 'lunch', 'dinner', 'snack')),
  food_name TEXT NOT NULL,
  serving_amount TEXT NOT NULL,
  calories NUMERIC(8, 2) NOT NULL,
  protein_g NUMERIC(8, 2) NOT NULL,
  carbs_g NUMERIC(8, 2) NOT NULL,
  fat_g NUMERIC(8, 2) NOT NULL,
  fiber_g NUMERIC(8, 2) NOT NULL,
  photo_url TEXT,
  ai_analyzed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_diary_user_date ON food_diary_entries(user_id, entry_date);
```

---

### 2.6 Dietitians & Telehealth Appointments

```sql
-- 17. dietitians table
CREATE TABLE dietitians (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  full_name TEXT NOT NULL,
  credential TEXT NOT NULL,
  title TEXT NOT NULL,
  avatar_url TEXT NOT NULL,
  bio TEXT NOT NULL,
  specializations TEXT[] NOT NULL DEFAULT '{}',
  consultation_fee_usd NUMERIC(10, 2) NOT NULL DEFAULT 135.00,
  consultation_duration_min INT NOT NULL DEFAULT 50,
  is_accepting_clients BOOLEAN DEFAULT true,
  rating_avg NUMERIC(3, 2) DEFAULT 5.0,
  rating_count INT DEFAULT 1,
  available_days TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 18. appointments table
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  dietitian_id UUID NOT NULL REFERENCES dietitians(id) ON DELETE CASCADE,
  scheduled_date DATE NOT NULL,
  scheduled_time TEXT NOT NULL,
  duration_min INT NOT NULL DEFAULT 50,
  fee_usd NUMERIC(10, 2) NOT NULL,
  reason TEXT NOT NULL,
  status TEXT DEFAULT 'confirmed' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT now()
);
```

---

### 2.7 AI Usage & System Operations

```sql
-- 19. ai_usage_logs table
CREATE TABLE ai_usage_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  endpoint TEXT NOT NULL CHECK (endpoint IN ('chat', 'meal-plan', 'recipe-gen', 'analyze-food', 'scan-label', 'progress-coach')),
  model_used TEXT NOT NULL,
  is_high_thinking BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 20. newsletter_subscribers table
CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMPTZ DEFAULT now(),
  is_active BOOLEAN DEFAULT true
);

-- 21. ai_prompt_configs table
CREATE TABLE ai_prompt_configs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tool_name TEXT NOT NULL UNIQUE,
  model TEXT NOT NULL DEFAULT 'gemini-4-argon',
  thinking_level TEXT DEFAULT 'HIGH',
  system_instruction TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

---

## 3. Row Level Security (RLS) Policies

All tables are locked down with explicit access control:

| Table | SELECT | INSERT | UPDATE | DELETE |
|---|---|---|---|---|
| `profiles` | Own row (or Admin) | Service Role Trigger | Own row (or Admin) | Admin only |
| `articles` | Public (if published) | Editor / Admin | Editor / Admin | Admin only |
| `recipes` | Public (if published) | Editor / Admin | Editor / Admin | Admin only |
| `foods` | Public | Admin only | Admin only | Admin only |
| `meal_plans` | Own row | Own row | Own row | Own row |
| `grocery_lists`| Own row | Own row | Own row | Own row |
| `food_diary_entries` | Own row | Own row | Own row | Own row |
| `appointments` | Own row (Client & Dietitian) | Own row (Client) | Client / Dietitian | Client / Admin |
| `dietitians` | Public | Admin only | Dietitian (own) / Admin | Admin only |
| `ai_usage_logs`| Own row (or Admin) | Backend Server Role | None | None |

---

## 4. Key Database Functions & Triggers

```sql
-- Auto-create profile when user signs up in auth.users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', 'NutriWise Member'), 'free');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_modtime BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER update_articles_modtime BEFORE UPDATE ON articles FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER update_recipes_modtime BEFORE UPDATE ON recipes FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
```

---

*Document approved for NutriWise USA Platform v2.0.*
