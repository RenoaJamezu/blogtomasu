// import { useState } from "react"
import Navbar from "../components/Navbar"
import { IoLocationOutline } from "react-icons/io5"
import { FaCalendarAlt } from "react-icons/fa"
// import { CiSettings } from "react-icons/ci"
import { useAuth } from "../hooks/useAuth"
import { useBlogs } from "../hooks/useBlogs";
import BlogCard from "../components/ui/blogCard";
import { useEffect, useState } from "react";

function Profile() {
  const { user } = useAuth();
  const { blogs, page, setPage, totalPages, loading, setAuthorId } = useBlogs();
  const [activeTab, setActiveTab] = useState("posts");

  // const [settings, setSettings] = useState(false);

  // const handleEditProfile = async () => {
  //   setSettings(!settings);
  //   console.log(settings);
  // };

  const formattedDate = new Date(user?.createdAt || "").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });


  useEffect(() => {
    console.log(user?._id)
    if (user?._id) {
      setAuthorId(user._id);
      setPage(1);
    }
    return () => {
      setAuthorId("");
    };
  }, [user?._id, setAuthorId, setPage]);

  const tabs = [
    { id: "posts", label: "My Posts" },
    { id: "saved", label: "Saved" },
    { id: "drafts", label: "Drafts" },
  ];

  return (
    <main className="h-screen">
      <Navbar />
      <section className="flex flex-col px-4 md:px-10 pt-14 md:pt-16">
        <div className="w-full flex mt-10 border border-black/50 rounded-lg p-4 md:p-10 gap-10">
          <div className="space-y-3 w-full">
            <div className="flex justify-between">
              <div>
                <h1 className="font-merriweather font-bold text-lg md:text-3xl">{user?.name}</h1>
                <h3 className="font-intertight md:text-lg">{user?.email}</h3>
              </div>
              {/* <button
                type="button"
                onClick={handleEditProfile}
                className="px-4 border border-black/50 flex items-center rounded-lg gap-3 text-intertight hover:bg-primary hover:text-white"
              >
                <CiSettings className="text-2xl" />
                Edit Profile
              </button> */}
            </div>
            <span className="font-intertight md:text-lg text-black/80">{user?.description || "This user is rather lazy to edit description"}</span>
            <div className="md:flex space-x-5 mt-2 text-black/80">
              <div className="flex items-center gap-1">
                <IoLocationOutline className="md:text-xl" />
                <span>{user?.location || "Edit Location"}</span>
              </div>
              <div className="flex items-center gap-1">
                <FaCalendarAlt className="md:text-xl" />
                <span>Joined {formattedDate}</span>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-4" />

        <div className="flex mb-4 justify-center md:justify-start">
          <div className="bg-gray-300/30 rounded-lg px-2 py-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 font-intertight font-medium transition-colors relative ${activeTab === tab.id
                  ? "text-black bg-white p-2 rounded-lg"
                  : "text-gray-500 hover:text-gray-700"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* tab content */}
        {activeTab === "posts" && (
          <>
            {/* all blogs */}
            <div className="pb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {loading ? (
                <>
                  {blogs.map(() => (
                    <div className="border border-black/50 rounded-lg p-4 bg-gray animate-pulse h-56 md:h-66">
                      <div className="h-10 md:h-12 bg-gray-300 rounded mt-4 w-5/6"></div>
                      <div className="h-4 md:h-4 bg-gray-300 rounded mt-2 w-1/2"></div>
                      <div className="h-24 md:h-32 bg-gray-300 rounded mt-2"></div>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {blogs.map((item) => (
                    <BlogCard key={item._id} blog={item} />
                  ))}
                </>
              )}
            </div>

            {/* pagination */}
            <div className="flex w-full justify-center">
              {totalPages > 1 && (
                <div className="flex items-center gap-4 mb-10">
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
          </>
        )}

        {activeTab === "saved" && (
          <div className="text-center py-10">
            <p className="text-gray-500 text-lg">Saved posts feature coming soon!</p>
          </div>
        )}

        {activeTab === "drafts" && (
          <div className="text-center py-10">
            <p className="text-gray-500 text-lg">Drafts feature coming soon!</p>
          </div>
        )}
      </section>
    </main>
  )
}

export default Profile