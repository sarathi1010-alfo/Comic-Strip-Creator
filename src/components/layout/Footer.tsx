import Link from 'next/link';
import siteConfig from '@/config.json';

export function Footer() {
  return (
    <footer className="border-t pt-12 pb-8 mt-12 bg-card">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div className="space-y-4">
          <Link href="/" className="font-bangers text-2xl text-primary tracking-wider block">
            {siteConfig.siteName}
          </Link>
          <p className="text-sm text-muted-foreground max-w-xs">
            Create stunning comic strips in minutes — no design skills required.
          </p>
          <p className="text-xs text-muted-foreground font-semibold">
            An <a href="https://alfo.online" className="text-primary hover:underline">alfo.online</a> ecosystem tool.
          </p>
        </div>

        <div>
          <h3 className="font-bold mb-4">Tools Hub</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {siteConfig.relatedTools.map((tool) => (
              <li key={tool.name}>
                <a href={tool.url} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                  {tool.name}
                </a>
              </li>
            ))}
            <li>
              <a href="https://hub.alfo.online" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors font-medium">
                View All Tools &rarr;
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-4">Legal</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
            <li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-4">Social</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="https://twitter.com/alfo_online" className="hover:text-primary transition-colors">Twitter</a></li>
            <li><a href="https://github.com" className="hover:text-primary transition-colors">GitHub</a></li>
            <li><a href="https://linkedin.com" className="hover:text-primary transition-colors">LinkedIn</a></li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-4 border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} alfo.online — All rights reserved.</p>
      </div>
    </footer>
  );
}
