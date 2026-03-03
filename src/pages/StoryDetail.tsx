import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RetroBackground from '@/components/RetroBackground';
import RetroScanlines from '@/components/RetroScanlines';

const StoryDetail = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <RetroBackground />
      <RetroScanlines />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-10 md:py-16 space-y-6">
        <Link to="/stories">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to stories
          </Button>
        </Link>

        <div className="border-4 border-border bg-card retro-shadow p-8 text-center space-y-2">
          <p className="text-muted-foreground">Story not found.</p>
        </div>
      </div>
    </div>
  );
};

export default StoryDetail;
