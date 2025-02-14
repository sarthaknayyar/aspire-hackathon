import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Clients from "./pages/Clients";
import Quotes from "./pages/Quotes";
import GrievanceDetail from "./pages/GrievanceDetail";
import Billing from "./pages/Billing";
import Login from "./components/login";
import AIPDFAnalyzer from "./components/AIPDFAnalyzer";

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
                {/* Set default route to Clients instead of Login */}
                <Route path="/" element={<Navigate to="/clients" />} />

                {/* Login Page */}
                <Route path="/login" element={<Login />} />
                
                {/* Dashboard Pages */}
                <Route path="/clients" element={<Layout><Clients /></Layout>} />

                <Route path="/quotes" element={<Layout><Quotes /></Layout>} />
                <Route path="/billing" element={<Layout><Billing /></Layout>} />
                
                
                {/* Grievance Detail Page */}
                <Route path="/grievance/:grievanceCode" element={<Layout><GrievanceDetail /></Layout>} />
            </Routes>
        </Router>
    );
}

export default App;
