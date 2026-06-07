import type { Metadata } from "next";
import { Inter, Comic_Neue, Bangers } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GoogleAnalytics } from '@next/third-parties/google';

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const comicNeue = Comic_Neue({
  variable: "--font-comic",
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

const bangers = Bangers({
  variable: "--font-bangers",
  weight: "400",
  subsets: ["latin"],
});

const baseUrl = "https://comicstripcreator.alfo.online";
const title = "Comic Strip Creator — Free Online Comic Maker | alfo.online";
const description = "Create stunning comic strips in minutes — no design skills required. Free online comic maker with custom panels, speech bubbles, and assets.";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title,
  description,
  keywords: ["free comic maker", "comic strip creator", "online comic builder", "custom comics", "speech bubbles"],
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    title,
    description,
    url: baseUrl,
    siteName: "Comic Strip Creator",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.jpg"],
  },
  other: {
    "google-adsense-account": "ca-pub-6393936268623951"
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Base Schema.org JSON-LD (WebApplication)
  const schemaOrgJSONLD = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Comic Strip Creator",
    "url": baseUrl,
    "description": description,
    "applicationCategory": "DesignApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  // Use dark mode by default for the creator aesthetic
  return (
    <html lang="en" className="dark">
      <head>
        {/* Schema.org */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrgJSONLD) }}
        />
      </head>
      <body
        className={`${inter.variable} ${comicNeue.variable} ${bangers.variable} antialiased font-sans bg-background text-foreground`}
      >
        <TooltipProvider>{children}</TooltipProvider>
      </body>
      <GoogleAnalytics gaId="G-XXXXXXXXXX" />
    </html>
  );
}
