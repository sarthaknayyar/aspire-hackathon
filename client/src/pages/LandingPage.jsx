import React from 'react';
import {useNavigate} from 'react-router-dom'

const LandingPage = () => {
  const navigate = useNavigate();

  const handleNavigate = async () => {
    navigate('/homepage');
  };

  return (
    <div className="bg-gray-100 font-sans">
      {/* Navbar */}
      <header className="bg-green-900 text-white p-4 flex justify-between items-center">
        <div className="text-xl font-bold">Mayorx</div>
        <nav className="space-x-6">
          <ul className="flex space-x-4">
            <li className="hover:underline">Home</li>
            <li className="hover:underline">Services</li>
            <li className="hover:underline">Pages</li>
            <li className="hover:underline">News</li>
            <li className="hover:underline">Contact</li>
          </ul>
        </nav>
        <button className="bg-orange-500 px-4 py-2 rounded" onClick={handleNavigate}>Submit Tasks</button>
      </header>

      {/* Hero Section */}
      <section
        className="bg-cover bg-center h-96 flex items-center justify-center text-white"
        style={{ backgroundImage: "url('https://via.placeholder.com/1500x400')" }}
      >
        <h1 className="text-5xl font-bold">Department</h1>
      </section>

      {/* Features Section */}
      <section className="text-center py-16">
        <h2 className="text-2xl font-bold mb-8">The growth of the richest city of all time</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 shadow-lg rounded">
            <img src="https://via.placeholder.com/100" alt="Feature 1" className="mx-auto mb-4" />
            <p>The proof of the richest city of all time</p>
          </div>
          <div className="bg-white p-4 shadow-lg rounded">
            <img src="https://via.placeholder.com/100" alt="Feature 2" className="mx-auto mb-4" />
            <p>City highlights include all attractions</p>
          </div>
          <div className="bg-white p-4 shadow-lg rounded">
            <img src="https://via.placeholder.com/100" alt="Feature 3" className="mx-auto mb-4" />
            <p>The growth of the richest city of all time</p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-green-800 text-white py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Together, We Will Move Country Forward</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div>
            <h3 className="text-xl font-bold">Your Government</h3>
            <p>Learn more</p>
          </div>
          <div>
            <h3 className="text-xl font-bold">Road & Transportation</h3>
            <p>Explore options</p>
          </div>
          <div>
            <h3 className="text-xl font-bold">Jobs & Unemployment</h3>
            <p>Read more</p>
          </div>
          <div>
            <h3 className="text-xl font-bold">Arts & Culture</h3>
            <p>Check out</p>
          </div>
        </div>
      </section>

      {/* Online Services Section */}
      <section className="py-16 text-center">
        <h2 className="text-2xl font-bold mb-8">Explore Online Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 shadow-lg rounded">Building Permits</div>
          <div className="bg-white p-4 shadow-lg rounded">Parking Permits</div>
          <div className="bg-white p-4 shadow-lg rounded">Tax Permits</div>
          <div className="bg-white p-4 shadow-lg rounded">Apply City Job</div>
          <div className="bg-white p-4 shadow-lg rounded">Planning Documents</div>
          <div className="bg-white p-4 shadow-lg rounded">Report Issues</div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-900 text-white p-8">
        <div className="text-center">
          <p>Address: Main Square Road, Region 12</p>
          <p>Contact: contact@mayorx.gov</p>
          <p>Clock: Open 9:00 AM - Close 6:00 PM</p>
        </div>
      </footer>
    </div>
  );
};





export default LandingPage;
