import Link from 'next/link';
import { Button } from '@/components/ui/button';
import blogData from '@/data/seo-blog.json';

export default function TechniquesHubPage() {
  const techniques = blogData.filter(blog => blog.tags?.includes('Technique'));

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl md:text-5xl font-bangers text-primary mb-8">Comic Techniques Hub</h1>
      <p className="text-xl text-muted-foreground mb-12">
        Master the craft of comic creation with our deep-dive guides on various techniques.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {techniques.map((tech) => (
          <div key={tech.slug} className="bg-card border border-primary/20 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-2">{tech.title}</h2>
            <p className="text-muted-foreground mb-4">{tech.description}</p>
            <Link href={`/blog/${tech.slug}`}>
              <Button>Read Guide</Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
