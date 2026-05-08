function getColor(confidence) {
  if (confidence >= 85) return '#4ade80';
  if (confidence >= 65) return '#facc15';
  return '#f87171';
}

export default function ConfidenceMeter({ confidence }) {
  const color = getColor(confidence);
  return (
    <div className="flex items-center gap-2 min-w-[90px]">
      <div className="flex-1 h-[3px] bg-[#27272a] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${confidence}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-xs tabular-nums" style={{ color }}>{confidence}%</span>
    </div>
  );
}
