# Backend Schema
## NutriWise USA — Health & Nutrition Platform

**Version:** 1.0  
**Date:** October 2026  
**Status:** Planning Document — Database NOT yet created  
**Important:** This is a documentation file only. Supabase database will be created at final stage via Supabase connector.

---

## 1. Database Overview

**Engine:** PostgreSQL (via Supabase)  
**Total Tables:** 28  
**RLS:** Enabled on all tables  
**Extensions required:** `uuid-ossp`, `pg_trgm` (for text search)

---

## 2. Schema Diagram (Entity Relationships)

```
auth.users (Supabase built-in)
    │
    ▼
profiles ──────────── subscriptions
    │                       │
    ├── saved_recipes        └── payments
    ├── saved_articles
    ├── ai_usage_logs
    ├── food_diary_entries
    ├── meal_plans ──────── meal_plan_days ── meal_plan_meals
    ├── grocery_lists ───── grocery_list_items
    └── appointments ─────── dietitians

articles ──── article_categories
    │
    └── article_tags (junction)

recipes ──── recipe_categories
    │    └── recipe_ingredients
    └── recipe_steps

foods ──── food_categories
    └── food_nutrients

dietitians ──── dietitian_specializations
    └── dietitian_reviews

audit_logs
```

---

## 3. Tables — Detailed Schema

---

### 3.1 `profiles` (extends Supabase auth.users)

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | uuid | PK, FK → auth.users.id | Matches Supabase auth user ID |
| `email` | text | NOT NULL | Synced from auth |
| `full_name` | text | | Display name |
| `avatar_url` | text | | Profile photo URL |
| `role` | text | NOT NULL, DEFAULT 'free' | 'guest' / 'free' / 'premium' / 'dietitian' / 'editor' / 'admin' |
| `dietary_preferences` | text[] | DEFAULT '{}' | ['vegetarian', 'gluten-free', etc.] |
| `food_allergies` | text[] | DEFAULT '{}' | ['peanuts', 'dairy', etc.] |
| `weekly_budget` | numeric | | Weekly food budget in USD |
| `household_size` | int | DEFAULT 1 | Number of people |
| `cooking_skill` | text | | 'beginner' / 'intermediate' / 'advanced' |
| `health_goal` | text | | 'weight_management' / 'balanced' / 'muscle' / 'family' |
| `age_range` | text | | '18-25' / '26-35' / '36-50' / '51-65' / '65+' |
| `activity_level` | text | | 'sedentary' / 'light' / 'moderate' / 'active' |
| `newsletter_subscribed` | boolean | DEFAULT false | |
| `onboarding_completed` | boolean | DEFAULT false | |
| `created_at` | timestamptz | DEFAULT now() | |
| `updated_at` | timestamptz | DEFAULT now() | |

**RLS Policies:**
- `SELECT`: Users can only read their own profile
- `UPDATE`: Users can only update their own profile
- `INSERT`: Trigger auto-creates on auth.users insert

---

### 3.2 `subscriptions`

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | uuid | PK, DEFAULT uuid_generate_v4() | |
| `user_id` | uuid | FK → profiles.id, NOT NULL | |
| `stripe_customer_id` | text | UNIQUE | |
| `stripe_subscription_id` | text | UNIQUE | |
| `plan` | text | NOT NULL | 'free' / 'premium_monthly' / 'premium_annual' |
| `status` | text | NOT NULL | 'active' / 'canceled' / 'past_due' / 'trialing' |
| `current_period_start` | timestamptz | | |
| `current_period_end` | timestamptz | | |
| `cancel_at_period_end` | boolean | DEFAULT false | |
| `created_at` | timestamptz | DEFAULT now() | |
| `updated_at` | timestamptz | DEFAULT now() | |

**RLS Policies:**
- `SELECT`: User reads own subscription only; admin reads all
- `INSERT` / `UPDATE`: Only via Edge Function (service role)

---

### 3.3 `articles`

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | uuid | PK, DEFAULT uuid_generate_v4() | |
| `title` | text | NOT NULL | |
| `slug` | text | NOT NULL, UNIQUE | URL-friendly identifier |
| `excerpt` | text | | Short preview text |
| `content` | text | NOT NULL | Rich text / HTML |
| `cover_image_url` | text | | |
| `author_id` | uuid | FK → profiles.id | |
| `reviewer_id` | uuid | FK → profiles.id | Nullable (professional reviewer) |
| `status` | text | DEFAULT 'draft' | 'draft' / 'published' / 'archived' |
| `published_at` | timestamptz | | |
| `last_reviewed_at` | timestamptz | | |
| `reading_time_minutes` | int | | Auto-calculated |
| `meta_title` | text | | SEO title |
| `meta_description` | text | | SEO description |
| `og_image_url` | text | | Open Graph image |
| `references` | jsonb | DEFAULT '[]' | Array of {url, title, source} |
| `view_count` | int | DEFAULT 0 | |
| `created_at` | timestamptz | DEFAULT now() | |
| `updated_at` | timestamptz | DEFAULT now() | |

**Indexes:**
- `idx_articles_slug` on `slug`
- `idx_articles_status` on `status`
- `idx_articles_published_at` on `published_at DESC`
- Full-text search: GIN index on `to_tsvector('english', title || ' ' || content)`

**RLS Policies:**
- `SELECT`: Published articles public; drafts for admin/editor only
- `INSERT` / `UPDATE` / `DELETE`: Admin and editor roles only

---

### 3.4 `article_categories`

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | uuid | PK | |
| `article_id` | uuid | FK → articles.id | |
| `category` | text | NOT NULL | 'weight-management' / 'heart-health' / 'digestion' / 'energy' / 'sleep' / 'hydration' |

---

### 3.5 `recipes`

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | uuid | PK, DEFAULT uuid_generate_v4() | |
| `title` | text | NOT NULL | |
| `slug` | text | NOT NULL, UNIQUE | |
| `description` | text | | Short intro |
| `cover_image_url` | text | | |
| `category` | text | NOT NULL | 'breakfast' / 'lunch' / 'dinner' / 'snack' / 'meal-prep' |
| `prep_time_minutes` | int | | |
| `cook_time_minutes` | int | | |
| `total_time_minutes` | int | GENERATED | prep + cook |
| `servings` | int | NOT NULL, DEFAULT 4 | Base servings |
| `difficulty` | text | | 'easy' / 'medium' / 'hard' |
| `calories_per_serving` | numeric | | |
| `protein_g` | numeric | | |
| `carbs_g` | numeric | | |
| `fat_g` | numeric | | |
| `fiber_g` | numeric | | |
| `sodium_mg` | numeric | | |
| `dietary_tags` | text[] | DEFAULT '{}' | ['vegetarian', 'gluten-free', 'dairy-free', etc.] |
| `allergens` | text[] | DEFAULT '{}' | ['peanuts', 'tree-nuts', 'dairy', etc.] |
| `storage_instructions` | text | | |
| `author_id` | uuid | FK → profiles.id | |
| `status` | text | DEFAULT 'draft' | 'draft' / 'published' |
| `rating_avg` | numeric | DEFAULT 0 | Calculated field |
| `rating_count` | int | DEFAULT 0 | |
| `meta_title` | text | | |
| `meta_description` | text | | |
| `created_at` | timestamptz | DEFAULT now() | |
| `updated_at` | timestamptz | DEFAULT now() | |

**Indexes:**
- `idx_recipes_slug` on `slug`
- `idx_recipes_category` on `category`
- `idx_recipes_dietary_tags` GIN on `dietary_tags`
- Full-text search GIN index on `title`

---

### 3.6 `recipe_ingredients`

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | uuid | PK | |
| `recipe_id` | uuid | FK → recipes.id, NOT NULL | |
| `name` | text | NOT NULL | Ingredient name |
| `quantity` | numeric | | Amount |
| `unit` | text | | 'cup' / 'tbsp' / 'oz' / 'lb' / 'g' / 'piece' |
| `notes` | text | | "finely chopped", "at room temperature" |
| `is_optional` | boolean | DEFAULT false | |
| `substitution` | text | | Alternative ingredient suggestion |
| `sort_order` | int | | Display order |

---

### 3.7 `recipe_steps`

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | uuid | PK | |
| `recipe_id` | uuid | FK → recipes.id, NOT NULL | |
| `step_number` | int | NOT NULL | |
| `instruction` | text | NOT NULL | |
| `image_url` | text | | Optional step image |
| `timer_minutes` | int | | For timed steps |

---

### 3.8 `recipe_ratings`

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | uuid | PK | |
| `recipe_id` | uuid | FK → recipes.id | |
| `user_id` | uuid | FK → profiles.id | |
| `rating` | int | CHECK (1-5) | |
| `review_text` | text | | |
| `created_at` | timestamptz | DEFAULT now() | |

**Unique:** `(recipe_id, user_id)` — one review per user per recipe

---

### 3.9 `foods`

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | uuid | PK | |
| `usda_fdc_id` | int | UNIQUE | USDA FoodData Central ID |
| `name` | text | NOT NULL | |
| `slug` | text | NOT NULL, UNIQUE | |
| `category_id` | uuid | FK → food_categories.id | |
| `image_url` | text | | |
| `description` | text | | |
| `default_serving_size` | numeric | | In grams |
| `default_serving_unit` | text | | 'cup' / 'oz' / 'piece' / 'g' |
| `calories` | numeric | | Per default serving |
| `protein_g` | numeric | | |
| `total_carbs_g` | numeric | | |
| `fiber_g` | numeric | | |
| `total_sugars_g` | numeric | | |
| `total_fat_g` | numeric | | |
| `saturated_fat_g` | numeric | | |
| `sodium_mg` | numeric | | |
| `vitamin_c_mg` | numeric | | |
| `calcium_mg` | numeric | | |
| `iron_mg` | numeric | | |
| `potassium_mg` | numeric | | |
| `preparation_methods` | text | | How to prepare |
| `storage_instructions` | text | | |
| `common_allergens` | text[] | DEFAULT '{}' | |
| `health_benefits` | text | | Brief description |
| `meta_title` | text | | |
| `meta_description` | text | | |
| `data_source` | text | DEFAULT 'usda' | 'usda' / 'manual' |
| `last_verified_at` | timestamptz | | |
| `created_at` | timestamptz | DEFAULT now() | |

**Indexes:**
- Full-text search GIN on `name`
- `idx_foods_slug` on `slug`
- `idx_foods_category` on `category_id`

---

### 3.10 `food_categories`

| Column | Type | Constraints |
|---|---|---|
| `id` | uuid | PK |
| `name` | text | NOT NULL, UNIQUE |
| `slug` | text | NOT NULL, UNIQUE |
| `icon` | text | Emoji or icon name |
| `sort_order` | int | |

---

### 3.11 `saved_recipes`

| Column | Type | Constraints |
|---|---|---|
| `id` | uuid | PK |
| `user_id` | uuid | FK → profiles.id |
| `recipe_id` | uuid | FK → recipes.id |
| `saved_at` | timestamptz | DEFAULT now() |

**Unique:** `(user_id, recipe_id)`  
**RLS:** Users can only read/write their own saved recipes

---

### 3.12 `saved_articles`

| Column | Type | Constraints |
|---|---|---|
| `id` | uuid | PK |
| `user_id` | uuid | FK → profiles.id |
| `article_id` | uuid | FK → articles.id |
| `saved_at` | timestamptz | DEFAULT now() |

---

### 3.13 `meal_plans`

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | uuid | PK | |
| `user_id` | uuid | FK → profiles.id | |
| `title` | text | NOT NULL | e.g. "My Week 1 Plan" |
| `goal` | text | | User's goal for this plan |
| `dietary_preferences` | text[] | | Snapshot at time of generation |
| `calories_target` | numeric | | Daily calorie target |
| `generated_by` | text | DEFAULT 'ai' | 'ai' / 'manual' / 'professional' |
| `is_active` | boolean | DEFAULT true | Only one active plan per user |
| `week_start_date` | date | | Monday of the plan week |
| `created_at` | timestamptz | DEFAULT now() | |

---

### 3.14 `meal_plan_days`

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | uuid | PK | |
| `meal_plan_id` | uuid | FK → meal_plans.id | |
| `day_of_week` | int | NOT NULL, 0-6 | 0=Monday, 6=Sunday |
| `total_calories` | numeric | | Sum of meals |
| `total_protein_g` | numeric | | |
| `total_carbs_g` | numeric | | |
| `total_fat_g` | numeric | | |
| `total_fiber_g` | numeric | | |

---

### 3.15 `meal_plan_meals`

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | uuid | PK | |
| `day_id` | uuid | FK → meal_plan_days.id | |
| `meal_type` | text | NOT NULL | 'breakfast' / 'lunch' / 'dinner' / 'snack' |
| `recipe_id` | uuid | FK → recipes.id | Nullable (AI-generated meal may not map to recipe) |
| `custom_meal_name` | text | | If not from recipe library |
| `servings` | numeric | DEFAULT 1 | |
| `calories` | numeric | | |
| `notes` | text | | |

---

### 3.16 `grocery_lists`

| Column | Type | Constraints |
|---|---|---|
| `id` | uuid | PK |
| `user_id` | uuid | FK → profiles.id |
| `meal_plan_id` | uuid | FK → meal_plans.id (nullable) |
| `title` | text | NOT NULL |
| `week_start_date` | date | |
| `created_at` | timestamptz | DEFAULT now() |

---

### 3.17 `grocery_list_items`

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | uuid | PK | |
| `list_id` | uuid | FK → grocery_lists.id | |
| `name` | text | NOT NULL | |
| `quantity` | text | | "2 cups", "1 lb" |
| `category` | text | | 'produce' / 'dairy' / 'meat' / 'pantry' / 'frozen' |
| `is_checked` | boolean | DEFAULT false | |
| `in_pantry` | boolean | DEFAULT false | User already has this |
| `food_id` | uuid | FK → foods.id (nullable) | If linked to food database |

---

### 3.18 `food_diary_entries`

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | uuid | PK | |
| `user_id` | uuid | FK → profiles.id | |
| `entry_date` | date | NOT NULL | |
| `meal_type` | text | NOT NULL | 'breakfast' / 'lunch' / 'dinner' / 'snack' |
| `food_id` | uuid | FK → foods.id (nullable) | |
| `recipe_id` | uuid | FK → recipes.id (nullable) | |
| `custom_food_name` | text | | If not from database |
| `quantity` | numeric | | |
| `unit` | text | | |
| `calories` | numeric | | |
| `protein_g` | numeric | | |
| `carbs_g` | numeric | | |
| `fat_g` | numeric | | |
| `fiber_g` | numeric | | |
| `photo_url` | text | | Supabase storage URL |
| `ai_analyzed` | boolean | DEFAULT false | Was this entry from AI photo analysis |
| `created_at` | timestamptz | DEFAULT now() | |

**RLS:** Users can only read/write their own diary entries

---

### 3.19 `ai_usage_logs`

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | uuid | PK | |
| `user_id` | uuid | FK → profiles.id | |
| `tool` | text | NOT NULL | 'chatbot' / 'meal_plan' / 'recipe_gen' / 'photo_analyzer' / 'label_scanner' / 'grocery_planner' |
| `tokens_used` | int | | Estimated tokens |
| `created_at` | timestamptz | DEFAULT now() | |

**Used for quota enforcement.** Edge Function queries this before each AI call.

---

### 3.20 `dietitians`

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | uuid | PK | |
| `user_id` | uuid | FK → profiles.id | Linked to their user account |
| `full_name` | text | NOT NULL | |
| `credential` | text | | 'RD' / 'RDN' / 'LD' |
| `bio` | text | | |
| `photo_url` | text | | |
| `specializations` | text[] | | ['weight-management', 'sports-nutrition', etc.] |
| `consultation_fee_usd` | numeric | | Per session |
| `consultation_duration_min` | int | DEFAULT 50 | |
| `is_accepting_clients` | boolean | DEFAULT true | |
| `rating_avg` | numeric | DEFAULT 0 | |
| `rating_count` | int | DEFAULT 0 | |
| `stripe_account_id` | text | | For payouts |
| `created_at` | timestamptz | DEFAULT now() | |

---

### 3.21 `dietitian_availability`

| Column | Type | Constraints |
|---|---|---|
| `id` | uuid | PK |
| `dietitian_id` | uuid | FK → dietitians.id |
| `day_of_week` | int | 0=Monday, 6=Sunday |
| `start_time` | time | |
| `end_time` | time | |

---

### 3.22 `appointments`

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | uuid | PK | |
| `client_id` | uuid | FK → profiles.id | |
| `dietitian_id` | uuid | FK → dietitians.id | |
| `scheduled_at` | timestamptz | NOT NULL | |
| `duration_minutes` | int | NOT NULL | |
| `status` | text | DEFAULT 'pending' | 'pending' / 'confirmed' / 'completed' / 'cancelled' |
| `reason` | text | | Client's stated reason |
| `fee_usd` | numeric | | Amount charged |
| `stripe_payment_intent_id` | text | | |
| `payment_status` | text | | 'pending' / 'paid' / 'refunded' |
| `reminder_sent` | boolean | DEFAULT false | |
| `created_at` | timestamptz | DEFAULT now() | |

---

### 3.23 `dietitian_reviews`

| Column | Type | Constraints |
|---|---|---|
| `id` | uuid | PK |
| `dietitian_id` | uuid | FK → dietitians.id |
| `client_id` | uuid | FK → profiles.id |
| `appointment_id` | uuid | FK → appointments.id |
| `rating` | int | CHECK (1-5) |
| `review_text` | text | |
| `created_at` | timestamptz | DEFAULT now() |

---

### 3.24 `payments`

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | uuid | PK | |
| `user_id` | uuid | FK → profiles.id | |
| `type` | text | | 'subscription' / 'consultation' |
| `amount_usd` | numeric | NOT NULL | |
| `stripe_payment_intent_id` | text | UNIQUE | |
| `status` | text | | 'succeeded' / 'failed' / 'refunded' |
| `created_at` | timestamptz | DEFAULT now() | |

---

### 3.25 `newsletter_subscribers`

| Column | Type | Constraints |
|---|---|---|
| `id` | uuid | PK |
| `email` | text | NOT NULL, UNIQUE |
| `subscribed_at` | timestamptz | DEFAULT now() |
| `is_active` | boolean | DEFAULT true |
| `source` | text | 'homepage' / 'article' / 'recipe' |

---

### 3.26 `audit_logs`

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | uuid | PK | |
| `admin_id` | uuid | FK → profiles.id | |
| `action` | text | NOT NULL | 'published_article' / 'deleted_user' / etc. |
| `target_type` | text | | 'article' / 'recipe' / 'user' / 'food' |
| `target_id` | uuid | | |
| `details` | jsonb | | Additional context |
| `created_at` | timestamptz | DEFAULT now() | |

---

### 3.27 `diet_plans` (Curated Templates)

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | uuid | PK | |
| `title` | text | NOT NULL | |
| `slug` | text | NOT NULL, UNIQUE | |
| `plan_type` | text | | 'weight-management' / 'balanced' / 'vegetarian' / 'mediterranean' / 'high-protein' / 'family' |
| `description` | text | | |
| `cover_image_url` | text | | |
| `duration_days` | int | DEFAULT 7 | |
| `target_calories` | numeric | | Daily average |
| `target_protein_g` | numeric | | |
| `is_published` | boolean | DEFAULT false | |
| `created_at` | timestamptz | DEFAULT now() | |

---

## 4. Supabase Storage Buckets

| Bucket Name | Public | Max Size | File Types |
|---|---|---|---|
| `food-images` | Yes | 2MB | jpg, webp, png |
| `recipe-images` | Yes | 2MB | jpg, webp, png |
| `article-images` | Yes | 2MB | jpg, webp, png |
| `user-uploads` | No | 10MB | jpg, png, heic |
| `dietitian-documents` | No | 20MB | pdf, jpg, png |

---

## 5. Supabase Edge Functions

| Function Name | Trigger | Description |
|---|---|---|
| `handle-new-user` | auth.users INSERT | Auto-create profile record |
| `stripe-webhook` | HTTP POST (Stripe) | Handle subscription events |
| `usda-proxy` | HTTP GET | Proxy + cache USDA API calls |
| `ai-chat` | HTTP POST | Cloudflare AI Gateway call for chatbot |
| `ai-meal-plan` | HTTP POST | Cloudflare AI Gateway call for meal plans |
| `ai-recipe-gen` | HTTP POST | Cloudflare AI Gateway call for recipe generation |
| `ai-photo-analyze` | HTTP POST | Vision AI for food photo analysis |
| `send-email` | Called by other functions | Resend email dispatch |
| `check-ai-quota` | Called before AI functions | Verify user hasn't exceeded daily limit |

---

## 6. Key Database Functions / Triggers

```sql
-- Auto-create profile when user signs up
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to: profiles, articles, recipes, foods, meal_plans, subscriptions
```

---

## 7. RLS Policy Summary

| Table | Public SELECT | Auth SELECT | Auth INSERT | Auth UPDATE | Auth DELETE |
|---|---|---|---|---|---|
| `articles` | Published only | Published only | Editor/Admin | Editor/Admin | Admin |
| `recipes` | Published only | Published only | Editor/Admin | Editor/Admin | Admin |
| `foods` | All rows | All rows | Admin | Admin | Admin |
| `profiles` | No | Own row | No | Own row | No |
| `saved_recipes` | No | Own rows | Own | Own | Own |
| `meal_plans` | No | Own rows | Own | Own | Own |
| `food_diary_entries` | No | Own rows | Own | Own | Own |
| `ai_usage_logs` | No | Own rows | Service role | No | No |
| `appointments` | No | Own rows | Own | Own | No |
| `dietitians` | All rows | All rows | Admin | Own + Admin | Admin |
| `audit_logs` | No | No | Admin | No | No |

---

*Document Owner: Backend Lead*  
*Last Updated: October 2026*  
*Important: This is a PLANNING document. Do NOT create Supabase database until final implementation stage.*  
*Consistent with: PRD v1.0, TRD v1.0*
