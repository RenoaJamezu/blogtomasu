import { useContext } from "react";
import { BlogContext } from "../contexts/BlogContext";

export function useBlogs() {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("useBlogs must be used within an BlogProvider");
  };
  return context;
}