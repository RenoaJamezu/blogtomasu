import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Index from './pages/Index'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import CreatePost from './pages/CreatePost'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/create' element={<CreatePost />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
