import { labelUppercase } from "../../theme";
import React from "react";

type Props = { children: React.ReactNode; style?: React.CSSProperties };

export default function MetricLabel({ children, style }: Props) {
  return (
    <p style={{ ...labelUppercase, marginBottom: "6px", ...style }}>
      {children}
    </p>
  );
}
