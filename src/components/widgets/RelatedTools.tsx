import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import siteConfig from "@/config.json";
import { ArrowRight } from "lucide-react";

export function RelatedTools() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bangers text-primary tracking-wide mb-2">You might also need:</h2>
          <p className="text-muted-foreground">Boost your workflow with our ecosystem of free design tools.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteConfig.relatedTools.map((tool) => (
            <Card key={tool.name} className="flex flex-col border-primary/20 hover:border-primary/50 transition-colors bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="font-bangers tracking-wider text-xl">{tool.name}</CardTitle>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto pt-4">
                <a href={tool.url} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2 w-full group">
                    Try {tool.name}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
