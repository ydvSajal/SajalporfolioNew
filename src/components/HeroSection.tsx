import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';
import profileImage from '@/assets/profile-new.jpg';
import { TypingAnimation } from './TypingAnimation';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Retro Decorative Elements */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 border-4 border-primary retro-shadow-lg" />
        <div className="absolute bottom-20 right-20 w-40 h-40 rounded-full border-4 border-accent retro-shadow-lg" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 rotate-45 border-4 border-primary/40 retro-shadow" />
        <div className="absolute top-1/3 right-1/4 w-28 h-28 bg-accent/10 border-2 border-accent" />
        <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-primary/10 border-2 border-primary rotate-12" />
      </div>

      <div className="container mx-auto px-4 py-12 md:py-20 relative z-20">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-6 md:space-y-8 text-center lg:text-left">
            {/* Elegant Profile Image */}
            <div className="relative mx-auto lg:mx-0 w-40 h-40 md:w-56 md:h-56 group">
              <div className="absolute -inset-2 bg-primary/20 retro-border retro-shadow-lg" />
              <div className="relative w-full h-full overflow-hidden border-4 border-border retro-shadow-xl group-hover:retro-shadow-2xl transition-all duration-300 group-hover:-translate-y-1">
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
                <div className="inline-block relative">
                  <div className="absolute inset-0 bg-primary translate-x-1 translate-y-1" />
                  <h1 className="relative text-4xl md:text-6xl lg:text-7xl font-heading bg-card text-foreground px-4 md:px-6 py-2 md:py-3 retro-border retro-shadow-xl">
                    <span className="block text-sm md:text-lg font-sans mb-1">👋 Hi, I'm</span>
                    Sajal
                  </h1>
                </div>
                <div className="text-base md:text-xl text-foreground font-medium min-h-[2em] bg-accent/20 border-2 border-border px-4 py-2 retro-shadow inline-block">
                  <TypingAnimation 
                    texts={[
                      "Full Stack Developer 💻",
                      "Problem Solver 🧩",
                      "CS Student at Bennett University 🎓",
                      "Tech Enthusiast 🚀"
                    ]}
                    speed={100}
                  />
                </div>
              </div>

              <p className="text-sm md:text-base text-foreground bg-card max-w-lg mx-auto lg:mx-0 leading-relaxed border-l-4 border-primary pl-4 py-3 retro-shadow">
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
                  className="p-3 md:p-4 bg-card hover:bg-primary border-2 border-border retro-shadow hover:retro-shadow-lg transition-all duration-300 group"
                >
                  <Github className="h-5 w-5 md:h-6 md:w-6 text-foreground group-hover:text-primary-foreground transition-colors" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/sajal-yadav-6a0b5930a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 md:p-4 bg-card hover:bg-accent border-2 border-border retro-shadow hover:retro-shadow-lg transition-all duration-300 group"
                >
                  <Linkedin className="h-5 w-5 md:h-6 md:w-6 text-foreground group-hover:text-accent-foreground transition-colors" />
                </a>
                <a 
                  href="mailto:sajalkumar1765@gmail.com"
                  className="p-3 md:p-4 bg-card hover:bg-secondary border-2 border-border retro-shadow hover:retro-shadow-lg transition-all duration-300 group"
                >
                  <Mail className="h-5 w-5 md:h-6 md:w-6 text-foreground group-hover:text-secondary-foreground transition-colors" />
                </a>
              </div>
            </div>
          </div>

          {/* Elegant Code Terminal */}
          <div className="relative hidden lg:block">
            <div className="bg-card border-4 border-border p-6 md:p-8 retro-shadow-xl hover:retro-shadow-2xl transition-all duration-300 group relative">
              {/* Colorful corner accent */}
              <div className="absolute top-0 left-0 w-16 h-16 bg-accent/30 -translate-y-8 -translate-x-8 rotate-45" />
              
              {/* Terminal Header */}
              <div className="flex items-center gap-2 mb-6 border-b-2 border-border pb-3">
                <div className="w-4 h-4 bg-destructive border-2 border-border retro-shadow"></div>
                <div className="w-4 h-4 bg-primary border-2 border-border retro-shadow"></div>
                <div className="w-4 h-4 bg-accent border-2 border-border retro-shadow"></div>
                <span className="ml-4 text-sm font-bold text-foreground bg-primary/20 px-2 py-1 border border-border">skills.tsx</span>
              </div>

              {/* Terminal Content */}
              <div className="space-y-4 font-mono text-sm">
                <div className="flex items-center bg-accent/10 border-l-4 border-accent px-3 py-2">
                  <span className="text-accent-foreground font-bold mr-2">$</span>
                  <span className="text-foreground font-bold">sajal --skills</span>
                </div>
                
                <div className="space-y-2 ml-4 text-foreground">
                  <div className="flex items-center hover:bg-primary/10 px-2 py-1 transition-colors">
                    <span className="text-primary text-xl">●</span>
                    <span className="ml-2 font-medium">Python - Advanced</span>
                  </div>
                  <div className="flex items-center hover:bg-accent/10 px-2 py-1 transition-colors">
                    <span className="text-accent text-xl">●</span>
                    <span className="ml-2 font-medium">JavaScript - Intermediate</span>
                  </div>
                  <div className="flex items-center hover:bg-primary/10 px-2 py-1 transition-colors">
                    <span className="text-primary text-xl">●</span>
                    <span className="ml-2 font-medium">React - Intermediate</span>
                  </div>
                  <div className="flex items-center hover:bg-accent/10 px-2 py-1 transition-colors">
                    <span className="text-accent text-xl">●</span>
                    <span className="ml-2 font-medium">Java - Intermediate</span>
                  </div>
                  <div className="flex items-center hover:bg-primary/10 px-2 py-1 transition-colors">
                    <span className="text-primary text-xl">●</span>
                    <span className="ml-2 font-medium">SQL - Intermediate</span>
                  </div>
                  <div className="flex items-center hover:bg-accent/10 px-2 py-1 transition-colors">
                    <span className="text-accent text-xl">●</span>
                    <span className="ml-2 font-medium">HTML/CSS - Advanced</span>
                  </div>
                </div>

                <div className="flex items-center mt-6 bg-secondary/20 border-l-4 border-secondary px-3 py-2">
                  <span className="text-secondary-foreground font-bold mr-2">$</span>
                  <span className="text-primary font-bold animate-pulse">|</span>
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