import mongoose, { Document, Model } from "mongoose";

export interface IPost extends Document {
  title: string;
  content: string;
  slug: string;
  tags: string[];
  category: string;
  author: mongoose.Types.ObjectId;
  viewCount: number;
  likesCount: number;
  image?: string;
}

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title for this post"],
      maxlength: [60, "Title cannot be more than 60 characters"],
    },
    content: {
      type: String,
      required: [true, "Please provide the content for this post"],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    tags: [String],
    category: {
      type: String,
      required: [true, "Please provide a category for this post"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
    likesCount: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

PostSchema.index({
  title: "text",
  content: "text",
  tags: "text",
  category: "text",
});

const Post: Model<IPost> =
  mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema);

export default Post;
