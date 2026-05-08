const FEATURES = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 1L11 7H17L12 11L14 17L9 13L4 17L6 11L1 7H7L9 1Z" stroke="#a1a1aa" strokeWidth="1.3" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Claim Extraction',
    desc: 'Automatically identifies statistics, dates, percentages, financial figures, and technical claims from any PDF document.',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="7" stroke="#a1a1aa" strokeWidth="1.3" />
        <path d="M9 5V9L12 11" stroke="#a1a1aa" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
    title: 'Live Web Verification',
    desc: 'Every claim is cross-referenced against live web sources via Tavily search, ensuring results reflect current data.',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="2" width="14" height="14" rx="2" stroke="#a1a1aa" strokeWidth="1.3" />
        <path d="M5 9H13M5 6H10M5 12H8" stroke="#a1a1aa" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
    title: 'Corrected Facts',
    desc: 'Side-by-side comparison showing the uploaded value versus the verified actual figure from authoritative sources.',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M3 14L7 10L10 13L15 6" stroke="#a1a1aa" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Confidence Scoring',
    desc: 'Each claim receives a 0–100 confidence score based on source quality, consensus, and evidence strength.',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 2V6M9 12V16M2 9H6M12 9H16" stroke="#a1a1aa" strokeWidth="1.3" strokeLinecap="round" />
        <circle cx="9" cy="9" r="3" stroke="#a1a1aa" strokeWidth="1.3" />
      </svg>
    ),
    title: 'Status Classification',
    desc: 'Claims are classified as Verified, Inaccurate, Outdated, or False — with explanations and source citations.',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M4 14L4 10M9 14L9 6M14 14L14 3" stroke="#a1a1aa" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
    title: 'Analytics Report',
    desc: 'Visual breakdown of verification results with accuracy rates, claim type distribution, and export options.',
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto border-t border-[#27272a]">
      <div className="max-w-xl mb-12">
        <p className="text-xs text-[#52525b] uppercase tracking-widest mb-3 font-medium">Capabilities</p>
        <h2 className="text-3xl font-semibold text-[#fafafa] tracking-tight leading-snug">
          Designed for rigorous fact verification
        </h2>
        <p className="mt-3 text-[#71717a] text-base leading-relaxed">
          Every component is built to catch inaccurate, outdated, or fabricated claims — not just summarize content.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#27272a] border border-[#27272a] rounded-xl overflow-hidden">
        {FEATURES.map((f, i) => (
          <div key={i} className="bg-[#09090b] p-6 hover:bg-[#111113] transition-colors">
            <div className="w-8 h-8 rounded-lg bg-[#18181b] border border-[#27272a] flex items-center justify-center mb-4">
              {f.icon}
            </div>
            <h3 className="text-sm font-semibold text-[#fafafa] mb-2">{f.title}</h3>
            <p className="text-sm text-[#71717a] leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
