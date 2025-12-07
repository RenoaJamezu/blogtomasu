import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import { FaCalendarAlt, FaUser } from "react-icons/fa";
import ConfirmModal from "../components/ui/confirmModal";
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

function BlogPost() {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog>();
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    if (!id) return;
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${apiUrl}/api/blogs/${id}`);
        const data = await res.json();
        if (!res.ok) {
          toast.error(data?.message || "Failed to load blog");
          setLoading(false);
          return;
        }

        setBlog(data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load blog.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  const isOwner = Boolean(user?.user?.email === blog?.author.email);

  const handleEdit = async () => {
    nav(`/blogs/${id}/edit`);
  }

  const handleDelete = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/blogs/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer${user.token}`,
        },
      })

      if (!res.ok) {
        toast.error("Failed to delete blog");
        return;
      }

      toast.success("Blog deleted");
      setShowDeleteModal(false);
      nav('/');
    } catch (error) {
      console.log(error);
      toast.error("Error deleting blog");
    }
  }

  if (loading) return (
    <main className="h-screen">
      <Navbar />
      <div className="pt-16 px-10">Loading...</div>
    </main>
  );

  if (!blog) return (
    <main className="h-screen">
      <Navbar />
      <div className="pt-16 px-10">Blog not found.</div>
    </main>
  );

  const formattedDate = new Date(blog.createdAt).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  });

  return (
    <main className="min-h-screen w-full flex justify-center">
      <Navbar />
      <section className="py-16 px-4 md:w-2/4">
        <article className="w-full items-center mt-10">
          <h1 className="font-merriweather text-xl md:text-4xl font-bold mb-3">{blog.title}</h1>
          <div className="text-xs md:text-sm text-gray-500 mb-6 md:flex font-intertight items-center justify-between space-y-4">
            <div className="flex">
              <span className="mr-4 flex items-center gap-1"><FaUser />{blog.author.name}</span>
              <span className="flex items-center gap-1"><FaCalendarAlt />{formattedDate}</span>
            </div>

            {/* if owner show edit and delete button */}
            {isOwner && (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleEdit}
                  className="px-3 py-2 border text-black/80 rounded hover:bg-gray-500/20"
                >
                  Edit blog
                </button>
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(true)}
                  className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-500/80"
                >
                  Delete blog
                </button>
              </div>
            )}
          </div>
          <hr className="text-black/50" /><br />
          <div className="prose tiptap-content max-w-none" dangerouslySetInnerHTML={{ __html: blog.content }} />
        </article>
      </section>

      <ConfirmModal
        isOpen={showDeleteModal}
        title="Delete Blog"
        message="Are you sure you want to delete this blog?"
        confirmText="Delete"
        cancelText="Cancel"
        isDangerous={true}
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </main>
  );
}

export default BlogPost;