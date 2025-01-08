import { Suspense } from "react";
import { PostCard } from "@/components/post-card";
import dbConnect from "@/lib/db";
import Post from "@/models/Post";

interface PostType {
  _id: string;
  title: string;
  slug: string;
  content: string;
  tags: string[];
  author: {
    _id: string;
    name: string;
    avatar: string;
  };
  createdAt: string;
  image?: string;
}

async function searchPosts(query: string): Promise<PostType[]> {
  await dbConnect();
  const posts = await Post.find(
    { $text: { $search: query } },
    { score: { $meta: "textScore" } }
  )
    .sort({ score: { $meta: "textScore" } })
    .limit(10)
    .populate("author", "name avatar")
    .lean();

  return posts.map(
    (post: any): PostType => ({
      _id: post._id.toString(),
      title: post.title,
      slug: post.slug,
      content: post.content,
      tags: post.tags,
      author: {
        _id: post.author._id.toString(),
        name: post.author.name,
        avatar: post.author.avatar || "",
      },
      createdAt: post.createdAt.toISOString(),
      image: post.image,
    })
  );
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const query = searchParams.q;
  const posts = await searchPosts(query);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Search Results for "{query}"</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
        {posts.length === 0 && (
          <p className="text-center text-gray-500">No results found.</p>
        )}
      </Suspense>
    </div>
  );
}
