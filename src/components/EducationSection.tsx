import { GraduationCap, Calendar, Award } from 'lucide-react';

const EducationSection = () => {
  const educationData = [
    {
      institution: 'Bennett University',
      degree: 'B.Tech in Computer Science Engineering',
      period: '2024 - 2028',
      status: 'Current',
      description: 'Currently pursuing my degree with a focus on software development, algorithms, and system design. Engaging in various projects and research activities to enhance my technical skills.',
      highlights: [
        'Data Structures & Algorithms',
        'Object-Oriented Programming',
        'Database Management Systems',
        'Web Development'
      ]
    },
    {
      institution: 'High School',
      degree: 'Science Stream',
      period: '2022 - 2024',
      status: 'Completed',
      description: 'Completed my high school education with a focus on Physics, Chemistry, and Mathematics. Developed strong analytical and problem-solving skills during this period.',
      highlights: [
        'Physics',
        'Chemistry', 
        'Mathematics',
        'Computer Science'
      ]
    }
  ];

  return (
    <section id="education" className="py-20 bg-background-secondary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-16 right-16 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-16 left-16 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Education
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-primary mx-auto mb-6 rounded-full" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            My academic background and learning journey.
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-primary rounded-full opacity-30" />
            
            {educationData.map((edu, index) => (
              <div key={edu.institution} className="relative mb-16 last:mb-0">
                {/* Timeline Node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-primary rounded-full border-4 border-background-secondary shadow-glow z-10" />
                
                {/* Content Card */}
                <div className={`grid md:grid-cols-2 gap-8 items-center ${
                  index % 2 === 0 ? '' : 'md:grid-flow-col-dense'
                }`}>
                  {/* Education Info */}
                  <div className={`${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:col-start-2 md:pl-8'}`}>
                    <div className="bg-gradient-card border border-card-border rounded-2xl p-6 shadow-3d hover:shadow-3d-lg transition-all duration-500 group">
                      {/* Header */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 border border-card-border">
                          <GraduationCap className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                            {edu.institution}
                          </h3>
                          <p className="text-muted-foreground text-sm">{edu.degree}</p>
                        </div>
                      </div>

                      {/* Period & Status */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {edu.period}
                        </div>
                        <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                          edu.status === 'Current' 
                            ? 'bg-success/20 text-success border border-success/30' 
                            : 'bg-primary/20 text-primary border border-primary/30'
                        }`}>
                          <Award className="h-3 w-3" />
                          {edu.status}
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-foreground/80 text-sm leading-relaxed mb-4">
                        {edu.description}
                      </p>

                      {/* Highlights */}
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-2">Key Subjects:</h4>
                        <div className="flex flex-wrap gap-2">
                          {edu.highlights.map((highlight) => (
                            <span
                              key={highlight}
                              className="bg-gradient-to-r from-primary/20 to-accent/20 text-foreground px-3 py-1 rounded-full text-xs font-medium border border-card-border"
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Visual Element */}
                  <div className={`${index % 2 === 0 ? 'md:pl-8' : 'md:col-start-1 md:pr-8'} flex justify-center`}>
                    <div className="relative">
                      <div className="w-32 h-32 bg-gradient-card border border-card-border rounded-2xl flex items-center justify-center shadow-3d group hover:shadow-3d-lg transition-all duration-500">
                        <div className="text-center">
                          <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-2 mx-auto group-hover:scale-110 transition-transform duration-300">
                            <GraduationCap className="h-6 w-6 text-primary-foreground" />
                          </div>
                          <div className="text-xs font-medium text-muted-foreground">
                            {edu.period.split(' - ')[0]}
                          </div>
                        </div>
                      </div>
                      
                      {/* Floating Elements */}
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-accent rounded-full opacity-80 animate-pulse" />
                      <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-primary rounded-full opacity-80 animate-pulse" style={{ animationDelay: '0.5s' }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 bg-gradient-card border border-card-border rounded-2xl p-6 shadow-3d">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-card-border">
              <Award className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-1">
                Continuous Learning
              </h3>
              <p className="text-muted-foreground text-sm">
                Always exploring new technologies and expanding my skill set through online courses and personal projects.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;