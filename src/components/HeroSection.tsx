import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';
import profileImage from '@/assets/profile.png';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-glow opacity-30 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Profile Image */}
            <div className="relative mx-auto lg:mx-0 w-48 h-48 group">
              <div className="absolute inset-0 bg-gradient-primary rounded-full blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-card-border shadow-3d group-hover:shadow-3d-lg transition-all duration-500 transform group-hover:scale-105">
                <img 
                  src={profileImage} 
                  alt="Sajal's Profile" 
                  className="w-full h-full object-cover object-center"
                  style={{ imageRendering: 'crisp-edges' }}
                />
              </div>
            </div>

            {/* Text Content */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold">
                  <span className="block text-foreground">Hi, I'm</span>
                  <span className="block bg-gradient-primary bg-clip-text text-transparent animate-pulse">
                    Sajal
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground">
                  Passionate Developer & CS Student at Bennett University
                </p>
              </div>

              <p className="text-foreground/80 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                I love creating innovative solutions and learning new technologies. My journey in computer science is driven by curiosity and the desire to build meaningful applications that solve real-world problems.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg" 
                  className="bg-gradient-primary hover:shadow-glow transition-all duration-300 transform hover:scale-105"
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  View My Work
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-primary/50 hover:bg-primary/10 hover:border-primary transition-all duration-300"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Contact Me
                  <Mail className="ml-2 h-4 w-4" />
                </Button>
              </div>

              {/* Social Links */}
              <div className="flex gap-4 justify-center lg:justify-start">
                <a 
                  href="https://github.com/ydvSajal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-card hover:bg-card-hover border border-card-border transition-all duration-300 hover:shadow-glow group"
                >
                  <Github className="h-5 w-5 text-foreground/70 group-hover:text-primary transition-colors" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/sajal-yadav-6a0b5930a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-card hover:bg-card-hover border border-card-border transition-all duration-300 hover:shadow-glow group"
                >
                  <Linkedin className="h-5 w-5 text-foreground/70 group-hover:text-accent transition-colors" />
                </a>
                <a 
                  href="mailto:sajalkumar1765@gmail.com"
                  className="p-3 rounded-xl bg-card hover:bg-card-hover border border-card-border transition-all duration-300 hover:shadow-glow group"
                >
                  <Mail className="h-5 w-5 text-foreground/70 group-hover:text-success transition-colors" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Content - 3D Code Terminal */}
          <div className="relative hidden lg:block">
            <div className="relative perspective-1000">
              <div className="transform rotate-y-12 rotate-x-6 transition-transform duration-700 hover:rotate-y-0 hover:rotate-x-0">
                <div className="bg-gradient-card border border-card-border rounded-2xl p-8 shadow-3d-lg backdrop-blur-xl">
                  {/* Terminal Header */}
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-3 h-3 rounded-full bg-destructive"></div>
                    <div className="w-3 h-3 rounded-full bg-warning"></div>
                    <div className="w-3 h-3 rounded-full bg-success"></div>
                    <span className="ml-4 text-sm text-muted-foreground">sajal-portfolio.tsx</span>
                  </div>

                  {/* Terminal Content */}
                  <div className="space-y-4 font-mono text-sm">
                    <div className="flex items-center">
                      <span className="text-accent mr-2">$</span>
                      <span className="text-foreground">sajal --skills</span>
                    </div>
                    
                    <div className="space-y-2 ml-4 text-muted-foreground">
                      <div className="flex items-center">
                        <span className="text-primary">●</span>
                        <span className="ml-2">Python - Advanced</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-primary">●</span>
                        <span className="ml-2">JavaScript - Intermediate</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-primary">●</span>
                        <span className="ml-2">React - Intermediate</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-primary">●</span>
                        <span className="ml-2">Java - Intermediate</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-primary">●</span>
                        <span className="ml-2">SQL - Intermediate</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-primary">●</span>
                        <span className="ml-2">HTML/CSS - Advanced</span>
                      </div>
                    </div>

                    <div className="flex items-center mt-6">
                      <span className="text-accent mr-2">$</span>
                      <span className="text-primary animate-pulse">|</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-lg opacity-80 animate-bounce" style={{ animationDelay: '0.5s' }} />
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-accent rounded-full opacity-80 animate-bounce" style={{ animationDelay: '1.5s' }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;