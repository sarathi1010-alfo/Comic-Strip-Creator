import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RelatedTools } from "@/components/widgets/RelatedTools";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-8 min-h-[70vh]">
        <h1 className="text-6xl font-bangers text-primary tracking-wider">Comic Strip Creator</h1>
      <p className="text-xl max-w-2xl text-muted-foreground">
        Create stunning comic strips in minutes — no design skills required.
      </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link href="/editor">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg font-bold">
              Start Creating Free Comics
            </Button>
          </Link>
          <Link href="/templates">
            <Button size="lg" variant="outline" className="text-lg">
              Browse Templates
            </Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl text-left">
        <h2 className="text-3xl font-bold mb-4">Tips for Beginners</h2>
        <p className="text-lg text-muted-foreground mb-4">
          Getting started with comics is easier than you think! Learn the basics of storytelling and panel layouts to make your comics shine.
          For a complete guide, check out our <Link href="/blog/comic-strip-guide" className="text-primary underline">new guide on how to create a comic strip online for beginners</Link>.
        </p>
      </div>
      <RelatedTools />
    </div>
  );
}
