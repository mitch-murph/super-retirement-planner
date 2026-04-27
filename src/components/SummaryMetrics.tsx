import { ProjectionResult } from "../engine/projection";
import { colors, fontSizes, fontWeights } from "../theme";
import SectionHeading from "./ui/SectionHeading";
import MetricLabel from "./ui/MetricLabel";

type Props = { result: ProjectionResult };

function fmt(n: number) {
  return n.toLocaleString("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 });
}

const metricStyle: React.CSSProperties = {
  borderTop: `2px solid ${colors.borderStrong}`,
  paddingTop: "12px",
  paddingBottom: "16px",
  display: "grid",
  gridTemplateRows: "3em auto auto",
};

const valueStyle: React.CSSProperties = {
  fontSize: fontSizes.metric,
  fontWeight: fontWeights.bold,
  color: colors.ink,
  letterSpacing: "-0.02em",
};

const subValueStyle: React.CSSProperties = {
  fontSize: fontSizes.md,
  color: colors.inkSubtle,
  marginTop: "4px",
};

export default function SummaryMetrics({ result }: Props) {
  return (
    <div>
      <SectionHeading>Projection Summary</SectionHeading>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px", alignItems: "start" }}>
        <div style={metricStyle}>
          <MetricLabel>Projected Balance at Retirement</MetricLabel>
          <p style={valueStyle}>{fmt(result.finalBalance)}</p>
          <p style={subValueStyle}>Nominal value</p>
        </div>
        <div style={metricStyle}>
          <MetricLabel>Inflation-Adjusted Balance</MetricLabel>
          <p style={valueStyle}>{fmt(result.finalBalanceInflationAdjusted)}</p>
          <p style={subValueStyle}>In today's dollars</p>
        </div>
        <div style={metricStyle}>
          <MetricLabel>Est. Annual Retirement Income</MetricLabel>
          <p style={valueStyle}>{fmt(result.estimatedAnnualIncome)}</p>
          <p style={subValueStyle}>Based on 4% drawdown rule</p>
        </div>
        <div style={metricStyle}>
          <MetricLabel>Years to Retirement</MetricLabel>
          <p style={valueStyle}>{result.yearsToRetirement}</p>
          <p style={subValueStyle}>Years of accumulation</p>
        </div>
      </div>
    </div>
  );
}