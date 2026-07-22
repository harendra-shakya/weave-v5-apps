import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

function readJSON(rel) {
  const fp = path.join(ROOT, rel);
  assert.ok(existsSync(fp), `file must exist: ${rel}`);
  return JSON.parse(readFileSync(fp, 'utf8'));
}

const nftNeg = readJSON('contracts/negative/nft-chainless.json');

// -- chainless scanner logic (mirrors validate-contracts scanner) -------------

function buildChainlessScanner(contract) {
  const forbidden = contract.forbidden_terms.map((t) => new RegExp(t, 'i'));
  // known_false_positives patterns are literal string patterns (not regex) to be safe
  const allowlist = contract.known_false_positives.map((fp) => fp.pattern.toLowerCase());

  return function scan(code) {
    const findings = [];
    for (const re of forbidden) {
      const match = re.exec(code);
      if (!match) continue;
      // Check if the surrounding context matches a known false positive
      const context = code.slice(Math.max(0, match.index - 40), match.index + match[0].length + 40).toLowerCase();
      const isFalsePositive = allowlist.some((allowed) => context.includes(allowed));
      if (!isFalsePositive) {
        findings.push({ term: re.source, match: match[0], context });
      }
    }
    return findings;
  };
}

const scan = buildChainlessScanner(nftNeg);

// -- boundary tests -----------------------------------------------------------

test('chainless: clean code has no findings', () => {
  const code = `
    export function addToCollection(itemId) { return { item_id: itemId }; }
    export const SHELF_KEY = 'vitrine-shelf';
  `;
  assert.deepEqual(scan(code), []);
});

test('chainless: ethers import is flagged', () => {
  const code = `import { ethers } from 'ethers';`;
  assert.ok(scan(code).length > 0, 'ethers import must be flagged');
});

test('chainless: wagmi import is flagged', () => {
  const code = `import { useAccount } from 'wagmi';`;
  assert.ok(scan(code).length > 0, 'wagmi import must be flagged');
});

test('chainless: blockchain reference is flagged', () => {
  const code = `const tx = blockchain.transfer(token);`;
  assert.ok(scan(code).length > 0, 'blockchain reference must be flagged');
});

test('chainless: brand nonclaim "no wallet" is NOT flagged (known false positive)', () => {
  const code = `<p>Own the edition. No wallet required.</p>`;
  assert.deepEqual(scan(code), [], '"no wallet" is brand copy, must not be flagged');
});

test('chainless: brand nonclaim "skip the wallet" is NOT flagged', () => {
  const code = `<h1>Own the edition. Skip the wallet.</h1>`;
  assert.deepEqual(scan(code), [], '"skip the wallet" is hero line, must not be flagged');
});

test('chainless: "no gas" nonclaim is NOT flagged', () => {
  const code = `<p>No gas fees. No speculation. Just your collection.</p>`;
  assert.deepEqual(scan(code), [], '"no gas" is brand nonclaim, must not be flagged');
});

test('chainless: "chainless" in a test file name is NOT flagged', () => {
  // The boundary name itself appears in docs, test names, and contract files — must not self-trigger
  const code = `// nft-chainless boundary test — verifies absence of forbidden surfaces`;
  assert.deepEqual(scan(code), [], '"chainless" used as boundary name must not be flagged');
});

test('chainless: actual mintNFT function IS flagged', () => {
  const code = `async function mintNFT(address, tokenId) { return contract.mint(address, tokenId); }`;
  assert.ok(scan(code).length > 0, 'mintNFT function must be flagged');
});

test('chainless: seed phrase storage IS flagged', () => {
  const code = `const mnemonic = 'abandon ability able about above absent';  // seed phrase`;
  assert.ok(scan(code).length > 0, 'seed phrase reference must be flagged');
});

test('chainless: synthetic disclaimer text does NOT trigger false positive for "synthetic collectible"', () => {
  // The footer/first-purchase nonclaim text must not itself cause a chainless flag
  const code = `<footer>Vitrine collectibles are synthetic — for the collecting experience, not real ownership.</footer>`;
  // "synthetic" is not a forbidden term in the chainless contract — it's a required nonclaim
  assert.deepEqual(scan(code), [], 'nonclaim footer text must not trigger chainless flags');
});

// -- public-safe-assets boundary tests ----------------------------------------

const safeNeg = readJSON('contracts/negative/public-safe-assets.json');

function buildPublicSafeScanner(contract) {
  const forbidden = contract.forbidden_patterns.map((p) => new RegExp(p, 'i'));
  return (code) => forbidden.some((re) => re.test(code));
}

const isFlagged = buildPublicSafeScanner(safeNeg);

test('public-safe: placeholder image path is not flagged', () => {
  assert.equal(isFlagged('/images/placeholder-film.svg'), false);
});

test('public-safe: youtube.com URL is flagged', () => {
  assert.equal(isFlagged('https://youtube.com/watch?v=dQw4w9WgXcQ'), true);
});

test('public-safe: vimeo direct video URL is flagged', () => {
  assert.equal(isFlagged('https://vimeo.com/123456789'), true);
});

test('public-safe: etsy URL is flagged', () => {
  assert.equal(isFlagged('https://www.etsy.com/listing/123'), true);
});

test('public-safe: local data URI is not flagged', () => {
  assert.equal(isFlagged('data:image/svg+xml;base64,PHN2Z...'), false);
});
