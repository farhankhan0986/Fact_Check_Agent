const CONFIG = {
  verified: { label: 'Verified', cls: 'badge-verified' },
  outdated: { label: 'Outdated', cls: 'badge-outdated' },
  inaccurate: { label: 'Inaccurate', cls: 'badge-inaccurate' },
  false: { label: 'False', cls: 'badge-false' },
};

export default function StatusBadge({ status }) {
  const c = CONFIG[status] ?? CONFIG.inaccurate;
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full ${c.cls}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80"></span>
      {c.label}
    </span>
  );
}
