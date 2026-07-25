import Link from 'next/link';
import { Button } from '@/components/ui/button';
import useCaseData from '@/data/seo-use-cases.json';
import blogData from '@/data/seo-blog.json';

export default function UseCasesHubPage() {
  const blogUseCases = blogData.filter(blog => blog.tags?.includes('Use-Case'));

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl md:text-5xl font-bangers text-primary mb-8">Comic Use-Cases Hub</h1>
      <p className="text-xl text-muted-foreground mb-12">
        Discover how to use comics for various applications, from education to marketing.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {useCaseData.map((useCase) => (
          <div key={useCase.slug} className="bg-card border border-primary/20 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-2">{useCase.h1}</h2>
            <p className="text-muted-foreground mb-4">{useCase.description}</p>
            <Link href={`/use-cases/${useCase.slug}`}>
              <Button>Read Guide</Button>
            </Link>
          </div>
        ))}
        {blogUseCases.map((useCase) => (
          <div key={useCase.slug} className="bg-card border border-primary/20 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-2">{useCase.title}</h2>
            <p className="text-muted-foreground mb-4">{useCase.description}</p>
            <Link href={`/blog/${useCase.slug}`}>
              <Button>Read Guide</Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
