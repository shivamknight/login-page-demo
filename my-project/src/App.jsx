import React, { useState } from 'react';

const LoginPage = () => {
  // 1. Toggle State: Are we Logging in or Signing up?
  const [isLoginMode, setIsLoginMode] = useState(true); 

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Determine which API endpoint to hit
    const endpoint = isLoginMode ? 'http://localhost:3001/login' : 'http://localhost:3001/register';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (isLoginMode) {
        // --- LOGIN LOGIC ---
        if (data === "Success") {
          alert("Login Successful! Redirecting...");
          // Navigate to dashboard here
        } else {
          setError(data); // "Incorrect password" or "No user found"
        }
      } else {
        // --- REGISTER LOGIC ---
        if (response.ok) {
          alert("Registration Successful! Now please login.");
          setIsLoginMode(true); // Switch to login mode automatically
        } else {
          setError("Registration failed. Email might be taken.");
        }
      }

    } catch (err) {
      setError("Server error. Is the backend running?");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-lg px-8 pt-6 pb-8 mb-4">
        
        {/* Dynamic Header */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {isLoginMode ? "Welcome Back" : "Create Account"}
        </h2>

        <form onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              {error}
            </div>
          )}

          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-indigo-600 mb-3"
              >
                {showPassword ? "Hide" : "Show"} 
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded w-full transition duration-150"
              type="submit"
            >
              {isLoginMode ? "Sign In" : "Sign Up"}
            </button>
            
            {/* Toggle Button */}
            <div className="text-center text-sm">
                <p>
                    {isLoginMode ? "Don't have an account? " : "Already have an account? "}
                    <span 
                        onClick={() => setIsLoginMode(!isLoginMode)}
                        className="text-indigo-600 cursor-pointer font-bold hover:underline"
                    >
                        {isLoginMode ? "Register Here" : "Login Here"}
                    </span>
                </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;