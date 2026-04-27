import { ProjectionResult } from "../engine/projection";
import { colors, fontSizes, fontWeights } from "../theme";
import SectionHeading from "./ui/SectionHeading";

type Props = { result: ProjectionResult };

function fmt(n: number) {
  return n.toLocaleString("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 });
}

const thStyle: React.CSSProperties = {
  fontSize: fontSizes.sm,
  fontWeight: fontWeights.bold,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: colors.inkMuted,
  textAlign: "right",
  padding: "6px 10px",
  borderBottom: `2px solid ${colors.borderStrong}`,
  whiteSpace: "nowrap",
};

const tdStyle: React.CSSProperties = {
  fontSize: fontSizes.md,
  color: colors.ink,
  textAlign: "right",
  padding: "6px 10px",
  borderBottom: `1px solid ${colors.border}`,
  fontVariantNumeric: "tabular-nums",
};

export default function ProjectionTable({ result }: Props) {
  return (
    <div>
      <SectionHeading>Year-by-Year Breakdown</SectionHeading>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: fontSizes.sm }}>
          <thead>
            <tr>
              <th style={{ ...thStyle, textAlign: "left" }}>Year</th>
              <th style={thStyle}>Age</th>
              <th style={thStyle}>Contributions</th>
              <th style={thStyle}>Fees</th>
              <th style={thStyle}>Balance</th>
              <th style={thStyle}>Inflation-Adj. Balance</th>
            </tr>
          </thead>
          <tbody>
            {result.rows.map((row, i) => (
              <tr key={row.year} style={{ background: i % 2 === 0 ? "#fff" : "#f9f9f9" }}>
                <td style={{ ...tdStyle, textAlign: "left" }}>{row.year}</td>
                <td style={tdStyle}>{row.age}</td>
                <td style={tdStyle}>{fmt(row.contributions)}</td>
                <td style={tdStyle}>{fmt(row.fees)}</td>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{fmt(row.balance)}</td>
                <td style={{ ...tdStyle, color: colors.inkSubtle }}>{fmt(row.balanceInflationAdjusted)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}