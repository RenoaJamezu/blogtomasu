import { FaArrowRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth';

function Home() {
  const { isValid } = useAuth();

  return (
    <section className="flex bg-primary px-4 md:px-10 h-screen items-center pt-14 md:pt-16">
      <div className="flex flex-col gap-5">
        <h1 className="font-merriweather text-2xl md:text-6xl font-bold text-white">
          Share Your Story with<br />
          the World
        </h1>
        <p className="font-intertight text-md md:text-xl text-white">
          A simple, elegant platform for writers and readers. Create, share and discover<br />
          amazing content.
        </p>

        <div className="flex gap-5 mt-5">
          <Link to='/create' className="flex items-center gap-3 text-sm md:text-lg bg-white rounded-lg px-4 md:px-8 py-3 hover:bg-gray-200">
            Start Writing
            <FaArrowRight />
          </Link>
          {!isValid && (
            <Link to='/login' className="flex items-center gap-3 text-sm md:text-lg bg-primary rounded-lg px-4 md:px-8 py-3 text-white outline hover:bg-blue-800">
              Sign in
            </Link>
          )}
        </div>

      </div>
    </section>
  )
}

export default Home