import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

function readJSON(rel) {
  const fp = path.join(ROOT, rel);
  assert.ok(existsSync(fp), `file must exist: ${rel}`);
  return JSON.parse(readFileSync(fp, 'utf8'));
}

// -- schemas ------------------------------------------------------------------

test('schemas: all 9 required schemas exist and are valid JSON', () => {
  const names = [
    'catalog.schema.json', 'cart.schema.json', 'checkout.schema.json', 'order.schema.json',
    'fulfillment.schema.json', 'cancellation-refund.schema.json', 'event.schema.json',
    'cohort.schema.json', 'artifact-manifest.schema.json',
  ];
  for (const name of names) {
    const s = readJSON(`contracts/schemas/${name}`);
    assert.ok(s.$id,   `${name} must have $id`);
    assert.ok(s.type,  `${name} must have type`);
  }
});

// -- specs --------------------------------------------------------------------

test('specs: all three app specs exist', () => {
  for (const name of ['video-storefront', 'sticker-storefront', 'nft-storefront']) {
    readJSON(`contracts/specs/${name}.spec.json`);
  }
});

test('specs: each spec has required top-level fields', () => {
  const required = ['app_id', 'brand', 'persona', 'problem', 'catalog', 'architecture', 'kpi_assumptions', 'nonclaims'];
  for (const name of ['video-storefront', 'sticker-storefront', 'nft-storefront']) {
    const spec = readJSON(`contracts/specs/${name}.spec.json`);
    for (const f of required) {
      assert.ok(spec[f] != null, `spec ${name} missing field: ${f}`);
    }
  }
});

test('specs: three specs are distinct (brand, persona, hero_line, catalog domain)', () => {
  const ids = ['video-storefront', 'sticker-storefront', 'nft-storefront'];
  const specs = ids.map((id) => readJSON(`contracts/specs/${id}.spec.json`));

  const brands   = specs.map((s) => s.brand);
  const personas = specs.map((s) => s.persona.name);
  const heroes   = specs.map((s) => s.hero_line);
  const domains  = specs.map((s) => s.catalog.domain);

  assert.equal(new Set(brands).size,   3, `brands must be distinct: ${brands}`);
  assert.equal(new Set(personas).size, 3, `persona names must be distinct: ${personas}`);
  assert.equal(new Set(heroes).size,   3, `hero lines must be distinct: ${heroes}`);
  assert.equal(new Set(domains).size,  3, `catalog domains must be distinct: ${domains}`);
});

test('specs: each spec has at least one catalog example item', () => {
  for (const name of ['video-storefront', 'sticker-storefront', 'nft-storefront']) {
    const spec = readJSON(`contracts/specs/${name}.spec.json`);
    assert.ok(Array.isArray(spec.catalog.example_items) && spec.catalog.example_items.length > 0,
      `${name}: catalog.example_items must be a non-empty array`);
  }
});

test('specs: each catalog example item has id, title, price_cents, currency', () => {
  for (const name of ['video-storefront', 'sticker-storefront', 'nft-storefront']) {
    const spec = readJSON(`contracts/specs/${name}.spec.json`);
    for (const item of spec.catalog.example_items) {
      assert.ok(item.id,                          `${name} item missing id`);
      assert.ok(item.title,                       `${name} item missing title`);
      assert.equal(typeof item.price_cents, 'number', `${name} item price_cents must be a number`);
      assert.equal(item.currency, 'USD',          `${name} item currency must be USD`);
    }
  }
});

// -- seeds --------------------------------------------------------------------

test('seeds: primary seed exists and is numeric', () => {
  const seeds = readJSON('contracts/cohort/seeds.json');
  assert.ok(seeds.seeds?.primary, 'seeds.primary must exist');
  assert.equal(typeof seeds.seeds.primary.seed, 'number');
  assert.equal(typeof seeds.seeds.primary.user_count, 'number');
  assert.ok(seeds.seeds.primary.user_count > 0);
});

test('seeds: governance note is present', () => {
  const seeds = readJSON('contracts/cohort/seeds.json');
  assert.ok(seeds.governance, 'seeds.json must include a governance note');
});

// -- KPI formulas -------------------------------------------------------------

test('kpi: required formulas exist', () => {
  const kpi = readJSON('contracts/kpi/formulas.json');
  for (const name of ['conversion_rate', 'aov', 'refund_rate']) {
    assert.ok(kpi.kpis?.[name], `kpi formulas missing: ${name}`);
  }
});

test('kpi: refund_rate guardrail has max and action', () => {
  const kpi = readJSON('contracts/kpi/formulas.json');
  const rr = kpi.guardrails?.refund_rate;
  assert.ok(rr, 'guardrails.refund_rate must exist');
  assert.ok(typeof rr.max === 'number', 'guardrails.refund_rate.max must be a number');
  assert.ok(rr.action, 'guardrails.refund_rate.action must be defined');
});

// -- state-transitions --------------------------------------------------------

test('state-transitions: all fields present', () => {
  const st = readJSON('contracts/state-transitions.json');
  assert.ok(Array.isArray(st.states));
  assert.ok(st.initial);
  assert.ok(Array.isArray(st.terminal));
  assert.ok(Array.isArray(st.transitions));
  assert.ok(st.truthfulness_invariant);
  assert.ok(st.idempotency_invariant);
});

test('state-transitions: every transition references valid states', () => {
  const st = readJSON('contracts/state-transitions.json');
  for (const t of st.transitions) {
    assert.ok(st.states.includes(t.from), `transition from unknown state: "${t.from}"`);
    assert.ok(st.states.includes(t.to),   `transition to unknown state: "${t.to}"`);
  }
});

test('state-transitions: terminal states have no outbound transitions', () => {
  const st = readJSON('contracts/state-transitions.json');
  for (const terminal of st.terminal) {
    const outbound = st.transitions.filter((t) => t.from === terminal);
    assert.equal(outbound.length, 0, `terminal state "${terminal}" must have no outbound transitions`);
  }
});

// -- negative contracts -------------------------------------------------------

test('negative: nft-chainless contract exists with all required fields', () => {
  const neg = readJSON('contracts/negative/nft-chainless.json');
  assert.ok(Array.isArray(neg.forbidden_terms) && neg.forbidden_terms.length > 0, 'forbidden_terms required');
  assert.ok(Array.isArray(neg.known_false_positives) && neg.known_false_positives.length > 0,
    'known_false_positives required — scanner must not flag brand nonclaim copy like "no wallet"');
  assert.ok(Array.isArray(neg.required_nonclaims) && neg.required_nonclaims.length > 0, 'required_nonclaims required');
});

test('negative: public-safe-assets contract exists with rules', () => {
  const neg = readJSON('contracts/negative/public-safe-assets.json');
  assert.ok(Array.isArray(neg.rules) && neg.rules.length > 0, 'rules required');
  assert.ok(neg.applies_to, 'applies_to required');
});

// -- freeze-digests -----------------------------------------------------------

test('freeze-digests: foundation SHA is present and non-empty', () => {
  const fd = readJSON('contracts/freeze-digests.json');
  assert.ok(fd.foundation_frozen_at_commit, 'foundation_frozen_at_commit must be set');
  assert.ok(fd.foundation_frozen_at_commit.length >= 7, 'SHA must be at least 7 chars');
});

test('freeze-digests: entries for all three apps', () => {
  const fd = readJSON('contracts/freeze-digests.json');
  for (const appId of ['video-storefront', 'sticker-storefront', 'nft-storefront']) {
    assert.ok(fd.apps?.[appId], `freeze-digests missing entry for ${appId}`);
  }
});

// -- validate-contracts tool --------------------------------------------------

test('validate-contracts tool: exits 0 with all contracts in place', () => {
  const result = execFileSync('node', [path.join(ROOT, 'tools/validate-contracts.mjs')], { encoding: 'utf8' });
  assert.ok(result.includes('OK'), `validate-contracts must exit OK, got: ${result}`);
});

// -- apps registry ------------------------------------------------------------

test('registry: apps/registry.json has all three apps', () => {
  const reg = readJSON('apps/registry.json');
  for (const appId of ['video-storefront', 'sticker-storefront', 'nft-storefront']) {
    assert.ok(reg.apps?.[appId], `registry missing: ${appId}`);
  }
});
