import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Index from './pages/Index'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import CreatePost from './pages/CreatePost'
import { Toaster } from 'react-hot-toast'
import ProtectedRoutes from './utils/ProtectedRoutes'
import Profile from './pages/Profile'
import Authenticated from './utils/Authenticated'
import Stories from './pages/Stories'
import BlogPost from './pages/BlogPost'

function App() {

  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          {/* public routes */}
          <Route path='/' element={<Index />} />
          <Route path='/posts/:id' element={<BlogPost />} />

          {/* authenticated */}
          <Route element={<Authenticated />} >
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
          </Route>

          {/* protected routes */}
          <Route element={<ProtectedRoutes />} >
            <Route path='/create' element={<CreatePost />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/stories' element={<Stories />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
