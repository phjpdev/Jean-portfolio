# Deployment Guide

This portfolio is configured to build as a static site that can be deployed to any static hosting service.

## Build Configuration

The project is configured to:
- Build to the `build/` folder
- Generate `index.html` as the entry point
- Output all static assets for deployment

## Building for Production

1. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

2. **Build the project**:
   ```bash
   npm run build
   ```

3. **Preview the build locally** (optional):
   ```bash
   npm run preview
   ```

The build output will be in the `build/` folder with `index.html` as the main file.

## Deployment Options

### Firebase Hosting

1. **Install Firebase CLI** (if not already installed):
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**:
   ```bash
   firebase login
   ```

3. **Initialize Firebase** (if not already done):
   ```bash
   firebase init hosting
   ```
   - Select your Firebase project
   - Set public directory to: `build`
   - Configure as single-page app: `Yes`
   - Set up automatic builds: `No` (or `Yes` if using CI/CD)

4. **Deploy**:
   ```bash
   npm run build
   firebase deploy --only hosting
   ```

### Netlify

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Deploy**:
   ```bash
   npm run build
   netlify deploy --prod --dir=build
   ```

### Vercel

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   npm run build
   vercel --prod
   ```

### GitHub Pages

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Push the build folder** to the `gh-pages` branch or use GitHub Actions

### Any Static Hosting

Simply upload the contents of the `build/` folder to your hosting service:
- The `build/` folder contains all necessary files
- `index.html` is the entry point
- All assets are included in the build

## Important Notes

⚠️ **API Routes**: The contact form API route (`/api/contact`) will not work in a static build. You have two options:

1. **Use a serverless function**: Deploy the API route as a serverless function (Firebase Functions, Netlify Functions, Vercel Functions, etc.)

2. **Use client-side email service**: Modify the contact form to use a client-side service like EmailJS

3. **Use Formspree**: The current Formspree setup should work, but you may need to configure it to work with your static site.

## Build Output Structure

After running `npm run build`, you'll have:
```
build/
├── index.html
├── _app/
│   ├── ...
├── assets/
│   ├── ...
└── [other static files]
```

All files in the `build/` folder are ready for deployment!

