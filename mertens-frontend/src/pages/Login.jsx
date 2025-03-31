import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/api/users/login", {
        username,
        password,
      });

      sessionStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Login fehlgeschlagen");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <form onSubmit={handleLogin} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-black dark:text-white">🔐 Login</h2>
        <input
          type="text"
          placeholder="Benutzername"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-4 border rounded dark:bg-gray-700 dark:text-white"
          required
        />
        <input
          type="password"
          placeholder="Passwort"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded dark:bg-gray-700 dark:text-white"
          required
        />
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
