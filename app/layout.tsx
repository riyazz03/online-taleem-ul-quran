import type { Metadata, Viewport } from "next";
import { Amiri, Instrument_Serif, Manrope } from "next/font/google";
import "./globals.css";
import { site, siteUrl } from "@/lib/site";
import { Providers } from "@/components/motion/Providers";
import { ScrollProgress } from "@/components/motion/Interactive";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { SvgDefs } from "@/components/ui/Brand";
import { SiteJsonLd } from "@/components/seo/SiteJsonLd";
import { Analytics } from "@/components/analytics/Analytics";

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const arabic = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Online Taleem ul Quran — Learn the Quran online with expert tutors",
    template: "%s · Online Taleem ul Quran",
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "online Quran classes",
    "learn Quran online",
    "online Tajweed course",
    "Quran memorization online",
    "Hifz classes online",
    "Quran recitation course",
    "female Quran teacher",
    "Quran classes for kids",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#f8f5ef",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} ${arabic.variable}`}>
      <body className="min-h-dvh overflow-x-clip">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-brand-900 focus:px-5 focus:py-3 focus:text-cream"
        >
          Skip to content
        </a>
        <SvgDefs />
        <SiteJsonLd />
        <Providers>
          <ScrollProgress />
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <WhatsAppFab />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
