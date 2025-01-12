import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PostCard } from "@/components/post-card";
import { FeaturedPost } from "@/components/featured-post";
import { Newsletter } from "@/components/newsletter";
import { getPosts } from "@/lib/post";

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="relative">
      <section className="container px-4 md:px-6 space-y-10 pb-12 pt-20 md:pt-32">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1] font-playfair">
            Share Your Stories with the World
          </h1>
          <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
            Discover thought-provoking articles, share your expertise, and
            engage with a community of passionate readers.
          </p>
          <div className="flex gap-4">
            <Button size="lg" asChild>
              <Link href="/posts">Start Reading</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/posts/new">Create Post</Link>
            </Button>
          </div>
        </div>
      </section>

      {posts.length > 0 ? (
        <>
          <section className="container px-4 md:px-6 py-12">
            <h2 className="text-2xl font-bold mb-6 font-playfair">
              Featured Post
            </h2>
            <FeaturedPost post={posts[0]} />
          </section>

          {posts.length > 1 && (
            <section className="container px-4 md:px-6 py-12">
              <h2 className="text-2xl font-bold mb-6 font-playfair">
                Latest Posts
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {posts.slice(1, 4).map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
              <div className="mt-10 text-center">
                <Button asChild>
                  <Link href="/posts">View All Posts</Link>
                </Button>
              </div>
            </section>
          )}
        </>
      ) : (
        <section className="container px-4 md:px-6 py-12 text-center">
          <h2 className="text-2xl font-bold mb-4 font-playfair">
            No posts yet
          </h2>
          <p className="text-muted-foreground">
            Check back later for new content!
          </p>
        </section>
      )}

      <section className="container px-4 md:px-6 py-12">
        <Newsletter />
      </section>
    </div>
  );
}
