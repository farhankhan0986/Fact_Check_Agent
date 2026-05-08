const STAT_CONFIG = {
  verified: { label: 'Verified', color: '#4ade80', bg: '#052e16', border: '#14532d' },
  inaccurate: { label: 'Inaccurate', color: '#fb923c', bg: '#1c0a03', border: '#7c2d12' },
  false: { label: 'False', color: '#f87171', bg: '#1c0303', border: '#7f1d1d' },
  outdated: { label: 'Outdated', color: '#facc15', bg: '#1c1003', border: '#713f12' },
};

export default function AnalyticsCards({ summary }) {
  const cards = [
    { label: 'Total Claims', value: summary.total, color: '#a1a1aa', bg: '#111113', border: '#27272a' },
    { label: 'Accuracy Rate', value: `${summary.accuracy}%`, color: '#a1a1aa', bg: '#111113', border: '#27272a' },
    { label: 'Avg Confidence', value: `${summary.avgConfidence}%`, color: '#a1a1aa', bg: '#111113', border: '#27272a' },
    { label: 'Verified', value: summary.verified, ...STAT_CONFIG.verified },
    { label: 'Inaccurate', value: summary.inaccurate, ...STAT_CONFIG.inaccurate },
    { label: 'Outdated', value: summary.outdated, ...STAT_CONFIG.outdated },
    { label: 'False', value: summary.false, ...STAT_CONFIG.false },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
      {cards.map((c) => (
        <div
          key={c.label}
          className="rounded-lg px-4 py-3"
          style={{ backgroundColor: c.bg, border: `1px solid ${c.border}` }}
        >
          <p className="text-xs font-medium mb-1.5" style={{ color: c.color }}>
            {c.label}
          </p>
          <p className="text-2xl font-semibold tracking-tight text-[#fafafa]">{c.value}</p>
        </div>
      ))}
    </div>
  );
}
