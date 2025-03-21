import React from 'react';
import { useParams, Link, Route, Routes } from "react-router-dom";
import { ArrowLeft, CheckCircle, Clock, Download, PieChart } from "lucide-react";
import Course from "./Course01";

const courseData = {
  SCS2201: {
    id: "SCS2201",
    name: "Philosophy of Science",
    description: "Explore key philosophical questions underlying scientific reasoning, knowledge, and the nature of reality.",
    progress: 78,
    topics: [
      {
        id: 1,
        name: "Science: Conjectures and Refutations",
        completed: true,
        materials: ["Lecture PDF", "Discussion Prompts"],
        duration: "1.5 hours",
        slug: "what-is-science",
      },
      {
        id: 2,
        name: "Theory & Observation",
        completed: true,
        materials: ["Video Lecture", "Reading List"],
        duration: "2 hours",
        slug: "theory-and-observation",
      },
      {
        id: 3,
        name: "Scientific Revolutions",
        completed: false,
        materials: ["Lecture Slides", "Case Study"],
        duration: "2.5 hours",
        slug: "scientific-revolutions",
      },
    ],
    quizzes: [
      {
        id: 1,
        name: "Quiz 1: Introduction",
        score: "95%",
        completed: true,
        deadline: "2024-01-20",
      },
      {
        id: 2,
        name: "Quiz 2: Theory and Observation",
        score: "88%",
        completed: true,
        deadline: "2024-01-30",
      },
    ],
    assignments: [
      {
        id: 1,
        name: "Essay: What Defines Science?",
        status: "Completed",
        score: "90%",
        deadline: "2024-01-25",
      },
      {
        id: 2,
        name: "Presentation: Kuhn vs. Popper",
        status: "Pending",
        deadline: "2024-02-10",
      },
    ],
  },
};

const CoursePage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const course = courseData[courseId as keyof typeof courseData];

  if (!course) {
    return <div className="text-center py-10 text-gray-700">Course not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <Link to="/home" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          <div className="flex justify-between items-start flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{course.name}</h1>
              <p className="text-sm text-slate-600">{course.id}</p>
              <p className="mt-2 text-slate-700 max-w-xl">{course.description}</p>
            </div>
            <div className="inline-flex items-center bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
              <PieChart className="h-4 w-4 mr-2" />
              {course.progress}% Complete
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Topics */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Course Content</h2>
              <div className="space-y-4">
                {course.topics.map((topic) => (
                  <div key={topic.id} className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                    <Link to={`/course01`}>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center">
                          {topic.completed ? (
                            <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                          ) : (
                            <Clock className="h-5 w-5 text-slate-400 mr-3" />
                          )}
                          <div>
                            <h3 className="font-medium text-gray-800">{topic.name}</h3>
                            <p className="text-sm text-gray-500">{topic.duration}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          {topic.materials.map((material, index) => (
                            <button
                              key={index}
                              className="p-2 text-sm text-blue-600 hover:bg-blue-50 rounded"
                              onClick={(e) => e.preventDefault()}
                            >
                              <Download className="h-4 w-4" />
                            </button>
                          ))}
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quizzes */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Quizzes</h2>
              <div className="space-y-3">
                {course.quizzes.map((quiz) => (
                  <div key={quiz.id} className="p-3 border border-slate-200 rounded-lg">
                    <h3 className="font-medium text-gray-800">{quiz.name}</h3>
                    {quiz.completed ? (
                      <div className="mt-2 text-sm text-green-600">Score: {quiz.score}</div>
                    ) : (
                      <div className="mt-2 text-sm text-orange-600">Due: {quiz.deadline}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Assignments */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Assignments</h2>
              <div className="space-y-3">
                {course.assignments.map((assignment) => (
                  <div key={assignment.id} className="p-3 border border-slate-200 rounded-lg">
                    <h3 className="font-medium text-gray-800">{assignment.name}</h3>
                    <div className={`mt-2 text-sm ${assignment.status === "Completed" ? "text-green-600" : "text-orange-600"}`}>
                      {assignment.status === "Completed" ? `Score: ${assignment.score}` : `Due: ${assignment.deadline}`}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Route for Course component */}
        <Routes>
          <Route path="/courses/:courseId/:topicSlug" element={<Course />} />
        </Routes>
      </div>
    </div>
  );
};

export default CoursePage;
