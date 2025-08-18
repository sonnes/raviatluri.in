# Style Guide

This comprehensive style guide documents the design system, color palette, typography, and component patterns used throughout the Ravi Atluri personal website. All styles are documented using Tailwind CSS classes for easy reference and implementation.

## Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Color Palette](#color-palette)
3. [Typography](#typography)
4. [Layout & Spacing](#layout--spacing)
5. [Component Patterns](#component-patterns)
6. [Interactive Elements](#interactive-elements)
7. [Visual Effects](#visual-effects)
8. [Content Components](#content-components)

## Design Philosophy

The website follows a **minimalist design approach** inspired by Stripe and Linear, prioritizing clean execution and technical credibility:

### Core Principles

- **Minimalist-First Mindset**: Design decisions prioritize clarity and purpose over visual complexity
- **Whitespace as Design Element**: Generous spacing creates breathing room and visual hierarchy
- **Typography as Primary Visual**: Let refined typography carry the design weight
- **Subtle Interactions**: Micro-interactions that enhance usability without distraction
- **Purposeful Color Usage**: Limited color palette with strategic accent usage
- **Content-First Architecture**: Every element serves the content, never competes with it

### Brand Expression

- Clean, modern typography using the Inter font family (professional sans-serif standard)
- Strategic use of red accent color for brand recognition and engagement
- Generous whitespace and clear information hierarchy for optimal readability
- Subtle interactive states that enhance usability without distraction

## Color Palette

### Primary Colors

#### Brand Red (Strategic Accent) - Purposeful Engagement

- **Active/Default**: `text-red-500` - Used for active navigation, links, and primary CTAs only
- **Hover**: `hover:text-red-500`, `group-hover:text-red-500` - Subtle interactive hover states
- **Content Links**: `hover:text-red-700` - Stronger emphasis for MDX content links
- **Dark Mode**: `dark:text-red-400` - Slightly lighter variant for dark backgrounds
- **Accessibility**: All red combinations meet WCAG AA contrast requirements

#### Neutral Grays (Stone Scale - Warm & Minimalist)

- **Primary Text**:
  - Light mode: `text-stone-800` - Main body text and headings
  - Dark mode: `text-stone-100` / `text-stone-200` - Light text on dark backgrounds (varies by context)
- **Secondary Text**:
  - Light mode: `text-stone-600` - Descriptions, secondary content
  - Dark mode: `text-stone-400` - Muted text in dark mode
- **Muted Text**:
  - Universal: `text-stone-500` - Meta information, timestamps, captions
  - Dark mode: `text-stone-400` / `text-stone-500` - Navigation meta, subtle content

#### Legacy Gray Usage (Inconsistent - Should be migrated to Stone)

- **Gray colors**: `text-gray-800`, `text-gray-700`, `text-gray-600`, `text-gray-300`
- **Note**: These appear in MDX components and should be standardized to stone scale

### Background Colors

#### Main Backgrounds (Clean & Minimalist)

- **Primary**: `bg-white` / `dark:bg-stone-900` - Pure white/off-white main page background
- **Card/Hover**: `bg-stone-50` / `dark:bg-stone-800` - Subtle card hover states
- **Code Inline**: `bg-stone-100` / `dark:bg-stone-800` - Minimal inline code backgrounds

#### Glass/Translucent Effects (Subtle Depth)

- **Header/Navigation**: `bg-white/75` / `dark:bg-stone-900/75` - Translucent header background
- **Navigation Pills**: `bg-white/90` / `dark:bg-stone-800/90` - Navigation containers
- **Avatar Container**: `bg-white/90` / `dark:bg-stone-800/90` - Avatar background

#### Borders (Minimal Separation)

- **Light**: `border-stone-200` / `dark:border-stone-700` - General borders, dividers
- **Subtle**: `border-stone-100` / `dark:border-stone-700/40` - Footer borders
- **Navigation**: `ring-stone-900/5` / `dark:ring-white/10` - Ring borders on glass elements

## Typography

### Font Stack (Minimalist Excellence)

- **Primary**: Inter (`font-sans`) - Clean sans-serif for body text, headings, UI elements
- **Monospace**: JetBrains Mono (`font-mono`) - Technical content, code blocks
- **Base Settings**: `antialiased` - Consistent font rendering

### Typography Standards (Aligned with Minimalist Principles)

- **Base Size**: 16px minimum for body text (prevents iOS zoom behavior)
- **Line Height**: 1.5-1.6 for optimal readability (`leading-relaxed` = 1.625)
- **Reading Width**: 45-75 characters per line on desktop, 35-45 on mobile
- **Accessibility**: All text meets WCAG AA contrast requirements (4.5:1 ratio)

### Heading Hierarchy (Subtle Scale)

#### H1 - Page Titles (32-36px equivalent)

```css
text-4xl font-semibold tracking-tight text-stone-800 dark:text-stone-100
/* Usage: Main page titles, hero headings */
/* Responsive: Can scale to sm:text-5xl on larger screens */
/* Note: Using font-semibold for cleaner, less heavy appearance */
```

#### H2 - Section Headings (24-28px equivalent)

```css
text-xl font-semibold text-stone-800 dark:text-stone-100
/* Usage: Section titles, article list headings */
/* Note: Consistent font-semibold for hierarchy without heaviness */
```

#### H2 - Article Titles (in cards)

```css
text-xl font-semibold tracking-tight text-stone-800
/* Usage: Article titles in cards and listings */
```

#### MDX Content Headings (Clean Hierarchy)

- **H1**: `text-2xl font-semibold mt-12 mb-3` - Article main headings
- **H2**: `text-xl font-semibold mt-8 mb-3` - Article section headings
- **H3**: `text-lg font-semibold mt-6 mb-3` - Article subsection headings
- **H4**: `text-base font-semibold mb-3` - Article minor headings

### Body Text (16-18px base size)

- **Primary**: `text-base text-stone-800` / `dark:text-stone-200` - Standard body text
- **Large Description**: `text-lg text-stone-600` / `dark:text-stone-400` - Page descriptions, introductory content (professional positioning)
- **Secondary**: `text-base text-stone-600` - Article descriptions, secondary content
- **Meta Information**: `text-sm text-stone-400` - Timestamps, tags, captions
- **Caption Text**: `text-xs italic text-stone-800` - Image captions, very small text (migrated from gray)
- **Small Text**: `text-sm` - Navigation, footer links, action labels (minimum 16px on mobile)

### Professional Content Guidelines

- **Line Length**: Optimized for 45-75 characters per line
- **Paragraph Spacing**: Uses `my-6` for generous visual separation
- **Technical Writing**: Emphasizes clarity and scannable content structure

### Text Spacing

- **Paragraph**: `leading-relaxed my-6` - Article content paragraphs with generous spacing
- **List Spacing**: `space-y-2` (ul), `space-y-3` (ol) - Comfortable list item spacing

## Layout & Spacing

### Container System (Whitespace-First)

```css
/* Outer Container */
sm:px-8
mx-auto max-w-7xl lg:px-8

/* Inner Container */
relative px-4 sm:px-8 lg:px-12
mx-auto max-w-2xl lg:max-w-5xl
```

### Grid Systems

#### Homepage Layout

```css
/* Main grid */
grid grid-cols-1 md:grid-cols-3 gap-12

/* Content sections */
md:col-span-2  /* Main content area */
md:col-span-1  /* Sidebar */

/* Hero section */
grid grid-cols-1 md:grid-cols-2 gap-8 mb-24
```

#### Header Layout

```css
/* Header grid */
relative flex items-center justify-between md:grid md:grid-cols-3
```

### Spacing Scale (Generous & Systematic)

- **Component spacing**: `gap-8`, `gap-12` - Between major components
- **Content spacing**: `space-y-16` - Between article cards
- **Section margins**: `mt-12`, `mt-32` - Page sections, footer
- **Element margins**: `mt-3`, `mt-6`, `mb-4`, `mb-6`, `mb-12` - Individual elements

## Component Patterns

### Article Cards (Clean & Minimalist)

```css
/* Container */
group relative flex flex-col items-start

/* Hover background */
absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-stone-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-sm

/* Content stacking */
relative z-10  /* Applied to all content elements */
```

### Navigation Pills (Subtle & Clean)

```css
/* Desktop navigation */
flex rounded-full bg-white/90 px-3 text-sm font-medium text-stone-800 shadow-lg shadow-stone-800/5 ring-1 ring-stone-900/5 backdrop-blur dark:bg-stone-800/90 dark:text-stone-200 dark:ring-white/10

/* Navigation items */
relative block px-3 py-2 transition
```

### Avatar Container (Minimalist)

```css
h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg shadow-stone-800/5 ring-1 ring-stone-900/5 backdrop-blur dark:bg-stone-800/90 dark:ring-white/10
```

## Interactive Elements

### Accessibility Standards

All interactive elements follow WCAG 2.2 compliance:

- **Touch Targets**: Minimum 44px size for mobile interaction
- **Focus Indicators**: 2px minimum outline with high contrast
- **Keyboard Navigation**: Full functionality accessible via keyboard
- **Screen Reader Support**: Proper ARIA labels and semantic markup

### Links (Purposeful Interaction)

```css
/* Primary links (MDX content) */
text-red-500 hover:text-red-700 dark:underline

/* Navigation links */
hover:text-red-500 dark:hover:text-red-400

/* Simple page links */
hover:text-stone-800 /* Used in homepage "View all" links */

/* Card title links */
group-hover:text-red-500 transition-colors duration-200

/* Read more links */
text-sm font-medium text-stone-500 group-hover:text-red-500 transition-colors duration-200

/* Footer links */
transition hover:text-red-500 dark:hover:text-red-400
```

### Active States (Subtle Indicators)

```css
/* Active navigation */
text-red-500 dark:text-red-400

/* Active indicator line */
absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-red-500/0 via-red-500/40 to-red-500/0 dark:from-red-400/0 dark:via-red-400/40 dark:to-red-400/0
```

### Buttons (Clean & Minimalist)

```css
/* Mobile menu button */
group flex items-center rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-stone-800 shadow-lg shadow-stone-800/5 ring-1 ring-stone-900/5 backdrop-blur dark:bg-stone-800/90 dark:text-stone-200 dark:ring-white/10 dark:hover:ring-white/20
```

## Visual Effects

### Backdrop Blur (Subtle Depth)

```css
backdrop-blur-sm  /* Header background */
backdrop-blur     /* Navigation and UI elements */
```

### Shadows (Minimal & Purposeful)

```css
/* Navigation/UI shadows */
shadow-lg shadow-stone-800/5

/* Image shadows */
shadow-sm
```

### Transitions (Smooth & Subtle)

```css
/* Standard transitions */
transition
transition-colors duration-200

/* Hover scale effects */
scale-95 opacity-0 transition group-hover:scale-100 group-hover:opacity-100
```

### Ring Borders (Minimal Separation)

```css
/* Light backgrounds */
ring-1 ring-stone-900/5

/* Dark backgrounds */
dark:ring-white/10
dark:hover:ring-white/20
```

## Content Components

### Code Blocks (Clean Technical Display)

#### Inline Code

```css
bg-stone-100 dark:bg-stone-800 rounded px-1.5 py-0.5 font-mono text-[0.90em]
/* Maintains readability while distinguishing from body text */
```

#### Code Blocks (Minimalist Standards)

- **Syntax Highlighting**: `react-syntax-highlighter` with subtle VS Code theme
- **Font Size**: 14-16px for density while maintaining readability
- **Language Labels**: Always specified for proper highlighting
- **Copy Functionality**: Should include copy-to-clipboard for usability
- **Line Numbers**: Added for longer examples (>10 lines)
- **Overflow Handling**: Horizontal scroll preserves syntax integrity
- **Custom Styling**: `margin: 1.5rem 0`, `padding: 1rem`, `borderRadius: 0.5rem`
- **Performance**: Optimized loading for technical content

### Lists (Clean Structure)

```css
/* Unordered lists */
list-disc pl-5 space-y-2

/* Ordered lists */
list-decimal pl-5 space-y-3

/* List items */
pl-1
```

### Images (Purposeful Visuals)

```css
/* Standard images */
rounded-lg
/* With shadows for enhanced images */
rounded-lg shadow-sm

/* Image containers */
grid grid-cols-1 justify-items-center mt-6 mb-12

/* Image captions */
mt-3 text-xs italic text-stone-800
/* Note: Migrated from gray-800 to stone-800 for consistency */
```

### Blockquotes (Minimalist Styling)

```css
ml-[0.075em] border-l-3 border-stone-300 pl-4 text-stone-700 dark:border-stone-600 dark:text-stone-300
/* Note: Migrated from gray colors to stone scale for consistency */
```

### Article Content Sidebar (Clean Structure)

```css
/* Timeline border */
border-l border-stone-200 pl-6

/* Article spacing */
space-y-16
```

## Mobile Responsiveness (Mobile-First Design)

### Progressive Enhancement Strategy

- **Mobile-first approach**: Start with mobile experience, enhance for desktop
- **Key breakpoints**: `sm:` (640px+), `md:` (768px+), `lg:` (1024px+)
- **Container Queries**: Component-level responsiveness where supported
- **Viewport Optimization**: Proper viewport meta tag and fluid layouts

### Mobile Content Optimization

- **Performance**: Target under 3 seconds on 3G connections
- **Typography**: Minimum 16px to prevent iOS zoom behavior
- **Line Length**: 35-45 characters per line on mobile
- **Touch Targets**: Minimum 44px for thumb navigation
- **Single Column**: Stack content vertically for optimal mobile experience

### Mobile Navigation (Clean & Minimalist)

```css
/* Mobile popover */
fixed inset-x-4 top-8 z-50 origin-top rounded-3xl bg-white p-8 ring-1 ring-stone-900/5 dark:bg-stone-900 dark:ring-stone-800

/* Mobile backdrop */
fixed inset-0 z-50 bg-stone-800/40 backdrop-blur-sm dark:bg-black/80
```

### Responsive Layout Patterns

```css
/* Flex to grid */
flex items-center justify-between md:grid md:grid-cols-3

/* Stack to side-by-side */
grid grid-cols-1 md:grid-cols-2 gap-8

/* Hide on mobile, show on desktop */
hidden md:block

/* Show on mobile, hide on desktop */
md:hidden
```

## Performance & Technical Excellence

### Core Web Vitals (2025 Standards)

- **Largest Contentful Paint**: Target ≤ 2.5 seconds
- **Interaction to Next Paint**: Target ≤ 200 milliseconds
- **Cumulative Layout Shift**: Target ≤ 0.1 (reserved space for all images)
- **Performance Budget**: Monitor bundle size and loading metrics

### Loading Optimization

- **Critical Resource Preloading**: Hero images, essential CSS, fonts
- **Lazy Loading**: Off-screen images and non-critical content
- **Modern Image Formats**: WebP/AVIF with fallbacks
- **Font Loading**: `font-display: swap` for web fonts

## Minimalist Design Principles (Stripe & Linear Inspired)

### Visual Hierarchy Through Typography

- **Let Typography Lead**: Use font weight, size, and spacing to create hierarchy
- **Minimal Color Usage**: Reserve color for interactive elements and key CTAs
- **Whitespace as Structure**: Use generous spacing to organize content
- **Subtle Borders**: Use minimal borders or background colors for separation

### Interaction Design Philosophy

- **Purposeful Micro-interactions**: Every interaction serves a clear purpose
- **Subtle State Changes**: Hover and focus states should be noticeable but not distracting
- **Progressive Disclosure**: Reveal complexity gradually, not all at once
- **Consistent Patterns**: Use the same interaction patterns throughout the site

### Content Presentation

- **Clean Information Architecture**: Clear, logical content organization
- **Minimal Visual Noise**: Remove decorative elements that don't serve content
- **Purposeful Imagery**: Every image should have a clear purpose
- **Consistent Spacing**: Use systematic spacing scale throughout

## Known Inconsistencies & Migration Notes

### Priority Improvements (Aligned with Minimalist Principles)

#### Color System Standardization

- **Current**: Mixed usage of `text-gray-*` and `text-zinc-*`
- **Target**: Standardize on stone scale for warm, minimalist consistency
- **Priority areas**: MDX components, image captions, blockquotes
- **Accessibility**: Ensure all combinations meet WCAG AA (4.5:1) contrast

#### Typography Consistency

- **H1 Pattern**: Standardize `tracking-tight` usage across all page titles
- **Dark Mode**: Establish consistent `text-stone-100` vs `text-stone-200` usage
- **Font Weight**: Use `font-semibold` consistently for cleaner hierarchy
- **Mobile Typography**: Ensure 16px minimum base size across all components

#### Professional Content Enhancement

- **Code Blocks**: Add copy-to-clipboard functionality
- **Images**: Implement responsive images with srcset
- **Focus States**: Enhanced focus indicators (2px minimum)
- **Reading Experience**: Optimize line length for technical content

### Missing Documentation

- **Accessibility Patterns**: ARIA labels, semantic markup, keyboard navigation
- **Animation Guidelines**: Transition timing values and interaction feedback
- **Performance Budgets**: Bundle size limits and optimization targets
- **Content Strategy**: Technical writing guidelines and thought leadership structure
- **SEO Implementation**: Meta tags, structured data, XML sitemap patterns

## Implementation Guidelines

This style guide serves as the definitive reference for creating a professional website that showcases technical expertise while building thought leadership authority. Each pattern reflects the core principle that **design decisions should prioritize clarity and purpose** through:

1. **Clean Execution**: Minimalist implementation over decorative elements
2. **Performance Excellence**: Technical best practices in every component
3. **Accessibility First**: Inclusive design demonstrating engineering thoroughness
4. **Content-Driven**: Every element supports the narrative of problem-solving expertise
5. **Continuous Optimization**: Regular updates maintaining relevance and technical accuracy

Priority should be given to migrating legacy patterns and implementing missing accessibility features to meet 2025 professional standards, with a focus on clean minimalist design inspired by industry leaders like Stripe and Linear.
