import { ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useRef } from 'react';
import { GitHubStats } from './GitHubStats';

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
      title: 'PublishSky',
      description: 'Ship pages to the web instantly with polished defaults.',
      fullDescription: 'Intelligent link management for the modern web. Route, track, and optimize with ease..',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
      liveUrl: 'https://publishsky.vercel.app/',
      color: 'from-cyan-500 to-blue-600',
      icon: '☁️'
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
      liveUrl: 'https://ydvsajal.vercel.app/',
      githubUrl: '',
      color: 'from-violet-500 to-purple-600',
      icon: '💼'
    }
  ];

  return (
    <section id="projects" className="py-12 md:py-20 bg-background relative overflow-hidden">
      {/* Retro Decorative Elements */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute top-20 right-20 w-40 h-40 border-2 border-primary/15 rotate-12 retro-shadow-lg" />
        <div className="absolute bottom-20 left-20 w-32 h-32 border-2 border-accent/15 -rotate-12" />
        <div className="absolute top-1/2 right-1/3 w-24 h-24 rounded-full border-2 border-primary/10" />
      </div>

      <div className="container mx-auto px-4 relative z-20">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-block relative">
            <div className="absolute inset-0 bg-primary translate-x-1 translate-y-1" />
            <h2 className="relative text-3xl md:text-4xl font-heading bg-card text-foreground px-6 py-3 retro-border retro-shadow-lg">
              🚀 My Projects
            </h2>
          </div>
          <div className="w-32 h-2 bg-primary mx-auto my-6 retro-border" />
          <p className="text-foreground max-w-2xl mx-auto text-sm md:text-lg font-medium">
            A selection of projects showcasing my skills and experience in web development.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {projects.map((project, index) => (
            <div 
              key={project.title} 
              ref={(el) => (projectsRef.current[index] = el)}
              className="group"
            >
              <div className="bg-card border-4 border-border overflow-hidden retro-shadow-lg hover:retro-shadow-xl transition-all duration-300 hover:-translate-y-1 relative">
                {/* Colorful corner accent */}
                <div className="absolute top-0 right-0 w-12 h-12 bg-primary/30 -translate-y-6 translate-x-6 rotate-45 z-10" />
                
                {/* Project Header with Icon */}
                <div className="h-32 md:h-40 bg-accent relative overflow-hidden border-b-4 border-border">
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-5xl md:text-6xl mb-2 group-hover:scale-110 transition-transform duration-300">
                      {project.icon}
                    </div>
                    <h3 className="text-accent-foreground text-xl md:text-2xl font-heading px-4 text-center">{project.title}</h3>
                  </div>
                  {/* Retro stripes on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity retro-stripes" />
                </div>

                {/* Project Content */}
                <div className="p-4 md:p-6 relative z-10">
                  <p className="text-foreground text-xs md:text-sm mb-4 leading-relaxed">
                    {project.fullDescription}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1.5 md:gap-2 mb-4 md:mb-6">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={tech}
                        className={`px-2 md:px-3 py-1 text-xs font-bold border-2 border-border retro-shadow hover:retro-shadow-md transition-all ${
                          i % 4 === 0 ? 'bg-primary text-primary-foreground' : 
                          i % 4 === 1 ? 'bg-accent text-accent-foreground' :
                          i % 4 === 2 ? 'bg-secondary text-secondary-foreground' :
                          'bg-card text-foreground'
                        }`}
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
                        className="flex-1 text-xs md:text-sm h-8 md:h-9 font-bold"
                        onClick={() => window.open(project.githubUrl, '_blank')}
                      >
                        <Github className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                        Code
                      </Button>
                    )}
                    
                    {project.liveUrl && (
                      <Button
                        size="sm"
                        className="flex-1 text-xs md:text-sm h-8 md:h-9 font-bold"
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

        {/* GitHub Stats Section */}
        <div className="mt-12 md:mt-16">
          <GitHubStats username="ydvSajal" />
        </div>

        {/* Enhanced Call to Action */}
        <div className="text-center mt-12 md:mt-16">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 md:gap-6 bg-accent border-4 border-border p-6 md:p-8 retro-shadow-xl hover:retro-shadow-2xl transition-all duration-300 group">
            <div className="p-4 bg-primary border-2 border-border retro-shadow">
              <Github className="h-8 w-8 md:h-10 md:w-10 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-heading text-accent-foreground mb-2">
                Want to see more? 🚀
              </h3>
              <p className="text-accent-foreground/80 text-xs md:text-sm font-medium">
                Explore my GitHub for more projects and contributions.
              </p>
            </div>
            <Button
              size="lg"
              className="font-bold text-sm md:text-base"
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