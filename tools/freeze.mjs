#!/usr/bin/env node
// Freezes the current git SHA as the baseline for an app.
// Must be called BEFORE the baseline cohort run.
// Usage: node tools/freeze.mjs --app <app-id>
//
// Records the current HEAD SHA in contracts/freeze-digests.json.
// After this, changing the frozen_at_commit is an OWNER_GATE.

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const digestsPath = path.join(ROOT, 'contracts/freeze-digests.json');

const args = Object.fromEntries(
  process.argv.slice(2).map((a, i, arr) => a.startsWith('--') ? [a.slice(2), arr[i + 1]] : [])
    .filter(([k]) => k)
);

const appId = args.app;
if (!appId) {
  console.error('usage: freeze.mjs --app <app-id>');
  process.exitCode = 1;
  process.exit();
}

const validApps = ['video-storefront', 'sticker-storefront', 'nft-storefront'];
if (!validApps.includes(appId)) {
  console.error(`ERROR: unknown app-id "${appId}". Valid: ${validApps.join(', ')}`);
  process.exitCode = 1;
  process.exit();
}

const digests = JSON.parse(readFileSync(digestsPath, 'utf8'));
if (digests.apps[appId].frozen_at_commit) {
  console.error(`ERROR: ${appId} is already frozen at ${digests.apps[appId].frozen_at_commit.slice(0, 8)}`);
  console.error('Changing a frozen baseline is an OWNER_GATE. Stop and surface it.');
  process.exitCode = 1;
  process.exit();
}

let sha;
try {
  sha = execFileSync('git', ['-C', ROOT, 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
} catch (e) {
  console.error(`ERROR: could not get git SHA: ${e.message}`);
  process.exitCode = 1;
  process.exit();
}

const now = new Date().toISOString();
digests.apps[appId].frozen_at_commit = sha;
digests.apps[appId].frozen_at = now;

writeFileSync(digestsPath, JSON.stringify(digests, null, 2));
console.log(`frozen: ${appId} @ ${sha.slice(0, 8)} (${now})`);
console.log('Now run the baseline cohort: node tools/cohort-runner.mjs --app ' + appId);
