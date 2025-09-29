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
    <section id="projects" className="py-20 bg-background-secondary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-3">
            Things I've Built
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            A collection of projects I've worked on — from web apps to tools that solve everyday problems.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all"
            >
              {/* Project Header */}
              <div className={`h-40 bg-gradient-to-br ${project.color} relative`}>
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-xl font-bold text-white drop-shadow-md">{project.title}</h3>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <p className="text-muted-foreground mb-4 text-sm">
                  {project.fullDescription}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="bg-muted text-foreground px-3 py-1 rounded text-xs"
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
                      className="flex-1"
                      onClick={() => window.open(project.githubUrl, '_blank')}
                    >
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </Button>
                  )}
                  
                  {project.liveUrl && (
                    <Button
                      size="sm"
                      className="flex-1 bg-primary hover:bg-primary-dark"
                      onClick={() => window.open(project.liveUrl, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Demo
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="inline-block bg-card border border-border rounded-lg p-6">
            <p className="text-foreground mb-4">
              Want to see more? Check out my GitHub for additional projects and contributions.
            </p>
            <Button
              size="lg"
              className="bg-accent hover:bg-accent-dark text-accent-foreground"
              onClick={() => window.open('https://github.com/ydvSajal', '_blank')}
            >
              <Github className="h-5 w-5 mr-2" />
              Visit GitHub
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;