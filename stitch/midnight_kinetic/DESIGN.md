---
name: Midnight Kinetic
colors:
  surface: '#101417'
  surface-dim: '#101417'
  surface-bright: '#36393e'
  surface-container-lowest: '#0b0f12'
  surface-container-low: '#181c20'
  surface-container: '#1c2024'
  surface-container-high: '#272a2e'
  surface-container-highest: '#323539'
  on-surface: '#e0e2e8'
  on-surface-variant: '#c2c6d8'
  inverse-surface: '#e0e2e8'
  inverse-on-surface: '#2d3135'
  outline: '#8c90a1'
  outline-variant: '#424656'
  surface-tint: '#b3c5ff'
  primary: '#b3c5ff'
  on-primary: '#002b75'
  primary-container: '#0066ff'
  on-primary-container: '#f8f7ff'
  inverse-primary: '#0054d6'
  secondary: '#c8c6c7'
  on-secondary: '#313031'
  secondary-container: '#4a494a'
  on-secondary-container: '#bab8b9'
  tertiary: '#c8c6c8'
  on-tertiary: '#303032'
  tertiary-container: '#727173'
  on-tertiary-container: '#faf7f9'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dae1ff'
  primary-fixed-dim: '#b3c5ff'
  on-primary-fixed: '#001849'
  on-primary-fixed-variant: '#003fa4'
  secondary-fixed: '#e5e2e3'
  secondary-fixed-dim: '#c8c6c7'
  on-secondary-fixed: '#1c1b1c'
  on-secondary-fixed-variant: '#474647'
  tertiary-fixed: '#e4e2e4'
  tertiary-fixed-dim: '#c8c6c8'
  on-tertiary-fixed: '#1b1b1d'
  on-tertiary-fixed-variant: '#474649'
  background: '#101417'
  on-background: '#e0e2e8'
  surface-variant: '#323539'
typography:
  h1:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  h2:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  h3:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: '0'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: '0'
  label-caps:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.1em
  data-mono:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: '0'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1440px
  gutter: 24px
  margin-x: 40px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style

This design system embodies the intersection of high-end luxury and high-performance SaaS. The aesthetic is "Technological Elegance"—a dark, immersive environment that suggests precision, exclusivity, and speed. The target audience includes enterprise procurement officers and B2B stakeholders who value efficiency but expect a premium, modern experience.

The visual style is a refined mix of **Glassmorphism** and **Minimalism**. It utilizes deep obsidian surfaces layered with translucent glass panels to create a sense of three-dimensional space. The interface feels like a high-tech command center, using light as a functional tool rather than just decoration. Subtle glows and electric accents guide the user through complex B2B workflows with surgical precision.

## Colors

The palette is anchored by "Midnight Obsidian" (#0A0A0B), providing a void-like depth that allows interactive elements to pop. "Charcoal Slate" (#1A1A1C) is used for secondary surfaces and container nesting. 

The primary action color, "Electric Blue" (#0066FF), is reserved for critical path interactions, data highlights, and active states. It should be used sparingly to maintain its impact. For borders and glass highlights, use low-opacity variants of white (10-15%) or the primary blue to create the "glow" effect against the dark backgrounds.

## Typography

The typography system relies on **Inter** for its industrial clarity and exceptional readability in data-heavy B2B contexts. Headlines use tight tracking and heavy weights to convey authority. 

To inject a "futuristic" tech-edge, **Space Grotesk** is used for functional labels, technical data points, and UI metadata. This font's geometric quirks provide the "SaaS-meets-Luxury" personality without compromising the professional tone. All uppercase labels should have increased letter spacing to ensure legibility against dark, glassmorphic backgrounds.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy for the main content area (1440px max-width) to maintain a premium, editorial feel, while sidebars and navigation panels remain fluid. A 12-column grid is used with generous 24px gutters.

The spacing rhythm is "Spacious Luxury." We avoid information density in favor of clarity. Vertical stack spacing is intentionally large to let the glassmorphic elements "breathe." Negative space is not empty; it is a structural element used to group related business logic.

## Elevation & Depth

Depth is created through **Glassmorphism** rather than traditional drop shadows. 

1.  **Base Layer:** Midnight Black (#0A0A0B).
2.  **Surface Layer:** Charcoal Grey (#1A1A1C) with 0px blur.
3.  **Glass Layer:** Semi-transparent background (rgba(255, 255, 255, 0.05)) with a 20px backdrop-blur.
4.  **Border Glow:** A 1px solid stroke (rgba(255, 255, 255, 0.1)). On active or hovered elements, this stroke transitions to the Primary Electric Blue with a subtle 4px outer glow (box-shadow).

This creates a "layered crystal" effect where the most important information appears to float closest to the user.

## Shapes

The design system utilizes **Soft** geometry. Corners are rounded enough to feel sophisticated and modern but remain sharp enough to feel professional and technical. 

Standard components (Inputs, Buttons) use a 4px (0.25rem) radius. Larger containers and glass cards use an 8px or 12px radius to emphasize their floating nature. This consistent use of "technical rounding" avoids the playfulness of pill shapes while moving away from the coldness of sharp 90-degree angles.

## Components

### Buttons
- **Primary:** Solid Electric Blue with white text. On hover, add a subtle blue outer glow.
- **Secondary:** Glassmorphic background with a 1px white border (15% opacity).
- **Ghost:** No background, Electric Blue text, 1px blue border on hover.

### Glassmorphic Cards
Cards are the primary container. They must feature a `backdrop-filter: blur(20px)` and a very subtle inner gradient from top-left (light) to bottom-right (dark) to simulate light hitting a glass edge.

### Sleek Progress Bars
Progress tracks are thin (4px) and dark. The "fill" is a gradient of Electric Blue. For active processes, add a "shimmer" animation that moves across the filled portion.

### Inputs & Selects
Dark backgrounds (#0A0A0B) with a subtle 1px border. On focus, the border glows Electric Blue and the label (Space Grotesk) shifts position.

### Minimalist Icons
Use thin-stroke (1.5pt) monolinear icons. Icons should be tech-forward (e.g., using "layers" or "nodes" metaphors).

### Data Tables
Rows are separated by low-opacity lines (5% white). The header row is pinned and uses a glassmorphic background to maintain context while scrolling.