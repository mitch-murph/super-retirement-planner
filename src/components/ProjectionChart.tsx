import { ProjectionResult } from "../engine/projection";
import { colors } from "../theme";
import SectionHeading from "./ui/SectionHeading";

type Props = { result: ProjectionResult };

export default function ProjectionChart({ result }: Props) {
  const { rows } = result;
  if (!rows.length) return null;

  const W = 640;
  const H = 210;
  const PAD = { top: 10, right: 20, bottom: 40, left: 60 };
  const chartW = W - PAD.left - PAD.right;
  const chartH = H - PAD.top - PAD.bottom;

  const maxBalance = Math.max(...rows.map((r) => r.balance));
  const barWidth = chartW / rows.length;

  function scaleY(val: number) {
    return chartH - (val / maxBalance) * chartH;
  }

  function fmtK(n: number) {
    if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
    return `$${(n / 1000).toFixed(0)}K`;
  }

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((t) => maxBalance * t);

  return (
    <div>
      <SectionHeading>Balance Growth Projection</SectionHeading>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        style={{ width: "100%", height: "auto", display: "block" }}
        aria-label="Superannuation balance projection chart"
      >
        <g transform={`translate(${PAD.left},${PAD.top})`}>
          {/* Y axis grid + labels */}
          {yTicks.map((tick) => (
            <g key={tick}>
              <line
                x1={0}
                x2={chartW}
                y1={scaleY(tick)}
                y2={scaleY(tick)}
                stroke="#e8e8e8"
                strokeWidth={1}
              />
              <text
                x={-6}
                y={scaleY(tick) + 4}
                textAnchor="end"
                fontSize={11}
                fill={colors.inkSubtle}
                fontFamily="inherit"
              >
                {fmtK(tick)}
              </text>
            </g>
          ))}

          {/* Bars */}
          {rows.map((row, i) => {
            const barH = (row.balance / maxBalance) * chartH;
            const x = i * barWidth;
            const y = chartH - barH;
            return (
              <rect
                key={row.year}
                x={x + barWidth * 0.1}
                y={y}
                width={barWidth * 0.8}
                height={barH}
                fill="#1a1a1a"
                opacity={0.85}
              />
            );
          })}

          {/* Inflation-adjusted line */}
          <polyline
            points={rows
              .map((row, i) => `${i * barWidth + barWidth / 2},${scaleY(row.balanceInflationAdjusted)}`)
              .join(" ")}
            fill="none"
            stroke="#999"
            strokeWidth={1.5}
            strokeDasharray="4 3"
          />

          {/* X axis labels — every 5 years */}
          {rows
            .filter((_, i) => i % 5 === 0 || i === rows.length - 1)
            .map((row, _, arr) => {
              const i = rows.indexOf(row);
              return (
                <text
                  key={row.year}
                  x={i * barWidth + barWidth / 2}
                  y={chartH + 18}
                  textAnchor="middle"
                  fontSize={11}
                  fill={colors.inkSubtle}
                  fontFamily="inherit"
                >
                  {row.year}
                </text>
              );
            })}

          {/* Axes */}
          <line x1={0} x2={0} y1={0} y2={chartH} stroke="#ccc" strokeWidth={1} />
          <line x1={0} x2={chartW} y1={chartH} y2={chartH} stroke="#ccc" strokeWidth={1} />
        </g>

        {/* Legend */}
        <g transform={`translate(${PAD.left},${H})`}>
          <rect x={0} y={-8} width={10} height={8} fill="#1a1a1a" opacity={0.85} />
          <text x={14} y={0} fontSize={11} fill={colors.inkMuted} fontFamily="inherit">Nominal Balance</text>
          <line x1={90} x2={104} y1={-4} y2={-4} stroke="#999" strokeWidth={1.5} strokeDasharray="4 3" />
          <text x={108} y={0} fontSize={11} fill={colors.inkMuted} fontFamily="inherit">Inflation-Adjusted</text>
        </g>
      </svg>
    </div>
  );
}