import { useState } from "react";
import { ProjectionInputs } from "../engine/projection";
import { colors, fontSizes, fontWeights, sectionHeading } from "../theme";
import SectionHeading from "./ui/SectionHeading";

type Props = {
  inputs: ProjectionInputs;
  onChange: (inputs: ProjectionInputs) => void;
};

const labelStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  fontSize: fontSizes.sm,
  fontWeight: fontWeights.semibold,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: colors.inkMuted,
};

const inputStyle: React.CSSProperties = {
  padding: "8px 10px",
  fontSize: fontSizes.lg,
  border: `1px solid #ccc`,
  borderRadius: "2px",
  fontFamily: "inherit",
  color: colors.ink,
  background: colors.surface,
  width: "100%",
  boxSizing: "border-box",
};

const sectionHeadingStyle: React.CSSProperties = {
  fontSize: fontSizes.lg,
  fontWeight: fontWeights.bold,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: colors.ink,
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
        {type === "dollar" && <span style={{ fontSize: fontSizes.sm, color: colors.inkSubtle, fontWeight: fontWeights.normal }}>AUD $</span>}
        {type === "percent" && <span style={{ fontSize: fontSizes.sm, color: colors.inkSubtle, fontWeight: fontWeights.normal }}>%</span>}
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
      <SectionHeading>Personal Details</SectionHeading>
      {basicFields.map(renderField)}

      <button
        style={{
          marginTop: "8px",
          background: "none",
          border: `1px solid #ccc`,
          borderRadius: "2px",
          fontSize: fontSizes.sm,
          fontWeight: fontWeights.semibold,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: colors.ink,
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
          <SectionHeading>Advanced Assumptions</SectionHeading>
          {advancedFields.map(renderField)}
        </>
      )}
    </div>
  );
}