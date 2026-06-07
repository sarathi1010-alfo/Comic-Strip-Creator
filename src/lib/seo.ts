import { Metadata } from "next";
import siteConfig from "@/config.json";

/**
 * Resolves the canonical base URL for the application.
 * Priority:
 * 1. Environment variable NEXT_PUBLIC_SITE_URL (Production Canonical)
 * 2. Vercel URL (Preview deployments)
 * 3. Localhost (Development)
 */
export function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

type MetadataProps = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
};

/**
 * Standardized metadata constructor for all pages.
 * Ensures consistent canonicals, OpenGraph, and Twitter tags
 * based on the resolved production domain.
 */
export function constructMetadata({
  title,
  description,
  path,
  keywords = [],
  image = "/og-image.jpg"
}: MetadataProps): Metadata {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}${path}`;

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    keywords: [siteConfig.primaryKeyword, ...keywords],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.siteName,
      type: "website",
      images: [
        {
          url: image,
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
      images: [image],
    },
  };
}

/**
 * Standardized Schema.org generator for WebApplication type.
 */
export function generateSchemaOrg() {
  const baseUrl = getBaseUrl();
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": siteConfig.siteName,
    "url": baseUrl,
    "applicationCategory": siteConfig.toolType + "Application",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };
}

/**
 * Automated Metadata Generation Pipeline for Tools
 */
export interface ToolMetadataProps {
  toolName: string;
  cluster: string;
  primaryAction: string;
  path: string;
  keyBenefit?: string;
}

export function generateProgrammaticMetadata({
  toolName,
  cluster,
  primaryAction,
  path,
  keyBenefit = "free, no sign-up required"
}: ToolMetadataProps): Metadata {
  const titleTemplates = [
    `${toolName} — Free Online ${primaryAction} | ${siteConfig.siteName}`,
    `Free ${toolName} Tool — ${primaryAction} Instantly`,
    `${toolName}: The Best Tool to ${primaryAction}`
  ];

  const descTemplates = [
    `Use our free ${toolName} to ${primaryAction} online. ${keyBenefit.charAt(0).toUpperCase() + keyBenefit.slice(1)}. Fast, secure, and accurate.`,
    `Need to ${primaryAction}? The ${toolName} from ${siteConfig.siteName} is the perfect solution. ${keyBenefit.charAt(0).toUpperCase() + keyBenefit.slice(1)}.`
  ];

  // Auto-select shortest title that conveys meaning to prevent truncation
  const title = titleTemplates.reduce((a, b) => a.length <= b.length ? a : b);
  // Auto-select shortest valid description
  const description = descTemplates.reduce((a, b) => a.length <= b.length ? a : b);

  return constructMetadata({
    title,
    description,
    path,
    keywords: [toolName.toLowerCase(), cluster.toLowerCase(), primaryAction.toLowerCase()]
  });
}

/**
 * Generates FAQ Schema specifically optimized for AI Overviews
 */
export function generateFAQSchema(faqs: { question: string, answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}
