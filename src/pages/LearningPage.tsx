import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, BookOpen } from "lucide-react";

const LearningPage: React.FC = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Finish Homework on Data Structures", dueDate: "2024-02-10", completed: false },
    { id: 2, title: "Review Lecture Notes for Database Management", dueDate: "2024-02-12", completed: false },
    { id: 3, title: "Complete Programming Assignment for Functional Programming", dueDate: "2024-02-15", completed: false },
  ]);

  const navigate = useNavigate();
  const [viewFilter, setViewFilter] = useState<"inProgress" | "completed" | "all">("all");

  const handleCheckboxChange = (taskId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (viewFilter === "inProgress") return !task.completed;
    if (viewFilter === "completed") return task.completed;
    return true;
  });

  const courses = [
    {
      id: "SCS2201",
      title: "Philosophy of Science",
      description: "Explore the foundations, methods, and implications of science.",
      color: "bg-blue-100",
      border: "border-blue-300",
    },
    {
      id: "SCS2201",
      title: "Data Structures",
      description: "Learn about arrays, linked lists, trees, and efficient algorithms.",
      color: "bg-purple-100",
      border: "border-purple-300",
    },
    {
      id: "SCS2201",
      title: "Functional Programming",
      description: "Understand concepts like immutability, higher-order functions, and recursion.",
      color: "bg-pink-100",
      border: "border-pink-300",
    },
    {
      id: "SCS2201",
      title: "Database Management",
      description: "Master SQL, normalization, and database design fundamentals.",
      color: "bg-cyan-100",
      border: "border-cyan-300",
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
              onClick={() => navigate("/completed")}
              className="px-5 py-2 text-sm font-medium rounded-lg bg-green-600 text-white"
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

        {/* Courses Section */}
        <section className="mb-8">
          <h2 className="text-lg font-bold mb-4 text-slate-800 border-b-2 border-sky-200 pb-2">Your Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {courses.map((course) => (
              <div
                key={course.id}
                className={`rounded-lg shadow-md border-2 ${course.border} hover:shadow-lg transition-shadow cursor-pointer`}
                onClick={() => navigate(`/course/${course.id}`)}
              >
                <div className={`h-24 ${course.color} flex items-center justify-center`}>
                  <BookOpen className="h-12 w-12 text-slate-600 opacity-50" />
                </div>
                <div className="p-4 bg-white">
                  <h3 className="font-bold text-sm mb-1 text-slate-800">{course.id}</h3>
                  <p className="mb-2 text-xs text-slate-700">{course.title}</p>
                  <p className="text-xs text-slate-500 mb-2">Semester I</p>
                  <button
                    onClick={() => navigate(`/course/${course.id}`)}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-1.5 px-3 rounded-md transition-colors text-xs"
                  >
                    Resume
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Task Section */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your Tasks</h1>
          <div className="space-y-4">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-center justify-between p-4 rounded-xl border shadow-sm ${
                  task.completed ? "bg-green-50 border-green-300" : "bg-white"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <CheckCircle
                    onClick={() => handleCheckboxChange(task.id)}
                    className={`h-6 w-6 cursor-pointer ${
                      task.completed ? "text-green-600" : "text-gray-400"
                    }`}
                  />
                  <div>
                    <p className="font-medium text-gray-900">{task.title}</p>
                    <p className="text-sm text-gray-500">Due: {task.dueDate}</p>
                  </div>
                </div>
                {task.completed && <span className="text-sm text-green-600 font-semibold">✓ Completed</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningPage;
