# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a single-page HTML website for Light Work, a strategic advisory consulting service. The entire site is contained in `light-work.html` - a standalone HTML file with embedded CSS and no external dependencies beyond Google Fonts.

## Architecture

**Single-File Structure**: The project uses a self-contained architecture where all HTML, CSS, and minimal JavaScript (fade-in animations) are in one file. There is no build process, no JavaScript framework, and no package management.

**Design System**: CSS variables are defined in `:root` for consistent theming:
- `--cream`: Background color (#f5f3ee)
- `--text-dark`: Primary text (#3a3a3a)
- `--text-light`: Secondary text (#666666)
- `--accent-blue`: CTA button color (#6ba3e8)
- `--footer-dark`: Footer background (#3a3a3a)
- `--border-color`: Divider color (#d4cfc4)

**Typography**: Uses two Google Fonts:
- `Baskervville`: Serif font for headings and brand elements (italic style for h1 and taglines)
- `Inter`: Sans-serif font for body text (300/400/500 weights)

**Layout Pattern**: Content sections use a two-column grid layout (200px label + 1fr content) that collapses to single column on mobile (<768px).

## Development Workflow

**Viewing the site**: Open `light-work.html` directly in a browser. No local server or build step required.

**Making changes**: Edit `light-work.html` directly and refresh the browser to see changes.

## Key Content Sections

The page follows this structure:
1. Hero with title and intro text
2. "Work with me" section with Approach, Process, Accessibility, and Connect subsections
3. "About" section with My Story and Working Style
4. Tagline section ("Come to us cloudy")
5. Footer with social links and site navigation

When modifying content, maintain the established voice: intuitive, strategic, and focused on clarity and organizational growth.
