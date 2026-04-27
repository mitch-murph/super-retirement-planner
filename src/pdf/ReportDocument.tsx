import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import type { ProjectionRow } from '../engine/projection';

const ASFA_COMFORTABLE = 70_000;

const styles = StyleSheet.create({
  page: { padding: 48, fontSize: 10, fontFamily: 'Helvetica', color: '#111' },
  header: { marginBottom: 24 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  subtitle: { fontSize: 10, color: '#555' },
  sectionTitle: { fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8, marginTop: 20, borderBottomWidth: 1, borderBottomColor: '#ccc', paddingBottom: 4 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  label: { color: '#555' },
  value: { fontWeight: 'bold' },
  tableHeader: { flexDirection: 'row', backgroundColor: '#f0f0f0', padding: '4 6', fontWeight: 'bold' },
  tableRow: { flexDirection: 'row', padding: '3 6', borderBottomWidth: 1, borderBottomColor: '#eee' },
  col1: { width: '15%' },
  col2: { width: '25%', textAlign: 'right' },
  col3: { width: '25%', textAlign: 'right' },
  col4: { width: '20%', textAlign: 'right' },
  col5: { width: '15%', textAlign: 'right' },
  disclaimer: { fontSize: 8, color: '#888', marginTop: 32, borderTopWidth: 1, borderTopColor: '#ddd', paddingTop: 8 },
  assumptionRow: { flexDirection: 'row', marginBottom: 3 },
  assumptionLabel: { width: '50%', color: '#555' },
  // Chart
  chartRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 2 },
  chartLabel: { width: 24, fontSize: 8, color: '#555', textAlign: 'right', marginRight: 6 },
  chartBarBg: { flex: 1, backgroundColor: '#f0f0f0', height: 8 },
  chartBar: { backgroundColor: '#1a1a1a', height: 8 },
  chartValue: { width: 64, fontSize: 8, color: '#333', textAlign: 'right', marginLeft: 6 },
  // Insights
  insightsGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  insightBox: { width: '50%', borderLeftWidth: 3, paddingLeft: 8, marginBottom: 12, paddingRight: 12 },
  insightTitle: { fontSize: 9, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 3 },
  insightText: { fontSize: 9, color: '#333', lineHeight: 1.4 },
});

export interface ReportInputs {
  currentAge: number;
  retirementAge: number;
  currentSuperBalance: number;
  annualSalary: number;
  employerContributionRate: number;
  voluntaryContribution: number;
  expectedReturnRate: number;
  inflationRate: number;
  feeRate: number;
  salaryGrowthRate: number;
}

interface ReportDocumentProps {
  inputs: ReportInputs;
  rows: ProjectionRow[];
  retirementBalance: number;
  annualRetirementIncome: number;
  balanceWithoutVoluntary: number;
  generatedDate?: string;
}

const fmt = (n: number) => `$${n.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
const pct = (n: number) => `${n}%`;

function sampleRows(rows: ProjectionRow[], maxBars = 40): ProjectionRow[] {
  if (rows.length <= maxBars) return rows;
  const step = Math.ceil(rows.length / maxBars);
  return rows.filter((_, i) => i % step === 0 || i === rows.length - 1);
}

export default function ReportDocument({ inputs, rows, retirementBalance, annualRetirementIncome, balanceWithoutVoluntary, generatedDate }: ReportDocumentProps) {
  const date = generatedDate ?? new Date().toLocaleDateString('en-AU', { dateStyle: 'long' });
  const yearsToRetirement = inputs.retirementAge - inputs.currentAge;
  const inflationDecimal = inputs.inflationRate / 100;
  const maxBalance = Math.max(...rows.map(r => r.balance));
  const chartRows = sampleRows(rows);

  // Insights calculations
  const totalFees = rows.reduce((sum, r) => sum + r.fees, 0);
  const voluntaryImpact = inputs.voluntaryContribution > 0 ? retirementBalance - balanceWithoutVoluntary : null;
  const realIncome = annualRetirementIncome / Math.pow(1 + inflationDecimal, yearsToRetirement);
  const trackRatio = annualRetirementIncome / ASFA_COMFORTABLE;
  const trackLabel = trackRatio >= 1.1 ? 'Ahead' : trackRatio >= 0.9 ? 'On Track' : 'Behind';
  const trackColour = trackRatio >= 1.1 ? '#2e7d32' : trackRatio >= 0.9 ? '#1565c0' : '#b71c1c';

  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Superannuation Projection Report</Text>
          <Text style={styles.subtitle}>Generated: {date}</Text>
        </View>

        {/* Summary */}
        <Text style={styles.sectionTitle}>Summary</Text>
        <View style={styles.row}><Text style={styles.label}>Current Age</Text><Text style={styles.value}>{inputs.currentAge}</Text></View>
        <View style={styles.row}><Text style={styles.label}>Retirement Age</Text><Text style={styles.value}>{inputs.retirementAge}</Text></View>
        <View style={styles.row}><Text style={styles.label}>Years to Retirement</Text><Text style={styles.value}>{yearsToRetirement}</Text></View>
        <View style={styles.row}><Text style={styles.label}>Projected Balance at Retirement</Text><Text style={styles.value}>{fmt(retirementBalance)}</Text></View>
        <View style={styles.row}><Text style={styles.label}>Estimated Annual Retirement Income (4% rule)</Text><Text style={styles.value}>{fmt(annualRetirementIncome)}</Text></View>

        {/* Assumptions */}
        <Text style={styles.sectionTitle}>Assumptions</Text>
        {([
          ['Current Super Balance', fmt(inputs.currentSuperBalance)],
          ['Annual Salary', fmt(inputs.annualSalary)],
          ['Employer Contribution Rate', pct(inputs.employerContributionRate)],
          ['Voluntary Contribution (p.a.)', fmt(inputs.voluntaryContribution)],
          ['Expected Return Rate', pct(inputs.expectedReturnRate)],
          ['Inflation Rate', pct(inputs.inflationRate)],
          ['Fee Rate', pct(inputs.feeRate)],
          ['Salary Growth Rate', pct(inputs.salaryGrowthRate)],
        ] as [string, string][]).map(([label, value]) => (
          <View key={label} style={styles.assumptionRow}>
            <Text style={styles.assumptionLabel}>{label}</Text>
            <Text>{value}</Text>
          </View>
        ))}

        {/* Insights */}
        <Text style={styles.sectionTitle}>Insights</Text>
        <View style={styles.insightsGrid}>
          <View style={{ ...styles.insightBox, borderLeftColor: trackColour }}>
            <Text style={{ ...styles.insightTitle, color: trackColour }}>{trackLabel}</Text>
            <Text style={styles.insightText}>
              Projected income: {fmt(annualRetirementIncome)}/yr{'\n'}
              ASFA comfortable standard: {fmt(ASFA_COMFORTABLE)}/yr
            </Text>
          </View>

          <View style={{ ...styles.insightBox, borderLeftColor: '#888' }}>
            <Text style={styles.insightTitle}>Today's Dollars</Text>
            <Text style={styles.insightText}>
              In today's dollars, retirement income is approx. {fmt(realIncome)}/yr{'\n'}
              (assumes {inputs.inflationRate}% inflation over {yearsToRetirement} yrs)
            </Text>
          </View>

          <View style={{ ...styles.insightBox, borderLeftColor: '#e65100' }}>
            <Text style={styles.insightTitle}>Fee Drag</Text>
            <Text style={styles.insightText}>
              Total fees over accumulation period: {fmt(totalFees)}
            </Text>
          </View>

          <View style={{ ...styles.insightBox, borderLeftColor: '#1565c0' }}>
            <Text style={styles.insightTitle}>Voluntary Contributions</Text>
            <Text style={styles.insightText}>
              {voluntaryImpact !== null
                ? `Voluntary contributions add an estimated ${fmt(voluntaryImpact)} to retirement balance.`
                : 'No voluntary contributions modelled.'}
            </Text>
          </View>
        </View>
      </Page>
      
      <Page size="A4" style={styles.page}>
        {/* Chart */}
        <Text style={styles.sectionTitle}>Projected Balance Over Time</Text>
        {chartRows.map((r) => (
          <View key={r.year} style={styles.chartRow}>
            <Text style={styles.chartLabel}>{r.age}</Text>
            <View style={styles.chartBarBg}>
              <View style={{ ...styles.chartBar, width: `${(r.balance / maxBalance) * 100}%` }} />
            </View>
            <Text style={styles.chartValue}>{fmt(r.balance)}</Text>
          </View>
        ))}

        {/* Year-by-year table */}
        <Text style={styles.sectionTitle}>Year-by-Year Breakdown</Text>
        <View style={styles.tableHeader}>
          <Text style={styles.col1}>Age</Text>
          <Text style={styles.col2}>Opening Balance</Text>
          <Text style={styles.col3}>Contributions</Text>
          <Text style={styles.col4}>Fees</Text>
          <Text style={styles.col5}>Closing Balance</Text>
        </View>
        {rows.map((r) => (
          <View key={r.year} style={styles.tableRow}>
            <Text style={styles.col1}>{r.age}</Text>
            <Text style={styles.col2}>{fmt(r.openingBalance)}</Text>
            <Text style={styles.col3}>{fmt(r.contributions)}</Text>
            <Text style={styles.col4}>{fmt(r.fees)}</Text>
            <Text style={styles.col5}>{fmt(r.balance)}</Text>
          </View>
        ))}

        {/* Disclaimer */}
        <Text style={styles.disclaimer}>
          Disclaimer: This report is a projection only and is not financial advice. It is based on assumptions that may not reflect actual future outcomes. Past performance is not a reliable indicator of future performance. Please consult a licensed financial adviser before making financial decisions.
        </Text>

      </Page>
    </Document>
  );
}
