import { Link } from 'react-router-dom';
import { ArrowLeft, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import RetroBackground from '@/components/RetroBackground';
import RetroScanlines from '@/components/RetroScanlines';

const AdminPortal = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <RetroBackground />
      <RetroScanlines />

      <div className="relative z-10 max-w-xl mx-auto px-4 py-20 space-y-6">
        <Link to="/">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back Home
          </Button>
        </Link>

        <Card className="border-4 border-border retro-shadow-lg">
          <CardHeader className="text-center space-y-2">
            <div className="flex justify-center">
              <div className="border-2 border-border p-4 inline-block">
                <Lock className="h-8 w-8" />
              </div>
            </div>
            <CardTitle className="text-3xl font-heading">Admin Portal</CardTitle>
            <p className="text-sm text-muted-foreground">
              Admin access is not available in this version.
            </p>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground text-sm">
              This section is under construction.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPortal;
