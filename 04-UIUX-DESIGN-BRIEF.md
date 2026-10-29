# UI/UX Design Brief & Design System Specification
## NutriWise USA — Health & Nutrition Platform

**Document Identifier:** NW-DS-004  
**Version:** 2.0 (Design Token & Component Constitution Edition)  
**Date:** October 2026  
**Status:** Approved for Development & Implementation  
**Design Philosophy:** Evidence-based, editorial warmth, culinary freshness, and clinical accessibility.

---

## 1. Brand Identity & Emotional Resonance

### 1.1 Brand Metaphor
NutriWise USA is modeled not on a sterile medical facility or a trendy fitness fad, but on an esteemed, approachable clinical dietitian who is also an accomplished culinary enthusiast. It blends the intellectual authority of peer-reviewed nutritional science with the sensory warmth of fresh farmers market produce and home-cooked family dinners.

```
CLINICAL COLDNESS (Sterile, hospital-like)      ◄───[ NutriWise USA ]───►      DIET FAD NOISE (Aggressive, guilt-based)
- Intimidating medical jargon                    - Editorial serif warmth       - "Before/After" shock photos
- Sterile laboratory gray/blue                   - Deep forest green vitality   - Extreme caloric restriction
- Impersonal clinical forms                      - Clear, evidence-backed steps  - Unsubstantiated "miracle" pills
```

### 1.2 Design Pillars
1. **Confident Authority:** Typography and layout inspire immediate trust. Information hierarchy is crystal-clear; statements are backed by visible citations and verified dietitian credentials.
2. **Culinary Warmth:** Rich, natural earth and botanical tones (`#2D6A4F`, `#FAFAF7`, `#F0F4EF`) replace sterile corporate neutrals. Food imagery is natural, beautifully lit, and unadulterated.
3. **Data-Dense Clarity:** Nutrition tables and macro breakdowns mimic familiar FDA standards while employing crisp visual indicators and high-contrast color coding.
4. **Frictionless Utility:** Complex multi-day meal plans and multi-aisle grocery lists feel effortless to read, navigate, and execute on mobile viewports.

---

## 2. Design Tokens: Color Architecture

### 2.1 Core Brand Palette

| Token Identifier | Hex Value | RGB Value | HSL Value | WCAG Contrast (on White) | Design Role & Application |
|---|---|---|---|---|---|
| `--color-primary` | `#2D6A4F` | `45, 106, 79` | `153°, 40%, 30%` | `6.8:1` (AAA Large, AA Normal) | Brand hero color, primary CTAs, active tab indicators, links |
| `--color-primary-hover` | `#245840` | `36, 88, 64` | `152°, 42%, 24%` | `8.9:1` (AAA) | Hover state for primary buttons, deep headings |
| `--color-primary-light` | `#52B788` | `82, 183, 136` | `152°, 41%, 52%` | `2.4:1` (UI Elements) | Accent highlights, secondary pill badges, subtle active borders |
| `--color-primary-soft` | `#D8F3DC` | `216, 243, 220` | `129°, 53%, 90%` | Light tint | Badge backgrounds, highlighted table rows, active tab wash |
| `--color-accent` | `#F77F00` | `247, 127, 0` | `31°, 100%, 48%` | `3.2:1` (Large Text/UI) | Energy highlights, premium crowns, alert badges, upgrade CTAs |
| `--color-accent-hover` | `#D66D00` | `214, 109, 0` | `31°, 100%, 42%` | `4.2:1` (AA Large) | Hover state for accent buttons |
| `--color-surface` | `#FAFAF7` | `250, 250, 247` | `60°, 17%, 97%` | Background | Primary page body background (warm off-white, reduces eye strain) |
| `--color-surface-card` | `#FFFFFF` | `255, 255, 255` | `0°, 0%, 100%` | Background | Elevated cards, modals, dropdowns, header background |
| `--color-surface-alt` | `#F0F4EF` | `240, 244, 239` | `108°, 17%, 95%` | Background | Subtle section panels, AI bubble backgrounds, table headers |
| `--color-text-primary` | `#1A2E1A` | `26, 46, 26` | `120°, 28%, 14%` | `13.6:1` (AAA) | High-contrast body text, article paragraphs, H1–H4 headlines |
| `--color-text-secondary` | `#4A6741` | `74, 103, 65` | `106°, 23%, 33%` | `5.6:1` (AA Normal) | Subtitles, metadata, author credentials, form labels |
| `--color-text-muted` | `#8FAE8A` | `143, 174, 138` | `112°, 19%, 61%` | `2.6:1` (Decorative) | Input placeholders, disabled icons, timeline connecting bars |
| `--color-border` | `#D4E4D0` | `212, 228, 208` | `108°, 27%, 85%` | Subtle border | Card dividing lines, input field borders, table borders |
| `--color-error` | `#D62828` | `214, 40, 40` | `0°, 69%, 50%` | `5.1:1` (AA) | Form validation errors, critical allergen warnings, high-sodium alerts |
| `--color-warning` | `#F77F00` | `247, 127, 0` | `31°, 100%, 48%` | Alert tint | Cautionary dietary flags, approaching quota warnings |
| `--color-success` | `#2D6A4F` | `45, 106, 79` | `153°, 40%, 30%` | Confirmation | Form completion, diet diary logged toasts, payment confirmation |

### 2.2 Standardized Nutrition Metric Palette
Consistently applied across FDA Nutrition Labels, Recipe Cards, and Diary Trackers:

| Metric Token | Hex Color | Swatch Role | Rationale |
|---|---|---|---|
| `--nutrient-calories` | `#F77F00` | Warm Amber | Represents energetic thermal expenditure |
| `--nutrient-protein` | `#3A86FF` | Deep Electric Blue | Universal structural association (lean muscle & repair) |
| `--nutrient-carbs` | `#FFBE0B` | Golden Maize | Association with wholesome whole grains and solar energy |
| `--nutrient-fat` | `#FF6B6B` | Soft Coral Red | Association with lipid-soluble vitamins and cellular membranes |
| `--nutrient-fiber` | `#2D6A4F` | Forest Green | High-priority nutrient; evokes botanical, leafy richness |
| `--nutrient-sodium` | `#7B5EA7` | Slate Amethyst | Distinct cautionary electrolyte indicator |

---

## 3. Typography & Typesetting Hierarchy

The NutriWise typographic system pairs two Google Fonts: **DM Serif Display** for editorial presence and narrative authority, and **Inter** for clinical data precision and interface clarity.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        TYPOGRAPHIC SPECIFICATION                       │
├─────────────┬─────────────────┬──────────┬──────────────┬──────────────┤
│ Token       │ Family          │ Weight   │ Size / Line  │ Letter Sp.   │
├─────────────┼─────────────────┼──────────┼──────────────┼──────────────┤
│ `hero`      │ DM Serif Display│ 400 Reg  │ 56px / 1.15  │ -0.02em      │
│ `h1`        │ DM Serif Display│ 400 Reg  │ 40px / 1.20  │ -0.015em     │
│ `h2`        │ DM Serif Display│ 400 Reg  │ 30px / 1.25  │ -0.01em      │
│ `h3`        │ Inter           │ 600 Semi │ 22px / 1.30  │ -0.01em      │
│ `h4`        │ Inter           │ 600 Semi │ 18px / 1.35  │ 0.00em       │
│ `body-lg`   │ Inter           │ 400 Reg  │ 18px / 1.65  │ 0.00em       │
│ `body`      │ Inter           │ 400 Reg  │ 15px / 1.60  │ 0.00em       │
│ `body-sm`   │ Inter           │ 400 Reg  │ 13px / 1.50  │ +0.01em      │
│ `caption`   │ Inter           │ 500 Med  │ 12px / 1.40  │ +0.02em      │
│ `badge`     │ Inter           │ 600 Semi │ 11px / 1.20  │ +0.04em (Caps│
└─────────────┴─────────────────┴──────────┴──────────────┴──────────────┘
```

### 3.1 Line-Length & Typographic Discipline
- **Editorial Article Columns:** Strictly bounded to a maximum reading width of `68ch` (~720px) to prevent saccadic eye fatigue during long clinical reads.
- **UI & Form Widths:** Max `480px` for auth and onboarding single-column inputs; max `1280px` for multi-card catalog views.

---

## 4. Spacing, Elevation & Geometric Framework

### 4.1 Spacing Scale (Base Unit: 4px)
```
--space-1:  4px   | Micro-spacing between badge icons and text
--space-2:  8px   | Gap between related chips; internal tag padding
--space-3:  12px  | Compact form field padding; card internal gaps
--space-4:  16px  | Standard container padding on mobile; grid gap
--space-5:  20px  | Modal padding; list item separation
--space-6:  24px  | Desktop card internal padding; column gutters
--space-8:  32px  | Section sub-headers; stack separation
--space-10: 40px  | Distance between major functional modules
--space-12: 48px  | Distinct component blocks on desktop
--space-16: 64px  | Major section vertical padding on tablet
--space-20: 80px  | Homepage section vertical rhythm
--space-24: 96px  | Hero section top and bottom clearance
```

### 4.2 Elevation & Shadow Tokens
To preserve botanical warmth, shadows are tinted with a minute trace of forest green (`rgba(45, 106, 79, ...)`):
```css
--shadow-sm:  0 1px 3px rgba(45, 106, 79, 0.07), 0 1px 2px rgba(45, 106, 79, 0.04);
--shadow-md:  0 4px 14px rgba(45, 106, 79, 0.09), 0 2px 6px rgba(45, 106, 79, 0.04);
--shadow-lg:  0 12px 28px rgba(45, 106, 79, 0.12), 0 4px 10px rgba(45, 106, 79, 0.06);
--shadow-xl:  0 20px 42px rgba(45, 106, 79, 0.15), 0 8px 16px rgba(45, 106, 79, 0.08);
```

### 4.3 Corner Radii Hierarchy
```
--radius-sm:   6px   (Small badges, macro chips, tooltips)
--radius-md:  12px   (Standard buttons, text inputs, dropdown menus, table corners)
--radius-lg:  18px   (Content cards, recipe preview containers, alert panels)
--radius-xl:  28px   (Featured hero cards, weekly plan tabs, modal containers)
--radius-full: 9999px (Pill tags, search bars, user avatars)
```

---

## 5. Primitive Component Specifications

### 5.1 Interactive Buttons (`src/components/ui/Button.tsx`)

```
┌────────────────────────────────────────────────────────────────────────┐
│                        BUTTON DESIGN CONTRACT                          │
├───────────┬──────────────────────┬──────────────────────┬──────────────┤
│ Variant   │ Background           │ Text / Border        │ Hover State  │
├───────────┼──────────────────────┼──────────────────────┼──────────────┤
│ Primary   │ `#2D6A4F`            │ `#FFFFFF` / None     │ `#245840`    │
│ Secondary │ `#FFFFFF`            │ `#2D6A4F` / 1.5px Sol│ `#F0F4EF`    │
│ Accent    │ `#F77F00` (Amber)    │ `#FFFFFF` / None     │ `#D66D00`    │
│ Ghost     │ Transparent          │ `#4A6741` / None     │ `#F0F4EF`    │
│ Danger    │ `#D62828`            │ `#FFFFFF` / None     │ `#B71C1C`    │
└───────────┴──────────────────────┴──────────────────────┴──────────────┘
```
- **Focus Ring:** Enforced `2px solid #2D6A4F` with `2px offset` on `:focus-visible`.
- **Active State:** Tactile `scale(0.98)` transform with `100ms ease`.

### 5.2 Authentic FDA Nutrition Facts Label (`src/components/shared/NutritionFacts.tsx`)
Adheres meticulously to US FDA 21 CFR 101.9 vertical label formatting:
- **Outer Border:** `2px solid #1A2E1A`.
- **Top Header:** Bold, sans-serif `"Nutrition Facts"` in 32px black typeface.
- **Serving Information:** Serving size highlighted with servings per container.
- **Calories Banner:** Heavy top border (`8px solid #1A2E1A`), with word `"Calories"` in 16px bold and value in 34px ultra-bold right-aligned.
- **Nutrient Hierarchy:** Primary macronutrients indented; sub-nutrients (Saturated Fat, Trans Fat, Added Sugars) indented `16px`.
- **Daily Value Footnote:** Right-aligned standard % Daily Value based on 2,000-calorie reference intake.

### 5.3 Serving Size Calculator (`src/components/shared/ServingCalculator.tsx`)
- Allows 1-click toggling between `1`, `2`, `4`, `6`, and `8` servings.
- Quantities scale dynamically using intelligent culinary fractions (e.g., `1/4 cup`, `1/2 tbsp`, `1 1/2 lbs`).

---

## 6. Accessibility & Responsive Viewport Rules

```
┌────────────────────────────────────────────────────────────────────────┐
│                  ACCESSIBILITY & ADAPTIVE BREAKPOINTS                  │
├─────────────┬─────────────┬─────────────┬──────────────────────────────┤
│ Breakpoint  │ Width Range │ Grid Columns│ Primary Layout Adaptation    │
├─────────────┼─────────────┼─────────────┼──────────────────────────────┤
│ Mobile      │ 320px–639px │ 4 Columns   │ Single-column vertical flow, │
│             │             │ 16px gutter │ horizontal scroll tags,      │
│             │             │             │ sticky bottom navigation bar │
├─────────────┼─────────────┼─────────────┼──────────────────────────────┤
│ Tablet      │ 640px–1023px│ 8 Columns   │ 2-column card catalogs,      │
│             │             │ 20px gutter │ collapsed header navigation, │
│             │             │             │ full-width nutrition modals  │
├─────────────┼─────────────┼─────────────┼──────────────────────────────┤
│ Desktop     │ 1024px–1440p│ 12 Columns  │ 3-column recipe cards,       │
│             │             │ 24px gutter │ sticky table of contents,    │
│             │             │             │ persistent sidebar filters   │
└─────────────┴─────────────┴─────────────┴──────────────────────────────┘
```

- **Touch Targets:** Strict enforcement of minimum `44px × 44px` interactive area on mobile devices.
- **Color Contrast:** All body text meets or exceeds WCAG 2.1 AA (`4.5:1`), with headline elements satisfying AAA (`7.0:1`).
- **Screen Reader Support:** Semantic HTML tags (`<main>`, `<article>`, `<nav>`, `<aside>`, `<section>`), `aria-expanded` on accordion drawers, and `aria-live="polite"` on AI generation spinners.

---

*Document Author: NutriWise USA Design & Brand Systems Guild*  
*Classification: Confidential — Approved for Engineering Build*
