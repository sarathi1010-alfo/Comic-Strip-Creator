import type { Metadata } from 'next';
import type { SeoMeta } from '@/types/seo';
import { formatTitle } from './formatTitle';
import { buildCanonical } from './buildCanonical';

const DEFAULT_LOCALE = process.env.NEXT_PUBLIC_DEFAULT_LOCALE ?? 'en';

export function resolveMetadata(meta: SeoMeta, isHomepage = false): Metadata {
  const canonical = meta.canonical ?? buildCanonical(meta.slug);
  const title = formatTitle(meta.title, isHomepage);

  return {
    title,
    description: meta.description,
    alternates: {
      canonical,
      languages: meta.alternateLocales
        ? Object.fromEntries(meta.alternateLocales.map(a => [a.locale, a.url]))
        : undefined,
    },
    robots: {
      index: !meta.noindex,
      follow: !meta.nofollow,
      googleBot: {
        index: !meta.noindex,
        follow: !meta.nofollow,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    openGraph: {
      title,
      description: meta.description,
      url: canonical,
      siteName: process.env.NEXT_PUBLIC_SITE_NAME ?? 'Comic Strip Creator',
      type: meta.pageType === 'article' ? 'article' : 'website',
      images: meta.ogImage
        ? [{ url: meta.ogImage.url, width: meta.ogImage.width ?? 1200,
             height: meta.ogImage.height ?? 630, alt: meta.ogImage.alt }]
        : undefined,
      publishedTime: meta.publishedAt,
      modifiedTime: meta.updatedAt,
      authors: meta.author?.url ? [meta.author.url] : undefined,
      locale: meta.locale ?? DEFAULT_LOCALE,
    },
    twitter: {
      card: meta.ogImage ? 'summary_large_image' : 'summary',
      title,
      description: meta.description,
      images: meta.ogImage ? [meta.ogImage.url] : undefined,
    },
    ...(meta.pageType === 'article' && {
      other: {
        'article:published_time': meta.publishedAt ?? '',
        'article:modified_time': meta.updatedAt ?? '',
        'article:author': meta.author?.name ?? '',
        'article:section': meta.articleSection ?? '',
        ...(meta.tags ? Object.fromEntries(meta.tags.map((tag, i) => [`article:tag:${i}`, tag])) : {})
      }
    })
  };
}
