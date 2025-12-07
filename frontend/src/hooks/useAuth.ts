import { useEffect, useState } from "react";
import { apiUrl } from "../utils/api";

interface User {
  id: string;
  email?: string;
  name?: string;
}

export default function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${apiUrl}/api/auth/me`, {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => {
        setUser(data.user);
        setIsValid(data.isValid);
      })
      .catch(() => {
        setIsValid(false);
      })
      .finally(() => {
        setLoading(false);
      })
  }, []);

  return { user, isValid, loading };
}