# UI/UX Design Brief
## NutriWise USA — Health & Nutrition Platform

**Version:** 1.0  
**Date:** October 2026  
**Status:** Approved for Development

---

## 1. Design Identity

### 1.1 Brand Direction
NutriWise USA is not a clinical health app. It is a modern, approachable nutrition companion — the difference between a cold hospital brochure and a knowledgeable friend who happens to know everything about food. The visual language should feel:

- **Confident** — authoritative without being intimidating
- **Warm** — inviting, not sterile
- **Fresh** — clean lines, food-forward, energetic
- **Trustworthy** — structured, readable, evidence-based feel

### 1.2 Design Personality
If NutriWise were a person: a certified nutritionist who also loves cooking, shops at farmers markets, and explains complex nutrition in plain English over a cup of green tea.

**NOT:** medical institution, weight-loss app with before/after photos, fad diet brand

---

## 2. Color Palette

### 2.1 Core Palette

| Token | Hex | Role |
|---|---|---|
| `--color-primary` | `#2D6A4F` | Deep forest green — primary actions, CTAs, nav active |
| `--color-primary-light` | `#52B788` | Mid green — hover states, highlights, badges |
| `--color-accent` | `#F77F00` | Warm amber-orange — energy, premium features, alerts |
| `--color-surface` | `#FAFAF7` | Off-white with slight warm tint — page background |
| `--color-surface-alt` | `#F0F4EF` | Soft green-tinted white — card backgrounds, sections |
| `--color-text-primary` | `#1A2E1A` | Near-black with green tint — body text |
| `--color-text-secondary` | `#4A6741` | Muted green — captions, metadata, labels |
| `--color-text-muted` | `#8FAE8A` | Light muted green — placeholders, disabled |
| `--color-border` | `#D4E4D0` | Soft green border |
| `--color-error` | `#D62828` | Red — errors, warnings |
| `--color-success` | `#2D6A4F` | Same as primary — success messages |

### 2.2 Nutrition-Specific Color Coding
Used for macro/nutrient badges throughout the app:

| Nutrient | Color | Hex |
|---|---|---|
| Calories | Warm amber | `#F77F00` |
| Protein | Deep blue | `#3A86FF` |
| Carbohydrates | Golden yellow | `#FFBE0B` |
| Fat | Soft coral | `#FF6B6B` |
| Fiber | Forest green | `#2D6A4F` |
| Sodium | Slate purple | `#7B5EA7` |

### 2.3 Dark Mode (Secondary — Phase 2)
- Background: `#111B11`
- Surface: `#1C2B1C`
- Text primary: `#E8F0E8`
- Primary: `#52B788`
- Accent: `#F77F00`

---

## 3. Typography

### 3.1 Typefaces

**Display / Headlines:** `DM Serif Display`
- Source: Google Fonts (free)
- Usage: H1, H2, hero headlines, article titles, food names
- Feel: Editorial, trustworthy, slightly premium

**Body / UI:** `Inter`
- Source: Google Fonts (free)
- Usage: Body text, buttons, labels, navigation, all UI elements
- Feel: Clean, highly legible, modern

No third typeface. Two is enough; three is decoration.

### 3.2 Type Scale

| Token | Size | Weight | Line Height | Usage |
|---|---|---|---|---|
| `--text-hero` | 56px / 3.5rem | 400 (Serif) | 1.1 | Homepage hero headline |
| `--text-h1` | 42px / 2.625rem | 400 (Serif) | 1.2 | Page titles, article titles |
| `--text-h2` | 32px / 2rem | 400 (Serif) | 1.25 | Section headings |
| `--text-h3` | 24px / 1.5rem | 600 (Inter) | 1.3 | Card titles, sub-sections |
| `--text-h4` | 20px / 1.25rem | 600 (Inter) | 1.35 | Recipe step headers |
| `--text-body-lg` | 18px / 1.125rem | 400 (Inter) | 1.7 | Article body text |
| `--text-body` | 16px / 1rem | 400 (Inter) | 1.6 | General body, UI text |
| `--text-sm` | 14px / 0.875rem | 400 (Inter) | 1.5 | Captions, metadata |
| `--text-xs` | 12px / 0.75rem | 500 (Inter) | 1.4 | Labels, badges, tags |

**Line length rule:** Article body text max 68 characters per line. UI content max 80 characters.

---

## 4. Spacing & Layout

### 4.1 Spacing Scale (4px base)
```
--space-1:  4px
--space-2:  8px
--space-3:  12px
--space-4:  16px
--space-5:  20px
--space-6:  24px
--space-8:  32px
--space-10: 40px
--space-12: 48px
--space-16: 64px
--space-20: 80px
--space-24: 96px
```

### 4.2 Layout Grid
- **Desktop:** 12-column grid, max-width 1280px, 24px gutters
- **Tablet:** 8-column grid, max-width 768px, 20px gutters
- **Mobile:** 4-column grid, max-width 375px, 16px gutters

### 4.3 Border Radius
```
--radius-sm:  6px   (tags, badges, small chips)
--radius-md:  12px  (cards, inputs, buttons)
--radius-lg:  20px  (large cards, modal panels)
--radius-xl:  32px  (hero elements, feature boxes)
--radius-full: 9999px (pill buttons, avatar circles)
```

### 4.4 Shadows
```
--shadow-sm: 0 1px 3px rgba(45,106,79,0.08)
--shadow-md: 0 4px 16px rgba(45,106,79,0.10)
--shadow-lg: 0 8px 32px rgba(45,106,79,0.12)
```
Shadows have a green tint (matching brand), not neutral grey.

---

## 5. Components

### 5.1 Buttons

**Primary Button**
- Background: `--color-primary` (`#2D6A4F`)
- Text: White, Inter 500, 15px
- Border radius: `--radius-md` (12px)
- Padding: 12px 24px
- Hover: `#245840` (darker green)
- Active: Scale 0.98
- No shadow, no gradient

**Secondary Button**
- Background: Transparent
- Border: 1.5px solid `--color-primary`
- Text: `--color-primary`
- Hover: Background `--color-surface-alt`

**Accent Button (Premium CTA)**
- Background: `--color-accent` (`#F77F00`)
- Text: White
- Used only for upgrade / premium prompts

**Ghost Button**
- No border, no background
- Text: `--color-text-secondary`
- Hover: Background `--color-surface-alt`

### 5.2 Input Fields
- Height: 48px
- Border: 1.5px solid `--color-border`
- Border radius: `--radius-md`
- Focus: Border color `--color-primary`, no glow/shadow
- Placeholder: `--color-text-muted`
- Label: 14px Inter 500, above field, not floating
- Error state: Red border + red helper text below

### 5.3 Cards

**Content Card (Article / Recipe / Food)**
- Background: White
- Border radius: `--radius-lg`
- Shadow: `--shadow-sm`
- Hover: `--shadow-md` + translate Y -2px (subtle lift)
- Image: 16:9 aspect ratio, top of card
- No hard border

**Nutrition Data Card**
- Background: `--color-surface-alt`
- Border-left: 4px solid nutrient color
- Compact, data-dense layout
- No shadow

**AI Response Card**
- Background: `--color-surface-alt`
- Border radius: `--radius-lg`
- Left icon: NutriWise leaf mark
- Distinct from user message (right-aligned bubbles)

### 5.4 Navigation

**Desktop Header**
- Height: 64px
- Background: White with 1px border-bottom `--color-border`
- Logo: Left
- Nav links: Center (Articles | Recipes | Foods | Diet Plans | AI Tools)
- Right: Search icon | Login | Sign Up (primary button)
- Sticky on scroll, no shadow added on scroll (border sufficient)

**Mobile Header**
- Hamburger menu (right)
- Logo centered
- Full-screen overlay nav on open
- Bottom nav bar on mobile for logged-in users:
  - Home | Recipes | AI Chat | Diary | Dashboard

### 5.5 Nutrition Facts Display
- Modeled after US FDA Nutrition Facts label style
- Bold top border (thick), separator lines between sections
- "Serving size" prominent
- Calorie count large (28px, bold)
- % Daily Value right-aligned
- Used consistently across food pages, recipes, diary

### 5.6 Tags & Badges
```
Diet tags:    Vegetarian (green) | Vegan (deep green) | Gluten-Free (blue) | Dairy-Free (purple)
Time tags:    "20 min" (amber) | "Under 30 min" (amber)
Premium badge: Crown icon + "Premium" (accent orange)
Reviewed badge: Shield icon + "Expert Reviewed" (primary green)
```

---

## 6. Page-Specific Design Guidance

### 6.1 Home Page
```
HERO SECTION
───────────────────────────────────────────────────
  [Large organic food photography — full bleed]
  Eat smarter.                    [Nutrition     ]
  Live better.          ←→        [summary card  ]
  [serif, 56px]                   [floating right]
  
  "Get Your Free Meal Plan →" [primary button]
───────────────────────────────────────────────────
```
- Food photography behind text (not illustration)
- Serif headline feels editorial, not startup-y
- Floating nutrition card creates visual interest

### 6.2 Article Pages
- Single column, max 720px wide (readable)
- Serif font for article title and body
- Author card at top (photo, name, credentials)
- Reviewer card below author
- Inline references as footnotes
- Sticky table of contents on desktop (for long articles)
- Related articles at bottom (3 cards)
- Reading progress bar (optional, Phase 2)

### 6.3 Recipe Pages
- Two-column desktop: Ingredients left | Steps right
- Sticky ingredient list while scrolling steps
- Nutrition card: FDA-style display
- Serving size adjuster: Clean number input with +/- buttons
- Step numbers: Large, `--color-primary`, acts as anchor

### 6.4 Food Database Pages
- Nutrition table: Full-width on mobile, half-width on desktop
- Serving size dropdown (built-in + custom)
- Food comparison: Side-by-side table
- Related recipes: Horizontal scroll on mobile

### 6.5 AI Chat Interface
```
┌─────────────────────────────────┐
│  🌿 NutriWise AI Assistant      │
│  Ask me anything about food     │
├─────────────────────────────────┤
│                                  │
│         [AI response bubble]     │
│  [User bubble]                   │
│         [AI response bubble]     │
│                                  │
├─────────────────────────────────┤
│  [Suggested questions chips]     │
├─────────────────────────────────┤
│  [Type your question...] [Send]  │
└─────────────────────────────────┘
```
- AI bubble: Left-aligned, `--color-surface-alt`, leaf icon
- User bubble: Right-aligned, `--color-primary` background, white text
- Suggested question chips: Horizontal scroll, pill style

### 6.6 Meal Plan Display
- Weekly calendar: Horizontal tab bar (Mon–Sun)
- Each day: 4 sections (Breakfast | Lunch | Dinner | Snacks)
- Meal slot: Card with food photo, name, time, calories
- Daily nutrition summary: Horizontal bar chart at bottom of each day
- "Replace this meal" → Opens modal with AI alternatives

---

## 7. Responsive Behavior

### Desktop (1280px+)
- Full navigation in header
- Side-by-side layouts for content
- Sticky sidebars for article TOC and recipe ingredients

### Tablet (768px – 1279px)
- Navigation collapses to hamburger at 960px
- Most two-column layouts become single column
- Cards: 2-per-row grids

### Mobile (< 768px)
- Single column throughout
- Bottom navigation bar (logged-in users)
- Touch targets minimum 44px × 44px
- Horizontal scroll for: recipe filters, meal plan days, food comparison
- Full-screen modals instead of side panels

---

## 8. Motion & Interactions

**Guiding principle:** Motion answers actions. Motion does not perform.

| Interaction | Animation |
|---|---|
| Page load | No entrance animation — content appears immediately |
| Modal open | Scale 0.96 → 1.0 + fade in, 150ms ease-out |
| Toast notification | Slide in from top-right, 200ms |
| Card hover | Translate Y -2px + shadow increase, 150ms ease |
| Button click | Scale 0.98, 100ms |
| AI response | Text streams in (typewriter) if streaming supported, else fade |
| Tab switch | Horizontal slide, 200ms ease-in-out |
| Accordion open | Height transition, 200ms |

**Reduced motion:** All animations disabled when `prefers-reduced-motion: reduce`. Content still appears, no transitions.

---

## 9. Icons

- Library: **Lucide React** (MIT license, free)
- Size: 20px (inline), 24px (nav/header), 32px (feature icons)
- Stroke width: 1.5px (matches brand's clean aesthetic)
- Color: Inherits from text color (no hardcoded icon colors)
- Food emoji: Used only in AI chat suggestions and onboarding — not in formal UI

---

## 10. Images & Photography Direction

- **Food photography:** Real food, natural lighting, overhead or 45° angle shots
- **NOT:** Stock photo aesthetic, extreme close-ups, artificially colored food
- **People in images:** Diverse representation (US audience — multiple ethnicities, ages, body types)
- **Illustrations:** Not used — photography and clean UI only
- **Image treatment:** No filters, no overlays except for hero text contrast (semi-transparent gradient)
- **Format:** WebP primary, JPEG fallback, PNG for logos/icons only

---

## 11. Accessibility

| Requirement | Standard |
|---|---|
| Color contrast (text) | WCAG AA minimum — 4.5:1 for body, 3:1 for large text |
| Keyboard navigation | All interactive elements reachable and operable via keyboard |
| Focus indicators | Visible: 2px solid `--color-primary`, 2px offset |
| ARIA labels | All icon-only buttons labeled |
| Form labels | Every input has an associated visible label |
| Error messages | Not color-only — includes icon and text |
| Images | Descriptive alt text on all content images |
| Skip link | "Skip to main content" at top of every page |
| Screen reader | Semantic HTML (article, nav, main, aside, section) |

---

## 12. Admin Panel Design

- Separate design language from public site
- Background: `#F8F9FA` (neutral grey, not green tint)
- Left sidebar navigation (240px wide, collapsible)
- Tables: Striped rows, sortable columns, pagination
- Forms: Clean two-column layout on desktop, single column mobile
- Data visualization: Minimal charts (line charts for trends, bar for comparison)
- Admin typography: Inter only (no serif)
- No marketing-style design — functional and information-dense

---

*Document Owner: Design Lead*  
*Last Updated: October 2026*  
*Consistent with: PRD v1.0, App Flow v1.0*
