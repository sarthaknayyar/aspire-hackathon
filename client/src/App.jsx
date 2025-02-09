import { useState } from 'react'
import './App.css'
import LandingPage from './pages/LandingPage'
import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import LoginForm from './components/login';
import SignupForm from './components/SignUp';
import Navbar from './components/Navbar';
import GrievanceForm from './components/GrievanceForm';
import Home from "./components/Home";
import FAQPage from "./components/FAQPage";
import Complaints from "./components/Complaints";
import Contact from "./components/Contact";
import { ToastContainer } from "react-toastify";


function App() {

  return (
    
   <div>
    <ToastContainer autoClose={3000} position="top-center" />
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/homepage" element={<HomePage />} />
      <Route path='/login' element={<LoginForm/>} />
      <Route path='/signup' element={<SignupForm/>} />
      <Route path='/navbar' element={<Navbar/>} />
      <Route path='/grievance-form/:department' element={<GrievanceForm/>} />
      {/* <Route path="/Home" element={<Home />} /> */}
        <Route path="/faqs" element={<FAQPage />} />
        <Route path="/complaints" element={<Complaints />} />
        <Route path="/contact" element={<Contact />} />
        <Route path='/status' element={<Home/>}/>
    </Routes>
   </div>
  )
}

export default App
