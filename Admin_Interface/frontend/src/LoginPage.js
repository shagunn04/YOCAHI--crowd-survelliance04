import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log("authentication checking");
        await axios.get("http://localhost:5000/admin/check-auth", { withCredentials: true });
        navigate("/admin");
      } catch (err) {
        console.log(err);
      }
    };
    checkAuth();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log(username + "   " + password);
      await axios.post("http://localhost:5000/admin/login", { username, password }, { withCredentials: true });
      navigate("/admin");
    } catch (error) {
      alert("Login failed!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 p-6 relative">
     
      <h1 className="text-9xl absolute top-10 tracking-widest 
            bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 
            bg-clip-text text-transparent animate-text font-light">
  YOCAHI
</h1>

      <div className="bg-white/10 backdrop-blur-lg shadow-xl rounded-xl p-10 w-full max-w-lg border border-white/20 mt-24 ">
        <h2 className="text-2xl font-bold text-white text-center mb-6 font-thin">Admin Login</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white focus:ring-2 focus:ring-blue-400 outline-none"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white focus:ring-2 focus:ring-blue-400 outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition duration-300 font-medium"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

/* Tailwind CSS Keyframe Animation */

