import { useState, useEffect, useCallback } from 'react';
import { Star, GitFork, Code, Users, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchGitHubStats = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.github.com/users/${username}`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setStats(data);
        setError(false);
        setLastUpdated(new Date());
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [username]);

  useEffect(() => {
    fetchGitHubStats();
    
    // Auto-refresh every 5 minutes
    const interval = setInterval(() => {
      fetchGitHubStats();
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [fetchGitHubStats]);

  if (loading) {
    return (
      <div className="mt-12 md:mt-16 animate-fade-in">
        <div className="bg-card border-4 border-border p-6 md:p-8 retro-shadow-lg">
          <h3 className="text-xl md:text-2xl font-heading mb-6 text-center text-foreground">
            🔥 GitHub Activity
          </h3>
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin w-12 h-12 border-4 border-border border-t-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return null;
  }

  return (
    <div className="mt-12 md:mt-16 animate-fade-in">
      <div className="bg-card border-4 border-border p-6 md:p-8 retro-shadow-lg hover:retro-shadow-xl transition-all">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl md:text-2xl font-heading text-foreground">
            🔥 GitHub Activity
          </h3>
          <div className="flex items-center gap-3">
            {lastUpdated && (
              <span className="text-xs text-foreground/60 font-bold">
                Updated: {lastUpdated.toLocaleTimeString()}
              </span>
            )}
            <Button
              onClick={fetchGitHubStats}
              disabled={loading}
              size="sm"
              className="bg-primary text-primary-foreground border-2 border-border retro-shadow hover:retro-shadow-md transition-all h-8 px-3"
            >
              <RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {/* Public Repos */}
          <div className="bg-primary border-4 border-border p-4 text-center hover:scale-105 transition-transform retro-shadow">
            <Code className="h-8 w-8 mx-auto mb-2 text-primary-foreground" />
            <div className="text-2xl md:text-3xl font-heading text-primary-foreground mb-1">
              {stats.public_repos}
            </div>
            <div className="text-xs md:text-sm font-bold text-primary-foreground">
              Public Repos
            </div>
          </div>

          {/* Followers */}
          <div className="bg-accent border-4 border-border p-4 text-center hover:scale-105 transition-transform retro-shadow">
            <Users className="h-8 w-8 mx-auto mb-2 text-accent-foreground" />
            <div className="text-2xl md:text-3xl font-heading text-accent-foreground mb-1">
              {stats.followers}
            </div>
            <div className="text-xs md:text-sm font-bold text-accent-foreground">
              Followers
            </div>
          </div>

          {/* Following */}
          <div className="bg-secondary border-4 border-border p-4 text-center hover:scale-105 transition-transform retro-shadow">
            <Star className="h-8 w-8 mx-auto mb-2 text-secondary-foreground" />
            <div className="text-2xl md:text-3xl font-heading text-secondary-foreground mb-1">
              {stats.following}
            </div>
            <div className="text-xs md:text-sm font-bold text-secondary-foreground">
              Following
            </div>
          </div>

          {/* GitHub Link */}
          <div 
            className="bg-card border-4 border-border p-4 text-center hover:scale-105 transition-transform cursor-pointer group retro-shadow"
            onClick={() => window.open(`https://github.com/${username}`, '_blank')}
          >
            <GitFork className="h-8 w-8 mx-auto mb-2 text-foreground group-hover:scale-110 transition-transform" />
            <div className="text-xs md:text-sm font-bold text-foreground group-hover:text-primary transition-colors">
              View Profile
            </div>
          </div>
        </div>

        {/* GitHub Stats Images */}
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div className="border-4 border-border bg-background retro-shadow">
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
          
          <div className="border-4 border-border bg-background retro-shadow">
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
