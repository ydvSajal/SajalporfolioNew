import { Code, Globe, Database, Cpu, CheckCircle } from 'lucide-react';

const SkillsSection = () => {
  const skillCategories = [
    {
      title: 'Programming',
      icon: Code,
      color: 'text-primary',
      skills: ['Python', 'Java', 'JavaScript'],
      description: 'Core programming languages and paradigms'
    },
    {
      title: 'Web Development',
      icon: Globe,
      color: 'text-accent',
      skills: ['HTML/CSS', 'React', 'JavaScript'],
      description: 'Modern web technologies and frameworks'
    },
    {
      title: 'Database',
      icon: Database,
      color: 'text-success',
      skills: ['SQL', 'Database Design', 'ORM Systems'],
      description: 'Data management and storage solutions'
    },
    {
      title: 'Game Development',
      icon: Cpu,
      color: 'text-warning',
      skills: ['Pygame', 'Game Logic', '2D Graphics'],
      description: 'Interactive entertainment applications'
    }
  ];

  return (
    <section id="skills" className="py-20 bg-background-secondary relative overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              My Skills
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-primary mx-auto mb-6 rounded-full" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            I've developed a diverse skill set through my academic journey and personal projects.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category) => (
            <div key={category.title} className="group">
              <div className="bg-gradient-card border border-card-border rounded-xl p-6 shadow-card hover:shadow-float transition-all duration-300 hover:-translate-y-1">
                {/* Icon */}
                <div className="mb-5">
                  <div className="w-12 h-12 rounded-lg bg-card-hover border border-card-border flex items-center justify-center">
                    <category.icon className={`h-6 w-6 ${category.color}`} />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {category.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {category.description}
                </p>

                {/* Skills List */}
                <div className="space-y-2">
                  {category.skills.map((skill) => (
                    <div key={skill} className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-success/70 mr-2 flex-shrink-0" />
                      <span className="text-foreground/70 text-sm">
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Skills */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground text-sm mb-3">Technologies I work with</p>
          <div className="flex flex-wrap justify-center gap-2">
            {['TypeScript', 'Git', 'VS Code', 'Linux'].map((tech) => (
              <span 
                key={tech}
                className="bg-card border border-card-border text-foreground/80 px-4 py-2 rounded-lg text-sm hover:bg-card-hover transition-colors duration-300"
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