import Navbar from '../components/Navbar'
import Home from './Home'
import Stories from './Stories'

function Index() {
  return (
    <main className="h-screen">
      <Navbar />
      <Home />
      <Stories />
      <footer className="border-t text-center font-intertight">© lenor james jamero</footer>
    </main>
  )
}

export default Index