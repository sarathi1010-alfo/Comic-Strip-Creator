import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RelatedTools } from "@/components/widgets/RelatedTools";

const STEPS = [
  {
    step: "01",
    title: "Choose Panel Layout",
    desc: "Select from 1, 2, 3, 4, or 6-panel grid templates or customize panel proportions.",
  },
  {
    step: "02",
    title: "Add Characters & Props",
    desc: "Place illustrated characters, expressive facial expressions, backgrounds, and item props.",
  },
  {
    step: "03",
    title: "Insert Speech Bubbles",
    desc: "Drag dialogue bubbles, shout balloons, and thought clouds with custom comic lettering.",
  },
  {
    step: "04",
    title: "Download & Share",
    desc: "Export high-resolution PNG, JPG, or PDF comics formatted for print or web publication.",
  },
];

const FAQS = [
  {
    q: "Is ComicFlow free to create and download comics?",
    a: "Yes, ComicFlow is completely free with no hidden paywalls, watermark restrictions, or mandatory user accounts.",
  },
  {
    q: "Can I upload my own custom illustrations and photos?",
    a: "Yes, you can upload your own PNG, JPG, or SVG drawings and photos directly into any panel on your comic canvas.",
  },
  {
    q: "What export formats are supported?",
    a: "ComicFlow supports high-resolution PNG, JPEG, and PDF exports, optimized for Instagram carousels, webcomics, and printable worksheets.",
  },
  {
    q: "Can teachers use ComicFlow in classrooms?",
    a: "Absolutely. ComicFlow is COPPA-compliant, requires no student email addresses, and is widely used for creative writing and history projects.",
  },
  {
    q: "How do I adjust panel layouts and border widths?",
    a: "Select any panel to adjust borders, gutter spacing, background colors, or aspect ratio directly from the canvas toolbar.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-12 md:py-20 text-center space-y-6 max-w-4xl mx-auto w-full">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bangers text-primary tracking-wider leading-tight">
          Create Custom Comic Strips Online in Minutes
        </h1>
        <p className="text-base sm:text-lg md:text-xl max-w-2xl text-muted-foreground leading-relaxed">
          Design humorous comic strips, educational storyboards, and webcomics with zero drawing experience. ComicFlow provides an intuitive drag-and-drop canvas featuring customizable multi-panel layouts, expressive speech bubbles, rich sticker libraries, and flexible typography. Export high-resolution images instantly for social media, classroom lessons, and blogs without sign-up fees.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4 sm:px-0 justify-center items-center pt-2">
          <Link href="/editor" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90 text-lg font-bold min-h-[44px] min-w-[44px] px-8 py-3"
            >
              Start Creating Free Comics
            </Button>
          </Link>
          <Link href="/templates" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto text-lg min-h-[44px] min-w-[44px] px-8 py-3"
            >
              Browse Templates
            </Button>
          </Link>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 bg-muted/20 border-y border-border/40 w-full">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bangers text-primary tracking-wide mb-3">
              How It Works: 4 Easy Steps
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
              From blank canvas to published webcomic in under five minutes.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step) => (
              <div
                key={step.step}
                className="bg-card border border-border/60 rounded-xl p-6 relative flex flex-col space-y-3 shadow-sm hover:border-primary/50 transition-colors"
              >
                <span className="text-3xl font-bangers text-accent tracking-wider">
                  {step.step}
                </span>
                <h3 className="text-lg font-bold text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 max-w-3xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bangers text-primary tracking-wide mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Everything you need to know about ComicFlow free comic creator.
          </p>
        </div>
        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <details
              key={idx}
              className="group bg-card border border-border/60 rounded-xl px-6 py-4 transition-colors hover:border-primary/50"
            >
              <summary className="font-bold text-base sm:text-lg cursor-pointer list-none flex items-center justify-between text-foreground hover:text-primary transition-colors py-1 min-h-[44px]">
                <span>{faq.q}</span>
                <span className="text-muted-foreground text-xl transition-transform group-open:rotate-45 font-mono ml-4 shrink-0">
                  +
                </span>
              </summary>
              <div className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed pt-2 border-t border-border/30">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      <RelatedTools />
    </div>
  );
}
