import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpenCheck } from "lucide-react";

const Completed: React.FC = () => {
  const navigate = useNavigate();

  const completedCourses = [
    {
      id: "computer-ethics",
      title: "Computer Ethics",
      description: "Learn ethical practices and principles in computer science.",
      progress: 100,
    },
    {
      id: "advanced-mathematics",
      title: "Advanced Mathematics",
      description: "Advanced math topics for STEM students.",
      progress: 100,
    },
    {
      id: "history-of-science",
      title: "History of Science",
      description: "Understand the milestones in the history of science.",
      progress: 100,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-white p-6">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => navigate("/learning")}
              className="px-5 py-2 text-sm font-medium rounded-lg transition bg-blue-600 text-white hover:bg-blue-700"
            >
              My Learning
            </button>
            <button
              className="px-5 py-2 text-sm font-medium rounded-lg bg-green-600 text-white cursor-default"
            >
              Completed
            </button>
            <button
            onClick={() => navigate("/grades")}
            className="px-5 py-2 text-sm font-medium rounded-lg transition bg-yellow-300 hover:bg-yellow-400 text-gray-800"
            >
              Grades
            </button>
          </div>
        </div>

        {/* Completed Courses Section */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Completed Courses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedCourses.map((course) => (
              <div
                key={course.id}
                className="bg-gradient-to-br from-green-50 to-white transition border border-green-200 rounded-2xl p-5 shadow-md hover:shadow-lg flex flex-col justify-between h-full"
              >
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center space-x-2 text-green-600">
                    <BookOpenCheck className="w-5 h-5" />
                    <h3 className="text-lg font-semibold">{course.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{course.description}</p>
                  <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Progress: {course.progress}%</p>
                </div>
                <div className="mt-4">
                  <Link
                    to={`/certificate`}
                    className="inline-block w-full text-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    View Certificate
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Completed;
