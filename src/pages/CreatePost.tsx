import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import TipTapEditor from '../components/TipTapEditor';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(title);
    console.log(content);
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
            <h1 className="font-bold font-merriweather text-4xl">Create a New Post</h1>
            <p className="font-intertight text-lg text-black/50">Share your thoughts in the world</p>
          </div>

          <div>
            <label className="font-intertight text-lg">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="font-intertight text-sm border border-neutral-500/50 p-3 rounded-lg w-full"
              placeholder="Enter your post title..."
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
              {loading ? 'Posting...' : 'Publish post'}
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

export default CreatePost