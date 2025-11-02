import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';
import profileImage from '@/assets/profile-new.jpg';
import Scene3D from './Scene3D';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden perspective-1000">
      {/* 3D Background Scene */}
      <Scene3D />
      
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary/8 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent/8 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-12 md:py-20 relative z-20">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-6 md:space-y-8 text-center lg:text-left">
            {/* Elegant Profile Image */}
            <div className="relative mx-auto lg:mx-0 w-40 h-40 md:w-56 md:h-56 group">
              <div className="absolute inset-0 bg-gradient-primary rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-all duration-500" />
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-card-border shadow-card group-hover:shadow-float transition-all duration-500 transform group-hover:scale-105">
                <img 
                  src={profileImage} 
                  alt="Sajal's Profile" 
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Text Content */}
            <div className="space-y-4 md:space-y-6">
              <div className="space-y-3 md:space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  <span className="block text-foreground/80 text-xl md:text-2xl font-normal mb-2">Hi, I'm</span>
                  <span className="block bg-gradient-primary bg-clip-text text-transparent">
                    Sajal
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground font-light">
                  Passionate Developer & CS Student at Bennett University
                </p>
              </div>

              <p className="text-sm md:text-base text-foreground/80 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                I love creating innovative solutions and learning new technologies. My journey in computer science is driven by curiosity and the desire to build meaningful applications that solve real-world problems.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg" 
                  className="bg-gradient-primary hover:shadow-glow transition-all duration-300 transform hover:-translate-y-0.5 text-sm md:text-base"
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  View My Work
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-border hover:bg-card-hover hover:border-primary/30 transition-all duration-300 text-sm md:text-base"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Contact Me
                  <Mail className="ml-2 h-4 w-4" />
                </Button>
              </div>

              {/* Social Links */}
              <div className="flex gap-2 md:gap-3 justify-center lg:justify-start">
                <a 
                  href="https://github.com/ydvSajal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 md:p-3 rounded-lg bg-card hover:bg-card-hover border border-card-border transition-all duration-300 group"
                >
                  <Github className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/sajal-yadav-6a0b5930a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 md:p-3 rounded-lg bg-card hover:bg-card-hover border border-card-border transition-all duration-300 group"
                >
                  <Linkedin className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground group-hover:text-accent transition-colors" />
                </a>
                <a 
                  href="mailto:sajalkumar1765@gmail.com"
                  className="p-2.5 md:p-3 rounded-lg bg-card hover:bg-card-hover border border-card-border transition-all duration-300 group"
                >
                  <Mail className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground group-hover:text-success transition-colors" />
                </a>
              </div>
            </div>
          </div>

          {/* Elegant Code Terminal */}
          <div className="relative hidden lg:block">
            <div className="bg-gradient-card border border-card-border rounded-xl p-8 shadow-card hover:shadow-float transition-all duration-500 group">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-destructive/80"></div>
                <div className="w-3 h-3 rounded-full bg-warning/80"></div>
                <div className="w-3 h-3 rounded-full bg-success/80"></div>
                <span className="ml-4 text-sm text-muted-foreground">skills.tsx</span>
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
      </div>
    </section>
  );
};

export default HeroSection;