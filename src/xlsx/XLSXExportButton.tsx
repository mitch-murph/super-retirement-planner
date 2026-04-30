import * as XLSX from 'xlsx';
import type { ReportInputs } from '../pdf/ReportDocument';
import type { ProjectionRow } from '../engine/projection';

interface XLSXExportButtonProps {
  inputs: ReportInputs;
  rows: ProjectionRow[];
  retirementBalance: number;
  annualRetirementIncome: number;
  balanceWithoutVoluntary: number;
}

export default function XLSXExportButton({
  inputs,
  rows,
  retirementBalance,
  annualRetirementIncome,
  balanceWithoutVoluntary,
}: XLSXExportButtonProps) {
  function handleExport() {
    const wb = XLSX.utils.book_new();

    // --- Summary sheet ---
    const yearsToRetirement = inputs.retirementAge - inputs.currentAge;
    const voluntaryImpact =
      inputs.voluntaryContribution > 0 ? retirementBalance - balanceWithoutVoluntary : null;

    const summaryData = [
      ['Superannuation Projection Report'],
      ['Generated', new Date().toLocaleDateString('en-AU', { dateStyle: 'long' })],
      [],
      ['SUMMARY'],
      ['Current Age', inputs.currentAge],
      ['Retirement Age', inputs.retirementAge],
      ['Years to Retirement', yearsToRetirement],
      ['Projected Balance at Retirement', retirementBalance],
      ['Estimated Annual Retirement Income (4% rule)', annualRetirementIncome],
      ...(voluntaryImpact !== null
        ? [['Voluntary Contribution Impact', voluntaryImpact]]
        : []),
      [],
      ['ASSUMPTIONS'],
      ['Current Super Balance', inputs.currentSuperBalance],
      ['Annual Salary', inputs.annualSalary],
      ['Employer Contribution Rate (%)', inputs.employerContributionRate],
      ['Voluntary Contribution (p.a.)', inputs.voluntaryContribution],
      ['Expected Return Rate (%)', inputs.expectedReturnRate],
      ['Inflation Rate (%)', inputs.inflationRate],
      ['Fee Rate (%)', inputs.feeRate],
      ['Salary Growth Rate (%)', inputs.salaryGrowthRate],
    ];

    const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
    wsSummary['!cols'] = [{ wch: 42 }, { wch: 22 }];
    XLSX.utils.book_append_sheet(wb, wsSummary, 'Summary');

    // --- Year-by-year sheet ---
    const tableData = [
      ['Age', 'Year', 'Salary', 'Opening Balance', 'Contributions', 'Fees', 'Closing Balance'],
      ...rows.map((r) => [r.age, r.year, r.salary, r.openingBalance, r.contributions, r.fees, r.balance]),
    ];

    const wsTable = XLSX.utils.aoa_to_sheet(tableData);
    wsTable['!cols'] = [
      { wch: 6 }, { wch: 6 }, { wch: 16 }, { wch: 18 }, { wch: 16 }, { wch: 14 }, { wch: 18 },
    ];
    XLSX.utils.book_append_sheet(wb, wsTable, 'Year-by-Year');

    XLSX.writeFile(wb, 'super-projection-report.xlsx');
  }

  return (
    <button
      onClick={handleExport}
      style={{
        padding: '0.6rem 1.4rem',
        fontSize: '0.9rem',
        fontWeight: 'bold',
        backgroundColor: '#1a6e3c',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        letterSpacing: '0.04em',
      }}
    >
      Export Excel
    </button>
  );
}
