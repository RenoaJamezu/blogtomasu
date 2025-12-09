import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoutes = () => {
  const { isValid, loading } = useAuth();
  if (loading) return <div>Loading...</div>;

  return isValid ? <Outlet /> : <Navigate to='/login' />
}

export default ProtectedRoutes;