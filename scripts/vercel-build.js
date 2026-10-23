const { execSync } = require('child_process');

console.log('[Build] Starting RealistisFx build pipeline...');

// 1. Always generate Prisma Client
try {
  console.log('[Build] Generating Prisma Client...');
  execSync('npx prisma generate', { stdio: 'inherit' });
} catch (err) {
  console.warn('[Build] Prisma generate warning:', err.message);
}

// 2. Detect Vercel Postgres / Neon cloud connection
const dbUrl =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_PRISMA_URL ||
  process.env.POSTGRES_URL;

if (dbUrl) {
  console.log('[Build] Cloud Database detected (Vercel Postgres)! Synchronizing schema...');
  try {
    execSync('npx prisma db push --skip-generate --accept-data-loss', {
      stdio: 'inherit',
      env: { ...process.env, DATABASE_URL: dbUrl },
    });
    console.log('[Build] Successfully synchronized database tables to Vercel Postgres!');
  } catch (err) {
    console.warn('[Build] Warning: prisma db push encountered an issue, continuing build:', err.message);
  }
} else {
  console.log('[Build] No DATABASE_URL found. Skipping schema push (standalone/local mode).');
}

// 3. Run Next.js production build
console.log('[Build] Running Next.js build...');
execSync('next build', { stdio: 'inherit' });
console.log('[Build] Next.js build finished successfully!');
