import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/db";
import Post from "@/models/Post";

export async function GET(req: NextRequest) {
  await dbConnect();
  const posts = await Post.find({})
    .sort({ createdAt: -1 })
    .populate("author", "name avatar")
    .limit(10);
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const session: any = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const { title, content, slug, tags, image } = await req.json();

  const post = new Post({
    title,
    content,
    slug,
    tags,
    image,
    author: session.user.id,
  });

  await post.save();
  return NextResponse.json(post, { status: 201 });
}
