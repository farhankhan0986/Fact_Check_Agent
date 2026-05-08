'use client';

import { generateJSONReport, generateCSVReport } from '@/utils/report-generator';

export default function ExportButtons({ report }) {
  const handleJSON = () => {
    const json = generateJSONReport(report);
    const blob = new Blob([json], { type: 'application/json' });
    download(blob, `factlens-${report.id.slice(0, 8)}.json`);
  };

  const handleCSV = () => {
    const csv = generateCSVReport(report);
    const blob = new Blob([csv], { type: 'text/csv' });
    download(blob, `factlens-${report.id.slice(0, 8)}.csv`);
  };

  const download = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleCSV}
        className="flex items-center gap-1.5 border border-[#27272a] text-[#a1a1aa] text-xs px-3 py-1.5 rounded-md hover:text-[#fafafa] hover:border-[#3f3f46] transition-colors"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M6 1V8M6 8L3 5M6 8L9 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M1 9V10.5C1 10.8 1.2 11 1.5 11H10.5C10.8 11 11 10.8 11 10.5V9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        Export CSV
      </button>
      <button
        onClick={handleJSON}
        className="flex items-center gap-1.5 border border-[#27272a] text-[#a1a1aa] text-xs px-3 py-1.5 rounded-md hover:text-[#fafafa] hover:border-[#3f3f46] transition-colors"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M6 1V8M6 8L3 5M6 8L9 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M1 9V10.5C1 10.8 1.2 11 1.5 11H10.5C10.8 11 11 10.8 11 10.5V9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        Export JSON
      </button>
    </div>
  );
}
