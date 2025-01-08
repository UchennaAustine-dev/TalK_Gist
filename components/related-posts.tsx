import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RelatedPost {
  _id: string;
  title: string;
  slug: string;
  image?: string;
  tags: string[];
}

interface RelatedPostsProps {
  currentPostId: string;
  currentPostTags: string[];
  allPosts: RelatedPost[];
}

export function RelatedPosts({
  currentPostId,
  currentPostTags,
  allPosts,
}: RelatedPostsProps) {
  // Filter out current post and find posts with matching tags
  const relatedPosts = allPosts
    .filter((post) => post._id !== currentPostId)
    .map((post) => ({
      ...post,
      matchingTags: post.tags.filter((tag) => currentPostTags.includes(tag))
        .length,
    }))
    .sort((a, b) => b.matchingTags - a.matchingTags)
    .slice(0, 3);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <Link key={post._id} href={`/posts/${post.slug}`}>
            <Card className="overflow-hidden transition-all hover:shadow-lg">
              <div className="relative aspect-[2/1]">
                <Image
                  src={post.image ?? "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold line-clamp-2 mb-2">{post.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
