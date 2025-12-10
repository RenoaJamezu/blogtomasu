import BlogCard from "../components/ui/blogCard";
import { useBlogs } from "../hooks/useBlogs";

function Stories() {
  const { blogs, loading } = useBlogs();

  const limitedBlogs = blogs.slice(0, 3);

  return (
    <section className="flex flex-col bg-white px-4 md:px-10 h-screen items-start py-12 md:py-24">
        <h1 className="font-merriweather font-bold text-3xl md:text-5xl">
          Latest Stories
        </h1>
        <span className="font-intertight text-sm md:text-lg text-black/50 mt-5">
          Explore our community's latest thoughts and ideas
        </span>
        {loading ? (
          <span className="font-intertight text-sm md:text-lg text-black/50 mt-5">
            Loading...
          </span>
        ) : (
        <div className="py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {limitedBlogs.map((item) => (
              <BlogCard key={item._id} blog={item} />
            ))}
          </div>
        )}
      </section>
  );
}

export default Stories;
