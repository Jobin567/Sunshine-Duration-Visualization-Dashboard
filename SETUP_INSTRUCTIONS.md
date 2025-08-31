# Setup Instructions

## Node.js v22.19.0 Compatibility ✅

This project is fully compatible with Node.js v22.19.0. All dependencies and configurations have been verified for Node.js v22.

## Prerequisites:
- Node.js v18.0.0 or higher (recommended: v22.19.0)
- npm v8.0.0 or higher

## Quick Compatibility Check:
```bash
node verify-node-compatibility.js
```

## Steps to run your Weather Dashboard:

1. **Stop the current development server** (if running)
   - Press `Ctrl + C` in the terminal

2. **Install the updated dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server again**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to:
   ```
   http://localhost:3000
   ```

## What was fixed:

- ✅ Added missing dependencies with correct versions to `package.json`
- ✅ Updated PostCSS configuration for Tailwind CSS v4
- ✅ Fixed all shadcn/ui component imports to use standard npm syntax
- ✅ Added `@tailwindcss/postcss` plugin for proper Tailwind CSS v4 support

## If you still encounter issues:

1. **Clear npm cache**:
   ```bash
   npm cache clean --force
   ```

2. **Delete node_modules and reinstall**:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Restart your development server**:
   ```bash
   npm run dev
   ```

Your weather dashboard should now run without any dependency or configuration errors!