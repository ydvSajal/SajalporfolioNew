import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';
import profileImage from '@/assets/profile.jpg';
import Scene3D from './Scene3D';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden perspective-1000">
      {/* 3D Background Scene */}
      <Scene3D />
      
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/30 rounded-full blur-3xl animate-pulse transform-3d" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-pulse transform-3d" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-glow opacity-40 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Enhanced 3D Profile Image */}
            <div className="relative mx-auto lg:mx-0 w-56 h-56 group perspective-1000">
              <div className="absolute inset-0 bg-gradient-primary rounded-full blur-2xl opacity-70 group-hover:opacity-100 transition-all duration-700 animate-pulse" />
              <div className="absolute inset-0 bg-gradient-secondary rounded-full blur-xl opacity-50 group-hover:opacity-80 transition-all duration-700" style={{ animationDelay: '0.5s' }} />
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-card-border shadow-3d-lg group-hover:shadow-glow transition-all duration-700 transform group-hover:scale-110 group-hover:rotate-y-12 transform-3d">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 mix-blend-overlay" />
                <img 
                  src={profileImage} 
                  alt="Sajal's Profile" 
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              {/* Floating 3D Elements around profile */}
              <div className="absolute -top-4 -right-4 w-6 h-6 bg-primary rounded-full opacity-80 animate-bounce shadow-glow" style={{ animationDelay: '0.2s' }} />
              <div className="absolute -bottom-6 -left-6 w-4 h-4 bg-accent rounded-full opacity-80 animate-bounce shadow-glow" style={{ animationDelay: '1s' }} />
              <div className="absolute top-1/4 -right-8 w-3 h-3 bg-secondary-glow rounded-full opacity-60 animate-pulse" style={{ animationDelay: '0.8s' }} />
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

          {/* Enhanced 3D Code Terminal */}
          <div className="relative hidden lg:block">
            <div className="relative perspective-1000">
              <div className="transform rotate-y-12 rotate-x-6 transition-all duration-1000 hover:rotate-y-6 hover:rotate-x-3 hover:scale-105 group">
                <div className="bg-gradient-card border border-card-border rounded-2xl p-8 shadow-3d-lg backdrop-blur-xl relative overflow-hidden">
                  {/* Animated border glow */}
                  <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl blur-sm" />
                  <div className="absolute inset-0 border-2 border-transparent bg-gradient-primary rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" style={{ mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'exclude' }} />
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

            {/* Enhanced Floating 3D Elements */}
            <div className="absolute -top-6 -right-6 w-10 h-10 bg-gradient-primary rounded-xl opacity-80 animate-bounce shadow-glow transform-3d hover:rotate-45 transition-transform duration-300" style={{ animationDelay: '0.5s' }} />
            <div className="absolute -bottom-6 -left-6 w-8 h-8 bg-gradient-secondary rounded-full opacity-80 animate-bounce shadow-glow transform-3d hover:scale-125 transition-transform duration-300" style={{ animationDelay: '1.5s' }} />
            <div className="absolute top-1/4 -left-8 w-4 h-4 bg-accent rounded-lg opacity-60 animate-pulse shadow-soft" style={{ animationDelay: '0.8s' }} />
            <div className="absolute bottom-1/3 -right-8 w-6 h-6 bg-primary-light rounded-full opacity-70 animate-pulse shadow-soft" style={{ animationDelay: '1.2s' }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;