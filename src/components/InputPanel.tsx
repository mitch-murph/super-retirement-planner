import { useState } from "react";
import { ProjectionInputs } from "../engine/projection";

type Props = {
  inputs: ProjectionInputs;
  onChange: (inputs: ProjectionInputs) => void;
};

const labelStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  fontSize: "12px",
  fontWeight: 600,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "#555",
};

const inputStyle: React.CSSProperties = {
  padding: "8px 10px",
  fontSize: "14px",
  border: "1px solid #ccc",
  borderRadius: "2px",
  fontFamily: "inherit",
  color: "#1a1a1a",
  background: "#fafafa",
  width: "100%",
  boxSizing: "border-box",
};

const sectionHeadingStyle: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "#888",
  borderBottom: "1px solid #e0e0e0",
  paddingBottom: "6px",
  marginBottom: "12px",
  marginTop: "24px",
};

type FieldConfig = {
  key: keyof ProjectionInputs;
  label: string;
  type?: "dollar" | "percent" | "age" | "number";
};

const basicFields: FieldConfig[] = [
  { key: "currentAge", label: "Current Age", type: "age" },
  { key: "retirementAge", label: "Retirement Age", type: "age" },
  { key: "currentSuperBalance", label: "Current Balance", type: "dollar" },
  { key: "annualSalary", label: "Annual Salary", type: "dollar" },
  { key: "voluntaryContribution", label: "Extra Contributions (p.a.)", type: "dollar" },
];

const advancedFields: FieldConfig[] = [
  { key: "employerContributionRate", label: "Employer Contribution Rate", type: "percent" },
  { key: "expectedReturnRate", label: "Expected Return Rate", type: "percent" },
  { key: "feeRate", label: "Annual Fee Rate", type: "percent" },
  { key: "inflationRate", label: "Inflation Rate", type: "percent" },
  { key: "salaryGrowthRate", label: "Salary Growth Rate", type: "percent" },
];

function formatDisplayValue(value: number, type?: FieldConfig["type"]): string {
  if (type === "percent") return (value * 100).toFixed(2);
  return String(value);
}

function parseInputValue(raw: string, type?: FieldConfig["type"]): number {
  const n = parseFloat(raw);
  if (isNaN(n)) return 0;
  if (type === "percent") return n / 100;
  return n;
}

export default function InputPanel({ inputs, onChange }: Props) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  function handleChange(key: keyof ProjectionInputs, raw: string, type?: FieldConfig["type"]) {
    onChange({ ...inputs, [key]: parseInputValue(raw, type) });
  }

  function renderField({ key, label, type }: FieldConfig) {
    return (
      <label key={key} style={labelStyle}>
        {label}
        {type === "dollar" && <span style={{ fontSize: "11px", color: "#aaa", fontWeight: 400 }}>AUD $</span>}
        {type === "percent" && <span style={{ fontSize: "11px", color: "#aaa", fontWeight: 400 }}>%</span>}
        <input
          type="number"
          style={inputStyle}
          value={formatDisplayValue(inputs[key] as number, type)}
          onChange={(e) => handleChange(key, e.target.value, type)}
        />
      </label>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      <p style={sectionHeadingStyle}>Personal Details</p>
      {basicFields.map(renderField)}

      <button
        style={{
          marginTop: "8px",
          background: "none",
          border: "1px solid #ccc",
          borderRadius: "2px",
          fontSize: "12px",
          fontWeight: 600,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "#555",
          padding: "8px 12px",
          cursor: "pointer",
          textAlign: "left",
        }}
        onClick={() => setShowAdvanced((v) => !v)}
      >
        {showAdvanced ? "▲ Hide" : "▼ Show"} Advanced Assumptions
      </button>

      {showAdvanced && (
        <>
          <p style={sectionHeadingStyle}>Advanced Assumptions</p>
          {advancedFields.map(renderField)}
        </>
      )}
    </div>
  );
}