import dbConnect from "@/lib/db";
import Post, { IPost } from "@/models/Post";
import { Types } from "mongoose";
import { mockPosts } from "./mockPosts";

export interface PostType {
  _id: string;
  title: string;
  content: string;
  slug: string;
  tags: string[];
  category: string;
  author: {
    _id: string;
    name: string;
    avatar: string;
  };
  createdAt: string;
  image?: string;
}

export async function getPosts(): Promise<PostType[]> {
  try {
    await dbConnect();
    const posts = await Post.find({})
      .sort({ createdAt: -1 })
      .populate("author", "name avatar")
      .limit(7)
      .lean();

    const dbPosts = posts.map((post: unknown): PostType => {
      const typedPost = post as IPost & {
        _id: Types.ObjectId;
        author: { _id: Types.ObjectId; name: string; avatar?: string };
      };

      return {
        _id: typedPost._id.toString(),
        title: typedPost.title,
        content: typedPost.content,
        slug: typedPost.slug,
        tags: typedPost.tags,
        category: typedPost.category,
        author: {
          _id: typedPost.author._id.toString(),
          name: typedPost.author.name,
          avatar: typedPost.author.avatar || "",
        },
        createdAt: new Date(typedPost.createdAt).toISOString(),
        image: typedPost.image,
      };
    });

    // Combine database posts with mock posts
    const allPosts = [...dbPosts, ...mockPosts];

    // Sort combined posts by createdAt date
    allPosts.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return allPosts.slice(0, 7); // Return only the first 7 posts
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return mockPosts; // Return mock posts if database fetch fails
  }
}
