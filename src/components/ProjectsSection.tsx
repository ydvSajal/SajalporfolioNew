import { ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ProjectsSection = () => {
  const projects = [
    {
      title: 'BU Basket',
      description: 'Apne hostel ka OLX — BU Campus Buy, sell, borrow — sab kuch campus ke andar.',
      fullDescription: 'Safe, fast, aur bina jhanjhat.',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      liveUrl: 'https://bubasket.vercel.app/',
      color: 'from-indigo-500 to-purple-600'
    },
    {
      title: 'Urban Reach',
      description: 'A modern web application focused on urban connectivity.',
      fullDescription: 'Community engagement and digital solutions for city dwellers.',
      technologies: ['React', 'JavaScript', 'CSS'],
      liveUrl: 'https://urban-reach.vercel.app/',
      color: 'from-purple-500 to-pink-600'
    },
    {
      title: '10 CGPA',
      description: 'Complete study materials for Semester 1 & 2.',
      fullDescription: 'Educational website with study materials and previous year papers.',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      liveUrl: 'https://ydvsajal.github.io/EDU_WEB/',
      githubUrl: 'https://github.com/ydvSajal/EDU_WEB',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      title: 'Student-Life-OS',
      description: 'GUI-based application for academic life management.',
      fullDescription: 'Helps students manage their academic life efficiently.',
      technologies: ['Python', 'GUI'],
      githubUrl: 'https://github.com/ydvSajal/Student-Life-OS',
      color: 'from-green-500 to-teal-600'
    },
    {
      title: 'Calori-Calculator',
      description: 'Calorie Intake Calculator for Weight Loss.',
      fullDescription: 'Track and calculate your daily calorie intake.',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      liveUrl: 'https://ydvsajal.github.io/Calori-Calculator/',
      githubUrl: 'https://github.com/ydvSajal/Calori-Calculator#',
      color: 'from-orange-500 to-red-600'
    },
    {
      title: 'Gym Log App',
      description: 'Java-based fitness tracking application.',
      fullDescription: 'Manage workout routines and track progress.',
      technologies: ['Java', 'GUI'],
      githubUrl: 'https://github.com/ydvSajal/GYM_LOG_APP_2',
      color: 'from-yellow-500 to-orange-600'
    }
  ];

  return (
    <section id="projects" className="py-20 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              My Projects
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-primary mx-auto mb-6 rounded-full" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Here are some of the projects I've worked on to apply my skills and solve real-world problems.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="group relative perspective-1000"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* 3D Card Container */}
              <div className="relative transform-3d transition-transform duration-700 group-hover:rotate-y-12">
                <div className="bg-gradient-card border border-card-border rounded-2xl overflow-hidden shadow-3d group-hover:shadow-3d-lg transition-all duration-500">
                  
                  {/* Project Header with Gradient */}
                  <div className={`h-48 bg-gradient-to-br ${project.color} relative overflow-hidden`}>
                    {/* Animated Pattern */}
                    <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent" />
                    <div className="absolute inset-0 opacity-30" style={{
                      backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
                    }} />
                    
                    {/* Project Title Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-center text-white p-4">
                        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                        <p className="text-sm opacity-90">{project.description}</p>
                      </div>
                    </div>

                    {/* Floating Elements */}
                    <div className="absolute top-4 right-4 w-3 h-3 bg-white/30 rounded-full animate-pulse" />
                    <div className="absolute bottom-6 left-6 w-2 h-2 bg-white/20 rounded-full animate-ping" />
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                      {project.fullDescription}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="bg-gradient-to-r from-primary/20 to-accent/20 text-foreground px-3 py-1 rounded-full text-xs font-medium border border-card-border"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      {project.githubUrl && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 group/btn hover:bg-card-hover transition-all duration-300"
                          onClick={() => window.open(project.githubUrl, '_blank')}
                        >
                          <Github className="h-4 w-4 mr-1 group-hover/btn:scale-110 transition-transform duration-200" />
                          Code
                        </Button>
                      )}
                      
                      {project.liveUrl && (
                        <Button
                          size="sm"
                          className={`flex-1 bg-gradient-to-r ${project.color} hover:shadow-glow transition-all duration-300 transform hover:scale-105`}
                          onClick={() => window.open(project.liveUrl, '_blank')}
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Live Demo
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-opacity duration-500 -z-10`} />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 bg-gradient-card border border-card-border rounded-2xl p-6 shadow-3d">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Want to see more projects?
              </h3>
              <p className="text-muted-foreground text-sm">
                Check out my GitHub for more exciting projects and contributions.
              </p>
            </div>
            <Button
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
              onClick={() => window.open('https://github.com/ydvSajal', '_blank')}
            >
              <Github className="h-4 w-4 mr-2" />
              View GitHub
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;