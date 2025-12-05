import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import Blog from "../models/blog.model";

export async function createBlog(req: AuthRequest, res: Response) {
  try {
    const { title, content } = req.body as {
      title: string,
      content: string
    };

    if (!title || !content) {
      return res.status(400).json({ message: "Missing fields" });
    };

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

    const blog = await Blog.create({
      title,
      content,
      imageUrl,
      author: req.userId,
    });

    return res.status(201).json({ blog })
  } catch (error) {
    return res.status(500).json({ message: "Failed to create blog" });
  };
};

export async function listBlogs(req: Request, res: Response) {
  try {
    const blogs = await Blog.find()
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({ blogs });
  } catch (error) {
    return res.status(500).json({ message: "Failed to list blogs" });
  };
};

export async function getBlog(req: Request, res: Response) {
  try {
    const { id } = req.params as { id: string };
    const blog = await Blog.findById(id).populate("author", "name email");

    if (!blog) {
      return res.status(404).json({ message: "Not found" });
    };

    return res.status(200).json(blog);
  } catch (error) {
    return res.status(500).json({ message: "Failed to get blog" });
  };
};

export async function updateBlog(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params as { id: string };
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ message: "Not found" });
    };

    if (blog.author.toString() !== req.userId) {
      return res.status(403).json({ message: "Forbidden" });
    };

    const { title, content } = req.body as {
      title: string,
      content: string
    };

    if (typeof title === "string") blog.title = title;
    if (typeof content === "string") blog.content = content;

    if (req.file) {
      blog.imageUrl = `/uploads/${req.file.filename}`;
    };

    await blog.save();

    return res.status(202).json(blog);
  } catch (error) {
    return res.status(500).json({ message: "Failed to update blog" });
  };
};

export async function deleteBlog(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params as { id: string };
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ message: "Not found" });
    };

    if (blog.author.toString() !== req.userId) {
      return res.status(403).json({ message: "Forbidden" });
    };

    // soft delete
    blog.isDeleted = true;
    blog.deletedAt = new Date();
    await blog.save();

    return res.status(204).json({ message: "Blog deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete blog" });
  }
};