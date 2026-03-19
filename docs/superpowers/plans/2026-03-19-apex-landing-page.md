# APEX Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the APEX Agency single-page landing page — minimal luxury aesthetic with glassmorphism, 3D CSS transforms, and premium animations.

**Architecture:** Single self-contained `index.html` with inline `<style>` and `<script>`. No build tools, no JS dependencies. Google Fonts loaded via `<link>` tags. Sections built incrementally — each task produces a viewable page.

**Tech Stack:** Vanilla HTML5, CSS3 (custom properties, flexbox, grid, backdrop-filter, 3D transforms, keyframe animations), Vanilla JS (Intersection Observer, requestAnimationFrame, mousemove events). Google Fonts: Orbitron, Space Grotesk, JetBrains Mono.

**Spec:** `docs/superpowers/specs/2026-03-19-apex-landing-page-design.md`

---

### Task 1: HTML Skeleton + CSS Foundation

**Files:**
- Create: `index.html`

Build the base document with all CSS custom properties, font imports, reset styles, global utilities, and empty section landmarks. After this task, opening the file shows a dark page with correct fonts loaded.

- [ ] **Step 1: Create index.html with head section**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>APEX — Premium Shopify Theme</title>
  <meta name="description" content="The Shopify theme that turns visitors into buyers. Blazing fast, mobile-first, conversion-optimized.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400&family=Orbitron:wght@300;400&family=Space+Grotesk:wght@300;400;500&display=swap" rel="stylesheet">
```

- [ ] **Step 2: Add CSS custom properties and reset**

Inside `<style>` tag. Define all design tokens from the spec color system, typography scale, and glassmorphism base values:

```css
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

:root {
  /* Colors */
  --bg: #0A0A0A;
  --surface: #111111;
  --elevated: #1A1A1A;
  --text-primary: #FFFFFF;
  --text-secondary: rgba(255,255,255,0.5);
  --text-muted: rgba(255,255,255,0.25);
  --border: rgba(255,255,255,0.08);
  --glass-fill: rgba(255,255,255,0.03);
  --glass-border: rgba(255,255,255,0.08);
  --hover-subtle: rgba(255,255,255,0.06);
  --hover-strong: rgba(255,255,255,0.1);

  /* Typography */
  --font-heading: 'Orbitron', sans-serif;
  --font-body: 'Space Grotesk', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Spacing */
  --container-max: 1200px;
  --section-padding: 100px 0;

  /* Glassmorphism */
  --glass-bg: rgba(255,255,255,0.03);
  --glass-border-color: rgba(255,255,255,0.08);
  --glass-blur: blur(20px);
}

html {
  scroll-behavior: smooth;
  background: var(--bg);
  color: var(--text-primary);
  font-family: var(--font-body);
  font-weight: 300;
  -webkit-font-smoothing: antialiased;
}

body {
  background: var(--bg);
  overflow-x: hidden;
  cursor: none; /* Custom cursor replaces default */
}

a { color: inherit; text-decoration: none; }

.container {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 24px;
}

/* Accessibility: skip link */
.skip-link {
  position: absolute;
  top: -100%;
  left: 0;
  background: var(--text-primary);
  color: var(--bg);
  padding: 8px 16px;
  z-index: 1000;
  font-size: 14px;
}
.skip-link:focus { top: 0; }

/* Focus rings */
a:focus-visible, button:focus-visible, [tabindex]:focus-visible {
  outline: 2px solid rgba(255,255,255,0.3);
  outline-offset: 2px;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  html { scroll-behavior: auto; }
}
```

- [ ] **Step 3: Add section landmark HTML**

Inside `<body>`, add all section containers (empty for now) plus the skip link:

```html
<a href="#main" class="skip-link">Skip to content</a>
<nav id="nav" data-nav-style="a"></nav>
<main id="main">
  <section id="hero" class="hero"></section>
  <section id="stats" class="stats"></section>
  <section id="features" class="features"></section>
  <section id="preview" class="preview"></section>
  <section id="pricing" class="pricing"></section>
  <section id="faq" class="faq"></section>
</main>
<footer id="contact" class="footer"></footer>
<script>
  // JS will go here
</script>
```

- [ ] **Step 4: Add scroll reveal base CSS**

```css
/* Scroll reveal - elements start hidden, JS adds .revealed */
.reveal {
  opacity: 0;
  transform: translateY(20px) scale(0.98);
  transition: opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94),
              transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.reveal.revealed {
  opacity: 1;
  transform: translateY(0) scale(1);
}
/* Stagger children */
.reveal-group .reveal:nth-child(1) { transition-delay: 0s; }
.reveal-group .reveal:nth-child(2) { transition-delay: 0.1s; }
.reveal-group .reveal:nth-child(3) { transition-delay: 0.15s; }
.reveal-group .reveal:nth-child(4) { transition-delay: 0.2s; }
.reveal-group .reveal:nth-child(5) { transition-delay: 0.25s; }
.reveal-group .reveal:nth-child(6) { transition-delay: 0.3s; }
```

- [ ] **Step 5: Open in browser, verify dark page with correct fonts**

Open `index.html` in a browser. Should show a dark (#0A0A0A) page. Inspect to verify fonts are loaded (check Network tab for Google Fonts).

- [ ] **Step 6: Commit**

```bash
git add index.html
git commit -m "feat: add HTML skeleton with CSS foundation and design tokens"
```

---

### Task 2: Custom Cursor

**Files:**
- Modify: `index.html` (CSS + JS sections)

Add the two-part cursor system: inner dot + outer ring with lerp delay. Hover state changes for links, buttons, and cards.

- [ ] **Step 1: Add cursor HTML elements**

Add just before `</body>` (before `<script>`):

```html
<div class="cursor-dot" id="cursorDot"></div>
<div class="cursor-ring" id="cursorRing"></div>
```

- [ ] **Step 2: Add cursor CSS**

```css
/* Custom cursor */
.cursor-dot {
  position: fixed;
  top: 0; left: 0;
  width: 6px; height: 6px;
  background: #fff;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
  transform: translate(-50%, -50%);
}
.cursor-ring {
  position: fixed;
  top: 0; left: 0;
  width: 32px; height: 32px;
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9998;
  transform: translate(-50%, -50%);
  transition: width 0.3s ease, height 0.3s ease, border-color 0.3s ease;
}

/* Cursor hover states */
.cursor-ring.cursor-hover-link {
  width: 48px; height: 48px;
  border-color: rgba(255,255,255,0.3);
}
.cursor-dot.cursor-hover-text {
  width: 2px; height: 20px;
  border-radius: 1px;
}
.cursor-ring.cursor-hover-card {
  width: 60px; height: 60px;
  border-color: rgba(255,255,255,0.08);
}

/* Hide custom cursor on touch devices */
@media (pointer: coarse) {
  .cursor-dot, .cursor-ring { display: none; }
  body { cursor: auto; }
}
```

- [ ] **Step 3: Add cursor JS**

Inside `<script>`:

```javascript
// Custom Cursor
(function() {
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;
  const LERP = 0.15;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * LERP;
    ringY += (mouseY - ringY) * LERP;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover states
  document.addEventListener('mouseover', (e) => {
    const link = e.target.closest('a, button, [role="button"], .nav-link, .cta-btn');
    const card = e.target.closest('.feature-card, .pricing-card, .faq-item');
    const text = e.target.closest('p, h1, h2, h3, span:not(.nav-logo)');
    if (link) {
      ring.classList.add('cursor-hover-link');
    } else if (card) {
      ring.classList.add('cursor-hover-card');
    } else if (text && !link && !card) {
      dot.classList.add('cursor-hover-text');
    }
  });
  document.addEventListener('mouseout', (e) => {
    const link = e.target.closest('a, button, [role="button"], .nav-link, .cta-btn');
    const card = e.target.closest('.feature-card, .pricing-card, .faq-item');
    const text = e.target.closest('p, h1, h2, h3, span:not(.nav-logo)');
    if (link) ring.classList.remove('cursor-hover-link');
    if (card) ring.classList.remove('cursor-hover-card');
    if (text) dot.classList.remove('cursor-hover-text');
  });
})();
```

- [ ] **Step 4: Test cursor in browser**

Open page. Move mouse — white dot should follow immediately, ring follows with smooth delay. Hover doesn't have targets yet but the base system should work.

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: add custom two-part cursor with lerp ring"
```

---

### Task 3: Navigation Bar (All 3 Styles)

**Files:**
- Modify: `index.html` (nav section + CSS + JS)

Build all three nav styles (A/B/C) switchable via `data-nav-style` attribute. Includes mobile hamburger menu, scroll-triggered glass opacity increase, and staggered fade-in.

- [ ] **Step 1: Add nav HTML**

Replace the empty `<nav>` with full markup. All three styles share the same HTML — CSS handles the layout switching:

```html
<nav id="nav" data-nav-style="a">
  <div class="nav-inner">
    <a href="#" class="nav-logo">APEX</a>
    <div class="nav-pill">
      <a href="#features" class="nav-link">Features</a>
      <a href="#pricing" class="nav-link">Pricing</a>
      <a href="#preview" class="nav-link">Preview</a>
      <a href="#contact" class="nav-link">Contact</a>
    </div>
    <a href="#" class="cta-btn nav-cta">Get The Theme</a>
    <button class="nav-hamburger" aria-label="Toggle menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </div>
  <div class="nav-mobile-overlay">
    <a href="#features" class="nav-link">Features</a>
    <a href="#pricing" class="nav-link">Pricing</a>
    <a href="#preview" class="nav-link">Preview</a>
    <a href="#contact" class="nav-link">Contact</a>
    <a href="#" class="cta-btn">Get The Theme</a>
  </div>
</nav>
```

- [ ] **Step 2: Add nav CSS — common styles**

```css
/* Nav - Common */
#nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  padding: 16px 24px;
  transition: background 0.3s ease;
  background: rgba(10,10,10,0.03);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}
#nav.scrolled {
  background: rgba(10,10,10,0.08);
  border-bottom: 1px solid var(--border);
}
.nav-inner {
  max-width: var(--container-max);
  margin: 0 auto;
  display: flex;
  align-items: center;
}
.nav-logo {
  font-family: var(--font-heading);
  font-size: 14px;
  font-weight: 300;
  letter-spacing: 4px;
  color: var(--text-primary);
}
.nav-pill {
  display: flex;
  align-items: center;
  gap: 2px;
  background: var(--glass-fill);
  border: 1px solid var(--glass-border-color);
  border-radius: 50px;
  padding: 6px;
}
.nav-link {
  font-size: 12px;
  font-weight: 300;
  color: var(--text-secondary);
  padding: 6px 14px;
  border-radius: 50px;
  transition: color 0.2s ease, background 0.2s ease;
}
.nav-link:hover {
  color: var(--text-primary);
  background: var(--hover-subtle);
}
.cta-btn {
  display: inline-block;
  background: var(--text-primary);
  color: var(--bg);
  padding: 8px 18px;
  border-radius: 50px;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.5px;
  border: none;
  cursor: none;
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.cta-btn:hover { opacity: 0.9; transform: translateY(-1px); }

/* Hamburger — hidden on desktop */
.nav-hamburger {
  display: none;
  background: none;
  border: none;
  cursor: none;
  width: 24px; height: 18px;
  position: relative;
  z-index: 101;
}
.nav-hamburger span {
  display: block;
  width: 100%; height: 1px;
  background: var(--text-primary);
  position: absolute;
  left: 0;
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.nav-hamburger span:nth-child(1) { top: 0; }
.nav-hamburger span:nth-child(2) { top: 50%; }
.nav-hamburger span:nth-child(3) { bottom: 0; }
.nav-hamburger.active span:nth-child(1) { top: 50%; transform: rotate(45deg); }
.nav-hamburger.active span:nth-child(2) { opacity: 0; }
.nav-hamburger.active span:nth-child(3) { bottom: auto; top: 50%; transform: rotate(-45deg); }

/* Mobile overlay */
.nav-mobile-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(10,10,10,0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 99;
}
.nav-mobile-overlay.active { display: flex; opacity: 1; }
.nav-mobile-overlay .nav-link {
  font-size: 18px;
  padding: 12px 24px;
}
```

- [ ] **Step 3: Add nav CSS — style variants**

```css
/* Style A: Full Pill — logo left, pill+CTA right */
[data-nav-style="a"] .nav-inner { justify-content: space-between; }
[data-nav-style="a"] .nav-pill { margin-left: auto; margin-right: 12px; }

/* Style B: Separated Pill — logo left, pill center, CTA right */
[data-nav-style="b"] .nav-inner { justify-content: space-between; }
[data-nav-style="b"] .nav-pill { position: absolute; left: 50%; transform: translateX(-50%); }

/* Style C: All-In-One Capsule — everything in one centered pill */
[data-nav-style="c"] .nav-inner { justify-content: center; }
[data-nav-style="c"] .nav-pill {
  margin: 0;
  padding: 6px 8px;
}
[data-nav-style="c"] .nav-logo {
  font-size: 12px;
  letter-spacing: 3px;
  padding: 6px 16px;
  border-right: 1px solid var(--border);
  margin-right: 4px;
}
[data-nav-style="c"] .nav-cta {
  margin-left: 4px;
  padding: 6px 16px;
  font-size: 11px;
}
/* Style C uses JS to move logo and CTA inside the pill — see nav JS below */

/* Mobile — all styles collapse the same */
@media (max-width: 768px) {
  .nav-pill { display: none; }
  .nav-cta:not(.nav-mobile-overlay .cta-btn) { display: none; }
  .nav-hamburger { display: block; }
  .nav-inner { justify-content: space-between !important; }
  [data-nav-style="c"] .nav-logo {
    border-right: none;
    font-size: 14px;
    letter-spacing: 4px;
    padding: 0;
    margin: 0;
  }
}
```

- [ ] **Step 4: Add nav JS**

```javascript
// Nav scroll effect + mobile menu
(function() {
  const nav = document.getElementById('nav');
  const hamburger = nav.querySelector('.nav-hamburger');
  const overlay = nav.querySelector('.nav-mobile-overlay');

  // Scroll — strengthen glass effect
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });

  // Hamburger toggle
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('active');
    overlay.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close overlay on link click
  overlay.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      overlay.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close overlay on click outside
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      hamburger.classList.remove('active');
      overlay.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  // Style C: move logo and CTA inside pill
  if (nav.dataset.navStyle === 'c') {
    const pill = nav.querySelector('.nav-pill');
    const logo = nav.querySelector('.nav-logo');
    const cta = nav.querySelector('.nav-cta');
    if (pill && logo && cta) {
      pill.insertBefore(logo, pill.firstChild);
      pill.appendChild(cta);
    }
  }

  // Staggered fade-in on load
  const navLinks = nav.querySelectorAll('.nav-link, .nav-logo, .nav-cta');
  navLinks.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(-8px)';
    el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    el.style.transitionDelay = (i * 0.08) + 's';
    requestAnimationFrame(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  });
})();
```

- [ ] **Step 5: Test all 3 nav styles**

Open page. Change `data-nav-style="a"` to `"b"` and `"c"` in DevTools to verify all three layouts. Test hamburger on mobile viewport. Test scroll glass effect.

- [ ] **Step 6: Commit**

```bash
git add index.html
git commit -m "feat: add navigation with 3 switchable styles and mobile menu"
```

---

### Task 4: Hero Section

**Files:**
- Modify: `index.html` (hero section + CSS + JS)

Full viewport hero with word-by-word headline animation, floating 3D store mockup with mouse parallax, geo-based pricing, and gradient orb background.

- [ ] **Step 1: Add hero HTML**

Replace the empty hero section:

```html
<section id="hero" class="hero">
  <!-- Background orbs -->
  <div class="hero-orb hero-orb-1"></div>
  <div class="hero-orb hero-orb-2"></div>

  <div class="container hero-content">
    <div class="hero-text">
      <span class="label">PREMIUM SHOPIFY THEME</span>
      <h1 class="hero-headline" id="heroHeadline">The Shopify Theme That Turns Visitors Into Buyers</h1>
      <p class="hero-sub">Built for speed, designed for conversion. The last theme your store will ever need.</p>
      <div class="hero-ctas">
        <a href="#" class="cta-btn hero-cta-primary" id="heroBuyBtn">BUY NOW — $99</a>
        <a href="#" class="hero-cta-secondary">LIVE PREVIEW →</a>
      </div>
    </div>
    <div class="hero-mockup-wrap" id="heroMockup">
      <div class="hero-mockup">
        <div class="mockup-chrome">
          <span></span><span></span><span></span>
        </div>
        <div class="mockup-body">
          <div class="mockup-nav"></div>
          <div class="mockup-hero-block"></div>
          <div class="mockup-grid">
            <div></div><div></div><div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add hero CSS**

```css
/* Hero */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding-top: 80px;
}
.hero-content {
  display: flex;
  align-items: center;
  gap: 60px;
}
.hero-text { flex: 0 0 60%; }
.hero-mockup-wrap { flex: 1; perspective: 800px; }

.label {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 4px;
  color: var(--text-muted);
  display: block;
  margin-bottom: 20px;
}
.hero-headline {
  font-family: var(--font-heading);
  font-size: clamp(28px, 4.5vw, 52px);
  font-weight: 200;
  line-height: 1.15;
  letter-spacing: -0.5px;
  margin-bottom: 16px;
}
.hero-headline .word {
  display: inline-block;
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.hero-headline .word.visible {
  opacity: 1;
  transform: translateY(0);
}
.hero-sub {
  font-size: 16px;
  color: var(--text-secondary);
  font-weight: 300;
  line-height: 1.6;
  max-width: 420px;
  margin-bottom: 32px;
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 0.6s ease 0.8s, transform 0.6s ease 0.8s;
}
.hero-sub.visible { opacity: 1; transform: translateY(0); }
.hero-ctas {
  display: flex;
  gap: 12px;
  align-items: center;
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 0.6s ease 1s, transform 0.6s ease 1s;
}
.hero-ctas.visible { opacity: 1; transform: translateY(0); }
.hero-cta-primary {
  padding: 12px 28px;
  font-size: 13px;
  border-radius: 6px;
}
.hero-cta-secondary {
  font-size: 13px;
  color: var(--text-secondary);
  padding: 12px 24px;
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 6px;
  transition: color 0.2s ease, border-color 0.2s ease;
}
.hero-cta-secondary:hover {
  color: var(--text-primary);
  border-color: rgba(255,255,255,0.3);
}

/* Background orbs */
.hero-orb {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}
.hero-orb-1 {
  width: 400px; height: 400px;
  top: -100px; right: 15%;
  background: radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 60%);
  animation: orbDrift1 12s ease-in-out infinite;
}
.hero-orb-2 {
  width: 250px; height: 250px;
  bottom: -50px; left: 10%;
  background: radial-gradient(circle, rgba(255,255,255,0.015) 0%, transparent 60%);
  animation: orbDrift2 15s ease-in-out infinite;
}
@keyframes orbDrift1 {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(30px, 20px); }
}
@keyframes orbDrift2 {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(-20px, -30px); }
}

/* Store Mockup */
.hero-mockup-wrap {
  opacity: 0;
  transform: translateX(60px) rotateY(-10deg);
  transition: opacity 0.8s ease 0.6s, transform 0.8s ease 0.6s;
}
.hero-mockup-wrap.visible {
  opacity: 1;
  transform: translateX(0) rotateY(0);
}
.hero-mockup {
  background: var(--glass-fill);
  border: 1px solid var(--glass-border-color);
  border-radius: 12px;
  padding: 14px;
  transform: rotateY(-5deg) rotateX(3deg);
  transition: transform 0.1s ease;
  animation: mockupFloat 6s ease-in-out infinite;
  will-change: transform;
}
@keyframes mockupFloat {
  0%, 100% { transform: rotateY(-5deg) rotateX(3deg) translateY(0); }
  50% { transform: rotateY(-5deg) rotateX(3deg) translateY(-10px); }
}
.mockup-chrome {
  display: flex;
  gap: 5px;
  margin-bottom: 10px;
}
.mockup-chrome span {
  width: 7px; height: 7px;
  border-radius: 50%;
  background: rgba(255,255,255,0.1);
}
.mockup-body {
  background: rgba(255,255,255,0.02);
  border-radius: 6px;
  padding: 12px;
}
.mockup-nav {
  height: 8px;
  width: 60%;
  background: rgba(255,255,255,0.06);
  border-radius: 4px;
  margin-bottom: 12px;
}
.mockup-hero-block {
  height: 60px;
  background: rgba(255,255,255,0.03);
  border-radius: 4px;
  margin-bottom: 10px;
}
.mockup-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
}
.mockup-grid div {
  height: 45px;
  background: rgba(255,255,255,0.03);
  border-radius: 4px;
}

/* Hero tablet + mobile — stacked layout */
@media (max-width: 1024px) {
  .hero-content { flex-direction: column; gap: 40px; text-align: center; }
  .hero-text { flex: none; }
  .hero-ctas { justify-content: center; }
  .hero-sub { margin: 0 auto 32px; }
  .hero-mockup-wrap { max-width: 320px; }
}
@media (max-width: 768px) {
  .hero-ctas { flex-direction: column; }
  .hero-cta-primary, .hero-cta-secondary { width: 100%; text-align: center; }
  .hero-mockup-wrap { max-width: 280px; }
}
```

- [ ] **Step 3: Add hero JS — word-by-word animation + geo pricing + mockup parallax**

```javascript
// Hero animations
(function() {
  // Word-by-word headline
  const headline = document.getElementById('heroHeadline');
  if (headline) {
    const text = headline.textContent;
    headline.innerHTML = text.split(' ').map(w => `<span class="word">${w}</span>`).join(' ');
    const words = headline.querySelectorAll('.word');
    words.forEach((word, i) => {
      setTimeout(() => word.classList.add('visible'), 200 + i * 100);
    });
    // After headline, show sub + CTAs + mockup slide-in
    const totalDelay = 200 + words.length * 100 + 200;
    setTimeout(() => {
      document.querySelector('.hero-sub')?.classList.add('visible');
      document.querySelector('.hero-ctas')?.classList.add('visible');
      document.querySelector('.hero-mockup-wrap')?.classList.add('visible');
    }, totalDelay);
  }

  // Geo pricing is handled by unified function in Task 11

  // Mockup mouse parallax
  const mockup = document.getElementById('heroMockup');
  if (mockup && window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      const rotY = -5 + x * 5;
      const rotX = 3 + y * -3;
      mockup.querySelector('.hero-mockup').style.transform =
        `rotateY(${rotY}deg) rotateX(${rotX}deg) translateY(0)`;
    });
  }
})();
```

- [ ] **Step 4: Test hero in browser**

Open page. Verify: headline animates word-by-word, subtext/CTAs fade in after, mockup floats and follows mouse, background orbs drift. Resize to mobile — should stack vertically.

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: add hero section with word animation, 3D mockup, and geo pricing"
```

---

### Task 5: Stats Bar

**Files:**
- Modify: `index.html` (stats section + CSS + JS)

4 stats with counter animation on scroll.

- [ ] **Step 1: Add stats HTML**

Replace empty stats section:

```html
<section id="stats" class="stats">
  <div class="container stats-grid">
    <div class="stat reveal" data-target="500" data-suffix="+">
      <span class="stat-number">0</span><span class="stat-suffix">+</span>
      <span class="stat-label">STORES</span>
    </div>
    <div class="stat-divider"></div>
    <div class="stat reveal" data-target="99" data-suffix="%">
      <span class="stat-number">0</span><span class="stat-suffix">%</span>
      <span class="stat-label">SATISFACTION</span>
    </div>
    <div class="stat-divider"></div>
    <div class="stat reveal" data-target="2" data-suffix="s">
      <span class="stat-number">0</span><span class="stat-suffix">s</span>
      <span class="stat-label">LOAD SPEED</span>
    </div>
    <div class="stat-divider"></div>
    <div class="stat reveal" data-no-count>
      <span class="stat-number">24/7</span>
      <span class="stat-label">SUPPORT</span>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add stats CSS**

```css
/* Stats Bar */
.stats {
  background: rgba(255,255,255,0.02);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  padding: 40px 0;
}
.stats-grid {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.stat {
  text-align: center;
  flex: 1;
}
.stat-number {
  font-family: var(--font-mono);
  font-size: clamp(24px, 3vw, 32px);
  font-weight: 300;
  color: var(--text-primary);
}
.stat-suffix {
  font-family: var(--font-mono);
  font-size: clamp(24px, 3vw, 32px);
  font-weight: 300;
  color: var(--text-primary);
}
.stat-label {
  display: block;
  font-family: var(--font-body);
  font-size: 10px;
  letter-spacing: 3px;
  color: var(--text-muted);
  margin-top: 8px;
}
.stat-divider {
  width: 1px;
  height: 40px;
  background: var(--border);
}

@media (max-width: 768px) {
  .stats-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }
  .stat-divider { display: none; }
}
```

- [ ] **Step 3: Add counter animation JS**

```javascript
// Counter animation
(function() {
  function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const numberEl = el.querySelector('.stat-number');
    const duration = 2000;
    const start = performance.now();

    function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.round(easeOut(progress) * target);
      numberEl.textContent = value;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        if (!el.dataset.noCount && el.dataset.target) {
          animateCounter(el);
        }
        el.classList.add('revealed');
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.stat').forEach(s => observer.observe(s));
})();
```

- [ ] **Step 4: Test stats**

Scroll to stats. Numbers should count up. "24/7" should just appear. Mobile should show 2x2 grid.

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: add stats bar with counter animation on scroll"
```

---

### Task 6: Features Grid

**Files:**
- Modify: `index.html` (features section + CSS + JS)

6 glass cards with inline SVG icons, 3D tilt on hover, floating background shapes, staggered scroll reveal.

- [ ] **Step 1: Add features HTML**

Replace empty features section. Each card has an inline SVG icon:

```html
<section id="features" class="features">
  <div class="features-shapes">
    <div class="shape shape-1"></div>
    <div class="shape shape-2"></div>
    <div class="shape shape-3"></div>
  </div>
  <div class="container">
    <div class="section-header reveal">
      <span class="label">WHAT YOU GET</span>
      <h2>Built Different</h2>
    </div>
    <div class="features-grid reveal-group">
      <div class="feature-card reveal" data-tilt>
        <div class="feature-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
        </div>
        <h3>Blazing Performance</h3>
        <p>Sub-2s load times. Optimized assets, lazy loading, minimal JS overhead.</p>
      </div>
      <div class="feature-card reveal" data-tilt>
        <div class="feature-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12" y2="18.01"/></svg>
        </div>
        <h3>Mobile-First Design</h3>
        <p>Built mobile-first. Every pixel considered for thumb-friendly navigation.</p>
      </div>
      <div class="feature-card reveal" data-tilt>
        <div class="feature-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
        </div>
        <h3>Conversion Optimized</h3>
        <p>Every layout decision backed by conversion data. Sell more, effortlessly.</p>
      </div>
      <div class="feature-card reveal" data-tilt>
        <div class="feature-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
        </div>
        <h3>One-Click Setup</h3>
        <p>Import demo content in one click. Be live in minutes, not days.</p>
      </div>
      <div class="feature-card reveal" data-tilt>
        <div class="feature-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </div>
        <h3>SEO Ready</h3>
        <p>Clean semantic markup, structured data, optimized meta. Rank higher.</p>
      </div>
      <div class="feature-card reveal" data-tilt>
        <div class="feature-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
        </div>
        <h3>Premium Support</h3>
        <p>Direct access to our team. Real humans, real answers, real fast.</p>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add features CSS**

```css
/* Features */
.features {
  padding: var(--section-padding);
  position: relative;
  overflow: hidden;
}
.section-header {
  text-align: center;
  margin-bottom: 48px;
}
.section-header h2 {
  font-family: var(--font-heading);
  font-size: clamp(24px, 3vw, 32px);
  font-weight: 200;
  letter-spacing: -0.5px;
  margin-top: 8px;
}
.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.feature-card {
  background: var(--glass-fill);
  border: 1px solid var(--glass-border-color);
  border-radius: 12px;
  padding: 24px;
  transition: transform 0.3s ease, border-color 0.3s ease, background 0.3s ease;
  will-change: transform;
}
.feature-card:hover {
  background: var(--hover-subtle);
  border-color: var(--hover-strong);
  transform: translateY(-4px);
}
.feature-icon {
  width: 32px; height: 32px;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  color: var(--text-secondary);
}
.feature-card h3 {
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 8px;
}
.feature-card p {
  font-size: 12px;
  color: var(--text-secondary);
  line-height: 1.6;
}

/* Floating 3D shapes */
.features-shapes {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}
.shape {
  position: absolute;
  border: 1px solid rgba(255,255,255,0.04);
  background: rgba(255,255,255,0.01);
}
.shape-1 {
  width: 80px; height: 80px;
  top: 15%; right: 8%;
  transform: rotate(45deg);
  animation: shapeRotate1 20s linear infinite;
}
.shape-2 {
  width: 50px; height: 50px;
  bottom: 20%; left: 5%;
  border-radius: 50%;
  animation: shapeRotate2 25s linear infinite;
}
.shape-3 {
  width: 60px; height: 60px;
  top: 60%; right: 15%;
  border-radius: 8px;
  animation: shapeRotate3 18s linear infinite;
}
@keyframes shapeRotate1 {
  0% { transform: rotate(45deg) translateY(0); }
  50% { transform: rotate(225deg) translateY(-20px); }
  100% { transform: rotate(405deg) translateY(0); }
}
@keyframes shapeRotate2 {
  0% { transform: scale(1) translateX(0); }
  50% { transform: scale(1.1) translateX(15px); }
  100% { transform: scale(1) translateX(0); }
}
@keyframes shapeRotate3 {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .features-grid { grid-template-columns: 1fr; }
}
@media (min-width: 769px) and (max-width: 1024px) {
  .features-grid { grid-template-columns: repeat(2, 1fr); }
}
```

- [ ] **Step 3: Add 3D tilt JS + scroll reveal observer**

```javascript
// 3D Tilt on hover
(function() {
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(1000px) rotateX(${y * -8}deg) rotateY(${x * 8}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

// NOTE: General scroll reveal observer is initialized once in Task 11 (DOMContentLoaded) to avoid duplication
```

- [ ] **Step 4: Test features**

Scroll to features. Cards should fade in staggered. Hover — cards tilt in 3D following cursor. Floating shapes rotate in background. Mobile — single column.

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: add features grid with 3D tilt, SVG icons, and floating shapes"
```

---

### Task 7: Theme Preview Section

**Files:**
- Modify: `index.html` (preview section + CSS + JS)

Scroll-synced feature list + crossfading 3D mockup with 4 page layouts.

- [ ] **Step 1: Add preview HTML**

Replace empty preview section:

```html
<section id="preview" class="preview">
  <div class="container preview-content">
    <div class="preview-list">
      <span class="label">EXPLORE</span>
      <div class="preview-items">
        <button class="preview-item active" data-preview="0">
          <span class="preview-item-title">Homepage</span>
          <span class="preview-item-desc">Hero, collections, featured products</span>
        </button>
        <button class="preview-item" data-preview="1">
          <span class="preview-item-title">Product Page</span>
          <span class="preview-item-desc">Gallery, variants, reviews</span>
        </button>
        <button class="preview-item" data-preview="2">
          <span class="preview-item-title">Collection</span>
          <span class="preview-item-desc">Grid, filters, sorting</span>
        </button>
        <button class="preview-item" data-preview="3">
          <span class="preview-item-title">Cart &amp; Checkout</span>
          <span class="preview-item-desc">Slide-out cart, upsells</span>
        </button>
      </div>
    </div>
    <div class="preview-mockup-wrap" id="previewMockup">
      <div class="preview-mockup">
        <div class="mockup-chrome"><span></span><span></span><span></span></div>
        <div class="preview-screens">
          <!-- Screen 0: Homepage -->
          <div class="preview-screen active">
            <div class="pm-nav"></div>
            <div class="pm-hero"></div>
            <div class="pm-grid3"><div></div><div></div><div></div></div>
          </div>
          <!-- Screen 1: Product -->
          <div class="preview-screen">
            <div class="pm-nav"></div>
            <div class="pm-product">
              <div class="pm-img"></div>
              <div class="pm-details">
                <div class="pm-line w60"></div>
                <div class="pm-line w40"></div>
                <div class="pm-btn"></div>
              </div>
            </div>
          </div>
          <!-- Screen 2: Collection -->
          <div class="preview-screen">
            <div class="pm-nav"></div>
            <div class="pm-collection">
              <div class="pm-sidebar"></div>
              <div class="pm-grid3"><div></div><div></div><div></div></div>
            </div>
          </div>
          <!-- Screen 3: Cart -->
          <div class="preview-screen">
            <div class="pm-nav"></div>
            <div class="pm-cart">
              <div class="pm-cart-items">
                <div class="pm-cart-item"></div>
                <div class="pm-cart-item"></div>
              </div>
              <div class="pm-cart-summary"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add preview CSS**

```css
/* Theme Preview */
.preview {
  padding: var(--section-padding);
  min-height: 100vh;
}
.preview-content {
  display: flex;
  align-items: flex-start;
  gap: 60px;
}
.preview-list { flex: 0 0 35%; padding-top: 20px; }
.preview-items { margin-top: 16px; }
.preview-item {
  display: block;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 14px 0 14px 16px;
  border-left: 2px solid var(--border);
  cursor: none;
  transition: border-color 0.3s ease;
  margin-bottom: 4px;
}
.preview-item.active { border-left-color: var(--text-primary); }
.preview-item-title {
  display: block;
  font-family: var(--font-body);
  font-size: 14px;
  color: var(--text-secondary);
  transition: color 0.3s ease;
}
.preview-item.active .preview-item-title { color: var(--text-primary); }
.preview-item-desc {
  display: block;
  font-size: 11px;
  color: var(--text-muted);
  margin-top: 2px;
  transition: color 0.3s ease;
}
.preview-item.active .preview-item-desc { color: var(--text-secondary); }

/* Preview mockup */
.preview-mockup-wrap {
  flex: 1;
  perspective: 800px;
  position: sticky;
  top: 120px;
}
.preview-mockup {
  background: var(--glass-fill);
  border: 1px solid var(--glass-border-color);
  border-radius: 12px;
  padding: 14px;
  transform: rotateY(-8deg) rotateX(3deg);
  transition: transform 0.15s ease;
}
.preview-screens { position: relative; min-height: 220px; }
.preview-screen {
  position: absolute;
  inset: 0;
  padding: 12px;
  background: rgba(255,255,255,0.02);
  border-radius: 6px;
  opacity: 0;
  transition: opacity 0.4s ease;
}
.preview-screen.active { opacity: 1; position: relative; }

/* Wireframe elements */
.pm-nav { height: 8px; width: 60%; background: rgba(255,255,255,0.06); border-radius: 4px; margin-bottom: 12px; }
.pm-hero { height: 50px; background: rgba(255,255,255,0.03); border-radius: 4px; margin-bottom: 10px; }
.pm-grid3 { display: grid; grid-template-columns: repeat(3,1fr); gap: 6px; }
.pm-grid3 div { height: 45px; background: rgba(255,255,255,0.03); border-radius: 4px; }
.pm-product { display: flex; gap: 10px; }
.pm-img { flex: 1; height: 120px; background: rgba(255,255,255,0.03); border-radius: 4px; }
.pm-details { flex: 1; display: flex; flex-direction: column; gap: 8px; padding-top: 8px; }
.pm-line { height: 6px; background: rgba(255,255,255,0.06); border-radius: 3px; }
.pm-line.w60 { width: 60%; }
.pm-line.w40 { width: 40%; }
.pm-btn { height: 24px; width: 80%; background: rgba(255,255,255,0.06); border-radius: 4px; margin-top: auto; }
.pm-collection { display: flex; gap: 10px; }
.pm-sidebar { flex: 0 0 60px; height: 120px; background: rgba(255,255,255,0.03); border-radius: 4px; }
.pm-cart { display: flex; gap: 10px; }
.pm-cart-items { flex: 1; display: flex; flex-direction: column; gap: 6px; }
.pm-cart-item { height: 40px; background: rgba(255,255,255,0.03); border-radius: 4px; }
.pm-cart-summary { flex: 0 0 100px; height: 90px; background: rgba(255,255,255,0.03); border-radius: 4px; }

/* Preview tablet + mobile */
@media (max-width: 1024px) {
  .preview-content { flex-direction: column-reverse; }
  .preview-mockup-wrap { position: static; max-width: 400px; margin: 0 auto; }
}
@media (max-width: 768px) {
  .preview-content { flex-direction: column-reverse; }
  .preview-mockup-wrap { position: static; max-width: 320px; margin: 0 auto; }
  .preview-items { display: flex; gap: 8px; overflow-x: auto; padding-bottom: 8px; }
  .preview-item {
    flex: 0 0 auto;
    border-left: none;
    border-bottom: 2px solid var(--border);
    padding: 8px 16px;
    white-space: nowrap;
  }
  .preview-item.active { border-bottom-color: var(--text-primary); }
  .preview-item-desc { display: none; }
}
```

- [ ] **Step 3: Add preview JS — scroll-sync + click + mockup parallax**

```javascript
// Theme Preview — scroll sync + click
(function() {
  const section = document.getElementById('preview');
  const items = section.querySelectorAll('.preview-item');
  const screens = section.querySelectorAll('.preview-screen');
  const mockupEl = section.querySelector('.preview-mockup');
  let currentIndex = 0;

  function setActive(index) {
    if (index === currentIndex && items[index].classList.contains('active')) return;
    currentIndex = index;
    items.forEach((item, i) => item.classList.toggle('active', i === index));
    screens.forEach((screen, i) => screen.classList.toggle('active', i === index));
  }

  // Click to switch
  items.forEach((item, i) => {
    item.addEventListener('click', () => setActive(i));
  });

  // Scroll sync — divide section into 4 zones
  const scrollObserver = new IntersectionObserver(() => {
    // Recalc on intersection
  }, { threshold: 0 });

  window.addEventListener('scroll', () => {
    const rect = section.getBoundingClientRect();
    const sectionH = rect.height;
    const scrolled = -rect.top;
    if (scrolled < 0 || scrolled > sectionH) return;
    const progress = scrolled / sectionH;
    const index = Math.min(3, Math.floor(progress * 4));
    setActive(index);
  });

  // Mockup parallax
  if (mockupEl && window.matchMedia('(pointer: fine)').matches) {
    section.addEventListener('mousemove', (e) => {
      const rect = section.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      mockupEl.style.transform = `rotateY(${-8 + x * 4}deg) rotateX(${3 + y * -3}deg)`;
    });
  }
})();
```

- [ ] **Step 4: Test preview**

Scroll through section — left list should highlight in sequence, mockup should crossfade between layouts. Click items manually. Test mobile horizontal pills.

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: add theme preview with scroll-sync and crossfading mockup"
```

---

### Task 8: Pricing Card

**Files:**
- Modify: `index.html` (pricing section + CSS + JS)

Single glassmorphism card with 3D tilt, shine animation, geo pricing, and staggered feature reveals.

- [ ] **Step 1: Add pricing HTML**

Replace empty pricing section:

```html
<section id="pricing" class="pricing-section">
  <div class="container">
    <div class="section-header reveal">
      <span class="label">PRICING</span>
      <h2>One Theme. Everything Included.</h2>
    </div>
    <div class="pricing-card reveal" data-tilt id="pricingCard">
      <div class="pricing-shine"></div>
      <span class="label" style="text-align:center;display:block;">APEX THEME</span>
      <div class="pricing-amount" id="pricingAmount">$99</div>
      <div class="pricing-period">one-time payment</div>
      <ul class="pricing-features">
        <li>20+ Premium Sections</li>
        <li>Lifetime Updates</li>
        <li>Premium Support</li>
        <li>Mobile Optimized</li>
        <li>SEO & Speed Optimized</li>
      </ul>
      <a href="#" class="cta-btn pricing-cta">GET THE THEME</a>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add pricing CSS**

```css
/* Pricing */
.pricing-section { padding: var(--section-padding); }
.pricing-card {
  max-width: 380px;
  margin: 0 auto;
  background: var(--glass-fill);
  border: 1px solid var(--glass-border-color);
  border-radius: 16px;
  padding: 40px 32px;
  text-align: center;
  position: relative;
  overflow: hidden;
  transform: rotateX(2deg);
  transition: transform 0.3s ease, border-color 0.3s ease;
  will-change: transform;
}
.pricing-card:hover { border-color: var(--hover-strong); }
.pricing-shine {
  position: absolute;
  top: -50%; left: -50%;
  width: 200%; height: 200%;
  background: linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.03) 50%, transparent 60%);
  transform: translateX(-100%);
  pointer-events: none;
  transition: none;
}
.pricing-card.revealed .pricing-shine {
  animation: shineSwipe 1s ease 0.5s forwards;
}
@keyframes shineSwipe {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
.pricing-amount {
  font-family: var(--font-heading);
  font-size: 48px;
  font-weight: 200;
  margin: 12px 0 4px;
}
.pricing-period {
  font-size: 12px;
  color: var(--text-muted);
  margin-bottom: 28px;
}
.pricing-features {
  list-style: none;
  text-align: left;
  margin-bottom: 28px;
}
.pricing-features li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255,255,255,0.04);
  font-size: 13px;
  color: var(--text-secondary);
}
.pricing-features li::before {
  content: '✓';
  font-size: 11px;
  color: var(--text-muted);
}
.pricing-features li:last-child { border-bottom: none; }
.pricing-cta {
  display: block;
  width: 100%;
  text-align: center;
  padding: 14px;
  border-radius: 8px;
  font-size: 13px;
}
```

- [ ] **Step 3: Test pricing**

Note: Geo-pricing for both hero and pricing card is handled by the unified function added in Task 11.

Scroll to pricing. Card fades in, shine stripe sweeps across, 3D tilt on hover works (reuses tilt JS from Task 6). Features list visible.

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: add pricing card with shine animation and geo pricing"
```

---

### Task 9: FAQ Accordion

**Files:**
- Modify: `index.html` (faq section + CSS + JS)

6-item accordion with smooth expand/collapse, rotating +/× icon, one-item-at-a-time behavior.

- [ ] **Step 1: Add FAQ HTML**

Replace empty faq section:

```html
<section id="faq" class="faq-section">
  <div class="container">
    <div class="section-header reveal">
      <span class="label">FAQ</span>
      <h2>Questions? Answered.</h2>
    </div>
    <div class="faq-list">
      <div class="faq-item reveal" tabindex="0" role="button" aria-expanded="false">
        <div class="faq-question">
          <span>What's included with the theme?</span>
          <span class="faq-icon">+</span>
        </div>
        <div class="faq-answer">
          <p>Everything. 20+ premium sections, lifetime updates, priority support, mobile-optimized layouts, SEO-ready markup, and one-click demo import. No hidden fees, no upsells.</p>
        </div>
      </div>
      <div class="faq-item reveal" tabindex="0" role="button" aria-expanded="false">
        <div class="faq-question">
          <span>Do I need coding skills?</span>
          <span class="faq-icon">+</span>
        </div>
        <div class="faq-answer">
          <p>Not at all. APEX is designed for Shopify's drag-and-drop editor. Customize everything visually — no code required.</p>
        </div>
      </div>
      <div class="faq-item reveal" tabindex="0" role="button" aria-expanded="false">
        <div class="faq-question">
          <span>Is there a refund policy?</span>
          <span class="faq-icon">+</span>
        </div>
        <div class="faq-answer">
          <p>We stand behind our theme. If you're not satisfied within 14 days, we'll work with you to make it right or offer a full refund.</p>
        </div>
      </div>
      <div class="faq-item reveal" tabindex="0" role="button" aria-expanded="false">
        <div class="faq-question">
          <span>Can I use it on multiple stores?</span>
          <span class="faq-icon">+</span>
        </div>
        <div class="faq-answer">
          <p>Each license covers one store. Need it for multiple stores? Contact us for a multi-store discount.</p>
        </div>
      </div>
      <div class="faq-item reveal" tabindex="0" role="button" aria-expanded="false">
        <div class="faq-question">
          <span>How fast is the theme?</span>
          <span class="faq-icon">+</span>
        </div>
        <div class="faq-answer">
          <p>APEX consistently scores 90+ on Google PageSpeed. We obsess over performance so your customers never wait.</p>
        </div>
      </div>
      <div class="faq-item reveal" tabindex="0" role="button" aria-expanded="false">
        <div class="faq-question">
          <span>What kind of support do you offer?</span>
          <span class="faq-icon">+</span>
        </div>
        <div class="faq-answer">
          <p>24/7 priority support via email and DM. Real humans who know the theme inside out. Most issues resolved within hours.</p>
        </div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add FAQ CSS**

```css
/* FAQ */
.faq-section { padding: var(--section-padding); }
.faq-list { max-width: 600px; margin: 0 auto; }
.faq-item {
  border-top: 1px solid var(--border);
  cursor: none;
}
.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 0;
}
.faq-question span:first-child {
  font-size: 15px;
  font-weight: 400;
  color: var(--text-secondary);
  transition: color 0.3s ease;
}
.faq-item.active .faq-question span:first-child { color: var(--text-primary); }
.faq-icon {
  font-size: 18px;
  color: var(--text-muted);
  transition: transform 0.3s ease, color 0.3s ease;
  flex-shrink: 0;
  margin-left: 16px;
}
.faq-item.active .faq-icon {
  transform: rotate(45deg);
  color: var(--text-secondary);
}
.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease, padding 0.4s ease;
  padding: 0 0;
}
.faq-item.active .faq-answer {
  max-height: 200px;
  padding: 0 0 18px;
}
.faq-answer p {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.7;
  padding-right: 32px;
}
```

- [ ] **Step 3: Add FAQ JS**

```javascript
// FAQ Accordion
(function() {
  const items = document.querySelectorAll('.faq-item');

  function toggle(item) {
    const isActive = item.classList.contains('active');
    // Close all
    items.forEach(i => {
      i.classList.remove('active');
      i.setAttribute('aria-expanded', 'false');
    });
    // Open clicked (if it was closed)
    if (!isActive) {
      item.classList.add('active');
      item.setAttribute('aria-expanded', 'true');
    }
  }

  items.forEach(item => {
    item.addEventListener('click', () => toggle(item));
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle(item);
      }
    });
  });
})();
```

- [ ] **Step 4: Test FAQ**

Click items — smooth expand/collapse. Only one open at a time. "+" rotates to "×". Test keyboard (Tab + Enter). Scroll reveal works.

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: add FAQ accordion with keyboard support"
```

---

### Task 10: Footer

**Files:**
- Modify: `index.html` (footer section + CSS)

Minimal footer with logo, nav links, Instagram handle, copyright.

- [ ] **Step 1: Add footer HTML**

Replace empty footer:

```html
<footer id="contact" class="footer">
  <div class="container">
    <div class="footer-main">
      <div class="footer-brand">
        <span class="nav-logo">APEX</span>
        <p>Premium Shopify Themes</p>
      </div>
      <nav class="footer-links">
        <a href="#features">Features</a>
        <a href="#pricing">Pricing</a>
        <a href="#preview">Preview</a>
        <a href="#contact">Contact</a>
      </nav>
      <div class="footer-social">
        <a href="https://instagram.com/apexagency.xo" target="_blank" rel="noopener">@apexagency.xo</a>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 APEX Agency. All rights reserved.</p>
    </div>
  </div>
</footer>
```

- [ ] **Step 2: Add footer CSS**

```css
/* Footer */
.footer {
  border-top: 1px solid var(--border);
  padding: 40px 0 0;
}
.footer-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 24px;
}
.footer-brand p {
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 4px;
}
.footer-links {
  display: flex;
  gap: 24px;
}
.footer-links a {
  font-size: 12px;
  color: var(--text-secondary);
  transition: color 0.2s ease;
}
.footer-links a:hover { color: var(--text-primary); }
.footer-social a {
  font-size: 12px;
  color: var(--text-secondary);
  transition: color 0.2s ease;
}
.footer-social a:hover { color: var(--text-primary); }
.footer-bottom {
  border-top: 1px solid var(--border);
  padding: 16px 0;
  text-align: center;
}
.footer-bottom p {
  font-size: 10px;
  color: rgba(255,255,255,0.15);
}

@media (max-width: 768px) {
  .footer-main {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
}
```

- [ ] **Step 3: Test footer**

Scroll to bottom. Logo, links, Instagram, copyright all visible. Mobile stacks vertically. Links scroll smoothly to sections.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: add minimal footer with nav links and Instagram"
```

---

### Task 11: Polish & Final Integration

**Files:**
- Modify: `index.html`

Final pass: ensure all scroll reveals fire correctly, smooth-scroll nav links work, all 3D interactions work together without conflicts, mobile hamburger works end-to-end, and geo pricing updates all elements.

- [ ] **Step 1: Consolidate geo-pricing into single function**

Replace the two separate geo-pricing blocks with one unified function at the top of the `<script>`:

```javascript
// Unified geo pricing — runs once, updates all price elements
(function() {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const isEgypt = tz === 'Africa/Cairo';
  window.APEX_PRICE = isEgypt ? '10,000 LE' : '$99';

  document.addEventListener('DOMContentLoaded', () => {
    const heroBuyBtn = document.getElementById('heroBuyBtn');
    if (heroBuyBtn) heroBuyBtn.textContent = `BUY NOW — ${window.APEX_PRICE}`;
    const pricingAmount = document.getElementById('pricingAmount');
    if (pricingAmount) pricingAmount.textContent = window.APEX_PRICE;
  });
})();
```

- [ ] **Step 2: Ensure all scroll reveal elements are observed**

Verify the general scroll reveal observer (from Task 6) runs after all HTML is parsed. Move it to the end of `<script>` or wrap in `DOMContentLoaded`:

```javascript
document.addEventListener('DOMContentLoaded', () => {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
});
```

- [ ] **Step 3: Full end-to-end test — desktop**

Open in browser at full width. Walk through every section top to bottom:
1. Nav fades in with stagger
2. Hero headline animates word-by-word, mockup floats + follows mouse
3. Stats count up on scroll
4. Feature cards fade in staggered, 3D tilt on hover, shapes rotate in background
5. Preview list syncs with scroll, mockup crossfades
6. Pricing card shines, tilt works, correct price shown
7. FAQ accordion opens/closes, keyboard works
8. Footer links scroll to sections
9. Custom cursor works throughout
10. Change `data-nav-style` to test all 3 nav layouts

- [ ] **Step 4: Full end-to-end test — mobile**

Resize browser to 375px width (or use DevTools device mode):
1. Nav shows hamburger, overlay works
2. Hero stacks vertically, CTAs full-width
3. Stats 2x2 grid
4. Features single column
5. Preview stacks, horizontal pills
6. Pricing card centered
7. FAQ works
8. Footer stacked centered
9. Custom cursor hidden

- [ ] **Step 5: Commit final version**

```bash
git add index.html
git commit -m "feat: polish and integrate all sections — APEX landing page complete"
```

---

## Summary

| Task | Section | Key Features |
|------|---------|-------------|
| 1 | Skeleton + CSS Foundation | Design tokens, fonts, reset, reveal system |
| 2 | Custom Cursor | Dot + ring with lerp, hover states |
| 3 | Navigation | 3 switchable styles, mobile menu, scroll glass |
| 4 | Hero | Word animation, 3D mockup, geo pricing, orbs |
| 5 | Stats Bar | Counter animation, scroll-triggered |
| 6 | Features Grid | 6 glass cards, SVG icons, 3D tilt, floating shapes |
| 7 | Theme Preview | Scroll-sync list, crossfading mockup |
| 8 | Pricing Card | Glass card, shine animation, geo pricing |
| 9 | FAQ | Accordion, keyboard accessible |
| 10 | Footer | Minimal, responsive |
| 11 | Polish | Integration, testing, final commit |
