import { FaUser, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

interface PostCardProps {
  id: number;
  title: string;
  content: string;
  author: { name: string };
  created_at: string;
}

function PostCard({ post }: { post: PostCardProps}) {
  const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <Link to={`/posts/${post.id}`} className="block">
      <article className="bg-white rounded-2xl border border-black/50 p-5 shadow-sm overflow-hidden hover:shadow-md transition">
        <h2 className="text-2xl font-merriweather font-bold mb-2 line-clamp-2">{post.title}</h2>
        <div className="flex items-center text-sm text-gray-500 mb-3 space-x-5">
          <span className="flex items-center gap-1 text-sm font-intertight">
            <FaUser />
            {post.author.name}
          </span>
          <span className="flex items-center gap-1 text-sm font-intertight">
            <FaCalendarAlt />
            {formattedDate}
          </span>
        </div>
        <div
          className="text-gray-700 line-clamp-4 mt-5 font-intertight text-lg"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </Link>
  );
}

export default PostCard;