@echo off
echo ===== Weather Dashboard NPM Fix Script =====
echo This script will fix NPM installation issues
echo.

echo Step 1: Clearing NPM cache...
npm cache clean --force

echo.
echo Step 2: Removing node_modules and package-lock.json...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json

echo.
echo Step 3: Verifying npm registry...
npm config get registry

echo.
echo Step 4: Setting npm registry to default...
npm config set registry https://registry.npmjs.org/

echo.
echo Step 5: Attempting installation with legacy-peer-deps...
npm install --legacy-peer-deps

echo.
if %errorlevel% neq 0 (
    echo Installation with --legacy-peer-deps failed, trying with --force...
    npm install --force
)

if %errorlevel% neq 0 (
    echo Both methods failed. Trying basic install...
    npm install
)

echo.
echo ===== NPM Installation Fix Complete =====
echo If successful, you can now run: npm run dev
pause