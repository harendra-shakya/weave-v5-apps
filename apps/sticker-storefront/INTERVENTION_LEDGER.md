# INTERVENTION LEDGER — sticker-storefront (Marginalia)

Bounded adaptations made during engineering. Each entry names the trigger,
the action taken, and the constraint it respects.

---

## INT-001 — launch.json `--workspace` flag fix

**Stage:** Engineering / T7 (dev-server verification)  
**Trigger:** `preview_start` failed with "No workspaces found" because
`.claude/launch.json` used `npm --workspace apps/sticker-storefront --prefix
<root>` but the root `weave-v5-apps/package.json` has no `workspaces` field.  
**Action:** Updated all three workspace-style entries in
`P:/Development/Projects/weave/.claude/launch.json` (sticker-storefront,
nft-storefront, poster-storefront) to the `--prefix <app-dir>` pattern already
used by video-storefront. No app code changed.  
**Constraint respected:** One bounded recovery per failure. Change is
local to tooling config; no lifecycle artifacts, contracts, or app logic
affected.
