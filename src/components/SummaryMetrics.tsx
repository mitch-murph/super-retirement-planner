import { ProjectionResult } from "../engine/projection";

type Props = { result: ProjectionResult };

function fmt(n: number) {
  return n.toLocaleString("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 });
}

const metricStyle: React.CSSProperties = {
  borderTop: "2px solid #1a1a1a",
  paddingTop: "12px",
  paddingBottom: "16px",
};

const labelStyle: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "#888",
  marginBottom: "6px",
};

const valueStyle: React.CSSProperties = {
  fontSize: "28px",
  fontWeight: 700,
  color: "#1a1a1a",
  letterSpacing: "-0.02em",
};

const subValueStyle: React.CSSProperties = {
  fontSize: "13px",
  color: "#777",
  marginTop: "4px",
};

export default function SummaryMetrics({ result }: Props) {
  return (
    <div>
      <p
        style={{
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#888",
          borderBottom: "1px solid #e0e0e0",
          paddingBottom: "6px",
          marginBottom: "16px",
        }}
      >
        Projection Summary
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "16px",
        }}
      >
        <div style={metricStyle}>
          <p style={labelStyle}>Projected Balance at Retirement</p>
          <p style={valueStyle}>{fmt(result.finalBalance)}</p>
          <p style={subValueStyle}>Nominal value</p>
        </div>
        <div style={metricStyle}>
          <p style={labelStyle}>Inflation-Adjusted Balance</p>
          <p style={valueStyle}>{fmt(result.finalBalanceInflationAdjusted)}</p>
          <p style={subValueStyle}>In today's dollars</p>
        </div>
        <div style={metricStyle}>
          <p style={labelStyle}>Est. Annual Retirement Income</p>
          <p style={valueStyle}>{fmt(result.estimatedAnnualIncome)}</p>
          <p style={subValueStyle}>Based on 4% drawdown rule</p>
        </div>
        <div style={metricStyle}>
          <p style={labelStyle}>Years to Retirement</p>
          <p style={valueStyle}>{result.yearsToRetirement}</p>
          <p style={subValueStyle}>Years of accumulation</p>
        </div>
      </div>
    </div>
  );
}