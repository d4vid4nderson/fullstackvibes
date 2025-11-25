import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { AIChat } from "@/components/AIChat";
import { ChatProvider } from "@/components/ChatContext";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "David Anderson - Full Stack Developer",
  description: "Portfolio and blog of David Anderson, a full stack developer specializing in modern web technologies.",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
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
        className={`${jetbrainsMono.variable} antialiased`}
      >
        <ThemeProvider>
          <ChatProvider>
            <div>
              {children}
              <Footer />
              <ScrollToTop />
              <AIChat />
            </div>
          </ChatProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
