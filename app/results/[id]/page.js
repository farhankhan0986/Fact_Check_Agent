import { getReport } from '@/lib/report-store';
import { notFound } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import AnalyticsCards from '@/components/results/AnalyticsCards';
import ClaimsTable from '@/components/results/ClaimsTable';
import VerificationChart from '@/components/results/VerificationChart';
import ExportButtons from '@/components/results/ExportButtons';
import Link from 'next/link';

export async function generateMetadata({ params }) {
  return { title: `Report — FactLens` };
}

export default async function ResultsPage({ params }) {
  const { id } = await params;
  const report = getReport(id);

  if (!report) notFound();

  const processedDate = new Date(report.processedAt).toLocaleString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });

  return (
    <main className="min-h-screen bg-[#09090b]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-20">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6 border-b border-[#27272a] mb-6">
          <div>
            <Link href="/dashboard" className="text-xs text-[#52525b] hover:text-[#a1a1aa] transition-colors flex items-center gap-1 mb-2">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M9 6H3M3 6L6 3M3 6L6 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              New upload
            </Link>
            <h1 className="text-xl font-semibold text-[#fafafa] tracking-tight">{report.filename}</h1>
            <p className="text-xs text-[#52525b] mt-1">{processedDate} · {report.summary.total} claims verified</p>
          </div>
          <ExportButtons report={report} />
        </div>

        <div className="mb-6">
          <AnalyticsCards summary={report.summary} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <div className="lg:col-span-2">
            <div className="border border-[#27272a] rounded-xl bg-[#111113] p-5 h-full">
              <p className="text-sm font-semibold text-[#fafafa] mb-1">Key Findings</p>
              <p className="text-xs text-[#71717a] mb-4">Claims requiring immediate attention</p>
              <div className="flex flex-col gap-2">
                {report.claims
                  .filter((c) => c.status !== 'verified')
                  .slice(0, 4)
                  .map((c) => (
                    <div key={c.id} className="flex items-start gap-3 p-3 border border-[#1f1f22] rounded-lg bg-[#18181b]">
                      <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                        c.status === 'false' ? 'bg-[#f87171]' :
                        c.status === 'inaccurate' ? 'bg-[#fb923c]' :
                        'bg-[#facc15]'
                      }`}></span>
                      <div className="min-w-0">
                        <p className="text-xs text-[#fafafa] leading-snug line-clamp-1">{c.claim}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] font-mono text-[#52525b]">Uploaded: {c.uploadedValue}</span>
                          <span className="text-[10px] text-[#3f3f46]">→</span>
                          <span className="text-[10px] font-mono text-[#a1a1aa]">Actual: {c.actualValue}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                {report.claims.filter((c) => c.status !== 'verified').length === 0 && (
                  <p className="text-sm text-[#52525b] py-4">All claims verified accurately.</p>
                )}
              </div>
            </div>
          </div>
          <div>
            <VerificationChart summary={report.summary} />
          </div>
        </div>

        <ClaimsTable claims={report.claims} />
      </div>
    </main>
  );
}
