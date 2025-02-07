import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { CheckCircle } from 'lucide-react'; // Assuming you're using lucide-react icons

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Finish Homework on Data Structures', dueDate: '2024-02-10', completed: false },
    { id: 2, title: 'Review Lecture Notes for Database Management', dueDate: '2024-02-12', completed: false },
    { id: 3, title: 'Complete Programming Assignment for Functional Programming', dueDate: '2024-02-15', completed: false },
    // Add more tasks as needed
  ]);

  const handleCheckboxChange = (taskId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Back to Dashboard Link */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
          <Link to="/home" className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>

        {/* Tasks Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900">Pending Tasks</h1>

          {/* Task List */}
          <div className="space-y-4 mt-6">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-center justify-between p-4 rounded-lg shadow-md ${task.completed ? 'bg-green-100' : 'bg-white'}`}
              >
                <div className="flex items-center space-x-3">
                  <CheckCircle
                    onClick={() => handleCheckboxChange(task.id)}
                    className={`h-6 w-6 cursor-pointer ${task.completed ? 'text-green-600' : 'text-gray-400'}`}
                  />
                  <div>
                    <p className="font-medium text-gray-900">{task.title}</p>
                    <p className="text-sm text-gray-600">Due: {task.dueDate}</p>
                  </div>
                </div>
                <div className="ml-4">
                  {task.completed && (
                    <span className="text-sm text-green-600">Completed</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksPage;
