import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar } from "lucide-react";

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Finish Homework on Data Structures", dueDate: "2024-02-10", completed: false },
    { id: 2, title: "Review Lecture Notes for Database Management", dueDate: "2024-02-12", completed: false },
    { id: 3, title: "Complete Programming Assignment for Functional Programming", dueDate: "2024-02-15", completed: false },
  ]);

  const [deadlines] = useState([
    { id: 1, title: "Project Proposal", dueDate: "2024-03-15" },
    { id: 2, title: "Midterm Exam", dueDate: "2024-04-15" },
  ]);

  const [assignments] = useState([
    {
      id: 1,
      title: "Assignment 2 is Due",
      dueDate: "Sunday, 8 September, 11:59 PM",
      type: "Course Event",
      course: "IS4108 Natural Language Processing",
    },
    {
      id: 2,
      title: "Assignment 3 is Due",
      dueDate: "Sunday, 8 September, 11:59 PM",
      type: "Course Event",
      course: "IS4109 Cognitive Robotics",
    },
    {
      id: 3,
      title: "Assignment 4 is Due",
      dueDate: "Sunday, 8 September, 11:59 PM",
      type: "Course Event",
      course: "IS4102 Advanced Software Quality Assurance",
    },
  ]);

  const handleCheckboxChange = (taskId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <>
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Back to Dashboard Link */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-4">
            <Link to="/home" className="inline-flex items-center text-blue-600 hover:text-blue-800">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </div>

          {/* Upcoming Deadlines */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Upcoming Deadlines
            </h2>
            <ul>
              {deadlines.map((deadline) => (
                <li key={deadline.id} className="mb-2">
                  <span className="font-medium">{deadline.title}:</span> {deadline.dueDate}
                </li>
              ))}
            </ul>
          </div>

          {/* Assignments Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mt-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Assignments</h2>
              <Link to="/submitted-assignments" className="text-blue-600 hover:text-blue-800">
                See Submitted Assignments
              </Link>
            </div>
            <div className="space-y-4 mt-4">
              {assignments.map((assignment) => (
                <div key={assignment.id} className="bg-blue-50 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{assignment.title}</h3>
                      <p className="text-sm text-gray-600">{assignment.dueDate}</p>
                      <p className="text-sm text-gray-600">{assignment.type}</p>
                      <p className="text-sm text-gray-600">{assignment.course}</p>
                    </div>
                    <Link to="/submit" className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors text-sm">
                    Submit
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TasksPage;
