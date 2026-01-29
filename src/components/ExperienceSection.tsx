import { Briefcase, Calendar, MapPin, CheckCircle } from 'lucide-react';

const ExperienceSection = () => {
  const experienceData = [
    {
      company: 'Singari Investments',
      role: 'Web Developer',
      period: 'Sep 2025 - Nov 2025',
      duration: '3 months',
      location: 'Remote',
      status: 'Completed',
      description: 'Worked as a web developer contributing to the development and enhancement of the company\'s web applications. Collaborated with the team to implement new features and improve user experience.',
      achievements: [
        'Developed responsive web interfaces',
        'Implemented modern web technologies',
        'Collaborated with cross-functional teams',
        'Enhanced website performance'
      ],
      skills: ['React', 'JavaScript', 'NestJS', 'HTML/CSS', 'Web Development']
    }
  ];

  return (
    <section id="experience" className="py-12 md:py-20 bg-background relative overflow-hidden">
      {/* Retro Colorful Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-48 h-48 border-4 border-primary/30 rotate-12 retro-shadow-lg" />
        <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full border-4 border-accent/40 retro-shadow" />
        <div className="absolute top-1/2 right-1/4 w-32 h-32 border-4 border-destructive/20 -rotate-45" />
        <div className="absolute bottom-1/3 left-1/4 w-24 h-24 bg-primary/5 retro-border" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-block relative">
            <div className="absolute inset-0 bg-primary translate-x-1 translate-y-1" />
            <h2 className="relative text-3xl md:text-4xl font-heading bg-card text-foreground px-6 py-3 retro-border retro-shadow-lg">
              💼 Experience
            </h2>
          </div>
          <div className="w-32 h-2 bg-primary mx-auto my-6 retro-border" />
          <p className="text-foreground max-w-2xl mx-auto text-sm md:text-lg">
            My professional journey and work experience.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-2 h-full bg-primary border-2 border-border hidden md:block" />
            
            {experienceData.map((exp, index) => (
              <div key={exp.company} className="relative mb-12 md:mb-16 last:mb-0">
                {/* Timeline Node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-primary border-4 border-border z-10 hidden md:block retro-shadow" />
                
                {/* Content Card */}
                <div className={`grid md:grid-cols-2 gap-6 md:gap-8 items-center ${
                  index % 2 === 0 ? '' : 'md:grid-flow-col-dense'
                }`}>
                  {/* Experience Info */}
                  <div className={`${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:col-start-2 md:pl-8'}`}>
                    <div className="bg-card border-4 border-border p-5 md:p-6 retro-shadow-lg hover:retro-shadow-xl transition-all duration-300 group relative overflow-hidden">
                      {/* Colorful corner accents */}
                      <div className="absolute top-0 right-0 w-16 h-16 bg-primary/20 -translate-y-8 translate-x-8 rotate-45" />
                      <div className="absolute bottom-0 left-0 w-12 h-12 bg-accent/20 translate-y-6 -translate-x-6 rotate-45" />
                      {/* Header */}
                      <div className="flex items-start gap-2.5 md:gap-3 mb-3 md:mb-4 relative z-10">
                        <div className="p-2 md:p-3 bg-primary border-2 border-border retro-shadow flex-shrink-0">
                          <Briefcase className="h-4 w-4 md:h-5 md:w-5 text-primary-foreground" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                            {exp.role}
                          </h3>
                          <p className="text-base md:text-lg text-primary font-semibold">{exp.company}</p>
                        </div>
                      </div>

                      {/* Period, Duration & Location */}
                      <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-3 md:mb-4 text-xs md:text-sm">
                        <div className="flex items-center gap-1.5 md:gap-2 text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5 md:h-4 md:w-4" />
                          {exp.period}
                        </div>
                        <span className="text-muted-foreground">•</span>
                        <div className="text-muted-foreground">
                          {exp.duration}
                        </div>
                        <span className="text-muted-foreground">•</span>
                        <div className="flex items-center gap-1 md:gap-1.5 text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5 md:h-4 md:w-4" />
                          {exp.location}
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div className="mb-3 md:mb-4 relative z-10">
                        <div className="inline-flex items-center gap-1 px-3 md:px-4 py-1.5 text-xs font-bold bg-accent border-2 border-border text-accent-foreground retro-shadow">
                          <CheckCircle className="h-3 w-3" />
                          {exp.status}
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-foreground/80 text-xs md:text-sm leading-relaxed mb-3 md:mb-4">
                        {exp.description}
                      </p>

                      {/* Achievements */}
                      <div className="mb-3 md:mb-4">
                        <h4 className="text-xs md:text-sm font-semibold text-foreground mb-2">Key Achievements:</h4>
                        <ul className="space-y-1.5 md:space-y-2">
                          {exp.achievements.map((achievement, idx) => (
                            <li key={idx} className="flex items-start gap-1.5 md:gap-2 text-xs md:text-sm text-foreground/80">
                              <CheckCircle className="h-3.5 w-3.5 md:h-4 md:w-4 text-success flex-shrink-0 mt-0.5" />
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Skills Used */}
                      <div className="relative z-10">
                        <h4 className="text-xs md:text-sm font-bold text-foreground mb-2">Technologies:</h4>
                        <div className="flex flex-wrap gap-1.5 md:gap-2">
                          {exp.skills.map((skill, idx) => (
                            <span
                              key={skill}
                              className={`px-2 md:px-3 py-1 text-xs font-bold border-2 border-border retro-shadow hover:retro-shadow-md transition-all ${
                                idx % 3 === 0 ? 'bg-primary text-primary-foreground' : 
                                idx % 3 === 1 ? 'bg-accent text-accent-foreground' :
                                'bg-secondary text-secondary-foreground'
                              }`}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Visual Element */}
                  <div className={`${index % 2 === 0 ? 'md:pl-8' : 'md:col-start-1 md:pr-8'} hidden md:flex justify-center`}>
                    <div className="relative">
                      <div className="w-28 h-28 md:w-32 md:h-32 bg-card border-4 border-border flex items-center justify-center retro-shadow-lg group hover:retro-shadow-xl transition-all duration-300">
                        <div className="text-center">
                          <div className="w-12 h-12 md:w-14 md:h-14 bg-primary border-2 border-border flex items-center justify-center mb-2 mx-auto group-hover:scale-110 transition-transform duration-300 retro-shadow">
                            <Briefcase className="h-6 w-6 md:h-7 md:w-7 text-primary-foreground" />
                          </div>
                          <div className="text-xs font-bold text-foreground">
                            {exp.period.split(' - ')[0]}
                          </div>
                        </div>
                      </div>
                      
                      {/* Floating Elements */}
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent border-2 border-border retro-shadow" />
                      <div className="absolute -bottom-2 -left-2 w-5 h-5 bg-primary border-2 border-border retro-shadow" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12 md:mt-16">
          <div className="inline-flex items-center gap-3 md:gap-4 bg-accent border-4 border-border p-5 md:p-6 retro-shadow-xl hover:retro-shadow-2xl transition-all duration-300">
            <div className="p-3 md:p-4 bg-primary border-2 border-border retro-shadow">
              <Briefcase className="h-6 w-6 md:h-7 md:w-7 text-primary-foreground" />
            </div>
            <div className="text-left">
              <h3 className="text-base md:text-lg font-heading text-accent-foreground mb-1">
                🚀 Open to Opportunities
              </h3>
              <p className="text-accent-foreground/80 text-xs md:text-sm font-medium">
                Currently seeking new opportunities to grow and contribute to innovative projects.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
