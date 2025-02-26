import { BookOpen, Code2, Brain, ArrowRight, CheckCircle } from "lucide-react"
import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

export default function Course() {
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/course/SCS2201" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Course
          </Link>
        </div>
        {/* Unit Header */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">Unit 1: Introduction to Programming</h1>
          <div className="flex items-center gap-2 text-slate-600 mb-4">
            <BookOpen className="h-5 w-5" />
            <span>Estimated time: 45 minutes</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-sm">
              <Brain className="h-4 w-4" />
              <span>Beginner Friendly</span>
            </div>
            <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-sm">
              <CheckCircle className="h-4 w-4" />
              <span>Interactive Learning</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">What is Programming?</h2>
          <p className="text-slate-700 leading-relaxed mb-6">
            Programming is the process of designing, writing, testing, and maintaining a set of instructions (called
            code) that a computer can execute. It enables us to create software applications, websites, games, and much
            more.
          </p>

          <div className="space-y-4 mb-6">
            <h3 className="text-lg font-medium">With programming, you can:</h3>
            <ul className="space-y-3">
              {[
                "Solve real-world problems through automation",
                "Create interactive user experiences in apps and websites",
                "Process large volumes of data efficiently",
                "Develop artificial intelligence and machine learning systems",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 bg-slate-50 p-3 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Programming Languages Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Programming Languages</h2>
            <p className="text-slate-700 mb-4">
              Programming languages are tools that allow us to write code in a way that computers can interpret. Each
              language has its own syntax, structure, and purpose.
            </p>

            <div className="w-full rounded-lg border p-4 overflow-auto">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-26%20at%2021.14.10-q7IUbsSWoqmCaZy0vzEF8nHMeQalyG.png"
                  alt="Programming Languages"
                  className="col-span-2 md:col-span-3 rounded-lg w-full h-auto"
                />
              </div>
            </div>
          </div>

          {/* Quick Reference */}
          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Code2 className="h-5 w-5 text-blue-600" />
              Quick Reference: Popular Languages
            </h3>
            <ul className="space-y-2 text-slate-700">
              <li>
                <strong>Python:</strong> Known for its simplicity, widely used in data science and AI
              </li>
              <li>
                <strong>JavaScript:</strong> Essential for creating interactive web applications
              </li>
              <li>
                <strong>Java:</strong> Popular for enterprise applications and Android development
              </li>
              <li>
                <strong>C++:</strong> Ideal for system programming and game development
              </li>
            </ul>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <h2 className="text-2xl font-bold mb-3">Ready to Test Your Knowledge?</h2>
          <p className="mb-4">Take a short quiz to review what you've learned in Unit 1.</p>
          <Link to="/quiz" className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors group flex items-center inline-flex" >
            Start Quiz
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  )
}

