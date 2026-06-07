import { generateProgrammaticMetadata, generateFAQSchema } from '@/lib/seo';
import Script from 'next/script';
import Link from 'next/link';
import { ClientRgbToHslTool } from './components/ClientTool';

export const metadata = generateProgrammaticMetadata({
  toolName: "RGB to HSL Converter",
  cluster: "Color Tools",
  primaryAction: "Convert RGB to HSL",
  path: "/tools/color/rgb-to-hsl"
});

const faqs = [
  {
    question: "What is HSL?",
    answer: "HSL stands for Hue, Saturation, and Lightness. Hue represents the base color on a 360-degree wheel, Saturation represents the intensity (0% is gray, 100% is full color), and Lightness represents how dark or light the color is."
  },
  {
    question: "Why use HSL instead of RGB?",
    answer: "HSL is often preferred by designers when tweaking colors because it is easier to create color palettes. For example, to make a color darker in HSL, you simply reduce the Lightness value, whereas in RGB you would need to adjust all three channels."
  }
];

export default function RgbToHslPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(faqs)) }}
      />
      {/* Breadcrumbs */}
      <nav className="max-w-3xl mx-auto mb-8 text-sm text-slate-500">
        <Link href="/" className="hover:text-violet-400">Home</Link> &gt;{' '}
        <Link href="/tools/color" className="hover:text-violet-400">Color Tools</Link> &gt;{' '}
        <span className="text-slate-300">RGB to HSL</span>
      </nav>

      <ClientRgbToHslTool />
    </div>
  );
}
