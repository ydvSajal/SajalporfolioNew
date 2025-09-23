import { Github, Linkedin, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background-tertiary border-t border-card-border relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="text-center">
          {/* Logo */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
              Sajal's Portfolio
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Passionate developer creating innovative solutions and meaningful applications.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4 mb-8">
            <a
              href="https://github.com/ydvSajal"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3 rounded-xl bg-card hover:bg-card-hover border border-card-border transition-all duration-300 hover:shadow-glow"
            >
              <Github className="h-5 w-5 text-foreground/70 group-hover:text-foreground transition-colors" />
            </a>
            <a
              href="https://www.linkedin.com/in/sajal-yadav-6a0b5930a"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3 rounded-xl bg-card hover:bg-card-hover border border-card-border transition-all duration-300 hover:shadow-glow"
            >
              <Linkedin className="h-5 w-5 text-foreground/70 group-hover:text-accent transition-colors" />
            </a>
            <a
              href="mailto:sajalkumar1765@gmail.com"
              className="group p-3 rounded-xl bg-card hover:bg-card-hover border border-card-border transition-all duration-300 hover:shadow-glow"
            >
              <Mail className="h-5 w-5 text-foreground/70 group-hover:text-primary transition-colors" />
            </a>
          </div>

          {/* Quick Links */}
          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <a 
                href="#about" 
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                About
              </a>
              <a 
                href="#skills" 
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                Skills
              </a>
              <a 
                href="#education" 
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                Education
              </a>
              <a 
                href="#projects" 
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                Projects
              </a>
              <a 
                href="#contact" 
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                Contact
              </a>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-primary opacity-30 mb-6" />

          {/* Copyright */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm text-muted-foreground">
            <span>© {currentYear} Sajal Yadav. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <div className="flex items-center gap-1">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-destructive animate-pulse" />
              <span>using React & TypeScript</span>
            </div>
          </div>

          {/* Additional Note */}
          <div className="mt-4 text-xs text-muted-foreground/70">
            Built with modern web technologies and lots of coffee ☕
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;