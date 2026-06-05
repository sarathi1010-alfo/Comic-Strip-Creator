import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t py-8 mt-12 bg-card">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Comic Strip Creator. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="/about" className="hover:text-primary transition-colors">About</Link>
          <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
