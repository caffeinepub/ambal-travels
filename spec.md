# Ambal Travels - PWA (Progressive Web App)

## Current State
Fully functional React web app with Home, Services, About Us, Contact, Admin Login, and Admin Dashboard pages. Mobile-responsive design with booking forms.

## Requested Changes (Diff)

### Add
- Web App Manifest (`manifest.json`) with app name, icons, theme color, display mode
- Service worker for offline support and installability
- PWA meta tags in index.html (theme-color, apple-touch-icon, mobile-web-app-capable)
- App icon (512x512 and 192x192) for home screen
- `vite-plugin-pwa` or manual service worker registration

### Modify
- `index.html` to include manifest link and PWA meta tags
- `vite.config.js` to register PWA plugin if used
- Main entry point to register service worker

### Remove
- Nothing removed

## Implementation Plan
1. Add manifest.json to public folder with Ambal Travels branding
2. Add PWA meta tags to index.html
3. Add service worker registration in main.tsx
4. Create a simple service worker (sw.js) that caches key assets
5. Use generated icon for home screen
