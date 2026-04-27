import { ProjectionResult } from "../engine/projection";

type Props = { result: ProjectionResult };

function fmt(n: number) {
  return n.toLocaleString("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 });
}

const thStyle: React.CSSProperties = {
  fontSize: "10px",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "#888",
  textAlign: "right",
  padding: "6px 10px",
  borderBottom: "2px solid #1a1a1a",
  whiteSpace: "nowrap",
};

const tdStyle: React.CSSProperties = {
  fontSize: "12px",
  color: "#1a1a1a",
  textAlign: "right",
  padding: "6px 10px",
  borderBottom: "1px solid #ebebeb",
  fontVariantNumeric: "tabular-nums",
};

export default function ProjectionTable({ result }: Props) {
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
        Year-by-Year Breakdown
      </p>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
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
                <td style={{ ...tdStyle, color: "#888" }}>{fmt(row.balanceInflationAdjusted)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}