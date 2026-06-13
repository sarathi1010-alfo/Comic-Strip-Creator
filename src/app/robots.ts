import { MetadataRoute } from 'next';
import { buildCanonical } from '@/lib/seo/buildCanonical';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = buildCanonical('');
  const isVercelPreview = process.env.VERCEL_ENV !== 'production' && process.env.VERCEL_URL;

  // As per config at the top of the prompt: ROBOTS_ALLOW_AI_CRAWLERS=false
  const allowAiCrawlers = false;

  const disallowRules = ['/api/', '/admin/', '/dashboard/', '/_next/', '/*?*'];

  let userAgents: MetadataRoute.Robots['rules'] = [
    {
      userAgent: '*',
      allow: isVercelPreview ? undefined : '/',
      disallow: isVercelPreview ? '/' : disallowRules,
    }
  ];

  if (!allowAiCrawlers && !isVercelPreview) {
    const aiBots = ['GPTBot', 'Claude-Web', 'CCBot', 'Google-Extended', 'anthropic-ai', 'Bytespider'];
    const aiBotRules = aiBots.map(bot => ({
      userAgent: bot,
      disallow: '/'
    }));
    userAgents = [...(Array.isArray(userAgents) ? userAgents : [userAgents]), ...aiBotRules];
  }

  return {
    rules: userAgents,
    sitemap: `${baseUrl}sitemap.xml`,
  };
}
