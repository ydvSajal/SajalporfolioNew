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
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-3">
            About Me
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="space-y-4 text-foreground/70 leading-relaxed">
              <p>
                I'm a Computer Science student at Bennett University passionate about software development and web technologies.
              </p>
              
              <p>
                My journey started with curiosity — I wanted to understand how things worked. That curiosity turned into building apps that solve actual problems.
              </p>
              
              <p>
                When I'm not coding, I'm exploring new tech, contributing to open-source, or working on side projects that push my skills.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="bg-card border border-border rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-primary">6+</div>
                <div className="text-sm text-muted-foreground mt-1">Projects</div>
              </div>
              <div className="bg-card border border-border rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-accent">3+</div>
                <div className="text-sm text-muted-foreground mt-1">Years Coding</div>
              </div>
            </div>
          </div>

          {/* Right Content - Personal Info */}
          <div>
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-xl font-bold text-foreground mb-6">
                Quick Facts
              </h3>
              
              <div className="space-y-5">
                {personalInfo.map((info) => (
                  <div 
                    key={info.label}
                    className="flex items-start gap-3"
                  >
                    <div className="p-2 rounded-lg bg-muted">
                      <info.icon className={`h-5 w-5 ${info.color}`} />
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground text-sm">
                        {info.label}
                      </h4>
                      <p className="text-muted-foreground text-sm mt-0.5">
                        {info.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Current Focus */}
              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-success rounded-full" />
                  <span className="text-foreground font-medium">Currently learning Full-Stack Development</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;