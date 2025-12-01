import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import { FaCalendarAlt, FaUser } from "react-icons/fa";

interface Post {
  id: number;
  title: string;
  content: string;
  author: { name: string, email: string };
  created_at: string;
}

function BlogPost() {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    if (!id) return;
    const fetchPost = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/v1/posts/${id}`);
        const data = await res.json();
        console.log(data);
        if (!res.ok) {
          toast.error(data?.message || "Failed to load post");
          setLoading(false);
          return;
        }
        const fetched = data?.data ?? data;

        setPost(fetched);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load post.");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const isOwner = Boolean(user.user.email === post?.author.email);

  const handleEdit = async () => {

  }

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/v1/posts/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
      })

      if (!res.ok) {
        return;
      }

      nav('/');
    } catch (err) {
      console.log(err);
    }
  }

  if (loading) return (
    <main className="h-screen">
      <Navbar />
      <div className="pt-16 px-10">Loading...</div>
    </main>
  );

  if (!post) return (
    <main className="h-screen">
      <Navbar />
      <div className="pt-16 px-10">Post not found.</div>
    </main>
  );

  const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  });

  return (
    <main className="min-h-screen w-full flex justify-center">
      <Navbar />
      <section className="py-16 w-2/4">
        <article className="w-full items-center mt-10">
          <h1 className="font-merriweather text-4xl font-bold mb-3">{post.title}</h1>
          <div className="text-sm text-gray-500 mb-6 flex font-intertight items-center justify-between">
            <div className="flex">
              <span className="mr-4 flex items-center gap-1"><FaUser />{post.author.name}</span>
              <span className="flex items-center gap-1"><FaCalendarAlt />{formattedDate}</span>
            </div>

            {/* if owner show edit button */}
            {isOwner && (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleEdit}
                  className="px-3 py-1 border text-black/80 rounded hover:bg-gray-500/20"
                >
                  Edit post
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-500/80"
                >
                  Delete post
                </button>
              </div>
            )}
          </div>
          <hr className="text-black/50" /><br />
          <div className="prose tiptap-content max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
      </section>
    </main>
  );
}

export default BlogPost;