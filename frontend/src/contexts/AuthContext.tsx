import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { apiUrl } from "../utils/api";

interface User {
  id: string;
  email: string;
  name: string;
};

interface AuthContextType {
  user: User | null;
  isValid: boolean | null;
  loading: boolean;
  refreshAuth: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshAuth = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${apiUrl}/api/auth/me`, {
        credentials: "include"
      })
      if (!res.ok) {
        setUser(null);
        setIsValid(false);
        return;
      }

      const data = await res.json();
      setUser(data.user);
      setIsValid(data.isValid);
    } catch (error) {
      console.log(error);
      setUser(null);
      setIsValid(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshAuth();
  }, [refreshAuth]);

  const logout = useCallback(async () => {
    try {
      await fetch(`${apiUrl}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      setUser(null);
      setIsValid(false);
    }
  }, []);

  const value = useMemo(
    () => ({ user, isValid, loading, refreshAuth, logout }),
    [user, isValid, loading, refreshAuth, logout]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
};

export { AuthContext };