import { Code, Globe, Database, Cpu, CheckCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const SkillsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const skillCategories = [
    {
      title: 'Programming',
      icon: Code,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      progressColor: 'bg-blue-500',
      skills: [
        { name: 'Python', level: 85 },
        { name: 'Java', level: 80 },
        { name: 'JavaScript', level: 90 }
      ],
      description: 'Core programming languages and paradigms'
    },
    {
      title: 'Web Development',
      icon: Globe,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      progressColor: 'bg-green-500',
      skills: [
        { name: 'HTML/CSS', level: 95 },
        { name: 'React', level: 88 },
        { name: 'TypeScript', level: 82 }
      ],
      description: 'Modern web technologies and frameworks'
    },
    {
      title: 'Database',
      icon: Database,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10',
      progressColor: 'bg-emerald-500',
      skills: [
        { name: 'SQL', level: 78 },
        { name: 'Database Design', level: 75 },
        { name: 'ORM Systems', level: 70 }
      ],
      description: 'Data management and storage solutions'
    },
    {
      title: 'Game Development',
      icon: Cpu,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
      progressColor: 'bg-orange-500',
      skills: [
        { name: 'Pygame', level: 72 },
        { name: 'Game Logic', level: 80 },
        { name: '2D Graphics', level: 75 }
      ],
      description: 'Interactive entertainment applications'
    }
  ];

  return (
    <section id="skills" ref={sectionRef} className="py-12 md:py-20 bg-background-secondary relative overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              My Skills
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-primary mx-auto mb-4 md:mb-6 rounded-full" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-lg">
            I've developed a diverse skill set through my academic journey and personal projects.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {skillCategories.map((category) => (
            <div key={category.title} className="group">
              <div className="bg-gradient-card border border-card-border rounded-xl p-5 md:p-6 shadow-card hover:shadow-float transition-all duration-300 hover:-translate-y-1">
                {/* Icon */}
                <div className="mb-4 md:mb-5">
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg ${category.bgColor} border border-card-border flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <category.icon className={`h-5 w-5 md:h-6 md:w-6 ${category.color} stroke-[2.5]`} />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                  {category.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-xs md:text-sm mb-4 leading-relaxed">
                  {category.description}
                </p>

                {/* Skills List with Progress Bars */}
                <div className="space-y-3">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-foreground/70 text-xs md:text-sm">
                          {skill.name}
                        </span>
                        <span className="text-foreground/50 text-xs">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-card-hover rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${category.progressColor} transition-all duration-1000 ease-out rounded-full`}
                          style={{ 
                            width: isVisible ? `${skill.level}%` : '0%',
                            transitionDelay: `${category.skills.indexOf(skill) * 100}ms`
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Skills */}
        <div className="mt-10 md:mt-12 text-center">
          <p className="text-muted-foreground text-xs md:text-sm mb-3">Technologies I work with</p>
          <div className="flex flex-wrap justify-center gap-2">
            {['Git', 'VS Code', 'Linux', 'Figma'].map((tech) => (
              <span 
                key={tech}
                className="bg-card border border-card-border text-foreground/80 px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm hover:bg-card-hover transition-colors duration-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;