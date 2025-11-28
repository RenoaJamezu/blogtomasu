import { Outlet, Navigate } from "react-router-dom";

const Authenticated = () => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  return user ? <Navigate to='/' /> : <Outlet />
}

export default Authenticated;