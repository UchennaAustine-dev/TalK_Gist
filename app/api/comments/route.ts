import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/db";
import Comment from "@/models/Comment";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const postId = url.searchParams.get("postId");

  if (!postId) {
    return NextResponse.json({ error: "Missing postId" }, { status: 400 });
  }

  await dbConnect();
  const comments = await Comment.find({ post: postId })
    .populate("author", "name avatar")
    .sort({ createdAt: -1 });

  return NextResponse.json(comments);
}

export async function POST(req: NextRequest) {
  const session: any = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const { postId, content, parentId } = await req.json();

  if (!postId || !content) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const comment = new Comment({
    content,
    post: postId,
    author: session.user.id,
    parent: parentId || null,
  });

  await comment.save();
  return NextResponse.json(comment, { status: 201 });
}
