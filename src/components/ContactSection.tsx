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
      color: 'text-primary-foreground',
      bgColor: 'bg-primary'
    },
    {
      icon: Github,
      title: 'GitHub',
      value: 'github.com/ydvSajal',
      href: 'https://github.com/ydvSajal',
      color: 'text-foreground',
      bgColor: 'bg-card'
    },
    {
      icon: Linkedin,
      title: 'LinkedIn',
      value: 'linkedin.com/in/sajal-yadav',
      href: 'https://www.linkedin.com/in/sajal-yadav-6a0b5930a',
      color: 'text-accent-foreground',
      bgColor: 'bg-accent'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Bennett University, India',
      href: '#',
      color: 'text-secondary-foreground',
      bgColor: 'bg-secondary'
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
      {/* Retro Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-36 h-36 border-2 border-primary/20 rotate-12" />
        <div className="absolute bottom-20 right-20 w-40 h-40 border-2 border-accent/20" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-block relative">
            <div className="absolute inset-0 bg-primary translate-x-1 translate-y-1" />
            <h2 className="relative text-3xl md:text-4xl font-heading bg-card text-foreground px-6 py-3 retro-border retro-shadow-lg">
              📧 Get In Touch
            </h2>
          </div>
          <div className="w-32 h-2 bg-primary mx-auto my-6 retro-border" />
          <p className="text-foreground/80 max-w-2xl mx-auto text-sm md:text-base">
            Have a question or want to work together? Feel free to reach out!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Information */}
          <div className="space-y-6 md:space-y-8">
            <div>
              <h3 className="text-xl md:text-2xl font-heading text-foreground mb-5 md:mb-6">
                📋 CONTACT INFO
              </h3>
              
              <div className="space-y-3 md:space-y-4">
                {contactInfo.map((info) => (
                  <a
                    key={info.title}
                    href={info.href}
                    target={info.href.startsWith('http') ? '_blank' : undefined}
                    rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className={`group flex items-center space-x-3 md:space-x-4 p-3 md:p-4 ${info.bgColor} border-4 border-border retro-shadow hover:retro-shadow-lg transition-all`}
                  >
                    <div className="p-2 md:p-3 border-2 border-border bg-card group-hover:scale-110 transition-transform flex-shrink-0">
                      <info.icon className={`h-4 w-4 md:h-5 md:w-5 text-foreground`} />
                    </div>
                    
                    <div className="min-w-0">
                      <h4 className={`font-heading ${info.color} text-sm md:text-base`}>
                        {info.title}
                      </h4>
                      <p className={`text-xs md:text-sm truncate font-bold ${info.color}/80`}>
                        {info.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-base md:text-lg font-heading text-foreground mb-3 md:mb-4">
                🔗 CONNECT WITH ME
              </h4>
              <div className="flex gap-3 md:gap-4">
                <a
                  href="https://github.com/ydvSajal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 md:p-4 bg-card border-4 border-border retro-shadow hover:retro-shadow-lg transition-all group"
                >
                  <Github className="h-5 w-5 md:h-6 md:w-6 text-foreground group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="https://www.linkedin.com/in/sajal-yadav-6a0b5930a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 md:p-4 bg-accent border-4 border-border retro-shadow hover:retro-shadow-lg transition-all group"
                >
                  <Linkedin className="h-5 w-5 md:h-6 md:w-6 text-accent-foreground group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="relative">
            <div className="bg-card border-4 border-border p-6 md:p-8 retro-shadow-lg">
              <h3 className="text-xl md:text-2xl font-heading text-foreground mb-5 md:mb-6 text-center">
                💌 SEND MESSAGE
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div>
                  <label htmlFor="name" className="block text-xs md:text-sm font-bold text-foreground mb-2">
                    NAME
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    className="bg-background border-2 border-border focus:border-primary transition-colors text-sm md:text-base h-10 md:h-12"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-xs md:text-sm font-bold text-foreground mb-2">
                    EMAIL
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    className="bg-background border-2 border-border focus:border-primary transition-colors text-sm md:text-base h-10 md:h-12"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-xs md:text-sm font-bold text-foreground mb-2">
                    MESSAGE
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Your message here..."
                    rows={5}
                    className="bg-background border-2 border-border focus:border-primary transition-colors resize-none text-sm md:text-base"
                  />
                </div>
                
                <Button 
                  type="submit"
                  className="w-full bg-primary text-primary-foreground border-2 border-border retro-shadow hover:retro-shadow-lg transition-all font-bold text-sm md:text-base h-10 md:h-12"
                >
                  <Send className="h-4 w-4 mr-2" />
                  SEND MESSAGE
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;