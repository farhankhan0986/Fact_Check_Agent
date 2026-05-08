import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 border border-[#27272a] rounded-full px-3 py-1 mb-8 bg-[#111113]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]"></span>
          <span className="text-xs text-[#a1a1aa] tracking-wide">Powered by Groq · Tavily · LLaMA 3.3</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#fafafa] leading-[1.1] mb-6">
          AI-Powered Truth
          <br />
          <span className="text-[#71717a]">Verification for PDFs</span>
        </h1>

        <p className="text-lg text-[#71717a] leading-relaxed mb-10 max-w-2xl mx-auto">
          Upload any document and instantly detect fake, outdated, or hallucinated claims using live web verification. Built for accuracy — not speed theatre.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto bg-[#fafafa] text-[#09090b] px-6 py-2.5 rounded-md font-medium text-sm hover:bg-[#e4e4e7] transition-colors"
          >
            Start Fact Checking
          </Link>
          <a
            href="#how-it-works"
            className="w-full sm:w-auto border border-[#27272a] text-[#a1a1aa] px-6 py-2.5 rounded-md text-sm hover:text-[#fafafa] hover:border-[#3f3f46] transition-colors"
          >
            See how it works
          </a>
        </div>
      </div>

      <div className="mt-16 border border-[#27272a] rounded-xl bg-[#111113] overflow-hidden max-w-4xl mx-auto">
        <div className="border-b border-[#27272a] px-4 py-3 flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3f3f46]"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#3f3f46]"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#3f3f46]"></span>
          </div>
          <span className="text-xs text-[#52525b] ml-2">factlens — verification report</span>
        </div>

        <div className="p-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left">
                <th className="text-[#52525b] font-medium pb-3 pr-4 w-1/3">Claim</th>
                <th className="text-[#52525b] font-medium pb-3 pr-4">Uploaded</th>
                <th className="text-[#52525b] font-medium pb-3 pr-4">Actual</th>
                <th className="text-[#52525b] font-medium pb-3 pr-4">Status</th>
                <th className="text-[#52525b] font-medium pb-3">Confidence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1f1f22]">
              {PREVIEW_ROWS.map((row, i) => (
                <tr key={i}>
                  <td className="py-3 pr-4 text-[#a1a1aa] text-xs leading-snug">{row.claim}</td>
                  <td className="py-3 pr-4 text-[#fafafa] font-mono text-xs">{row.uploaded}</td>
                  <td className="py-3 pr-4 text-[#fafafa] font-mono text-xs">{row.actual}</td>
                  <td className="py-3 pr-4">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${row.badgeClass}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1 bg-[#27272a] rounded-full overflow-hidden">
                        <div className="h-full bg-[#a1a1aa] rounded-full" style={{ width: row.confidence }}></div>
                      </div>
                      <span className="text-xs text-[#71717a]">{row.confidence}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

const PREVIEW_ROWS = [
  { claim: 'India had 900M internet users in 2022', uploaded: '900M', actual: '759M', status: 'Inaccurate', badgeClass: 'badge-inaccurate', confidence: '84%' },
  { claim: 'ChatGPT reached 100M users in Jan 2023', uploaded: '100M', actual: '100M', status: 'Verified', badgeClass: 'badge-verified', confidence: '96%' },
  { claim: 'Global AI market: $407B by 2027', uploaded: '$407B', actual: '$738.8B', status: 'Outdated', badgeClass: 'badge-outdated', confidence: '79%' },
  { claim: 'Remote work boosted productivity 47%', uploaded: '47%', actual: 'Disputed', status: 'False', badgeClass: 'badge-false', confidence: '91%' },
];
