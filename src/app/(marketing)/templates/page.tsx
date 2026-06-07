import Link from "next/link";
import { Button } from "@/components/ui/button";
import templatesData from "@/data/templates.json";

import seoTemplatesData from "@/data/seo-templates.json";

export default function TemplatesPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bangers text-primary tracking-wider mb-4">Comic Templates</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Start with a pre-built layout and customize it to make it your own.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {seoTemplatesData.map((category) => (
            <Link key={category.category} href={`/templates/${category.category}`} className="text-sm text-primary hover:underline font-medium">
               Browse {category.title} &rarr;
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {templatesData.map((template) => (
          <div key={template.id} className="bg-card border rounded-lg overflow-hidden flex flex-col group hover:border-primary transition-colors">
            <div className="aspect-video bg-muted relative flex items-center justify-center p-8">
              {/* Fallback to text if thumbnail isn't real yet */}
              <span className="font-bangers text-3xl text-muted-foreground/50 rotate-[-10deg]">{template.title}</span>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-2xl font-bangers mb-2">{template.title}</h3>
              <p className="text-muted-foreground mb-6 flex-1">{template.description}</p>

              <Link href={`/editor?template=${template.id}`} className="w-full">
                <Button className="w-full font-bold">Use Template</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
