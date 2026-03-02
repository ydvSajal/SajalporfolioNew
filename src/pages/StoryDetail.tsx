import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PostBlocks from '@/components/PostBlocks';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { api } from '@/lib/blog-api';
import { Post } from '@/types/posts';
import RetroBackground from '@/components/RetroBackground';
import RetroScanlines from '@/components/RetroScanlines';

const StoryDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setError('Missing slug');
      setLoading(false);
      return;
    }

    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.getPublicPost(slug);
        setPost(response.item);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load post';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [slug]);

  return (
    <div className="min-h-screen bg-background relative">
      <RetroBackground />
      <RetroScanlines />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-10 md:py-16 space-y-6">
        <Link to="/stories">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to stories
          </Button>
        </Link>

        {loading && <div className="border-4 border-border bg-card retro-shadow p-6">Loading post...</div>}

        {error && <div className="border-4 border-border bg-destructive text-destructive-foreground retro-shadow p-6">{error}</div>}

        {!loading && !error && post && (
          <article className="border-4 border-border bg-card retro-shadow-lg overflow-hidden">
            {post.coverImageUrl && (
              <img src={post.coverImageUrl} alt={post.title} className="w-full h-64 md:h-80 object-cover border-b-4 border-border" />
            )}
            <div className="p-6 md:p-8 space-y-6">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="uppercase">{post.type}</Badge>
                <Badge variant="outline">{format(new Date(post.publishedAt || post.createdAt), 'PPP')}</Badge>
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">#{tag}</Badge>
                ))}
              </div>

              <header className="space-y-2">
                <h1 className="text-4xl md:text-5xl font-heading leading-tight">{post.title}</h1>
                <p className="text-lg text-muted-foreground">{post.excerpt}</p>
              </header>

              <PostBlocks blocks={post.blocks} />
            </div>
          </article>
        )}
      </div>
    </div>
  );
};

export default StoryDetail;
