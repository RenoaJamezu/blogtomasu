import { useState } from 'react'
import Navbar from '../components/Navbar'
import { IoLocationOutline } from 'react-icons/io5'
import { FaCalendarAlt } from 'react-icons/fa'
import { CiSettings } from 'react-icons/ci'
import { useAuth } from '../hooks/useAuth'

function Profile() {
  const { user } = useAuth();
  const [settings, setSettings] = useState(false);

  const handleEditProfile = async () => {
    setSettings(!settings);
    console.log(settings);
  }

  return (
    <main className="h-screen">
      <Navbar />
      <section className="flex px-10 pt-16">
        <div className="w-full flex mt-10 border border-black/50 rounded-lg p-10 gap-10">
          <div className="space-y-3 w-full">
            <div className="flex justify-between">
              <div>
                <h1 className="font-merriweather font-bold text-2xl">{user?.name}</h1>
                <h3 className="font-intertight text-lg">{user?.email}</h3>
              </div>
              <button
                type="button"
                onClick={handleEditProfile}
                className="px-4 border border-black/50 flex items-center rounded-lg gap-3 text-intertight hover:bg-primary hover:text-white"
              >
                <CiSettings className="text-2xl" />
                Edit Profile
              </button>
            </div>
            <span className="font-intertight text-lg text-black/80">Writer, developer, and coffee enthusiast. Sharing thoughts on technology and life.</span>
            <div className="flex space-x-5 mt-2 text-black/80">
              <div className="flex items-center gap-1">
                <IoLocationOutline className="text-xl" />
                <span>San Francisco, CA</span>
              </div>
              <div className="flex items-center gap-1">
                <FaCalendarAlt className="text-xl" />
                <span>Joined January 2024</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Profile