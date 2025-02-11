import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Clients from "./pages/Clients";
import Quotes from "./pages/Quotes";
import Billing from "./pages/Billing";
import GrievanceDetail from "./pages/GrievanceDetail";

function App() {
    return (
        <Router>
            <div className="flex h-screen bg-gray-100">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                    <Header />
                    <div className="p-6">
                        <Routes>
                            <Route path="/" element={<Clients />} />
                            <Route path="/quotes" element={<Quotes />} />
                            <Route path="/billing" element={<Billing />} />
                            <Route path="/grievance/:grievanceCode" element={<GrievanceDetail />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;
