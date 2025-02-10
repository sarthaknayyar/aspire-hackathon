import React, { useState } from "react";
import { login } from "../api";

const Login = ({ setUser }) => {
    const [email, setEmail] = useState("");

    const handleLogin = async () => {
        try {
            const userData = await login(email);
            setUser(userData);
        } catch (err) {
            alert("Invalid login");
        }
    };

    return (
        <div>
            <h2>Department Login</h2>
            <input type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
