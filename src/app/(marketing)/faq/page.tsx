import { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { resolveMetadata } from '@/lib/seo/resolveMetadata';
import { buildLandingMeta } from '@/lib/seo/metaFactories';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = resolveMetadata(
  buildLandingMeta({
    title: 'Frequently Asked Questions | ComicFlow',
    description: 'Find answers to common questions about using our free online comic maker, creating comic strips, and more.',
    slug: '/faq',
    faqs: [], // We manage the schema explicitly below
  })
);

const faqs = [
  {
    question: 'Is ComicFlow really free?',
    answer: 'Yes! ComicFlow is a 100% free online comic creator. You can build, save, and export your comic strips without any hidden fees or premium subscriptions.',
  },
  {
    question: 'Do I need to know how to draw to use ComicFlow?',
    answer: 'Not at all. ComicFlow is designed for everyone. We provide drag-and-drop templates, pre-made characters, and integrated tools so you can focus on writing and storytelling without needing any design skills.',
  },
  {
    question: 'Can I use ComicFlow on my phone or tablet?',
    answer: 'Yes, ComicFlow is built to be responsive and works across devices directly in your web browser. However, for complex layouts, a desktop environment may offer a better experience.',
  },
  {
    question: 'Are there watermarks on my exported comics?',
    answer: 'No, we do not force watermarks onto your exported images. Your comic belongs to you.',
  },
  {
    question: 'Can I use the comics I make for commercial purposes?',
    answer: 'Yes, you own the content you create. You can use your comics for marketing, social media, education, or personal projects without restriction.',
  },
  {
    question: 'How do I add custom images to my comic?',
    answer: 'Inside the editor, you can use the upload feature to add your own photos, drawings, or logos to any panel.',
  },
  {
    question: 'What file formats can I export my comic as?',
    answer: 'Currently, you can export your finished comic strips as high-quality PNG or JPG files, which are perfect for sharing on social media or printing.',
  },
  {
    question: 'Do I need to create an account to start?',
    answer: 'No signup is required to start creating! You can jump right into the editor and start building your comic immediately.',
  },
];

export default function FAQPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <JsonLd schema={faqSchema} />

      <div className="mb-12 text-center">
        <h1 className="text-5xl font-bangers text-primary tracking-wider mb-6">Frequently Asked Questions</h1>
        <p className="text-xl text-muted-foreground">
          Got questions? We&apos;ve got answers. Learn everything you need to know about ComicFlow.
        </p>
      </div>

      <div className="space-y-8">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-card p-6 rounded-lg border border-primary/20">
            <h3 className="font-bold text-2xl mb-3 text-foreground">{faq.question}</h3>
            <p className="text-muted-foreground text-lg leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-muted/30 border border-primary/10 rounded-xl p-8 text-center shadow-lg shadow-primary/5">
        <h2 className="text-3xl font-bangers mb-4 text-foreground">Still have questions?</h2>
        <p className="text-muted-foreground mb-6">
          Ready to try it out yourself? Open the editor and start creating your first comic.
        </p>
        <Link href="/editor">
          <Button size="lg" className="font-bold text-lg px-8 py-6">
            Open Free Comic Maker
          </Button>
        </Link>
      </div>
    </div>
  );
}
