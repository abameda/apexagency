# APEX Agency Landing Page — Design Spec

## Overview

Single-page website for APEX Agency, a premium Shopify theme agency. Single self-contained `index.html` file with inline CSS & JS. No build tools, no JS dependencies. Only external dependency: Google Fonts loaded via `<link>` tags. Minimal luxury aesthetic with glassmorphism, 3D elements, and premium animations.

**Content max-width:** 1200px centered container. Full-bleed backgrounds on Stats Bar and Hero.

## Visual Identity

### Color System

Monochromatic — hierarchy through opacity and luminance only.

| Token | Value | Usage |
|-------|-------|-------|
| Background | `#0A0A0A` | Page background |
| Surface | `#111111` | Stats bar, elevated sections |
| Elevated | `#1A1A1A` | Cards on hover |
| Primary Text | `#FFFFFF` | Headings, CTAs |
| Secondary Text | `rgba(255,255,255,0.5)` | Body text |
| Muted Text | `rgba(255,255,255,0.25)` | Labels, captions |
| Border | `rgba(255,255,255,0.08)` | Card/section borders |
| Glass Fill | `rgba(255,255,255,0.03)` | Glassmorphism backgrounds |
| Glass Border | `rgba(255,255,255,0.08)` | Glassmorphism borders |
| Hover Brighten (subtle) | `rgba(255,255,255,0.06)` | Card backgrounds on hover |
| Hover Brighten (strong) | `rgba(255,255,255,0.1)` | Borders, active states on hover |

### Typography

All fonts from Google Fonts.

| Font | Weight | Usage |
|------|--------|-------|
| Orbitron | 300–400 | Logo, headings (thin weights for luxury feel) |
| Space Grotesk | 300–400 | Body text, descriptions, UI elements |
| JetBrains Mono | 400 | Stats numbers, labels, code accents |

### Glassmorphism

Applied to: nav bar, feature cards, pricing card, theme preview mockup.

```css
background: rgba(255, 255, 255, 0.03);
border: 1px solid rgba(255, 255, 255, 0.08);
border-radius: 16px;
backdrop-filter: blur(20px);
-webkit-backdrop-filter: blur(20px);
```

Cards glow subtly brighter on hover (border opacity increases to 0.12–0.15).

## Custom Cursor

Two-part cursor system replacing the default cursor:

- **Inner dot**: 6px white circle, follows mouse exactly, uses `mix-blend-mode: difference` to invert against content
- **Outer ring**: 32px circle with `rgba(255,255,255,0.15)` border, follows mouse with smooth delay (lerp interpolation, ~0.15 factor)

### Hover States

- **Links/buttons**: Ring scales up (1.5x), border brightens
- **Text**: Dot morphs into thin vertical line
- **Cards**: Ring expands to subtly "hug" the card edges
- **Hidden on mobile**: Custom cursor disabled on touch devices

## Animation System

### Scroll Reveals (Intersection Observer)

- Elements fade up with slight scale (0.98 → 1.0)
- `opacity: 0 → 1`, `translateY(20px) → 0`
- Easing: `cubic-bezier(0.25, 0.46, 0.45, 0.94)`, duration 0.6s
- Staggered timing for groups (0.1s delay between items)
- Trigger: element 20% visible

### Hover Transitions

- Cards: `translateY(-4px)`, border brightens, 0.3s ease
- Buttons: background opacity shift, 0.2s ease
- Links: opacity 0.5 → 1.0, 0.2s ease

### Floating Elements

- Hero mockup: gentle up/down float (CSS keyframes, 6s loop, 10px range)
- Background gradient orbs: slow drift animation
- 3D geometric shapes: continuous slow rotation

### Smooth Scroll

- `scroll-behavior: smooth` on html
- Nav links animate to section targets
- Scroll-triggered counter animations for stats bar

## 3D Elements

All implemented with CSS 3D transforms — no WebGL/Three.js.

- **Hero mockup**: Browser window in perspective, subtle rotation on mouse move (`rotateY(±5deg)`, `rotateX(±3deg)`)
- **Feature cards**: 3D tilt toward cursor on hover using `perspective(1000px)` and `rotateX/rotateY` calculated from mouse position
- **Floating 3D shapes**: Translucent geometric shapes (cubes, octahedrons) in background behind features section, using CSS 3D transforms with continuous rotation keyframes
- **Pricing card**: 3D glass card with visible depth, subtle tilt on hover, animated shine stripe on entrance

## Sections

### 1. Navigation Bar (Fixed)

Three switchable nav styles via `data-nav-style="a|b|c"` attribute on the `<nav>` element. This is a developer toggle — change the attribute value in the HTML to switch styles. No runtime UI switcher.

**Style A — Full Pill** (default)
- Logo (`APEX` in Orbitron, letter-spacing: 4px, weight 300) on the left
- Right side: links grouped in a rounded pill (`border-radius: 50px`, glass fill + border) + CTA button next to it
- CTA: "Get The Theme" — white background, dark text, rounded pill shape

**Style B — Separated Pill**
- Logo left, links pill centered, CTA right
- Balanced three-part layout

**Style C — All-In-One Capsule**
- Single centered floating pill containing logo, links, and CTA
- Logo separated by thin vertical divider inside pill

**All Styles — Common Behavior:**
- Fixed to top with `position: fixed`
- Glass effect strengthens on scroll (background opacity 0.03 → 0.08)
- Active/hover link gets inner pill highlight (`rgba(255,255,255,0.08)` background)
- Logo and links fade in on load with stagger
- Mobile: collapses to logo + hamburger icon (3 horizontal lines, animates to X on open). Full-screen glass overlay with centered links + CTA button. Closes on: tap X, tap outside, tap a link. Overlay transition: fade in (0.3s ease)

### 2. Hero Section

Full viewport height (`100vh`).

**Layout:**
- Left (60%): label, headline, subtext, two CTAs
- Right (40%): 3D floating store mockup

**Content:**
- Label: `PREMIUM SHOPIFY THEME` — JetBrains Mono, 10px, letter-spacing 4px, 25% white
- Headline: "The Shopify Theme That Turns Visitors Into Buyers" — Orbitron, ~48px, weight 200, white
- Subtext: "Built for speed, designed for conversion. The last theme your store will ever need." — Space Grotesk, 16px, 35% white
- CTA Primary: "BUY NOW — $99" (or "BUY NOW — 10,000 LE" for Egypt) — white bg, dark text, rounded
- CTA Secondary: "LIVE PREVIEW →" — ghost button, thin white border, placeholder `#` link (owner will add Shopify demo store URL later)

**Geo-Based Pricing:**
- Detection method: `Intl.DateTimeFormat().resolvedOptions().timeZone` — match exactly `"Africa/Cairo"` only
- If match: show "10,000 LE" pricing throughout the page
- Otherwise: show "$99" pricing (default/fallback)

**Background:**
- Subtle radial gradient orbs (`rgba(255,255,255,0.02)`) drifting slowly
- No grid, no scanlines, no particles — clean and minimal

**Store Mockup:**
- CSS browser chrome (three dots, address bar hint)
- Abstract store layout wireframe inside (nav, hero block, product grid)
- Wrapped in `perspective(800px)` container
- Rotates subtly on mouse move
- Floats with CSS keyframe animation (6s loop)

**Animations:**
- Headline fades in word-by-word (0.1s stagger)
- Subtext and CTAs fade up after headline completes
- Mockup slides in from right with slight rotation
- Background orbs drift continuously

**Mobile:**
- Stacks vertically — text on top, mockup below (smaller, centered)
- CTAs go full-width
- Headline font size scales down (~28px)

### 3. Stats Bar

Dark surface strip between hero and features.

**Layout:** 4 stats in a row with thin vertical dividers (`1px, rgba(255,255,255,0.06)`)

| Stat | Value | Label |
|------|-------|-------|
| Stores | 500+ | STORES |
| Satisfaction | 99% | SATISFACTION |
| Load Speed | 2s | LOAD SPEED |
| Support | 24/7 | SUPPORT |

- Numbers: JetBrains Mono, ~28px, weight 300
- Labels: Space Grotesk, 10px, letter-spacing 3px, 25% white
- Background: `rgba(255,255,255,0.02)` surface with top/bottom borders
- Animation: numeric values count up from 0 when scrolled into view (duration ~2s, easeOut). "500+" counts 0→500 then appends "+". "99%" counts 0→99 then appends "%". "2s" counts 0→2 then appends "s". "24/7" appears without counting (fade in only)
- Mobile: 2x2 grid, no vertical dividers

### 4. Features Grid

**Header:**
- Label: `WHAT YOU GET` — JetBrains Mono, 10px, letter-spacing 4px
- Headline: "Built Different" — Orbitron, ~28px, weight 200

**Grid:** 3 columns × 2 rows (6 cards). Gap: 16px.

**Cards:**
- Glass card style (see Glassmorphism spec)
- Rounded corners: 12px
- Each contains: inline SVG icon in bordered square (32px), title (Space Grotesk 14px, white), description (12px, 35% white)
- 3D tilt on hover (perspective transform following cursor position)
- Staggered fade-up on scroll (0.1s delay each)

**Features:**

| # | Title | Icon (CSS/SVG) | Description |
|---|-------|----------------|-------------|
| 1 | Blazing Performance | Lightning bolt | Sub-2s load times. Optimized assets, lazy loading, minimal JS overhead. |
| 2 | Mobile-First Design | Phone outline | Built mobile-first. Every pixel considered for thumb-friendly navigation. |
| 3 | Conversion Optimized | Trending-up arrow | Every layout decision backed by conversion data. Sell more, effortlessly. |
| 4 | One-Click Setup | Wrench/gear | Import demo content in one click. Be live in minutes, not days. |
| 5 | SEO Ready | Search/magnifier | Clean semantic markup, structured data, optimized meta. Rank higher. |
| 6 | Premium Support | Chat bubble | Direct access to our team. Real humans, real answers, real fast. |

**Background:** 2-3 floating 3D geometric shapes (translucent, slow rotation) behind the grid for depth.

**Mobile:** 1 column stack, full-width cards.

### 5. Theme Preview

**Layout:** Two columns — left (35%) feature list, right (65%) 3D mockup.

**Left — Feature List:**
- Label: `EXPLORE` — JetBrains Mono
- 4 items: Homepage, Product Page, Collection, Cart & Checkout
- Each item: title + short description
- Active item has white left border (2px), bright text
- Inactive items have muted border and text
- Active item changes as user scrolls through the section: the Theme Preview section is divided into 4 equal scroll zones (25% each). As the user scrolls through each zone, the corresponding feature highlights. Clicking a feature item also switches the mockup.

**Right — 3D Mockup:**
- Browser chrome frame in perspective (`rotateY(-8deg) rotateX(3deg)`)
- Abstract store wireframe inside — each page layout is a different wireframe arrangement:
  - Homepage: nav + hero banner + 3-column product grid
  - Product Page: large image left + details right + add-to-cart button
  - Collection: filter sidebar + 3-column product grid
  - Cart & Checkout: item list + summary sidebar
- Crossfades between layouts (0.4s ease) as the left list highlights change
- Tilts on mouse move for parallax depth

**Mobile:** Stacks vertically — mockup on top, feature list below as horizontal scroll pills.

### 6. Pricing

**Header:**
- Label: `PRICING` — JetBrains Mono
- Headline: "One Theme. Everything Included." — Orbitron, weight 200

**Card:** Single centered glassmorphism card, max-width ~380px.

- Subtle 3D perspective (`rotateX(2deg)`)
- Animated glass shine stripe on scroll entrance (linear gradient sweeping across)
- 3D tilt on hover following cursor

**Content:**
- Label: `APEX THEME`
- Price: `$99` or `10,000 LE` (geo-detected, same logic as hero)
- Subtitle: "one-time payment"
- Feature list (checkmarks): 20+ Premium Sections, Lifetime Updates, Premium Support, Mobile Optimized, SEO & Speed Optimized
- Features fade in staggered
- CTA: "GET THE THEME" — white bg, dark text, rounded, full-width within card

### 7. FAQ

Accordion section between Pricing and Footer.

**Header:**
- Label: `FAQ` — JetBrains Mono
- Headline: "Questions? Answered." — Orbitron, weight 200

**Accordion:** Single column, max-width ~600px, centered.

- 6 items with top border dividers
- Click to expand/collapse with smooth `max-height` animation
- "+" icon rotates 45° to become "×" when open
- Only one item open at a time (accordion behavior)
- Items fade up staggered on scroll

**Questions:**

| # | Question | Answer |
|---|----------|--------|
| 1 | What's included with the theme? | Everything. 20+ premium sections, lifetime updates, priority support, mobile-optimized layouts, SEO-ready markup, and one-click demo import. No hidden fees, no upsells. |
| 2 | Do I need coding skills? | Not at all. APEX is designed for Shopify's drag-and-drop editor. Customize everything visually — no code required. |
| 3 | Is there a refund policy? | We stand behind our theme. If you're not satisfied within 14 days, we'll work with you to make it right or offer a full refund. |
| 4 | Can I use it on multiple stores? | Each license covers one store. Need it for multiple stores? Contact us for a multi-store discount. |
| 5 | How fast is the theme? | APEX consistently scores 90+ on Google PageSpeed. We obsess over performance so your customers never wait. |
| 6 | What kind of support do you offer? | 24/7 priority support via email and DM. Real humans who know the theme inside out. Most issues resolved within hours. |

### 8. Footer

Minimal, three-part layout.

**Layout:** Flex row, space-between.

- Left: APEX logo (Orbitron, letter-spacing 4px, weight 300) + tagline "Premium Shopify Themes"
- Center: nav links (Features, Pricing, Preview, Contact) — 11px, 30% white
- Right: `@apexagency.xo` — links to `https://instagram.com/apexagency.xo`

**Bottom bar:** Thin top border, centered copyright: "© 2026 APEX Agency. All rights reserved." — 10px, 15% white.

**Mobile:** Stacks vertically — logo, links (horizontal), Instagram, copyright. All centered.

## Responsive Breakpoints

| Breakpoint | Behavior |
|-----------|----------|
| > 1024px | Full desktop layout |
| 768–1024px | Tablet — 2-column features, stacked hero |
| < 768px | Mobile — single column, hamburger nav, full-width CTAs |

## File Structure

```
index.html          # Single self-contained file
```

All CSS in `<style>` tag, all JS in `<script>` tag. Google Fonts loaded via `<link>` tags in `<head>`.

## Performance Targets

- First Contentful Paint: < 1.5s
- No external JS libraries
- Intersection Observer for scroll animations (native API)
- `will-change` and `transform` for GPU-accelerated animations
- Lazy initialization of 3D effects
- `prefers-reduced-motion` media query respected — disables animations for accessibility

## Accessibility

- All interactive elements (nav links, CTAs, FAQ items) have visible focus rings: `outline: 2px solid rgba(255,255,255,0.3); outline-offset: 2px`
- Logical tab order follows visual layout (nav → hero CTAs → content → footer)
- FAQ items are keyboard-operable (Enter/Space to toggle)
- Skip-to-content link hidden but available for screen readers
- Sufficient contrast ratios maintained (white on near-black exceeds WCAG AA)
- Print styles: out of scope for v1
