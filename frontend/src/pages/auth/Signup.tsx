import { useState } from "react";
import toast from "react-hot-toast";
import { FaAngleLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { apiUrl } from "../../utils/api";

function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const nav = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!name || !email || !password || !confirm) {
      toast.error('Please complete all fields');
      setLoading(false);
      return;
    }
    if (password !== confirm) {
      toast.error('Password do not match');
      setLoading(false);
      return;
    }
    if (password.length < 8) {
      toast.error('Password should be at least 8 characters');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${apiUrl}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          password_confirmation: confirm,
        }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        toast.error(data.message);
        setLoading(false);
        return;
      }

      toast.success('Account created')

      // store information to local storage
      localStorage.setItem('user', JSON.stringify(data))
      
      nav('/');
    } catch (error) {
      console.log(error);
      setLoading(false);
    }

  }

  return (
    <main className="flex items-center justify-center h-screen bg-secondary/10">
      <div className="border border-neutral-500/50 p-4 md:p-10 rounded-lg w-11/12 md:w-1/3 bg-white shadow">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <h1 className="text-lg md:text-2xl font-merriweather">Welcome to <span className="text-primary font-bold">Blog</span><span className="text-secondary font-bold">Tomasu</span></h1>
          </div>
          <Link to='/' className="text-lg md:text-2xl p-1 text-primary hover:text-primary/90">
            <FaAngleLeft />
          </Link>
        </div>
        <p className="font-intertight text-xs md:text-sm text-gray-500">Sign in to post a blog</p>

        <form
          onSubmit={handleSubmit}
          className="mt-3 space-y-2"
        >
          <div className="flex flex-col">
            <label className="font-intertight text-xs md:text-sm">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="font-intertight text-xs md:text-sm border border-neutral-500/50 p-3 rounded-lg"
              placeholder="name"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-intertight text-xs md:text-sm">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="font-intertight text-xs md:text-sm border border-neutral-500/50 p-3 rounded-lg"
              placeholder="youremail@blogtomasu.com"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-intertight text-xs md:text-sm">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="font-intertight text-xs md:text-sm border border-neutral-500/50 p-3 rounded-lg"
              placeholder="password"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-intertight text-xs md:text-sm">Confirm Password</label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="font-intertight text-xs md:text-sm border border-neutral-500/50 p-3 rounded-lg"
              placeholder="confirm password"
            />
          </div>

          <button
            type="submit"
            className="w-full items-center bg-primary p-3 rounded-lg mt-2 font-bold font-intertight text-xs md:text-sm text-white hover:bg-primary/90"
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>

          <p className="font-intertight text-xs md:text-sm text-gray-500">
            Already have an account?
            <Link to='/login' className="text-primary font-bold hover:text-primary/90">
              Sign in.
            </Link>
          </p>
        </form>
      </div>
    </main>
  )
}

export default Signup