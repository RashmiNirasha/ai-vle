import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/dashboard';
import SignupPage from './pages/SignupPage';
import CoursePage from './pages/CoursePage';
import Timetable from 'pages/Timetable';
import TasksPage from 'pages/TasksPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Dashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/timetable" element={<Timetable />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/course/:courseId" element={<CoursePage />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;