import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#09090b]">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />

      <section className="py-20 px-4 sm:px-6 border-t border-[#27272a]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-[#fafafa] tracking-tight mb-4">
            Ready to verify your document?
          </h2>
          <p className="text-[#71717a] mb-8 leading-relaxed">
            Upload any PDF and get a complete verification report in under 60 seconds.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 bg-[#fafafa] text-[#09090b] px-6 py-2.5 rounded-md font-medium text-sm hover:bg-[#e4e4e7] transition-colors"
          >
            Start Fact Checking
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7H13M8 2L13 7L8 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
