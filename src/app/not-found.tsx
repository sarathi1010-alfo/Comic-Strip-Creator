import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-6">
        <h1 className="text-6xl font-bangers text-primary tracking-wider">404</h1>
        <h2 className="text-2xl font-bold">Comic Panel Not Found</h2>
        <p className="text-muted-foreground max-w-md">
          Looks like this panel was lost in the comic strip! The page you are looking for doesn&apos;t exist.
        </p>
        <Link href="/">
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            Return to Creator
          </Button>
        </Link>
      </main>
      <Footer />
    </div>
  );
}
