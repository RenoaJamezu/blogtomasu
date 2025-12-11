import { FaUser, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

interface BlogCardProps {
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

function BlogCard({ blog }: { blog: BlogCardProps}) {
  const formattedDate = new Date(blog.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <Link to={`/blogs/${blog._id}`} className="block">
      <article className="bg-white rounded-lg border border-black/50 p-5 shadow-sm overflow-hidden hover:shadow-md hover:scale-105 transition h-56 md:h-66">
        <h2 className="text-lg md:text-2xl font-merriweather font-bold mb-2 line-clamp-2">{blog.title}</h2>
        <div className="flex items-center text-gray-500 mb-3 space-x-5">
          <span className="flex items-center gap-1 text-xs md:text-sm font-intertight">
            <FaUser />
            {blog.author.name}
          </span>
          <span className="flex items-center gap-1 text-xs md:text-sm font-intertight">
            <FaCalendarAlt />
            {formattedDate}
          </span>
        </div>
        <div
          className="text-gray-700 line-clamp-4 mt-5 font-intertight text-sm md:text-lg"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </article>
    </Link>
  );
}

export default BlogCard;