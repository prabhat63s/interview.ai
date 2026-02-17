import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Interview Platform",
  description: "Next-generation technical assessment platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen relative overflow-x-hidden bg-mesh`}
      >
        {/* Global Scanline Effect */}
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          <div className="scanline" />
        </div>

        {/* Neural Network Background Elements */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-cyan-500/10 rounded-full blur-[150px] animate-pulse-slow" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-purple-600/10 rounded-full blur-[150px] animate-pulse-slow" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        </div>

        <main className="relative z-10">
          {children}
        </main>

        <footer className="relative z-10 py-8 border-t border-white/5">
          <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-4">
            <div className="flex items-center text-sm font-medium gap-2">
              <span className="text-gray-500">© {new Date().getFullYear()}</span>
              <a
                href="https://prabhat-singh-portfolio.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-400 transition-colors"
              >
                Prabhat
              </a>
              <span className="text-gray-700">|</span>
              <span className="text-gray-500">AI Interview Platform</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
