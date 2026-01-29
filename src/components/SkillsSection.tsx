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
      color: 'text-primary',
      bgColor: 'bg-primary',
      progressColor: 'bg-primary',
      skills: [
        { name: 'Python', level: 85 },
        { name: 'Java', level: 80 },
        { name: 'JavaScript', level: 90 }
      ],
      description: 'Core programming languages'
    },
    {
      title: 'Web Development',
      icon: Globe,
      color: 'text-accent',
      bgColor: 'bg-accent',
      progressColor: 'bg-accent',
      skills: [
        { name: 'HTML/CSS', level: 95 },
        { name: 'React', level: 88 },
        { name: 'TypeScript', level: 82 }
      ],
      description: 'Modern web frameworks'
    },
    {
      title: 'Database',
      icon: Database,
      color: 'text-primary',
      bgColor: 'bg-accent',
      progressColor: 'bg-accent',
      skills: [
        { name: 'SQL', level: 78 },
        { name: 'Database Design', level: 75 },
        { name: 'ORM Systems', level: 70 }
      ],
      description: 'Data management systems'
    },
    {
      title: 'Game Development',
      icon: Cpu,
      color: 'text-card',
      bgColor: 'bg-card',
      progressColor: 'bg-primary',
      skills: [
        { name: 'Pygame', level: 72 },
        { name: 'Game Logic', level: 80 },
        { name: '2D Graphics', level: 75 }
      ],
      description: 'Interactive entertainment'
    }
  ];

  return (
    <section id="skills" ref={sectionRef} className="py-12 md:py-20 bg-background relative overflow-hidden">
      {/* Retro Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-accent/20" />
        <div className="absolute bottom-10 right-10 w-40 h-40 border-2 border-primary/20 rotate-45" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-block relative">
            <div className="absolute inset-0 bg-accent translate-x-1 translate-y-1" />
            <h2 className="relative text-3xl md:text-4xl font-heading bg-card text-foreground px-6 py-3 retro-border retro-shadow-lg">
              🎯 My Skills
            </h2>
          </div>
          <div className="w-32 h-2 bg-accent mx-auto my-6 retro-border" />
          <p className="text-foreground/80 max-w-2xl mx-auto text-sm md:text-base">
            A diverse skill set through academic journey and projects
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {skillCategories.map((category, idx) => (
            <div key={category.title} className="group">
              <div className="bg-card border-4 border-border p-5 md:p-6 retro-shadow hover:retro-shadow-lg transition-all">
                {/* Icon */}
                <div className="mb-4 md:mb-5">
                  <div className={`w-12 h-12 border-2 border-border ${category.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <category.icon className={`h-6 w-6 ${idx % 2 === 0 ? 'text-primary-foreground' : 'text-accent-foreground'}`} />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg md:text-xl font-heading text-foreground mb-2">
                  {category.title}
                </h3>

                {/* Description */}
                <p className="text-foreground/70 text-xs md:text-sm mb-4">
                  {category.description}
                </p>

                {/* Skills List with Progress Bars */}
                <div className="space-y-3">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-foreground/80 text-xs md:text-sm font-bold">
                          {skill.name}
                        </span>
                        <span className="text-foreground/60 text-xs font-bold">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-background border-2 border-border">
                        <div 
                          className={`h-full ${category.progressColor} transition-all duration-1000 ease-out`}
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
          <p className="text-foreground/70 text-xs md:text-sm mb-4 font-bold">⚙️ TECHNOLOGIES I WORK WITH</p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Git', 'VS Code', 'Linux', 'Figma'].map((tech, idx) => (
              <span 
                key={tech}
                className={`${idx % 2 === 0 ? 'bg-primary text-primary-foreground' : 'bg-accent text-accent-foreground'} border-2 border-border px-4 py-2 text-xs md:text-sm font-bold retro-shadow hover:retro-shadow-md transition-all`}
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