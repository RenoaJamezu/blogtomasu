import { Link } from "react-router-dom"
import logo from "../../public/images/logo.png"
import { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast";

function Navbar() {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <header className={`fixed top-0 w-full h-24 transition-colors px-10 flex justify-between bg-white ${scrolled
        ? "backdrop-blur-xs bg-white/50 border-b border-neutral-500/50"
        : "bg-transparent border-transparent"
      }`}>
      <Toaster />
      <Link to='/' className="flex items-center">
        <img
          src={logo}
          alt="logo"
          className="h-12 w-12"
        />
        <h1 className="font-merriweather text-2xl font-semibold text-primary">Blog<span className="text-secondary">Tomasu</span></h1>
      </Link>

      <nav className="flex items-center gap-5">
        <Link to='/' className="font-intertight text-gray-500 font-bold text-sm">
          Home
        </Link>
        <Link to='/create' className="font-intertight text-gray-500 font-bold text-sm">
          Write
        </Link>
        {!user ? (
          <div className="flex items-center gap-5">
            <Link to='/login' className="font-intertight text-gray-500 font-bold text-sm">
              Login
            </Link>
            <Link to='/signup' className="font-intertight text-white font-bold text-sm bg-primary px-4 py-3 rounded-lg hover:bg-primary/90">
              Get Started
            </Link>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleLogout}
            className="font-intertight text-white font-bold text-sm bg-primary px-4 py-3 rounded-lg hover:bg-primary/90"
          >
            Logout
          </button>
        )}
      </nav>
    </header>
  )
}

export default Navbar