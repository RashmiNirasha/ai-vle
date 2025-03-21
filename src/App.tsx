import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { StudentProvider } from "./context/StudentContext";
import Navbar from "./pages/navBar";

import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/dashboard";
import SignupPage from "./pages/SignupPage";
import CoursePage from "./pages/CoursePage";
import Timetable from "./pages/TimetablePage";
import TasksPage from "./pages/AssignmentsPage";
import Course01 from "./pages/Course01";
import Quiz from "./pages/quiz";
import Courses from "./pages/CoursesPage";
import SubmitPage from "./pages/submitAssignPage";
import LearningPage from "./pages/LearningPage";
import Announcements from "./pages/AnnouncementsPage";
import Profile from "./pages/ProfilePage";
import Completed from "pages/completed";
import Grades from "pages/GradesPage";
import Certificate from "pages/CertificatePage";

import Clarity from "@microsoft/clarity";

const projectId = "qfsogio69t";
Clarity.init(projectId);

const LayoutWithNavbar: React.FC = () => {
  const location = useLocation();
  const hiddenNavbarRoutes= ["/login", "/signup"] as string[];
  const isHiddenRoute = hiddenNavbarRoutes.indexOf(location.pathname) !== -1;

  return (
    <>
      {!isHiddenRoute && <Navbar notifications={2} />}
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
        <Route path="/completed" element={<Completed />} />
        <Route path="/grades" element={<Grades />} />
        <Route path="/certificate" element={<Certificate />} />

        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
};

const App: React.FC = () => {
  return (
    <StudentProvider> {/* ✅ Wrap entire app with StudentProvider */}
      <Router>
        <LayoutWithNavbar />
      </Router>
    </StudentProvider>
  );
};

export default App;
