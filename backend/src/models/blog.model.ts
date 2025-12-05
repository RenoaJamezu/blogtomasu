import mongoose, { Document, Schema, Model, Types } from "mongoose";

export interface IBlog extends Document {
  title: string;
  content: string;
  imageUrl?: string;
  author: Types.ObjectId;
  isDeleted: boolean;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema: Schema<IBlog> = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    content: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      index: true
    },
    deletedAt: {
      type: Date
    }
  },
  {
    timestamps: true
  },
);

BlogSchema.pre(/^find/, async function () {
  // @ts-ignore
  if (!this.getOptions().includeDeleted) {
    // @ts-ignore
    this.where({ isDeleted: false });
  }
})

export const Blog: Model<IBlog> = mongoose.model<IBlog>("Blog", BlogSchema);

export default Blog;