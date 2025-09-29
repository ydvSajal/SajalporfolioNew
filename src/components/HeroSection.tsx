import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react';
import profileImage from '@/assets/profile-new.jpg';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background-secondary to-background-tertiary">

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            
            {/* Profile Image - Simple */}
            <div className="flex-shrink-0">
              <div className="relative w-48 h-48 group">
                <img 
                  src={profileImage} 
                  alt="Sajal's Profile" 
                  className="w-full h-full object-cover rounded-lg shadow-md border-4 border-primary/20 transition-transform group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-accent rounded-full opacity-80 -z-10" />
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6 text-center lg:text-left">
              <div>
                <p className="text-sm font-medium text-accent mb-2 tracking-wide uppercase">Hey there! 👋</p>
                <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-2">
                  I'm Sajal Yadav
                </h1>
                <p className="text-lg text-muted-foreground">
                  CS Student & Developer at Bennett University
                </p>
              </div>

              <p className="text-foreground/70 max-w-lg">
                Building web apps, solving problems, and learning something new every day. 
                I'm passionate about creating software that actually makes a difference.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary-dark"
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  See My Work
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Get in Touch
                </Button>
              </div>

              {/* Social Links */}
              <div className="flex gap-3 justify-center lg:justify-start">
                <a 
                  href="https://github.com/ydvSajal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-card hover:bg-card-hover border border-border transition-all"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/sajal-yadav-6a0b5930a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-card hover:bg-card-hover border border-border transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a 
                  href="mailto:sajalkumar1765@gmail.com"
                  className="p-2 rounded-lg bg-card hover:bg-card-hover border border-border transition-all"
                  aria-label="Email"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;