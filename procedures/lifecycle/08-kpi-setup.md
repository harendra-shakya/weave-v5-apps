# Procedure: 08-kpi-setup

1. Run `node tools/freeze.mjs --app <app-id>` to record the current git SHA as the baseline freeze point. This must happen BEFORE the cohort run.
2. Run `node tools/cohort-runner.mjs --app <app-id> --seed 42` to generate the baseline cohort. Output goes to `apps/<app>/proof/baseline/`.
3. Run again with the same seed to confirm determinism: the two `cohort-result.json` files must have identical `events` arrays.
4. Record the baseline KPIs in `apps/<app>/proof/baseline/kpi-snapshot.json`.

**Evidence required:** `apps/<app>/proof/kpi-setup-eval-result.json`, baseline cohort in `proof/baseline/`, confirmed determinism.
