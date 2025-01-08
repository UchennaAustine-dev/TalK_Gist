import Link from "next/link";
import { compareDesc } from "date-fns";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { PostCard } from "@/components/post-card";
import { FeaturedPost } from "@/components/featured-post";
import { Newsletter } from "@/components/newsletter";
import dbConnect from "@/lib/db";
import Post from "@/models/Post";

interface Post {
  _id: string;
  title: string;
  content: string;
  slug: string;
  tags: string[];
  author: {
    _id: string;
    name: string;
    avatar: string;
  };
  createdAt: string;
  image?: string;
}

async function getPosts() {
  await dbConnect();
  const posts = await Post.find({})
    .sort({ createdAt: -1 })
    .populate("author", "name avatar")
    .limit(7)
    .lean();
  return posts.map(
    (post: any): Post => ({
      ...post,
      _id: post._id.toString(),
      author: {
        ...post.author,
        _id: post.author._id.toString(),
      },
    })
  );
}

export default async function Home() {
  const posts = await getPosts();

  const featuredPost = posts[0];
  const regularPosts = posts.slice(1);

  return (
    <div className="relative">
      <section className="container px-4 md:px-6 space-y-10 pb-12 pt-20 md:pt-32">
        <div className="flex flex-col items-center gap-4 text-center">
          <motion.h1
            className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1] font-display"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Share Your Stories with the World
          </motion.h1>
          <motion.p
            className="max-w-[750px] text-lg text-muted-foreground sm:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Discover thought-provoking articles, share your expertise, and
            engage with a community of passionate readers.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button size="lg" asChild>
              <Link href="/posts">Start Reading</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="container px-4 md:px-6 py-12">
        <FeaturedPost post={featuredPost} />
      </section>

      <section className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {regularPosts.map((post, i) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <PostCard post={post} />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container px-4 md:px-6 py-12">
        <Newsletter />
      </section>
    </div>
  );
}
