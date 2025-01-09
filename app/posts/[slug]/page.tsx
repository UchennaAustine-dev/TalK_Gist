import { notFound } from 'next/navigation'
import Image from 'next/image'
import { format } from 'date-fns'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { CommentSection } from '@/components/comment-section'
import { SocialShare } from '@/components/social-share'
import { RelatedPosts } from '@/components/related-posts'
import dbConnect from '@/lib/db'
import Post from '@/models/Post'
import { BookmarkButton } from '@/components/bookmark-button'

interface PostType {
  _id: string
  title: string
  slug: string
  content: string
  tags: string[]
  category: string;
  author: {
    _id: string
    name: string
    avatar: string
  }
  createdAt: string
  image?: string
}

async function getPost(slug: string): Promise<PostType | null> {
  await dbConnect()
  const post = await Post.findOne({ slug }).populate('author', 'name avatar').lean()
  if (!post) return null

  return {
    _id: post._id.toString(),
    title: post.title,
    slug: post.slug,
    content: post.content,
    tags: post.tags,
    category: post.category,
    author: {
      _id: post.author._id.toString(),
      name: post.author.name,
      avatar: post.author.avatar || '',
    },
    createdAt: post.createdAt.toISOString(),
    image: post.image,
  }
}

async function getAllPosts(): Promise<PostType[]> {
  await dbConnect()
  const posts = await Post.find({})
    .select('title slug tags image category')
    .lean()

  return posts.map(post => ({
    _id: post._id.toString(),
    title: post.title,
    slug: post.slug,
    tags: post.tags,
    category: post.category,
    image: post.image,
    content: '', // Not needed for related posts
    author: { _id: '', name: '', avatar: '' }, // Not needed for related posts
    createdAt: '', // Not needed for related posts
  }))
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)
  const allPosts = await getAllPosts()

  if (!post) {
    notFound()
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  const fullUrl = `${baseUrl}/posts/${post.slug}`

  return (
    <article className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback>{post.author.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{post.author.name}</p>
              <p className="text-sm text-gray-500">
                {format(new Date(post.createdAt), 'MMMM dd, yyyy')}
              </p>
            </div>
          </div>
          <BookmarkButton postId={post._id} />
        </div>
        
        <SocialShare 
          url={fullUrl}
          title={post.title}
          description={post.content.substring(0, 200)}
        />

        {post.image && (
          <div className="relative aspect-video my-8">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        )}
        
        <div className="prose max-w-none mb-8" dangerouslySetInnerHTML={{ __html: post.content }} />
        
        <div className="flex gap-2 mb-8">
          <Badge variant="outline">{post.category}</Badge>
          {post.tags.map((tag: string) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>

        <CommentSection postId={post._id} />
        
        <RelatedPosts
          currentPostId={post._id}
          currentPostTags={post.tags}
          currentPostCategory={post.category}
          allPosts={allPosts}
        />
      </div>
    </article>
  )
}

