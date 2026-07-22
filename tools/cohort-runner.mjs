#!/usr/bin/env node
// Runs a deterministic synthetic cohort and computes KPIs.
// Usage: node tools/cohort-runner.mjs --app <app-id> --seed <int> [--count <int>] [--output <dir>]
//
// --app      app-id (video-storefront | sticker-storefront | nft-storefront) — loads the app's spec funnel
// --seed     integer seed (must match contracts/cohort/seeds.json primary seed for baseline/retest)
// --count    user count (default from spec, fallback 200)
// --output   directory to write the cohort result (default: apps/<app>/proof/cohort-<timestamp>)

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mulberry32 } from '../packages/commerce-core/rng.mjs';
import { computeKPIs } from '../packages/commerce-core/kpi.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

function parseArgs(argv) {
  const a = {};
  for (let i = 0; i < argv.length - 1; i++) {
    if (argv[i].startsWith('--')) a[argv[i].slice(2)] = argv[i + 1];
  }
  return a;
}

const args  = parseArgs(process.argv.slice(2));
const appId = args.app;

if (!appId) {
  console.error('usage: cohort-runner.mjs --app <app-id> --seed <int> [--count <int>] [--output <dir>]');
  process.exitCode = 1;
  process.exit();
}

// Load the app spec for its funnel definition
const specPath = path.join(ROOT, `contracts/specs/${appId}.spec.json`);
if (!existsSync(specPath)) {
  console.error(`ERROR: spec not found: ${specPath}`);
  process.exitCode = 1;
  process.exit();
}
const spec = JSON.parse(readFileSync(specPath, 'utf8'));
const funnel = spec.kpi_assumptions?.funnel;
if (!Array.isArray(funnel) || funnel.length === 0) {
  console.error(`ERROR: spec ${appId} has no kpi_assumptions.funnel`);
  process.exitCode = 1;
  process.exit();
}

// Load frozen seeds for validation
const seedsContract = JSON.parse(readFileSync(path.join(ROOT, 'contracts/cohort/seeds.json'), 'utf8'));
const frozentPrimarySeed = seedsContract.seeds.primary.seed;

const seed  = parseInt(args.seed  ?? String(frozentPrimarySeed), 10);
const count = parseInt(args.count ?? String(spec.kpi_assumptions?.baseline_cohort?.user_count ?? 200), 10);

if (isNaN(seed) || isNaN(count) || count < 1) {
  console.error('ERROR: --seed must be an integer; --count must be a positive integer');
  process.exitCode = 1;
  process.exit();
}

if (seed !== frozentPrimarySeed) {
  console.warn(`WARN: seed ${seed} differs from frozen primary seed ${frozentPrimarySeed}. This is only valid for explicit experiments. For baseline and retest, use seed ${frozentPrimarySeed}.`);
}

// Run the cohort
const rand = mulberry32(seed);
const events = [];
const BASE_TS = 1_700_000_000_000;

// Pick a representative catalog item for the app
const catalogItems = spec.catalog?.example_items ?? [];
const defaultItem = catalogItems[0] ?? { id: 'item-001', price_cents: 999 };

for (let uid = 0; uid < count; uid++) {
  let active = true;
  const userId = `u${String(uid).padStart(6, '0')}`;
  // Pick item (cycle through catalog for variety)
  const item = catalogItems.length > 0 ? catalogItems[uid % catalogItems.length] : defaultItem;

  for (const step of funnel) {
    if (!active) break;
    if (rand() <= step.prob) {
      const ts = new Date(BASE_TS + uid * 60_000 + events.length * 1000).toISOString();
      const ev = { user_id: userId, event: step.event, ts, item_id: item.id };
      if (step.event === 'convert') ev.amount_cents = item.price_cents;
      if (step.event === 'refund')  ev.amount_cents = item.price_cents;
      events.push(ev);
    } else {
      active = false;
    }
  }
}

const kpis = computeKPIs(events);

const result = {
  schema: 'weave-v5/cohort/v1',
  app_id: appId,
  seed,
  user_count: count,
  event_count: events.length,
  generated_at: new Date().toISOString(),
  kpis,
  events,
};

const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
const defaultOut = path.join(ROOT, `apps/${appId}/proof/cohort-${timestamp}`);
const outDir = args.output ? path.resolve(args.output) : defaultOut;
mkdirSync(outDir, { recursive: true });
const outFile = path.join(outDir, 'cohort-result.json');
writeFileSync(outFile, JSON.stringify(result, null, 2));

console.log(`cohort complete: ${appId} seed=${seed} users=${count} events=${events.length}`);
console.log(`  conversion_rate : ${(kpis.conversion_rate * 100).toFixed(1)}%`);
console.log(`  aov             : $${kpis.aov.toFixed(2)}`);
console.log(`  refund_rate     : ${(kpis.refund_rate * 100).toFixed(1)}%`);
console.log(`  guardrail_breach: ${kpis.guardrail_breach}`);
console.log(`→ ${outFile}`);
