import type { Metadata } from "next";
import { Inter, Comic_Neue, Bangers } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GoogleAnalytics } from '@next/third-parties/google';
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

const title = "Free Comic Strip Creator | Make Online Comics - ComicFlow";
const description =
  "Free comic strip creator to make custom webcomics and storyboards online. Drag-and-drop panels, speech bubbles, and instant high-res PNG export easily.";

export const metadata: Metadata = {
  metadataBase: new URL("https://comicflow.alfo.online"),
  title,
  description,
  keywords: [
    "free comic strip creator",
    "online comic maker",
    "comic panel generator",
    "create comic strip free",
    "webcomic maker no sign up",
    "ComicFlow",
  ],
  alternates: {
    canonical: "https://comicflow.alfo.online/",
  },
  openGraph: {
    title,
    description,
    url: "https://comicflow.alfo.online/",
    siteName: "ComicFlow",
    type: "website",
    images: [
      {
        url: "https://comicflow.alfo.online/assets/comic-preview.png",
        width: 1200,
        height: 630,
        alt: "Free Comic Strip Creator - ComicFlow",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["https://comicflow.alfo.online/assets/comic-preview.png"],
  },
  other: {
    "google-adsense-account": "ca-pub-6393936268623951",
  },
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "ComicFlow Free Comic Strip Creator",
  url: "https://comicflow.alfo.online",
  description:
    "Create custom comic strips online for free with drag-and-drop panels and speech bubbles.",
  applicationCategory: "DesignApplication",
  operatingSystem: "All",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Create Comic Strips with ComicFlow",
  description:
    "A 4-step guide to creating and downloading custom online comic strips.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Choose Panel Layout",
      text: "Select from 1, 2, 3, 4, or 6-panel grid templates or customize panel proportions.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Add Characters & Props",
      text: "Place illustrated characters, expressive facial expressions, backgrounds, and item props.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Insert Speech Bubbles",
      text: "Drag dialogue bubbles, shout balloons, and thought clouds with custom comic lettering.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Download & Share",
      text: "Export high-resolution PNG, JPG, or PDF comics formatted for print or web publication.",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is ComicFlow free to create and download comics?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, ComicFlow is completely free with no hidden paywalls, watermark restrictions, or mandatory user accounts.",
      },
    },
    {
      "@type": "Question",
      name: "Can I upload my own custom illustrations and photos?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, you can upload your own PNG, JPG, or SVG drawings and photos directly into any panel on your comic canvas.",
      },
    },
    {
      "@type": "Question",
      name: "What export formats are supported?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ComicFlow supports high-resolution PNG, JPEG, and PDF exports, optimized for Instagram carousels, webcomics, and printable worksheets.",
      },
    },
    {
      "@type": "Question",
      name: "Can teachers use ComicFlow in classrooms?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. ComicFlow is COPPA-compliant, requires no student email addresses, and is widely used for creative writing and history projects.",
      },
    },
    {
      "@type": "Question",
      name: "How do I adjust panel layouts and border widths?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Select any panel to adjust borders, gutter spacing, background colors, or aspect ratio directly from the canvas toolbar.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://comicflow.alfo.online",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Core Web Vitals SEO Signals */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />

        <JsonLd schema={buildOrganizationSchema()} />
        <JsonLd schema={buildWebsiteSchema()} />
        <JsonLd schema={webApplicationSchema} />
        <JsonLd schema={howToSchema} />
        <JsonLd schema={faqSchema} />
        <JsonLd schema={breadcrumbSchema} />
      </head>
      <body
        className={`${inter.variable} ${comicNeue.variable} ${bangers.variable} antialiased font-sans bg-background text-foreground`}
      >
        <TooltipProvider>{children}</TooltipProvider>
      </body>
      <GoogleAnalytics gaId="G-HZQ3QT11QC" />
    </html>
  );
}
