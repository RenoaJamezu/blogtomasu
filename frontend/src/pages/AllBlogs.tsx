import Navbar from '../components/Navbar'
import { useBlogs } from '../hooks/useBlogs'
import BlogCard from '../components/ui/blogCard';
import { useEffect } from 'react';

function AllBlogs() {
  const { blogs, page, setPage, totalPages } = useBlogs();

  useEffect(() => {
    setPage(1);
  }, [setPage]);

  return (
    <main>
      <Navbar />
      <section className="flex flex-col bg-white px-4 md:px-10 min-h-screen items-start py-12 md:py-24">
        <h1 className="font-merriweather font-bold text-3xl md:text-5xl">
          All Stories
        </h1>
        <span className="font-intertight text-sm md:text-lg text-black/50 mt-5">
          Explore our community's latest thoughts and ideas
        </span>

        {/* all blogs */}
        <div className="py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((item) => (
            <BlogCard key={item._id} blog={item} />
          ))}
        </div>

        {/* pagination */}
        <div className="flex w-full justify-center">
          {totalPages > 1 && (
            <div className="flex items-center gap-4 mt-10">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page <= 1}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Prev
              </button>

              <span>Page {page} of {totalPages}</span>

              <button
                onClick={() => setPage(page + 1)}
                disabled={page >= totalPages}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

export default AllBlogs