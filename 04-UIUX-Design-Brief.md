# NutriWise USA — UI/UX Design Brief & Design System
## Visual Identity, Typography, Color Tokens & Component Specifications

**Document Version:** 2.0 (Updated & Expanded)  
**Date:** October 2026  
**Status:** Implemented & Production-Ready  

---

## 1. Brand Identity & Personality

### 1.1 Brand Philosophy
NutriWise USA is not a cold clinical hospital brochure, nor is it a fad weight-loss app filled with dramatic before-and-after photos. It is an **evidence-based, approachable nutrition companion**.

- **Confident & Authoritative:** Grounded in peer-reviewed science, clinical trials, and USDA data.
- **Warm & Welcoming:** Uses organic greens, warm amber accents, and creamy off-white surfaces.
- **Food-Forward:** Celebrates wholesome, natural ingredients, colorful produce, and real culinary joy.
- **Clarity Over Clutter:** High legibility, strict typographic hierarchy, generous breathing room, and zero unnecessary visual distraction.

### 1.2 Design Personality
If NutriWise were a person: A board-certified registered dietitian who shops at local farmers markets, loves cooking comforting dinners, and explains complex nutritional biochemistry over a cup of warm green tea.

---

## 2. Color Palette & Token Architecture

### 2.1 Core Brand Palette

| CSS Token | Hex Value | Role & Usage |
|---|---|---|
| `--color-primary` | `#2D6A4F` | Deep forest green — Primary actions, active nav states, brand marks, and emphasis |
| `--color-primary-hover` | `#245840` | Darker forest green — Hover states for primary buttons and interactive links |
| `--color-primary-light` | `#52B788` | Fresh mid-green — Subtle badges, verification shields, and progress meters |
| `--color-accent` | `#F77F00` | Warm amber-orange — Highlights, premium CTA buttons, and high thinking alerts |
| `--color-surface` | `#FAFAF7` | Warm off-white with slight olive tint — Primary page background |
| `--color-surface-alt` | `#F0F4EF` | Soft green-tinted white — Secondary cards, badge containers, and input backgrounds |
| `--color-text-primary` | `#1A2E1A` | Near-black with deep forest green undertone — Headings and primary body copy |
| `--color-text-secondary` | `#4A6741` | Muted leafy green — Captions, supporting descriptions, and metadata |
| `--color-text-muted` | `#8FAE8A` | Pale sage green — Input placeholders, disabled states, and footnotes |
| `--color-border` | `#D4E4D0` | Soft sage border — Card outlines, dividers, and table boundaries |
| `--color-error` | `#D62828` | Crimson red — Form error messages, allergen warnings, and destructive actions |

### 2.2 Nutrient & Macronutrient Color Coding
Used consistently across the application for instant macro recognition:

| Nutrient | Hex Color | Display Role | CSS Token |
|---|---|---|---|
| **Calories** | `#F77F00` | Warm Amber | `--color-macro-cal` |
| **Protein** | `#3A86FF` | Electric Blue | `--color-macro-protein` |
| **Carbohydrates** | `#FFBE0B` | Golden Yellow | `--color-macro-carbs` |
| **Total Fat** | `#FF6B6B` | Soft Coral Red | `--color-macro-fat` |
| **Dietary Fiber** | `#2D6A4F` | Deep Forest Green | `--color-macro-fiber` |
| **Sodium** | `#7B5EA7` | Slate Purple | `--color-macro-sodium` |

---

## 3. Typography System

### 3.1 Typefaces
To maintain editorial authority and visual warmth, NutriWise strictly uses two Google Fonts:

1. **Display & Editorial Headings:** `DM Serif Display`
   - *Weights:* 400 Regular (Italic & Normal)
   - *Application:* H1 hero headlines, page titles, article titles, food item names, recipe titles.
   - *Feel:* Literary, trustworthy, editorial, and timeless.

2. **UI & Body Typography:** `Inter`
   - *Weights:* 400 (Regular), 500 (Medium), 600 (Semi-Bold), 700 (Bold), 800 (Extra Bold)
   - *Application:* Body copy, buttons, labels, navigation, inputs, and tables.
   - *Feel:* Highly legible on all screen sizes, neutral, and precise.

### 3.2 Typographic Hierarchy & Scale

| Token | Desktop Size | Mobile Size | Weight | Line Height | Usage |
|---|---|---|---|---|---|
| `text-hero` | 56px / 3.5rem | 36px / 2.25rem | 400 (Serif) | 1.1 | Homepage hero headline |
| `text-h1` | 42px / 2.625rem | 30px / 1.875rem | 400 (Serif) | 1.2 | Page titles, article titles |
| `text-h2` | 32px / 2.0rem | 24px / 1.5rem | 400 (Serif) | 1.25 | Section headers, card section titles |
| `text-h3` | 24px / 1.5rem | 20px / 1.25rem | 600 (Inter) | 1.3 | Card titles, modal titles |
| `text-h4` | 20px / 1.25rem | 16px / 1.0rem | 600 (Inter) | 1.35 | Sub-sections, recipe step headers |
| `text-body-lg` | 18px / 1.125rem | 16px / 1.0rem | 400 (Inter) | 1.75 | Article body paragraphs |
| `text-body` | 16px / 1.0rem | 14px / 0.875rem | 400 (Inter) | 1.6 | General UI text, card descriptions |
| `text-sm` | 14px / 0.875rem | 13px / 0.8125rem | 500 (Inter) | 1.5 | Button text, form inputs, metadata |
| `text-xs` | 12px / 0.75rem | 11px / 0.6875rem | 600 (Inter) | 1.4 | Badges, nutrient tags, micro-labels |

### 3.3 Line Length Rule
- **Articles & Reading Copy:** Restricted to a maximum of **68 characters per line** (`max-w-3xl`) to maximize reading comfort and retention.
- **UI & Form Content:** Restricted to a maximum of **80 characters per line**.

---

## 4. Spacing, Elevation & Radii Tokens

### 4.1 Border Radii
```css
--radius-sm:  6px;    /* Micro-chips, small nutrient tags */
--radius-md:  12px;   /* Buttons, inputs, small cards */
--radius-lg:  20px;   /* Standard content cards, modals */
--radius-xl:  28px;   /* Feature containers, hero banners */
--radius-full: 9999px;/* Pill buttons, avatar rings */
```

### 4.2 Shadows (Subtle Forest Green Tint)
Unlike sterile neutral grey shadows, NutriWise shadows incorporate a subtle green tint:
- **Card Shadow (Resting):** `shadow-[0_2px_12px_rgba(45,106,79,0.06)]`
- **Card Shadow (Hover Lift):** `shadow-[0_8px_24px_rgba(45,106,79,0.12)]` with `-translate-y-1` transition
- **Dropdown / Modal Shadow:** `shadow-xl` / `shadow-2xl`

---

## 5. Core UI Components Specification

### 5.1 Buttons (`src/components/ui/Button.tsx`)
- **Primary:** `bg-[#2D6A4F] text-white hover:bg-[#245840] rounded-[12px]`
- **Secondary:** `bg-[#F0F4EF] text-[#2D6A4F] hover:bg-[#E2ECE0]`
- **Accent (Premium CTA):** `bg-[#F77F00] text-white hover:bg-[#E07200]`
- **Outline:** `border-1.5 border-[#2D6A4F] text-[#2D6A4F] bg-transparent hover:bg-[#F0F4EF]`
- **Ghost:** `text-[#4A6741] hover:bg-[#F0F4EF]`
- **Micro-Interaction:** Scale down to `0.98` on active press.

### 5.2 FDA-Style Nutrition Facts Label (`src/components/shared/NutritionFacts.tsx`)
- Thick 8px black top and bottom section bars.
- Prominent 36px bold **Calories** callout.
- Right-aligned `% Daily Value*` based on FDA reference 2,000 kcal diet.
- Sub-item indentations for *Saturated Fat*, *Dietary Fiber*, and *Total Sugars*.
- Standard FDA footnote explaining DV contribution.

### 5.3 Serving Calculator (`src/components/shared/ServingCalculator.tsx`)
- Plus (`+`) and minus (`-`) stepper buttons.
- Quick preset buttons for `1 person`, `2 people`, `4 people`, and `6 people`.
- Live visual indicator confirming when ingredients are scaled from base servings.

### 5.4 MacroBadges (`src/components/shared/MacroBadges.tsx`)
- Color-coded badges for Calories, Protein, Carbs, Fat, Fiber, and Sodium.
- Compact layout with bold values and clean rounded styling.

### 5.5 WeeklyCalendar Component (`src/components/shared/WeeklyCalendar.tsx`)
- Horizontal day-tab selector (Monday through Sunday) with daily calorie badges.
- Daily macro summary bar.
- Individual meal slot cards with prep times, calorie counts, recipe links, and a **"Swap Meal"** alternative modal.

---

## 6. Accessibility (a11y) & Responsive Rules

### 6.1 Contrast Ratios
- All primary text (`#1A2E1A`) on surface (`#FAFAF7`) exceeds **14:1 contrast ratio**, far surpassing the WCAG AA requirement of 4.5:1.
- Secondary text (`#4A6741`) maintains a contrast ratio of **6.2:1**.

### 6.2 Focus Indicators
- All interactive controls (buttons, inputs, tabs, checkboxes) feature a visible `focus:ring-2 focus:ring-[#2D6A4F] focus:ring-offset-2`.

### 6.3 Touch Targets
- All buttons and links maintain a minimum touch target area of **44px × 44px** on mobile devices.

---

*Document approved for NutriWise USA Platform v2.0.*
