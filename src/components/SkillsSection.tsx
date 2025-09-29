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
    <section id="skills" className="py-20 bg-background-secondary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-3">
            Skills & Tools
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            A mix of technologies I've picked up through coursework and personal projects.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="bg-card border border-border rounded-lg p-5 hover:shadow-md transition-all"
            >
              {/* Icon */}
              <div className="mb-4">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                  <category.icon className={`h-5 w-5 ${category.color}`} />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-foreground mb-2">
                {category.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-sm mb-4">
                {category.description}
              </p>

              {/* Skills List */}
              <div className="space-y-2">
                {category.skills.map((skill) => (
                  <div key={skill} className="flex items-center">
                    <CheckCircle className="h-3.5 w-3.5 text-success mr-2 flex-shrink-0" />
                    <span className="text-foreground text-sm">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Tools */}
        <div className="mt-10">
          <p className="text-muted-foreground text-sm mb-3">Other tools I use:</p>
          <div className="flex flex-wrap gap-2">
            {['TypeScript', 'Git', 'VS Code', 'Linux'].map((tech) => (
              <span 
                key={tech}
                className="bg-muted text-foreground px-3 py-1 rounded text-sm"
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