import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata = {
  title: 'FactLens — AI-Powered PDF Fact Checker',
  description: 'Upload any PDF and instantly verify factual claims against live web data using advanced AI.',
  keywords: 'fact check, AI, PDF, verification, misinformation',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
