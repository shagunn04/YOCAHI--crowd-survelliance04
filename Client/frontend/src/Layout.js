import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './css/Layout.css'; // Import the CSS file

function Layout() {
  return (
    <div className="Layout">
      <nav className="navbar">
        <ul>
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/upload-video" 
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Stream
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="content">
       
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
