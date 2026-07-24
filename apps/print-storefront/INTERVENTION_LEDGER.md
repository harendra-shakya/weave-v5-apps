# Intervention Ledger — print-storefront (Tableau)

ATM-422 fresh-operator run. Records EVERY hand edit or decision made during this lifecycle.
This ledger is the honesty infrastructure; the ATM-422 report reads it directly.

## Classification

- **ENGINEER**: requires engineering knowledge not derivable from the skill's docs alone
- **AUTHOR**: text, copy, or configuration authored by the operator (normal, expected)
- **DECISION**: choice between documented options, made by operator
- **PORTABILITY**: a gate that cannot execute on Windows — disclosed override
- **OWNER**: a decision or access only the owner holds

Engineer interventions are the primary finding. Each one is tagged DISCLOSED (documented in QUICKSTART.md / ENVELOPE.md) or NEW (not previously documented).

---

## Interventions

| # | Stage | Date | Type | Tag | Description |
|---|-------|------|------|-----|-------------|
| 1 | setup | 2026-07-24 | ENGINEER | NEW | Created `contracts/specs/print-storefront.spec.json` — the cohort runner requires this file but the QUICKSTART and SKILL.md contain no instruction to create it, no template, and no link to the existing specs as examples. A non-engineer following only the docs would encounter `ERROR: spec not found` from cohort-runner.mjs with no path forward. |
| 2 | intent | 2026-07-24 | AUTHOR | — | Authored all intent proof text (goal, user journey, COMMERCE-CHECKLIST decisions, non-claims) |
| 3 | intent | 2026-07-24 | DECISION | — | Checkpoint #1: operator (Harendra) chose Option A (poster/print storefront) from three options presented |
| 4 | intent | 2026-07-24 | DECISION | — | Checkpoint #2: operator chose Direction 2 (Tableau: sage green, DM Serif Display + DM Sans, museum-shop aesthetic) from three brand directions presented |
