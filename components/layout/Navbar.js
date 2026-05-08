'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#27272a] bg-[#09090b]/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[#e4e4e7] flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1L12 4V10L7 13L2 10V4L7 1Z" fill="#09090b" />
            </svg>
          </div>
          <span className="font-semibold text-[15px] tracking-tight text-[#fafafa]">FactLens</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="#features" className="text-sm text-[#a1a1aa] hover:text-[#fafafa] transition-colors">Features</Link>
          <Link href="#how-it-works" className="text-sm text-[#a1a1aa] hover:text-[#fafafa] transition-colors">How it works</Link>
          <Link href="/dashboard" className="text-sm bg-[#fafafa] text-[#09090b] px-3.5 py-1.5 rounded-md font-medium hover:bg-[#e4e4e7] transition-colors">
            Start Checking
          </Link>
        </nav>

        <button
          className="md:hidden p-2 text-[#a1a1aa]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M1 1L17 17M17 1L1 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2 5H16M2 9H16M2 13H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-[#27272a] bg-[#09090b] px-4 py-4 flex flex-col gap-4">
          <Link href="#features" className="text-sm text-[#a1a1aa]" onClick={() => setMobileOpen(false)}>Features</Link>
          <Link href="#how-it-works" className="text-sm text-[#a1a1aa]" onClick={() => setMobileOpen(false)}>How it works</Link>
          <Link href="/dashboard" className="text-sm bg-[#fafafa] text-[#09090b] px-3.5 py-2 rounded-md font-medium text-center" onClick={() => setMobileOpen(false)}>
            Start Checking
          </Link>
        </div>
      )}
    </header>
  );
}
