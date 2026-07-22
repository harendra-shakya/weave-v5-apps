#!/usr/bin/env node
// Seals an app directory: walks all files, computes sha256 checksums, writes seal-manifest.json.
// Usage: node tools/seal-app.mjs --app <app-id>
// Exits 0 on success, 1 on failure.

import { readdirSync, statSync, readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

function sha256(filePath) {
  return createHash('sha256').update(readFileSync(filePath)).digest('hex');
}

// Files and directories to exclude from the seal
const EXCLUDE = new Set(['seal-manifest.json', '.next', 'node_modules', '.git']);

function walkDir(dir, base) {
  const entries = [];
  for (const name of readdirSync(dir).sort()) {
    if (EXCLUDE.has(name)) continue;
    const full = path.join(dir, name);
    const rel  = path.relative(base, full).replace(/\\/g, '/');
    if (statSync(full).isDirectory()) {
      entries.push(...walkDir(full, base));
    } else {
      entries.push({ path: rel, sha256: sha256(full) });
    }
  }
  return entries;
}

const args = Object.fromEntries(
  process.argv.slice(2).map((a, i, arr) => a.startsWith('--') ? [a.slice(2), arr[i + 1]] : [])
    .filter(([k]) => k)
);

const appId = args.app;
if (!appId) {
  console.error('usage: seal-app.mjs --app <app-id>');
  process.exitCode = 1;
  process.exit();
}

const appDir = path.join(ROOT, `apps/${appId}`);
let gitSha;
try {
  gitSha = execFileSync('git', ['-C', ROOT, 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
} catch {
  gitSha = 'unknown';
}

const files = walkDir(appDir, appDir);
const manifest = {
  schema: 'weave-v5/artifact-manifest/v1',
  app_id: appId,
  sealed_at: new Date().toISOString(),
  git_sha: gitSha,
  file_count: files.length,
  files,
};

const outPath = path.join(appDir, 'proof', 'seal-manifest.json');
writeFileSync(outPath, JSON.stringify(manifest, null, 2));
console.log(`sealed ${appId}: ${files.length} files @ ${gitSha.slice(0, 8)} → ${path.relative(ROOT, outPath)}`);
