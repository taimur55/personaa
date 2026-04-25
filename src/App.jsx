import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
// Ensure the casing matches your files! (e.g., Mainn.mp4 vs mainn.mp4)
import menuVideo from './assets/Mainn.mp4'
import main1 from './assets/main1.mp4'
import main2 from './assets/main2.mp4'
import main3 from './assets/main3.mp4'

import P3Menu from './P3Menu'
import AboutMe from './AboutMe'
import ResumePage from './ResumePage'
import Socials from './Socials'
import PageTransition from './PageTransition'
import './App.css'

function MenuScreen() {
  const navigate = useNavigate()
  return (
    <div id="menu-screen">
      {/* This is the background for the main menu */}
      <video src={menuVideo} autoPlay loop muted playsInline />
      {/* We pass the 'navigate' function so clicking menu items actually changes the URL */}
      <P3Menu onNavigate={(page) => navigate(`/${page}`)} />
    </div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageTransition><MenuScreen /></PageTransition>
        } />
        <Route path="/about" element={
          <PageTransition variant="about"><AboutMe /></PageTransition>
        } />
        <Route path="/resume" element={
          <PageTransition><ResumePage src={main2} /></PageTransition>
        } />
        {/* If your menu item is 'github', ensure this route matches the href in P3Menu */}
        <Route path="/socials" element={
          <PageTransition variant="socials"><Socials /></PageTransition>
        } />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return <AnimatedRoutes />
}
