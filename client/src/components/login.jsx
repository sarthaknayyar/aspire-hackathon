import React from 'react'
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function LoginForm() {
  const [securityCode, setSecurityCode] = useState("");
  const navigate = useNavigate();
  const [status, setStatus] = useState(null);

  async function handleLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const response = await fetch('http://localhost:5000/user/login',{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify({email,password}),
        credentials : 'include',
    });
    if(response.status === 200){
        const data = await response.json();
        // console.log("xyz")
        // console.log(data);
        const token = data.token;
        document.cookie = `token=${token}; Secure; SameSite=None; Domain=sweet-dango-ca4344.netlify.app;`;
        navigate('/homepage');
    }
    else if(response.status === 404){
        console.log('User not found');
        setStatus('User not found');
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold text-purple-900 text-center">USER LOGIN</h2>

        {/* Username/Email/Mobile Input */}
        <div className="mt-4">
          <label className="text-sm font-semibold">Mobile No/Email ID/Username</label>
          <div className="flex items-center border rounded-md p-2 mt-1">
            <input
              type="text"
              id='email' name='email'
              placeholder="Enter your details"
              className="w-full outline-none"
            />
            
          </div>
        </div>

        {/* Password Input */}
        <div className="mt-4">
          <label className="text-sm font-semibold">Password</label>
          <div className="flex items-center border rounded-md p-2 mt-1">
            <input
              type="password"
              id='password' name='password'
              placeholder="Enter your password"
              className="w-full outline-none"
            />
            
          </div>
        </div>

        {/* Security Code Input */}
        {/* <div className="mt-4">
          <label className="text-sm font-semibold">Security Code</label>
          <div className="flex items-center border rounded-md p-2 mt-1">
            <input
              type="text"
              placeholder="Enter security code"
              className="w-full outline-none"
              value={securityCode}
              onChange={(e) => setSecurityCode(e.target.value)}
            />*}
          </div> 
          <div className="flex items-center mt-2">
            <img
              src="captcha.png"
              alt="Captcha"
              className="w-28 h-10 border rounded"
            />
            <button className="ml-2 p-2 border rounded-md bg-gray-200">🔄</button>
          </div>
        </div>

        {/* Login Button */}
        <button className="w-full bg-purple-900 text-white py-2 rounded-md mt-4 hover:bg-purple-700" onClick={handleLogin}>
          Login ➜
        </button>

        {/* Links */}
        <div className="text-center mt-3 text-sm text-gray-600">
          <a href="#" className="hover:text-purple-900">Forgot Password</a> |
          <a href="#" className="hover:text-purple-900 ml-2">Forgot Username</a>
          <br />
          <a href="/signup" className="hover:text-purple-900">Click here to Sign Up</a> 
         
        </div>

        
      </div>
    </div>
  );
}
