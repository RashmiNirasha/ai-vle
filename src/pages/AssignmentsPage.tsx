"use client"

import type React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, Calendar, CheckCircle, Clock, BookOpen, AlertCircle, ChevronRight } from "lucide-react"

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Finish Homework on Data Structures", dueDate: "2024-02-10", completed: false },
    { id: 2, title: "Review Lecture Notes for Database Management", dueDate: "2024-02-12", completed: false },
    {
      id: 3,
      title: "Complete Programming Assignment for Functional Programming",
      dueDate: "2024-02-15",
      completed: false,
    },
  ])

  const [deadlines] = useState([
    { id: 1, title: "Project Proposal", dueDate: "2024-03-15" },
    { id: 2, title: "Midterm Exam", dueDate: "2024-04-15" },
  ])

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
  ])

  const handleCheckboxChange = (taskId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)),
    )
  }

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  // Calculate days remaining
  const getDaysRemaining = (dateString: string) => {
    const dueDate = new Date(dateString)
    const today = new Date()
    const diffTime = dueDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Back to Dashboard Link */}
        <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-blue-500 transition-all hover:shadow-md focus-within:ring-2 focus-within:ring-blue-400">
          <Link
            to="/home"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 focus:outline-none focus:underline"
            aria-label="Back to dashboard"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Back to Dashboard</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Deadlines */}
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-amber-500 lg:col-span-1">
            <h2 className="text-xl font-bold mb-4 flex items-center text-slate-800" id="deadlines-heading">
              <Calendar className="h-5 w-5 mr-2 text-amber-500" />
              Upcoming Deadlines
            </h2>

            {deadlines.length === 0 ? (
              <div className="text-center p-4 bg-slate-50 rounded-lg">
                <p className="text-slate-600">No upcoming deadlines</p>
              </div>
            ) : (
              <ul className="space-y-3" role="list" aria-labelledby="deadlines-heading">
                {deadlines.map((deadline) => {
                  const daysRemaining = getDaysRemaining(deadline.dueDate)
                  const isUrgent = daysRemaining <= 7

                  return (
                    <li
                      key={deadline.id}
                      className={`p-3 rounded-lg border ${
                        isUrgent ? "border-red-200 bg-red-50" : "border-slate-200 bg-slate-50"
                      } transition-all hover:shadow-sm`}
                      role="listitem"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-slate-800">{deadline.title}</h3>
                          <p className="text-sm text-slate-600">Due: {formatDate(deadline.dueDate)}</p>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            isUrgent ? "bg-red-100 text-red-800" : "bg-amber-100 text-amber-800"
                          }`}
                          aria-label={`${daysRemaining} days remaining`}
                        >
                          {daysRemaining} days
                        </span>
                      </div>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>

          {/* Assignments Section */}
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-indigo-500 lg:col-span-2">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
              <h2 className="text-xl font-bold text-slate-800" id="assignments-heading">
                <span className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-indigo-500" />
                  Assignments
                </span>
              </h2>
              <Link
                to="/submitted"
                className="inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 font-medium text-sm"
                aria-label="View submitted assignments"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                See Submitted Assignments
              </Link>
            </div>

            {assignments.length === 0 ? (
              <div className="text-center p-8 bg-slate-50 rounded-lg border border-slate-200">
                <AlertCircle className="h-12 w-12 text-slate-400 mx-auto mb-3" />
                <p className="text-slate-600 font-medium">No assignments due</p>
              </div>
            ) : (
              <div className="space-y-4" role="list" aria-labelledby="assignments-heading">
                {assignments.map((assignment) => (
                  <div
                    key={assignment.id}
                    className="p-5 bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 focus-within:ring-2 focus-within:ring-indigo-300"
                    role="listitem"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
                            {assignment.type}
                          </span>
                        </div>

                        <h3 className="text-lg font-semibold text-slate-800">{assignment.title}</h3>
                        <p className="text-slate-600 font-medium">{assignment.course}</p>

                        <div className="flex items-center text-slate-500 text-sm">
                          <Clock className="h-4 w-4 mr-1 text-amber-500" />
                          <span>{assignment.dueDate}</span>
                        </div>
                      </div>

                      <Link
                        to="/submit"
                        className="inline-flex items-center px-5 py-2.5 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
                        aria-label={`Submit assignment: ${assignment.title}`}
                      >
                        <span>Submit</span>
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Tasks Section */}
        <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-emerald-500">
          <h2 className="text-xl font-bold mb-4 flex items-center text-slate-800" id="tasks-heading">
            <CheckCircle className="h-5 w-5 mr-2 text-emerald-500" />
            My Tasks
          </h2>

          {tasks.length === 0 ? (
            <div className="text-center p-8 bg-slate-50 rounded-lg border border-slate-200">
              <p className="text-slate-600 font-medium">No tasks to complete</p>
            </div>
          ) : (
            <ul className="space-y-3" role="list" aria-labelledby="tasks-heading">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className={`p-4 rounded-lg border ${
                    task.completed ? "border-emerald-200 bg-emerald-50/50" : "border-slate-200 bg-white"
                  } transition-all hover:shadow-sm flex items-center gap-3`}
                  role="listitem"
                >
                  <div className="relative flex items-start">
                    <div className="flex h-6 items-center">
                      <input
                        id={`task-${task.id}`}
                        name={`task-${task.id}`}
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => handleCheckboxChange(task.id)}
                        className="h-5 w-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-600 cursor-pointer"
                        aria-labelledby={`task-label-${task.id}`}
                      />
                    </div>
                  </div>

                  <div className="flex-1">
                    <label
                      htmlFor={`task-${task.id}`}
                      id={`task-label-${task.id}`}
                      className={`font-medium ${task.completed ? "text-slate-500 line-through" : "text-slate-800"} cursor-pointer`}
                    >
                      {task.title}
                    </label>
                    <p className="text-sm text-slate-500">Due: {formatDate(task.dueDate)}</p>
                  </div>

                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      getDaysRemaining(task.dueDate) <= 3 ? "bg-red-100 text-red-800" : "bg-slate-100 text-slate-800"
                    }`}
                  >
                    {getDaysRemaining(task.dueDate)} days left
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default TasksPage
