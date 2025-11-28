import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  return user ? <Outlet /> : <Navigate to='/login' />
}

export default ProtectedRoutes;
