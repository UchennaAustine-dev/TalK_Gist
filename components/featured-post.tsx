import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

interface FeaturedPostProps {
  post: {
    _id: string;
    title: string;
    slug: string;
    content: string;
    tags: string[];
    author: {
      name: string;
      avatar: string;
    };
    createdAt: string;
    image?: string;
  };
}

export function FeaturedPost({ post }: FeaturedPostProps) {
  if (!post) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link href={`/posts/${post.slug}`}>
        <article className="relative overflow-hidden rounded-lg shadow-lg">
          <div className="relative aspect-[2/1] overflow-hidden">
            <Image
              src={post.image ?? "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/20" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="h-10 w-10 border-2 border-white">
                    <AvatarImage
                      src={post.author.avatar}
                      alt={post.author.name}
                    />
                    <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{post.author.name}</p>
                    <p className="text-sm opacity-90">
                      {format(new Date(post.createdAt), "MMMM dd, yyyy")}
                    </p>
                  </div>
                </div>
                <h2 className="text-2xl font-bold leading-tight md:text-3xl lg:text-4xl mb-4 font-playfair">
                  {post.title}
                </h2>
                <p className="max-w-[600px] text-lg opacity-90 mb-4">
                  {post.content.substring(0, 200)}...
                </p>
                <div className="flex gap-2">
                  {post.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-white/10 hover:bg-white/20"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
