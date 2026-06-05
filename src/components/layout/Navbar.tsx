import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Book } from 'lucide-react';

export function Navbar() {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bangers text-2xl text-primary tracking-wider">
          ComicStripCreator
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/templates" className="text-sm font-medium hover:text-primary transition-colors">
            Templates
          </Link>
          <Link href="/editor">
            <Button size="sm" className="font-bold">Open Editor</Button>
          </Link>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground">
            <Book className="w-5 h-5" />
          </a>
        </nav>
      </div>
    </header>
  );
}
