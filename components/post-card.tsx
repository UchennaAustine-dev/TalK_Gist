import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

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
    <Link href={`/posts/${post.slug}`}>
      <Card className="overflow-hidden transition-all hover:shadow-lg">
        <CardHeader className="p-0">
          <div className="relative aspect-[2/1] overflow-hidden">
            <Image
              src={post.image ?? "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover transition-all hover:scale-105"
            />
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 p-4">
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
          <div>
            <h3 className="font-bold leading-tight text-xl">{post.title}</h3>
            <p className="text-muted-foreground line-clamp-2 mt-2">
              {post.content.substring(0, 100)}...
            </p>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <div className="flex gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
