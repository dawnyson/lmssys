import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Wrapper from "@/components/Wrapper";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LMS",
  description: "Leaning Management System",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico"
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:3000"
  )
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class">
          <Wrapper>
            <div className="flex flex-col h-screen w-full">
              <Navbar />
              <main className="flex-col flex-1 h-full overflow-y-auto">
                {children}
              </main>
              <Footer />
            </div>
          </Wrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}