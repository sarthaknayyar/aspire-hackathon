import { useState } from 'react'
import './App.css'
import LandingPage from './pages/LandingPage'
import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import LoginForm from './components/login';
import SignupForm from './components/SignUp';
import Navbar from './components/Navbar';


function App() {

  return (
   <div>

    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/homepage" element={<HomePage />} />
      <Route path='/login' element={<LoginForm/>} />
      <Route path='/signup' element={<SignupForm/>} />
      <Route path='/navbar' element={<Navbar/>} />
    </Routes>



   </div>
  )
}

export default App
