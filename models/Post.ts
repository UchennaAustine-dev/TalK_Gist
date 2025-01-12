import mongoose, { Document, Schema } from "mongoose";

export interface IPost extends Document {
  title: string;
  content: string;
  slug: string;
  tags: string[];
  category: string;
  author: mongoose.Types.ObjectId;
  createdAt: Date;
  image?: string;
}

const PostSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  tags: [{ type: String }],
  category: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
  image: { type: String },
});

export default mongoose.models.Post ||
  mongoose.model<IPost>("Post", PostSchema);
