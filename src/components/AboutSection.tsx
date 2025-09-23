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
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-16 left-16 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-16 right-16 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
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

            {/* Fun Stats */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-gradient-card border border-card-border rounded-xl p-4 text-center shadow-3d hover:shadow-3d-lg transition-all duration-300 group">
                <div className="text-2xl font-bold text-primary group-hover:scale-110 transition-transform duration-300">6+</div>
                <div className="text-sm text-muted-foreground">Projects Completed</div>
              </div>
              <div className="bg-gradient-card border border-card-border rounded-xl p-4 text-center shadow-3d hover:shadow-3d-lg transition-all duration-300 group">
                <div className="text-2xl font-bold text-accent group-hover:scale-110 transition-transform duration-300">3+</div>
                <div className="text-sm text-muted-foreground">Years Learning</div>
              </div>
            </div>
          </div>

          {/* Right Content - Personal Information */}
          <div className="relative">
            <div className="bg-gradient-card border border-card-border rounded-2xl p-8 shadow-3d-lg backdrop-blur-xl">
              <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
                Personal Information
              </h3>
              
              <div className="space-y-6">
                {personalInfo.map((info, index) => (
                  <div 
                    key={info.label}
                    className="group flex items-start space-x-4 p-4 rounded-xl bg-card/50 border border-card-border/50 hover:bg-card-hover/50 transition-all duration-300 hover:shadow-glow"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className={`p-3 rounded-xl bg-gradient-to-br from-card-hover to-card border border-card-border group-hover:scale-110 transition-transform duration-300`}>
                      <info.icon className={`h-5 w-5 ${info.color}`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                        {info.label}
                      </h4>
                      <p className="text-muted-foreground text-sm break-words">
                        {info.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Education Timeline */}
              <div className="mt-8 pt-6 border-t border-card-border">
                <h4 className="font-semibold text-foreground mb-4 text-center">Current Focus</h4>
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 bg-gradient-primary/10 border border-primary/30 rounded-full px-4 py-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <span className="text-sm font-medium text-primary">
                      Learning Full-Stack Development
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-primary rounded-full opacity-80 animate-bounce" style={{ animationDelay: '0.5s' }} />
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-accent rounded-full opacity-80 animate-bounce" style={{ animationDelay: '1.5s' }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;