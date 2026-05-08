'use client';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = {
  verified: '#4ade80',
  inaccurate: '#fb923c',
  false: '#f87171',
  outdated: '#facc15',
};

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#18181b] border border-[#27272a] rounded-lg px-3 py-2">
      <p className="text-xs font-medium text-[#fafafa] capitalize">{payload[0].name}</p>
      <p className="text-xs text-[#a1a1aa]">{payload[0].value} claims</p>
    </div>
  );
};

export default function VerificationChart({ summary }) {
  const data = [
    { name: 'verified', value: summary.verified },
    { name: 'inaccurate', value: summary.inaccurate },
    { name: 'false', value: summary.false },
    { name: 'outdated', value: summary.outdated },
  ].filter((d) => d.value > 0);

  return (
    <div className="border border-[#27272a] rounded-xl bg-[#111113] p-5">
      <p className="text-sm font-semibold text-[#fafafa] mb-1">Verification Distribution</p>
      <p className="text-xs text-[#71717a] mb-5">Breakdown of claim verification outcomes</p>

      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={COLORS[entry.name]} opacity={0.85} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            formatter={(v) => <span className="text-xs text-[#a1a1aa] capitalize">{v}</span>}
            iconType="circle"
            iconSize={8}
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-[#27272a]">
        {data.map((d) => (
          <div key={d.name} className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: COLORS[d.name] }}></span>
            <span className="text-xs text-[#71717a] capitalize">{d.name}</span>
            <span className="text-xs font-medium text-[#fafafa] ml-auto">{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
