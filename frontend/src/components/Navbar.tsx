import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useEffect, useState } from "react";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import ConfirmModal from "./ui/confirmModal";
import { useAuth } from "../hooks/useAuth";

function Navbar() {
  const { isValid, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setShowLogoutModal(false)
      closeMenu();
      nav("/");
    } finally {
      setLogoutLoading(false)
    }
  }

  const handleProfile = () => {
    setProfileOpen((prev) => !prev);
  }

  const closeMenu = () => {
    setMenuOpen(false);
    setProfileOpen(false);
  }

  return (
    <header className={`fixed top-0 w-full h-14 md:h-16 z-50 transition-colors px-4 md:px-10 flex items-center justify-between bg-white border-b border-black/30 ${scrolled
      ? "backdrop-blur-xs bg-white/50"
      : "bg-transparent"
      }`}>
      <Link
        to="/"
        className="flex items-center"
        onClick={closeMenu}
      >
        <img
          src={logo}
          alt="logo"
          className="h-8 w-8 md:h-12 md:w-12"
        />
        <h1 className="font-merriweather text-lg md:text-2xl font-semibold text-primary">Blog<span className="text-secondary">Tomasu</span></h1>
      </Link>

      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-5">
        <Link to="/" className="font-intertight text-black/50 font-bold text-sm">
          Home
        </Link>
        <Link to="/create" className="font-intertight text-black/50 font-bold text-sm">
          Write
        </Link>
        <Link to="/blogs" className="font-intertight text-black/50 font-bold text-sm">
          Blogs
        </Link>
        {isValid ? (
          <div className="flex items-center">
            <button
              type="button"
              onClick={handleProfile}
            >
              <FaUserCircle className="text-3xl text-primary hover:text-primary/80" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-5">
            <Link to="/login" className="font-intertight text-black/50 font-bold text-sm">
              Login
            </Link>
            <Link to="/signup" className="font-intertight text-white font-bold text-sm bg-primary px-4 py-3 rounded-lg hover:bg-primary/90">
              Get Started
            </Link>
          </div>
        )}
        {profileOpen && (
          <div className="absolute right-10 top-14 w-40 bg-white shadow-lg rounded-lg border py-2 animate-fadeIn">
            <Link
              to="/profile"
              className="block px-4 py-2 font-intertight text-sm text-black/80 hover:bg-gray-100"
            >
              Profile
            </Link>

            <button
              type="button"
              onClick={() => setShowLogoutModal(true)}
              className="w-full text-left block px-4 py-2 font-intertight text-sm text-red-500 hover:bg-red-50"
            >
              Logout
            </button>
          </div>
        )}
      </nav>

      {/* Mobile nav */}
      <button
        type="button"
        className="md:hidden p-2 rounded-lg text-primary hover:bg-primary/10"
        aria-label="Toggle navigation menu"
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        {menuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
      </button>

      {/* Mobile sheet */}
      {menuOpen && (
        <div className="absolute left-0 top-14 w-full bg-white border-b shadow-md md:hidden animate-fadeIn">
          <nav className="flex flex-col gap-3 px-4 py-4 font-intertight text-black/70 font-bold">
            <Link to="/" onClick={closeMenu}>
              Home
            </Link>
            <Link to="/create" onClick={closeMenu}>
              Write
            </Link>
            <Link to="/blogs" onClick={closeMenu}>
              Blogs
            </Link>
            {isValid ? (
              <>
                <Link to="/profile" onClick={closeMenu}>
                  Profile
                </Link>
                <button
                  type="button"
                  className="text-red-500 text-left"
                  onClick={() => setShowLogoutModal(true)}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={closeMenu}>
                  Login
                </Link>
                <Link to="/signup" className="text-white bg-primary py-2 rounded-lg text-center hover:primary/90" onClick={closeMenu}>
                  Get Started
                </Link>
              </>
            )}
          </nav>
        </div>
      )}

      <ConfirmModal
        isOpen={showLogoutModal}
        title="Logout"
        message="Are you sure you want to logout?"
        confirmText="Logout"
        cancelText="Cancel"
        isDangerous={true}
        isLoading={logoutLoading}
        onConfirm={handleLogout}
        onCancel={() => setShowLogoutModal(false)}
      />
    </header >
  )
}

export default Navbar