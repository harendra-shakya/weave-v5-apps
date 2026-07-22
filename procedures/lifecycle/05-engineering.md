# Procedure: 05-engineering

1. Port the provided UI from `docs/atm-415/ui/<brand>` verbatim into `apps/<app>/src/` — same components, markup, tokens, Tailwind config. No visual changes.
2. Wire UI to `packages/commerce-core` (cart, checkout, order state machine).
3. Author catalog from the brand spec's example_items (fictional creators, placeholder media).
4. Wire nonclaims where required (Vitrine: footer + first-purchase).
5. Run `npm run build` in the app directory — must succeed with no console errors.
6. Run `node tools/validate-contracts.mjs` — must pass.
7. For nft-storefront: run the chainless scan (via validate-contracts or directly) — must pass.
8. Log every hand-edit in the intervention ledger.

**Hard gates:** `npm run build` green + `validate-contracts.mjs` green.
**Evidence required:** `apps/<app>/proof/engineering-eval-result.json`.
