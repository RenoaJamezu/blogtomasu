import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { lazy, Suspense } from "react"
import { Toaster } from "react-hot-toast"

import ProtectedRoutes from "./utils/ProtectedRoutes"
import Authenticated from "./utils/Authenticated"

// Lazy load route components
const Index = lazy(() => import("./pages/Index"))
const Login = lazy(() => import("./pages/auth/Login"))
const Signup = lazy(() => import("./pages/auth/Signup"))
const Otp = lazy(() => import("./pages/auth/Otp"))
const Profile = lazy(() => import("./pages/Profile"))
const Stories = lazy(() => import("./pages/Stories"))
const CreateBlog = lazy(() => import("./pages/CreatePost"))
const BlogPost = lazy(() => import("./pages/BlogPost"))
const EditPost = lazy(() => import("./pages/EditPost"))
const AllBlogs = lazy(() => import("./pages/AllBlogs"))

// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
  </div>
)

function App() {
  return (
    <>
      <Toaster />
      <Router>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/blogs/:id" element={<BlogPost />} />
            <Route path="/blogs" element={<AllBlogs />} />

            {/* authenticated */}
            <Route element={<Authenticated />} >
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/otp" element={<Otp />} />
            </Route>

            {/* protected routes */}
            <Route element={<ProtectedRoutes />} >
              <Route path="/create" element={<CreateBlog />} />
              <Route path="/blogs/:id/edit" element={<EditPost />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/stories" element={<Stories />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </>
  )
}

export default App