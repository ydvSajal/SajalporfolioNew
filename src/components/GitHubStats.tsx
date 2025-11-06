import { useState, useEffect } from 'react';
import { Star, GitFork, Code, Users } from 'lucide-react';

interface GitHubStatsProps {
  username: string;
}

interface GitHubData {
  public_repos: number;
  followers: number;
  following: number;
  name: string;
  bio: string;
  avatar_url: string;
}

export const GitHubStats = ({ username }: GitHubStatsProps) => {
  const [stats, setStats] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (response.ok) {
          const data = await response.json();
          setStats(data);
          setError(false);
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubStats();
  }, [username]);

  if (loading) {
    return (
      <div className="mt-12 md:mt-16 animate-fade-in">
        <div className="bg-gradient-card border border-card-border rounded-xl p-6 md:p-8 shadow-card">
          <h3 className="text-xl md:text-2xl font-semibold mb-6 text-center bg-gradient-primary bg-clip-text text-transparent">
            GitHub Activity 🔥
          </h3>
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return null; // Hide the section if there's an error
  }

  return (
    <div className="mt-12 md:mt-16 animate-fade-in">
      <div className="bg-gradient-card border border-card-border rounded-xl p-6 md:p-8 shadow-card hover:shadow-float transition-all duration-500">
        <h3 className="text-xl md:text-2xl font-semibold mb-6 text-center bg-gradient-primary bg-clip-text text-transparent">
          GitHub Activity 🔥
        </h3>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {/* Public Repos */}
          <div className="bg-card-hover border border-card-border rounded-lg p-4 text-center hover:scale-105 transition-transform duration-300">
            <Code className="h-8 w-8 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">
              {stats.public_repos}
            </div>
            <div className="text-xs md:text-sm text-muted-foreground">
              Repositories
            </div>
          </div>

          {/* Followers */}
          <div className="bg-card-hover border border-card-border rounded-lg p-4 text-center hover:scale-105 transition-transform duration-300">
            <Users className="h-8 w-8 mx-auto mb-2 text-green-500" />
            <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">
              {stats.followers}
            </div>
            <div className="text-xs md:text-sm text-muted-foreground">
              Followers
            </div>
          </div>

          {/* Following */}
          <div className="bg-card-hover border border-card-border rounded-lg p-4 text-center hover:scale-105 transition-transform duration-300">
            <Star className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
            <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">
              {stats.following}
            </div>
            <div className="text-xs md:text-sm text-muted-foreground">
              Following
            </div>
          </div>

          {/* GitHub Link */}
          <div 
            className="bg-card-hover border border-card-border rounded-lg p-4 text-center hover:scale-105 transition-transform duration-300 cursor-pointer group"
            onClick={() => window.open(`https://github.com/${username}`, '_blank')}
          >
            <GitFork className="h-8 w-8 mx-auto mb-2 text-purple-500 group-hover:text-purple-400 transition-colors" />
            <div className="text-xs md:text-sm text-muted-foreground group-hover:text-foreground transition-colors">
              View Profile
            </div>
          </div>
        </div>

        {/* GitHub Stats Images with better error handling */}
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div className="rounded-lg overflow-hidden bg-card-hover border border-card-border">
            <img
              src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=tokyonight&hide_border=true&bg_color=1a1b27&title_color=70a5fd&icon_color=bf91f3&text_color=38bdae&count_private=true`}
              alt="GitHub Stats"
              className="w-full h-auto"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
          
          <div className="rounded-lg overflow-hidden bg-card-hover border border-card-border">
            <img
              src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=tokyonight&hide_border=true&bg_color=1a1b27&title_color=70a5fd&text_color=38bdae&langs_count=6`}
              alt="Top Languages"
              className="w-full h-auto"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
