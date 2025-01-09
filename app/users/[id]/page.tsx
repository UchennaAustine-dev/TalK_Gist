import { notFound } from "next/navigation";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import Post, { IPost } from "@/models/Post";
import { Types } from "mongoose";

interface UserProfile {
  _id: string;
  name: string;
  avatar: string;
  bio: string;
}

interface UserPost {
  _id: string;
  title: string;
  slug: string;
  category: string;
  tags: string[];
  image?: string;
}

async function getUserProfile(id: string): Promise<UserProfile | null> {
  await dbConnect();
  const user = await User.findById(id).select("name avatar bio").lean();
  if (!user) return null;

  // Explicitly type the user object
  const typedUser = user as unknown as {
    _id: Types.ObjectId;
    name: string;
    avatar?: string;
    bio?: string;
  };

  return {
    _id: typedUser._id.toString(),
    name: typedUser.name,
    avatar: typedUser.avatar || "",
    bio: typedUser.bio || "",
  };
}

async function getUserPosts(id: string): Promise<UserPost[]> {
  await dbConnect();
  const posts = await Post.find({ author: new Types.ObjectId(id) })
    .select("title slug category tags image")
    .sort({ createdAt: -1 })
    .lean();

  return posts.map((post) => {
    const typedPost = post as unknown as IPost & { _id: Types.ObjectId };
    return {
      _id: typedPost._id.toString(),
      title: typedPost.title,
      slug: typedPost.slug,
      category: typedPost.category,
      tags: typedPost.tags,
      image: typedPost.image,
    };
  });
}

export default async function UserProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const user = await getUserProfile(params.id);
  const posts = await getUserPosts(params.id);

  if (!user) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-6 mb-8">
          <Avatar className="w-24 h-24">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="text-gray-600 mt-2">{user.bio}</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6">Posts by {user.name}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <Card key={post._id}>
              {post.image && (
                <div className="relative aspect-video">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
              )}
              <CardContent className="p-4">
                <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                <div className="flex flex-wrap gap-2 mb-2">
                  <Badge variant="outline">{post.category}</Badge>
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <a
                  href={`/posts/${post.slug}`}
                  className="text-blue-500 hover:underline"
                >
                  Read more
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
