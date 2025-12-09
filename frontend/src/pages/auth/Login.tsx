import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa";
import toast from "react-hot-toast";
import { apiUrl } from "../../utils/api";
import { useAuth } from "../../hooks/useAuth";

function Login() {
  const { refreshAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      toast.error("Please fill in both fields.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 403) nav("/otp", { state: { email } });
        toast.error(data.message);
        setLoading(false);
        return;
      }

      toast.success("Logged in");
      await refreshAuth();
      nav("/");
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }

  return (
    <main className="flex items-center justify-center h-screen bg-secondary/10">
      <div className="border border-neutral-500/50 p-4 md:p-10 rounded-lg w-11/12 md:w-1/3 bg-white shadow">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <h1 className="text-lg md:text-2xl font-merriweather">Welcome to <span className="text-primary font-bold">Blog</span><span className="text-secondary font-bold">Tomasu</span></h1>
          </div>
          <Link to="/" className="text-lg md:text-2xl p-1 text-primary hover:text-primary/90">
            <FaAngleLeft />
          </Link>
        </div>
        <p className="font-intertight text-xs md:text-sm text-gray-500">Sign in to post a blog</p>

        <form
          onSubmit={handleSubmit}
          className="mt-3 space-y-2"
        >
          <div className="flex flex-col gap-1">
            <label className="font-intertight text-xs md:text-sm">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="font-intertight text-xs md:text-sm border border-neutral-500/50 p-3 rounded-lg"
              placeholder="youremail@blogtomasu.com"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-intertight text-xs md:text-sm">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="font-intertight text-xs md:text-sm border border-neutral-500/50 p-3 rounded-lg"
              placeholder="password"
            />
          </div>

          <button
            type="submit"
            className="w-full items-center bg-primary p-3 rounded-lg mt-2 font-bold font-intertight text-xs md:text-sm text-white hover:bg-primary/90"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

          <p className="font-intertight text-xs md:text-sm text-gray-500">
            Dont have an account?
            <Link to="/signup" className="text-primary font-bold hover:text-primary/90">
              Sign up.
            </Link>
          </p>
        </form>
        <div className="mt-2">
          <div className="text-xs text-primary/50 text-center">Demo credentials</div>
          <div className="text-xs text-primary/60 text-center">email: demo@blogtomasu.com | password: password</div>
        </div>
      </div>
    </main>
  )
}

export default Login