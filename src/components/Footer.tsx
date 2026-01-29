import { Github, Linkedin, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { href: 'https://github.com/ydvSajal', icon: Github, label: 'GitHub', hoverColor: 'hover:bg-primary' },
    { href: 'https://www.linkedin.com/in/sajal-yadav-6a0b5930a', icon: Linkedin, label: 'LinkedIn', hoverColor: 'hover:bg-accent' },
    { href: 'mailto:sajalkumar1765@gmail.com', icon: Mail, label: 'Email', hoverColor: 'hover:bg-secondary' },
  ];

  const quickLinks = [
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#education', label: 'Education' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <footer className="bg-card border-t-4 border-border relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-10 w-24 h-24 border-2 border-primary/20 rotate-12" />
        <div className="absolute bottom-10 right-10 w-20 h-20 border-2 border-accent/20 -rotate-12" />
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
        {/* Logo & Description */}
        <div className="text-center mb-6 md:mb-8">
          <div className="inline-block relative mb-3">
            <div className="absolute inset-0 bg-primary translate-x-0.5 translate-y-0.5" />
            <h2 className="relative text-xl md:text-2xl font-heading bg-card text-foreground px-4 py-2 border-2 border-border">
              💻 Sajal's Portfolio
            </h2>
          </div>
          <p className="text-sm text-foreground/80 max-w-md mx-auto">
            Creating innovative solutions and meaningful applications.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-3 mb-6 md:mb-8">
          {socialLinks.map(({ href, icon: Icon, label, hoverColor }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={label}
              className={`p-3 bg-card border-2 border-border retro-shadow hover:retro-shadow-lg ${hoverColor} hover:text-white transition-all duration-200 group`}
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-6 md:mb-8">
          {quickLinks.map(({ href, label }) => (
            <a
              key={label}
              href={href}
              className="text-sm font-bold text-foreground hover:text-primary transition-colors duration-200"
            >
              {label}
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full h-1 bg-primary border-y-2 border-border mb-6" />

        {/* Copyright */}
        <div className="text-center text-xs md:text-sm text-foreground/80 space-y-2">
          <p>© {currentYear} Sajal Yadav. All rights reserved.</p>
          <div className="flex items-center justify-center gap-1.5">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-destructive fill-destructive animate-pulse" />
            <span>using React & TypeScript</span>
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