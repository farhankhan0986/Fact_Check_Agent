'use client';

import React, { useState } from 'react';
import StatusBadge from './StatusBadge';
import ConfidenceMeter from './ConfidenceMeter';

const TYPE_LABELS = {
  statistic: 'Stat',
  date: 'Date',
  percentage: 'Pct',
  financial: '$',
  technical: 'Tech',
  historical: 'Hist',
  metric: 'KPI',
};

function TypeChip({ type }) {
  return (
    <span className="text-[10px] font-mono text-[#52525b] border border-[#27272a] rounded px-1.5 py-0.5">
      {TYPE_LABELS[type] ?? type}
    </span>
  );
}

function ExpandedRow({ claim }) {
  return (
    <tr>
      <td colSpan={7} className="pb-2 px-4">
        <div className="bg-[#18181b] border border-[#27272a] rounded-lg p-4 mb-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-xs font-medium text-[#52525b] uppercase tracking-wider mb-2">Explanation</p>
              <p className="text-sm text-[#a1a1aa] leading-relaxed">{claim.explanation}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-[#52525b] uppercase tracking-wider mb-2">Sources</p>
              <div className="flex flex-col gap-2">
                {claim.sources?.slice(0, 3).map((s, i) => (
                  <a
                    key={i}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-2 group"
                  >
                    <span className="text-xs text-[#52525b] mt-0.5">[{i + 1}]</span>
                    <div>
                      <p className="text-xs text-[#a1a1aa] group-hover:text-[#fafafa] transition-colors leading-snug">{s.title}</p>
                      <p className="text-[10px] text-[#52525b] truncate max-w-xs">{s.url}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
          {claim.sources?.[0]?.snippet && (
            <div className="border-t border-[#27272a] pt-3">
              <p className="text-xs font-medium text-[#52525b] uppercase tracking-wider mb-1.5">Evidence Snippet</p>
              <p className="text-xs text-[#71717a] leading-relaxed italic">"{claim.sources[0].snippet}"</p>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}

export default function ClaimsTable({ claims }) {
  const [expanded, setExpanded] = useState(null);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortField, setSortField] = useState('confidence');
  const [sortDir, setSortDir] = useState('desc');

  const handleSort = (field) => {
    if (sortField === field) setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDir('desc'); }
  };

  const filtered = claims
    .filter((c) => {
      const matchSearch = c.claim.toLowerCase().includes(search.toLowerCase());
      const matchStatus = filterStatus === 'all' || c.status === filterStatus;
      return matchSearch && matchStatus;
    })
    .sort((a, b) => {
      let va = a[sortField], vb = b[sortField];
      if (typeof va === 'string') return sortDir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
      return sortDir === 'asc' ? va - vb : vb - va;
    });

  const SortIcon = ({ field }) => (
    <span className={`ml-1 text-[10px] ${sortField === field ? 'text-[#a1a1aa]' : 'text-[#3f3f46]'}`}>
      {sortField === field ? (sortDir === 'asc' ? '↑' : '↓') : '↕'}
    </span>
  );

  return (
    <div className="border border-[#27272a] rounded-xl bg-[#111113] overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 border-b border-[#27272a]">
        <p className="text-sm font-semibold text-[#fafafa]">
          Claims Table <span className="text-[#52525b] font-normal ml-1">({filtered.length})</span>
        </p>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search claims..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="text-xs bg-[#18181b] border border-[#27272a] rounded-md px-3 py-1.5 text-[#fafafa] placeholder:text-[#52525b] focus:outline-none focus:border-[#3f3f46] w-full sm:w-52"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-xs bg-[#18181b] border border-[#27272a] rounded-md px-3 py-1.5 text-[#a1a1aa] focus:outline-none focus:border-[#3f3f46]"
          >
            <option value="all">All statuses</option>
            <option value="verified">Verified</option>
            <option value="inaccurate">Inaccurate</option>
            <option value="outdated">Outdated</option>
            <option value="false">False</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#27272a]">
              <th className="text-left text-xs font-medium text-[#52525b] px-4 py-3 w-8">#</th>
              <th className="text-left text-xs font-medium text-[#52525b] px-4 py-3 min-w-[220px]">
                <button onClick={() => handleSort('claim')} className="flex items-center hover:text-[#a1a1aa] transition-colors">
                  Claim <SortIcon field="claim" />
                </button>
              </th>
              <th className="text-left text-xs font-medium text-[#52525b] px-4 py-3">Type</th>
              <th className="text-left text-xs font-medium text-[#52525b] px-4 py-3">Status</th>
              <th className="text-left text-xs font-medium text-[#52525b] px-4 py-3 min-w-[100px]">
                <button onClick={() => handleSort('confidence')} className="flex items-center hover:text-[#a1a1aa] transition-colors">
                  Confidence <SortIcon field="confidence" />
                </button>
              </th>
              <th className="text-left text-xs font-medium text-[#52525b] px-4 py-3">Uploaded</th>
              <th className="text-left text-xs font-medium text-[#52525b] px-4 py-3">Actual</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((claim, i) => (
              <React.Fragment key={claim.id}>
                <tr
                  className="border-b border-[#1f1f22] hover:bg-[#18181b] cursor-pointer transition-colors"
                  onClick={() => setExpanded(expanded === claim.id ? null : claim.id)}
                >
                  <td className="px-4 py-3 text-xs text-[#52525b] tabular-nums">{i + 1}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className={`w-3 h-3 shrink-0 transition-transform ${expanded === claim.id ? 'rotate-90' : ''}`}>
                        <svg viewBox="0 0 8 8" fill="none" className="w-3 h-3">
                          <path d="M2 1L6 4L2 7" stroke="#52525b" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <p className="text-xs text-[#fafafa] leading-snug line-clamp-2">{claim.claim}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3"><TypeChip type={claim.type} /></td>
                  <td className="px-4 py-3"><StatusBadge status={claim.status} /></td>
                  <td className="px-4 py-3"><ConfidenceMeter confidence={claim.confidence} /></td>
                  <td className="px-4 py-3 font-mono text-xs text-[#a1a1aa]">{claim.uploadedValue}</td>
                  <td className="px-4 py-3 font-mono text-xs text-[#fafafa]">{claim.actualValue}</td>
                </tr>
                {expanded === claim.id && <ExpandedRow claim={claim} />}
              </React.Fragment>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-sm text-[#52525b]">
                  No claims match your filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
