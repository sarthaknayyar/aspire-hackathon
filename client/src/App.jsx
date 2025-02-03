import { useState } from 'react'
import './App.css'
import LandingPage from './pages/LandingPage'
import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';


function App() {

  return (
   <div>

    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/homepage" element={<HomePage />} />
    </Routes>



   </div>
  )
}

export default App
