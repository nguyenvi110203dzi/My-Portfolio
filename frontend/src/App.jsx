import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import Footer from './components/Footer';
import Login from './pages/Login';
import AdminProjects from './pages/AdminProjects'; 

function Portfolio() {
  return (
    <div className="min-h-screen bg-primary-50 dark:bg-dark-bg transition-colors duration-300 font-sans flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Portfolio />} />
        <Route path="/admin" element={<AdminProjects />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;