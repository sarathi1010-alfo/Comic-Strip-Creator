import Link from 'next/link';
import useCasesData from '@/data/seo-use-cases.json';

export default function UseCasesIndex() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bangers mb-8 text-primary">Ways to Use Comic Strip Creator</h1>
      <div className="grid gap-6">
        {useCasesData.map(post => (
          <Link key={post.slug} href={`/use-cases/${post.slug}`} className="block p-6 rounded-lg bg-card border hover:border-primary/50 transition-colors">
            <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
            <p className="text-muted-foreground">{post.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
