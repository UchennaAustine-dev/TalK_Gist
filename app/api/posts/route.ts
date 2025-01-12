import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/db";
import Post from "@/models/Post";
import slugify from "slugify";

export async function GET() {
  await dbConnect();
  const posts = await Post.find({})
    .sort({ createdAt: -1 })
    .populate("author", "name avatar")
    .limit(10);
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !(session.user as any).id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const { title, content, category, tags } = await req.json();

  const slug = slugify(title, { lower: true, strict: true });

  const post = new Post({
    title,
    content,
    slug,
    category,
    tags,
    author: (session.user as any).id,
  });

  await post.save();
  return NextResponse.json({ slug: post.slug }, { status: 201 });
}
