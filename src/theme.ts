export const colors = {
  ink: "#1a1a1a",
  inkMuted: "#555",
  inkSubtle: "#666",
  inkDisabled: "#999",
  border: "#e0e0e0",
  borderStrong: "#1a1a1a",
  surface: "#fafafa",
  surfaceAlt: "#f9f9f9",
  bg: "#fff",
};

export const fontSizes = {
  xs: "11px",
  sm: "12px",
  md: "13px",
  lg: "14px",
  xl: "22px",
  metric: "28px",
};

export const fontWeights = {
  normal: 400,
  semibold: 600,
  bold: 700,
};

export const spacing = {
  xs: "4px",
  sm: "8px",
  md: "12px",
  lg: "16px",
  xl: "24px",
  xxl: "32px",
  section: "40px",
};

export const labelUppercase: React.CSSProperties = {
  fontSize: fontSizes.sm,
  fontWeight: fontWeights.bold,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: colors.inkMuted,
};

export const sectionHeading: React.CSSProperties = {
  ...labelUppercase,
  borderBottom: `1px solid ${colors.border}`,
  paddingBottom: spacing.xs,
  marginBottom: spacing.lg,
};
