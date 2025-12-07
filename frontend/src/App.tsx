import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Index from './pages/Index'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import { Toaster } from 'react-hot-toast'
import ProtectedRoutes from './utils/ProtectedRoutes'
import Profile from './pages/Profile'
import Authenticated from './utils/Authenticated'
import Stories from './pages/Stories'
import CreateBlog from './pages/CreatePost'
import BlogPost from './pages/BlogPost'
import EditPost from './pages/EditPost'
import Otp from './pages/auth/Otp'

function App() {

  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          {/* public routes */}
          <Route path='/' element={<Index />} />
          <Route path='/blogs/:id' element={<BlogPost />} />

          {/* authenticated */}
          <Route element={<Authenticated />} >
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/otp' element={<Otp />} />
          </Route>

          {/* protected routes */}
          <Route element={<ProtectedRoutes />} >
            <Route path='/create' element={<CreateBlog />} />
            <Route path='/blogs/:id/edit' element={<EditPost />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/stories' element={<Stories />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
