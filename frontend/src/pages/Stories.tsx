import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import BlogCard from "../components/ui/blogCard";
import { apiUrl } from "../utils/api";

interface Blog {
  _id: string;
  title: string;
  content: string;
  author: {
    name: string,
    email: string,
  };
  createdAt: string;
  updatedAt: string;
}

function Stories() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${apiUrl}/api/blogs`);
        const data = await res.json();

        if (!res.ok) {
          toast.error(data.message || "Failed to fetch blogs");
          return;
        }
        setLoading(false);
        setBlogs(data.blogs);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load blogs.");
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <section className="flex flex-col bg-white px-10 h-screen items-start py-24">
        <h1 className="font-merriweather font-bold text-5xl">
          Latest Stories
        </h1>
        <span className="font-intertight text-lg text-black/50 mt-5">
          Explore our community's latest thoughts and ideas
        </span>
        <span className="font-intertight text-lg text-black/50 mt-5">
          Loading!!!
        </span>
      </section>
    )
  }

  return (
    <section className="flex flex-col bg-white px-10 h-screen items-start py-24">
      <h1 className="font-merriweather font-bold text-5xl">
        Latest Stories
      </h1>
      <span className="font-intertight text-lg text-black/50 mt-5">
        Explore our community's latest thoughts and ideas
      </span>
      {loading ? (
        <span className="font-intertight text-lg text-black/50 mt-5">
          Loading...
        </span>
      ) : (
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((item) => (
            <BlogCard key={item._id} blog={item} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Stories;
