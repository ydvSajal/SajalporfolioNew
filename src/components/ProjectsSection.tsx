import { ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProjectsScene3D from './ProjectsScene3D';

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
    <section id="projects" className="py-20 bg-background relative overflow-hidden perspective-2000">
      {/* 3D Background Scene */}
      <ProjectsScene3D />
      
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-20 right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-glow opacity-20 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-20">
        {/* Enhanced Section Header */}
        <div className="text-center mb-16 perspective-1000">
          <div className="transform-3d group hover:scale-105 transition-all duration-700">
            <h2 className="text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-primary bg-clip-text text-transparent animate-pulse">
                My Projects
              </span>
            </h2>
            <div className="w-24 h-2 bg-gradient-primary mx-auto mb-8 rounded-full shadow-glow" />
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
              Here are some of the immersive projects I've crafted to solve real-world problems and showcase innovative solutions.
            </p>
            {/* Floating decorative elements */}
            <div className="absolute top-0 left-1/4 w-2 h-2 bg-primary rounded-full animate-ping opacity-60" />
            <div className="absolute bottom-4 right-1/3 w-3 h-3 bg-accent rounded-full animate-pulse opacity-40" />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="group relative perspective-1000 animate-fade-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Enhanced 3D Card Container */}
              <div className="relative transform-3d transition-all duration-1000 group-hover:scale-105 group-hover:rotate-y-12 group-hover:-translate-y-4">
                <div className="bg-gradient-card border border-card-border rounded-3xl overflow-hidden shadow-3d-lg group-hover:shadow-glow transition-all duration-700 backdrop-blur-xl">
                  {/* Animated border glow */}
                  <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-30 transition-opacity duration-700 rounded-3xl blur-sm" />
                  
                  {/* Enhanced Project Header with Gradient */}
                  <div className={`h-52 bg-gradient-to-br ${project.color} relative overflow-hidden group`}>
                    {/* Multi-layer animated patterns */}
                    <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-transparent" />
                    <div className="absolute inset-0 opacity-20 animate-pulse" style={{
                      backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.2\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
                    }} />
                    <div className="absolute inset-0 opacity-10 group-hover:opacity-30 transition-opacity duration-500" style={{
                      backgroundImage: "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
                      backgroundSize: "20px 20px",
                      animation: "shimmer 3s infinite linear"
                    }} />
                    
                    {/* Enhanced Project Title Overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-sm">
                      <div className="text-center text-white p-6 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                        <h3 className="text-2xl font-bold mb-3 text-shadow">{project.title}</h3>
                        <p className="text-sm opacity-90 leading-relaxed">{project.description}</p>
                        <div className="mt-4 w-16 h-0.5 bg-white/60 mx-auto rounded-full" />
                      </div>
                    </div>

                    {/* Enhanced Floating Elements */}
                    <div className="absolute top-4 right-4 w-4 h-4 bg-white/40 rounded-full animate-pulse shadow-lg" />
                    <div className="absolute bottom-6 left-6 w-3 h-3 bg-white/30 rounded-full animate-ping" />
                    <div className="absolute top-1/2 left-4 w-2 h-2 bg-white/20 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
                    <div className="absolute bottom-1/3 right-8 w-1.5 h-1.5 bg-white/25 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                  </div>

                  {/* Enhanced Project Content */}
                  <div className="p-8 relative">
                    {/* Content background glow */}
                    <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-b-3xl" />
                    
                    <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-all duration-300 transform group-hover:scale-105">
                      {project.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                      {project.fullDescription}
                    </p>

                    {/* Enhanced Technologies */}
                    <div className="flex flex-wrap gap-3 mb-8">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={tech}
                          className="bg-gradient-to-r from-primary/20 to-accent/20 text-foreground px-4 py-2 rounded-full text-xs font-medium border border-card-border hover:border-primary/50 transition-all duration-300 hover:scale-110 hover:shadow-glow"
                          style={{ animationDelay: `${techIndex * 0.1}s` }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Enhanced Action Buttons */}
                    <div className="flex gap-4">
                      {project.githubUrl && (
                        <Button
                          variant="outline"
                          size="lg"
                          className="flex-1 group/btn hover:bg-card-hover hover:border-primary/50 transition-all duration-300 hover:shadow-glow transform hover:scale-105"
                          onClick={() => window.open(project.githubUrl, '_blank')}
                        >
                          <Github className="h-5 w-5 mr-2 group-hover/btn:scale-110 group-hover/btn:rotate-12 transition-all duration-300" />
                          View Code
                        </Button>
                      )}
                      
                      {project.liveUrl && (
                        <Button
                          size="lg"
                          className={`flex-1 bg-gradient-to-r ${project.color} hover:shadow-glow transition-all duration-500 transform hover:scale-105 hover:-translate-y-1`}
                          onClick={() => window.open(project.liveUrl, '_blank')}
                        >
                          <ExternalLink className="h-5 w-5 mr-2" />
                          Live Demo
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Multi-layer Hover Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-30 rounded-3xl blur-2xl transition-all duration-700 -z-10 scale-110`} />
              <div className={`absolute inset-0 bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-20 rounded-3xl blur-xl transition-all duration-500 -z-10 scale-105`} />
              
              {/* Floating 3D elements around card */}
              <div className="absolute -top-3 -right-3 w-6 h-6 bg-gradient-primary rounded-full opacity-0 group-hover:opacity-80 transition-all duration-500 animate-bounce shadow-glow" style={{ animationDelay: '0.2s' }} />
              <div className="absolute -bottom-3 -left-3 w-4 h-4 bg-gradient-secondary rounded-full opacity-0 group-hover:opacity-60 transition-all duration-700 animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
          ))}
        </div>

        {/* Enhanced Call to Action */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center gap-6 bg-gradient-card border border-card-border rounded-3xl p-8 shadow-3d-lg hover:shadow-glow transition-all duration-500 perspective-1000 group">
            <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500" />
            <div className="relative z-10">
              <h3 className="text-2xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                Want to see more projects?
              </h3>
              <p className="text-muted-foreground">
                Explore my GitHub for more exciting projects, contributions, and open-source work.
              </p>
            </div>
            <Button
              size="lg"
              className="bg-gradient-primary hover:shadow-glow transition-all duration-500 transform hover:scale-110 hover:-translate-y-1 relative z-10"
              onClick={() => window.open('https://github.com/ydvSajal', '_blank')}
            >
              <Github className="h-5 w-5 mr-3" />
              Explore GitHub
            </Button>
            {/* Floating decorative elements */}
            <div className="absolute top-2 right-8 w-2 h-2 bg-primary rounded-full animate-ping opacity-60" />
            <div className="absolute bottom-3 left-12 w-1.5 h-1.5 bg-accent rounded-full animate-pulse opacity-40" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;