# Ignite Learning Academy — Design Tokens & Design System Specification

Extracted directly from the luxury educational reference website [SNTTI](https://www.sntti.in/).

---

## 1. Color Palette

| Token Name | Hex Code | HSL / RGBA | Usage & Semantic Purpose |
| :--- | :--- | :--- | :--- |
| **Primary (Burgundy)** | `#5A1D16` | `hsl(5, 59%, 22%)` | Primary brand tone, header accents, CTA buttons, active states, key titles |
| **Secondary (Wine Maroon)** | `#6B241A` | `hsl(7, 61%, 26%)` | Hover states for primary elements, deep section backgrounds |
| **Gold Accent** | `#E9B13A` | `hsl(41, 80%, 57%)` | Hero highlights, top announcement bar, star badges, active accents |
| **Gold Hover** | `#D89F28` | `hsl(41, 69%, 50%)` | Interactive hover states for gold elements |
| **Warm Dark (Espresso)** | `#3D221B` | `hsl(12, 38%, 17%)` | Heading text, footer background, luxury dark cards |
| **Body Text (Muted Slate)** | `#6F6864` | `hsl(23, 5%, 42%)` | Readable paragraph copy, descriptions, secondary meta info |
| **Warm Cream (Light BG)** | `#FFF8F5` | `hsl(18, 100%, 98%)` | Page backgrounds, subtle card surfaces, alternating sections |
| **Pure White** | `#FFFFFF` | `#FFFFFF` | Card surfaces, crisp text on dark, clean contrast |
| **Border Subtle** | `rgba(90, 29, 22, 0.12)` | `rgba(90, 29, 22, 0.12)` | Luxury thin dividers, card borders, input borders |
| **WhatsApp Green** | `#25D366` | `#25D366` | Floating WhatsApp chat button |

---

## 2. Typography

- **Primary Font Family**: **`Plus Jakarta Sans`** (`next/font/google`)
  - Weights:
    - `400` (Regular) — Body paragraphs, descriptions
    - `500` (Medium) — Navigation links, meta labels, button labels
    - `600` (SemiBold) — Card titles, subheadings, key metrics
    - `700` (Bold) — Section titles, modal headers, badge pills
    - `800` (ExtraBold) — Hero display titles

---

## 3. Spacing Scale & Layout Container

- **Container Max-Width**: `1280px` (`max-w-7xl` / `max-w-6xl`)
- **Horizontal Padding**:
  - Mobile: `16px` (`px-4`)
  - Tablet: `24px` (`px-6`)
  - Desktop: `32px` (`px-8`)
- **Vertical Spacing Scale**:
  - Section Padding: `py-12` (mobile) to `py-20` / `py-24` (desktop)
  - Card Internal Padding: `p-6` to `p-8`
  - Component Gap: `gap-4` (compact) to `gap-8` (grid items)

---

## 4. Border Radius Scale

- **Badge & Pill Elements**: `9999px` (`rounded-full`)
- **Buttons**: `30px` / `rounded-full`
- **Cards & Visual Containers**: `16px` (`rounded-2xl`) or `24px` (`rounded-3xl`)
- **Input Fields & Small Controls**: `10px` (`rounded-lg`)

---

## 5. Shadows & Elevations

- **Soft Elevation**: `0 10px 30px rgba(46, 26, 20, 0.07)`
- **Hover Lift Elevation**: `0 18px 40px rgba(90, 29, 22, 0.14)`
- **Gold Glow**: `0 10px 25px rgba(233, 177, 58, 0.35)`
