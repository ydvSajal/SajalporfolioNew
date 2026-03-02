export type PostType = 'blog' | 'news';
export type PostStatus = 'draft' | 'published' | 'scheduled' | 'archived';
export type BlockType = 'heading' | 'paragraph' | 'image';
export type EventType = 'hackathon' | 'competition' | 'techfest' | 'workshop' | 'meetup';

export type PostBlock = {
  id: string;
  type: BlockType;
  headingLevel?: 1 | 2 | 3;
  text?: string;
  imageUrl?: string;
  imageAlt?: string;
};

export type PostImage = {
  url: string;
  alt?: string;
};

export type Post = {
  id: string;
  type: PostType;
  title: string;
  slug: string;
  excerpt: string;
  coverImageUrl?: string;
  status: PostStatus;
  publishedAt?: string;
  featured: boolean;
  eventType?: EventType;
  organizedBy?: string;
  eventStartDate?: string;
  eventEndDate?: string;
  location?: string;
  highlight?: string;
  shortDescription?: string;
  detailedExperience?: string;
  techStack: string[];
  teamMembers: string[];
  projectLink?: string;
  certificateUrl?: string;
  images: PostImage[];
  tags: string[];
  blocks: PostBlock[];
  authorEmail: string;
  createdAt: string;
  updatedAt: string;
};

export type UserSession = {
  email: string;
  role: 'admin';
};

export type PostPayload = {
  type: PostType;
  title: string;
  slug?: string;
  excerpt: string;
  coverImageUrl?: string;
  status: PostStatus;
  publishedAt?: string;
  featured: boolean;
  eventType?: EventType;
  organizedBy?: string;
  eventStartDate?: string;
  eventEndDate?: string;
  location?: string;
  highlight?: string;
  shortDescription?: string;
  detailedExperience?: string;
  techStack?: string[];
  teamMembers?: string[];
  projectLink?: string;
  certificateUrl?: string;
  images?: PostImage[];
  tags: string[];
  blocks: PostBlock[];
};

export type AdminAnalytics = {
  posts: {
    total: number;
    published: number;
    scheduled: number;
    drafts: number;
  };
  audit: {
    logins24h: number;
    failedLogins24h: number;
    writes24h: number;
  };
};
