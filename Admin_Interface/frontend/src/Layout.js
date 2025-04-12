import { Outlet, NavLink } from "react-router-dom";

function Layout() {
  return (
    <div>
      {/* Navigation Bar */}
      <nav className="bg-gray-700 p-4 shadow-lg rounded-lg mx-auto mt-4 w-3/5">
        <ul className="flex justify-center space-x-8">
          <li>
            <NavLink 
              to="/admin/enterface"
              className={({ isActive }) => 
                `text-white text-lg transition-transform duration-200 ${
                  isActive ? "scale-110 font-bold text-blue-400" : "hover:scale-105"
                }`
              }
            >
              Add a Face
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/admin/statistics"
              className={({ isActive }) => 
                `text-white text-lg transition-transform duration-200 ${
                  isActive ? "scale-110 font-bold text-blue-400" : "hover:scale-105"
                }`
              }
            >
              Statistics
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/admin/loggedfaces"
              className={({ isActive }) => 
                `text-white text-lg transition-transform duration-200 ${
                  isActive ? "scale-110 font-bold text-blue-400" : "hover:scale-105"
                }`
              }
            >
              Faces
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Page Content */}
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
