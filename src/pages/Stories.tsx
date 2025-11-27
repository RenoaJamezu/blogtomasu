import PostCard from "../components/PostCard";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface Post {
  id: number;
  title: string;
  content: string;
  author: { name: string };
  created_at: string;
}

function Stories() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/v1/posts");
        const data = await res.json();

        if (!res.ok) {
          toast.error(data.message || "Failed to fetch posts");
          return;
        }

        setPosts(data.data); 
      } catch (error) {
        console.error(error);
        toast.error("Failed to load posts.");
      }
    };

    fetchPosts();
  }, []);

  return (
    <section className="flex flex-col bg-white px-10 h-screen items-start pt-16">
      <Toaster />
      <h1 className="font-merriweather font-bold text-5xl">
        Latest Stories
      </h1>
      <p className="font-intertight text-lg text-black/50 mt-5">
        Explore our community's latest thoughts and ideas
      </p>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((item) => (
          <PostCard key={item.id} post={item} />
        ))}
      </div>
    </section>
  );
}

export default Stories;
