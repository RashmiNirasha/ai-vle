import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Home,
  Clock,
  BookOpen,
  CheckCircle,
  LogOut,
  Settings
} from 'lucide-react';

const NavBar: React.FC<{ notifications: number }> = ({ notifications }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <nav className="bg-sky-50 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold text-sky-700">EduFocus</h1>
            <div className="hidden md:flex space-x-6">
              {[
                { to: '/home', label: 'Dashboard', icon: <Home className="h-5 w-5" /> },
                { to: '/timetable', label: 'Timetable', icon: <Clock className="h-5 w-5" /> },
                { to: '/course/1', label: 'Courses', icon: <BookOpen className="h-5 w-5" /> }, // Example courseId
                { to: '/tasks', label: 'Tasks', icon: <CheckCircle className="h-5 w-5" />, notifications },
                { to: '/settings', label: 'Settings', icon: <Settings className="h-5 w-5" /> }
              ].map(({ to, label, icon, notifications }) => (
                <NavLink
                  key={label}
                  to={to}
                  className={({ isActive }) =>
                    `relative flex items-center space-x-2 text-lg font-medium px-3 py-2 rounded-lg transition-all ${
                      isActive
                        ? 'bg-sky-100 text-sky-700 shadow-md'
                        : 'text-slate-600 hover:bg-sky-50 hover:text-sky-600'
                    }`
                  }
                >
                  {icon}
                  <span>{label}</span>
                  {notifications && notifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full px-2 text-xs">
                      {notifications}
                    </span>
                  )}
                </NavLink>
              ))}
            </div>
          </div>

          <div className="flex items-center">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-all"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
