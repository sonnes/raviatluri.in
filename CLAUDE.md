# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Package Manager

This project uses **Bun** as the package manager (specified in `.cursorrules`). Use `bun` instead of `npm` for all package management tasks.

## Development Commands

- `bun dev` - Start development server
- `bun run build` - Build for production
- `bun start` - Start production server
- `bun run lint` - Run ESLint

## Architecture Overview

This is a **Next.js 15** personal website/blog built with:

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4
- **Content**: MDX articles with frontmatter
- **Typography**: Noto Sans and Noto Sans Mono fonts
- **Analytics**: Vercel Analytics
- **Special Features**:
  - Abacus dictation tool (password-protected at `/abacus`)
  - AI integrations (Google GenAI, ElevenLabs)

### Key Directory Structure

- `app/` - Next.js App Router pages and layouts
- `components/` - Reusable React components
- `content/` - Article management and MDX content
  - `content/articles/` - Published MDX articles
  - `content/drafts/` - Draft articles
- `public/` - Static assets (images, videos)

### Content Management

Articles are managed through:

- `content/articles.ts` - Article loading and processing logic
- Articles use frontmatter with: `title`, `date`, `description`, `tags`, `image?`
- MDX components defined in `components/mdx.tsx` with custom styling
- Syntax highlighting via `react-syntax-highlighter` with VS Code Dark Plus theme

### Special Features

- **Abacus Tool** (`app/abacus/`): Password-protected dictation tool using Google GenAI and ElevenLabs TTS
- **Custom MDX Components**: Enhanced code blocks, images, videos, tables
- **Photo Gallery**: Static photo management system
- **SEO**: Comprehensive metadata, robots.txt, sitemap generation

### Component Patterns

- Uses `clsx` for conditional styling
- Headless UI components for interactive elements
- Custom container component for consistent layouts
- Icon system using Heroicons

## Styling Conventions

### Color Palette

- **Primary Brand**: `text-red-500`, `hover:text-red-500` for links and accents
- **Text Colors**:
  - Primary: `text-zinc-800` (dark), `text-zinc-200` (dark mode)
  - Secondary: `text-zinc-600` (descriptions), `text-zinc-400` (meta)
  - Muted: `text-zinc-500`
- **Backgrounds**:
  - Main: `bg-white`, `dark:bg-zinc-900`
  - Cards/Hovers: `bg-zinc-50`, `dark:bg-zinc-800`
  - Headers: `bg-white/75` with backdrop blur
- **Borders**: `border-zinc-200`, `dark:border-zinc-700`
- **Interactive States**: Use red-500 for hover states on interactive elements

## Visual Development

### Design Principles

- Comprehensive design checklist in `/context/design-principles.md`
- Brand style guide in `/context/style-guide.md`
- When making visual (front-end, UI/UX) changes, always refer to these files for guidance

### Quick Visual Check

IMMEDIATELY after implementing any front-end change:

1. **Identify what changed** - Review the modified components/pages
2. **Navigate to affected pages** - Use `mcp__playwright__browser_navigate` to visit each changed view
3. **Verify design compliance** - Compare against `/context/design-principles.md` and `/context/style-guide.md`
4. **Validate feature implementation** - Ensure the change fulfills the user's specific request
5. **Check acceptance criteria** - Review any provided context files or requirements
6. **Capture evidence** - Take full page screenshot at desktop viewport (1440px) of each changed view
7. **Check for errors** - Run `mcp__playwright__browser_console_messages`

This verification ensures changes meet design standards and user requirements.

### Comprehensive Design Review

Invoke the `@agent-design-review` subagent for thorough design validation when:

- Completing significant UI/UX features
- Before finalizing PRs with visual changes
- Needing comprehensive accessibility and responsiveness testing
