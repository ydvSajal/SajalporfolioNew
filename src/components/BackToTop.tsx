import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrolled = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / height) * 100;

      setScrollProgress(progress);
      setIsVisible(scrolled > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Button
      size="icon"
      onClick={scrollToTop}
      className={`fixed bottom-6 right-20 z-50 w-12 h-12 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
      style={{
        background: `conic-gradient(hsl(var(--primary)) ${scrollProgress}%, hsl(var(--card)) ${scrollProgress}%)`,
      }}
    >
      <div className="absolute inset-1 bg-background rounded-full flex items-center justify-center hover:scale-110 transition-transform">
        <ArrowUp className="h-5 w-5 text-primary" />
      </div>
    </Button>
  );
};
