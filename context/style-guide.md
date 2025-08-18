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

The website follows a **technical credibility-first approach** aligned with professional personal branding:

### Core Principles
- **Developer-First Mindset**: Design decisions reinforce technical credibility over aesthetic appeal
- **Authenticity Over Perfection**: Clean execution demonstrates technical competence without flashy visuals
- **Content-First Architecture**: Every element supports the narrative of problem-solving and knowledge sharing
- **Professional Positioning**: Design reinforces thought leadership and technical expertise
- **Performance Excellence**: Technical implementation demonstrates engineering best practices

### Brand Expression
- Clean, modern typography using the Noto Sans font family (professional sans-serif standard)
- Strategic use of red accent color for brand recognition and engagement
- Generous white space and clear information hierarchy for optimal readability
- Subtle interactive states that enhance usability without distraction

## Color Palette

### Primary Colors

#### Brand Red (Primary Accent) - Professional Trust & Engagement
- **Active/Default**: `text-red-500` - Used for active navigation, links, and primary CTAs
- **Hover**: `hover:text-red-500`, `group-hover:text-red-500` - Interactive hover states
- **Content Links**: `hover:text-red-700` - Stronger emphasis for MDX content links
- **Dark Mode**: `dark:text-red-400` - Slightly lighter variant for dark backgrounds
- **Accessibility**: All red combinations meet WCAG AA contrast requirements

#### Neutral Grays (Zinc Scale)
- **Primary Text**: 
  - Light mode: `text-zinc-800` - Main body text and headings
  - Dark mode: `text-zinc-100` / `text-zinc-200` - Light text on dark backgrounds (varies by context)
- **Secondary Text**: 
  - Light mode: `text-zinc-600` - Descriptions, secondary content
  - Dark mode: `text-zinc-400` - Muted text in dark mode
- **Muted Text**: 
  - Universal: `text-zinc-500` - Meta information, timestamps, captions
  - Dark mode: `text-zinc-400` / `text-zinc-500` - Navigation meta, subtle content

#### Legacy Gray Usage (Inconsistent - Should be migrated to Zinc)
- **Gray colors**: `text-gray-800`, `text-gray-700`, `text-gray-600`, `text-gray-300`
- **Note**: These appear in MDX components and should be standardized to zinc scale

### Background Colors

#### Main Backgrounds
- **Primary**: `bg-white` / `dark:bg-zinc-900` - Main page background
- **Card/Hover**: `bg-zinc-50` / `dark:bg-zinc-800` - Article card hover states
- **Code Inline**: `bg-zinc-100` / `dark:bg-zinc-800` - Inline code backgrounds

#### Glass/Translucent Effects
- **Header/Navigation**: `bg-white/75` / `dark:bg-zinc-900/75` - Translucent header background
- **Navigation Pills**: `bg-white/90` / `dark:bg-zinc-800/90` - Navigation containers
- **Avatar Container**: `bg-white/90` / `dark:bg-zinc-800/90` - Avatar background

#### Borders
- **Light**: `border-zinc-200` / `dark:border-zinc-700` - General borders, dividers
- **Subtle**: `border-zinc-100` / `dark:border-zinc-700/40` - Footer borders
- **Navigation**: `ring-zinc-900/5` / `dark:ring-white/10` - Ring borders on glass elements

## Typography

### Font Stack
- **Primary**: Noto Sans (`font-sans`) - Professional sans-serif for body text, headings, UI elements
- **Monospace**: Noto Sans Mono (`font-mono`) - Technical content, code blocks
- **Base Settings**: `antialiased` - Consistent font rendering

### Typography Standards (Aligned with Design Principles)
- **Base Size**: 16px minimum for body text (prevents iOS zoom behavior)
- **Line Height**: 1.4-1.6 for optimal readability (`leading-snug` = 1.375)
- **Reading Width**: 45-75 characters per line on desktop, 35-45 on mobile
- **Accessibility**: All text meets WCAG AA contrast requirements (4.5:1 ratio)

### Heading Hierarchy

#### H1 - Page Titles (32-36px equivalent)
```css
text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100
/* Usage: Main page titles, hero headings */
/* Responsive: Can scale to sm:text-5xl on larger screens */
```

#### H2 - Section Headings (28px equivalent)
```css
text-xl font-bold text-zinc-800 dark:text-zinc-100
/* Usage: Section titles, article list headings */
/* Note: Some contexts use font-semibold for lighter weight */
```

#### H2 - Article Titles (in cards)
```css
text-xl font-semibold tracking-tight text-zinc-800
/* Usage: Article titles in cards and listings */
```

#### MDX Content Headings
- **H1**: `text-2xl font-semibold mt-12 mb-3` - Article main headings
- **H2**: `text-xl font-semibold mt-8 mb-3` - Article section headings
- **H3**: `text-lg font-semibold mt-6 mb-3` - Article subsection headings
- **H4**: `text-base font-semibold mb-3` - Article minor headings

### Body Text (16-18px base size)
- **Primary**: `text-base text-zinc-800` / `dark:text-zinc-200` - Standard body text
- **Large Description**: `text-lg text-zinc-600` / `dark:text-zinc-400` - Page descriptions, introductory content (professional positioning)
- **Secondary**: `text-base text-zinc-600` - Article descriptions, secondary content
- **Meta Information**: `text-sm text-zinc-400` - Timestamps, tags, captions
- **Caption Text**: `text-xs italic text-gray-800` - Image captions, very small text (legacy - migrate to zinc)
- **Small Text**: `text-sm` - Navigation, footer links, action labels (minimum 16px on mobile)

### Professional Content Guidelines
- **Line Length**: Optimized for 45-75 characters per line
- **Paragraph Spacing**: Uses `my-4` for visual separation
- **Technical Writing**: Emphasizes clarity and scannable content structure

### Text Spacing
- **Paragraph**: `leading-snug my-4` - Article content paragraphs
- **List Spacing**: `space-y-1` (ul), `space-y-2` (ol) - List item spacing

## Layout & Spacing

### Container System
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
grid grid-cols-1 md:grid-cols-3 gap-8

/* Content sections */
md:col-span-2  /* Main content area */
md:col-span-1  /* Sidebar */

/* Hero section */
grid grid-cols-1 md:grid-cols-2 gap-6 mb-16
```

#### Header Layout
```css
/* Header grid */
relative flex items-center justify-between md:grid md:grid-cols-3
```

### Spacing Scale
- **Component spacing**: `gap-6`, `gap-8` - Between major components
- **Content spacing**: `space-y-12` - Between article cards
- **Section margins**: `mt-9`, `mt-32` - Page sections, footer
- **Element margins**: `mt-2`, `mt-4`, `mb-3`, `mb-4`, `mb-8` - Individual elements

## Component Patterns

### Article Cards
```css
/* Container */
group relative flex flex-col items-start

/* Hover background */
absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-sm

/* Content stacking */
relative z-10  /* Applied to all content elements */
```

### Navigation Pills
```css
/* Desktop navigation */
flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10

/* Navigation items */
relative block px-3 py-2 transition
```

### Avatar Container
```css
h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10
```

## Interactive Elements

### Accessibility Standards
All interactive elements follow WCAG 2.2 compliance:
- **Touch Targets**: Minimum 44px size for mobile interaction
- **Focus Indicators**: 2px minimum outline with high contrast
- **Keyboard Navigation**: Full functionality accessible via keyboard
- **Screen Reader Support**: Proper ARIA labels and semantic markup

### Links
```css
/* Primary links (MDX content) */
text-red-500 hover:text-red-700 dark:underline

/* Navigation links */
hover:text-red-500 dark:hover:text-red-400

/* Simple page links */
hover:text-zinc-800 /* Used in homepage "View all" links */

/* Card title links */
group-hover:text-red-500 transition-colors duration-200

/* Read more links */
text-sm font-medium text-zinc-500 group-hover:text-red-500 transition-colors duration-200

/* Footer links */
transition hover:text-red-500 dark:hover:text-red-400
```

### Active States
```css
/* Active navigation */
text-red-500 dark:text-red-400

/* Active indicator line */
absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-red-500/0 via-red-500/40 to-red-500/0 dark:from-red-400/0 dark:via-red-400/40 dark:to-red-400/0
```

### Buttons
```css
/* Mobile menu button */
group flex items-center rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20
```

## Visual Effects

### Backdrop Blur
```css
backdrop-blur-sm  /* Header background */
backdrop-blur     /* Navigation and UI elements */
```

### Shadows
```css
/* Navigation/UI shadows */
shadow-lg shadow-zinc-800/5

/* Image shadows */
shadow-sm
```

### Transitions
```css
/* Standard transitions */
transition
transition-colors duration-200

/* Hover scale effects */
scale-95 opacity-0 transition group-hover:scale-100 group-hover:opacity-100
```

### Ring Borders
```css
/* Light backgrounds */
ring-1 ring-zinc-900/5

/* Dark backgrounds */
dark:ring-white/10
dark:hover:ring-white/20
```

## Content Components

### Code Blocks (Technical Content Excellence)

#### Inline Code
```css
bg-zinc-100 dark:bg-zinc-800 rounded px-1.5 py-0.5 font-mono text-[0.90em]
/* Maintains readability while distinguishing from body text */
```

#### Code Blocks (Professional Standards)
- **Syntax Highlighting**: `react-syntax-highlighter` with VS Code Dark Plus theme
- **Font Size**: 14-16px for density while maintaining readability
- **Language Labels**: Always specified for proper highlighting
- **Copy Functionality**: Should include copy-to-clipboard for usability
- **Line Numbers**: Added for longer examples (>10 lines)
- **Overflow Handling**: Horizontal scroll preserves syntax integrity
- **Custom Styling**: `margin: 1.5rem 0`, `padding: 1rem`, `borderRadius: 0.5rem`
- **Performance**: Optimized loading for technical content

### Lists
```css
/* Unordered lists */
list-disc pl-5 space-y-1

/* Ordered lists */
list-decimal pl-5 space-y-2

/* List items */
pl-1
```

### Images
```css
/* Standard images */
rounded-lg
/* With shadows for enhanced images */
rounded-lg shadow-sm

/* Image containers */
grid grid-cols-1 justify-items-center mt-4 mb-8

/* Image captions */
mt-2 text-xs italic text-gray-800
/* Note: Uses legacy gray-800, should be migrated to zinc scale */
```

### Blockquotes
```css
ml-[0.075em] border-l-3 border-gray-300 pl-4 text-gray-700 dark:border-zinc-600 dark:text-zinc-300
/* Note: Uses legacy gray colors in light mode, should be migrated to zinc scale */
```

### Article Content Sidebar
```css
/* Timeline border */
border-l border-zinc-200 pl-6

/* Article spacing */
space-y-12
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

### Mobile Navigation
```css
/* Mobile popover */
fixed inset-x-4 top-8 z-50 origin-top rounded-3xl bg-white p-8 ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-zinc-800

/* Mobile backdrop */
fixed inset-0 z-50 bg-zinc-800/40 backdrop-blur-sm dark:bg-black/80
```

### Responsive Layout Patterns
```css
/* Flex to grid */
flex items-center justify-between md:grid md:grid-cols-3

/* Stack to side-by-side */
grid grid-cols-1 md:grid-cols-2 gap-6

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

## Known Inconsistencies & Migration Notes

### Priority Improvements (Aligned with Design Principles)

#### Color System Standardization
- **Current**: Mixed usage of `text-gray-*` and `text-zinc-*`
- **Target**: Standardize on zinc scale for professional consistency
- **Priority areas**: MDX components, image captions, blockquotes
- **Accessibility**: Ensure all combinations meet WCAG AA (4.5:1) contrast

#### Typography Consistency
- **H1 Pattern**: Standardize `tracking-tight` usage across all page titles
- **Dark Mode**: Establish consistent `text-zinc-100` vs `text-zinc-200` usage
- **Font Weight**: Clarify `font-bold` vs `font-semibold` hierarchy
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

This style guide serves as the definitive reference for creating a professional website that showcases technical expertise while building thought leadership authority. Each pattern reflects the core principle that **design decisions should reinforce technical credibility** through:

1. **Clean Execution**: Professional implementation over flashy visuals
2. **Performance Excellence**: Technical best practices in every component
3. **Accessibility First**: Inclusive design demonstrating engineering thoroughness
4. **Content-Driven**: Every element supports the narrative of problem-solving expertise
5. **Continuous Optimization**: Regular updates maintaining relevance and technical accuracy

Priority should be given to migrating legacy patterns and implementing missing accessibility features to meet 2025 professional standards.