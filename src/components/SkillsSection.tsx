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
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
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
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              className="group relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* 3D Card Effect */}
              <div className="relative perspective-1000">
                <div className="bg-gradient-card border border-card-border rounded-2xl p-6 shadow-3d transition-all duration-500 transform group-hover:shadow-3d-lg group-hover:-translate-y-2 group-hover:rotate-y-12">
                  {/* Icon */}
                  <div className="mb-6">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-card-hover to-card flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <category.icon className={`h-6 w-6 ${category.color}`} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    {category.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm mb-4">
                    {category.description}
                  </p>

                  {/* Skills List */}
                  <div className="space-y-2">
                    {category.skills.map((skill) => (
                      <div key={skill} className="flex items-center group/skill">
                        <CheckCircle className="h-4 w-4 text-success mr-2 group-hover/skill:scale-110 transition-transform duration-200" />
                        <span className="text-foreground/80 text-sm group-hover/skill:text-foreground transition-colors duration-200">
                          {skill}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500" />
                </div>
              </div>

              {/* Floating Icon */}
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <category.icon className="h-4 w-4 text-primary-foreground" />
              </div>
            </div>
          ))}
        </div>

        {/* Additional Skills */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 bg-card border border-card-border rounded-full px-6 py-3 shadow-3d">
            <span className="text-muted-foreground">Technologies I work with:</span>
            <div className="flex items-center gap-2 ml-2">
              {['TypeScript', 'Git', 'VS Code', 'Linux'].map((tech) => (
                <span 
                  key={tech}
                  className="bg-gradient-to-r from-primary/20 to-accent/20 text-foreground px-3 py-1 rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;