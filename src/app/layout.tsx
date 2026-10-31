import type { Metadata } from "next";
import { Inter, Comic_Neue, Bangers } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import Script from "next/script";
import { resolveMetadata } from "@/lib/seo/resolveMetadata";
import { buildLandingMeta } from "@/lib/seo/metaFactories";
import { buildOrganizationSchema, buildWebsiteSchema } from "@/lib/seo/buildSchema";
import { JsonLd } from "@/components/JsonLd";

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

const description = "Create stunning comic strips in minutes — no design skills required. Free online comic maker with custom panels, speech bubbles, and assets.";

export const metadata: Metadata = {
  ...resolveMetadata(buildLandingMeta({
    title: "Comic Strip Creator — Free Online Comic Maker",
    description,
    slug: "/",
    faqs: []
  }), true),
  other: {
    "google-adsense-account": "ca-pub-6393936268623951"
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  // Use dark mode by default for the creator aesthetic
  return (
    <html lang="en" className="dark">
      <head>
        {/* Core Web Vitals SEO Signals */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />



        <JsonLd schema={buildOrganizationSchema()} />
        <JsonLd schema={buildWebsiteSchema()} />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HZQ3QT11QC"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HZQ3QT11QC', {
              cookie_domain: 'auto'
            });
          `}
        </Script>
      </head>
      <body
        className={`${inter.variable} ${comicNeue.variable} ${bangers.variable} antialiased font-sans bg-background text-foreground`}
      >
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
