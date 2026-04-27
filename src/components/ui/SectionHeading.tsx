import { sectionHeading } from "../../theme";

type Props = { children: React.ReactNode; style?: React.CSSProperties };

export default function SectionHeading({ children, style }: Props) {
  return <p style={{ ...sectionHeading, margin: 0, marginBottom: "16px", ...style }}>{children}</p>;
}
