interface GitHubStatsProps {
  username: string;
}

export const GitHubStats = ({ username }: GitHubStatsProps) => {
  return (
    <div className="mt-12 md:mt-16 animate-fade-in">
      <div className="bg-gradient-card border border-card-border rounded-xl p-6 md:p-8 shadow-card hover:shadow-float transition-all duration-500">
        <h3 className="text-xl md:text-2xl font-semibold mb-6 text-center bg-gradient-primary bg-clip-text text-transparent">
          GitHub Activity 🔥
        </h3>
        
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* GitHub Stats Card */}
          <div className="rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300">
            <img
              src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=tokyonight&hide_border=true&bg_color=0d1117&title_color=58a6ff&icon_color=1f6feb&text_color=c9d1d9`}
              alt="GitHub Stats"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>

          {/* GitHub Streak */}
          <div className="rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300">
            <img
              src={`https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=tokyonight&hide_border=true&background=0d1117&ring=58a6ff&fire=1f6feb&currStreakLabel=c9d1d9`}
              alt="GitHub Streak"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>

          {/* Top Languages */}
          <div className="rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 md:col-span-2">
            <img
              src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=tokyonight&hide_border=true&bg_color=0d1117&title_color=58a6ff&text_color=c9d1d9&langs_count=8`}
              alt="Top Languages"
              className="w-full h-auto mx-auto max-w-2xl"
              loading="lazy"
            />
          </div>
        </div>

        {/* GitHub Activity Graph */}
        <div className="mt-6 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300">
          <img
            src={`https://github-readme-activity-graph.vercel.app/graph?username=${username}&theme=tokyo-night&hide_border=true&bg_color=0d1117&color=58a6ff&line=1f6feb&point=c9d1d9`}
            alt="GitHub Activity Graph"
            className="w-full h-auto"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};
