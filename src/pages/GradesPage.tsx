import { Link, useNavigate } from "react-router-dom"
import {
  BookOpenCheck,
  BarChart,
  AlertCircle,
} from "lucide-react"

const Card = ({ children, className = "" }) => (
  <div className={`rounded-xl border bg-white shadow-sm p-5 ${className}`}>
    {children}
  </div>
)

const Progress = ({ value = 0 }) => (
  <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
    <div
      className={`h-full rounded-full ${
        value >= 90
          ? "bg-emerald-600"
          : value >= 80
          ? "bg-blue-600"
          : value >= 70
          ? "bg-amber-600"
          : "bg-red-600"
      }`}
      style={{ width: `${value}%` }}
    />
  </div>
)

export default function GradesPage() {
  const navigate = useNavigate()

  const courses = [
    {
      id: "computer-ethics",
      title: "Computer Ethics",
      description: "Learn ethical practices and principles in computer science.",
      progress: 100,
      grade: "A",
    },
    {
      id: "advanced-mathematics",
      title: "Advanced Mathematics",
      description: "Advanced math topics for STEM students.",
      progress: 100,
      grade: "A-",
    },
    {
      id: "history-of-science",
      title: "History of Science",
      description: "Understand the milestones in the history of science.",
      progress: 100,
      grade: "B+",
    },
  ]

  const gradePoints = {
    A: 4.0,
    "A-": 3.7,
    "B+": 3.3,
    B: 3.0,
    "B-": 2.7,
    C: 2.0,
  }

  const gpa = (
    courses.reduce((sum, course) => sum + (gradePoints[course.grade] || 0), 0) /
    courses.length
  ).toFixed(2)

  const getGradeColor = (grade) => {
    if (grade.startsWith("A")) return "text-emerald-600"
    if (grade.startsWith("B")) return "text-blue-600"
    if (grade.startsWith("C")) return "text-amber-600"
    return "text-red-600"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">

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
              className="px-5 py-2 text-sm font-medium rounded-lg transition bg-yellow-300 hover:bg-yellow-400 text-gray-800"
            >
              Grades
            </button>
          </div>
        </div>

        {/* GPA Summary */}
        <Card className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <BarChart className="text-blue-600" />
            <div>
              <p className="text-sm text-gray-500">Overall GPA</p>
              <p className="text-2xl font-semibold text-gray-800">{gpa}</p>
            </div>
          </div>
        </Card>

        {/* Grade Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id}>
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center space-x-2 text-green-700 mb-1">
                    <BookOpenCheck className="w-5 h-5" />
                    <h2 className="text-lg font-semibold text-gray-800">{course.title}</h2>
                  </div>
                  <p className="text-sm text-gray-600">{course.description}</p>
                  <Progress value={course.progress} />
                  <p className="text-sm text-gray-500 mt-1">Progress: {course.progress}%</p>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span className={`text-lg font-bold ${getGradeColor(course.grade)}`}>
                    Grade: {course.grade}
                  </span>
                  <Link
                    to={`/certificate`}
                    className="text-sm bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition"
                  >
                    View Certificate
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Study Tip */}
        <Card className="flex items-start space-x-3 bg-yellow-50 border-yellow-200">
          <AlertCircle className="text-yellow-600 mt-1" />
          <div>
            <p className="font-semibold text-yellow-800">Study Tip</p>
            <p className="text-sm text-yellow-700">
              Review your grades weekly and reflect on your strengths. Build small habits that support consistent effort.
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
