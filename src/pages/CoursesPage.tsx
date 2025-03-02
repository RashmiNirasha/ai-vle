import React, { useState } from 'react';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  Bell, 
  CheckCircle
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../pages/navBar';

const Courses = () => {
  const navigate = useNavigate();
  const [notifications] = useState(2);
  
  const availableCourses = [
    { id: 'SCS2201', title: 'Data Structures and Algorithms', semester: 'Semester I', color: 'bg-cyan-100', border: 'border-cyan-300' },
    { id: 'SCS2201', title: 'Database Management Systems', semester: 'Semester I', color: 'bg-purple-100', border: 'border-purple-300' },
    { id: 'SCS2201', title: 'Functional Programming', semester: 'Semester I', color: 'bg-pink-100', border: 'border-pink-300' },
    { id: 'SCS2201', title: 'Cognitive Robotics', semester: 'Semester I', color: 'bg-blue-100', border: 'border-blue-300' }
  ];


  return (
    <>
      <Navbar notifications={notifications} />
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Link to="/timetable" className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-xs">Today's Schedule</span>
              </div>
            </Link>
            <Link to="/tasks" className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-medium text-xs">Pending Tasks</span>
              </div>
            </Link>
            <Link to="/announcement" className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-3">
                <Bell className="h-5 w-5 text-purple-600" />
                <span className="font-medium text-xs">Notifications</span>
              </div>
            </Link>
            <Link to="/tasks" className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-orange-600" />
                <span className="font-medium text-xs">Upcoming Deadlines</span>
              </div>
            </Link>
          </div>
          
          {/* Available Courses Section */}
          <section className="mb-8">
            <h2 className="text-lg font-bold mb-4 text-slate-800 border-b-2 border-sky-200 pb-2">Available Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {availableCourses.map(course => (
                <div key={course.id} className={`rounded-lg shadow-md border-2 ${course.border} hover:shadow-lg transition-shadow cursor-pointer`} onClick={() => navigate(`/course/${course.id}`)}>
                  <div className={`h-24 ${course.color} flex items-center justify-center`}>
                    <BookOpen className="h-12 w-12 text-slate-600 opacity-50" />
                  </div>
                  <div className="p-4 bg-white">
                    <h3 className="font-bold text-sm mb-1 text-slate-800">{course.id}</h3>
                    <p className="mb-2 text-xs text-slate-700">{course.title}</p>
                    <p className="text-xs text-slate-500 mb-2">{course.semester}</p>
                    <Link to="/course/SCS2201" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-1.5 px-3 rounded-md transition-colors text-xs">
                    Enroll now </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Courses;
