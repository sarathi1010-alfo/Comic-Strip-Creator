import { MetadataRoute } from 'next';
import { buildCanonical } from '@/lib/seo/buildCanonical';

import useCasesData from '@/data/seo-use-cases.json';
import vsData from '@/data/seo-vs.json';
import blogData from '@/data/seo-blog.json';
import templatesData from '@/data/seo-templates.json';
import genresData from '@/data/seo-genres.json';
import layoutsData from '@/data/seo-layouts.json';
import stylesData from '@/data/seo-styles.json';


export const revalidate = 3600; // 1 hour ISR

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString();

  // Static routes
  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/terms-of-service',
    '/privacy-policy',
    '/blog',
    '/faq',
    '/use-cases',
    '/vs',
    '/templates',
    '/editor',
  ].map((route) => ({
    url: buildCanonical(route),
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamic routes
  const blogRoutes = blogData.map((post) => ({
    url: buildCanonical(`/blog/${post.slug}`),
    lastModified: currentDate, // In a real app, use post.updatedAt
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const useCasesRoutes = useCasesData.map((uc) => ({
    url: buildCanonical(`/use-cases/${uc.slug}`),
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const vsRoutes = vsData.map((vs) => ({
    url: buildCanonical(`/vs/${vs.slug}`),
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));


  const genresRoutes = genresData.map((genre) => ({
    url: buildCanonical(`/genres/${genre.slug}`),
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const layoutsRoutes = layoutsData.map((layout) => ({
    url: buildCanonical(`/layouts/${layout.slug}`),
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const stylesRoutes = stylesData.map((style) => ({
    url: buildCanonical(`/styles/${style.slug}`),
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const templateRoutes = templatesData.map((template) => ({
    url: buildCanonical(`/templates/${template.category}`),
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes, ...useCasesRoutes, ...vsRoutes, ...templateRoutes, ...genresRoutes, ...layoutsRoutes, ...stylesRoutes];
}
