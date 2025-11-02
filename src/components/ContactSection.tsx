import { useState } from 'react';
import { Mail, Github, Linkedin, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'sajalkumar1765@gmail.com',
      href: 'mailto:sajalkumar1765@gmail.com',
      color: 'text-primary'
    },
    {
      icon: Github,
      title: 'GitHub',
      value: 'github.com/ydvSajal',
      href: 'https://github.com/ydvSajal',
      color: 'text-foreground'
    },
    {
      icon: Linkedin,
      title: 'LinkedIn',
      value: 'linkedin.com/in/sajal-yadav',
      href: 'https://www.linkedin.com/in/sajal-yadav-6a0b5930a',
      color: 'text-accent'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Bennett University, India',
      href: '#',
      color: 'text-success'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields before sending.",
        variant: "destructive"
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. I'll get back to you soon!",
    });

    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-12 md:py-20 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-primary mx-auto mb-4 md:mb-6 rounded-full" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-lg">
            Have a question or want to work together? Feel free to reach out!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Information */}
          <div className="space-y-6 md:space-y-8">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-5 md:mb-6">
                Contact Information
              </h3>
              
              <div className="space-y-3 md:space-y-4">
                {contactInfo.map((info, index) => (
                  <a
                    key={info.title}
                    href={info.href}
                    target={info.href.startsWith('http') ? '_blank' : undefined}
                    rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group flex items-center space-x-3 md:space-x-4 p-3 md:p-4 rounded-lg md:rounded-xl bg-gradient-card border border-card-border hover:bg-card-hover transition-all duration-300 hover:shadow-glow"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="p-2 md:p-3 rounded-lg md:rounded-xl bg-gradient-to-br from-card-hover to-card border border-card-border group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      <info.icon className={`h-4 w-4 md:h-5 md:w-5 ${info.color}`} />
                    </div>
                    
                    <div className="min-w-0">
                      <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300 text-sm md:text-base">
                        {info.title}
                      </h4>
                      <p className="text-muted-foreground text-xs md:text-sm truncate">
                        {info.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-base md:text-lg font-semibold text-foreground mb-3 md:mb-4">
                Connect with me
              </h4>
              <div className="flex gap-3 md:gap-4">
                <a
                  href="https://github.com/ydvSajal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 md:p-4 rounded-lg md:rounded-xl bg-gradient-card border border-card-border hover:bg-card-hover transition-all duration-300 hover:shadow-glow group"
                >
                  <Github className="h-5 w-5 md:h-6 md:w-6 text-foreground/70 group-hover:text-foreground transition-colors" />
                </a>
                <a
                  href="https://www.linkedin.com/in/sajal-yadav-6a0b5930a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 md:p-4 rounded-lg md:rounded-xl bg-gradient-card border border-card-border hover:bg-card-hover transition-all duration-300 hover:shadow-glow group"
                >
                  <Linkedin className="h-5 w-5 md:h-6 md:w-6 text-foreground/70 group-hover:text-accent transition-colors" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="relative">
            <div className="bg-gradient-card border border-card-border rounded-xl md:rounded-2xl p-6 md:p-8 shadow-3d-lg backdrop-blur-xl">
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-5 md:mb-6 text-center">
                Send a Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div>
                  <label htmlFor="name" className="block text-xs md:text-sm font-medium text-foreground mb-1.5 md:mb-2">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    className="bg-card/50 border-card-border focus:border-primary transition-colors duration-300 text-sm md:text-base h-9 md:h-10"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-xs md:text-sm font-medium text-foreground mb-1.5 md:mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your Email"
                    className="bg-card/50 border-card-border focus:border-primary transition-colors duration-300 text-sm md:text-base h-9 md:h-10"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-xs md:text-sm font-medium text-foreground mb-1.5 md:mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Your Message"
                    rows={4}
                    className="bg-card/50 border-card-border focus:border-primary transition-colors duration-300 resize-none text-sm md:text-base"
                  />
                </div>
                
                <Button 
                  type="submit"
                  className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300 transform hover:scale-105 text-sm md:text-base h-9 md:h-10"
                >
                  <Send className="h-3.5 w-3.5 md:h-4 md:w-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </div>

            {/* Floating Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-6 h-6 md:w-8 md:h-8 bg-gradient-primary rounded-full opacity-80 animate-bounce hidden sm:block" style={{ animationDelay: '0.5s' }} />
            <div className="absolute -bottom-4 -left-4 w-5 h-5 md:w-6 md:h-6 bg-accent rounded-full opacity-80 animate-bounce hidden sm:block" style={{ animationDelay: '1.5s' }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;