import { Link } from 'react-router-dom';
import { ArrowLeft, Newspaper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RetroBackground from '@/components/RetroBackground';
import RetroScanlines from '@/components/RetroScanlines';

const Stories = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <RetroBackground />
      <RetroScanlines />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-10 md:py-16 space-y-8">
        <header className="border-4 border-border bg-card retro-shadow-lg p-6 md:p-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link to="/">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back Home
              </Button>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Newspaper className="h-8 w-8" />
            <div>
              <h1 className="text-4xl md:text-5xl font-heading text-foreground">Blog / News</h1>
              <p className="text-muted-foreground mt-1">Latest updates, launches, and write-ups.</p>
            </div>
          </div>
        </header>

        <div className="border-4 border-border bg-card retro-shadow p-8 text-center space-y-2">
          <p className="text-muted-foreground">No posts published yet. Check back soon!</p>
        </div>
      </div>
    </div>
  );
};

export default Stories;
