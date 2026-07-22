#!/usr/bin/env node
// Validates all contracts in the weave-v5-apps workspace.
// Checks: schemas are valid JSON, specs conform, specs are distinct, negative contracts are complete, seeds + KPI exist.
// Exits 0 if all pass, 1 if any fail.
// Usage: node tools/validate-contracts.mjs [--verbose]

import { readFileSync, existsSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const verbose = process.argv.includes('--verbose');

const errors = [];
const warnings = [];

function fail(msg) { errors.push(msg); }
function warn(msg)  { warnings.push(msg); }
function log(msg)   { if (verbose) console.log(`  ${msg}`); }

function readJSON(filePath) {
  if (!existsSync(filePath)) { fail(`missing file: ${path.relative(ROOT, filePath)}`); return null; }
  try { return JSON.parse(readFileSync(filePath, 'utf8')); }
  catch { fail(`invalid JSON: ${path.relative(ROOT, filePath)}`); return null; }
}

// -- 1. Schemas exist and are valid JSON --------------------------------------
console.log('1. Checking schemas...');
const SCHEMA_DIR = path.join(ROOT, 'contracts/schemas');
const REQUIRED_SCHEMAS = [
  'catalog.schema.json', 'cart.schema.json', 'checkout.schema.json', 'order.schema.json',
  'fulfillment.schema.json', 'cancellation-refund.schema.json', 'event.schema.json',
  'cohort.schema.json', 'artifact-manifest.schema.json',
];
for (const name of REQUIRED_SCHEMAS) {
  const s = readJSON(path.join(SCHEMA_DIR, name));
  if (s) {
    if (!s.$schema) warn(`schema ${name} missing $schema declaration`);
    if (!s.$id)     fail(`schema ${name} missing $id`);
    if (!s.type)    fail(`schema ${name} missing type`);
    log(`schema OK: ${name}`);
  }
}

// -- 2. Per-app specs exist and conform to expected shape ---------------------
console.log('2. Checking app specs...');
const SPEC_DIR = path.join(ROOT, 'contracts/specs');
const REQUIRED_SPECS = ['video-storefront.spec.json', 'sticker-storefront.spec.json', 'nft-storefront.spec.json'];
const specs = {};
for (const name of REQUIRED_SPECS) {
  const spec = readJSON(path.join(SPEC_DIR, name));
  if (!spec) continue;
  specs[spec.app_id] = spec;
  if (!spec.app_id)        fail(`spec ${name} missing app_id`);
  if (!spec.brand)         fail(`spec ${name} missing brand`);
  if (!spec.persona)       fail(`spec ${name} missing persona`);
  if (!spec.problem)       fail(`spec ${name} missing problem`);
  if (!spec.catalog)       fail(`spec ${name} missing catalog`);
  if (!spec.architecture)  fail(`spec ${name} missing architecture`);
  if (!spec.kpi_assumptions) fail(`spec ${name} missing kpi_assumptions`);
  if (!spec.nonclaims)     fail(`spec ${name} missing nonclaims`);
  log(`spec OK: ${name} (brand: ${spec.brand})`);
}

// -- 3. Three specs are distinct (not a reskin) --------------------------------
console.log('3. Checking spec distinctness...');
const specList = Object.values(specs);
if (specList.length === 3) {
  const brands   = specList.map((s) => s.brand);
  const personas = specList.map((s) => s.persona?.name);
  const heroCopy = specList.map((s) => s.hero_line);
  const domains  = specList.map((s) => s.catalog?.domain);

  if (new Set(brands).size < 3)   fail(`specs: duplicate brand names — ${brands.join(', ')}`);
  if (new Set(personas).size < 3) fail(`specs: duplicate persona names — ${personas.join(', ')}`);
  if (new Set(heroCopy).size < 3) fail(`specs: duplicate hero lines — ${heroCopy.join(', ')}`);
  if (new Set(domains).size < 3)  fail(`specs: duplicate catalog domains — ${domains.join(', ')}`);
  log('distinctness OK: brands, personas, hero lines, and catalog domains are all different');
} else {
  warn(`expected 3 specs, found ${specList.length}`);
}

// -- 4. Cohort seeds exist and are valid --------------------------------------
console.log('4. Checking cohort seeds...');
const seeds = readJSON(path.join(ROOT, 'contracts/cohort/seeds.json'));
if (seeds) {
  if (!seeds.seeds?.primary) fail('seeds.json missing seeds.primary');
  else {
    const p = seeds.seeds.primary;
    if (typeof p.seed !== 'number')      fail('seeds.primary.seed must be a number');
    if (typeof p.user_count !== 'number') fail('seeds.primary.user_count must be a number');
    log(`seeds OK: primary seed=${p.seed}, user_count=${p.user_count}`);
  }
}

// -- 5. KPI formulas exist and are valid --------------------------------------
console.log('5. Checking KPI formulas...');
const kpi = readJSON(path.join(ROOT, 'contracts/kpi/formulas.json'));
if (kpi) {
  const required = ['conversion_rate', 'aov', 'refund_rate'];
  for (const k of required) {
    if (!kpi.kpis?.[k]) fail(`kpi/formulas.json missing kpi: ${k}`);
    else log(`kpi OK: ${k}`);
  }
  if (!kpi.guardrails?.refund_rate) fail('kpi/formulas.json missing guardrails.refund_rate');
}

// -- 6. State-transitions contract -------------------------------------------
console.log('6. Checking state-transitions...');
const st = readJSON(path.join(ROOT, 'contracts/state-transitions.json'));
if (st) {
  if (!Array.isArray(st.states))      fail('state-transitions.json missing states array');
  if (!st.initial)                    fail('state-transitions.json missing initial state');
  if (!Array.isArray(st.terminal))    fail('state-transitions.json missing terminal array');
  if (!Array.isArray(st.transitions)) fail('state-transitions.json missing transitions array');
  if (!st.truthfulness_invariant)     fail('state-transitions.json missing truthfulness_invariant');
  if (!st.idempotency_invariant)      fail('state-transitions.json missing idempotency_invariant');
  // All transition from/to states must be in the states array
  for (const t of (st.transitions ?? [])) {
    if (!st.states.includes(t.from)) fail(`state-transitions: transition from unknown state "${t.from}"`);
    if (!st.states.includes(t.to))   fail(`state-transitions: transition to unknown state "${t.to}"`);
  }
  log(`state-transitions OK: ${st.states.length} states, ${st.transitions.length} transitions`);
}

// -- 7. Negative contracts exist and are valid --------------------------------
console.log('7. Checking negative contracts...');
const NFT_NEG  = readJSON(path.join(ROOT, 'contracts/negative/nft-chainless.json'));
const SAFE_NEG = readJSON(path.join(ROOT, 'contracts/negative/public-safe-assets.json'));

if (NFT_NEG) {
  if (!NFT_NEG.forbidden_terms?.length)      fail('nft-chainless.json missing forbidden_terms');
  if (!NFT_NEG.known_false_positives?.length) fail('nft-chainless.json missing known_false_positives — scanner will incorrectly flag brand nonclaim copy without this');
  if (!NFT_NEG.required_nonclaims?.length)   fail('nft-chainless.json missing required_nonclaims');
  log(`nft-chainless OK: ${NFT_NEG.forbidden_terms.length} forbidden terms, ${NFT_NEG.known_false_positives.length} false-positive allowances`);
}
if (SAFE_NEG) {
  if (!SAFE_NEG.rules?.length)  fail('public-safe-assets.json missing rules');
  if (!SAFE_NEG.applies_to)     fail('public-safe-assets.json missing applies_to');
  log('public-safe-assets OK');
}

// -- 8. freeze-digests exists -------------------------------------------------
console.log('8. Checking freeze-digests...');
const fd = readJSON(path.join(ROOT, 'contracts/freeze-digests.json'));
if (fd) {
  if (!fd.foundation_frozen_at_commit) fail('freeze-digests.json missing foundation_frozen_at_commit — must be a real SHA');
  for (const appId of ['video-storefront', 'sticker-storefront', 'nft-storefront']) {
    if (!fd.apps?.[appId]) fail(`freeze-digests.json missing entry for ${appId}`);
  }
  log(`freeze-digests OK: foundation frozen at ${fd.foundation_frozen_at_commit?.slice(0, 8)}`);
}

// -- 9. apps/registry.json (may not exist yet — warn only) -------------------
console.log('9. Checking apps registry...');
const registry = readJSON(path.join(ROOT, 'apps/registry.json'));
if (!registry) {
  warn('apps/registry.json not found — will be created when first app is scaffolded');
} else {
  log(`registry OK: ${Object.keys(registry.apps ?? {}).length} apps registered`);
}

// -- Results ------------------------------------------------------------------
console.log('');
for (const w of warnings) console.warn(`  WARN  ${w}`);
if (errors.length === 0) {
  console.log(`OK — all contracts valid (${warnings.length} warning(s))`);
} else {
  console.error(`FAIL — ${errors.length} error(s):`);
  for (const e of errors) console.error(`  ERROR ${e}`);
  process.exitCode = 1;
}
