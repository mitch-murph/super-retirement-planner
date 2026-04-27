import { useState } from "react";
import { ProjectionInputs, ProjectionResult, runProjection } from "../engine/projection";
import InputPanel from "../components/InputPanel";
import SummaryMetrics from "../components/SummaryMetrics";
import ProjectionChart from "../components/ProjectionChart";
import ProjectionTable from "../components/ProjectionTable";

const DEFAULT_INPUTS: ProjectionInputs = {
  currentAge: 30,
  retirementAge: 67,
  currentSuperBalance: 45000,
  annualSalary: 85000,
  employerContributionRate: 0.11,
  voluntaryContribution: 2000,
  expectedReturnRate: 0.07,
  inflationRate: 0.025,
  feeRate: 0.0065,
  salaryGrowthRate: 0.02,
};

const pageStyle: React.CSSProperties = {
  minHeight: "100vh",
  background: "#f4f3f0",
  padding: "40px 24px",
  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
  color: "#1a1a1a",
};

const reportContainerStyle: React.CSSProperties = {
  maxWidth: "960px",
  margin: "0 auto",
  background: "#fff",
  border: "1px solid #ddd",
  boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
};

const reportHeaderStyle: React.CSSProperties = {
  borderBottom: "3px solid #1a1a1a",
  padding: "32px 40px 24px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
};

const sectionStyle: React.CSSProperties = {
  padding: "32px 40px",
  borderBottom: "1px solid #e8e8e8",
};

export default function InputPage() {
  const [inputs, setInputs] = useState<ProjectionInputs>(DEFAULT_INPUTS);
  const result: ProjectionResult = runProjection(inputs);
  const today = new Date().toLocaleDateString("en-AU", { day: "2-digit", month: "long", year: "numeric" });

  return (
    <div style={pageStyle}>
      <div style={reportContainerStyle}>

        {/* Report Header */}
        <div style={reportHeaderStyle}>
          <div>
            <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#888", marginBottom: "6px" }}>
              Superannuation Projection Report
            </p>
            <h1 style={{ fontSize: "22px", fontWeight: 700, margin: 0, letterSpacing: "-0.02em" }}>
              Retirement Outlook
            </h1>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: "11px", color: "#888", margin: 0 }}>Prepared</p>
            <p style={{ fontSize: "13px", fontWeight: 600, margin: 0 }}>{today}</p>
            <p style={{ fontSize: "10px", color: "#bbb", marginTop: "4px" }}>Modelled projections only — not financial advice</p>
          </div>
        </div>

        {/* Two-column layout: inputs + results */}
        <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 0 }}>

          {/* Left: Input Panel */}
          <div
            style={{
              padding: "32px 28px",
              borderRight: "1px solid #e8e8e8",
              background: "#fafafa",
            }}
          >
            <p
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#888",
                borderBottom: "1px solid #e0e0e0",
                paddingBottom: "6px",
                marginBottom: "20px",
              }}
            >
              Assumptions
            </p>
            <InputPanel inputs={inputs} onChange={setInputs} />
          </div>

          {/* Right: Results */}
          <div>
            <div style={sectionStyle}>
              <SummaryMetrics result={result} />
            </div>
            <div style={sectionStyle}>
              <ProjectionChart result={result} />
            </div>
            <div style={{ ...sectionStyle, borderBottom: "none" }}>
              <ProjectionTable result={result} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            borderTop: "2px solid #1a1a1a",
            padding: "16px 40px",
            display: "flex",
            justifyContent: "space-between",
            fontSize: "10px",
            color: "#bbb",
            letterSpacing: "0.04em",
          }}
        >
          <span>Super Retirement Planner — Client-Side Projection Tool</span>
          <span>Figures are estimates only. Past performance is not indicative of future results.</span>
        </div>

      </div>
    </div>
  );
}