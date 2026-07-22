// KPI computation from an event array.
// Formulas match contracts/kpi/formulas.json — do not change without an OWNER_GATE.

export function computeKPIs(events) {
  const views     = events.filter((e) => e.event === 'view').length;
  const converts  = events.filter((e) => e.event === 'convert').length;
  const fulfills  = events.filter((e) => e.event === 'fulfill').length;
  const refunds   = events.filter((e) => e.event === 'refund').length;

  const conversion_rate = views > 0 ? converts / views : 0;
  const refund_rate     = converts > 0 ? refunds / converts : 0;
  const fulfill_rate    = converts > 0 ? fulfills / converts : 0;

  const total_revenue = events
    .filter((e) => e.event === 'convert' && typeof e.amount_cents === 'number')
    .reduce((sum, e) => sum + e.amount_cents, 0);
  const aov = converts > 0 ? total_revenue / converts / 100 : 0;

  return {
    views, converts, fulfills, refunds,
    conversion_rate,
    aov,
    refund_rate,
    fulfill_rate,
    guardrail_breach: refund_rate > 0.15,
  };
}
