# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website for Pei (Rickie) Lin, hosted on GitHub Pages. It's a static website built with vanilla HTML, CSS, and JavaScript - no build tools or frameworks required.

## Development Commands

Now using pure CSS for styling:
- **Run locally**: Open any HTML file directly in a browser or use `python -m http.server 8000`
- **Development**: `npm run dev` - starts local development server
- **Deploy**: Push changes to the main branch - GitHub Pages automatically deploys
- **Test preloader**: Run `resetPreloader()` in browser console to test the Minecraft-style preloader again

## Architecture & Key Components

### Page Structure
- **index.html**: Homepage with two-column layout (navigation + content)
- **about.html**: Personal information and skills
- **project.html**: Portfolio projects (currently empty implementation)
- **consulting.html**: News feed and interests page
- **contact.html**: Contact form (frontend only - no backend)

### JavaScript Functionality
- **preloader.js**: Minecraft-style loading animation (shows only on first visit using localStorage)
- **news-feed.js**: Displays hardcoded news items - would need API integration for dynamic content
- **contact.js**: Form validation only - actual submission not implemented
- **access-control.js**: Client-side page restriction (redirects from /project.html if accessed directly)
- **project.js**: Project filtering with optional Isotope library support

### Styling Approach
- Modern Apple-inspired design with custom CSS
- Glass morphism effects and liquid animations
- Responsive two-column layout
- Unified CSS in styles.css with component-based classes
- Dark mode support and smooth animations

## Important Notes

1. **Pure CSS Styling**: No build tools required - uses custom CSS with modern features
2. **Styling Approach**: Modern Apple-inspired design with glass morphism and liquid animations
3. **Performance**: Includes optimized preloader with requestAnimationFrame, lazy loading, and intersection observers
4. **Error Handling**: Robust error handling in utils.js with fallbacks for older browsers
5. **Contact Form**: Currently shows alert only - needs backend implementation for actual functionality
6. **News Feed**: Data is hardcoded in news-feed.js - replace with API calls for dynamic content
7. **Browser Compatibility**: Modern JavaScript with graceful degradation and polyfills