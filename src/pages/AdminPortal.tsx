import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { ArrowLeft, ImagePlus, LogOut } from 'lucide-react';
import { api } from '@/lib/blog-api';
import { AdminAnalytics, EventType, Post, PostPayload, PostStatus, UserSession } from '@/types/posts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import RetroBackground from '@/components/RetroBackground';
import RetroScanlines from '@/components/RetroScanlines';
import { toRenderableMediaUrl, toStorableMediaUrl } from '@/lib/media-url';

const ADMIN_ROUTE_HINT = '/admin';

const EVENT_TYPES: Array<{ value: EventType; label: string }> = [
  { value: 'hackathon', label: 'Hackathon' },
  { value: 'competition', label: 'Competition' },
  { value: 'techfest', label: 'Techfest' },
  { value: 'workshop', label: 'Workshop' },
  { value: 'meetup', label: 'Meetup' },
];

type EditorState = {
  title: string;
  slug: string;
  eventType: EventType;
  organizedBy: string;
  eventStartDate: string;
  eventEndDate: string;
  location: string;
  highlight: string;
  shortDescription: string;
  images: Array<{ url: string; alt?: string }>;
  detailedExperience: string;
  techStack: string;
  teamMembers: string;
  projectLink: string;
  certificateUrl: string;
};

const makeBlockId = (suffix: string) => `block-${Date.now()}-${Math.random().toString(36).slice(2, 7)}-${suffix}`;

const emptyEditor = (): EditorState => ({
  title: '',
  slug: '',
  eventType: 'hackathon',
  organizedBy: '',
  eventStartDate: '',
  eventEndDate: '',
  location: '',
  highlight: '',
  shortDescription: '',
  images: [],
  detailedExperience: '',
  techStack: '',
  teamMembers: '',
  projectLink: '',
  certificateUrl: '',
});

const toDateInput = (value?: string) => (value ? value.slice(0, 10) : '');

const toEditorState = (post: Post): EditorState => ({
  title: post.title,
  slug: post.slug,
  eventType: post.eventType || 'hackathon',
  organizedBy: post.organizedBy || '',
  eventStartDate: toDateInput(post.eventStartDate || post.publishedAt),
  eventEndDate: toDateInput(post.eventEndDate),
  location: post.location || '',
  highlight: post.highlight || '',
  shortDescription: post.shortDescription || post.excerpt,
  images: post.images || [],
  detailedExperience: post.detailedExperience || '',
  techStack: (post.techStack || []).join(', '),
  teamMembers: (post.teamMembers || []).join(', '),
  projectLink: post.projectLink || '',
  certificateUrl: post.certificateUrl || '',
});

const toIsoDate = (value: string) => {
  if (!value) return undefined;
  return new Date(`${value}T00:00:00`).toISOString();
};

const splitCsv = (value: string) =>
  value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

const toPayload = (editor: EditorState, status: PostStatus): PostPayload => {
  const eventStartDate = toIsoDate(editor.eventStartDate);
  const eventEndDate = toIsoDate(editor.eventEndDate);
  const title = editor.title.trim();
  const shortDescription = editor.shortDescription.trim();
  const detailedExperience = editor.detailedExperience.trim();
  const safeImages = editor.images
    .map((image) => ({
      url: toStorableMediaUrl(image.url).trim(),
      alt: image.alt,
    }))
    .filter((image) => image.url);

  const blocks = [
    shortDescription
      ? {
        id: makeBlockId('summary'),
        type: 'paragraph' as const,
        text: shortDescription,
      }
      : null,
    detailedExperience
      ? {
        id: makeBlockId('detail'),
        type: 'paragraph' as const,
        text: detailedExperience,
      }
      : null,
    ...safeImages.map((image, index) => ({
      id: makeBlockId(`image-${index}`),
      type: 'image' as const,
      imageUrl: image.url,
      imageAlt: image.alt || `${title} image ${index + 1}`,
    })),
  ].filter(Boolean);

  return {
    type: 'news',
    title,
    slug: editor.slug.trim() || undefined,
    excerpt: shortDescription || editor.highlight.trim() || title,
    coverImageUrl: safeImages[0]?.url,
    status,
    publishedAt: status === 'published' ? new Date().toISOString() : undefined,
    featured: false,
    eventType: editor.eventType,
    organizedBy: editor.organizedBy.trim(),
    eventStartDate,
    eventEndDate,
    location: editor.location.trim(),
    highlight: editor.highlight.trim(),
    shortDescription,
    detailedExperience: detailedExperience || undefined,
    techStack: splitCsv(editor.techStack),
    teamMembers: splitCsv(editor.teamMembers),
    projectLink: editor.projectLink.trim() || undefined,
    certificateUrl: toStorableMediaUrl(editor.certificateUrl).trim() || undefined,
    images: safeImages,
    tags: [editor.eventType],
    blocks: blocks.length ? blocks : [{ id: makeBlockId('fallback'), type: 'paragraph', text: shortDescription || title }],
  };
};

const AdminPortal = () => {
  const pageSize = 12;
  const { toast } = useToast();
  const [loadingSession, setLoadingSession] = useState(true);
  const [user, setUser] = useState<UserSession | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  const [posts, setPosts] = useState<Post[]>([]);
  const [analytics, setAnalytics] = useState<AdminAnalytics | null>(null);
  const [postsLoading, setPostsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);

  const [saving, setSaving] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [editor, setEditor] = useState<EditorState>(emptyEditor());
  const [uploadingImages, setUploadingImages] = useState(false);
  const [uploadingCertificate, setUploadingCertificate] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const refreshPosts = useCallback(async () => {
    setPostsLoading(true);
    try {
      const response = await api.listAdminPosts({ page: currentPage, limit: pageSize });
      setPosts(response.items);
      setTotalPages(response.totalPages || 1);
      setTotalPosts(response.total || 0);

      if (response.totalPages > 0 && currentPage > response.totalPages) {
        setCurrentPage(response.totalPages);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to load posts';
      toast({ title: 'Error', description: message, variant: 'destructive' });
    } finally {
      setPostsLoading(false);
    }
  }, [toast, currentPage]);

  const refreshAnalytics = useCallback(async () => {
    try {
      const result = await api.getAdminAnalytics();
      setAnalytics(result);
    } catch {
      setAnalytics(null);
    }
  }, []);

  useEffect(() => {
    const checkSession = async () => {
      setLoadingSession(true);
      try {
        const response = await api.me();
        setUser(response.user);
        setEmail(response.user.email);
      } catch {
        setUser(null);
      } finally {
        setLoadingSession(false);
      }
    };

    checkSession();
  }, []);

  useEffect(() => {
    if (!user) return;
    refreshPosts();
    refreshAnalytics();
  }, [user, refreshPosts, refreshAnalytics]);

  const resetEditor = () => {
    setSelectedPostId(null);
    setEditor(emptyEditor());
  };

  const eventTypeLabel = useMemo(() => {
    const map = new Map(EVENT_TYPES.map((item) => [item.value, item.label]));
    return (type?: EventType) => (type ? map.get(type) || type : 'Event');
  }, []);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setAuthLoading(true);
    try {
      const response = await api.login(email.trim(), password);
      setUser(response.user);
      setPassword('');
      toast({ title: 'Logged in', description: 'Welcome to admin portal.' });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      toast({ title: 'Login failed', description: message, variant: 'destructive' });
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    await api.logout().catch(() => undefined);
    setUser(null);
    resetEditor();
    setPosts([]);
    setCurrentPage(1);
  };

  const uploadImages = async (files: File[]) => {
    if (!files.length) return;
    setUploadingImages(true);

    try {
      const uploaded = await Promise.all(files.map((file) => api.uploadImage(file)));
      const nextImages = uploaded.map((item) => ({ url: item.item.url }));
      setEditor((prev) => ({ ...prev, images: [...prev.images, ...nextImages] }));
      toast({ title: 'Uploaded', description: `${nextImages.length} image(s) uploaded.` });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Upload failed';
      toast({ title: 'Upload failed', description: message, variant: 'destructive' });
    } finally {
      setUploadingImages(false);
    }
  };

  const handleImageFileInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    await uploadImages(files);
    event.target.value = '';
  };

  const handleCertificateUpload = async (file?: File) => {
    if (!file) return;
    setUploadingCertificate(true);

    try {
      const uploaded = await api.uploadImage(file);
      setEditor((prev) => ({ ...prev, certificateUrl: uploaded.item.url }));
      toast({ title: 'Uploaded', description: 'Certificate uploaded.' });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Upload failed';
      toast({ title: 'Upload failed', description: message, variant: 'destructive' });
    } finally {
      setUploadingCertificate(false);
    }
  };

  const handleSave = async (status: PostStatus) => {
    setSaving(true);

    try {
      const payload = toPayload(editor, status);

      if (!payload.title) {
        throw new Error('Title is required');
      }

      if (status !== 'draft' && (!payload.organizedBy || !payload.eventStartDate || !payload.location || !payload.highlight || !payload.shortDescription)) {
        throw new Error('Please fill in all required fields before publishing: organizer, event date, location, highlight, and short description');
      }

      if (selectedPostId) {
        await api.updatePost(selectedPostId, payload);
        toast({ title: 'Updated', description: 'Event updated successfully.' });
      } else {
        await api.createPost(payload);
        setCurrentPage(1);
        toast({ title: status === 'published' ? 'Published' : 'Saved', description: status === 'published' ? 'Event published successfully.' : 'Draft saved successfully.' });
      }

      await refreshPosts();
      await refreshAnalytics();
      resetEditor();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to save event';
      toast({ title: 'Error', description: message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleDeletePost = async (postId: string) => {
    const ok = window.confirm('Delete this event permanently?');
    if (!ok) return;

    try {
      await api.deletePost(postId);
      toast({ title: 'Deleted', description: 'Event removed.' });
      if (selectedPostId === postId) {
        resetEditor();
      }

      if (posts.length === 1 && currentPage > 1) {
        setCurrentPage((prev) => Math.max(1, prev - 1));
      }

      await refreshPosts();
      await refreshAnalytics();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete event';
      toast({ title: 'Error', description: message, variant: 'destructive' });
    }
  };

  if (loadingSession) {
    return (
      <div className="min-h-screen bg-background relative">
        <RetroBackground />
        <RetroScanlines />
        <div className="relative z-10 max-w-xl mx-auto px-4 py-20">
          <Card className="border-4 border-border retro-shadow-lg">
            <CardContent className="pt-6">Checking admin session...</CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative">
      <RetroBackground />
      <RetroScanlines />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-10 md:py-16 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link to="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back Home
            </Button>
          </Link>

          {user && (
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          )}
        </div>

        {!user ? (
          <Card className="max-w-xl mx-auto border-4 border-border retro-shadow-lg">
            <CardHeader>
              <CardTitle className="text-3xl font-heading">Admin Portal</CardTitle>
              <p className="text-sm text-muted-foreground">Hidden route: {ADMIN_ROUTE_HINT}</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>

                <Button type="submit" className="w-full" disabled={authLoading}>
                  {authLoading ? 'Signing in...' : 'Sign in'}
                </Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {analytics && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                <div className="border-2 border-border bg-card retro-shadow p-3">
                  <p className="text-xs text-muted-foreground">Total Posts</p>
                  <p className="text-2xl font-heading">{analytics.posts.total}</p>
                </div>
                <div className="border-2 border-border bg-card retro-shadow p-3">
                  <p className="text-xs text-muted-foreground">Published</p>
                  <p className="text-2xl font-heading">{analytics.posts.published}</p>
                </div>
                <div className="border-2 border-border bg-card retro-shadow p-3">
                  <p className="text-xs text-muted-foreground">Scheduled</p>
                  <p className="text-2xl font-heading">{analytics.posts.scheduled}</p>
                </div>
                <div className="border-2 border-border bg-card retro-shadow p-3">
                  <p className="text-xs text-muted-foreground">Drafts</p>
                  <p className="text-2xl font-heading">{analytics.posts.drafts}</p>
                </div>
                <div className="border-2 border-border bg-card retro-shadow p-3">
                  <p className="text-xs text-muted-foreground">Logins (24h)</p>
                  <p className="text-2xl font-heading">{analytics.audit.logins24h}</p>
                </div>
                <div className="border-2 border-border bg-card retro-shadow p-3">
                  <p className="text-xs text-muted-foreground">Writes (24h)</p>
                  <p className="text-2xl font-heading">{analytics.audit.writes24h}</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6">
              <Card className="border-4 border-border retro-shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-2xl font-heading">Add Event</CardTitle>
                  <Button variant="outline" onClick={resetEditor}>New Event</Button>
                </CardHeader>
                <CardContent>
                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                    }}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input value={editor.title} onChange={(e) => setEditor((prev) => ({ ...prev, title: e.target.value }))} required />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Event Type</Label>
                        <select
                          className="w-full border-2 border-border bg-background px-3 py-2"
                          value={editor.eventType}
                          onChange={(e) => setEditor((prev) => ({ ...prev, eventType: e.target.value as EventType }))}
                        >
                          {EVENT_TYPES.map((type) => (
                            <option key={type.value} value={type.value}>
                              {type.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label>Organized By</Label>
                        <Input
                          value={editor.organizedBy}
                          onChange={(e) => setEditor((prev) => ({ ...prev, organizedBy: e.target.value }))}
                          placeholder="College / Company"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Event Date</Label>
                        <Input
                          type="date"
                          value={editor.eventStartDate}
                          onChange={(e) => setEditor((prev) => ({ ...prev, eventStartDate: e.target.value }))}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>End Date (optional)</Label>
                        <Input
                          type="date"
                          value={editor.eventEndDate}
                          onChange={(e) => setEditor((prev) => ({ ...prev, eventEndDate: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Location</Label>
                      <Input
                        value={editor.location}
                        onChange={(e) => setEditor((prev) => ({ ...prev, location: e.target.value }))}
                        placeholder="City / Online"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>One-line Highlight</Label>
                      <Input
                        value={editor.highlight}
                        onChange={(e) => setEditor((prev) => ({ ...prev, highlight: e.target.value }))}
                        placeholder="Won 1st prize among 200+ teams"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Short Description</Label>
                      <Textarea
                        value={editor.shortDescription}
                        onChange={(e) => setEditor((prev) => ({ ...prev, shortDescription: e.target.value }))}
                        rows={5}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Upload Images</Label>
                      <div
                        className={`border-2 border-dashed border-border p-4 text-center space-y-3 ${dragActive ? 'bg-accent' : 'bg-muted/20'}`}
                        onDragOver={(event) => {
                          event.preventDefault();
                          setDragActive(true);
                        }}
                        onDragLeave={() => setDragActive(false)}
                        onDrop={(event) => {
                          event.preventDefault();
                          setDragActive(false);
                          const files = Array.from(event.dataTransfer.files || []).filter((file) => file.type.startsWith('image/'));
                          void uploadImages(files);
                        }}
                      >
                        <p className="text-sm text-muted-foreground">Drag & Drop images here</p>
                        <Label className="inline-flex items-center gap-2 border-2 border-border px-3 py-2 cursor-pointer hover:bg-accent">
                          <ImagePlus className="h-4 w-4" />
                          {uploadingImages ? 'Uploading...' : 'Choose files'}
                          <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageFileInput} disabled={uploadingImages} />
                        </Label>
                      </div>

                      {editor.images.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {editor.images.map((image, index) => (
                            <div key={`${image.url}-${index}`} className="border-2 border-border p-2 space-y-2 bg-card">
                              <img src={toRenderableMediaUrl(image.url)} alt={image.alt || `Event image ${index + 1}`} className="w-full h-24 object-cover" />
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="w-full"
                                onClick={() =>
                                  setEditor((prev) => ({
                                    ...prev,
                                    images: prev.images.filter((_, currentIndex) => currentIndex !== index),
                                  }))
                                }
                              >
                                Remove
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <details className="border-2 border-border p-4 bg-muted/20">
                      <summary className="cursor-pointer font-heading text-lg">Advanced (optional)</summary>
                      <div className="space-y-4 mt-4">
                        <div className="space-y-2">
                          <Label>Detailed Experience</Label>
                          <Textarea
                            value={editor.detailedExperience}
                            onChange={(e) => setEditor((prev) => ({ ...prev, detailedExperience: e.target.value }))}
                            rows={7}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Tech Stack Used</Label>
                          <Input
                            value={editor.techStack}
                            onChange={(e) => setEditor((prev) => ({ ...prev, techStack: e.target.value }))}
                            placeholder="React, Node, AI"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Team Members</Label>
                          <Input
                            value={editor.teamMembers}
                            onChange={(e) => setEditor((prev) => ({ ...prev, teamMembers: e.target.value }))}
                            placeholder="Member A, Member B"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Project Link / GitHub</Label>
                          <Input
                            value={editor.projectLink}
                            onChange={(e) => setEditor((prev) => ({ ...prev, projectLink: e.target.value }))}
                            placeholder="https://"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Certificate Upload</Label>
                          <div className="flex flex-wrap gap-2">
                            <Label className="inline-flex items-center gap-2 border-2 border-border px-3 py-2 cursor-pointer hover:bg-accent">
                              <ImagePlus className="h-4 w-4" />
                              {uploadingCertificate ? 'Uploading...' : 'Upload'}
                              <input
                                type="file"
                                accept="image/*,.pdf"
                                className="hidden"
                                onChange={(e) => handleCertificateUpload(e.target.files?.[0])}
                                disabled={uploadingCertificate}
                              />
                            </Label>
                            {editor.certificateUrl && (
                              <a href={editor.certificateUrl} target="_blank" rel="noreferrer" className="text-sm underline text-muted-foreground">
                                View uploaded certificate
                              </a>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Custom Slug (optional)</Label>
                          <Input
                            value={editor.slug}
                            onChange={(e) => setEditor((prev) => ({ ...prev, slug: e.target.value }))}
                            placeholder="auto-from-title"
                          />
                        </div>
                      </div>
                    </details>

                    <div className="grid grid-cols-2 gap-3">
                      <Button type="button" variant="outline" onClick={() => void handleSave('draft')} disabled={saving}>
                        {saving ? 'Saving...' : 'Save Draft'}
                      </Button>
                      <Button type="button" onClick={() => void handleSave('published')} disabled={saving}>
                        {saving ? 'Saving...' : 'Publish'}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              <Card className="border-4 border-border retro-shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-heading">All Events</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 max-h-[80vh] overflow-y-auto">
                  {postsLoading && <p>Loading events...</p>}

                  {!postsLoading && posts.length === 0 && (
                    <p className="text-sm text-muted-foreground">No events yet. Create your first one.</p>
                  )}

                  {posts.map((post) => (
                    <div key={post.id} className="border-2 border-border p-3 space-y-2 bg-card">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="outline" className="uppercase">{eventTypeLabel(post.eventType)}</Badge>
                        <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>{post.status}</Badge>
                      </div>

                      <h3 className="font-heading text-lg leading-tight">{post.title}</h3>

                      <p className="text-xs text-muted-foreground">
                        {(post.eventStartDate || post.publishedAt)
                          ? format(new Date(post.eventStartDate || post.publishedAt || post.createdAt), 'PP')
                          : format(new Date(post.createdAt), 'PPp')}
                        {post.location ? ` • ${post.location}` : ''}
                      </p>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedPostId(post.id);
                            setEditor(toEditorState(post));
                          }}
                        >
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDeletePost(post.id)}>
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}

                  {!postsLoading && totalPosts > 0 && (
                    <div className="pt-2 flex items-center justify-between gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                        disabled={currentPage <= 1}
                      >
                        Previous
                      </Button>

                      <p className="text-xs text-muted-foreground">
                        Page {currentPage} / {totalPages} • {totalPosts} events
                      </p>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                        disabled={currentPage >= totalPages}
                      >
                        Next
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPortal;
