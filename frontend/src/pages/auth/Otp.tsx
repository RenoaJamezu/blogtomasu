import { useMemo, useState } from "react"
import toast from "react-hot-toast";
import { apiUrl } from "../../utils/api";
import { useLocation, useNavigate } from "react-router-dom";

function Otp() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const nav = useNavigate();

  const email = useMemo(() => {
    const fromState = (location.state as { email: string } | null)?.email;
    return fromState;
  }, [location.state]);

  const handleSubmitOtp = async () => {
    setLoading(true);

    if (!otp) {
      toast.error("Enter OTP");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${apiUrl}/api/auth/verify-otp`, {
        method: "POST",
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email,
          otp,
        }),
      });

      console.log(res);
      if (!res.ok) {
        toast.error("Verification failed");
        return;
      }

      toast.success("Verified successfully");
      nav("/");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  const handleResendOtp = async () => {

    try {
      const res = await fetch(`${apiUrl}/api/auth/resend-otp`, {
        method: "POST",
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email,
        }),
      });

      if (!res.ok) {
        toast.error("Resend verification failed");
        return;
      }

      toast.success("OTP sent! Check your email");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  return (
    <main className="flex items-center justify-center h-screen bg-secondary/10">
      <div className="border border-neutral-500/50 p-4 md:p-10 rounded-lg w-11/12 md:w-1/3 bg-white shadow flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <h1 className="text-lg md:text-2xl font-merriweather">Verify your account</h1>
          </div>
        </div>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="font-intertight text-xs md:text-sm border border-neutral-500/50 p-3 rounded-lg"
          placeholder="Enter your otp"
        />
        <span className="text-xs font-intertight font-medium">
          Didn't receive any otp?
          <a
            onClick={handleResendOtp}
            className="text-xs font-intertight text-primary font-medium"
          >
            resend otp
          </a>
        </span>
        <button
          type="submit"
          onClick={handleSubmitOtp}
          className="w-full items-center bg-primary p-3 rounded-lg mt-2 font-bold font-intertight text-xs md:text-sm text-white hover:bg-primary/90"
        >
          {loading ? 'Verifying...' : 'Verify'}
        </button>
      </div>
    </main>
  )
}

export default Otp