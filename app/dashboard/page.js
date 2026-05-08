import Navbar from '@/components/layout/Navbar';
import UploadZone from '@/components/dashboard/UploadZone';

export const metadata = {
  title: 'Dashboard — FactLens',
  description: 'Upload a PDF to begin AI-powered fact verification.',
};

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#09090b]">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-24 pb-20">
        <div className="mb-10">
          <p className="text-xs text-[#52525b] uppercase tracking-widest mb-2 font-medium">Dashboard</p>
          <h1 className="text-2xl font-semibold text-[#fafafa] tracking-tight mb-2">Upload Document</h1>
          <p className="text-sm text-[#71717a]">
            Upload a PDF and the system will extract all factual claims and verify them against live web sources.
          </p>
        </div>

        <div className="border border-[#27272a] rounded-xl bg-[#111113] p-6 sm:p-8 mb-6">
          <UploadZone />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { label: 'Marketing reports', desc: 'Catch inflated stats and outdated figures' },
            { label: 'Research papers', desc: 'Verify citations and statistical claims' },
            { label: 'News articles', desc: 'Detect hallucinated or false information' },
          ].map((item) => (
            <div key={item.label} className="border border-[#27272a] rounded-lg p-4 bg-[#111113]">
              <p className="text-xs font-semibold text-[#fafafa] mb-1">{item.label}</p>
              <p className="text-xs text-[#71717a]">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
