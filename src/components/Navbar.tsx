import { Link } from "react-router-dom"
import logo from "../assets/logo.png"
import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { FaUserCircle } from "react-icons/fa";

function Navbar() {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const [scrolled, setScrolled] = useState(false);
  const [profile, setProfile] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", onScroll)
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    try {
      const res = await fetch('/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        }
      });

      const json = await res.json();

      if (!res.ok) {
        toast.error(json.message);
        return;
      }

      toast.success('Logout successfully');

      localStorage.removeItem('user');

      window.location.href = '/';
    } catch (error) {
      console.log(error);
    }
  }

  const handleProfile = async () => {
    setProfile(!profile);
    console.log(profile);
  }

  return (
    <header className={`fixed top-0 w-full h-16 z-50 transition-colors px-10 flex justify-between bg-white border-b border-black/30 ${scrolled
      ? "backdrop-blur-xs bg-white/50"
      : "bg-transparent"
      }`}>
      <Link to='/' className="flex items-center">
        <img
          src={logo}
          alt="logo"
          className="h-12 w-12"
        />
        <h1 className="font-merriweather text-2xl font-semibold text-primary">Blog<span className="text-secondary">Tomasu</span></h1>
      </Link>

      <nav className="flex items-center gap-5">
        <Link to='/' className="font-intertight text-black/50 font-bold text-sm">
          Home
        </Link>
        <Link to='/create' className="font-intertight text-black/50 font-bold text-sm">
          Write
        </Link>
        {!user ? (
          <div className="flex items-center gap-5">
            <Link to='/login' className="font-intertight text-black/50 font-bold text-sm">
              Login
            </Link>
            <Link to='/signup' className="font-intertight text-white font-bold text-sm bg-primary px-4 py-3 rounded-lg hover:bg-primary/90">
              Get Started
            </Link>
          </div>
        ) : (
          <div className="flex items-center">
            <button
              type="button"
              onClick={handleProfile}
            >
              <FaUserCircle className="text-3xl text-primary hover:text-primary/80" />
            </button>
          </div>
        )}
        {profile && (
          <div className="absolute right-10 top-14 w-40 bg-white shadow-lg rounded-lg border py-2 animate-fadeIn">
            <Link
              to="/profile"
              className="block px-4 py-2 font-intertight text-sm text-black/80 hover:bg-gray-100"
            >
              Profile
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="w-full text-left block px-4 py-2 font-intertight text-sm text-red-500 hover:bg-red-50"
            >
              Logout
            </button>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Navbar