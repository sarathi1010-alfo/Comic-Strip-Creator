/* eslint-disable @typescript-eslint/no-explicit-any */
import type { SeoMeta } from '@/types/seo';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://comicflow.alfo.online';

export function buildBlogPostMeta(post: any): SeoMeta {
  return {
    title: post.title || 'Untitled',
    description: (post.description || post.intro || '').slice(0, 160).replace(/<[^>]*>?/gm, ''),
    slug: `/blog/${post.slug}`,
    pageType: 'article',
    noindex: post.draft || post.archived,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt || post.publishedAt,
    ogImage: {
      url: `${BASE_URL}/og?title=${encodeURIComponent(post.title || 'Blog Post')}&type=article`,
      alt: post.title || 'Blog Post'
    },
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Blog', href: '/blog' },
      { label: post.title || 'Article', href: `/blog/${post.slug}` }
    ],
    faqItems: post.faqs
  };
}

export function buildProductMeta(product: any): SeoMeta {
  return {
    title: product.title || 'Untitled Product',
    description: (product.description || '').slice(0, 160).replace(/<[^>]*>?/gm, ''),
    slug: `/products/${product.slug}`,
    pageType: 'product',
    noindex: product.draft || product.archived,
    publishedAt: product.publishedAt,
    updatedAt: product.updatedAt || product.publishedAt,
    ogImage: {
      url: `${BASE_URL}/og?title=${encodeURIComponent(product.title || 'Product')}&type=product`,
      alt: product.title || 'Product'
    },
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: product.title || 'Product', href: `/products/${product.slug}` }
    ],
    productData: {
      name: product.title,
      price: product.price || 0,
      currency: product.currency || 'USD',
      availability: product.inStock ? 'InStock' : 'OutOfStock'
    }
  };
}

export function buildCategoryMeta(category: any): SeoMeta {
  return {
    title: category.title || 'Category',
    description: (category.description || '').slice(0, 160).replace(/<[^>]*>?/gm, ''),
    slug: `/categories/${category.slug}`,
    pageType: 'category',
    noindex: category.page && category.page > 1,
    ogImage: {
      url: `${BASE_URL}/og?title=${encodeURIComponent(category.title || 'Category')}&type=category`,
      alt: category.title || 'Category'
    },
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Categories', href: '/categories' },
      { label: category.title || 'Category', href: `/categories/${category.slug}` }
    ]
  };
}

export function buildAuthorMeta(author: any): SeoMeta {
  return {
    title: author.name || 'Author',
    description: (author.bio || '').slice(0, 160).replace(/<[^>]*>?/gm, ''),
    slug: `/authors/${author.slug}`,
    pageType: 'author',
    noindex: author.postCount === 0,
    ogImage: {
      url: `${BASE_URL}/og?title=${encodeURIComponent(author.name || 'Author')}&type=author`,
      alt: author.name || 'Author'
    },
    author: {
      name: author.name,
      url: `${BASE_URL}/authors/${author.slug}`
    }
  };
}

export function buildTagMeta(tag: any): SeoMeta {
  return {
    title: tag.name || 'Tag',
    description: `Posts tagged with ${tag.name}`,
    slug: `/tags/${tag.slug}`,
    pageType: 'tag',
    noindex: tag.postCount < 3 || (tag.page && tag.page > 1),
    ogImage: {
      url: `${BASE_URL}/og?title=${encodeURIComponent(tag.name || 'Tag')}&type=tag`,
      alt: tag.name || 'Tag'
    }
  };
}

export function buildDocsMeta(doc: any): SeoMeta {
  return {
    title: doc.title || 'Documentation',
    description: (doc.description || '').slice(0, 160).replace(/<[^>]*>?/gm, ''),
    slug: `/docs/${doc.slug}`,
    pageType: 'docs',
    noindex: doc.draft,
    updatedAt: doc.updatedAt,
    ogImage: {
      url: `${BASE_URL}/og?title=${encodeURIComponent(doc.title || 'Documentation')}&type=docs`,
      alt: doc.title || 'Documentation'
    },
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Docs', href: '/docs' },
      { label: doc.title || 'Doc', href: `/docs/${doc.slug}` }
    ],
    faqItems: doc.faqs,
    steps: doc.steps,
    estimatedTime: doc.estimatedTime
  };
}

export function buildLandingMeta(page: any): SeoMeta {
  return {
    title: page.title || 'Landing Page',
    description: (page.description || '').slice(0, 160).replace(/<[^>]*>?/gm, ''),
    slug: page.slug === '/' ? '/' : `/${page.slug}`,
    pageType: 'landing',
    noindex: page.draft,
    ogImage: {
      url: `${BASE_URL}/og?title=${encodeURIComponent(page.title || 'Landing Page')}&type=landing`,
      alt: page.title || 'Landing Page'
    },
    faqItems: page.faqs
  };
}

export function buildFaqMeta(page: any): SeoMeta {
  return {
    title: page.title || 'FAQ',
    description: (page.description || '').slice(0, 160).replace(/<[^>]*>?/gm, ''),
    slug: `/${page.slug}`,
    pageType: 'faq',
    noindex: page.draft,
    ogImage: {
      url: `${BASE_URL}/og?title=${encodeURIComponent(page.title || 'FAQ')}&type=faq`,
      alt: page.title || 'FAQ'
    },
    faqItems: page.faqs
  };
}

export function buildToolMeta(tool: any): SeoMeta {
  return {
    title: tool.title || 'Tool',
    description: (tool.description || '').slice(0, 160).replace(/<[^>]*>?/gm, ''),
    slug: `/${tool.slug}`,
    pageType: 'tool',
    noindex: tool.draft,
    ogImage: {
      url: `${BASE_URL}/og?title=${encodeURIComponent(tool.title || 'Tool')}&type=tool`,
      alt: tool.title || 'Tool'
    },
    faqItems: tool.faqs
  };
}
