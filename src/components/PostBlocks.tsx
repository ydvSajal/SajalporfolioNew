import { PostBlock } from '@/types/posts';

type PostBlocksProps = {
  blocks: PostBlock[];
};

const PostBlocks = ({ blocks }: PostBlocksProps) => {
  return (
    <div className="space-y-6">
      {blocks.map((block) => {
        if (block.type === 'heading') {
          if (block.headingLevel === 1) {
            return (
              <h1 key={block.id} className="text-3xl md:text-4xl font-heading text-foreground">
                {block.text}
              </h1>
            );
          }
          if (block.headingLevel === 3) {
            return (
              <h3 key={block.id} className="text-xl md:text-2xl font-heading text-foreground">
                {block.text}
              </h3>
            );
          }
          return (
            <h2 key={block.id} className="text-2xl md:text-3xl font-heading text-foreground">
              {block.text}
            </h2>
          );
        }

        if (block.type === 'image' && block.imageUrl) {
          return (
            <figure key={block.id} className="space-y-2">
              <img
                src={block.imageUrl}
                alt={block.imageAlt || 'Post image'}
                className="w-full rounded-none border-2 border-border retro-shadow object-cover max-h-[500px]"
                loading="lazy"
              />
              {block.imageAlt && <figcaption className="text-sm text-muted-foreground">{block.imageAlt}</figcaption>}
            </figure>
          );
        }

        return (
          <p key={block.id} className="text-base md:text-lg text-foreground/90 leading-relaxed">
            {block.text}
          </p>
        );
      })}
    </div>
  );
};

export default PostBlocks;
