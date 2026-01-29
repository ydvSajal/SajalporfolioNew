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
      {/* Retro Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-16 right-16 w-32 h-32 border-2 border-accent/20 rotate-45" />
        <div className="absolute bottom-16 left-16 w-40 h-40 border-2 border-primary/20" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block relative">
            <div className="absolute inset-0 bg-primary translate-x-1 translate-y-1" />
            <h2 className="relative text-4xl font-heading bg-card text-foreground px-6 py-3 retro-border retro-shadow-lg">
              🎓 Education
            </h2>
          </div>
          <div className="w-32 h-2 bg-primary mx-auto my-6 retro-border" />
          <p className="text-foreground/80 max-w-2xl mx-auto text-base">
            My academic background and learning journey
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-2 h-full bg-primary border-2 border-border" />
            
            {educationData.map((edu, index) => (
              <div key={edu.institution} className="relative mb-16 last:mb-0">
                {/* Timeline Node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-primary border-4 border-border retro-shadow z-10" />
                
                {/* Content Card */}
                <div className={`grid md:grid-cols-2 gap-8 items-center ${
                  index % 2 === 0 ? '' : 'md:grid-flow-col-dense'
                }`}>
                  {/* Education Info */}
                  <div className={`${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:col-start-2 md:pl-8'}`}>
                    <div className={`${index % 2 === 0 ? 'bg-accent' : 'bg-primary'} border-4 border-border p-6 retro-shadow-lg group hover:retro-shadow-xl transition-all`}>
                      {/* Header */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`p-2 border-2 border-border ${index % 2 === 0 ? 'bg-primary' : 'bg-accent'}`}>
                          <GraduationCap className={`h-5 w-5 ${index % 2 === 0 ? 'text-primary-foreground' : 'text-accent-foreground'}`} />
                        </div>
                        <div>
                          <h3 className={`text-xl font-heading ${index % 2 === 0 ? 'text-accent-foreground' : 'text-primary-foreground'}`}>
                            {edu.institution}
                          </h3>
                          <p className={`text-sm font-bold ${index % 2 === 0 ? 'text-accent-foreground/80' : 'text-primary-foreground/80'}`}>{edu.degree}</p>
                        </div>
                      </div>

                      {/* Period & Status */}
                      <div className="flex items-center gap-4 mb-4 flex-wrap">
                        <div className={`flex items-center gap-2 text-sm ${index % 2 === 0 ? 'text-accent-foreground/90' : 'text-primary-foreground/90'} font-bold`}>
                          <Calendar className="h-4 w-4" />
                          {edu.period}
                        </div>
                        <div className={`inline-flex items-center gap-1 px-3 py-1 border-2 border-border text-xs font-bold ${
                          edu.status === 'Current' 
                            ? 'bg-card text-foreground' 
                            : 'bg-secondary text-secondary-foreground'
                        } retro-shadow`}>
                          <Award className="h-3 w-3" />
                          {edu.status}
                        </div>
                      </div>

                      {/* Description */}
                      <p className={`text-sm leading-relaxed mb-4 ${index % 2 === 0 ? 'text-accent-foreground/90' : 'text-primary-foreground/90'}`}>
                        {edu.description}
                      </p>

                      {/* Highlights */}
                      <div>
                        <h4 className={`text-sm font-heading ${index % 2 === 0 ? 'text-accent-foreground' : 'text-primary-foreground'} mb-2`}>KEY SUBJECTS:</h4>
                        <div className="flex flex-wrap gap-2">
                          {edu.highlights.map((highlight, idx) => (
                            <span
                              key={highlight}
                              className={`${idx % 2 === 0 ? 'bg-card text-foreground' : 'bg-secondary text-secondary-foreground'} px-3 py-1 text-xs font-bold border-2 border-border retro-shadow`}
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
                      <div className={`w-32 h-32 ${index % 2 === 0 ? 'bg-primary' : 'bg-accent'} border-4 border-border flex items-center justify-center retro-shadow-lg group hover:retro-shadow-xl transition-all`}>
                        <div className="text-center">
                          <div className={`w-12 h-12 ${index % 2 === 0 ? 'bg-accent' : 'bg-primary'} border-2 border-border flex items-center justify-center mb-2 mx-auto group-hover:scale-110 transition-transform`}>
                            <GraduationCap className={`h-6 w-6 ${index % 2 === 0 ? 'text-accent-foreground' : 'text-primary-foreground'}`} />
                          </div>
                          <div className={`text-xs font-bold ${index % 2 === 0 ? 'text-primary-foreground' : 'text-accent-foreground'}`}>
                            {edu.period.split(' - ')[0]}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 bg-card border-4 border-border p-6 retro-shadow-lg">
            <div className="p-3 border-2 border-border bg-primary">
              <Award className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="text-left">
              <h3 className="text-lg font-heading text-foreground mb-1">
                Continuous Learning
              </h3>
              <p className="text-foreground/80 text-sm">
                Always exploring new technologies through online courses and projects
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;