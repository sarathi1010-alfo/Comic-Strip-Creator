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
  {
    question: 'How do I choose the right comic idea?',
    answer: 'Choose an idea that resonates with your personal experiences or interests. If you find a concept funny or intriguing, your passion will translate into the final comic.',
  },
  {
    question: 'How many panels should a comic page have?',
    answer: 'A standard comic page typically has between 5 to 9 panels, but this can vary greatly depending on the genre and the pacing required. Action scenes often use fewer, larger panels, while dialogue-heavy scenes may use more.',
  },
  {
    question: 'What is the rule of three in comedy?',
    answer: 'The rule of three is a comedic principle where the first two elements set up a pattern, and the third element subverts that pattern to create the punchline. In a 4-panel comic, panels 1 and 2 often establish the premise, panel 3 escalates it, and panel 4 delivers the twist.',
  },
  {
    question: 'How do I make my characters expressions funnier?',
    answer: 'Funnier expressions often rely on exaggeration. Pushing the boundaries of realistic anatomy to show extreme shock, joy, or confusion can instantly make a panel more humorous. Using distinct eye shapes, large mouths, and action lines helps convey the emotion clearly.',
  },
  {
    question: 'What is the gutter in a comic?',
    answer: 'The gutter is the blank space between panels. It acts as a visual pause and represents the passage of time or a shift in location between the events depicted in the panels.',
  },
  {
    question: 'What font should I use for my comic?',
    answer: 'For standard dialogue, use a clean, legible comic font (often all-caps). For our tools, we recommend "Comic Neue" for a playful, readable style. Avoid using generic fonts like Arial or Times New Roman, as they break the visual immersion.',
  },
  {
    question: 'How do I design a main character vs a background character?',
    answer: 'Main characters usually have more detailed, distinct designs with specific color palettes to make them stand out. Background characters should have simpler designs and muted colors so they don\'t distract from the main action.',
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
