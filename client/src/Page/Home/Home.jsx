import Hero from '../../Components/Hero/Hero'
import Navbar from '../../Components/Navbar/Navbar'
import './Home.css'


function Home() {
  return (
    <div className='home'>
       <Navbar />
       <Hero />
    </div>
  )
}

export default Home