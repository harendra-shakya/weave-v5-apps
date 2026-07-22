# Procedure: 10-iteration

1. WEAVE diagnoses the baseline KPIs and ranks bounded adaptations by evidence/impact/effort/risk.
2. Apply ONE approved adaptation from the spec's `bounded_adaptation_candidate` (record the diff/commit).
3. Run `node tools/cohort-runner.mjs --app <app-id> --seed 42` with the **same seed** → `apps/<app>/proof/retest-1/`.
4. Run `node -e "import('./packages/commerce-core/kpi.mjs').then(m => ...)"` or `node tools/cohort-runner.mjs` KPI comparison.
5. Issue GO / ITERATE / PIVOT / STOP verdict per `contracts/kpi/formulas.json` verdict_rules.
6. Every verdict must carry the explicit synthetic-only nonclaim. Vitrine's verdict must also carry the chainless nonclaim.

**Evidence required:** `apps/<app>/proof/iteration-eval-result.json`, retest cohort in `proof/retest-1/`, written verdict with nonclaims.
