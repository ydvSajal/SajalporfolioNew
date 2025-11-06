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
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-16 left-16 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-16 right-16 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-primary mx-auto mb-4 md:mb-6 rounded-full" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-lg">
            My professional journey and work experience.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-primary rounded-full opacity-30 hidden md:block" />
            
            {experienceData.map((exp, index) => (
              <div key={exp.company} className="relative mb-12 md:mb-16 last:mb-0">
                {/* Timeline Node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-primary rounded-full border-4 border-background shadow-glow z-10 hidden md:block" />
                
                {/* Content Card */}
                <div className={`grid md:grid-cols-2 gap-6 md:gap-8 items-center ${
                  index % 2 === 0 ? '' : 'md:grid-flow-col-dense'
                }`}>
                  {/* Experience Info */}
                  <div className={`${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:col-start-2 md:pl-8'}`}>
                    <div className="bg-gradient-card border border-card-border rounded-xl md:rounded-2xl p-5 md:p-6 shadow-3d hover:shadow-3d-lg transition-all duration-500 group">
                      {/* Header */}
                      <div className="flex items-start gap-2.5 md:gap-3 mb-3 md:mb-4">
                        <div className="p-1.5 md:p-2 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 border border-card-border flex-shrink-0">
                          <Briefcase className="h-4 w-4 md:h-5 md:w-5 text-primary" />
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
                      <div className="mb-3 md:mb-4">
                        <div className={`inline-flex items-center gap-1 px-2.5 md:px-3 py-1 rounded-full text-xs font-medium bg-success/20 text-success border border-success/30`}>
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
                      <div>
                        <h4 className="text-xs md:text-sm font-semibold text-foreground mb-2">Technologies:</h4>
                        <div className="flex flex-wrap gap-1.5 md:gap-2">
                          {exp.skills.map((skill) => (
                            <span
                              key={skill}
                              className="bg-gradient-to-r from-primary/20 to-accent/20 text-foreground px-2 md:px-3 py-0.5 md:py-1 rounded-full text-xs font-medium border border-card-border"
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
                      <div className="w-28 h-28 md:w-32 md:h-32 bg-gradient-card border border-card-border rounded-2xl flex items-center justify-center shadow-3d group hover:shadow-3d-lg transition-all duration-500">
                        <div className="text-center">
                          <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-2 mx-auto group-hover:scale-110 transition-transform duration-300">
                            <Briefcase className="h-5 w-5 md:h-6 md:w-6 text-primary-foreground" />
                          </div>
                          <div className="text-xs font-medium text-muted-foreground">
                            {exp.period.split(' - ')[0]}
                          </div>
                        </div>
                      </div>
                      
                      {/* Floating Elements */}
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-success rounded-full opacity-80 animate-pulse" />
                      <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-primary rounded-full opacity-80 animate-pulse" style={{ animationDelay: '0.5s' }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12 md:mt-16">
          <div className="inline-flex items-center gap-3 md:gap-4 bg-gradient-card border border-card-border rounded-xl md:rounded-2xl p-5 md:p-6 shadow-3d">
            <div className="p-2.5 md:p-3 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-card-border">
              <Briefcase className="h-5 w-5 md:h-6 md:w-6 text-primary" />
            </div>
            <div className="text-left">
              <h3 className="text-base md:text-lg font-semibold text-foreground mb-1">
                Open to Opportunities
              </h3>
              <p className="text-muted-foreground text-xs md:text-sm">
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
