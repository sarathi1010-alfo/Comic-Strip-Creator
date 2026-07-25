import Link from 'next/link';
import { Button } from '@/components/ui/button';
import genreData from '@/data/seo-genres.json';
import blogData from '@/data/seo-blog.json';

export default function GenresHubPage() {
  const blogGenres = blogData.filter(blog => blog.tags?.includes('Genre'));

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl md:text-5xl font-bangers text-primary mb-8">Comic Genres Hub</h1>
      <p className="text-xl text-muted-foreground mb-12">
        Explore our complete guides on various comic genres. Learn the key techniques, visual styles, and common tropes for each.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {genreData.map((genre) => (
          <div key={genre.slug} className="bg-card border border-primary/20 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-2">{genre.h1}</h2>
            <p className="text-muted-foreground mb-4">{genre.description}</p>
            <Link href={`/genres/${genre.slug}`}>
              <Button>Read Guide</Button>
            </Link>
          </div>
        ))}
        {blogGenres.map((tech) => (
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
