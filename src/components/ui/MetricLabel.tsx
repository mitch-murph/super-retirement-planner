import { labelUppercase } from "../../theme";

type Props = { children: React.ReactNode };

export default function MetricLabel({ children }: Props) {
  return <p style={{ ...labelUppercase, marginBottom: "6px" }}>{children}</p>;
}
