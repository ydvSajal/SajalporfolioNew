#!/usr/bin/env node

/**
 * Quick setup script for backend server
 * Run: node server/setup.js
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = join(__dirname, '.env');
const envExamplePath = join(__dirname, '.env.example');

console.log('🚀 Backend Setup\n');

if (existsSync(envPath)) {
  console.log('✅ .env file already exists');
  console.log('📝 Edit server/.env to update your configuration\n');
} else {
  console.log('📝 Creating .env file from template...');
  const template = readFileSync(envExamplePath, 'utf-8');
  writeFileSync(envPath, template);
  console.log('✅ Created server/.env');
  console.log('⚠️  IMPORTANT: Edit server/.env and fill in your actual values!\n');
}

console.log('📦 Installing dependencies...');
console.log('   Run: cd server && npm install\n');

console.log('🔧 Development commands:');
console.log('   npm run dev      - Start dev server with hot reload');
console.log('   npm run build    - Build for production');
console.log('   npm start        - Start production server\n');

console.log('🌐 Deployment options:');
console.log('   1. Railway (recommended) - https://railway.app');
console.log('   2. Render - https://render.com');
console.log('   3. Fly.io - https://fly.io');
console.log('\n📖 See DEPLOYMENT.md for detailed instructions\n');

console.log('✨ Ready to go!');
