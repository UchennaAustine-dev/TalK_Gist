import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface PostCardProps {
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

export function PostCard({ post }: PostCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link href={`/posts/${post.slug}`}>
        <Card className="overflow-hidden transition-all hover:shadow-lg">
          <div className="relative aspect-[2/1] overflow-hidden">
            <Image
              src={post.image ?? "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover transition-all hover:scale-105"
            />
          </div>
          <CardContent className="grid gap-4 p-4">
            <h3 className="font-bold leading-tight text-xl font-playfair">
              {post.title}
            </h3>
            <p className="text-muted-foreground line-clamp-2">
              {post.content.substring(0, 100)}...
            </p>
            <div className="flex items-center gap-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                <AvatarFallback>{post.author.name[0]}</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  {post.author.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(post.createdAt), "MMMM dd, yyyy")}
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <div className="flex gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}
