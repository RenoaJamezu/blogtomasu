import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import TipTapEditor from "../components/TipTapEditor";
import { apiUrl } from "../utils/api";
import ConfirmModal from "../components/ui/confirmModal";

function EditPost() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [originalTitle, setOriginalTitle] = useState("");
  const [originalContent, setOriginalContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
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

        setTitle(data.title);
        setContent(data.content);
        setOriginalTitle(data.title);
        setOriginalContent(data.content);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load blog");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!user) {
      toast.error("Login first");
      setLoading(false);
      return;
    }

    if (!title || !content) {
      toast.error("Please fill all the information");
      setLoading(false);
      return;
    }

    if (originalTitle === title && originalContent === content) {
      toast.error("No changes detected");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${apiUrl}/api/blogs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer${user.token}`,
        },
        body: JSON.stringify({
          title,
          content,
        })
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Try Again");
        setLoading(false);
        return
      };

      toast.success("Blog updated!");

      nav(`/blogs/${id}`);
    } catch (error) {
      console.log(error);
      setLoading(false);
    };

    setLoading(false);
  };

  const handleCancel = () => {
    if (originalTitle === title && originalContent === content) {
      setShowCancelModal(true);
    };
    nav(`/blogs/${id}`);
  };

  const confirmCancel = () => {
    setShowCancelModal(false);
    nav(`/blogs/${id}`);
  };

  return (
    <main>
      <Navbar />
      <section className="flex px-4 md:px-10 items-center pt-16 justify-center">
        <form
          onSubmit={handleSubmit}
          className="border border-neutral-500 rounded-lg p-5 w-full md:w-1/2 space-y-5 my-16"
        >
          <div>
            <h1 className="font-bold font-merriweather text-xl md:text-4xl">Create a New Blog</h1>
            <p className="font-intertight text-sm md:text-lg text-black/50">Share your thoughts in the world</p>
          </div>

          <div>
            <label className="font-intertight text-sm md:text-lg">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="font-intertight text-sm border border-neutral-500/50 p-3 rounded-lg w-full"
              placeholder="Enter your blog title..."
            />
          </div>

          <div>
            <label className="font-intertight text-sm md:text-lg">Content</label>
            <TipTapEditor content={content} setContent={setContent} />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="items-center bg-primary py-3 px-5 rounded-lg mt-2 font-bold font-intertight text-sm text-white hover:bg-primary/90"
            >
              {loading ? "Updating..." : "Update blog"}
            </button>
            <button
              type="button"
              className="items-center py-3 px-5 rounded-lg mt-2 font-bold font-intertight text-sm border border-black/30 hover:bg-gray-200"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </section>

      <ConfirmModal 
        isOpen={showCancelModal}
        title="Cancel"
        message="Are you sure you want to cancel?"
        isDangerous={true}
        onConfirm={confirmCancel}
        onCancel={() => setShowCancelModal(false)}
      />
    </main>
  )
}

export default EditPost