import { useEffect, useMemo, useState } from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { api } from '@/lib/blog-api';
import { Post, PostType } from '@/types/posts';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Newspaper } from 'lucide-react';
import RetroBackground from '@/components/RetroBackground';
import RetroScanlines from '@/components/RetroScanlines';
import { toRenderableMediaUrl } from '@/lib/media-url';

const Stories = () => {
  const [items, setItems] = useState<Post[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [type, setType] = useState<PostType | 'all'>('all');
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.listPublicPosts({
          type: type === 'all' ? undefined : type,
          search: search || undefined,
          tag: activeTag === 'all' ? undefined : activeTag,
        });
        setItems(response.items);
        setTags(response.tags || []);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load stories';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(load, 220);
    return () => clearTimeout(timer);
  }, [type, search, activeTag]);

  const featured = useMemo(() => items.find((post) => post.featured) || items[0], [items]);
  const rest = useMemo(() => items.filter((post) => post.id !== featured?.id), [items, featured]);

  return (
    <div className="min-h-screen bg-background relative">
      <RetroBackground />
      <RetroScanlines />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-10 md:py-16 space-y-8">
        <header className="border-4 border-border bg-card retro-shadow-lg p-6 md:p-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link to="/">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back Home
              </Button>
            </Link>

            <div className="flex items-center gap-2">
              <Button variant={type === 'all' ? 'default' : 'outline'} onClick={() => setType('all')}>
                All
              </Button>
              <Button variant={type === 'blog' ? 'default' : 'outline'} onClick={() => setType('blog')}>
                Blogs
              </Button>
              <Button variant={type === 'news' ? 'default' : 'outline'} onClick={() => setType('news')}>
                News
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              className="w-full border-2 border-border bg-background px-3 py-2"
              placeholder="Search by title or excerpt..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            <select
              className="w-full border-2 border-border bg-background px-3 py-2"
              value={activeTag}
              onChange={(event) => setActiveTag(event.target.value)}
            >
              <option value="all">All tags</option>
              {tags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>

          <div>
            <h1 className="text-4xl md:text-5xl font-heading text-foreground">Blog / News</h1>
            <p className="text-muted-foreground mt-2">Latest updates, launches, and write-ups sorted by publish date.</p>
          </div>
        </header>

        {loading && <div className="border-4 border-border bg-card retro-shadow p-6">Loading stories...</div>}

        {error && <div className="border-4 border-border bg-destructive text-destructive-foreground retro-shadow p-6">{error}</div>}

        {!loading && !error && items.length === 0 && (
          <div className="border-4 border-border bg-card retro-shadow p-6">No posts published yet.</div>
        )}

        {!loading && !error && featured && (
          <article className="border-4 border-border bg-card retro-shadow-lg overflow-hidden">
            {featured.coverImageUrl && (
              <img src={toRenderableMediaUrl(featured.coverImageUrl)} alt={featured.title} className="w-full h-64 md:h-80 object-cover border-b-4 border-border" />
            )}
            <div className="p-6 md:p-8 space-y-3">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="uppercase">Featured</Badge>
                <Badge variant="outline" className="uppercase">{featured.type}</Badge>
                <Badge variant="outline">{format(new Date(featured.publishedAt || featured.createdAt), 'PPP')}</Badge>
              </div>
              <h2 className="text-3xl font-heading">{featured.title}</h2>
              <p className="text-muted-foreground">{featured.excerpt}</p>
              <Link to={`/stories/${featured.slug}`}>
                <Button className="gap-2">
                  Read Story
                  <Newspaper className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </article>
        )}

        {!loading && !error && rest.length > 0 && (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rest.map((post) => (
              <article key={post.id} className="border-4 border-border bg-card retro-shadow p-5 space-y-3">
                <div className="flex items-center justify-between gap-2 text-sm text-muted-foreground">
                  <span className="uppercase font-bold">{post.type}</span>
                  <span>{format(new Date(post.publishedAt || post.createdAt), 'PP')}</span>
                </div>
                <h3 className="text-2xl font-heading leading-tight">{post.title}</h3>
                <p className="text-sm md:text-base text-muted-foreground">{post.excerpt}</p>
                <Link to={`/stories/${post.slug}`}>
                  <Button variant="outline">Read More</Button>
                </Link>
              </article>
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

export default Stories;
