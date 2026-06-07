import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import siteConfig from '@/config.json';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Navbar() {
  return (
    <header className="border-b bg-card sticky top-0 z-50 backdrop-blur-md bg-card/80">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="font-bangers text-2xl text-primary tracking-wider">
            {siteConfig.siteName}
          </Link>
          <span className="hidden md:inline text-xs text-muted-foreground/60">
            Powered by alfo.online
          </span>
        </div>
        <nav className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger className="hidden sm:flex text-sm font-medium gap-1 items-center justify-center whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 px-3">
              Related Tools <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {siteConfig.relatedTools.map((tool) => (
                <DropdownMenuItem key={tool.name} render={<a href={tool.url} target="_blank" rel="noreferrer" className="flex flex-col items-start p-2 cursor-pointer w-full" />}>
                    <span className="font-semibold">{tool.name}</span>
                    <span className="text-xs text-muted-foreground">{tool.description}</span>
                </DropdownMenuItem>
              ))}
              <div className="h-px bg-border my-1" />
              <DropdownMenuItem render={<a href="https://hub.alfo.online" target="_blank" rel="noreferrer" className="font-medium text-primary w-full" />}>
                  View All Tools →
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/templates" className="text-sm font-medium hover:text-primary transition-colors hidden sm:block">
            Templates
          </Link>
          <Link href="/blog" className="text-sm font-medium hover:text-primary transition-colors hidden sm:block">
            Blog
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors hidden sm:block">
            About
          </Link>

          <Link href="/editor">
            <Button size="sm" className="font-bold">Open Editor</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
