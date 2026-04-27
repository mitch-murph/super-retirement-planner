import type { ProjectionRow } from '../engine/projection';

interface InsightsProps {
  rows: ProjectionRow[];
  retirementBalance: number;
  annualRetirementIncome: number;
  inflationRate: number;
  yearsToRetirement: number;
  voluntaryContribution: number;
  balanceWithoutVoluntary: number;
}

const ASFA_COMFORTABLE = 70_000;

function getTrackStatus(annualRetirementIncome: number): {
  label: 'On Track' | 'Ahead' | 'Behind';
  colour: string;
  message: string;
} {
  const ratio = annualRetirementIncome / ASFA_COMFORTABLE;
  if (ratio >= 1.1) return { label: 'Ahead', colour: '#2e7d32', message: `Your projected income exceeds the ASFA comfortable standard of $${ASFA_COMFORTABLE.toLocaleString()}/yr.` };
  if (ratio >= 0.9) return { label: 'On Track', colour: '#1565c0', message: `Your projected income is broadly in line with the ASFA comfortable standard of $${ASFA_COMFORTABLE.toLocaleString()}/yr.` };
  return { label: 'Behind', colour: '#b71c1c', message: `Your projected income falls short of the ASFA comfortable standard of $${ASFA_COMFORTABLE.toLocaleString()}/yr.` };
}

export default function Insights({
  rows,
  retirementBalance,
  annualRetirementIncome,
  inflationRate,
  yearsToRetirement,
  voluntaryContribution,
  balanceWithoutVoluntary,
}: InsightsProps) {
  const status = getTrackStatus(annualRetirementIncome);
  const totalFees = rows.reduce((sum, r) => sum + r.fees, 0);
  const voluntaryImpact = voluntaryContribution > 0 ? retirementBalance - balanceWithoutVoluntary : null;
  const realRetirementIncome = annualRetirementIncome / Math.pow(1 + inflationRate, yearsToRetirement);
  const pct = (inflationRate * 100).toFixed(1);

  const labelStyle: React.CSSProperties = { fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#555', marginBottom: '6px' };
  const valueStyle: React.CSSProperties = { fontSize: '13px', margin: '0.25rem 0 0', color: '#333' };

  return (
    <div>
      <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#555', borderBottom: '1px solid #e0e0e0', paddingBottom: '6px', marginBottom: '20px', margin: '0 0 20px' }}>
        Insights
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>

        <div style={{ borderLeft: `3px solid ${status.colour}`, paddingLeft: '12px' }}>
          <p style={{ ...labelStyle, color: status.colour }}>{status.label}</p>
          <p style={valueStyle}>{status.message}</p>
          <p style={{ ...valueStyle, marginTop: '6px' }}>
            Projected income: <strong>${annualRetirementIncome.toLocaleString(undefined, { maximumFractionDigits: 0 })}/yr</strong>
          </p>
        </div>

        <div style={{ borderLeft: '3px solid #888', paddingLeft: '12px' }}>
          <p style={labelStyle}>Today's Dollars</p>
          <p style={valueStyle}>
            In today's dollars your retirement income is approximately{' '}
            <strong>${realRetirementIncome.toLocaleString(undefined, { maximumFractionDigits: 0 })}/yr</strong>
          </p>
          <p style={{ ...valueStyle, color: '#888' }}>Assumes {pct}% inflation over {yearsToRetirement} years.</p>
        </div>

        <div style={{ borderLeft: '3px solid #e65100', paddingLeft: '12px' }}>
          <p style={labelStyle}>Fee Drag</p>
          <p style={valueStyle}>
            Total fees over accumulation period:{' '}
            <strong>${totalFees.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong>
          </p>
          <p style={{ ...valueStyle, color: '#888' }}>Reducing your fee rate can materially improve your final balance.</p>
        </div>

        <div style={{ borderLeft: '3px solid #1565c0', paddingLeft: '12px' }}>
          <p style={labelStyle}>Voluntary Contributions</p>
          {voluntaryImpact !== null ? (
            <p style={valueStyle}>
              Your voluntary contributions add an estimated{' '}
              <strong>${voluntaryImpact.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong> to your retirement balance.
            </p>
          ) : (
            <p style={valueStyle}>No voluntary contributions modelled.</p>
          )}
        </div>

      </div>
    </div>
  );
}
