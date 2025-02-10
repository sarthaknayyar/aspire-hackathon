import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import DepartmentDashboard from "./components/DepartmentDashboard";
import RequestDetails from "./components/RequestDetails";

const App = () => {
    const [user, setUser] = useState(null);

    return (
        <Router>
            <Routes>
                <Route path="/" element={user ? <DepartmentDashboard user={user} /> : <Login setUser={setUser} />} />
                <Route path="/request/:id" element={<RequestDetails />} />
            </Routes>
        </Router>
    );
};

export default App;
