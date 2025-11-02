import { ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProjectsScene3D from './ProjectsScene3D';
import { useEffect, useRef } from 'react';

const ProjectsSection = () => {
  const projectsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Scroll Animation Effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            (entry.target as HTMLElement).style.animationDelay = `${index * 100}ms`;
          }
        });
      },
      { threshold: 0.1 }
    );

    projectsRef.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      title: 'BeatsMatch',
      description: 'Date your music twin — A progressive web app for music-based dating.',
      fullDescription: 'Find people who vibe with your Spotify taste. Match with music soulmates based on your listening habits, swap playlists, and connect over shared artists.',
      technologies: ['React', 'Next.js', 'Spotify API', 'PWA', 'TypeScript'],
      liveUrl: 'https://beats-match.vercel.app/',
      color: 'from-green-500 to-emerald-600',
      icon: '🎵'
    },
    {
      title: 'BU Basket',
      description: 'Apne hostel ka OLX — BU Campus Buy, sell, borrow — sab kuch campus ke andar.',
      fullDescription: 'Safe, fast, aur bina jhanjhat.',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      liveUrl: 'https://bubasket.vercel.app/',
      color: 'from-indigo-500 to-purple-600',
      icon: '🛒'
    },
    {
      title: 'Urban Reach',
      description: 'A modern web application focused on urban connectivity.',
      fullDescription: 'Community engagement and digital solutions for city dwellers.',
      technologies: ['React', 'JavaScript', 'CSS'],
      liveUrl: 'https://urban-reach.vercel.app/',
      color: 'from-purple-500 to-pink-600',
      icon: '🏙️'
    },
    {
      title: '10 CGPA',
      description: 'Complete study materials for Semester 1 & 2.',
      fullDescription: 'Educational website with study materials and previous year papers.',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      liveUrl: 'https://ydvsajal.github.io/EDU_WEB/',
      githubUrl: 'https://github.com/ydvSajal/EDU_WEB',
      color: 'from-blue-500 to-cyan-600',
      icon: '📚'
    },
    {
      title: 'Student-Life-OS',
      description: 'GUI-based application for academic life management.',
      fullDescription: 'Helps students manage their academic life efficiently.',
      technologies: ['Python', 'GUI'],
      githubUrl: 'https://github.com/ydvSajal/Student-Life-OS',
      color: 'from-green-500 to-teal-600',
      icon: '🎓'
    },
    {
      title: 'Calori-Calculator',
      description: 'Calorie Intake Calculator for Weight Loss.',
      fullDescription: 'Track and calculate your daily calorie intake.',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      liveUrl: 'https://ydvsajal.github.io/Calori-Calculator/',
      githubUrl: 'https://github.com/ydvSajal/Calori-Calculator#',
      color: 'from-orange-500 to-red-600',
      icon: '🥗'
    },
    {
      title: 'Gym Log App',
      description: 'Java-based fitness tracking application.',
      fullDescription: 'Manage workout routines and track progress.',
      technologies: ['Java', 'GUI'],
      githubUrl: 'https://github.com/ydvSajal/GYM_LOG_APP_2',
      color: 'from-yellow-500 to-orange-600',
      icon: '💪'
    },
    {
      title: 'Portfolio Website',
      description: 'Personal portfolio showcasing projects and skills.',
      fullDescription: 'Modern, responsive portfolio built with React and TypeScript featuring 3D animations and smooth interactions.',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Three.js', 'Vite'],
      liveUrl: 'https://sajal-portfolio.vercel.app/',
      githubUrl: 'https://github.com/ydvSajal/SajalporfolioNew',
      color: 'from-violet-500 to-purple-600',
      icon: '💼'
    }
  ];

  return (
    <section id="projects" className="py-12 md:py-20 bg-background relative overflow-hidden perspective-2000">
      {/* 3D Background Scene */}
      <ProjectsScene3D />
      
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-20 right-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float-delay" />
      </div>

      <div className="container mx-auto px-4 relative z-20">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              My Projects
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-primary mx-auto mb-4 md:mb-6 rounded-full animate-expand" />
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
            A selection of projects showcasing my skills and experience in web development.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {projects.map((project, index) => (
            <div 
              key={project.title} 
              ref={(el) => (projectsRef.current[index] = el)}
              className="group opacity-0"
            >
              <div className="bg-gradient-card border border-card-border rounded-xl overflow-hidden shadow-card hover:shadow-float transition-all duration-500 hover:scale-105 hover:-rotate-1 transform-gpu">
                {/* Project Header with Icon */}
                <div className={`h-32 md:h-40 bg-gradient-to-br ${project.color} relative overflow-hidden group-hover:scale-110 transition-transform duration-500`}>
                  <div className="absolute inset-0 bg-black/10" />
                  {/* Animated particles on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-ping" />
                    <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-white/40 rounded-full animate-ping animation-delay-300" />
                    <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-white/30 rounded-full animate-ping animation-delay-700" />
                  </div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-4xl md:text-5xl mb-2 group-hover:scale-125 transition-transform duration-300">
                      {project.icon}
                    </div>
                    <h3 className="text-white text-xl md:text-2xl font-bold px-4 text-center group-hover:scale-105 transition-transform duration-300">{project.title}</h3>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-4 md:p-6">
                  <p className="text-muted-foreground text-xs md:text-sm mb-4 leading-relaxed line-clamp-2">
                    {project.fullDescription}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1.5 md:gap-2 mb-4 md:mb-6">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={tech}
                        className="bg-card-hover border border-card-border text-foreground/70 px-2 md:px-3 py-1 rounded-md text-xs hover:scale-110 hover:bg-primary/10 transition-all duration-300 cursor-default"
                        style={{ animationDelay: `${i * 50}ms` }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 md:gap-3">
                    {project.githubUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 hover:bg-card-hover hover:scale-105 transition-all duration-300 text-xs md:text-sm h-8 md:h-9"
                        onClick={() => window.open(project.githubUrl, '_blank')}
                      >
                        <Github className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                        Code
                      </Button>
                    )}
                    
                    {project.liveUrl && (
                      <Button
                        size="sm"
                        className={`flex-1 bg-gradient-to-r ${project.color} hover:opacity-90 hover:scale-105 transition-all duration-300 text-xs md:text-sm h-8 md:h-9`}
                        onClick={() => window.open(project.liveUrl, '_blank')}
                      >
                        <ExternalLink className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                        Demo
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Call to Action */}
        <div className="text-center mt-12 md:mt-16 animate-fade-in">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 md:gap-6 bg-gradient-card border border-card-border rounded-xl p-6 md:p-8 shadow-card hover:shadow-float transition-all duration-500 group hover:scale-105">
            <div>
              <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                Want to see more? 🚀
              </h3>
              <p className="text-muted-foreground text-xs md:text-sm">
                Explore my GitHub for more projects and contributions.
              </p>
            </div>
            <Button
              size="lg"
              className="bg-gradient-primary hover:opacity-90 hover:scale-110 transition-all duration-300 text-sm md:text-base shadow-lg hover:shadow-xl"
              onClick={() => window.open('https://github.com/ydvSajal', '_blank')}
            >
              <Github className="h-4 w-4 md:h-5 md:w-5 mr-2" />
              Visit GitHub
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;