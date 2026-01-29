import { User, Mail, MapPin, Book } from 'lucide-react';

const AboutSection = () => {
  const personalInfo = [
    {
      icon: User,
      label: 'Name',
      value: 'Sajal Yadav',
      color: 'text-primary'
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'sajalkumar1765@gmail.com',
      color: 'text-accent'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Bennett University, India',
      color: 'text-success'
    },
    {
      icon: Book,
      label: 'Education',
      value: 'B.Tech in Computer Science Engineering',
      color: 'text-warning'
    }
  ];

  return (
    <section id="about" className="py-12 md:py-20 bg-background relative overflow-hidden">
      {/* Retro Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-32 h-32 border-2 border-primary/20" />
        <div className="absolute bottom-20 left-20 w-24 h-24 border-2 border-accent/20 rotate-45" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-block relative">
            <div className="absolute inset-0 bg-primary translate-x-1 translate-y-1" />
            <h2 className="relative text-3xl md:text-4xl font-heading bg-card text-foreground px-6 py-3 retro-border retro-shadow-lg">
              👤 About Me
            </h2>
          </div>
          <div className="w-32 h-2 bg-primary mx-auto my-6 retro-border" />
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="bg-card border-4 border-border p-6 md:p-8 retro-shadow-lg">
              <h3 className="text-xl md:text-2xl font-heading text-foreground mb-4 flex items-center gap-2">
                <span className="text-2xl">💡</span> Who I Am
              </h3>
              
              <div className="space-y-4 text-sm md:text-base text-foreground leading-relaxed">
                <p className="border-l-4 border-primary pl-4">
                  I'm a passionate Computer Science student at Bennett University with a strong interest in software development, web technologies, and creating solutions that make an impact.
                </p>
                
                <p className="border-l-4 border-accent pl-4">
                  My journey in technology began with curiosity about how things work, which evolved into building applications that solve real problems.
                </p>
                
                <p className="border-l-4 border-secondary pl-4">
                  When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or working on personal projects.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary border-4 border-border p-5 text-center retro-shadow-lg hover:retro-shadow-xl transition-all">
                <div className="text-3xl md:text-4xl font-heading text-primary-foreground mb-1">6+</div>
                <div className="text-sm font-bold text-primary-foreground">Projects</div>
              </div>
              <div className="bg-accent border-4 border-border p-5 text-center retro-shadow-lg hover:retro-shadow-xl transition-all">
                <div className="text-3xl md:text-4xl font-heading text-accent-foreground mb-1">3+</div>
                <div className="text-sm font-bold text-accent-foreground">Years</div>
              </div>
            </div>
          </div>

          {/* Right Content - Personal Information */}
          <div className="bg-card border-4 border-border p-6 md:p-8 retro-shadow-lg">
            <h3 className="text-xl md:text-2xl font-heading text-foreground mb-6 flex items-center gap-2">
              <span className="text-2xl">📋</span> Personal Info
            </h3>
            
            <div className="space-y-4">
              {personalInfo.map((info, idx) => (
                <div 
                  key={info.label}
                  className={`flex items-start gap-3 p-4 border-2 border-border retro-shadow hover:retro-shadow-md transition-all ${ 
                    idx % 2 === 0 ? 'bg-card' : 'bg-accent/10'
                  }`}
                >
                  <div className={`p-2 border-2 border-border ${info.color} bg-primary/10`}>
                    <info.icon className="h-5 w-5" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-foreground text-sm">
                      {info.label}
                    </h4>
                    <p className="text-foreground/80 text-xs md:text-sm break-words">
                      {info.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Current Focus */}
            <div className="mt-8 pt-6 border-t-4 border-primary">
              <h4 className="font-bold text-foreground mb-3 text-sm">🎯 Current Focus</h4>
              <div className="inline-flex items-center gap-2 bg-primary border-2 border-border px-4 py-2 retro-shadow">
                <div className="w-2 h-2 bg-primary-foreground animate-pulse" />
                <span className="text-sm font-bold text-primary-foreground">
                  Full-Stack Development
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;