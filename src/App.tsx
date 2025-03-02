import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/dashboard';
import SignupPage from './pages/SignupPage';
import CoursePage from './pages/CoursePage';
import Timetable from 'pages/TimetablePage';
import TasksPage from 'pages/AssignmentsPage';
import Course01 from 'pages/Course01';
import Quiz from 'pages/quiz';
import Courses from 'pages/CoursesPage';
import SubmitPage from 'pages/submitAssignPage';
import LearningPage from 'pages/LearningPage';
import Announcements from 'pages/AnnouncementsPage';
import Profile from 'pages/ProfilePage';
import Clarity from '@microsoft/clarity';

const projectId = "qfsogio69t"

Clarity.init(projectId);

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
        <Route path="/course01" element={<Course01 />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/submit" element={<SubmitPage />} />
        <Route path="/learning" element={<LearningPage />} />
        <Route path="/announcement" element={<Announcements />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;