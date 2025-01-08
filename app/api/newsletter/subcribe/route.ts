import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Subscriber from "@/models/Subscriber";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  await dbConnect();

  try {
    const subscriber = new Subscriber({ email });
    await subscriber.save();
    return NextResponse.json(
      { message: "Subscribed successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.code === 11000) {
      // Duplicate key error
      return NextResponse.json(
        { error: "Email already subscribed" },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
