import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { BlogProvider } from './contexts/BlogContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BlogProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BlogProvider>
  </StrictMode>,
)
