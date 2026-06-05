import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center space-y-8">
      <h1 className="text-6xl font-bangers text-primary tracking-wider">Comic Strip Creator</h1>
      <p className="text-xl max-w-2xl text-muted-foreground">
        Create stunning comic strips in minutes — no design skills required.
      </p>
      <div className="flex gap-4">
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
  );
}
