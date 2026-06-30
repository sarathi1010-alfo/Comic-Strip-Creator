import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import data from '@/data/seo-genres.json';

import { resolveMetadata } from '@/lib/seo/resolveMetadata';
import { buildLandingMeta } from '@/lib/seo/metaFactories';

import { JsonLd } from '@/components/JsonLd';


type FAQ = {
  question: string;
  answer: string;
};

type SeoItem = {
  slug: string;
  title: string;
  primaryKeyword: string;
  h1: string;
  description: string;
  intro: string;
  faqs?: FAQ[];
};


type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const item = data.find((i) => i.slug === resolvedParams.slug);

  if (!item) {
    return { title: 'Not Found' };
  }

  return resolveMetadata(buildLandingMeta(item as SeoItem));
}

export function generateStaticParams() {
  return data.map((item) => ({
    slug: item.slug,
  }));
}

export default async function GenrePage({ params }: Props) {
  const resolvedParams = await params;
  const item = data.find((i) => i.slug === resolvedParams.slug);

  if (!item) {
    notFound();
  }

  // Generate FAQ Schema.org JSON-LD
  const faqSchema = item.faqs && item.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": item.faqs.map((faq: FAQ) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      {faqSchema && <JsonLd schema={faqSchema} />}

      <article className="prose prose-invert prose-lg max-w-none">
        <header className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bangers text-primary mb-4">{item.h1}</h1>
          <div className="flex items-center text-sm text-muted-foreground space-x-4 mb-6">
            <address className="not-italic">By ComicStrip Team</address>
            <span>•</span>
            <time dateTime={new Date().toISOString()}>{new Date().toLocaleDateString()}</time>
          </div>
        </header>
        <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
          {item.intro}
        </p>

        {/* Embedded Tool CTA */}
        <div className="bg-card border border-primary/20 rounded-xl p-8 text-center my-16 shadow-lg shadow-primary/5">
          <h2 className="text-3xl font-bangers mb-4 text-foreground">Ready to build your {item.primaryKeyword}?</h2>
          <p className="text-muted-foreground mb-6">Open the free editor right now. No signup required.</p>
          <Link href="/editor">
            <Button size="lg" className="font-bold text-lg px-8 py-6">
              Open Comic Creator
            </Button>
          </Link>
        </div>

        {/* FAQ Section */}
        {item.faqs && item.faqs.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bangers mb-8">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {item.faqs.map((faq: FAQ, index: number) => (
                <div key={index} className="bg-muted/30 p-6 rounded-lg">
                  <h3 className="font-bold text-xl mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
