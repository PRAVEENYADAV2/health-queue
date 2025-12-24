"use client";

import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { QueueProvider } from "./context/QueueContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased text-slate-900`}>
        <QueueProvider>
          <Navbar />
          <main className="min-h-[calc(100vh-64px)]">
            {children}
          </main>
          <Footer />
        </QueueProvider>
      </body>
    </html>
  );
}

function Navbar() {
  const pathname = usePathname();
  const isHidden = ["/login", "/signup"].includes(pathname);

  if (isHidden) return null;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl medical-gradient text-white shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 font-outfit">Health<span className="text-sky-600">Queue</span></span>
        </Link>
        <div className="hidden md:flex md:items-center md:gap-8">
          <Link href="/book" className={`text-sm font-medium transition-colors hover:text-sky-600 ${pathname === '/book' ? 'text-sky-600' : 'text-slate-600'}`}>Book Appointment</Link>
          <Link href="/queue" className={`text-sm font-medium transition-colors hover:text-sky-600 ${pathname === '/queue' ? 'text-sky-600' : 'text-slate-600'}`}>Live Queue</Link>
          <Link href="/login" className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-slate-800 hover:shadow-md active:scale-95">Doctor Portal</Link>
        </div>
        <button className="md:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
        </button>
      </div>
    </nav>
  );
}

function Footer() {
  const pathname = usePathname();
  if (["/login", "/signup", "/doctor"].includes(pathname)) return null;

  return (
    <footer className="border-t border-slate-200 bg-white py-8">
      <div className="mx-auto max-w-7xl px-4 text-center text-sm text-slate-500">
        © 2025 HealthQueue Digital Triage System. Interoperable with ABDM & HL7 FHIR.
      </div>
    </footer>
  );
}
