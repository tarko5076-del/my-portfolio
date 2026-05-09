import Hero from './components/Hero.jsx'
import Projects from './components/Projects.jsx'
import Contacts from './components/Contacts.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import MotionSection from './components/MotionSection.jsx'
import About from './components/About.jsx'
export default function App() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#f0ede6] antialiased">
      <Navbar />
       
      <Hero />
      <About />
      <MotionSection id="projects">
        <Projects />
      </MotionSection>
      <MotionSection id="contact">
        <Contacts />
      </MotionSection>

      <Footer />
    </div>
  )
}
