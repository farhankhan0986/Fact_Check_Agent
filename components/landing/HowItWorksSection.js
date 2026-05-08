const STEPS = [
  {
    num: '01',
    title: 'Upload your PDF',
    desc: 'Drag and drop any PDF — marketing report, research paper, article, or financial document.',
  },
  {
    num: '02',
    title: 'AI extracts claims',
    desc: 'LLaMA 3 scans every paragraph and extracts all verifiable factual statements with their specific values.',
  },
  {
    num: '03',
    title: 'Live web search',
    desc: 'Each claim is searched across the live web via Tavily, retrieving fresh data from authoritative sources.',
  },
  {
    num: '04',
    title: 'LLM verifies & classifies',
    desc: 'A second Groq call cross-references evidence with the claim and returns a structured verdict with confidence score.',
  },
  {
    num: '05',
    title: 'Report generated',
    desc: 'A complete fact-check report with status badges, corrected facts, source links, and exportable data.',
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto border-t border-[#27272a]">
      <div className="max-w-xl mb-12">
        <p className="text-xs text-[#52525b] uppercase tracking-widest mb-3 font-medium">Process</p>
        <h2 className="text-3xl font-semibold text-[#fafafa] tracking-tight">How it works</h2>
        <p className="mt-3 text-[#71717a] text-base leading-relaxed">
          A fully automated pipeline from upload to verified report — no manual steps required.
        </p>
      </div>

      <div className="flex flex-col gap-0 max-w-2xl">
        {STEPS.map((step, i) => (
          <div key={i} className="flex gap-6 group">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full border border-[#27272a] bg-[#111113] flex items-center justify-center shrink-0 group-hover:border-[#3f3f46] transition-colors">
                <span className="text-xs font-mono text-[#52525b]">{step.num}</span>
              </div>
              {i < STEPS.length - 1 && <div className="w-px flex-1 bg-[#27272a] my-2"></div>}
            </div>
            <div className="pb-8">
              <h3 className="text-sm font-semibold text-[#fafafa] mb-1.5 mt-1">{step.title}</h3>
              <p className="text-sm text-[#71717a] leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
