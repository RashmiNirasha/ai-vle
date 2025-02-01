import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/dashboard';
import SignupPage from './pages/SignupPage';
import CoursePage from './pages/CoursePage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Dashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/course/:courseId" element={<CoursePage />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;