import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import RetroBackground from "@/components/RetroBackground";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background relative overflow-hidden">
      <RetroBackground />
      
      <div className="relative z-10 text-center px-4">
        {/* Large 404 with retro styling */}
        <div className="mb-8 relative inline-block">
          <div className="absolute inset-0 bg-primary translate-x-2 translate-y-2 retro-border" />
          <h1 className="relative text-9xl md:text-[12rem] font-heading text-foreground bg-card px-8 py-4 retro-border retro-shadow-xl">
            404
          </h1>
        </div>

        {/* Error message */}
        <div className="mb-8 space-y-4">
          <div className="inline-block bg-card retro-border retro-shadow-lg px-8 py-4">
            <p className="text-2xl md:text-3xl font-heading text-foreground">
              Page Not Found!
            </p>
          </div>
          
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Looks like this page took a wrong turn. Don't worry, we'll get you back on track!
          </p>
        </div>

        {/* Retro buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            size="lg"
            className="retro-border retro-shadow hover:retro-shadow-lg transition-all hover:-translate-y-1 font-heading"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Go Back
          </Button>
          
          <Button
            onClick={() => navigate("/")}
            size="lg"
            className="retro-border retro-shadow-lg hover:retro-shadow-xl bg-primary hover:bg-primary-hover text-primary-foreground transition-all hover:-translate-y-1 font-heading"
          >
            <Home className="mr-2 h-5 w-5" />
            Go Home
          </Button>
        </div>

        {/* Decorative retro elements */}
        <div className="absolute -z-10 top-1/4 left-1/4 w-32 h-32 border-4 border-primary/20 rotate-12 retro-shadow" />
        <div className="absolute -z-10 bottom-1/4 right-1/4 w-24 h-24 rounded-full border-4 border-accent/20 retro-shadow" />
        <div className="absolute -z-10 top-1/3 right-1/3 w-16 h-16 border-4 border-muted/20 -rotate-45" />
      </div>
    </div>
  );
};

export default NotFound;
