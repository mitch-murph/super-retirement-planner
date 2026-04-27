import { PDFDownloadLink } from '@react-pdf/renderer';
import ReportDocument from './ReportDocument';
import type { ReportInputs } from './ReportDocument';
import type { ProjectionRow } from '../engine/projection';

interface PDFExportButtonProps {
  inputs: ReportInputs;
  rows: ProjectionRow[];
  retirementBalance: number;
  annualRetirementIncome: number;
  balanceWithoutVoluntary: number;
}

export default function PDFExportButton({ inputs, rows, retirementBalance, annualRetirementIncome, balanceWithoutVoluntary }: PDFExportButtonProps) {
  const doc = (
    <ReportDocument
      inputs={inputs}
      rows={rows}
      retirementBalance={retirementBalance}
      annualRetirementIncome={annualRetirementIncome}
      balanceWithoutVoluntary={balanceWithoutVoluntary}
    />
  );

  return (
    <PDFDownloadLink document={doc} fileName="super-projection-report.pdf">
      {({ loading }) => (
        <button
          disabled={loading}
          style={{
            padding: '0.6rem 1.4rem',
            fontSize: '0.9rem',
            fontWeight: 'bold',
            backgroundColor: loading ? '#ccc' : '#111',
            color: '#fff',
            border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer',
            letterSpacing: '0.04em',
          }}
        >
          {loading ? 'Preparing PDF…' : 'Export PDF Report'}
        </button>
      )}
    </PDFDownloadLink>
  );
}
