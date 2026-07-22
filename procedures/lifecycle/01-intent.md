# Procedure: 01-intent

Read `contracts/specs/<app>.spec.json` (persona, problem, positioning, hero_line) and the brand doc (`docs/atm-415/atm-4XX-brand.md`). Fill the intent stage review form produced by `weave_eval.py intent --review-template`.

**Sources:** the spec and the brand doc are the authority. Do not invent persona details.

**Evidence required:** a filled `intent-review.json` scored ≥ the passing threshold, written to `apps/<app>/proof/intent-eval-result.json`.
