// AdminDashboard.js
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Outlet } from "react-router-dom";
import Layout from "./Layout";
import { motion } from "framer-motion";

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log("authentication checking");
        await axios.get("http://localhost:5000/admin/check-auth", {
          withCredentials: true,
        });
      } catch (error) {
        console.error("Authentication failed:", error);
        navigate("/");
      }
    };
    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:5000/admin/logout", {
        withCredentials: true,
      });
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 text-white">
  <motion.h2
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1.5 }}
    className="text-3xl font-serif font-bold text-white text-center mt-10 animate-fade"
  >
    Admin Dashboard
  </motion.h2> 

  <Layout />

  <button 
    onClick={handleLogout}
    className="fixed bottom-4 left-4 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition duration-200"
  >
    Logout
  </button>
</div>

  );
};

export default AdminDashboard;