import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import TipTapEditor from '../components/TipTapEditor';
import toast from 'react-hot-toast';

function CreateBlog() {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!user) {
      toast.error('Login first');
      setLoading(false);
      return;
    }

    if (!title || !content) {
      toast.error('Please fill all the information');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer${user.token}`,
        },
        body: JSON.stringify({
          title,
          content,
        })
      })
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || 'Try Again')
        setLoading(false);
        return
      }

      toast.success('Blog posted!');

      nav('/');
    } catch (error) {
      console.log(error);
      setLoading(false);
    }

    setLoading(false);
  }

  return (
    <main>
      <Navbar />
      <section className="flex px-10 items-center pt-16 justify-center">
        <form
          onSubmit={handleSubmit}
          className="border border-neutral-500 rounded-lg p-5 w-1/2 space-y-5 my-16"
        >
          <div>
            <h1 className="font-bold font-merriweather text-4xl">Create a New Blog</h1>
            <p className="font-intertight text-lg text-black/50">Share your thoughts in the world</p>
          </div>

          <div>
            <label className="font-intertight text-lg">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="font-intertight text-sm border border-neutral-500/50 p-3 rounded-lg w-full"
              placeholder="Enter your blog title..."
            />
          </div>

          <div>
            <label className="font-intertight text-lg">Content</label>
            <TipTapEditor content={content} setContent={setContent} />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="items-center bg-primary py-3 px-5 rounded-lg mt-2 font-bold font-intertight text-sm text-white hover:bg-primary/90"
            >
              {loading ? 'Bloging...' : 'Publish blog'}
            </button>
            <Link to='/' className="items-center py-3 px-5 rounded-lg mt-2 font-bold font-intertight text-sm border border-black/30 hover:bg-gray-200">
              Cancel
            </Link>
          </div>

        </form>
      </section>
    </main>
  )
}

export default CreateBlog