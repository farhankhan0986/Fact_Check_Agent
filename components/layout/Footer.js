import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-[#27272a] bg-[#09090b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-[#e4e4e7] flex items-center justify-center">
            <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
              <path d="M7 1L12 4V10L7 13L2 10V4L7 1Z" fill="#09090b" />
            </svg>
          </div>
          <span className="text-sm font-medium text-[#fafafa]">FactLens</span>
          <span className="text-sm text-[#52525b] ml-2">AI-Powered Fact Verification</span>
        </div>

        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="text-sm text-[#71717a] hover:text-[#fafafa] transition-colors">Dashboard</Link>
          <span className="text-sm text-[#3f3f46]">© {new Date().getFullYear()} FactLens</span>
        </div>
      </div>
    </footer>
  );
}
