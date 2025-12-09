import { useEffect, useMemo, useState } from "react"
import toast from "react-hot-toast";
import { apiUrl } from "../../utils/api";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function Otp() {
  const { refreshAuth } =useAuth();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [resending, setResending] = useState(false);
  const location = useLocation();
  const nav = useNavigate();

  const email = useMemo(() => {
    const fromState = (location.state as { email: string } | null)?.email;
    return fromState;
  }, [location.state]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

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
        setLoading(false);
        return;
      }

      toast.success("Verified successfully");
      await refreshAuth();
      nav("/");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  const handleResendOtp = async () => {
    if (countdown > 0) return;

    setResending(true);
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
        setResending(false);
        return;
      }

      toast.success("OTP sent! Check your email");
      setCountdown(60);
    } catch (error) {
      console.log(error);
      toast.error("Failed to resend OTP");
    }
    setResending(false);
  }

  return (
    <main className="flex items-center justify-center h-screen bg-secondary/10">
      <div className="border border-neutral-500/50 p-4 md:p-10 rounded-lg w-11/12 md:w-1/3 bg-white shadow flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <h1 className="text-lg md:text-2xl font-merriweather">Verify your account</h1>
            <p className="text-xs md:text-sm text-gray-500 font-intertight mt-1">
              Enter the code sent to {email}
            </p>
          </div>
        </div>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="font-intertight text-xs md:text-sm border border-neutral-500/50 p-3 rounded-lg"
          placeholder="Enter your otp"
          maxLength={6}
        />
        
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs md:text-sm font-intertight text-gray-600">
            Didn't receive the code?
          </span>
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={countdown > 0 || resending}
            className={`text-xs md:text-sm font-intertight font-semibold transition-all ${
              countdown > 0 || resending
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-primary hover:text-primary/80 hover:underline cursor-pointer'
            }`}
          >
            {resending ? 'Sending...' : countdown > 0 ? `Resend in ${countdown}s` : 'Resend OTP'}
          </button>
        </div>

        {countdown > 0 && (
          <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
            <div 
              className="bg-primary h-1 transition-all duration-1000 ease-linear"
              style={{ width: `${(countdown / 60) * 100}%` }}
            />
          </div>
        )}

        <button
          type="submit"
          onClick={handleSubmitOtp}
          disabled={loading || !otp}
          className="w-full items-center bg-primary p-3 rounded-lg mt-2 font-bold font-intertight text-xs md:text-sm text-white hover:bg-primary/90 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all"
        >
          {loading ? 'Verifying...' : 'Verify'}
        </button>
      </div>
    </main>
  )
}

export default Otp