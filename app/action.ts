"use server";

import { z } from "zod";
import dbConnect from "@/lib/db";
import Subscriber from "@/models/Subscriber";

const emailSchema = z.string().email();

export async function subscribeToNewsletter(email: string) {
  await dbConnect();

  const validatedEmail = emailSchema.parse(email);

  const subscriber = new Subscriber({ email: validatedEmail });
  await subscriber.save();

  return { success: true };
}
