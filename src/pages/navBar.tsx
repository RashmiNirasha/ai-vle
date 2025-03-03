import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Home,
  Clock,
  BookOpen,
  Calendar,
  CheckCircle,
  Bell,
  LogOut,
  User,
} from "lucide-react";
import { useStudent } from "../context/StudentContext";

const Navbar: React.FC<{ notifications: number }> = ({ notifications }) => {
  const navigate = useNavigate();
  const { studentData } = useStudent(); // ✅ Get studentData from context

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 border-b-2 border-sky-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Section - Logo & Navigation Links */}
          <div className="flex items-center space-x-6">
            <h1 className="text-xl font-bold text-sky-700">EduFocus</h1>
            <div className="hidden md:flex space-x-3">
              {[
                { to: "/home", label: "Home", icon: <Home className="h-6 w-6" /> },
                { to: "/learning", label: "My Learning", icon: <Clock className="h-6 w-6" /> },
                { to: "/courses", label: "Courses", icon: <BookOpen className="h-6 w-6" /> },
                { to: "/timetable", label: "Calendar", icon: <Calendar className="h-6 w-6" /> },
                { to: "/tasks", label: "Assignments", icon: <CheckCircle className="h-6 w-6" /> },
                { to: "/announcement", label: "Announcements", icon: <Bell className="h-6 w-6" />, hasNotifications: true },
              ].map(({ to, label, icon, hasNotifications }) => (
                <NavLink
                  key={label}
                  to={to}
                  className={({ isActive }) =>
                    `relative flex items-center space-x-2 text-sm font-medium px-3 py-2 rounded-lg transition-all ${
                      isActive
                        ? "bg-sky-600 text-white shadow-md"
                        : "text-slate-700 hover:bg-sky-100 hover:text-sky-600"
                    }`
                  }
                >
                  <div className="flex items-center">
                    {icon}
                    <span className="ml-2">{label}</span>
                  </div>
                  {hasNotifications && notifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold">
                      {notifications}
                    </span>
                  )}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Profile Section */}
          <div className="flex items-center space-x-4">
            <NavLink to="/profile" className="flex items-center space-x-3 text-sm font-medium px-3 py-2 rounded-lg hover:bg-sky-100 hover:text-sky-600 transition-all" >
              <div className="h-10 w-10 rounded-full border-2 border-white shadow-md overflow-hidden bg-blue-100">
                <img src={studentData.profilePicture || "./images/prof.png"} 
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hidden md:flex flex-col">
                <span className="text-sm font-semibold text-sky-700">  {studentData.firstName} {studentData.lastName}  </span>
              </div>
            </NavLink>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all text-sm"
          >
            <LogOut className="h-6 w-6" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
