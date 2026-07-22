# Procedure: 11-analysis

1. Write the analysis document: baseline → adaptation → retest → verdict summary.
2. Run `node tools/seal-app.mjs --app <app-id>` → `apps/<app>/proof/seal-manifest.json`.
3. Update `apps/registry.json` to set `status: "sealed"` and `sealed_at`.
4. Close the intervention ledger: total count, hand-edit list, what WEAVE automated vs what was manual.
5. Close the usage ledger: model/tool/token/time summary (Fable orchestrates, Sonnet executes).
6. Confirm no `.next/`, `node_modules/`, or DB residue is committed.

**Evidence required:** `apps/<app>/proof/analysis-eval-result.json`, `proof/seal-manifest.json`, intervention ledger closed.
