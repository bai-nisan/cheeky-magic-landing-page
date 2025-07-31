# Magic Landing Page - Deployment Guide

## Overview
This guide documents how to deploy the Magic Landing Page to Vercel production.

## Live Deployment
**Production URL:** https://magic-landing-page-o0xlk6njx-nisan-baiacademys-projects.vercel.app

## Prerequisites
- Node.js (v18 or higher)
- npm
- Vercel CLI
- Vercel account

## Local Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Build Locally
```bash
npm run build
```

### 3. Run Development Server
```bash
npm run dev
```

## Deployment Process

### 1. Install Vercel CLI
```bash
npm install -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```
Select "Continue with GitHub" and authenticate.

### 3. Deploy to Production
```bash
vercel --prod
```

## Dependency Updates Made for React 19 Compatibility

The following dependencies were updated to support React 19:

### Updated Packages
- `lucide-react`: `^0.358.0` → `^0.534.0`
- `next-themes`: `^0.3.0` → `^0.4.6`

### Fixed Imports
- Updated `components/theme-provider.tsx` to import `ThemeProviderProps` directly from `"next-themes"` instead of `"next-themes/dist/types"`

### Removed Files
- Deleted `pnpm-lock.yaml` to avoid package manager conflicts

## Build Configuration

### Project Settings (Auto-detected by Vercel)
- **Framework:** Next.js
- **Build Command:** `next build`
- **Development Command:** `next dev --port $PORT`
- **Install Command:** `npm install`
- **Output Directory:** Next.js default

## Troubleshooting

### Common Issues

#### Peer Dependency Conflicts
If you encounter peer dependency issues:
1. Check React version compatibility
2. Update conflicting packages to versions that support React 19
3. Use `npm install --legacy-peer-deps` as a fallback

#### Package Manager Conflicts
- Ensure only one lock file exists (`package-lock.json` for npm)
- Remove `pnpm-lock.yaml` if present

#### TypeScript Import Errors
- Check import paths for updated package versions
- Import types directly from main package exports when possible

## Project Structure
```
magic-landing-page/
├── app/                    # Next.js app directory
├── components/            # React components
│   ├── landing/          # Landing page sections
│   ├── magicui/          # Magic UI components
│   └── theme-provider.tsx # Theme configuration
├── lib/                  # Utility functions
├── public/               # Static assets
├── package.json          # Dependencies
└── next.config.mjs       # Next.js configuration
```

## Environment Variables
No environment variables are required for basic deployment.

## Performance Notes
- Build generates static pages for optimal performance
- Image optimization warnings present but don't affect functionality
- Consider using Next.js `Image` component for better performance

## Monitoring
- View deployment logs: `vercel logs <deployment-url>`
- Check build status in Vercel dashboard
- Monitor performance through Vercel Analytics

## Contact
For deployment issues, check the Vercel documentation or contact the development team.