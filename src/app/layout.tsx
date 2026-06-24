import type { Metadata } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const hubspotPortalId = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID;

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Creative Space Construction | Remodeling & Repair in Connecticut",
    template: "%s | Creative Space Construction",
  },
  description:
    "Owner-operated remodeling, basements, decks, and repair in Connecticut. Licensed & insured. Free estimates — no pressure, no runaround.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Creative Space Construction",
    title: "Creative Space Construction | Remodeling & Repair in Connecticut",
    description:
      "Owner-operated remodeling, basements, decks, and repair in Connecticut. Licensed & insured. Free estimates.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${barlow.variable} ${barlowCondensed.variable}`}
    >
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        {hubspotPortalId && (
          <Script
            id="hs-script-loader"
            src={`//js.hs-scripts.com/${hubspotPortalId}.js`}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
