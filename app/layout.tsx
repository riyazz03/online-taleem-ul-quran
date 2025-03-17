"use client"; // Keep this for using Lenis

import { useEffect, useRef } from "react";
import { Inter, DM_Sans } from "next/font/google";
import Lenis from "@studio-freight/lenis";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const lenis = new Lenis({
        smoothWheel: true,
        lerp: 0.1,
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
      lenisRef.current = lenis;

      return () => {
        lenis.destroy();
      };
    }
  }, []);

  return (
    <html lang="en">
      <body className={`${inter.variable} ${dmSans.variable} antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
