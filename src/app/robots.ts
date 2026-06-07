import { MetadataRoute } from 'next';
import { getBaseUrl } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl();
  const isVercelPreview = process.env.VERCEL_ENV !== 'production' && process.env.VERCEL_URL;

  // If we are on a Vercel preview branch, tell crawlers to buzz off completely.
  // Otherwise, if we are on production, allow all.
  return {
    rules: {
      userAgent: '*',
      allow: isVercelPreview ? undefined : '/',
      disallow: isVercelPreview ? '/' : undefined,
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
