import type { SeoMeta } from '@/types/seo';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://comicflow.alfo.online';
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? 'Comic Strip Creator';

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": SITE_NAME,
    "url": BASE_URL,
    "logo": `${BASE_URL}/logo.png`,
    "sameAs": []
  };
}

export function buildWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": SITE_NAME,
    "url": BASE_URL,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${BASE_URL}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
}

export function buildBreadcrumbSchema(items: Array<{ label: string; href: string }>) {
  if (!items || items.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": `${BASE_URL}${item.href.startsWith('/') ? item.href : `/${item.href}`}`
    }))
  };
}

export function buildArticleSchema(meta: SeoMeta) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": meta.title,
    "description": meta.description,
    "image": meta.ogImage ? meta.ogImage.url : `${BASE_URL}/og-image.jpg`,
    "author": meta.author ? {
      "@type": "Person",
      "name": meta.author.name,
      ...(meta.author.url ? { "url": meta.author.url } : {})
    } : {
      "@type": "Organization",
      "name": SITE_NAME
    },
    "publisher": {
      "@type": "Organization",
      "name": SITE_NAME,
      "logo": {
        "@type": "ImageObject",
        "url": `${BASE_URL}/logo.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": meta.canonical || `${BASE_URL}${meta.slug.startsWith('/') ? meta.slug : `/${meta.slug}`}`
    },
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", ".ai-snapshot", ".tldr"]
    }
  };

  if (meta.publishedAt) schema.datePublished = meta.publishedAt;
  if (meta.updatedAt) schema.dateModified = meta.updatedAt;

  return schema;
}

export function buildProductSchema(meta: SeoMeta) {
  if (!meta.productData) return null;

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": meta.productData.name || meta.title,
    "description": meta.description,
    "image": meta.ogImage ? meta.ogImage.url : `${BASE_URL}/og-image.jpg`,
    "offers": {
      "@type": "Offer",
      "url": meta.canonical || `${BASE_URL}${meta.slug.startsWith('/') ? meta.slug : `/${meta.slug}`}`,
      "priceCurrency": meta.productData.currency,
      "price": meta.productData.price,
      "availability": `https://schema.org/${meta.productData.availability}`
    }
  };

  if (meta.productData.brand) {
    schema.brand = {
      "@type": "Brand",
      "name": meta.productData.brand
    };
  }

  if (meta.productData.sku) {
    schema.sku = meta.productData.sku;
  }

  if (meta.productData.ratingValue && meta.productData.reviewCount) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      "ratingValue": meta.productData.ratingValue,
      "reviewCount": meta.productData.reviewCount
    };
  }

  return schema;
}

export function buildFaqSchema(items?: Array<{ question: string; answer: string }>) {
  if (!items || items.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };
}

export function buildAuthorSchema(meta: SeoMeta) {
  if (!meta.author) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": meta.author.name,
    "url": meta.author.url || `${BASE_URL}${meta.slug.startsWith('/') ? meta.slug : `/${meta.slug}`}`
  };
}

export function buildSitelinksSearchBoxSchema() {
  return buildWebsiteSchema();
}

export function buildHowToSchema(meta: SeoMeta) {
  if (!meta.steps || meta.steps.length === 0) return null;

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": meta.title,
    "description": meta.description,
    "step": meta.steps.map((s, i) => ({
      "@type": "HowToStep",
      "position": i + 1,
      "name": s.heading,
      "text": s.body,
      ...(s.image ? { "image": s.image.url } : {})
    }))
  };

  if (meta.estimatedTime) {
    schema.totalTime = meta.estimatedTime;
  }

  return schema;
}
