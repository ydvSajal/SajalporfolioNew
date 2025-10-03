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
    <section id="about" className="py-20 bg-background-secondary relative overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0">
        <div className="absolute top-16 left-16 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-16 right-16 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-primary mx-auto mb-6 rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Who I Am
              </h3>
              
              <div className="space-y-4 text-foreground/80 leading-relaxed">
                <p>
                  I'm a passionate Computer Science student at Bennett University with a strong interest in software development, web technologies, and creating solutions that make an impact.
                </p>
                
                <p>
                  My journey in technology began with curiosity about how things work, which evolved into building applications that solve real problems. I enjoy the process of turning ideas into functional products.
                </p>
                
                <p>
                  When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or working on personal projects that challenge my skills.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-gradient-card border border-card-border rounded-lg p-5 text-center shadow-card hover:shadow-float transition-all duration-300">
                <div className="text-3xl font-bold text-primary mb-1">6+</div>
                <div className="text-sm text-muted-foreground">Projects</div>
              </div>
              <div className="bg-gradient-card border border-card-border rounded-lg p-5 text-center shadow-card hover:shadow-float transition-all duration-300">
                <div className="text-3xl font-bold text-accent mb-1">3+</div>
                <div className="text-sm text-muted-foreground">Years</div>
              </div>
            </div>
          </div>

          {/* Right Content - Personal Information */}
          <div className="bg-gradient-card border border-card-border rounded-xl p-8 shadow-card hover:shadow-float transition-all duration-300">
            <h3 className="text-2xl font-semibold text-foreground mb-6">Personal Info</h3>
            
            <div className="space-y-5">
              {personalInfo.map((info) => (
                <div 
                  key={info.label}
                  className="group flex items-start space-x-4 p-4 rounded-lg bg-card/30 border border-card-border/50 hover:bg-card-hover/50 transition-all duration-300"
                >
                  <div className="p-2.5 rounded-lg bg-card-hover border border-card-border">
                    <info.icon className={`h-5 w-5 ${info.color}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground/90 mb-0.5 text-sm">
                      {info.label}
                    </h4>
                    <p className="text-muted-foreground text-sm break-words">
                      {info.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Current Focus */}
            <div className="mt-8 pt-6 border-t border-card-border/50">
              <h4 className="font-medium text-foreground/90 mb-3 text-sm">Current Focus</h4>
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-lg px-3 py-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                <span className="text-sm text-primary/90">
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