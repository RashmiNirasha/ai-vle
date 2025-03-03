import React, { useState } from 'react';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  Bell, 
  CheckCircle,
  BookMarked,
  Library,
  MonitorPlay,
  FileText
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './footer';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  
  const [notifications] = useState([
    { id: 1, text: 'Assignment due: Data Structures - Lab Report 3', deadline: '2 days left' },
    { id: 2, text: 'New Material: Database Management Systems', time: '1 hour ago' },
  ]);

  const courses = [
    {
      id: 1,
      code: 'SCS2201',
      name: 'Data Structures and Algorithms',
      progress: 65,
      nextClass: 'Tomorrow 10:30 AM',
      tasks: 2,
    },
    {
      id: 2,
      code: 'SCS2201',
      name: 'Database Management Systems',
      progress: 45,
      nextClass: 'Today 2:30 PM',
      tasks: 1,
    },
    {
      id: 3,
      code: 'SCS2201',
      name: 'Functional Programming',
      progress: 78,
      nextClass: 'Wednesday 8:30 AM',
      tasks: 3,
    },
  ];

  const upcomingDeadlines = [
    {
      id: 1,
      course: 'Data Structures',
      task: 'Lab Report 3',
      deadline: '2024-02-15',
    },
    {
      id: 2,
      course: 'Database Systems',
      task: 'Assignment 2',
      deadline: '2024-02-20',
    }
  ];

  return (
    <>      
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
         
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Link to="/timetable" className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-3">
                <Clock className="h-6 w-6 text-blue-600" />
                <span className="font-medium">Today's Schedule</span>
              </div>
            </Link>
            <Link to="/tasks" className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <span className="font-medium">Pending Tasks</span>
              </div>
            </Link>
            <Link to="/library" className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-3">
                <Library className="h-6 w-6 text-purple-600" />
                <span className="font-medium">UCSC Library</span>
              </div>
            </Link>
            <Link to="/resources" className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-3">
                <BookMarked className="h-6 w-6 text-orange-600" />
                <span className="font-medium">Study Resources</span>
              </div>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* My Courses */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-xl font-semibold flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                My Courses
              </h2>
              <div className="space-y-4">
                {courses.map(course => (
                  <div 
                    key={course.id} 
                    className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => navigate(`/course/${course.code}`)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{course.name}</h3>
                        <p className="text-sm text-slate-600">{course.code}</p>
                      </div>
                      <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                        {course.nextClass}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <MonitorPlay className="h-5 w-5 text-green-600" />
                        <FileText className="h-5 w-5 text-orange-600" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-48 h-2 bg-slate-200 rounded-full">
                          <div 
                            className="h-full bg-blue-600 rounded-full"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                        <span className="text-sm text-slate-600">{course.progress}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Notifications */}
              <div className="bg-white rounded-lg shadow-md p-4">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Notifications
                </h2>
                <div className="space-y-3">
                  {notifications.map(notification => (
                    <div key={notification.id} className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-slate-800">{notification.text}</p>
                      <p className="text-xs text-blue-600 mt-1">
                        {notification.deadline || notification.time}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Deadlines */}
              <div className="bg-white rounded-lg shadow-md p-4">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Upcoming Deadlines
                </h2>
                <div className="space-y-3">
                  {upcomingDeadlines.map(deadline => (
                    <div key={deadline.id} className="p-3 border border-slate-200 rounded-lg">
                      <p className="font-medium">{deadline.task}</p>
                      <p className="text-sm text-slate-600">{deadline.course}</p>
                      <p className="text-sm text-red-600 mt-1">Due: {deadline.deadline}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;