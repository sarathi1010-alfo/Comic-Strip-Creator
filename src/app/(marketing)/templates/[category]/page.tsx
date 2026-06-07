import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import templateData from '@/data/seo-templates.json';
import siteConfig from '@/config.json';
import { constructMetadata } from '@/lib/seo';

type Props = {
  params: Promise<{ category: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const useCase = templateData.find((item) => item.category === resolvedParams.category);

  if (!useCase) {
    return { title: 'Not Found' };
  }

  return constructMetadata({
    title: `${useCase.title} | ${siteConfig.siteName}`,
    description: useCase.description,
    path: `/templates/${useCase.category}`,
    keywords: [useCase.primaryKeyword, "free comic maker", "comic strip creator"],
  });
}

export function generateStaticParams() {
  return templateData.map((item) => ({
    category: item.category,
  }));
}

type FAQ = { question: string, answer: string };

export default async function UseCasePage({ params }: Props) {
  const resolvedParams = await params;
  const useCase = templateData.find((item) => item.category === resolvedParams.category);

  if (!useCase) {
    notFound();
  }

  // Generate FAQ Schema.org JSON-LD
  const faqSchema = useCase.faqs && useCase.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": useCase.faqs.map((faq: FAQ) => ({
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
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <article className="prose prose-invert prose-lg max-w-none">
        <h1 className="text-4xl md:text-5xl font-bangers text-primary mb-6">{useCase.h1}</h1>
        <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
          {useCase.intro}
        </p>

        {/* Embedded Tool CTA */}
        <div className="bg-card border border-primary/20 rounded-xl p-8 text-center my-16 shadow-lg shadow-primary/5">
          <h2 className="text-3xl font-bangers mb-4 text-foreground">Ready to build your {useCase.primaryKeyword}?</h2>
          <p className="text-muted-foreground mb-6">Open the free editor right now. No signup required.</p>
          <Link href="/editor">
            <Button size="lg" className="font-bold text-lg px-8 py-6">
              Open Comic Creator
            </Button>
          </Link>
        </div>

        {/* FAQ Section */}
        {useCase.faqs && useCase.faqs.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bangers mb-8">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {useCase.faqs.map((faq: FAQ, index) => (
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
