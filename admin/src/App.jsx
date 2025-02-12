import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Clients from "./pages/Clients";
import Quotes from "./pages/Quotes";
import Billing from "./pages/Billing";
import GrievanceDetail from "./pages/GrievanceDetail";
import Login from "./components/login";

const Layout = ({ children }) => (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="p-6">{children}</div>
      </div>
    </div>
  );

function App() {
    return (
        <Router>
        <Routes>
          {/* Login Route */}
          <Route path="/login" element={<Login />} />
  
          {/* Dashboard - Clients Page */}
          <Route path="/" element={<Layout><Clients /></Layout>} />
  
          {/* Other Pages */}
          <Route path="/clients" element={<Layout><Clients /></Layout>} />
          <Route path="/quotes" element={<Layout><Quotes /></Layout>} />
          <Route path="/billing" element={<Layout><Billing /></Layout>} />
        </Routes>
      </Router>
    );
}

export default App;
