import Link from 'next/link';
import vsData from '@/data/seo-vs.json';

export default function VsIndex() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bangers mb-8 text-primary">Compare Comic Strip Creator</h1>
      <div className="grid gap-6">
        {vsData.map(post => (
          <Link key={post.slug} href={`/vs/${post.slug}`} className="block p-6 rounded-lg bg-card border hover:border-primary/50 transition-colors">
            <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
            <p className="text-muted-foreground">{post.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
