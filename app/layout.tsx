import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Footer } from "@/components/Footer";
import { FloatingButtons } from "@/components/FloatingButtons";
import { AIChat } from "@/components/AIChat";
import { ChatProvider } from "@/components/ChatContext";
import { TerminalProvider } from "@/components/TerminalContext";
import { BackgroundOrbs } from "@/components/BackgroundOrbs";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { StructuredData } from "@/components/StructuredData";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://fullstackvibes.io'),
  title: {
    default: "David Anderson | Full Stack Developer & AI Engineer",
    template: "%s | David Anderson"
  },
  description: "Full stack developer specializing in AI-powered enterprise applications. Expert in Go, Python, TypeScript, React, and Next.js. Building tools that deliver measurable business impact.",
  keywords: [
    "David Anderson",
    "Full Stack Developer",
    "AI Engineer",
    "Go Developer",
    "Python Developer",
    "TypeScript",
    "React Developer",
    "Next.js",
    "Enterprise Applications",
    "AI-Powered Tools",
    "Software Engineer",
    "Product Owner",
    "FastAPI",
    "PostgreSQL"
  ],
  authors: [{ name: "David Anderson", url: "https://fullstackvibes.io" }],
  creator: "David Anderson",
  publisher: "David Anderson",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://fullstackvibes.io',
    siteName: 'FullStackVibes',
    title: 'David Anderson | Full Stack Developer & AI Engineer',
    description: 'Full stack developer specializing in AI-powered enterprise applications. Expert in Go, Python, TypeScript, React, and Next.js.',
    images: [
      {
        url: 'https://fullstackvibes.io/opengraph-image?v=20251207',
        width: 1200,
        height: 630,
        alt: 'David Anderson - Full Stack Developer & AI Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'David Anderson | Full Stack Developer & AI Engineer',
    description: 'Full stack developer specializing in AI-powered enterprise applications. Expert in Go, Python, TypeScript, React, and Next.js.',
    creator: '@d4vid4nderson',
    images: ['https://fullstackvibes.io/twitter-image?v=20251207'],
  },
  alternates: {
    canonical: 'https://fullstackvibes.io',
  },
  category: 'technology',
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#06b6d4' },
    { media: '(prefers-color-scheme: dark)', color: '#0f0f0f' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Favicon - PNG for better gradient support and compatibility */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

        {/* Apple Touch Icon for iOS home screen */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

        {/* Web App Manifest for Android */}
        <link rel="manifest" href="/manifest.json" />

        {/* Mobile app metadata */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="FullStackVibes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="FullStackVibes" />
        <meta name="format-detection" content="telephone=no" />

        {/* Microsoft/Windows metadata */}
        <meta name="msapplication-TileColor" content="#06b6d4" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* Additional SEO metadata */}
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="United States" />
        <link rel="author" href="https://fullstackvibes.io" />
        <link rel="me" href="https://github.com/d4vid4nderson" />
        <link rel="me" href="https://linkedin.com/in/d4v1d4nd3rs0n" />

        {/* Structured Data for SEO */}
        <StructuredData />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const mode = localStorage.getItem('mode') || 'dark';
                  const theme = localStorage.getItem('colorTheme') || 'cyan';
                  if (mode === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${jetbrainsMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider>
          <ChatProvider>
            <TerminalProvider>
              <BackgroundOrbs />
              <div className="flex-1 relative z-10">
                {children}
              </div>
              <Footer />
              <FloatingButtons />
              <AIChat />
            </TerminalProvider>
          </ChatProvider>
        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
