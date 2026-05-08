'use client';

const STEPS = [
  { label: 'Extracting text from PDF', desc: 'Parsing document structure' },
  { label: 'Identifying factual claims', desc: 'LLaMA 3 scanning for verifiable statements' },
  { label: 'Searching live web sources', desc: 'Tavily retrieving current evidence' },
  { label: 'Verifying & classifying claims', desc: 'Groq cross-referencing evidence' },
];

export default function ProcessingSteps({ progress, filename }) {
  const activeStep = Math.floor((progress / 100) * STEPS.length);

  return (
    <div className="max-w-sm mx-auto w-full">
      <div className="text-center mb-8">
        <div className="w-10 h-10 rounded-full border border-[#27272a] bg-[#111113] flex items-center justify-center mx-auto mb-4">
          <div className="w-4 h-4 rounded-full border-2 border-t-[#fafafa] border-[#3f3f46] animate-spin"></div>
        </div>
        <p className="text-sm font-medium text-[#fafafa]">Verifying claims</p>
        <p className="text-xs text-[#71717a] mt-1 truncate max-w-xs mx-auto">{filename}</p>
      </div>

      <div className="w-full bg-[#27272a] rounded-full h-0.5 mb-8 overflow-hidden">
        <div
          className="h-full bg-[#fafafa] rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="flex flex-col gap-3">
        {STEPS.map((step, i) => {
          const done = i < activeStep;
          const active = i === activeStep;
          return (
            <div
              key={i}
              className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                active ? 'border-[#3f3f46] bg-[#18181b]' : done ? 'border-[#1f1f22]' : 'border-transparent'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border ${
                  done ? 'bg-[#14532d] border-[#14532d]' : active ? 'border-[#3f3f46] bg-[#27272a]' : 'border-[#27272a]'
                }`}
              >
                {done ? (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5L4 7L8 3" stroke="#4ade80" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : active ? (
                  <div className="w-1.5 h-1.5 rounded-full bg-[#a1a1aa] animate-pulse"></div>
                ) : null}
              </div>
              <div>
                <p className={`text-xs font-medium ${active ? 'text-[#fafafa]' : done ? 'text-[#71717a]' : 'text-[#3f3f46]'}`}>
                  {step.label}
                </p>
                {active && <p className="text-xs text-[#52525b] mt-0.5">{step.desc}</p>}
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-center text-xs text-[#52525b] mt-6">{Math.round(progress)}% complete</p>
    </div>
  );
}
