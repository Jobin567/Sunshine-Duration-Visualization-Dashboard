#!/usr/bin/env node

/**
 * Node.js v22.19.0 Compatibility Verification Script
 * Run this script to verify your environment is ready for the weather dashboard
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying Node.js v22.19.0 compatibility...\n');

// Check Node.js version
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);

console.log(`📋 Environment Check:`);
console.log(`   Node.js version: ${nodeVersion}`);
console.log(`   Platform: ${process.platform}`);
console.log(`   Architecture: ${process.arch}`);

if (majorVersion >= 18) {
  console.log('✅ Node.js version is compatible (>=18.0.0)');
} else {
  console.log('❌ Node.js version is too old. Please upgrade to v18 or higher.');
  process.exit(1);
}

// Check if package.json exists
if (fs.existsSync('package.json')) {
  console.log('✅ package.json found');
  
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    
    // Check engine requirements
    if (packageJson.engines && packageJson.engines.node) {
      console.log(`✅ Node.js engine requirement: ${packageJson.engines.node}`);
    }
    
    // Check for ES modules
    if (packageJson.type === 'module') {
      console.log('✅ ES modules configured');
    }
    
    console.log('✅ Package configuration looks good');
  } catch (error) {
    console.log('❌ Error reading package.json:', error.message);
    process.exit(1);
  }
} else {
  console.log('❌ package.json not found');
  process.exit(1);
}

// Check for key configuration files
const requiredFiles = [
  'vite.config.ts',
  'tsconfig.json',
  'postcss.config.js',
  'tailwind.config.ts'
];

console.log('\n📁 Configuration Files:');
for (const file of requiredFiles) {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} missing`);
  }
}

// Check if node_modules exists
if (fs.existsSync('node_modules')) {
  console.log('✅ node_modules directory exists');
} else {
  console.log('⚠️  node_modules not found - run "npm install" first');
}

console.log('\n🎉 Node.js v22.19.0 compatibility check complete!');
console.log('\n📝 Next steps:');
console.log('   1. Run: npm install');
console.log('   2. Run: npm run dev');
console.log('   3. Open: http://localhost:3000');
console.log('\n💡 Note: If you encounter dependency conflicts:');
console.log('   - Try: npm install --legacy-peer-deps');
console.log('   - Or: npm install --force (last resort)');