import type { Metadata } from "next";
import { Almendra, Alegreya_Sans } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/contexts/AppContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const display = Almendra({
  variable: "--font-display",
  weight: ["400", "700"],
  subsets: ["latin", "latin-ext"],
});

const body = Alegreya_Sans({
  variable: "--font-body",
  weight: ["400", "500", "700"],
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Plumya Network • Minecraft Sunucusu",
  description: "Plumya Minecraft Network — 1.20+ Java & Bedrock destekli emek Survival ve SkyBlock topluluk sunucusu.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${display.variable} ${body.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col relative">
        <AppProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
