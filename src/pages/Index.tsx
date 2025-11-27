import Navbar from '../components/Navbar'
import Home from './Home'
import Stories from './Stories'

function Index() {
  return (
    <main className="h-screen">
      <Navbar />
      <Home />
      <Stories />
    </main>
  )
}

export default Index