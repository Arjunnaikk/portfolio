import './globals.css';
import type { Metadata } from 'next';
import { Outfit, Plus_Jakarta_Sans } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import Navbar from '../components/Navbar';
import InteractiveBackground from '../components/InteractiveBackground';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://arjun-portfolio.vercel.app'), // TODO: replace with your real deployed URL
  alternates: {
    canonical: '/'
  },
  title: {
    default: 'Arjun Naik',
    template: '%s | Arjun Naik'
  },
  description: 'Full-stack developer, Solana builder, and computer engineering student based in Mumbai, India.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${plusJakartaSans.variable}`} data-scroll-behavior="smooth">
      <body className="antialiased tracking-tight bg-[#050505] text-zinc-100">
        <InteractiveBackground />
        <Navbar />
        <div className="relative min-h-screen overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.12),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(34,197,94,0.08),_transparent_24%)]" />
          <div className="relative flex min-h-screen flex-col justify-between px-6 pt-24 pb-28 md:px-10 md:pt-28 md:pb-10">
            <main className="mx-auto w-full max-w-4xl space-y-6">
              {children}
            </main>
            <Footer />
            <Analytics />
          </div>
        </div>
      </body>
    </html>
  );
}

function Footer() {
  const links = [
    { name: 'email', url: 'mailto:naikarjun0402@gmail.com' },
    { name: 'github', url: 'https://github.com/Arjunnaikk' },
    { name: 'linkedin', url: 'https://www.linkedin.com/in/Arjunnaikk' } // TODO: confirm this is your actual LinkedIn handle
  ];

  return (
    <footer className="mt-12 text-center">
      <div className="flex flex-wrap justify-center gap-4 tracking-tight">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-400 transition-colors duration-200 hover:border-sky-400/30 hover:text-sky-200"
          >
            {link.name}
          </a>
        ))}
      </div>
    </footer>
  );
}